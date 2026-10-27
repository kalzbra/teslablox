/**
 * Client for the homework Worker (api/). Questions arrive WITHOUT answers; each answer is graded
 * server-side and only then does the browser learn the correct answer + explanation.
 *
 * Base URL: NEXT_PUBLIC_HOMEWORK_API (set to http://localhost:8787 in .env.local for local dev),
 * defaulting to the deployed API.
 */

export const HOMEWORK_API =
  process.env.NEXT_PUBLIC_HOMEWORK_API ?? "https://api.teslariley.com";

export type HomeworkSubject = "Science" | "Math" | "Tech";

export type PublicQuestion = {
  id: string;
  subject: HomeworkSubject;
  type: "multiple-choice" | "type-answer";
  question: string;
  options?: string[];
};

export type AnswerFeedback = {
  answer: string;
  correct: boolean;
  correctAnswer: string;
  explanation: string;
};

export type WeekResource = {
  title: string;
  description: string;
  href: string;
  kind: "video" | "site" | "game";
  minutes?: number;
};

export type WeekStatus = "passed" | "active" | "scheduled" | "locked";

export type RoadmapWeek = {
  id: string;
  theme: string;
  weekOf: string;
  opensOn: string;
  status: WeekStatus;
};

export type ActiveWeek = {
  id: string;
  theme: string;
  weekOf: string;
  dadNote: string;
  topics: string[];
  resources: WeekResource[];
  questionCount: number;
  retryAt: number | null;
  inProgress: boolean;
};

export type Overview = { weeks: RoadmapWeek[]; active: ActiveWeek | null };

export type StartResult = {
  attemptId: string;
  weekId: string;
  questions: PublicQuestion[];
  answered: Record<string, AnswerFeedback>;
};

export type FinishResult = {
  score: number;
  outOf: number;
  perfect: boolean;
  retryAt: number | null;
  next: { theme: string; status: WeekStatus; opensOn: string } | null;
};

export type LogEntry = {
  id: string;
  theme: string;
  weekOf: string;
  bestScore: number;
  outOf: number;
  attempts: number;
  passedAt: number | null;
  lastAttemptAt: number;
  logNote: string | null;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body: Record<string, unknown>,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: { key?: string; body?: unknown } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (init.key) headers.Authorization = `Bearer ${init.key}`;
  if (init.body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${HOMEWORK_API}${path}`, {
    method: init.body !== undefined || path === "/api/auth" ? "POST" : "GET",
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    throw new ApiError(res.status, String(data.error ?? "Something went wrong"), data);
  }
  return data as T;
}

export const homeworkApi = {
  checkPassword: (key: string) => request<{ ok: true }>("/api/auth", { key }),
  overview: (key: string) => request<Overview>("/api/homework", { key }),
  start: (key: string) => request<StartResult>("/api/homework/start", { key, body: {} }),
  answer: (key: string, attemptId: string, questionId: string, answer: string) =>
    request<AnswerFeedback>("/api/homework/answer", {
      key,
      body: { attemptId, questionId, answer },
    }),
  finish: (key: string, attemptId: string) =>
    request<FinishResult>("/api/homework/finish", { key, body: { attemptId } }),
  log: () => request<{ entries: LogEntry[] }>("/api/log"),
};

/** Fired on window when a quiz attempt is finished, so the public Homework Log can reload. */
export const HOMEWORK_UPDATED_EVENT = "teslablox:homework-updated";

/** "2026-11-02" → "Monday, November 2" */
export function formatOpensOn(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

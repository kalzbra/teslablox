/**
 * TeslaBlox homework API (Cloudflare Worker + D1).
 *
 * Why this exists: the website is a static export, so anything it ships is readable via
 * "View Page Source". Keeping questions' answers, the password check, grading, the retry
 * cooldown, and progress here means none of that can be read or bypassed from the browser, and
 * progress follows Tesla across devices. Scores are logged automatically for Daddy.
 *
 * Endpoints (JSON):
 *   GET  /api/log                  public — per-week results for the Homework Log
 *   POST /api/auth                 password check for the gate
 *   GET  /api/homework             roadmap + active week overview (+ cooldown / in-progress)
 *   POST /api/homework/start       start (or resume) an attempt on the active week
 *   POST /api/homework/answer      {attemptId, questionId, answer} → graded, first answer final
 *   POST /api/homework/finish      {attemptId} → score, unlock state
 * Every endpoint except /api/log needs `Authorization: Bearer <HOMEWORK_PASSWORD>`.
 */

import { homeworkWeeks, type HomeworkQuestion, type HomeworkWeek } from "./weeks";

export interface Env {
  DB: D1Database;
  HOMEWORK_PASSWORD: string;
  ALLOWED_ORIGINS: string;
  /** Dev-only: pretend "now" is this ISO timestamp, to test date-gated weeks locally. */
  NOW_OVERRIDE?: string;
}

const RETRY_COOLDOWN_MS = 15 * 60 * 1000;
const TOKYO_OFFSET_MS = 9 * 60 * 60 * 1000;

type WeekStatus = "passed" | "active" | "scheduled" | "locked";

type AttemptRow = {
  id: string;
  week_id: string;
  started_at: number;
  finished_at: number | null;
  score: number | null;
  out_of: number;
};

type AnswerRow = {
  question_id: string;
  answer: string;
  correct: number;
};

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public extra: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

// ---------- helpers ----------

function now(env: Env): number {
  return env.NOW_OVERRIDE ? Date.parse(env.NOW_OVERRIDE) : Date.now();
}

/** Today's date in Tokyo (where Daddy is), as YYYY-MM-DD — what `opensOn` is compared against. */
function tokyoDate(ms: number): string {
  return new Date(ms + TOKYO_OFFSET_MS).toISOString().slice(0, 10);
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.!?,]+$/g, "")
    .replace(/\s+/g, " ");
}

function grade(question: HomeworkQuestion, answer: string): boolean {
  const given = normalize(answer);
  const expected = normalize(question.answer);
  if (given === expected) return true;
  if (question.type === "type-answer" && question.accept?.some((a) => normalize(a) === given)) {
    return true;
  }
  if (question.type === "type-answer" && given !== "") {
    const g = Number(given.replace(/,/g, ""));
    const e = Number(expected.replace(/,/g, ""));
    if (!Number.isNaN(g) && !Number.isNaN(e)) return g === e;
  }
  return false;
}

/** Question as the browser sees it before answering — no answer, no explanation. */
function publicQuestion(q: HomeworkQuestion) {
  return {
    id: q.id,
    subject: q.subject,
    type: q.type,
    question: q.question,
    ...(q.type === "multiple-choice" ? { options: q.options } : {}),
  };
}

function findWeek(weekId: string): HomeworkWeek {
  const week = homeworkWeeks.find((w) => w.id === weekId);
  if (!week) throw new HttpError(404, "Unknown week");
  return week;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function requireAuth(request: Request, env: Env): void {
  const header = request.headers.get("Authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!env.HOMEWORK_PASSWORD || !safeEqual(given, env.HOMEWORK_PASSWORD)) {
    throw new HttpError(401, "Wrong password");
  }
}

async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "Expected a JSON body");
  }
}

// ---------- progress ----------

async function passedWeekIds(env: Env): Promise<Map<string, number>> {
  const { results } = await env.DB.prepare(
    `SELECT week_id, MIN(finished_at) AS passed_at FROM attempts
     WHERE finished_at IS NOT NULL AND score = out_of GROUP BY week_id`,
  ).all<{ week_id: string; passed_at: number }>();
  return new Map(results.map((r) => [r.week_id, r.passed_at]));
}

async function roadmap(env: Env) {
  const passed = await passedWeekIds(env);
  const today = tokyoDate(now(env));
  let previousPassed = true;
  let activeFound = false;

  const weeks = homeworkWeeks.map((w) => {
    let status: WeekStatus;
    if (passed.has(w.id)) {
      status = "passed";
    } else if (!activeFound && previousPassed) {
      activeFound = true;
      status = today >= w.opensOn ? "active" : "scheduled";
    } else {
      status = "locked";
    }
    previousPassed = passed.has(w.id);
    return { id: w.id, theme: w.theme, weekOf: w.weekOf, opensOn: w.opensOn, status };
  });

  return weeks;
}

async function activeWeek(env: Env): Promise<HomeworkWeek | null> {
  const weeks = await roadmap(env);
  const active = weeks.find((w) => w.status === "active");
  return active ? findWeek(active.id) : null;
}

async function cooldownUntil(env: Env, weekId: string): Promise<number | null> {
  const last = await env.DB.prepare(
    `SELECT finished_at, score, out_of FROM attempts
     WHERE week_id = ? AND finished_at IS NOT NULL ORDER BY finished_at DESC LIMIT 1`,
  )
    .bind(weekId)
    .first<{ finished_at: number; score: number; out_of: number }>();
  if (!last || last.score === last.out_of) return null;
  const retryAt = last.finished_at + RETRY_COOLDOWN_MS;
  return retryAt > now(env) ? retryAt : null;
}

async function openAttempt(env: Env, weekId: string): Promise<AttemptRow | null> {
  return env.DB.prepare(
    `SELECT * FROM attempts WHERE week_id = ? AND finished_at IS NULL
     ORDER BY started_at DESC LIMIT 1`,
  )
    .bind(weekId)
    .first<AttemptRow>();
}

async function answeredResults(env: Env, attemptId: string, week: HomeworkWeek) {
  const { results } = await env.DB.prepare(
    `SELECT question_id, answer, correct FROM answers WHERE attempt_id = ?`,
  )
    .bind(attemptId)
    .all<AnswerRow>();
  const out: Record<string, ReturnType<typeof feedback>> = {};
  for (const row of results) {
    const q = week.questions.find((x) => x.id === row.question_id);
    if (q) out[row.question_id] = feedback(q, row.answer, row.correct === 1);
  }
  return out;
}

function feedback(q: HomeworkQuestion, answer: string, correct: boolean) {
  return { answer, correct, correctAnswer: q.answer, explanation: q.explanation };
}

async function loadAttempt(env: Env, attemptId: unknown): Promise<AttemptRow> {
  if (typeof attemptId !== "string") throw new HttpError(400, "Missing attemptId");
  const attempt = await env.DB.prepare(`SELECT * FROM attempts WHERE id = ?`)
    .bind(attemptId)
    .first<AttemptRow>();
  if (!attempt) throw new HttpError(404, "Unknown attempt");
  if (attempt.finished_at !== null) throw new HttpError(409, "This attempt is already finished");
  return attempt;
}

// ---------- handlers ----------

async function handleLog(env: Env) {
  const { results } = await env.DB.prepare(
    `SELECT week_id, MAX(score) AS best, MAX(out_of) AS out_of, COUNT(*) AS attempts,
            MAX(finished_at) AS last_at,
            MIN(CASE WHEN score = out_of THEN finished_at END) AS passed_at
     FROM attempts WHERE finished_at IS NOT NULL GROUP BY week_id`,
  ).all<{
    week_id: string;
    best: number;
    out_of: number;
    attempts: number;
    last_at: number;
    passed_at: number | null;
  }>();

  const byWeek = new Map(results.map((r) => [r.week_id, r]));
  const entries = homeworkWeeks
    .filter((w) => byWeek.has(w.id))
    .map((w) => {
      const r = byWeek.get(w.id)!;
      return {
        id: w.id,
        theme: w.theme,
        weekOf: w.weekOf,
        bestScore: r.best,
        outOf: r.out_of,
        attempts: r.attempts,
        passedAt: r.passed_at,
        lastAttemptAt: r.last_at,
        logNote: w.logNote ?? null,
      };
    })
    .reverse(); // newest week first
  return { entries };
}

async function handleOverview(env: Env) {
  const weeks = await roadmap(env);
  const active = weeks.find((w) => w.status === "active");
  if (!active) return { weeks, active: null };

  const week = findWeek(active.id);
  const attempt = await openAttempt(env, week.id);
  return {
    weeks,
    active: {
      id: week.id,
      theme: week.theme,
      weekOf: week.weekOf,
      dadNote: week.dadNote,
      topics: week.topics,
      resources: week.resources ?? [],
      questionCount: week.questions.length,
      retryAt: await cooldownUntil(env, week.id),
      inProgress: attempt !== null,
    },
  };
}

async function handleStart(env: Env) {
  const week = await activeWeek(env);
  if (!week) throw new HttpError(409, "No homework is open right now");

  let attempt = await openAttempt(env, week.id);
  if (!attempt) {
    const retryAt = await cooldownUntil(env, week.id);
    if (retryAt) throw new HttpError(429, "Take a little break first", { retryAt });
    attempt = {
      id: crypto.randomUUID(),
      week_id: week.id,
      started_at: now(env),
      finished_at: null,
      score: null,
      out_of: week.questions.length,
    };
    await env.DB.prepare(
      `INSERT INTO attempts (id, week_id, started_at, out_of) VALUES (?, ?, ?, ?)`,
    )
      .bind(attempt.id, attempt.week_id, attempt.started_at, attempt.out_of)
      .run();
  }

  return {
    attemptId: attempt.id,
    weekId: week.id,
    questions: week.questions.map(publicQuestion),
    answered: await answeredResults(env, attempt.id, week),
  };
}

async function handleAnswer(env: Env, request: Request) {
  const body = await readJson<{ attemptId?: unknown; questionId?: unknown; answer?: unknown }>(
    request,
  );
  const attempt = await loadAttempt(env, body.attemptId);
  const week = findWeek(attempt.week_id);
  const question = week.questions.find((q) => q.id === body.questionId);
  if (!question) throw new HttpError(404, "Unknown question");
  if (typeof body.answer !== "string" || body.answer.trim() === "") {
    throw new HttpError(400, "Missing answer");
  }

  // First answer is final — re-sending returns the stored result instead of re-grading.
  const existing = await env.DB.prepare(
    `SELECT question_id, answer, correct FROM answers WHERE attempt_id = ? AND question_id = ?`,
  )
    .bind(attempt.id, question.id)
    .first<AnswerRow>();
  if (existing) return feedback(question, existing.answer, existing.correct === 1);

  const answer = body.answer.slice(0, 200);
  const correct = grade(question, answer);
  await env.DB.prepare(
    `INSERT INTO answers (attempt_id, question_id, answer, correct, answered_at)
     VALUES (?, ?, ?, ?, ?)`,
  )
    .bind(attempt.id, question.id, answer, correct ? 1 : 0, now(env))
    .run();
  return feedback(question, answer, correct);
}

async function handleFinish(env: Env, request: Request) {
  const body = await readJson<{ attemptId?: unknown }>(request);
  const attempt = await loadAttempt(env, body.attemptId);
  const week = findWeek(attempt.week_id);

  const row = await env.DB.prepare(
    `SELECT COUNT(*) AS answered, COALESCE(SUM(correct), 0) AS score
     FROM answers WHERE attempt_id = ?`,
  )
    .bind(attempt.id)
    .first<{ answered: number; score: number }>();
  if (!row || row.answered < week.questions.length) {
    throw new HttpError(400, "Answer every question before finishing");
  }

  const finishedAt = now(env);
  await env.DB.prepare(`UPDATE attempts SET finished_at = ?, score = ? WHERE id = ?`)
    .bind(finishedAt, row.score, attempt.id)
    .run();

  const perfect = row.score === week.questions.length;
  const weeks = await roadmap(env);
  const index = weeks.findIndex((w) => w.id === week.id);
  const next = weeks[index + 1] ?? null;

  return {
    score: row.score,
    outOf: week.questions.length,
    perfect,
    retryAt: perfect ? null : finishedAt + RETRY_COOLDOWN_MS,
    next: perfect && next ? { theme: next.theme, status: next.status, opensOn: next.opensOn } : null,
  };
}

// ---------- routing ----------

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  return {
    "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });
}

async function route(request: Request, env: Env): Promise<unknown> {
  const { pathname } = new URL(request.url);
  const method = request.method;

  if (method === "GET" && pathname === "/api/log") return handleLog(env);

  requireAuth(request, env);
  if (method === "POST" && pathname === "/api/auth") return { ok: true };
  if (method === "GET" && pathname === "/api/homework") return handleOverview(env);
  if (method === "POST" && pathname === "/api/homework/start") return handleStart(env);
  if (method === "POST" && pathname === "/api/homework/answer") return handleAnswer(env, request);
  if (method === "POST" && pathname === "/api/homework/finish") return handleFinish(env, request);

  throw new HttpError(404, "Not found");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    try {
      return json(await route(request, env), 200, cors);
    } catch (err) {
      if (err instanceof HttpError) {
        return json({ error: err.message, ...err.extra }, err.status, cors);
      }
      console.error(err);
      return json({ error: "Something went wrong" }, 500, cors);
    }
  },
} satisfies ExportedHandler<Env>;

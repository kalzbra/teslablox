/**
 * Device-local tracking for the homework lock/unlock sequence — stored in localStorage, not
 * anywhere in site data. This is purely functional bookkeeping ("has this device passed week X
 * yet, so week X+1 can unlock") and is intentionally SEPARATE from the public "Daddy's Homework
 * Log" on the page, which stays hand-curated in src/data/homework.ts (HomeworkWeek.result) so it
 * stays visible to every visitor regardless of device. This progress data only exists on
 * whichever device/browser actually took the quiz, and resets if that browser's storage is
 * cleared — acceptable for now since there's no backend to sync it across devices.
 */

export type Attempt = { score: number; outOf: number; timestamp: number };
export type WeekProgress = { attempts: Attempt[]; passedAt?: number };
export type ProgressState = Record<string, WeekProgress>;

const STORAGE_KEY = "teslablox:homework-progress";

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressState) : {};
  } catch {
    return {};
  }
}

function saveProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Records one quiz attempt for a week and returns the updated state. A perfect score sets
 * `passedAt` (first time only — retaking a passed week for fun won't un-set it). */
export function saveAttempt(weekId: string, score: number, outOf: number): ProgressState {
  const state = loadProgress();
  const now = Date.now();
  const existing = state[weekId] ?? { attempts: [] };
  const perfect = outOf > 0 && score === outOf;

  state[weekId] = {
    attempts: [...existing.attempts, { score, outOf, timestamp: now }],
    passedAt: existing.passedAt ?? (perfect ? now : undefined),
  };
  saveProgress(state);
  return state;
}

export function hasPassed(state: ProgressState, weekId: string): boolean {
  return Boolean(state[weekId]?.passedAt);
}

export function lastAttemptAt(state: ProgressState, weekId: string): number | undefined {
  const attempts = state[weekId]?.attempts ?? [];
  return attempts.length > 0 ? attempts[attempts.length - 1].timestamp : undefined;
}

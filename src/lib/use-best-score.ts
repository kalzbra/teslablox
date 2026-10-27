"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A per-device personal best for a game, kept in localStorage. Read through
 * useSyncExternalStore (string snapshot = reference-stable) so the static prerender shows "no
 * best yet" and the browser fills it in after hydration without a mismatch.
 * `lowerIsBetter` is for games scored in moves/seconds.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function useBestScore(game: string, lowerIsBetter = false) {
  const storageKey = `teslablox:best:${game}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(storageKey),
    () => null,
  );
  const best = raw === null ? null : Number(raw);

  /** Records a finished game's score; returns true if it's a new personal best. */
  const record = useCallback(
    (score: number) => {
      const current = window.localStorage.getItem(storageKey);
      const prev = current === null ? null : Number(current);
      const isBest = prev === null || (lowerIsBetter ? score < prev : score > prev);
      if (isBest) {
        window.localStorage.setItem(storageKey, String(score));
        for (const listener of listeners) listener();
      }
      return isBest;
    },
    [storageKey, lowerIsBetter],
  );

  return { best, record };
}

/** Random integer in [min, max]. Only call from event handlers/effects, never during render. */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Fisher–Yates shuffle with Math.random — event handlers only (see seeded-random.ts for render). */
export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

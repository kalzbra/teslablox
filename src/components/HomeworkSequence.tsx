"use client";

import { useCallback, useEffect, useState } from "react";
import type { HomeworkWeek } from "@/data/homework";
import { hasPassed, loadProgress, type ProgressState } from "@/lib/homework-progress";
import HomeworkQuiz from "@/components/HomeworkQuiz";
import Card from "@/components/ui/Card";

export default function HomeworkSequence({ weeks }: { weeks: HomeworkWeek[] }) {
  const questionWeeks = weeks.filter((w) => w.questions && w.questions.length > 0);

  // null = progress not checked yet. Deferring the real value to post-mount avoids a
  // hydration mismatch — the server (and the client's first paint) can't know what's in this
  // particular browser's localStorage, so both render nothing until this effect runs.
  const [progress, setProgress] = useState<ProgressState | null>(null);

  const refresh = useCallback(() => setProgress(loadProgress()), []);

  // Deliberately NOT useSyncExternalStore here: `loadProgress()` returns a freshly-parsed
  // object every call, which would break useSyncExternalStore's reference-stability contract,
  // and — more importantly — this view should only update when explicitly refreshed (via
  // HomeworkQuiz's onPassed, after the user clicks past the celebration screen), not the
  // instant the store changes. A plain mount-time read is the right tool here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  if (progress === null) {
    return null;
  }

  const activeIndex = questionWeeks.findIndex((w) => !hasPassed(progress, w.id));
  const allCaughtUp = activeIndex === -1;
  const activeWeek = allCaughtUp ? null : questionWeeks[activeIndex];

  return (
    <div className="flex flex-col gap-10">
      {activeWeek ? (
        <>
          <div className="mx-auto max-w-xl rounded-card bg-gradient-to-br from-electric-50 to-sky-100 p-6 text-center shadow-card ring-1 ring-ink-700/5 sm:p-8">
            <p className="font-heading text-sm font-semibold text-electric-600">
              {activeWeek.theme}
            </p>
            <p className="mt-2 text-lg text-ink-700">{activeWeek.dadNote}</p>
          </div>

          {/* key={activeWeek.id} forces a fresh component instance when the active week
              changes, so the quiz's internal state (step, score, etc.) resets instead of
              carrying over stale state from the previous week. */}
          <HomeworkQuiz key={activeWeek.id} week={activeWeek} onPassed={refresh} />
        </>
      ) : (
        <Card className="mx-auto max-w-xl p-8 text-center">
          <p className="text-4xl">🎉</p>
          <p className="mt-3 font-heading text-2xl font-semibold text-ink-700">
            You&apos;re all caught up!
          </p>
          <p className="mt-2 text-ink-500">
            Check back soon — Daddy will add more homework for you to unlock.
          </p>
        </Card>
      )}

      {questionWeeks.length > 1 && (
        <div>
          <p className="mb-4 text-center font-heading text-lg font-semibold text-ink-700">
            Homework Roadmap
          </p>
          <ul className="mx-auto flex max-w-xl flex-col gap-2">
            {questionWeeks.map((w, i) => {
              const passed = hasPassed(progress, w.id);
              const isActive = !allCaughtUp && i === activeIndex;
              const locked = !passed && !isActive;

              return (
                <li
                  key={w.id}
                  className={`flex items-center gap-3 rounded-2xl px-5 py-3 ${
                    passed
                      ? "bg-green-50 text-green-700"
                      : isActive
                        ? "bg-electric-100 text-electric-700"
                        : "bg-white/60 text-ink-500"
                  }`}
                >
                  <span aria-hidden="true">{passed ? "✅" : isActive ? "✏️" : "🔒"}</span>
                  <span className="font-medium">{w.theme}</span>
                  {locked && (
                    <span className="ml-auto text-xs">Unlocks after this week</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

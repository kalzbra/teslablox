"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ApiError, formatOpensOn, homeworkApi, type Overview } from "@/lib/homework-api";
import { useHomeworkKey } from "@/components/HomeworkPasswordGate";
import HomeworkQuiz from "@/components/HomeworkQuiz";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type LoadState =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "ready"; overview: Overview };

const STATUS_STYLE = {
  passed: { icon: "✅", className: "bg-green-50 text-green-700" },
  active: { icon: "✏️", className: "bg-electric-100 text-electric-700" },
  scheduled: { icon: "📅", className: "bg-spark-300/30 text-ink-700" },
  locked: { icon: "🔒", className: "bg-white/60 text-ink-500" },
} as const;

export default function HomeworkSequence() {
  const { key, lock } = useHomeworkKey();
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [reloads, setReloads] = useState(0);

  const refresh = useCallback(() => setReloads((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    homeworkApi
      .overview(key)
      .then((overview) => {
        if (!cancelled) setState({ kind: "ready", overview });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) lock(); // password changed
        else setState({ kind: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [key, lock, reloads]);

  if (state.kind === "loading") {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center text-ink-500">
        Loading your homework… ⚡
      </Card>
    );
  }

  if (state.kind === "error") {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        <p className="text-ink-700">Can&apos;t reach the homework server right now.</p>
        <div className="mt-4">
          <Button
            variant="electric"
            onClick={() => {
              setState({ kind: "loading" });
              refresh();
            }}
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  const { weeks, active } = state.overview;
  const scheduled = weeks.find((w) => w.status === "scheduled");

  return (
    <div className="flex flex-col gap-10">
      {active ? (
        <>
          <div className="mx-auto max-w-xl rounded-card bg-gradient-to-br from-electric-50 to-sky-100 p-6 text-center shadow-card ring-1 ring-ink-700/5 sm:p-8">
            <p className="font-heading text-sm font-semibold text-electric-600">{active.theme}</p>
            <p className="mt-2 text-lg text-ink-700">{active.dadNote}</p>
          </div>
          {/* key forces a fresh quiz instance (fresh step/score state) when the week changes. */}
          <HomeworkQuiz key={active.id} week={active} onDone={refresh} />
        </>
      ) : scheduled ? (
        <Card className="mx-auto max-w-xl p-8 text-center">
          <p className="text-4xl">🎉</p>
          <p className="mt-3 font-heading text-2xl font-semibold text-ink-700">
            This week&apos;s homework is done!
          </p>
          <p className="mt-2 text-ink-500">
            Next up: <span className="font-semibold text-ink-700">{scheduled.theme}</span> —
            opens on {formatOpensOn(scheduled.opensOn)}.
          </p>
          <p className="mt-4 text-sm text-ink-500">
            Until then, try a game in the{" "}
            <Link href="/fun-zone" className="font-medium text-electric-600 underline">
              Fun Zone
            </Link>
            !
          </p>
        </Card>
      ) : (
        <Card className="mx-auto max-w-xl p-8 text-center">
          <p className="text-4xl">🏆</p>
          <p className="mt-3 font-heading text-2xl font-semibold text-ink-700">
            You&apos;re all caught up!
          </p>
          <p className="mt-2 text-ink-500">Daddy will add more homework soon.</p>
        </Card>
      )}

      <div>
        <p className="mb-4 text-center font-heading text-lg font-semibold text-ink-700">
          Homework Roadmap
        </p>
        <ul className="mx-auto flex max-w-xl flex-col gap-2">
          {weeks.map((w) => {
            const style = STATUS_STYLE[w.status];
            return (
              <li
                key={w.id}
                className={`flex items-center gap-3 rounded-2xl px-5 py-3 ${style.className}`}
              >
                <span aria-hidden="true">{style.icon}</span>
                <span className="font-medium">{w.theme}</span>
                {w.status === "scheduled" && (
                  <span className="ml-auto text-xs">Opens {formatOpensOn(w.opensOn)}</span>
                )}
                {w.status === "locked" && (
                  <span className="ml-auto text-xs">Finish the week before first</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

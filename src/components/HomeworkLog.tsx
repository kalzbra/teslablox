"use client";

import { useEffect, useState } from "react";
import { HOMEWORK_UPDATED_EVENT, homeworkApi, type LogEntry } from "@/lib/homework-api";
import Card from "@/components/ui/Card";

function formatDay(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Tokyo",
  });
}

/** Filled in automatically by the homework API — every finished attempt is recorded there. */
export default function HomeworkLog() {
  const [entries, setEntries] = useState<LogEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const load = () =>
      homeworkApi
        .log()
        .then((data) => setEntries(data.entries))
        .catch(() => setFailed(true));
    void load();
    window.addEventListener(HOMEWORK_UPDATED_EVENT, load);
    return () => window.removeEventListener(HOMEWORK_UPDATED_EVENT, load);
  }, []);

  if (failed) {
    return <p className="text-center text-ink-500">The homework log is taking a nap — check back soon.</p>;
  }
  if (entries === null) {
    return <p className="text-center text-ink-500">Loading the log…</p>;
  }
  if (entries.length === 0) {
    return (
      <p className="text-center text-ink-500">
        No homework finished yet — scores show up here automatically.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {entries.map((e) => {
        const pct = Math.round((e.bestScore / e.outOf) * 100);
        return (
          <li key={e.id}>
            <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-heading text-lg font-semibold text-ink-700">
                  {e.passedAt ? "✅ " : ""}
                  {e.theme}
                </p>
                <p className="text-sm text-ink-500">
                  {e.passedAt
                    ? `Perfect score on ${formatDay(e.passedAt)}`
                    : `Last tried ${formatDay(e.lastAttemptAt)}`}
                  {" · "}
                  {e.attempts} {e.attempts === 1 ? "try" : "tries"}
                </p>
                {e.logNote && (
                  <p className="mt-1 text-sm italic text-ink-500">&ldquo;{e.logNote}&rdquo;</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-cream-200 sm:w-28">
                  <div className="h-full rounded-full bg-electric-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="shrink-0 font-heading text-lg font-semibold text-electric-600">
                  {e.bestScore}/{e.outOf}
                </span>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

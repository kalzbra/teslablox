import Card from "@/components/ui/Card";
import type { HomeworkWeek } from "@/data/homework";

export default function HomeworkLog({ weeks }: { weeks: HomeworkWeek[] }) {
  const logged = weeks.filter((w) => w.result);

  if (logged.length === 0) {
    return (
      <p className="text-center text-ink-500">
        No scores logged yet — check back after Tesla&apos;s first week of homework!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {logged.map((week) => {
        const result = week.result!;
        const pct = Math.round((result.score / result.outOf) * 100);
        return (
          <li key={week.id}>
            <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-heading text-lg font-semibold text-ink-700">{week.theme}</p>
                <p className="text-sm text-ink-500">{result.dateTaken}</p>
                {result.note && (
                  <p className="mt-1 text-sm italic text-ink-500">&ldquo;{result.note}&rdquo;</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-cream-200 sm:w-28">
                  <div
                    className="h-full rounded-full bg-electric-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="shrink-0 font-heading text-lg font-semibold text-electric-600">
                  {result.score}/{result.outOf}
                </span>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

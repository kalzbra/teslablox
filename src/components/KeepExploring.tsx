import ExternalLink from "@/components/ui/ExternalLink";
import Card from "@/components/ui/Card";
import { categoryEmoji, learningResources, type LearningCategory } from "@/data/learning-resources";
import type { WeekResource } from "@/lib/homework-api";

const KIND_LABEL: Record<WeekResource["kind"], string> = {
  video: "🎬 Watch",
  site: "📖 Explore",
  game: "🎮 Play",
};

function isCategory(topic: string): topic is LearningCategory {
  return topic in learningResources;
}

export default function KeepExploring({
  topics,
  resources = [],
}: {
  topics: string[];
  resources?: WeekResource[];
}) {
  const categories = topics.filter(isCategory);
  if (categories.length === 0 && resources.length === 0) return null;

  return (
    <div className="mt-8 text-left">
      <p className="text-center font-heading text-lg font-semibold text-ink-700">
        Keep Exploring 🔭
      </p>
      <p className="mt-1 text-center text-sm text-ink-500">
        Things to watch, read, and play that go with this week&apos;s homework.
      </p>

      {resources.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3">
          {resources.map((r) => (
            <li key={r.href}>
              <Card className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-electric-600">
                  {KIND_LABEL[r.kind]}
                  {r.minutes ? ` · about ${r.minutes} min` : ""}
                </p>
                <div className="mt-1">
                  <ExternalLink href={r.href}>{r.title}</ExternalLink>
                </div>
                <p className="mt-0.5 text-sm text-ink-500">{r.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {categories.length > 0 && (
        <>
          {resources.length > 0 && (
            <p className="mt-6 text-center text-sm font-medium text-ink-500">More to explore</p>
          )}
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {categories.map((topic) => (
              <Card key={topic} className="p-5">
                <p className="font-heading font-semibold text-ink-700">
                  <span aria-hidden="true">{categoryEmoji[topic]}</span> {topic}
                </p>
                <ul className="mt-2 flex flex-col gap-3">
                  {learningResources[topic].map((resource) => (
                    <li key={resource.href}>
                      <ExternalLink href={resource.href}>{resource.title}</ExternalLink>
                      <p className="mt-0.5 text-sm text-ink-500">{resource.description}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

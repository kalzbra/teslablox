import ExternalLink from "@/components/ui/ExternalLink";
import Card from "@/components/ui/Card";
import { categoryEmoji, learningResources, type LearningCategory } from "@/data/learning-resources";

export default function KeepExploring({ topics }: { topics: LearningCategory[] }) {
  if (topics.length === 0) return null;

  return (
    <div className="mt-8 text-left">
      <p className="text-center font-heading text-lg font-semibold text-ink-700">
        Keep Exploring 🔭
      </p>
      <p className="mt-1 text-center text-sm text-ink-500">
        A few more things to watch or read about this week&apos;s topics.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
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
    </div>
  );
}

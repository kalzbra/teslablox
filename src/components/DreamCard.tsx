import Card from "@/components/ui/Card";

export default function DreamCard({
  emoji,
  eyebrow,
  quote,
  body,
}: {
  emoji: string;
  eyebrow: string;
  quote: string;
  body: string;
}) {
  return (
    <Card className="flex h-full flex-col gap-3 p-7">
      <span aria-hidden="true" className="text-4xl">
        {emoji}
      </span>
      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-electric-600">
        {eyebrow}
      </p>
      <p className="font-heading text-xl font-semibold italic text-ink-700">“{quote}”</p>
      <p className="text-ink-500">{body}</p>
    </Card>
  );
}

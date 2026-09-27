import Card from "@/components/ui/Card";
import type { TeslaFact } from "@/data/nikola-tesla";

export default function NikolaTeslaCard({ fact }: { fact: TeslaFact }) {
  return (
    <Card className="flex h-full flex-col gap-2 p-6">
      <span aria-hidden="true" className="text-3xl">
        {fact.emoji}
      </span>
      <h3 className="font-heading text-lg font-semibold text-ink-700">{fact.title}</h3>
      <p className="text-ink-500">{fact.body}</p>
    </Card>
  );
}

import type { TeslaFact } from "@/data/nikola-tesla";
import { accent } from "@/lib/accents";

export default function NikolaTeslaCard({ fact, index }: { fact: TeslaFact; index: number }) {
  const a = accent(index);
  return (
    <div className={`reveal group flex h-full flex-col gap-2 rounded-card p-6 shadow-card ring-2 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${a.soft} ${a.ring}`}>
      <span aria-hidden="true" className={`wiggle flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-card ${a.solid}`}>
        {fact.emoji}
      </span>
      <h3 className={`mt-2 font-heading text-xl font-bold ${a.text}`}>{fact.title}</h3>
      <p className="text-ink-700">{fact.body}</p>
    </div>
  );
}

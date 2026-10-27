import { accent } from "@/lib/accents";

export default function FamilyCard({ name, index }: { name: string; index: number }) {
  const a = accent(index);
  return (
    <div
      className={`reveal group flex flex-col items-center gap-3 rounded-card p-6 text-center shadow-card ring-2 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${a.soft} ${a.ring}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-16 w-16 items-center justify-center rounded-full font-heading text-3xl font-bold shadow-card ${a.solid}`}
      >
        {name[0]}
      </span>
      <p className={`font-heading text-xl font-bold ${a.text}`}>{name}</p>
      <span aria-hidden="true" className="wiggle text-2xl">
        👋
      </span>
    </div>
  );
}

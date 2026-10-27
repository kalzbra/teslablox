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
    <div className="reveal group flex h-full flex-col gap-3 rounded-card bg-white p-7 shadow-card-lg ring-4 ring-white/60">
      <span aria-hidden="true" className="wiggle text-5xl">
        {emoji}
      </span>
      <p className="w-fit rounded-full bg-violet-500 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-wide text-white">
        {eyebrow}
      </p>
      <p className="font-heading text-2xl font-semibold italic text-violet-700">“{quote}”</p>
      <p className="text-ink-700">{body}</p>
    </div>
  );
}

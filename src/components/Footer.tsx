import LightningBolt from "@/components/decorative/LightningBolt";

const WORDS = [
  { word: "Adventures", className: "bg-coral-500 text-white" },
  { word: "Family", className: "bg-mint-500 text-white" },
  { word: "Fun", className: "bg-spark-400 text-ink-700" },
  { word: "Dreams", className: "bg-violet-500 text-white" },
  { word: "Science", className: "bg-sky-500 text-white" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-electric-700 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 py-12 text-center sm:px-8">
        <p className="flex items-center gap-2 font-heading text-2xl font-bold">
          <LightningBolt className="h-7 w-7 text-spark-400" />
          TeslaBlox
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {WORDS.map((w) => (
            <li key={w.word} className={`rounded-full px-3 py-1 text-sm font-semibold ${w.className}`}>
              {w.word}
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/80">Made with love for Tesla. ⚡</p>
      </div>
    </footer>
  );
}

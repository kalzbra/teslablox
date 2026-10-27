/**
 * The site's color rotation. Each accent pairs a soft tint (backgrounds) with a dark shade that
 * passes contrast as text on that tint, plus a bright solid for badges/buttons. Full class
 * strings are written out literally so Tailwind can see them.
 */
export type Accent = {
  name: string;
  soft: string; // light background
  text: string; // readable text on the soft background
  solid: string; // bright fill with white text
  ring: string; // border/ring color
  band: string; // full-width section background
  hover: string; // soft tint on hover
};

export const ACCENTS: Accent[] = [
  { name: "electric", soft: "bg-electric-100", text: "text-electric-700", solid: "bg-electric-500 text-white", ring: "ring-electric-300", band: "bg-electric-100", hover: "hover:bg-electric-100" },
  { name: "coral", soft: "bg-coral-100", text: "text-coral-700", solid: "bg-coral-500 text-white", ring: "ring-coral-300", band: "bg-coral-100", hover: "hover:bg-coral-100" },
  { name: "mint", soft: "bg-mint-100", text: "text-mint-700", solid: "bg-mint-500 text-white", ring: "ring-mint-300", band: "bg-mint-100", hover: "hover:bg-mint-100" },
  { name: "spark", soft: "bg-spark-100", text: "text-spark-700", solid: "bg-spark-400 text-ink-700", ring: "ring-spark-300", band: "bg-spark-100", hover: "hover:bg-spark-100" },
  { name: "violet", soft: "bg-violet-100", text: "text-violet-700", solid: "bg-violet-500 text-white", ring: "ring-violet-300", band: "bg-violet-100", hover: "hover:bg-violet-100" },
  { name: "berry", soft: "bg-berry-100", text: "text-berry-700", solid: "bg-berry-500 text-white", ring: "ring-berry-300", band: "bg-berry-100", hover: "hover:bg-berry-100" },
  { name: "sky", soft: "bg-sky-100", text: "text-sky-700", solid: "bg-sky-500 text-white", ring: "ring-sky-300", band: "bg-sky-100", hover: "hover:bg-sky-100" },
];

export type AccentName = "electric" | "coral" | "mint" | "spark" | "violet" | "berry" | "sky";

export function accent(i: number): Accent {
  return ACCENTS[((i % ACCENTS.length) + ACCENTS.length) % ACCENTS.length];
}

export function accentNamed(name: AccentName): Accent {
  return ACCENTS.find((a) => a.name === name)!;
}

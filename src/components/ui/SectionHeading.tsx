import { accentNamed, type AccentName } from "@/lib/accents";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  color = "electric",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  color?: AccentName;
}) {
  const a = accentNamed(color);
  return (
    <div className={`reveal mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p
          className={`mb-3 inline-block rounded-full px-4 py-1 font-heading text-sm font-semibold uppercase tracking-wide ${a.solid}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-ink-700 sm:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg text-ink-500 ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

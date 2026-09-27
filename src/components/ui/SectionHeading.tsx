export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-electric-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-ink-700 sm:text-4xl">{title}</h2>
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

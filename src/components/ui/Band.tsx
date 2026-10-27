import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { accentNamed, type AccentName } from "@/lib/accents";

/** A wavy edge drawn in the band's own color, so sections flow into each other playfully. */
function Wave({ flip, className }: { flip?: boolean; className: string }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-6 w-full sm:h-10 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 24 C 180 0, 360 48, 540 24 S 900 0, 1080 24 S 1260 48, 1440 24 V48 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const WAVE_TEXT: Record<AccentName, string> = {
  electric: "text-electric-100",
  coral: "text-coral-100",
  mint: "text-mint-100",
  spark: "text-spark-100",
  violet: "text-violet-100",
  berry: "text-berry-100",
  sky: "text-sky-100",
};

/**
 * A full-width colored section. With no color it's a plain section on the page background —
 * alternating plain and colored bands is what keeps long pages from feeling like one beige wall.
 */
export default function Band({
  color,
  children,
  className = "",
}: {
  color?: AccentName;
  children: ReactNode;
  className?: string;
}) {
  if (!color) {
    return (
      <section className={`py-14 sm:py-16 ${className}`}>
        <Container>{children}</Container>
      </section>
    );
  }
  const a = accentNamed(color);
  return (
    <section className={className}>
      <Wave className={WAVE_TEXT[color]} />
      <div className={`${a.band} bg-dots py-12 sm:py-14`}>
        <Container>{children}</Container>
      </div>
      <Wave flip className={WAVE_TEXT[color]} />
    </section>
  );
}

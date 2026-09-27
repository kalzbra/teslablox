import Link from "next/link";
import { ReactNode } from "react";

type Variant = "electric" | "spark" | "coral" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  electric:
    "bg-electric-500 text-white hover:bg-electric-600 shadow-card",
  spark: "bg-spark-400 text-ink-700 hover:bg-spark-500 shadow-card",
  coral: "bg-coral-500 text-white hover:bg-coral-600 shadow-card",
  ghost:
    "bg-white/80 text-ink-700 border-2 border-ink-700/10 hover:border-electric-500 hover:text-electric-600",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-base font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0";

export default function Button({
  children,
  href,
  onClick,
  variant = "electric",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}

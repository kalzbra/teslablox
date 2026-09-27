import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag
      className={`rounded-card bg-white/90 shadow-card ring-1 ring-ink-700/5 ${className}`}
    >
      {children}
    </Tag>
  );
}

import { ReactNode } from "react";

/** Every outbound link on the site should use this — it always opens safely and always
 * makes clear that the visitor is leaving Tesla's site (spec §28). */
export default function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  let hostname = href;
  try {
    hostname = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    // leave as-is if href is somehow not a full URL
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-medium text-electric-600 underline decoration-electric-300 decoration-2 underline-offset-4 hover:text-electric-700 ${className}`}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="h-4 w-4 shrink-0"
      >
        <path
          d="M7 5h8v8M15 5 5 15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">(leaving TeslaBlox, opens {hostname} in a new tab)</span>
    </a>
  );
}

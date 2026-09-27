import type { TimelineStep } from "@/data/trip-kabale";

export default function AdventureTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative flex flex-col gap-6 border-l-2 border-electric-200 pl-6 sm:pl-8">
      {steps.map((step) => (
        <li key={step.label} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[1.95rem] top-1 h-4 w-4 rounded-full bg-electric-500 ring-4 ring-electric-100 sm:-left-[2.45rem]"
          />
          <p className="text-sm font-medium text-electric-600">{step.dateLabel}</p>
          <p className="font-heading text-lg font-medium text-ink-700">{step.label}</p>
        </li>
      ))}
    </ol>
  );
}

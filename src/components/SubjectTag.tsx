import type { HomeworkSubject } from "@/lib/homework-api";

const SUBJECT_STYLES: Record<HomeworkSubject, { emoji: string; className: string }> = {
  Science: { emoji: "🔬", className: "bg-electric-500/10 text-electric-700" },
  Math: { emoji: "➗", className: "bg-coral-500/10 text-coral-600" },
  Tech: { emoji: "💻", className: "bg-violet-500/10 text-violet-700" },
};

export default function SubjectTag({ subject }: { subject: HomeworkSubject }) {
  const { emoji, className } = SUBJECT_STYLES[subject];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      <span aria-hidden="true">{emoji}</span>
      {subject}
    </span>
  );
}

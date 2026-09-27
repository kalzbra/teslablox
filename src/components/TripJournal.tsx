import type { KabaleChapter } from "@/data/trip-kabale";

export default function TripJournal({ chapters }: { chapters: KabaleChapter[] }) {
  return (
    <div className="flex flex-col gap-8">
      {chapters.map((chapter) => (
        <article
          key={chapter.id}
          className="rounded-card border border-cream-200 bg-[repeating-linear-gradient(white,white_35px,var(--color-cream-100)_36px)] p-6 shadow-card sm:p-8"
        >
          <p className="text-sm font-medium text-electric-600">{chapter.dateLabel}</p>
          <h3 className="mt-1 font-heading text-2xl font-semibold text-ink-700">
            {chapter.heading}
          </h3>

          {chapter.pullQuote && (
            <blockquote className="my-4 border-l-4 border-spark-400 pl-4 font-heading text-xl italic text-ink-700">
              “{chapter.pullQuote}”
            </blockquote>
          )}

          <div className="mt-3 flex flex-col gap-4 text-lg leading-relaxed text-ink-500">
            {chapter.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

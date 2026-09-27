import Link from "next/link";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import type { TripPage } from "@/lib/photos";

export default function AdventureCard({
  href,
  title,
  subtitle,
  dateLabel,
  coverPhoto,
}: {
  href: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  coverPhoto: TripPage;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-card bg-white/90 shadow-card ring-1 ring-ink-700/5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
    >
      <div className="overflow-hidden">
        <ResponsivePhoto
          photo={coverPhoto}
          alt={`Cover page of ${title}`}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-electric-600">{dateLabel}</p>
        <h3 className="mt-1 font-heading text-xl font-semibold text-ink-700">{title}</h3>
        <p className="mt-2 text-ink-500">{subtitle}</p>
      </div>
    </Link>
  );
}

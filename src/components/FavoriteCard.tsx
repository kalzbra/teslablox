import Link from "next/link";
import ExternalLink from "@/components/ui/ExternalLink";
import Card from "@/components/ui/Card";
import type { Favorite } from "@/data/favorites";

export default function FavoriteCard({ favorite }: { favorite: Favorite }) {
  return (
    <Card className="flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <span aria-hidden="true" className="text-4xl">
        {favorite.emoji}
      </span>
      <h3 className="mt-3 font-heading text-xl font-semibold text-ink-700">
        {favorite.title}
      </h3>
      <p className="mt-2 flex-1 text-ink-500">{favorite.blurb}</p>
      {favorite.externalLink && (
        <div className="mt-4">
          <ExternalLink href={favorite.externalLink.href}>
            {favorite.externalLink.label}
          </ExternalLink>
        </div>
      )}
    </Card>
  );
}

export function FavoriteHighlightLink({ favorite }: { favorite: Favorite }) {
  return (
    <Link
      href={`/favorites#${favorite.slug}`}
      className="group flex flex-col items-center gap-2 rounded-card bg-white/80 p-5 text-center shadow-card ring-1 ring-ink-700/5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
    >
      <span
        aria-hidden="true"
        className="text-4xl transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
      >
        {favorite.emoji}
      </span>
      <span className="font-heading text-sm font-medium text-ink-700">{favorite.title}</span>
    </Link>
  );
}

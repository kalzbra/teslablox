import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExternalLink from "@/components/ui/ExternalLink";
import FavoriteCard from "@/components/FavoriteCard";
import Sparkle from "@/components/decorative/Sparkle";
import { favorites, favoriteSong } from "@/data/favorites";

export const metadata: Metadata = {
  title: "Favorites | TeslaBlox",
  description: "Things Tesla loves — games, music, sports, characters, and more.",
};

export default function FavoritesPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="My Favorites" title="Things Tesla Loves ❤️" />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <li key={favorite.slug} id={favorite.slug} className="scroll-mt-24">
            <FavoriteCard favorite={favorite} />
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-card bg-gradient-to-br from-electric-50 to-sky-100 p-8 text-center shadow-card ring-1 ring-ink-700/5 sm:p-10">
        <Sparkle className="mx-auto h-8 w-8 text-spark-500 animate-spark" />
        <h3 className="mt-3 font-heading text-2xl font-semibold text-ink-700">
          🎵 Tesla&apos;s Favorite Song
        </h3>
        <p className="mt-2 font-heading text-lg italic text-electric-600">
          “{favoriteSong.title}” — {favoriteSong.artist}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-ink-500">{favoriteSong.blurb}</p>
        <div className="mt-5">
          <ExternalLink href={favoriteSong.externalLink.href}>
            {favoriteSong.externalLink.label}
          </ExternalLink>
        </div>
      </div>
    </Container>
  );
}

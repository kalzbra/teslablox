import type { Metadata } from "next";
import Band from "@/components/ui/Band";
import SectionHeading from "@/components/ui/SectionHeading";
import ExternalLink from "@/components/ui/ExternalLink";
import FavoriteCard from "@/components/FavoriteCard";
import { favorites, favoriteSong } from "@/data/favorites";

export const metadata: Metadata = {
  title: "Favorites | TeslaBlox",
  description: "Things Tesla loves — games, music, sports, characters, and more.",
};

export default function FavoritesPage() {
  return (
    <>
      <Band>
        <SectionHeading
          eyebrow="My Favorites"
          title="Things Tesla Loves ❤️"
          subtitle="Tap a card to flip it over!"
          color="coral"
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite, i) => (
            <li key={favorite.slug} id={favorite.slug} className="scroll-mt-28">
              <FavoriteCard favorite={favorite} index={i} />
            </li>
          ))}
        </ul>
      </Band>

      <Band color="violet">
        <div className="reveal mx-auto max-w-2xl rounded-card bg-gradient-to-br from-violet-500 via-berry-500 to-coral-500 p-8 text-center text-white shadow-card-lg sm:p-10">
          <p className="text-5xl" aria-hidden="true">
            <span className="inline-block animate-float">🎵</span>
            <span className="ml-3 inline-block animate-float [animation-delay:0.6s]">🎶</span>
          </p>
          <h3 className="mt-3 font-heading text-3xl font-bold">Tesla&apos;s Favorite Song</h3>
          <p className="mt-2 font-heading text-2xl italic text-spark-300">
            “{favoriteSong.title}” — {favoriteSong.artist}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/95">{favoriteSong.blurb}</p>
          <div className="mt-6 inline-block rounded-full bg-white px-5 py-2">
            <ExternalLink href={favoriteSong.externalLink.href}>
              {favoriteSong.externalLink.label}
            </ExternalLink>
          </div>
        </div>
      </Band>
    </>
  );
}

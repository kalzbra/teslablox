import Link from "next/link";
import Band from "@/components/ui/Band";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import HeroSection from "@/components/HeroSection";
import { FavoriteHighlightLink } from "@/components/FavoriteCard";
import AdventureCard from "@/components/AdventureCard";
import DreamCard from "@/components/DreamCard";
import FamilyCard from "@/components/FamilyCard";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import RandomFact from "@/components/RandomFact";
import { bio } from "@/data/tesla";
import { favorites, homepageHighlightSlugs } from "@/data/favorites";
import { cousins } from "@/data/family";
import { dreams } from "@/data/dreams";
import { nikolaTeslaIntro } from "@/data/nikola-tesla";
import { kabaleMeta } from "@/data/trip-kabale";
import { accent } from "@/lib/accents";
import { heroPhotos, homepagePhotoSelection, tripPages } from "@/lib/photos";

const FEATURED_GAMES = [
  { id: "sudoku", title: "Mini Sudoku", emoji: "🔢" },
  { id: "times", title: "Times Table Sprint", emoji: "⏱️" },
  { id: "rocket", title: "Rocket Word Guess", emoji: "🚀" },
  { id: "sliding", title: "Photo Slide Puzzle", emoji: "🧩" },
];

export default function Home() {
  const hero = heroPhotos();
  const heroIds = new Set(hero.map((p) => p.id));
  const highlightPhotos = homepagePhotoSelection(4).filter((p) => !heroIds.has(p.id));
  const kabaleCover = tripPages[0];

  return (
    <>
      <HeroSection photos={hero} />

      <Band>
        <SectionHeading eyebrow="Quick Intro" title="Meet Tesla 👋" color="coral" />
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xl text-ink-700">{bio.full[0]}</p>
          <div className="mt-6">
            <Button href="/about" variant="coral">
              Read Tesla&apos;s Full Story
            </Button>
          </div>
        </div>

        <div className="reveal mx-auto mt-14 flex max-w-3xl flex-col items-center gap-5 rounded-card bg-gradient-to-br from-electric-500 via-violet-500 to-berry-500 p-8 text-center text-white shadow-card-lg sm:flex-row sm:text-left">
          <span className="animate-float text-6xl" aria-hidden="true">
            🎓
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-spark-300">
              New every week
            </p>
            <p className="mt-1 font-heading text-2xl font-bold">
              This Week&apos;s Homework from Daddy in Japan
            </p>
            <p className="mt-1 text-white/90">
              Science, math, Japanese, English, and more — get a perfect score to unlock the next
              week!
            </p>
          </div>
          <Button href="/homework" variant="spark">
            Open Homework →
          </Button>
        </div>
      </Band>

      <Band color="spark">
        <SectionHeading
          eyebrow="Things Tesla Loves"
          title="Things Tesla Loves ❤️"
          subtitle="Tap a card to explore each favorite thing."
          color="coral"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {favorites
            .filter((f) => homepageHighlightSlugs.includes(f.slug as (typeof homepageHighlightSlugs)[number]))
            .map((f, i) => (
              <FavoriteHighlightLink key={f.slug} favorite={f} index={i} />
            ))}
        </div>
      </Band>

      <Band>
        <SectionHeading eyebrow="Tesla's Adventures 🌍" title="Where Tesla Has Been" color="mint" />
        <div className="reveal mx-auto max-w-md">
          {kabaleCover && (
            <AdventureCard
              href="/adventures/kabale"
              title="Tesla Trip to Kabale"
              subtitle={kabaleMeta.subtitle}
              dateLabel={kabaleMeta.dateRange}
              coverPhoto={kabaleCover}
            />
          )}
        </div>
      </Band>

      <Band color="violet">
        <SectionHeading eyebrow="Tesla's Dreams 🚀" title="YouTube Star or Scientist?" color="violet" />
        <div className="grid gap-6 sm:grid-cols-2">
          <DreamCard
            emoji="🎥"
            eyebrow="Tesla's Dream"
            quote={dreams.tesla.quote}
            body={dreams.tesla.body}
          />
          <DreamCard
            emoji="🔬"
            eyebrow="Dad's Dream"
            quote={dreams.dad.quote}
            body={dreams.dad.body}
          />
        </div>
        <div className="mt-8 text-center">
          <Button href="/dreams" variant="electric">
            See the Fun Twist
          </Button>
        </div>
      </Band>

      <Band>
        <SectionHeading eyebrow={nikolaTeslaIntro.heading} title="Why Is He Called Tesla? ⚡" color="sky" />
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xl text-ink-700">{nikolaTeslaIntro.body[0]}</p>
          <div className="mt-6">
            <Button href="/nikola-tesla" variant="electric">
              Meet Nikola Tesla ⚡
            </Button>
          </div>
        </div>
      </Band>

      {highlightPhotos.length > 0 && (
        <Band color="mint">
          <SectionHeading eyebrow="Photo Highlight" title="A Few Favorite Moments 📸" color="mint" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlightPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={`reveal overflow-hidden rounded-card bg-white p-2 shadow-card transition-transform duration-200 hover:rotate-0 hover:scale-105 motion-reduce:hover:scale-100 ${
                  i % 2 === 0 ? "-rotate-2" : "rotate-2"
                }`}
              >
                <ResponsivePhoto
                  photo={photo}
                  alt={photo.alt}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="aspect-square w-full rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/gallery" variant="electric">
              Visit the Full Gallery
            </Button>
          </div>
        </Band>
      )}

      <Band>
        <SectionHeading eyebrow="Family" title="Meet Tesla's Cousins 👨‍👩‍👧‍👦" color="berry" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cousins.map((name, i) => (
            <FamilyCard key={name} name={name} index={i} />
          ))}
        </div>
      </Band>

      <Band color="berry">
        <SectionHeading
          eyebrow="Fun Zone 🎮"
          title="Play, Discover, and Explore"
          subtitle="13 games and puzzles — here are a few to start with."
          color="berry"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURED_GAMES.map((g, i) => {
            const a = accent(i + 2);
            return (
              <Link
                key={g.id}
                href={`/fun-zone#${g.id}`}
                className={`reveal group flex flex-col items-center gap-2 rounded-card bg-white p-5 text-center shadow-card ring-2 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${a.ring}`}
              >
                <span className="wiggle text-5xl" aria-hidden="true">
                  {g.emoji}
                </span>
                <span className={`font-heading text-base font-bold ${a.text}`}>{g.title}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-12">
          <RandomFact />
        </div>
        <div className="mt-10 text-center">
          <Button href="/fun-zone" variant="coral">
            See All Games →
          </Button>
        </div>
      </Band>
    </>
  );
}

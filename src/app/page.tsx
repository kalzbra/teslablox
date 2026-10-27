import Link from "next/link";
import Container from "@/components/ui/Container";
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

      <Container className="py-16">
        <SectionHeading eyebrow="Quick Intro" title="Meet Tesla" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-ink-500">{bio.full[0]}</p>
          <div className="mt-6">
            <Button href="/about" variant="electric">
              Read Tesla&apos;s Full Story
            </Button>
          </div>
        </div>
      </Container>

      <Container className="py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-card bg-gradient-to-br from-electric-500 to-electric-700 p-8 text-center text-white shadow-card-lg sm:flex-row sm:text-left">
          <span className="text-6xl" aria-hidden="true">
            🎓
          </span>
          <div className="flex-1">
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-spark-300">
              New every week
            </p>
            <p className="mt-1 font-heading text-2xl font-semibold">
              This Week&apos;s Homework from Daddy in Japan
            </p>
            <p className="mt-1 text-white/85">
              Science, math, and tech challenges — get a perfect score to unlock the next week!
            </p>
          </div>
          <Button href="/homework" variant="spark">
            Open Homework →
          </Button>
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading
          eyebrow="Things Tesla Loves"
          title="Things Tesla Loves ❤️"
          subtitle="Tap a card to explore each favorite thing."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {favorites
            .filter((f) => homepageHighlightSlugs.includes(f.slug as (typeof homepageHighlightSlugs)[number]))
            .map((f) => (
              <FavoriteHighlightLink key={f.slug} favorite={f} />
            ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Tesla's Adventures 🌍" title="Where Tesla Has Been" />
        <div className="mx-auto max-w-xl">
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
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Tesla's Dreams 🚀" title="YouTube Star or Scientist?" />
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
        <div className="mt-6 text-center">
          <Button href="/dreams" variant="ghost">
            See the Fun Twist
          </Button>
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow={nikolaTeslaIntro.heading} title="Why Is He Called Tesla? ⚡" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-ink-500">{nikolaTeslaIntro.body[0]}</p>
          <div className="mt-6">
            <Button href="/nikola-tesla" variant="electric">
              Meet Nikola Tesla
            </Button>
          </div>
        </div>
      </Container>

      {highlightPhotos.length > 0 && (
        <Container className="py-16">
          <SectionHeading eyebrow="Photo Highlight" title="A Few Favorite Moments" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlightPhotos.map((photo) => (
              <div key={photo.id} className="overflow-hidden rounded-card shadow-card">
                <ResponsivePhoto
                  photo={photo}
                  alt={photo.alt}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button href="/gallery" variant="ghost">
              Visit the Full Gallery
            </Button>
          </div>
        </Container>
      )}

      <Container className="py-16">
        <SectionHeading eyebrow="Family" title="Meet Tesla's Cousins 👨‍👩‍👧‍👦" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cousins.map((name) => (
            <FamilyCard key={name} name={name} />
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading
          eyebrow="Fun Zone 🎮"
          title="Play, Discover, and Explore"
          subtitle="13 games and puzzles — here are a few to start with."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FEATURED_GAMES.map((g) => (
            <Link
              key={g.id}
              href={`/fun-zone#${g.id}`}
              className="flex flex-col items-center gap-2 rounded-card bg-white/90 p-5 text-center shadow-card ring-1 ring-ink-700/5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <span className="text-4xl" aria-hidden="true">
                {g.emoji}
              </span>
              <span className="font-heading text-sm font-semibold text-ink-700">{g.title}</span>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <RandomFact />
        </div>
        <div className="mt-10 text-center">
          <Button href="/fun-zone" variant="electric">
            See All Games →
          </Button>
        </div>
      </Container>
    </>
  );
}

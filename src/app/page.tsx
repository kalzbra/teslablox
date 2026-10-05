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
import RandomPhoto from "@/components/RandomPhoto";
import RandomFact from "@/components/RandomFact";
import Quiz from "@/components/Quiz";
import { bio } from "@/data/tesla";
import { favorites, homepageHighlightSlugs } from "@/data/favorites";
import { cousins } from "@/data/family";
import { dreams } from "@/data/dreams";
import { nikolaTeslaIntro } from "@/data/nikola-tesla";
import { kabaleMeta } from "@/data/trip-kabale";
import { heroPhotos, homepagePhotoSelection, photos, tripPages } from "@/lib/photos";

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
        <SectionHeading eyebrow="Fun Zone 🎮" title="Play, Discover, and Explore" />
        <div className="flex flex-col items-center gap-14">
          <Quiz />
          <RandomFact />
          <RandomPhoto photos={photos} />
        </div>
        <div className="mt-10 text-center">
          <Link href="/fun-zone" className="font-medium text-electric-600 underline underline-offset-4">
            Visit the full Fun Zone →
          </Link>
        </div>
      </Container>
    </>
  );
}

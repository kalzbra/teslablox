import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import JournalGallery from "@/components/JournalGallery";
import TripJournal from "@/components/TripJournal";
import AdventureTimeline from "@/components/AdventureTimeline";
import {
  kabaleChapters,
  kabaleClosing,
  kabaleMeta,
  kabaleTimeline,
} from "@/data/trip-kabale";
import { tripPages } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Tesla Trip to Kabale | TeslaBlox",
  description:
    "Tesla's own memory book from his trip to Kabale, Uganda — in his own words, with the original pages he wrote and printed himself.",
};

export default function KabaleTripPage() {
  return (
    <Container className="py-16">
      <div className="text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-electric-600">
          Adventures
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-ink-700 sm:text-5xl">
          Tesla&apos;s Trip to Kabale 🚗🌍
        </h1>
        <p className="mt-3 text-lg italic text-ink-500">{kabaleMeta.subtitle}</p>
        <p className="mt-1 text-sm font-medium text-ink-500">{kabaleMeta.dateRange}</p>
      </div>

      <div className="mt-16">
        <SectionHeading
          align="left"
          eyebrow="Tesla's Original Writing"
          color="coral"
          title="The Memory Book, As Tesla Wrote It"
          subtitle="Tesla wrote, photocopied, and printed this book himself with his grandmother's help. Tap any page to see it larger."
        />
        <JournalGallery pages={tripPages} />
      </div>

      <div className="mt-20">
        <SectionHeading
          align="left"
          eyebrow="Cleaned-Up Version"
          color="mint"
          title="My Trip to Kabale"
          subtitle="The same story, tidied up for easy reading — Tesla's words, sequence, and voice are kept exactly as he wrote them."
        />
        <TripJournal chapters={kabaleChapters} />
        <p className="mt-8 text-center text-lg font-medium italic text-ink-500">
          {kabaleClosing.line}
        </p>
      </div>

      <div className="mt-20">
        <SectionHeading align="left" eyebrow="Adventure Timeline" title="How the Trip Unfolded" color="violet" />
        <AdventureTimeline steps={kabaleTimeline} />
      </div>
    </Container>
  );
}

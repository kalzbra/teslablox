import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfileCard from "@/components/ProfileCard";
import { bio, whatMakesTeslaSpecial } from "@/data/tesla";

export const metadata: Metadata = {
  title: "About Tesla | TeslaBlox",
  description: "Meet Tesla Riley Shyaka — his story, his profile, and what makes him special.",
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="About Tesla" title="Who Is Tesla?" />
      <div className="mx-auto flex max-w-3xl flex-col gap-5 text-lg text-ink-500">
        {bio.full.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        <ProfileCard />
      </div>

      <div className="mt-16">
        <SectionHeading title="What Makes Tesla Special?" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {whatMakesTeslaSpecial.map((trait) => (
            <li
              key={trait}
              className="rounded-2xl bg-white/90 px-4 py-4 text-center font-heading font-medium text-ink-700 shadow-card ring-1 ring-ink-700/5"
            >
              {trait}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

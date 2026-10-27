import type { Metadata } from "next";
import Band from "@/components/ui/Band";
import SectionHeading from "@/components/ui/SectionHeading";
import ProfileCard from "@/components/ProfileCard";
import TraitChips from "@/components/TraitChips";
import { bio, whatMakesTeslaSpecial } from "@/data/tesla";

export const metadata: Metadata = {
  title: "About Tesla | TeslaBlox",
  description: "Meet Tesla Riley Shyaka — his story, his profile, and what makes him special.",
};

export default function AboutPage() {
  return (
    <>
      <Band>
        <SectionHeading eyebrow="About Tesla" title="Who Is Tesla? 🧒" color="coral" />
        <div className="reveal mx-auto flex max-w-3xl flex-col gap-5 text-lg text-ink-700">
          {bio.full.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "font-heading text-2xl font-medium text-electric-700" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </Band>

      <Band color="sky">
        <div className="mx-auto max-w-2xl">
          <ProfileCard />
        </div>
      </Band>

      <Band>
        <SectionHeading title="What Makes Tesla Special? 🌟" />
        <TraitChips traits={whatMakesTeslaSpecial} />
      </Band>
    </>
  );
}

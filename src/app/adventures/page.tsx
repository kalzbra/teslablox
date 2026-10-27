import type { Metadata } from "next";
import Band from "@/components/ui/Band";
import SectionHeading from "@/components/ui/SectionHeading";
import AdventureCard from "@/components/AdventureCard";
import { kabaleMeta } from "@/data/trip-kabale";
import { tripPages } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Adventures | TeslaBlox",
  description: "Tesla's travel stories and adventures, straight from his own memory books.",
};

export default function AdventuresPage() {
  const kabaleCover = tripPages[0];

  return (
    <Band color="mint">
      <SectionHeading eyebrow="Adventures" title="Tesla's Adventures 🌍" color="mint" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <p className="mt-10 text-center text-lg font-medium text-mint-700">
        More adventures will appear here as Tesla writes more memory books! ✨
      </p>
    </Band>
  );
}

import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DreamCard from "@/components/DreamCard";
import { dreams } from "@/data/dreams";

export const metadata: Metadata = {
  title: "Tesla's Dreams | TeslaBlox",
  description: "YouTube star or famous scientist? Tesla's dreams, and his dad's hopes for him.",
};

export default function DreamsPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Dreams" title="🚀 Tesla's Dreams" />

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

      <div className="mx-auto mt-16 max-w-2xl rounded-card bg-gradient-to-br from-spark-300/40 to-electric-100 p-8 text-center shadow-card sm:p-10">
        <h2 className="font-heading text-2xl font-semibold text-ink-700 sm:text-3xl">
          {dreams.twist.heading}
        </h2>
        <div className="mt-4 flex flex-col gap-2 text-lg text-ink-500">
          {dreams.twist.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}

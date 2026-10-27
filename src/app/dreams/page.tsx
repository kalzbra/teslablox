import type { Metadata } from "next";
import Band from "@/components/ui/Band";
import SectionHeading from "@/components/ui/SectionHeading";
import DreamCard from "@/components/DreamCard";
import { dreams } from "@/data/dreams";

export const metadata: Metadata = {
  title: "Tesla's Dreams | TeslaBlox",
  description: "YouTube star or famous scientist? Tesla's dreams, and his dad's hopes for him.",
};

export default function DreamsPage() {
  return (
    <>
      <Band color="violet">
        <SectionHeading eyebrow="Dreams" title="🚀 Tesla's Dreams" color="violet" />
        <div className="grid gap-6 sm:grid-cols-2">
          <DreamCard emoji="🎥" eyebrow="Tesla's Dream" quote={dreams.tesla.quote} body={dreams.tesla.body} />
          <DreamCard emoji="🔬" eyebrow="Dad's Dream" quote={dreams.dad.quote} body={dreams.dad.body} />
        </div>
      </Band>

      <Band>
        <div className="reveal mx-auto max-w-2xl rounded-card bg-gradient-to-br from-spark-400 via-coral-500 to-berry-500 p-8 text-center text-white shadow-card-lg sm:p-10">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{dreams.twist.heading}</h2>
          <div className="mt-5 flex flex-col gap-3 text-xl">
            {dreams.twist.lines.map((line, i) => (
              <p key={i} className={i === dreams.twist.lines.length - 1 ? "font-heading font-bold" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}

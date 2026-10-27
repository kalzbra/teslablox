import type { Metadata } from "next";
import Band from "@/components/ui/Band";
import TeslaCoil from "@/components/TeslaCoil";
import { accent } from "@/lib/accents";
import SectionHeading from "@/components/ui/SectionHeading";
import NikolaTeslaCard from "@/components/NikolaTeslaCard";
import ExternalLink from "@/components/ui/ExternalLink";
import {
  nikolaTeslaFacts,
  nikolaTeslaLearnMore,
  teslaConnection,
  whoWasNikolaTesla,
} from "@/data/nikola-tesla";

export const metadata: Metadata = {
  title: "Nikola Tesla | TeslaBlox",
  description:
    "Learn about Nikola Tesla, the inventor Tesla Riley Shyaka was named after, in simple and accurate language.",
};

export default function NikolaTeslaPage() {
  return (
    <>
      <Band>
        <SectionHeading eyebrow="Nikola Tesla" title="Nikola Tesla ⚡" color="sky" />
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-electric-700">Who Was Nikola Tesla?</h2>
          <p className="mt-3 text-xl text-ink-700">{whoWasNikolaTesla}</p>
        </div>
      </Band>

      <Band color="sky">
        <SectionHeading title="Things Nikola Tesla Is Famous For" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nikolaTeslaFacts.map((fact, i) => (
            <NikolaTeslaCard key={fact.slug} fact={fact} index={i} />
          ))}
        </div>
      </Band>

      <Band>
        <TeslaCoil />
      </Band>

      <Band color="spark">
        <SectionHeading title="The Tesla Connection 🔗" color="spark" />
        <ol className="reveal mx-auto flex max-w-md flex-col items-center gap-2">
          {teslaConnection.map((line, i) => {
            const a = accent(i + 1);
            return (
              <li key={line} className="flex w-full flex-col items-center gap-2">
                <p
                  className={`w-full rounded-2xl px-5 py-3 text-center shadow-card ${
                    i % 2 === 0 ? `${a.solid} font-heading text-xl font-bold` : `bg-white ${a.text} font-semibold`
                  }`}
                >
                  {line}
                </p>
                {i < teslaConnection.length - 1 && (
                  <span aria-hidden="true" className="text-2xl text-spark-700">
                    ⬇
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mx-auto mt-6 max-w-md text-center text-ink-700">
          Nikola Tesla&apos;s curiosity and love of invention are part of the inspiration behind
          Tesla&apos;s name — not a promise about what he must become.
        </p>
      </Band>

      <Band>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-heading text-2xl font-bold text-ink-700">Learn More 📚</h2>
          <ul className="mt-4 flex flex-col items-center gap-2">
            {nikolaTeslaLearnMore.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Band>
    </>
  );
}

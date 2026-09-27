import type { Metadata } from "next";
import Container from "@/components/ui/Container";
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
    <Container className="py-16">
      <SectionHeading eyebrow="Nikola Tesla" title="Nikola Tesla ⚡" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-semibold text-ink-700">
          Who Was Nikola Tesla?
        </h2>
        <p className="mt-3 text-lg text-ink-500">{whoWasNikolaTesla}</p>
      </div>

      <div className="mt-16">
        <SectionHeading title="Things Nikola Tesla Is Famous For" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nikolaTeslaFacts.map((fact) => (
            <NikolaTeslaCard key={fact.slug} fact={fact} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-md rounded-card bg-white/90 p-8 text-center shadow-card ring-1 ring-ink-700/5">
        <h2 className="mb-4 font-heading text-xl font-semibold text-ink-700">
          The Tesla Connection
        </h2>
        <div className="flex flex-col items-center gap-2 text-ink-500">
          {teslaConnection.map((line, i) => (
            <div key={line} className="flex flex-col items-center gap-2">
              <p
                className={
                  i % 2 === 0
                    ? "font-heading text-lg font-semibold text-ink-700"
                    : "text-sm"
                }
              >
                {line}
              </p>
              {i < teslaConnection.length - 1 && (
                <span aria-hidden="true" className="text-electric-400">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Nikola Tesla&apos;s curiosity and love of invention are part of the inspiration behind
          Tesla&apos;s name — not a promise about what he must become.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-xl text-center">
        <h2 className="font-heading text-xl font-semibold text-ink-700">Learn More</h2>
        <ul className="mt-4 flex flex-col items-center gap-2">
          {nikolaTeslaLearnMore.map((link) => (
            <li key={link.href}>
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

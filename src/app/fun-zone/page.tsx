import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Quiz from "@/components/Quiz";
import RandomFact from "@/components/RandomFact";
import RandomPhoto from "@/components/RandomPhoto";
import MemoryMatch from "@/components/MemoryMatch";
import WordScramble from "@/components/WordScramble";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Fun Zone | TeslaBlox",
  description:
    "Play the Tesla quiz, solve puzzles, discover a random fact, or see a random Tesla photo.",
};

export default function FunZonePage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Fun Zone" title="🎮 Tesla's Fun Zone" />

      <div className="flex flex-col items-center gap-20">
        <section className="w-full">
          <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-ink-700">
            Tesla Quiz
          </h2>
          <Quiz />
        </section>

        <section className="w-full">
          <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-ink-700">
            Memory Match 🧠
          </h2>
          <MemoryMatch />
        </section>

        <section className="w-full">
          <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-ink-700">
            Word Scramble 🧩
          </h2>
          <WordScramble />
        </section>

        <section className="w-full">
          <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-ink-700">
            Random Tesla Fact
          </h2>
          <RandomFact />
        </section>

        <section className="w-full">
          <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-ink-700">
            Random Tesla Photo
          </h2>
          <RandomPhoto photos={photos} />
        </section>
      </div>
    </Container>
  );
}

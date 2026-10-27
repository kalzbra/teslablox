import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GameHub from "@/components/GameHub";
import { heroPhotos, photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Fun Zone | TeslaBlox",
  description:
    "Puzzles, math races, word games, quizzes, and riddles — Tesla's Fun Zone has something for every brain.",
};

export default function FunZonePage() {
  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Fun Zone"
        title="🎮 Tesla's Fun Zone"
        subtitle="Pick a game! Puzzles, math, words, and more."
      />
      <GameHub photos={photos} puzzlePhoto={heroPhotos()[0] ?? photos[0]} />
    </Container>
  );
}

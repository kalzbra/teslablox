import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HomeworkPasswordGate from "@/components/HomeworkPasswordGate";
import HomeworkSequence from "@/components/HomeworkSequence";
import HomeworkLog from "@/components/HomeworkLog";
import { homeworkWeeks } from "@/data/homework";

export const metadata: Metadata = {
  title: "Homework | TeslaBlox",
  description:
    "This week's science, math, and tech homework from Daddy in Japan, plus a record of how Tesla's done each week.",
};

export default function HomeworkPage() {
  return (
    <Container className="py-16">
      <div className="text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-electric-600">
          Daddy&apos;s Homework
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-ink-700 sm:text-5xl">
          This Week&apos;s Homework from Daddy in Japan 🎓⚡
        </h1>
      </div>

      <div className="mt-12">
        <HomeworkPasswordGate>
          <HomeworkSequence weeks={homeworkWeeks} />
        </HomeworkPasswordGate>
      </div>

      <div className="mt-20">
        <SectionHeading
          eyebrow="The Record"
          title="Daddy's Homework Log 📒"
          subtitle="Every week, right here."
        />
        <HomeworkLog weeks={homeworkWeeks} />
      </div>
    </Container>
  );
}

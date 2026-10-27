import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HomeworkQuiz from "@/components/HomeworkQuiz";
import HomeworkLog from "@/components/HomeworkLog";
import { homeworkWeeks } from "@/data/homework";

export const metadata: Metadata = {
  title: "Homework | TeslaBlox",
  description:
    "This week's science, math, and tech homework from Daddy in Japan, plus a record of how Tesla's done each week.",
};

export default function HomeworkPage() {
  const currentWeek = homeworkWeeks[0];

  return (
    <Container className="py-16">
      <div className="text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-wide text-electric-600">
          {currentWeek.theme}
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-ink-700 sm:text-5xl">
          This Week&apos;s Homework from Daddy in Japan 🎓⚡
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-xl rounded-card bg-gradient-to-br from-electric-50 to-sky-100 p-6 text-center shadow-card ring-1 ring-ink-700/5 sm:p-8">
        <p className="font-heading text-sm font-semibold text-electric-600">A note from Daddy</p>
        <p className="mt-2 text-lg text-ink-700">{currentWeek.dadNote}</p>
      </div>

      <div className="mt-12">
        <HomeworkQuiz week={currentWeek} />
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

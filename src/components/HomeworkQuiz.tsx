"use client";

import { useMemo, useState } from "react";
import type { HomeworkQuestion, HomeworkWeek } from "@/data/homework";
import { seededShuffle } from "@/lib/seeded-random";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SubjectTag from "@/components/SubjectTag";
import KeepExploring from "@/components/KeepExploring";

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function isCorrect(question: HomeworkQuestion, guess: string): boolean {
  const g = normalize(guess);
  const a = normalize(question.answer);
  if (g === a) return true;
  if (question.type === "type-answer" && g !== "") {
    const gn = Number(g);
    const an = Number(a);
    if (!Number.isNaN(gn) && !Number.isNaN(an)) return gn === an;
  }
  return false;
}

export default function HomeworkQuiz({ week }: { week: HomeworkWeek }) {
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = week.questions ?? [];
  const question = questions[step];
  const finished = step >= questions.length;

  // Deterministic (not Math.random) so static-export prerender and the client's first render
  // agree — see src/lib/seeded-random.ts and the hydration-mismatch note in CLAUDE.md.
  const options = useMemo(() => {
    if (!question || question.type !== "multiple-choice") return [];
    return seededShuffle(question.options, step * 104729 + round * 31 + 7);
  }, [question, step, round]);

  function submitGuess(value: string) {
    if (submitted || !question) return;
    setGuess(value);
    setSubmitted(true);
    if (isCorrect(question, value)) setScore((s) => s + 1);
  }

  function next() {
    setStep((s) => s + 1);
    setGuess("");
    setSubmitted(false);
  }

  function restart() {
    setStep(0);
    setGuess("");
    setSubmitted(false);
    setScore(0);
    setRound((r) => r + 1);
  }

  if (questions.length === 0) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center text-ink-500">
        Daddy hasn&apos;t added this week&apos;s questions yet — check back soon!
      </Card>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <Card className="mx-auto max-w-xl p-8 text-center">
        <p className="font-heading text-3xl font-semibold text-ink-700">
          You scored {score} / {questions.length}! {pct >= 80 ? "🌟" : pct >= 50 ? "🎉" : "💪"}
        </p>
        <p className="mt-2 text-ink-500">
          {pct === 100
            ? "Perfect score — amazing work!"
            : pct >= 70
              ? "Great job — you're really getting good at this!"
              : "Nice try! Learning is all about practice — tell Daddy how you did!"}
        </p>
        <p className="mt-4 text-sm text-ink-500">
          📞 Don&apos;t forget to tell Daddy your score next time you talk!
        </p>
        <div className="mt-6">
          <Button variant="electric" onClick={restart}>
            Try Again
          </Button>
        </div>

        <KeepExploring topics={week.topics ?? []} />
      </Card>
    );
  }

  const correct = submitted && isCorrect(question, guess);

  return (
    <Card className="mx-auto max-w-xl p-6 sm:p-8">
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-cream-200">
        <div
          className="h-full rounded-full bg-electric-500 transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-500">
          Question {step + 1} of {questions.length}
        </p>
        <SubjectTag subject={question.subject} />
      </div>

      <h3 className="mt-3 font-heading text-xl font-semibold text-ink-700">
        {question.question}
      </h3>

      {question.type === "multiple-choice" ? (
        <div className="mt-5 flex flex-col gap-3">
          {options.map((option) => {
            const isSelected = guess === option;
            const optionCorrect = option === question.answer;
            let stateClasses = "border-ink-700/10 hover:border-electric-400";
            if (submitted && optionCorrect) stateClasses = "border-green-500 bg-green-50";
            else if (submitted && isSelected && !optionCorrect)
              stateClasses = "border-coral-500 bg-coral-500/10";

            return (
              <button
                key={option}
                type="button"
                onClick={() => submitGuess(option)}
                disabled={submitted}
                className={`rounded-2xl border-2 px-5 py-3 text-left font-medium text-ink-700 transition-colors ${stateClasses}`}
              >
                {option}
                {submitted && optionCorrect ? " ✅" : ""}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="mt-5 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            submitGuess(guess);
          }}
        >
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer"
            aria-label={question.question}
            className="flex-1 rounded-2xl border-2 border-ink-700/10 px-4 py-3 font-medium text-ink-700 focus:border-electric-400"
          />
          {!submitted && (
            <Button type="submit" variant="electric">
              Check
            </Button>
          )}
        </form>
      )}

      {submitted && (
        <div
          className={`mt-5 rounded-2xl p-4 animate-fade-up ${
            correct ? "bg-green-50" : "bg-coral-500/10"
          }`}
        >
          <p className={`font-semibold ${correct ? "text-green-700" : "text-coral-600"}`}>
            {correct ? "Correct! 🎉" : `Not quite — the answer was "${question.answer}."`}
          </p>
          <p className="mt-1 text-sm text-ink-500">💡 {question.explanation}</p>
        </div>
      )}

      {submitted && (
        <div className="mt-5 text-right">
          <Button variant="spark" onClick={next}>
            {step + 1 === questions.length ? "See My Score" : "Next Question"}
          </Button>
        </div>
      )}
    </Card>
  );
}

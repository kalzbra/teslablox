"use client";

import { useMemo, useState } from "react";
import { quizQuestions } from "@/data/quiz";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function shuffled(options: string[]): string[] {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const question = quizQuestions[step];
  const finished = step >= quizQuestions.length;

  // Reshuffled once per question per playthrough, not on every render/click.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => shuffled(question?.options ?? []), [step, round]);

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setStep((s) => s + 1);
  }

  function restart() {
    setStep(0);
    setSelected(null);
    setScore(0);
    setRound((r) => r + 1);
  }

  if (finished) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="font-heading text-2xl font-semibold text-ink-700">
          You got {score} out of {quizQuestions.length}! 🎉
        </p>
        <p className="mt-2 text-ink-500">Great job learning about Tesla.</p>
        <div className="mt-6">
          <Button variant="electric" onClick={restart}>
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg p-8">
      <p className="text-sm font-medium text-ink-500">
        Question {step + 1} of {quizQuestions.length}
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-ink-700">
        {question.question}
      </h3>

      <div className="mt-5 flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === question.answer;
          const showResult = selected !== null;

          let stateClasses = "border-ink-700/10 hover:border-electric-400";
          if (showResult && isCorrect) {
            stateClasses = "border-green-500 bg-green-50";
          } else if (showResult && isSelected && !isCorrect) {
            stateClasses = "border-coral-500 bg-coral-50";
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={showResult}
              className={`rounded-2xl border-2 px-5 py-3 text-left font-medium text-ink-700 transition-colors ${stateClasses} ${
                showResult && isCorrect ? "animate-fade-up" : ""
              }`}
            >
              {option}
              {showResult && isCorrect ? " ✅" : ""}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 text-right">
          <Button variant="spark" onClick={next}>
            {step + 1 === quizQuestions.length ? "See Score" : "Next Question"}
          </Button>
        </div>
      )}
    </Card>
  );
}

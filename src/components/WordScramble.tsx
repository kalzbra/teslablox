"use client";

import { useMemo, useState } from "react";
import { scrambleWords } from "@/data/word-scramble";
import { seededShuffle } from "@/lib/seeded-random";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Deterministic (not Math.random) so server-prerendered HTML and the client's first render
// agree — otherwise React flags a hydration mismatch. `seed` varies per word/playthrough so it
// still looks freshly scrambled each time.
function scrambleDeterministic(word: string, seed: number): string {
  if (word.length <= 1) return word;
  for (let attempt = 0; attempt < 6; attempt++) {
    const letters = seededShuffle([...word], seed + attempt * 97);
    if (letters.join("") !== word) return letters.join("");
  }
  return word;
}

export default function WordScramble() {
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [showHint, setShowHint] = useState(false);

  const order = useMemo(
    () =>
      seededShuffle(
        Array.from({ length: scrambleWords.length }, (_, i) => i),
        round * 7919 + 13,
      ),
    [round],
  );
  const word = scrambleWords[order[step]];
  const scrambled = useMemo(
    () => scrambleDeterministic(word, round * 104729 + step * 31 + 11),
    [word, round, step],
  );
  const finished = step >= scrambleWords.length;

  function check() {
    if (guess.trim().toUpperCase() === word) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  }

  function next() {
    setStep((s) => s + 1);
    setGuess("");
    setStatus("playing");
    setShowHint(false);
  }

  function restart() {
    setStep(0);
    setGuess("");
    setStatus("playing");
    setShowHint(false);
    setRound((r) => r + 1);
  }

  if (finished) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="font-heading text-2xl font-semibold text-ink-700">
          You unscrambled every word! 🧩✨
        </p>
        <p className="mt-2 text-ink-500">Great puzzle solving.</p>
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
        Word {step + 1} of {scrambleWords.length}
      </p>
      <p className="mt-2 text-center font-heading text-3xl font-semibold tracking-[0.3em] text-electric-600">
        {scrambled}
      </p>

      {showHint && (
        <p className="mt-3 text-center text-sm text-ink-500">
          Hint: it starts with <span className="font-semibold">{word[0]}</span>
        </p>
      )}

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (status !== "correct") check();
        }}
      >
        <input
          type="text"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value.toUpperCase());
            if (status !== "playing") setStatus("playing");
          }}
          disabled={status === "correct"}
          placeholder="Type your answer"
          aria-label={`Unscramble the letters: ${scrambled}`}
          className="flex-1 rounded-2xl border-2 border-ink-700/10 px-4 py-3 font-medium text-ink-700 focus:border-electric-400"
        />
        {status === "correct" ? (
          <Button type="button" variant="spark" onClick={next}>
            {step + 1 === scrambleWords.length ? "Finish" : "Next Word"}
          </Button>
        ) : (
          <Button type="submit" variant="electric">
            Check
          </Button>
        )}
      </form>

      <div className="mt-4 flex min-h-8 items-center justify-between">
        <div>
          {status === "correct" && (
            <p className="font-medium text-green-600 animate-fade-up">Correct! {word} ✅</p>
          )}
          {status === "wrong" && (
            <p className="font-medium text-coral-600 animate-fade-up">Not quite — try again!</p>
          )}
        </div>
        {status !== "correct" && !showHint && (
          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="text-sm font-medium text-electric-600 underline underline-offset-4"
          >
            Need a hint?
          </button>
        )}
      </div>
    </Card>
  );
}

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { randomInt } from "@/lib/use-best-score";

const WORDS: { word: string; hint: string }[] = [
  { word: "PLANET", hint: "Earth and Mars are both one of these." },
  { word: "GRAVITY", hint: "The force that pulls things down to the ground." },
  { word: "ROBOT", hint: "A machine that can be programmed to do jobs." },
  { word: "VOLCANO", hint: "A mountain that can erupt with hot lava." },
  { word: "MAGNET", hint: "It sticks to metal like a fridge door." },
  { word: "ROCKET", hint: "It blasts off into space." },
  { word: "ASTRONAUT", hint: "A person who travels into space." },
  { word: "TELESCOPE", hint: "You look through it to see faraway stars." },
  { word: "OXYGEN", hint: "The gas we breathe in to stay alive." },
  { word: "JUPITER", hint: "The biggest planet in our solar system." },
  { word: "BATTERY", hint: "It stores electricity for toys and phones." },
  { word: "LIGHTNING", hint: "A giant spark of electricity in a storm." },
  { word: "DINOSAUR", hint: "Huge reptiles that lived millions of years ago." },
  { word: "SKELETON", hint: "All the bones in your body together." },
  { word: "KEYBOARD", hint: "You type on it to tell a computer what to do." },
  { word: "RAINBOW", hint: "Sunlight and raindrops make this colorful arc." },
  { word: "OCTOPUS", hint: "A sea animal with eight arms." },
  { word: "ELECTRICITY", hint: "Nikola Tesla was famous for his work with this!" },
];

const FUEL = 6;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function RocketWordGuess() {
  const [index, setIndex] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);

  const { word, hint } = WORDS[index];
  const misses = [...guessed].filter((l) => !word.includes(l)).length;
  const fuelLeft = FUEL - misses;
  const won = word.split("").every((l) => guessed.has(l));
  const lost = fuelLeft <= 0;

  function guess(letter: string) {
    if (won || lost || guessed.has(letter)) return;
    const next = new Set(guessed).add(letter);
    setGuessed(next);
    const nowWon = word.split("").every((l) => next.has(l));
    const nowMisses = [...next].filter((l) => !word.includes(l)).length;
    if (nowWon) setStreak((s) => s + 1);
    else if (nowMisses >= FUEL) setStreak(0);
  }

  function nextWord() {
    let i = index;
    while (i === index) i = randomInt(0, WORDS.length - 1);
    setIndex(i);
    setGuessed(new Set());
    setShowHint(false);
  }

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      <p className="text-sm text-ink-500">
        Guess the science word one letter at a time. Each wrong letter uses up rocket fuel!
      </p>

      <div className="mt-4 flex items-center justify-center gap-2" aria-label={`${fuelLeft} fuel left`}>
        <span className={`text-3xl ${won ? "animate-float" : ""}`} aria-hidden="true">
          {lost ? "💥" : "🚀"}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: FUEL }, (_, i) => (
            <span
              key={i}
              className={`h-4 w-5 rounded ${i < fuelLeft ? "bg-spark-400" : "bg-cream-200"}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-5 font-heading text-3xl font-semibold tracking-[0.35em] text-ink-700 sm:text-4xl">
        {word
          .split("")
          .map((l) => (guessed.has(l) || lost ? l : "_"))
          .join("")}
      </p>

      {showHint || lost ? (
        <p className="mt-3 text-sm text-ink-500">💡 {hint}</p>
      ) : (
        <button
          type="button"
          onClick={() => setShowHint(true)}
          className="mt-3 text-sm font-medium text-electric-600 underline underline-offset-4"
        >
          Need a hint?
        </button>
      )}

      {won && (
        <p className="mt-4 font-heading text-xl font-semibold text-green-600 animate-fade-up">
          Blast off! You got it! 🎉 {streak > 1 ? `(${streak} in a row!)` : ""}
        </p>
      )}
      {lost && (
        <p className="mt-4 font-heading text-xl font-semibold text-coral-600">
          Out of fuel! The word was {word}.
        </p>
      )}

      {won || lost ? (
        <div className="mt-5">
          <Button variant="electric" onClick={nextWord}>
            Next Word →
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
          {LETTERS.map((l) => {
            const used = guessed.has(l);
            const hit = used && word.includes(l);
            return (
              <button
                key={l}
                type="button"
                onClick={() => guess(l)}
                disabled={used}
                className={`h-10 rounded-lg font-heading font-semibold ${
                  !used
                    ? "bg-electric-50 text-electric-700 hover:bg-electric-100"
                    : hit
                      ? "bg-green-100 text-green-700"
                      : "bg-cream-200 text-ink-500/50"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>
      )}
    </Card>
  );
}

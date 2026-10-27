"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const RIDDLES: { riddle: string; answer: string }[] = [
  { riddle: "What has hands but can't clap?", answer: "A clock!" },
  { riddle: "What has keys but can't open any doors?", answer: "A piano (or a keyboard)!" },
  { riddle: "What gets wetter the more it dries?", answer: "A towel!" },
  { riddle: "What has a head and a tail but no body?", answer: "A coin!" },
  { riddle: "I'm tall when I'm young and short when I'm old. What am I?", answer: "A candle!" },
  { riddle: "What can travel all around the world while staying in a corner?", answer: "A stamp!" },
  { riddle: "What has many teeth but can't bite?", answer: "A comb!" },
  { riddle: "What goes up but never comes down?", answer: "Your age!" },
  { riddle: "What has one eye but can't see?", answer: "A needle!" },
  { riddle: "The more you take, the more you leave behind. What are they?", answer: "Footsteps!" },
  { riddle: "What runs but never walks, and has a bed but never sleeps?", answer: "A river!" },
  { riddle: "What is full of holes but still holds water?", answer: "A sponge!" },
  { riddle: "What can you catch but not throw?", answer: "A cold!" },
  { riddle: "What planet is named after the Roman god of the sea?", answer: "Neptune!" },
  { riddle: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?", answer: "A map!" },
  { riddle: "What kind of room has no doors or windows?", answer: "A mushroom!" },
];

export default function RiddleBox() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  function go(delta: number) {
    setIndex((i) => (i + delta + RIDDLES.length) % RIDDLES.length);
    setRevealed(false);
  }

  const { riddle, answer } = RIDDLES[index];
  return (
    <Card className="mx-auto max-w-lg p-8 text-center">
      <p className="text-sm font-medium text-ink-500">
        Riddle {index + 1} of {RIDDLES.length}
      </p>
      <p className="mt-3 font-heading text-2xl font-semibold text-ink-700">🤔 {riddle}</p>
      {revealed ? (
        <p className="mt-5 font-heading text-xl font-semibold text-electric-600 animate-fade-up">
          {answer}
        </p>
      ) : (
        <div className="mt-5">
          <Button variant="spark" onClick={() => setRevealed(true)}>
            Show the Answer
          </Button>
        </div>
      )}
      <p className="mt-4 text-xs text-ink-500">Think about it first — then try it on someone else!</p>
      <div className="mt-5 flex justify-center gap-3">
        <Button variant="ghost" onClick={() => go(-1)}>
          ← Back
        </Button>
        <Button variant="electric" onClick={() => go(1)}>
          Next Riddle →
        </Button>
      </div>
    </Card>
  );
}

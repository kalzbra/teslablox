"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { randomInt, useBestScore } from "@/lib/use-best-score";

const PADS = [
  { emoji: "⚡", base: "bg-spark-300", lit: "bg-spark-500 ring-4 ring-spark-300" },
  { emoji: "🌊", base: "bg-sky-300", lit: "bg-electric-500 ring-4 ring-sky-300" },
  { emoji: "🔥", base: "bg-coral-300", lit: "bg-coral-600 ring-4 ring-coral-300" },
  { emoji: "🌿", base: "bg-green-200", lit: "bg-green-500 ring-4 ring-green-200" },
];

type Phase = "ready" | "showing" | "input" | "over";

export default function PatternMemory() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [lit, setLit] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { best, record } = useBestScore("pattern-memory");

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function play(seq: number[]) {
    setPhase("showing");
    setPosition(0);
    const step = Math.max(350, 700 - seq.length * 30); // speeds up a little as it grows
    seq.forEach((pad, i) => {
      timers.current.push(setTimeout(() => setLit(pad), 500 + i * step));
      timers.current.push(setTimeout(() => setLit(null), 500 + i * step + step * 0.6));
    });
    timers.current.push(setTimeout(() => setPhase("input"), 500 + seq.length * step));
  }

  function start() {
    const first = [randomInt(0, 3)];
    setSequence(first);
    setNewBest(false);
    play(first);
  }

  function press(pad: number) {
    if (phase !== "input") return;
    setLit(pad);
    timers.current.push(setTimeout(() => setLit(null), 200));
    if (sequence[position] !== pad) {
      setPhase("over");
      setNewBest(record(sequence.length - 1));
      return;
    }
    if (position + 1 === sequence.length) {
      const longer = [...sequence, randomInt(0, 3)];
      setSequence(longer);
      timers.current.push(setTimeout(() => play(longer), 600));
    } else {
      setPosition(position + 1);
    }
  }

  const score = Math.max(0, sequence.length - 1);

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      <p className="text-sm text-ink-500">
        Watch the pads light up, then tap them in the same order. Each round adds one more!
      </p>
      <p className="mt-3 font-heading text-lg font-semibold text-ink-700" aria-live="polite">
        {phase === "ready" && (best !== null ? `Your best: ${best}` : "Ready?")}
        {phase === "showing" && "Watch carefully… 👀"}
        {phase === "input" && `Your turn! (${position + 1} of ${sequence.length})`}
        {phase === "over" && `You remembered ${score} in a row! ${newBest ? "🏆 New best!" : ""}`}
      </p>

      <div className="mx-auto mt-5 grid max-w-[16rem] grid-cols-2 gap-3">
        {PADS.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => press(i)}
            disabled={phase !== "input"}
            aria-label={`Pad ${i + 1}`}
            className={`flex aspect-square items-center justify-center rounded-3xl text-4xl transition-all duration-150 ${
              lit === i ? p.lit + " scale-105" : p.base
            }`}
          >
            <span aria-hidden="true">{p.emoji}</span>
          </button>
        ))}
      </div>

      {(phase === "ready" || phase === "over") && (
        <div className="mt-6">
          <Button variant="electric" onClick={start}>
            {phase === "over" ? "Play Again" : "Start"}
          </Button>
        </div>
      )}
    </Card>
  );
}

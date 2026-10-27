"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { randomInt, useBestScore } from "@/lib/use-best-score";

const ROUND_SECONDS = 60;
const LEVELS = [
  { label: "Up to 5 ×", max: 5 },
  { label: "Up to 10 ×", max: 10 },
  { label: "Up to 12 ×", max: 12 },
];

type Problem = { a: number; b: number };

export default function TimesTableSprint() {
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [problem, setProblem] = useState<Problem>({ a: 7, b: 8 });
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [flash, setFlash] = useState<"right" | "wrong" | null>(null);
  const [newBest, setNewBest] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { best, record } = useBestScore(`times-${LEVELS[level].max}`);

  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      setNewBest(record(score));
    }
  }, [phase, timeLeft, score, record]);

  function nextProblem() {
    const max = LEVELS[level].max;
    setProblem({ a: randomInt(2, max), b: randomInt(2, max) });
    setInput("");
    inputRef.current?.focus();
  }

  function start() {
    setScore(0);
    setMisses([]);
    setTimeLeft(ROUND_SECONDS);
    setNewBest(false);
    setPhase("playing");
    nextProblem();
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (phase !== "playing" || input.trim() === "") return;
    const right = Number(input) === problem.a * problem.b;
    if (right) setScore((s) => s + 1);
    else setMisses((m) => [...m, `${problem.a} × ${problem.b} = ${problem.a * problem.b}`]);
    setFlash(right ? "right" : "wrong");
    setTimeout(() => setFlash(null), 300);
    nextProblem();
  }

  return (
    <Card className="mx-auto max-w-lg p-8 text-center">
      {phase === "ready" && (
        <>
          <p className="text-ink-500">
            Answer as many times-table questions as you can in {ROUND_SECONDS} seconds!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Level">
            {LEVELS.map((l, i) => (
              <button
                key={l.max}
                type="button"
                onClick={() => setLevel(i)}
                aria-pressed={level === i}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  level === i ? "bg-electric-500 text-white" : "bg-cream-100 text-ink-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {best !== null && <p className="mt-4 text-sm text-ink-500">Your best: {best}</p>}
          <div className="mt-6">
            <Button variant="electric" onClick={start}>
              Start! ⏱️
            </Button>
          </div>
        </>
      )}

      {phase === "playing" && (
        <>
          <div className="flex justify-between text-sm font-medium text-ink-500">
            <span>⏱️ {timeLeft}s</span>
            <span>⭐ {score}</span>
          </div>
          <p
            className={`mt-6 font-heading text-5xl font-semibold transition-colors ${
              flash === "right"
                ? "text-green-600"
                : flash === "wrong"
                  ? "text-coral-600"
                  : "text-ink-700"
            }`}
          >
            {problem.a} × {problem.b}
          </p>
          <form onSubmit={submit} className="mt-6 flex gap-3">
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label={`What is ${problem.a} times ${problem.b}?`}
              className="w-full flex-1 rounded-2xl border-2 border-ink-700/10 px-4 py-3 text-center text-2xl font-semibold text-ink-700 focus:border-electric-400"
              autoFocus
            />
            <Button type="submit" variant="electric">
              Go
            </Button>
          </form>
        </>
      )}

      {phase === "done" && (
        <>
          <p className="font-heading text-3xl font-semibold text-ink-700">
            {score} correct! {newBest ? "🏆" : "🎉"}
          </p>
          {newBest && <p className="mt-1 font-medium text-electric-600">New personal best!</p>}
          {misses.length > 0 && (
            <div className="mt-4 rounded-2xl bg-cream-100 p-4 text-left">
              <p className="text-sm font-semibold text-ink-700">Practice these:</p>
              <ul className="mt-1 text-sm text-ink-500">
                {misses.slice(0, 6).map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <Button variant="electric" onClick={() => setPhase("ready")}>
              Play Again
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { shuffle, useBestScore } from "@/lib/use-best-score";

const COUNTRIES: { country: string; capital: string; continent: string }[] = [
  { country: "Uganda", capital: "Kampala", continent: "Africa" },
  { country: "Japan", capital: "Tokyo", continent: "Asia" },
  { country: "Kenya", capital: "Nairobi", continent: "Africa" },
  { country: "Rwanda", capital: "Kigali", continent: "Africa" },
  { country: "Tanzania", capital: "Dodoma", continent: "Africa" },
  { country: "Ghana", capital: "Accra", continent: "Africa" },
  { country: "Nigeria", capital: "Abuja", continent: "Africa" },
  { country: "Ethiopia", capital: "Addis Ababa", continent: "Africa" },
  { country: "Egypt", capital: "Cairo", continent: "Africa" },
  { country: "China", capital: "Beijing", continent: "Asia" },
  { country: "India", capital: "New Delhi", continent: "Asia" },
  { country: "South Korea", capital: "Seoul", continent: "Asia" },
  { country: "Thailand", capital: "Bangkok", continent: "Asia" },
  { country: "Turkey", capital: "Ankara", continent: "Asia and Europe" },
  { country: "United Kingdom", capital: "London", continent: "Europe" },
  { country: "France", capital: "Paris", continent: "Europe" },
  { country: "Germany", capital: "Berlin", continent: "Europe" },
  { country: "Italy", capital: "Rome", continent: "Europe" },
  { country: "Spain", capital: "Madrid", continent: "Europe" },
  { country: "Norway", capital: "Oslo", continent: "Europe" },
  { country: "Greece", capital: "Athens", continent: "Europe" },
  { country: "Russia", capital: "Moscow", continent: "Europe and Asia" },
  { country: "United States", capital: "Washington, D.C.", continent: "North America" },
  { country: "Canada", capital: "Ottawa", continent: "North America" },
  { country: "Mexico", capital: "Mexico City", continent: "North America" },
  { country: "Brazil", capital: "Brasília", continent: "South America" },
  { country: "Argentina", capital: "Buenos Aires", continent: "South America" },
  { country: "Peru", capital: "Lima", continent: "South America" },
  { country: "Australia", capital: "Canberra", continent: "Oceania" },
  { country: "New Zealand", capital: "Wellington", continent: "Oceania" },
];

const ROUND = 10;

type Question = { country: string; capital: string; continent: string; options: string[] };

/** Math.random — only called from the Start button. */
function buildRound(): Question[] {
  return shuffle(COUNTRIES)
    .slice(0, ROUND)
    .map((c) => ({
      ...c,
      options: shuffle([
        c.capital,
        ...shuffle(COUNTRIES.filter((o) => o.capital !== c.capital))
          .slice(0, 3)
          .map((o) => o.capital),
      ]),
    }));
}

export default function CapitalsQuiz() {
  const [round, setRound] = useState<Question[] | null>(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const { best, record } = useBestScore("capitals");

  function start() {
    setRound(buildRound());
    setStep(0);
    setPicked(null);
    setScore(0);
    setNewBest(false);
  }

  function choose(option: string) {
    if (!round || picked) return;
    setPicked(option);
    if (option === round[step].capital) setScore((s) => s + 1);
  }

  function next() {
    if (!round) return;
    if (step + 1 === round.length) setNewBest(record(score));
    setStep(step + 1);
    setPicked(null);
  }

  if (!round) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="text-4xl">🗺️</p>
        <p className="mt-3 text-ink-500">
          Can you match {ROUND} countries to their capital cities? Some are easy… some are tricky!
        </p>
        {best !== null && <p className="mt-3 text-sm text-ink-500">Your best: {best} / {ROUND}</p>}
        <div className="mt-6">
          <Button variant="electric" onClick={start}>
            Start Round
          </Button>
        </div>
      </Card>
    );
  }

  if (step >= round.length) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="font-heading text-3xl font-semibold text-ink-700">
          {score} / {round.length} {newBest ? "🏆" : "🌍"}
        </p>
        {newBest && <p className="mt-1 font-medium text-electric-600">New personal best!</p>}
        <div className="mt-6">
          <Button variant="electric" onClick={start}>
            Play Another Round
          </Button>
        </div>
      </Card>
    );
  }

  const q = round[step];
  return (
    <Card className="mx-auto max-w-lg p-6 sm:p-8">
      <p className="text-sm font-medium text-ink-500">
        Country {step + 1} of {round.length} · ⭐ {score}
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold text-ink-700">
        What is the capital of {q.country}?
      </h3>
      <p className="text-sm text-ink-500">It&apos;s in {q.continent}.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {q.options.map((o) => {
          let cls = "border-ink-700/10 hover:border-electric-400";
          if (picked && o === q.capital) cls = "border-green-500 bg-green-50";
          else if (picked === o) cls = "border-coral-500 bg-coral-500/10";
          return (
            <button
              key={o}
              type="button"
              onClick={() => choose(o)}
              disabled={Boolean(picked)}
              className={`rounded-2xl border-2 px-5 py-3 text-left font-medium text-ink-700 ${cls}`}
            >
              {o}
              {picked && o === q.capital ? " ✅" : ""}
            </button>
          );
        })}
      </div>
      {picked && (
        <div className="mt-5 text-right">
          <Button variant="spark" onClick={next}>
            {step + 1 === round.length ? "See Score" : "Next Country"}
          </Button>
        </div>
      )}
    </Card>
  );
}

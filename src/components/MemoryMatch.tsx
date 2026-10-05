"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LightningBolt from "@/components/decorative/LightningBolt";

// Tesla's favorites, reused from src/data/favorites.ts so the symbols stay consistent with
// the rest of the site rather than introducing new unrelated icons.
const SYMBOLS = ["🎮", "🎤", "🎬", "⚽", "🏊", "🌊", "❄️", "🕷️"];

function buildDeck(): string[] {
  const deck = [...SYMBOLS, ...SYMBOLS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function MemoryMatch() {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = matched.size === deck.length;

  function flip(i: number) {
    if (locked || flipped.includes(i) || matched.has(i) || flipped.length === 2) return;

    const next = [...flipped, i];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (deck[a] === deck[b]) {
        setMatched((prev) => new Set([...prev, a, b]));
        setFlipped([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 800);
      }
    }
  }

  function restart() {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  }

  if (won) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="font-heading text-2xl font-semibold text-ink-700">
          You matched them all in {moves} moves! 🎉
        </p>
        <p className="mt-2 text-ink-500">Great memory!</p>
        <div className="mt-6">
          <Button variant="electric" onClick={restart}>
            Play Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg p-6 sm:p-8">
      <p className="mb-4 text-center text-sm font-medium text-ink-500">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {deck.map((symbol, i) => {
          const isUp = flipped.includes(i) || matched.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => flip(i)}
              disabled={matched.has(i)}
              aria-label={isUp ? `Card ${i + 1}, showing ${symbol}` : `Card ${i + 1}, hidden`}
              className={`flex aspect-square items-center justify-center rounded-2xl text-2xl shadow-card transition-colors duration-200 sm:text-3xl ${
                matched.has(i)
                  ? "bg-green-100"
                  : isUp
                    ? "bg-white"
                    : "bg-electric-500 hover:bg-electric-600"
              }`}
            >
              {isUp ? symbol : <LightningBolt className="h-6 w-6 text-spark-300 sm:h-7 sm:w-7" />}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

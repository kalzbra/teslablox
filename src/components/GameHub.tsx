"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import type { Photo } from "@/lib/photos";
import Quiz from "@/components/Quiz";
import MemoryMatch from "@/components/MemoryMatch";
import WordScramble from "@/components/WordScramble";
import RandomFact from "@/components/RandomFact";
import RandomPhoto from "@/components/RandomPhoto";
import TimesTableSprint from "@/components/games/TimesTableSprint";
import MiniSudoku from "@/components/games/MiniSudoku";
import SlidingPuzzle from "@/components/games/SlidingPuzzle";
import RocketWordGuess from "@/components/games/RocketWordGuess";
import TicTacToe from "@/components/games/TicTacToe";
import CapitalsQuiz from "@/components/games/CapitalsQuiz";
import PatternMemory from "@/components/games/PatternMemory";
import RiddleBox from "@/components/games/RiddleBox";

type Game = {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  isNew?: boolean;
  render: (props: { photos: Photo[]; puzzlePhoto: Photo }) => ReactNode;
};

const GROUPS: { title: string; games: Game[] }[] = [
  {
    title: "🧠 Brain Puzzles",
    games: [
      { id: "sudoku", title: "Mini Sudoku", emoji: "🔢", blurb: "Fill the grid — no repeats!", isNew: true, render: () => <MiniSudoku /> },
      { id: "sliding", title: "Photo Slide Puzzle", emoji: "🧩", blurb: "Put Tesla's photo back together.", isNew: true, render: ({ puzzlePhoto }) => <SlidingPuzzle photo={puzzlePhoto} /> },
      { id: "pattern", title: "Pattern Memory", emoji: "💡", blurb: "Repeat the growing light pattern.", isNew: true, render: () => <PatternMemory /> },
      { id: "memory", title: "Memory Match", emoji: "🃏", blurb: "Find all the matching pairs.", render: () => <MemoryMatch /> },
      { id: "tictactoe", title: "Tic-Tac-Toe", emoji: "⚡", blurb: "Can you beat the computer?", isNew: true, render: () => <TicTacToe /> },
    ],
  },
  {
    title: "➗ Math",
    games: [
      { id: "times", title: "Times Table Sprint", emoji: "⏱️", blurb: "How many can you get in 60 seconds?", isNew: true, render: () => <TimesTableSprint /> },
    ],
  },
  {
    title: "🔤 Words & Quizzes",
    games: [
      { id: "rocket", title: "Rocket Word Guess", emoji: "🚀", blurb: "Guess the science word before the fuel runs out.", isNew: true, render: () => <RocketWordGuess /> },
      { id: "scramble", title: "Word Scramble", emoji: "🔀", blurb: "Unscramble the mixed-up letters.", render: () => <WordScramble /> },
      { id: "capitals", title: "World Capitals", emoji: "🗺️", blurb: "Match countries to their capitals.", isNew: true, render: () => <CapitalsQuiz /> },
      { id: "quiz", title: "Tesla Quiz", emoji: "❓", blurb: "How well do you know Tesla?", render: () => <Quiz /> },
      { id: "riddles", title: "Riddle Box", emoji: "🤔", blurb: "Tricky riddles to solve and share.", isNew: true, render: () => <RiddleBox /> },
    ],
  },
  {
    title: "✨ Just for Fun",
    games: [
      { id: "fact", title: "Random Tesla Fact", emoji: "✨", blurb: "Learn something about Tesla.", render: () => <RandomFact /> },
      { id: "photo", title: "Random Tesla Photo", emoji: "🎲", blurb: "Pick a surprise photo.", render: ({ photos }) => <RandomPhoto photos={photos} /> },
    ],
  },
];

const ALL_GAMES = GROUPS.flatMap((g) => g.games);

// The selected game lives in the URL hash: Back returns to the list, and games can be linked.
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export default function GameHub({ photos, puzzlePhoto }: { photos: Photo[]; puzzlePhoto: Photo }) {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
  const game = ALL_GAMES.find((g) => g.id === hash);

  if (game) {
    return (
      <div>
        <div className="mb-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-3">
          <a
            href="#"
            className="self-start whitespace-nowrap font-medium text-electric-600 underline underline-offset-4 sm:self-auto"
          >
            ← All games
          </a>
          <h2 className="text-center font-heading text-2xl font-semibold text-ink-700">
            <span aria-hidden="true">{game.emoji}</span> {game.title}
          </h2>
          <span className="hidden w-24 sm:block" aria-hidden="true" />
        </div>
        {game.render({ photos, puzzlePhoto })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <h2 className="mb-4 font-heading text-xl font-semibold text-ink-700">{group.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.games.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="relative flex h-full items-start gap-4 rounded-card bg-white/90 p-5 shadow-card ring-1 ring-ink-700/5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <span className="text-4xl" aria-hidden="true">
                    {g.emoji}
                  </span>
                  <span>
                    <span className="block font-heading text-lg font-semibold text-ink-700">{g.title}</span>
                    <span className="block text-sm text-ink-500">{g.blurb}</span>
                  </span>
                  {g.isNew && (
                    <span className="absolute right-3 top-3 rounded-full bg-spark-400 px-2 py-0.5 text-xs font-semibold text-ink-700">
                      NEW
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

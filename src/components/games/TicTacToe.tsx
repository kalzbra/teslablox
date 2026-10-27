"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useConfetti } from "@/components/Confetti";

type Cell = "X" | "O" | null;
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board: Cell[]): { mark: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return { mark: board[a], line };
  }
  return null;
}

/** Minimax — "Hard" mode never loses. Score from O's (computer's) point of view. */
function minimax(board: Cell[], turn: "X" | "O"): number {
  const w = winner(board);
  if (w) return w.mark === "O" ? 10 : -10;
  if (board.every(Boolean)) return 0;
  const scores = board.flatMap((cell, i) => {
    if (cell) return [];
    const next = [...board];
    next[i] = turn;
    return [minimax(next, turn === "O" ? "X" : "O") * 0.9];
  });
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}

/** Math.random in easy mode — only ever called from a click handler. */
function computerMove(board: Cell[], hard: boolean): number {
  const empty = board.flatMap((c, i) => (c ? [] : [i]));
  if (!hard) return empty[Math.floor(Math.random() * empty.length)];
  let bestScore = -Infinity;
  let best = empty[0];
  for (const i of empty) {
    const next = [...board];
    next[i] = "O";
    const score = minimax(next, "X");
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [hard, setHard] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [tally, setTally] = useState({ you: 0, computer: 0, ties: 0 });
  const { fire, confetti } = useConfetti();

  const win = winner(board);
  const full = board.every(Boolean);
  const over = Boolean(win) || full;

  function finish(final: Cell[]) {
    const w = winner(final);
    if (w?.mark === "X") {
      setTally((t) => ({ ...t, you: t.you + 1 }));
      fire();
    } else if (w?.mark === "O") setTally((t) => ({ ...t, computer: t.computer + 1 }));
    else if (final.every(Boolean)) setTally((t) => ({ ...t, ties: t.ties + 1 }));
  }

  function play(i: number) {
    if (board[i] || over || thinking) return;
    const afterYou = [...board];
    afterYou[i] = "X";
    setBoard(afterYou);
    if (winner(afterYou) || afterYou.every(Boolean)) {
      finish(afterYou);
      return;
    }
    setThinking(true);
    setTimeout(() => {
      const afterComputer = [...afterYou];
      afterComputer[computerMove(afterYou, hard)] = "O";
      setBoard(afterComputer);
      setThinking(false);
      if (winner(afterComputer) || afterComputer.every(Boolean)) finish(afterComputer);
    }, 450);
  }

  const status = win
    ? win.mark === "X"
      ? "You win! 🎉"
      : "The computer wins this time 🤖"
    : full
      ? "It's a tie! 🤝"
      : thinking
        ? "Computer is thinking…"
        : "Your turn — you're ⚡ X";

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      {confetti}
      <div className="flex justify-center gap-2" role="group" aria-label="Difficulty">
        {[false, true].map((h) => (
          <button
            key={String(h)}
            type="button"
            onClick={() => {
              setHard(h);
              setBoard(Array(9).fill(null));
            }}
            aria-pressed={hard === h}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              hard === h ? "bg-electric-500 text-white" : "bg-cream-100 text-ink-700"
            }`}
          >
            {h ? "Hard 🧠" : "Easy 🙂"}
          </button>
        ))}
      </div>

      <p className="mt-4 font-heading text-lg font-semibold text-ink-700" aria-live="polite">
        {status}
      </p>

      <div className="mx-auto mt-4 grid max-w-[16rem] grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => play(i)}
            aria-label={`Square ${i + 1}${cell ? `: ${cell}` : ""}`}
            className={`flex aspect-square items-center justify-center rounded-2xl font-heading text-4xl font-semibold shadow-card ${
              win?.line.includes(i) ? "bg-spark-300" : "bg-white"
            } ${cell === "X" ? "text-electric-600" : "text-coral-600"}`}
          >
            {cell === "X" ? "⚡" : cell === "O" ? "🤖" : ""}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ink-500">
        You {tally.you} · Computer {tally.computer} · Ties {tally.ties}
      </p>
      {over && (
        <div className="mt-4">
          <Button variant="electric" onClick={() => setBoard(Array(9).fill(null))}>
            Play Again
          </Button>
        </div>
      )}
    </Card>
  );
}

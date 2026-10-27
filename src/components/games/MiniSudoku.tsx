"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { shuffle } from "@/lib/use-best-score";

type Size = { n: number; boxRows: number; boxCols: number; blanks: number; label: string };

const SIZES: Size[] = [
  { n: 4, boxRows: 2, boxCols: 2, blanks: 8, label: "4 × 4 (warm-up)" },
  { n: 6, boxRows: 2, boxCols: 3, blanks: 18, label: "6 × 6 (challenge)" },
];

type Puzzle = { size: Size; givens: (number | null)[] };

/** A valid solved grid from the classic shifted-pattern formula. */
function baseGrid({ n, boxRows, boxCols }: Size): number[][] {
  return Array.from({ length: n }, (_, r) =>
    Array.from({ length: n }, (_, c) => ((boxCols * (r % boxRows) + Math.floor(r / boxRows) + c) % n) + 1),
  );
}

/** Shuffle digits, rows within bands, and columns within stacks — always stays a valid grid.
 * Uses Math.random, so only call from event handlers. */
function generate(size: Size): Puzzle {
  const { n, boxRows, boxCols, blanks } = size;
  const digits = shuffle(Array.from({ length: n }, (_, i) => i + 1));
  const rowOrder = shuffle(Array.from({ length: n / boxRows }, (_, b) => b)).flatMap((band) =>
    shuffle(Array.from({ length: boxRows }, (_, i) => band * boxRows + i)),
  );
  const colOrder = shuffle(Array.from({ length: n / boxCols }, (_, s) => s)).flatMap((stack) =>
    shuffle(Array.from({ length: boxCols }, (_, i) => stack * boxCols + i)),
  );
  const base = baseGrid(size);
  const solved = rowOrder.flatMap((r) => colOrder.map((c) => digits[base[r][c] - 1]));
  const hidden = new Set(shuffle(solved.map((_, i) => i)).slice(0, blanks));
  return { size, givens: solved.map((v, i) => (hidden.has(i) ? null : v)) };
}

/** Fixed starting puzzle, so the server-rendered HTML and first client render match. */
const INITIAL: Puzzle = {
  size: SIZES[0],
  givens: [1, null, null, 4, null, 4, 1, null, null, 1, 4, null, 4, null, null, 1],
};

function conflicts(cells: (number | null)[], size: Size): Set<number> {
  const { n, boxRows, boxCols } = size;
  const bad = new Set<number>();
  const groups: number[][] = [];
  for (let i = 0; i < n; i++) {
    groups.push(Array.from({ length: n }, (_, j) => i * n + j)); // row
    groups.push(Array.from({ length: n }, (_, j) => j * n + i)); // column
  }
  for (let br = 0; br < n; br += boxRows) {
    for (let bc = 0; bc < n; bc += boxCols) {
      const box: number[] = [];
      for (let r = 0; r < boxRows; r++) for (let c = 0; c < boxCols; c++) box.push((br + r) * n + bc + c);
      groups.push(box);
    }
  }
  for (const g of groups) {
    const seen = new Map<number, number>();
    for (const idx of g) {
      const v = cells[idx];
      if (v === null) continue;
      if (seen.has(v)) {
        bad.add(idx);
        bad.add(seen.get(v)!);
      } else seen.set(v, idx);
    }
  }
  return bad;
}

export default function MiniSudoku() {
  const [puzzle, setPuzzle] = useState<Puzzle>(INITIAL);
  const [cells, setCells] = useState<(number | null)[]>(INITIAL.givens);
  const [selected, setSelected] = useState<number | null>(null);

  const { size } = puzzle;
  const bad = conflicts(cells, size);
  const solved = cells.every((v) => v !== null) && bad.size === 0;

  function newPuzzle(s: Size) {
    const p = generate(s);
    setPuzzle(p);
    setCells(p.givens);
    setSelected(null);
  }

  function place(value: number | null) {
    if (selected === null || puzzle.givens[selected] !== null || solved) return;
    setCells((c) => c.map((v, i) => (i === selected ? value : v)));
  }

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      <p className="text-sm text-ink-500">
        Fill the grid so every row, column, and box has each number from 1 to {size.n} exactly once.
      </p>

      <div
        className="mx-auto mt-5 grid max-w-xs gap-0 overflow-hidden rounded-xl border-4 border-ink-700"
        style={{ gridTemplateColumns: `repeat(${size.n}, minmax(0, 1fr))` }}
      >
        {cells.map((v, i) => {
          const r = Math.floor(i / size.n);
          const c = i % size.n;
          const given = puzzle.givens[i] !== null;
          const boxRight = (c + 1) % size.boxCols === 0 && c !== size.n - 1;
          const boxBottom = (r + 1) % size.boxRows === 0 && r !== size.n - 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`Row ${r + 1}, column ${c + 1}${v ? `: ${v}` : ", empty"}`}
              className={`aspect-square border border-ink-700/15 font-heading text-xl font-semibold sm:text-2xl ${
                boxRight ? "border-r-2 border-r-ink-700" : ""
              } ${boxBottom ? "border-b-2 border-b-ink-700" : ""} ${
                selected === i ? "bg-spark-300" : bad.has(i) ? "bg-coral-500/20" : given ? "bg-cream-100" : "bg-white"
              } ${given ? "text-ink-700" : bad.has(i) ? "text-coral-600" : "text-electric-600"}`}
            >
              {v ?? ""}
            </button>
          );
        })}
      </div>

      {solved ? (
        <p className="mt-5 font-heading text-2xl font-semibold text-green-600 animate-fade-up">
          Solved it! 🧩🎉
        </p>
      ) : (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {Array.from({ length: size.n }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => place(d)}
              className="h-11 w-11 rounded-xl bg-electric-500 font-heading text-lg font-semibold text-white disabled:opacity-40"
              disabled={selected === null}
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            onClick={() => place(null)}
            className="h-11 rounded-xl bg-cream-200 px-3 text-sm font-medium text-ink-700 disabled:opacity-40"
            disabled={selected === null}
          >
            Erase
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {SIZES.map((s) => (
          <Button key={s.n} variant={s.n === size.n ? "electric" : "ghost"} onClick={() => newPuzzle(s)}>
            New {s.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}

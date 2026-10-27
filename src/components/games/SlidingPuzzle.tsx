"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useConfetti } from "@/components/Confetti";
import { largestSrc, type Photo } from "@/lib/photos";
import { useBestScore } from "@/lib/use-best-score";

const N = 3;
const BOARD = 288; // px — fits a 320px-wide phone with the card padding
const TILE = BOARD / N;
const SOLVED = Array.from({ length: N * N }, (_, i) => (i === N * N - 1 ? null : i));

function neighbors(index: number): number[] {
  const r = Math.floor(index / N);
  const c = index % N;
  const out: number[] = [];
  if (r > 0) out.push(index - N);
  if (r < N - 1) out.push(index + N);
  if (c > 0) out.push(index - 1);
  if (c < N - 1) out.push(index + 1);
  return out;
}

/** Scramble by making random legal moves from the solved state, so it's always solvable.
 * Uses Math.random — event handlers only. */
function scramble(): (number | null)[] {
  const tiles = [...SOLVED];
  let empty = tiles.indexOf(null);
  let previous = -1;
  for (let i = 0; i < 150; i++) {
    const options = neighbors(empty).filter((n) => n !== previous);
    const pick = options[Math.floor(Math.random() * options.length)];
    [tiles[empty], tiles[pick]] = [tiles[pick], tiles[empty]];
    previous = empty;
    empty = pick;
  }
  return tiles;
}

export default function SlidingPuzzle({ photo }: { photo: Photo }) {
  const [tiles, setTiles] = useState<(number | null)[]>(SOLVED);
  const [moves, setMoves] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const { best, record } = useBestScore("sliding-puzzle", true);

  // Cover-crop the photo onto a square board (no stretching).
  const scale = Math.max(BOARD / photo.width, BOARD / photo.height);
  const bgW = photo.width * scale;
  const bgH = photo.height * scale;
  const offsetX = (bgW - BOARD) / 2;
  const offsetY = (bgH - BOARD) / 2;
  const src = largestSrc({ ...photo, widths: photo.widths.filter((w) => w <= 800) });

  const { fire, confetti } = useConfetti();
  const solved = playing && tiles.every((t, i) => t === SOLVED[i]);

  function start() {
    setTiles(scramble());
    setMoves(0);
    setNewBest(false);
    setPlaying(true);
  }

  function move(index: number) {
    if (!playing || solved) return;
    const empty = tiles.indexOf(null);
    if (!neighbors(empty).includes(index)) return;
    const next = [...tiles];
    [next[empty], next[index]] = [next[index], next[empty]];
    setTiles(next);
    setMoves(moves + 1);
    if (next.every((t, i) => t === SOLVED[i])) {
      setNewBest(record(moves + 1));
      fire();
    }
  }

  return (
    <Card className="mx-auto max-w-lg p-6 text-center sm:p-8">
      <p className="text-sm text-ink-500">
        Slide the pieces to put Tesla&apos;s photo back together. Tap a piece next to the empty space
        to move it.
      </p>

      <div
        className="relative mx-auto mt-5 overflow-hidden rounded-xl bg-ink-700/10"
        style={{ width: BOARD, height: BOARD }}
      >
        {tiles.map((tile, index) => {
          if (tile === null) return null;
          const r = Math.floor(index / N);
          const c = index % N;
          const tr = Math.floor(tile / N);
          const tc = tile % N;
          return (
            <button
              key={tile}
              type="button"
              onClick={() => move(index)}
              aria-label={`Piece ${tile + 1}`}
              className="absolute border border-white/70 transition-all duration-150"
              style={{
                width: TILE,
                height: TILE,
                left: c * TILE,
                top: r * TILE,
                backgroundImage: `url(${src})`,
                backgroundSize: `${bgW}px ${bgH}px`,
                backgroundPosition: `${-(tc * TILE + offsetX)}px ${-(tr * TILE + offsetY)}px`,
              }}
            >
              {showNumbers && (
                <span className="absolute left-1 top-1 rounded-md bg-ink-700/70 px-1.5 text-xs font-semibold text-white">
                  {tile + 1}
                </span>
              )}
            </button>
          );
        })}
        {(!playing || solved) && tiles.includes(null) && (
          <div
            className="absolute"
            style={{
              width: TILE,
              height: TILE,
              left: (N - 1) * TILE,
              top: (N - 1) * TILE,
              backgroundImage: `url(${src})`,
              backgroundSize: `${bgW}px ${bgH}px`,
              backgroundPosition: `${-((N - 1) * TILE + offsetX)}px ${-((N - 1) * TILE + offsetY)}px`,
            }}
          />
        )}
      </div>

      <p className="mt-4 text-sm text-ink-500">
        {playing ? `Moves: ${moves}` : "Here's the picture you'll be putting together!"}
        {best !== null && ` · Best: ${best} moves`}
      </p>
      {confetti}
      {solved && (
        <p className="mt-2 font-heading text-2xl font-semibold text-green-600 animate-fade-up">
          You did it in {moves} moves! {newBest ? "🏆 New best!" : "🎉"}
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button variant="electric" onClick={start}>
          {playing ? "Shuffle Again" : "Shuffle & Play"}
        </Button>
        <Button variant="ghost" onClick={() => setShowNumbers((s) => !s)}>
          {showNumbers ? "Hide numbers" : "Show numbers (hint)"}
        </Button>
      </div>
    </Card>
  );
}

"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";

const COLORS = ["#3b6fe0", "#ffd23f", "#ff7a5c", "#2fb877", "#8b6bd9", "#e0559a", "#1ea4e0"];
const SHAPES = ["⚡", "★", "●", "■"];

type Piece = { id: number; style: CSSProperties; shape: string };

/**
 * Lightweight celebration burst — no library. `fire()` must be called from an event handler (it
 * uses Math.random); the pieces fall with CSS and clear themselves. Under reduced motion the
 * global rule shortens animations to ~0, so they effectively don't appear.
 */
export function useConfetti(count = 70) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextId = useRef(0);

  const fire = useCallback(() => {
    const batch: Piece[] = Array.from({ length: count }, () => {
      const id = nextId.current++;
      const duration = 1.8 + Math.random() * 1.6;
      return {
        id,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        style: {
          left: `${Math.random() * 100}%`,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          fontSize: `${0.7 + Math.random() * 0.9}rem`,
          animation: `confetti-fall ${duration}s cubic-bezier(0.25, 0.6, 0.5, 1) ${Math.random() * 0.4}s both`,
          ["--drift" as string]: `${(Math.random() - 0.5) * 240}px`,
          ["--spin" as string]: `${(Math.random() - 0.5) * 1440}deg`,
        },
      };
    });
    setPieces(batch);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPieces([]), 4000);
  }, [count]);

  const confetti =
    pieces.length > 0 ? (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {pieces.map((p) => (
          <span key={p.id} className="absolute top-0 font-bold" style={p.style}>
            {p.shape}
          </span>
        ))}
      </div>
    ) : null;

  return { fire, confetti };
}

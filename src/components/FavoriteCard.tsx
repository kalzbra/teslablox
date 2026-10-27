"use client";

import Link from "next/link";
import { useState } from "react";
import ExternalLink from "@/components/ui/ExternalLink";
import type { Favorite } from "@/data/favorites";
import { accent } from "@/lib/accents";

/**
 * Tap-to-flip card. Both faces sit in the same grid cell so the card is as tall as its taller
 * face; the hidden face is `inert` so keyboard/screen-reader users only ever reach the visible one.
 */
export default function FavoriteCard({ favorite, index }: { favorite: Favorite; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const a = accent(index);

  return (
    <div className="reveal h-full perspective-distant">
      <div
        className={`grid h-full transition-transform duration-500 transform-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setFlipped(true)}
          inert={flipped}
          aria-label={`${favorite.title} — tap to learn more`}
          className={`group flex min-h-56 flex-col items-center justify-center gap-3 rounded-card p-6 text-center shadow-card ring-2 backface-hidden [grid-area:1/1] ${a.soft} ${a.ring}`}
        >
          <span aria-hidden="true" className="wiggle text-6xl">
            {favorite.emoji}
          </span>
          <span className={`font-heading text-2xl font-bold ${a.text}`}>{favorite.title}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${a.solid}`}>
            Tap to flip ↻
          </span>
        </button>

        <div
          inert={!flipped}
          className={`flex min-h-56 flex-col rounded-card bg-white p-6 shadow-card ring-2 rotate-y-180 backface-hidden [grid-area:1/1] ${a.ring}`}
        >
          <p className={`font-heading text-xl font-bold ${a.text}`}>
            <span aria-hidden="true">{favorite.emoji}</span> {favorite.title}
          </p>
          <p className="mt-2 flex-1 text-ink-700">{favorite.blurb}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {favorite.externalLink ? (
              <ExternalLink href={favorite.externalLink.href}>
                {favorite.externalLink.label}
              </ExternalLink>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className={`rounded-full px-3 py-1 text-sm font-semibold ${a.soft} ${a.text}`}
            >
              ↺ Flip back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FavoriteHighlightLink({ favorite, index }: { favorite: Favorite; index: number }) {
  const a = accent(index);
  return (
    <Link
      href={`/favorites#${favorite.slug}`}
      className={`group flex flex-col items-center gap-2 rounded-card p-5 text-center shadow-card ring-2 transition-transform duration-200 hover:-translate-y-1 hover:rotate-1 motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0 ${a.soft} ${a.ring}`}
    >
      <span aria-hidden="true" className="wiggle text-5xl">
        {favorite.emoji}
      </span>
      <span className={`font-heading text-base font-bold ${a.text}`}>{favorite.title}</span>
    </Link>
  );
}

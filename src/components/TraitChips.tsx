"use client";

import { useState } from "react";
import { accent } from "@/lib/accents";

const EMOJI: Record<string, string> = {
  Kind: "💛",
  Smart: "🧠",
  Curious: "🔍",
  "Hard-working": "💪",
  Sweet: "🍬",
  Creative: "🎨",
  "Good with electronics": "🔌",
  "Family-oriented": "🏡",
  "Loves learning": "📚",
  "Loves creating": "🛠️",
};

/** Colorful trait chips — tapping one makes it pop and light up. */
export default function TraitChips({ traits }: { traits: readonly string[] }) {
  const [lit, setLit] = useState<Set<string>>(new Set());

  function toggle(t: string) {
    setLit((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  return (
    <>
      <p className="mb-5 text-center text-ink-500">Tap them to light them up! ✨</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {traits.map((t, i) => {
          const a = accent(i);
          const on = lit.has(t);
          return (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggle(t)}
                aria-pressed={on}
                className={`group flex w-full flex-col items-center gap-1 rounded-2xl px-4 py-4 text-center font-heading text-lg font-bold shadow-card ring-2 transition-all duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${a.ring} ${
                  on ? `${a.solid} scale-105` : `${a.soft} ${a.text}`
                }`}
              >
                <span aria-hidden="true" className={`text-3xl ${on ? "animate-pop" : "wiggle"}`}>
                  {EMOJI[t] ?? "⭐"}
                </span>
                {t}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

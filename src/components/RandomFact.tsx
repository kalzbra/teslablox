"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Sparkle from "@/components/decorative/Sparkle";
import { teslaFacts } from "@/data/facts";

export default function RandomFact() {
  const [fact, setFact] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  function showRandom() {
    let next = fact;
    while (teslaFacts.length > 1 && next === fact) {
      next = teslaFacts[Math.floor(Math.random() * teslaFacts.length)];
    }
    setFact(next ?? teslaFacts[0]);
    setKey((k) => k + 1);
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <Button variant="electric" onClick={showRandom}>
        ✨ Tell Me Something About Tesla
      </Button>

      {fact && (
        <p
          key={key}
          className="flex max-w-md animate-fade-up items-center gap-2 rounded-card bg-white/90 px-6 py-4 text-lg font-medium text-ink-700 shadow-card"
        >
          <Sparkle className="h-5 w-5 shrink-0 text-spark-500 animate-spark" />
          {fact}
        </p>
      )}
    </div>
  );
}

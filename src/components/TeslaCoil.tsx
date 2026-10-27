"use client";

import { useRef, useState, type CSSProperties } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LightningBolt from "@/components/decorative/LightningBolt";

const FACTS = [
  "A Tesla coil makes sparks that jump through the air — like tiny lightning!",
  "Lightning is a giant spark of electricity between clouds and the ground.",
  "Electricity flows easily through metals like copper. That's why wires are made of it.",
  "Rubber and plastic don't let electricity through, so they wrap around wires to keep us safe.",
  "The electricity in your wall sockets is AC — it switches direction many times every second. Nikola Tesla helped make AC power work.",
];

type Bolt = { id: number; style: CSSProperties };

/** An interactive toy: tap to zap. Bolts are generated in the click handler (Math.random). */
export default function TeslaCoil() {
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const [zaps, setZaps] = useState(0);
  const nextId = useRef(0);

  function zap() {
    const fresh: Bolt[] = Array.from({ length: 9 }, () => {
      const angle = Math.random() * Math.PI - Math.PI; // spray upward in a fan
      const dist = 70 + Math.random() * 70;
      return {
        id: nextId.current++,
        style: {
          ["--dx" as string]: `${Math.cos(angle) * dist}px`,
          ["--dy" as string]: `${Math.sin(angle) * dist}px`,
          ["--rot" as string]: `${Math.random() * 360}deg`,
          animation: `bolt-flash ${0.5 + Math.random() * 0.4}s ease-out ${Math.random() * 0.15}s both`,
        },
      };
    });
    setBolts(fresh);
    setZaps((z) => z + 1);
  }

  return (
    <Card className="mx-auto max-w-lg overflow-hidden p-8 text-center">
      <p className="font-heading text-2xl font-semibold text-ink-700">Try the Tesla Coil! ⚡</p>
      <p className="mt-1 text-ink-500">Tap the button to make sparks fly.</p>

      <div className="relative mx-auto mt-6 h-56 w-40" aria-hidden="true">
        {/* top "donut" of the coil, where the sparks come from */}
        <div className="absolute left-1/2 top-6 h-10 w-32 -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 shadow-card" />
        {/* coil tower with copper windings */}
        <div className="absolute bottom-6 left-1/2 h-36 w-12 -translate-x-1/2 rounded-md bg-[repeating-linear-gradient(0deg,#c47b3a_0px,#c47b3a_4px,#e8a15f_4px,#e8a15f_7px)] shadow-card" />
        <div className="absolute bottom-0 left-1/2 h-7 w-28 -translate-x-1/2 rounded-lg bg-ink-700" />
        <div className="absolute left-1/2 top-11 -translate-x-1/2">
          {bolts.map((b) => (
            <span key={b.id} className="absolute -left-4 -top-4" style={b.style}>
              <LightningBolt className="h-8 w-8 text-spark-400 drop-shadow-[0_0_6px_rgba(255,210,63,0.9)]" />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button variant="spark" onClick={zap}>
          ⚡ Zap!
        </Button>
      </div>

      <p className="mt-5 min-h-[3.5rem] text-ink-700" aria-live="polite">
        {zaps === 0 ? "Each zap shows you an electricity fact." : FACTS[(zaps - 1) % FACTS.length]}
      </p>
      {zaps > 0 && <p className="text-sm text-ink-500">Zaps: {zaps}</p>}
    </Card>
  );
}

"use client";

import { useState } from "react";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import Button from "@/components/ui/Button";
import type { Photo } from "@/lib/photos";

export default function RandomPhoto({ photos }: { photos: Photo[] }) {
  const [current, setCurrent] = useState<Photo | null>(null);
  const [spin, setSpin] = useState(0);

  function showRandom() {
    if (photos.length === 0) return;
    let next = current;
    while (photos.length > 1 && next?.id === current?.id) {
      next = photos[Math.floor(Math.random() * photos.length)];
    }
    setCurrent(next ?? photos[0]);
    setSpin((s) => s + 1);
  }

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <Button variant="spark" onClick={showRandom}>
        🎲 Show Me a Random Tesla Photo
      </Button>

      {current && (
        <div
          key={spin}
          className="w-full max-w-sm animate-fade-up overflow-hidden rounded-card shadow-card-lg"
        >
          <ResponsivePhoto
            photo={current}
            alt={current.alt}
            sizes="(min-width: 640px) 24rem, 90vw"
            className="w-full object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}

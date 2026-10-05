"use client";

import { useEffect, useRef, useState } from "react";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import type { Photo } from "@/lib/photos";

const ROTATE_MS = 5000;

export default function HeroPhotoRotator({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (photos.length <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return; // show the first photo only, no auto-advance

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, ROTATE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [photos.length]);

  function goTo(i: number) {
    setIndex(i);
    // Manually picking a photo resets the auto-advance clock so it doesn't jump right away.
    if (timerRef.current) clearInterval(timerRef.current);
    if (photos.length > 1) {
      timerRef.current = setInterval(() => {
        setIndex((cur) => (cur + 1) % photos.length);
      }, ROTATE_MS);
    }
  }

  if (photos.length === 0) return null;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-card-lg ring-4 ring-white">
        {photos.map((photo, i) => (
          <ResponsivePhoto
            key={photo.id}
            photo={photo}
            alt={photo.alt}
            sizes="(min-width: 1024px) 28rem, 90vw"
            priority={i === 0}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {photos.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1} of ${photos.length}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-electric-500" : "w-2.5 bg-electric-200 hover:bg-electric-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { largestSrc, type ImageLike } from "@/lib/photos";

type LightboxPhoto = ImageLike & {
  width: number;
  height: number;
};

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  alts: string[];
  captions?: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function PhotoLightbox({
  photos,
  alts,
  captions,
  index,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onNavigate]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-700/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-ink-700 hover:bg-white"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + photos.length) % photos.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink-700 hover:bg-white sm:left-6"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % photos.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-ink-700 hover:bg-white sm:right-6"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element -- see ResponsivePhoto.tsx */}
      <img
        src={largestSrc(photo)}
        alt={alts[index] ?? ""}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-card-lg animate-fade-up"
      />
      {captions?.[index] && (
        <p className="mt-4 max-w-2xl text-center text-sm text-white/90">{captions[index]}</p>
      )}
      <p className="mt-2 text-xs text-white/60">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}

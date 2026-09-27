"use client";

import { useState } from "react";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import PhotoLightbox from "@/components/PhotoLightbox";
import type { Photo } from "@/lib/photos";

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl shadow-card ring-1 ring-ink-700/5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              aria-label={`View larger photo: ${photo.alt}`}
            >
              <ResponsivePhoto
                photo={photo}
                alt={photo.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <PhotoLightbox
          photos={photos}
          alts={photos.map((p) => p.alt)}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}

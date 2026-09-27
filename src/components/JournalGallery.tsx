"use client";

import { useState } from "react";
import ResponsivePhoto from "@/components/ResponsivePhoto";
import PhotoLightbox from "@/components/PhotoLightbox";
import type { TripPage } from "@/lib/photos";

export default function JournalGallery({ pages }: { pages: TripPage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const alts = pages.map((p) => `${p.printedPage} of Tesla's Kabale memory book`);
  const captions = pages.map((p) => p.printedPage);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {pages.map((page, i) => (
          <li key={page.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Enlarge ${page.printedPage}`}
              className="group block w-full overflow-hidden rounded-2xl border-2 border-cream-200 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <ResponsivePhoto
                photo={page}
                alt={alts[i]}
                sizes="(min-width: 1024px) 20vw, 33vw"
                className="aspect-[3/4] w-full object-cover"
              />
              <span className="block bg-cream-100 py-1.5 text-center text-xs font-medium text-ink-500">
                {page.printedPage}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <PhotoLightbox
          photos={pages}
          alts={alts}
          captions={captions}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}

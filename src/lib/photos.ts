import manifest from "@/data/generated/photo-manifest.json";

export type PhotoCategory =
  | "Family"
  | "Cousins"
  | "Adventures"
  | "Sports"
  | "Swimming"
  | "Singing"
  | "Fun"
  | "Everyday Tesla";

export type Photo = {
  id: string;
  category: PhotoCategory;
  alt: string;
  width: number;
  height: number;
  widths: number[];
  srcBase: string;
};

export type TripPage = {
  id: string;
  order: number;
  printedPage: string;
  width: number;
  height: number;
  widths: number[];
  srcBase: string;
};

export const photos: Photo[] = manifest.photos as Photo[];
export const tripPages: TripPage[] = (manifest.trip as TripPage[]).sort(
  (a, b) => a.order - b.order,
);

export function photoCategories(): PhotoCategory[] {
  const seen = new Set<PhotoCategory>();
  const ordered: PhotoCategory[] = [];
  for (const photo of photos) {
    if (!seen.has(photo.category)) {
      seen.add(photo.category);
      ordered.push(photo.category);
    }
  }
  return ordered;
}

export function photosByCategory(category: PhotoCategory): Photo[] {
  return photos.filter((p) => p.category === category);
}

/** Deterministic-looking spread of hero/highlight photos for the homepage, picked by a fixed
 * stride rather than every build reshuffling — keeps the homepage fast and stable. */
export function homepagePhotoSelection(count: number): Photo[] {
  if (photos.length === 0) return [];
  const stride = Math.max(1, Math.floor(photos.length / count));
  const selection: Photo[] = [];
  for (let i = 0; i < photos.length && selection.length < count; i += stride) {
    selection.push(photos[i]);
  }
  return selection;
}

/** Minimal shape shared by Photo/TripPage — every processed image manifest entry has this. */
export type ImageLike = {
  srcBase: string;
  widths: number[];
};

// These are plain <img> URLs (not next/image or next/link), so — unlike the rest of the
// app — they don't get Next's automatic basePath rewriting and need it applied by hand.
// Matches the basePath set in next.config.ts / by the GitHub Pages workflow.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function srcSet(photo: ImageLike): string {
  return photo.widths
    .map((w) => `${BASE_PATH}${photo.srcBase}-${w}.webp ${w}w`)
    .join(", ");
}

export function largestSrc(photo: ImageLike): string {
  const max = photo.widths[photo.widths.length - 1];
  return `${BASE_PATH}${photo.srcBase}-${max}.webp`;
}

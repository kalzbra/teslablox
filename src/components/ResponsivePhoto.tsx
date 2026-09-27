import { srcSet, largestSrc, type ImageLike } from "@/lib/photos";

type PhotoLike = ImageLike & {
  width: number;
  height: number;
};

type ResponsivePhotoProps = {
  photo: PhotoLike;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export default function ResponsivePhoto({
  photo,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
  priority = false,
}: ResponsivePhotoProps) {
  // Static export has no server to run next/image's optimizer, so we ship our own
  // pre-built responsive widths (scripts/process-images.mjs) via a real <img srcset>.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={largestSrc(photo)}
      srcSet={srcSet(photo)}
      sizes={sizes}
      alt={alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

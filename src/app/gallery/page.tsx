import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoGrid from "@/components/PhotoGrid";
import RandomPhoto from "@/components/RandomPhoto";
import { photoCategories, photos, photosByCategory } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery | TeslaBlox",
  description: "Tesla's photo gallery — family, adventures, and everyday moments.",
};

export default function GalleryPage() {
  const categories = photoCategories();

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Gallery" title="📸 Tesla's Gallery" />

      <div className="mb-16 flex justify-center">
        <RandomPhoto photos={photos} />
      </div>

      {categories.length > 1 && (
        <nav aria-label="Gallery categories" className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ink-700 shadow-card ring-1 ring-ink-700/5 hover:text-electric-600"
            >
              {category}
            </a>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="scroll-mt-24"
          >
            <h2 className="mb-5 font-heading text-2xl font-semibold text-ink-700">{category}</h2>
            <PhotoGrid photos={photosByCategory(category)} />
          </section>
        ))}
      </div>
    </Container>
  );
}

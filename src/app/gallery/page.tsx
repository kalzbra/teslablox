import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { accent } from "@/lib/accents";
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
      <SectionHeading eyebrow="Gallery" title="📸 Tesla's Gallery" color="berry" />

      <div className="mb-16 flex justify-center">
        <RandomPhoto photos={photos} />
      </div>

      {categories.length > 1 && (
        <nav aria-label="Gallery categories" className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category, i) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-full px-4 py-2 font-heading font-semibold shadow-card transition-transform hover:-translate-y-0.5 ${accent(i).solid}`}
            >
              {category}
            </a>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-16">
        {categories.map((category, i) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="scroll-mt-24"
          >
            <h2 className={`mb-5 w-fit rounded-2xl px-4 py-1 font-heading text-2xl font-bold ${accent(i).soft} ${accent(i).text}`}>{category}</h2>
            <PhotoGrid photos={photosByCategory(category)} />
          </section>
        ))}
      </div>
    </Container>
  );
}

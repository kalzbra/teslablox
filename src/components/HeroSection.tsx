import HeroPhotoRotator from "@/components/HeroPhotoRotator";
import Button from "@/components/ui/Button";
import LightningBolt from "@/components/decorative/LightningBolt";
import Sparkle from "@/components/decorative/Sparkle";
import type { Photo } from "@/lib/photos";

export default function HeroSection({ photos }: { photos: Photo[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-violet-100 to-spark-100 pb-16 pt-12 sm:pt-16">
      <Sparkle className="absolute left-6 top-10 hidden h-8 w-8 text-spark-400 animate-float sm:block" />
      <LightningBolt className="absolute right-10 top-24 hidden h-10 w-10 text-electric-300 animate-float sm:block" />
      <Sparkle className="absolute bottom-10 left-1/3 hidden h-6 w-6 text-coral-300 animate-float sm:block" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-heading text-sm font-semibold text-electric-600 shadow-card">
            <span aria-hidden="true">👋</span>
            Hi, I&apos;m Tesla!
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-ink-700 sm:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-electric-600 via-violet-500 to-berry-500 bg-clip-text text-transparent">
              TeslaBlox!
            </span>{" "}
            <span className="inline-block animate-float">⚡</span>
          </h1>
          <p className="mt-3 font-heading text-lg font-medium text-electric-600">
            Adventures • Family • Fun • Dreams • Science
          </p>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-700 lg:mx-0">
            Hi! I&apos;m Tesla Riley Shyaka. Welcome to my little corner of the internet, where
            you can discover the things I love, see my adventures, meet my family, explore my
            favorite characters, and learn why I was named after one of the world&apos;s most
            famous inventors.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button href="/about" variant="electric">
              Meet Tesla
            </Button>
            <Button href="/favorites" variant="spark">
              Explore My Favorites
            </Button>
            <Button href="/adventures" variant="coral">
              See My Adventures
            </Button>
            <Button href="/gallery" variant="ghost">
              Visit the Tesla Gallery
            </Button>
            <Button href="/nikola-tesla" variant="ghost">
              Meet Nikola Tesla
            </Button>
          </div>
        </div>

        <HeroPhotoRotator photos={photos} />
      </div>
    </section>
  );
}

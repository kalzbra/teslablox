import ResponsivePhoto from "@/components/ResponsivePhoto";
import Button from "@/components/ui/Button";
import LightningBolt from "@/components/decorative/LightningBolt";
import Sparkle from "@/components/decorative/Sparkle";
import type { Photo } from "@/lib/photos";

export default function HeroSection({ photo }: { photo: Photo }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-cream-50 to-cream-50 pb-16 pt-12 sm:pt-16">
      <Sparkle className="absolute left-6 top-10 hidden h-8 w-8 text-spark-400 animate-float sm:block" />
      <LightningBolt className="absolute right-10 top-24 hidden h-10 w-10 text-electric-300 animate-float sm:block" />
      <Sparkle className="absolute bottom-10 left-1/3 hidden h-6 w-6 text-coral-300 animate-float sm:block" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 font-heading text-sm font-semibold text-electric-600 shadow-card">
            <LightningBolt className="h-4 w-4" />
            Welcome to TeslaBlox!
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-tight text-ink-700 sm:text-5xl">
            Welcome to TeslaBlox! ⚡
          </h1>
          <p className="mt-3 font-heading text-lg font-medium text-electric-600">
            Adventures • Family • Fun • Dreams • Science
          </p>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-500 lg:mx-0">
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

        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-card shadow-card-lg ring-4 ring-white">
            <ResponsivePhoto
              photo={photo}
              alt={photo.alt}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="aspect-[4/5] w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

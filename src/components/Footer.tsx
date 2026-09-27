import LightningBolt from "@/components/decorative/LightningBolt";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-700/5 bg-cream-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-5 py-10 text-center sm:px-8">
        <p className="flex items-center gap-2 font-heading text-xl font-semibold text-ink-700">
          <LightningBolt className="h-6 w-6 text-spark-500" />
          TeslaBlox
        </p>
        <p className="text-ink-500">Adventures • Family • Fun • Dreams • Science</p>
        <p className="mt-2 text-sm text-ink-500">Made with love for Tesla.</p>
      </div>
    </footer>
  );
}

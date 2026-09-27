import Card from "@/components/ui/Card";

export default function FamilyCard({ name }: { name: string }) {
  return (
    <Card className="flex flex-col items-center gap-2 p-6 text-center transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <span aria-hidden="true" className="text-3xl">
        👋
      </span>
      <p className="font-heading text-lg font-semibold text-ink-700">{name}</p>
    </Card>
  );
}

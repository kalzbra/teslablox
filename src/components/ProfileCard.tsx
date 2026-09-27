import { tesla } from "@/data/tesla";

const rows: [string, string][] = [
  ["Name", tesla.name],
  ["Grade", tesla.grade],
  ["Born", `${tesla.birthYear}`],
  ["Loves", "Games, music, sports, videos, family and adventure"],
  ["Favorite characters", tesla.favoriteCharacters.join(" and ")],
  ["Dream", tesla.dream],
];

export default function ProfileCard() {
  return (
    <div className="rounded-card bg-white/90 p-6 shadow-card ring-1 ring-ink-700/5 sm:p-8">
      <h3 className="font-heading text-xl font-semibold text-ink-700">Tesla at a Glance</h3>
      <dl className="mt-4 divide-y divide-ink-700/5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-medium text-ink-500">{label}</dt>
            <dd className="text-ink-700">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

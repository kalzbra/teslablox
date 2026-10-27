import { tesla } from "@/data/tesla";
import { accent } from "@/lib/accents";

const rows: [string, string, string][] = [
  ["🧒", "Name", tesla.name],
  ["🎒", "Grade", tesla.grade],
  ["🎂", "Born", `${tesla.birthYear}`],
  ["❤️", "Loves", "Games, music, sports, videos, family and adventure"],
  ["⭐", "Favorite characters", tesla.favoriteCharacters.join(" and ")],
  ["🚀", "Dream", tesla.dream],
];

/** Styled like a trading card: a bright header strip, then one colored row per fact. */
export default function ProfileCard() {
  return (
    <div className="reveal overflow-hidden rounded-card bg-white shadow-card-lg ring-4 ring-spark-400">
      <div className="bg-gradient-to-r from-electric-500 via-violet-500 to-berry-500 px-6 py-4 sm:px-8">
        <h3 className="font-heading text-2xl font-bold text-white">⚡ Tesla at a Glance</h3>
      </div>
      <dl className="flex flex-col gap-2 p-4 sm:p-6">
        {rows.map(([emoji, label, value], i) => {
          const a = accent(i);
          return (
            <div key={label} className={`flex flex-col gap-1 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${a.soft}`}>
              <dt className={`flex w-48 shrink-0 items-center gap-2 font-heading font-semibold ${a.text}`}>
                <span aria-hidden="true" className="text-xl">
                  {emoji}
                </span>
                {label}
              </dt>
              <dd className="text-lg text-ink-700">{value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

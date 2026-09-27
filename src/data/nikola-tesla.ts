export const nikolaTeslaIntro = {
  heading: "Why Is His Name Tesla?",
  body: [
    "Tesla was named after Nikola Tesla, one of history's best-known inventors and electrical pioneers.",
    "Nikola Tesla helped develop important electrical systems and ideas that changed the way people used electricity. He worked with alternating-current electricity, helped develop electric motors, experimented with wireless communication and control, and became famous for exciting experiments involving electricity.",
    "His work helped inspire generations of scientists, engineers, inventors, and dreamers.",
  ],
};

export const whoWasNikolaTesla =
  "Nikola Tesla was an inventor and scientist who worked with electricity and new technologies. He was born in 1856 and spent his life exploring how electricity could be understood, controlled, and used to help people.";

export type TeslaFact = {
  slug: string;
  title: string;
  emoji: string;
  body: string;
};

export const nikolaTeslaFacts: TeslaFact[] = [
  {
    slug: "alternating-current",
    title: "Alternating-Current Electricity",
    emoji: "⚡",
    body: "He helped develop electrical systems based on alternating current, which became important for delivering electricity over long distances.",
  },
  {
    slug: "electric-motors",
    title: "Electric Motors",
    emoji: "🔄",
    body: "He developed important ideas and inventions involving motors powered by alternating current.",
  },
  {
    slug: "tesla-coil",
    title: "Tesla Coil",
    emoji: "⚡",
    body: "He invented the Tesla coil, a device famous for producing impressive high-voltage electrical effects.",
  },
  {
    slug: "wireless-control",
    title: "Wireless Control",
    emoji: "🚤",
    body: "He demonstrated an early radio-controlled boat, showing that machines could be controlled from a distance.",
  },
];

export const teslaConnection = [
  "Nikola Tesla",
  "Science + Invention + Electricity",
  "Tesla Riley Shyaka",
  "Curiosity + Technology + Dreams",
];

export const nikolaTeslaLearnMore = [
  {
    label: "Nikola Tesla Museum (Belgrade)",
    href: "https://tesla-museum.org/en/home/",
  },
  {
    label: "Tesla Science Center at Wardenclyffe",
    href: "https://www.teslasciencecenter.org/",
  },
];

export type Favorite = {
  slug: string;
  title: string;
  emoji: string;
  blurb: string;
  externalLink?: {
    label: string;
    href: string;
  };
};

export const favorites: Favorite[] = [
  {
    slug: "roblox",
    title: "Roblox",
    emoji: "🎮",
    blurb:
      "Tesla loves playing Roblox and enjoys exploring virtual worlds, playing games, and having fun.",
    externalLink: { label: "Visit Roblox", href: "https://www.roblox.com" },
  },
  {
    slug: "singing",
    title: "Singing",
    emoji: "🎤",
    blurb:
      "Tesla enjoys singing and loves music. Music is one of the ways he expresses himself and has fun.",
  },
  {
    slug: "youtube",
    title: "YouTube",
    emoji: "🎬",
    blurb:
      "Tesla loves making videos and dreams of becoming a YouTube star one day.",
    externalLink: {
      label: "Visit YouTube",
      href: "https://www.youtube.com/@MargaretTuryahebwa",
    },
  },
  {
    slug: "football",
    title: "Football",
    emoji: "⚽",
    blurb:
      "Tesla enjoys football and loves the energy, excitement, and fun that come with playing the game.",
  },
  {
    slug: "swimming",
    title: "Swimming",
    emoji: "🏊",
    blurb: "Tesla enjoys swimming and having fun in the water.",
  },
  {
    slug: "family",
    title: "Family",
    emoji: "👨‍👩‍👧‍👦",
    blurb: "Tesla loves playing with his cousins.",
  },
  {
    slug: "moana",
    title: "Moana",
    emoji: "🌊",
    blurb:
      "Moana is one of Tesla's favorite characters. He enjoys her adventures, courage, and love of exploration.",
    externalLink: {
      label: "Visit Disney's Moana page",
      href: "https://movies.disney.com/moana",
    },
  },
  {
    slug: "elsa",
    title: "Elsa",
    emoji: "❄️",
    blurb:
      "Elsa is one of Tesla's favorite characters. He loves the world of Frozen and its music and characters.",
    externalLink: {
      label: "Visit Disney's Frozen page",
      href: "https://movies.disney.com/frozen",
    },
  },
  {
    slug: "spider-man",
    title: "Spider-Man",
    emoji: "🕷️",
    blurb: "Tesla also enjoys Spider-Man and the exciting world of superheroes.",
    externalLink: {
      label: "Visit Marvel's Spider-Man page",
      href: "https://www.marvel.com/characters/spider-man-peter-parker",
    },
  },
];

export const favoriteSong = {
  title: "Golden",
  artist: "HUNTR/X",
  blurb:
    "Tesla's favorite song right now is “Golden” by HUNTR/X — he loves the energy and the sing-along chorus.",
  externalLink: {
    label: "Listen on Netflix Tudum",
    href: "https://www.netflix.com/tudum/videos/kpop-demon-hunters-golden-music-video",
  },
};

/** Homepage "Things Tesla Loves" highlight order (subset shown as quick-nav cards). */
export const homepageHighlightSlugs = [
  "roblox",
  "singing",
  "youtube",
  "football",
  "swimming",
  "family",
  "moana",
  "elsa",
  "spider-man",
] as const;

/**
 * Curated "keep exploring" links shown after Tesla finishes a week's homework quiz. Every URL
 * here has been checked by hand (real, currently live, free to use, and appropriate for a
 * 9-year-old to browse on his own) — see CLAUDE.md for the verification notes. Don't add a link
 * without checking it the same way; sites move/retire content (DK Find Out, for example, was
 * dropped from an earlier draft of this list after turning out to have been retired).
 *
 * Tag a HomeworkWeek with the categories it actually touches via `topics: LearningCategory[]`
 * (src/data/homework.ts) and the matching resources show up on that week's score screen.
 */

export type LearningCategory =
  | "Space"
  | "Animals"
  | "Math"
  | "Computers"
  | "Physics"
  | "Sports"
  | "Geography";

export type LearningResource = {
  title: string;
  description: string;
  href: string;
};

export const categoryEmoji: Record<LearningCategory, string> = {
  Space: "🚀",
  Animals: "🦁",
  Math: "➗",
  Computers: "💻",
  Physics: "⚛️",
  Sports: "⚽",
  Geography: "🌍",
};

export const learningResources: Record<LearningCategory, LearningResource[]> = {
  Space: [
    {
      title: "NASA Space Place",
      description:
        "Games, hands-on activities, articles, and videos about space and Earth science, made for kids by NASA.",
      href: "https://spaceplace.nasa.gov/",
    },
  ],
  Animals: [
    {
      title: "National Geographic Kids: Animals",
      description:
        "Facts, photos, videos, and games about animals from every corner of the world.",
      href: "https://kids.nationalgeographic.com/animals",
    },
  ],
  Math: [
    {
      title: "Math Antics",
      description:
        "Free video lessons that explain math topics like fractions and geometry step by step.",
      href: "https://mathantics.com/",
    },
  ],
  Computers: [
    {
      title: "Code.org — Elementary",
      description:
        "Hands-on coding activities and courses made for kids in elementary school.",
      href: "https://code.org/student/elementary",
    },
  ],
  Physics: [
    {
      title: "Generation Genius: Science Videos",
      description:
        "Short, fun science videos covering physics and more — five are free to watch anytime, no account needed.",
      href: "https://www.generationgenius.com/science-videos-for-kids/",
    },
  ],
  Sports: [
    {
      title: "National Geographic Kids: Outdoor Sports Quiz",
      description: "Test what you know about sports played all around the world.",
      href: "https://kids.nationalgeographic.com/games/quizzes/article/quiz-whiz-outdoor-sports",
    },
  ],
  Geography: [
    {
      title: "Seterra",
      description:
        "A free map quiz game — learn countries, capitals, and flags by playing.",
      href: "https://www.geoguessr.com/quiz/seterra",
    },
  ],
};

/**
 * "This Week's Homework from Daddy in Japan" — a weekly science/math/tech quiz, maintained by
 * hand (same pattern as the rest of src/data/).
 *
 * `homeworkWeeks` is CHRONOLOGICAL ASCENDING (oldest first) — this matters now because weeks
 * with `questions` unlock in sequence: the first one in the array is always open, and each
 * later one only unlocks once Tesla scores 100% on the one before it (tracked client-side, see
 * src/lib/homework-progress.ts — NOT stored here). Weeks with no `questions` (just a `result`)
 * are pure history that predates the lock mechanic and sit outside the sequence entirely.
 *
 * Workflow for a new week:
 *   1. APPEND a new HomeworkWeek with fresh `questions` and `topics` to the END of the array.
 *      It'll automatically become available once Tesla clears every week before it. `topics`
 *      should be the LearningCategory values (see src/data/learning-resources.ts) that the
 *      week's questions actually touch — that drives the "Keep Exploring" links.
 *   2. After Tesla takes it, you can also add a `result` to that entry — score, date, optional
 *      note — which is what shows up in the public "Daddy's Homework Log". This is entirely
 *      separate bookkeeping from the device-local pass/fail tracking that drives unlocking; it's
 *      the hand-curated public record and only you control what goes in it.
 *
 * NOTE: everything below is PLACEHOLDER content for reviewing the page design. Replace the
 * questions/notes/scores with real ones once the design is approved.
 */

import type { LearningCategory } from "@/data/learning-resources";

/** Soft gate only — this ships inside the public JS bundle, so it keeps casual visitors out,
 * not a determined technical one. Change it any time; just tell whoever needs the new value. */
export const HOMEWORK_PASSWORD = "daddylovestesla18";

/** How long Tesla has to wait before retrying the same week's quiz after a non-100% attempt. */
export const RETRY_COOLDOWN_MINUTES = 15;

export type HomeworkSubject = "Science" | "Math" | "Tech";

type BaseQuestion = {
  id: string;
  subject: HomeworkSubject;
  question: string;
  answer: string;
  explanation: string;
};

export type HomeworkQuestion =
  | (BaseQuestion & { type: "multiple-choice"; options: string[] })
  | (BaseQuestion & { type: "type-answer" });

export type HomeworkResult = {
  score: number;
  outOf: number;
  dateTaken: string;
  note?: string;
};

export type HomeworkWeek = {
  id: string;
  weekOf: string;
  theme: string;
  dadNote: string;
  questions?: HomeworkQuestion[];
  topics?: LearningCategory[];
  result?: HomeworkResult;
};

export const homeworkWeeks: HomeworkWeek[] = [
  {
    id: "2026-10-12",
    weekOf: "Week of October 12, 2026",
    theme: "Computers 101 Week 💻",
    dadNote: "Our very first homework week — learning how computers work!",
    result: {
      score: 7,
      outOf: 9,
      dateTaken: "October 12, 2026",
    },
  },
  {
    id: "2026-10-19",
    weekOf: "Week of October 19, 2026",
    theme: "Animal Kingdom Week 🦁",
    dadNote: "This week was all about amazing animals!",
    result: {
      score: 9,
      outOf: 10,
      dateTaken: "October 19, 2026",
      note: "Got every animal question right — only missed one about bees!",
    },
  },
  {
    id: "2026-10-26",
    weekOf: "Week of October 26, 2026",
    theme: "Welcome to Homework Week! 🚀",
    dadNote:
      "Hi buddy! Starting this week, I'm going to leave you some fun science, math, and tech questions every week — kind of like homework, but way more fun. Get a perfect score to unlock next week's homework! Take your time, use your brain, and stay curious. Love, Daddy.",
    topics: ["Space", "Animals", "Math", "Computers"],
    questions: [
      {
        id: "sci-1",
        subject: "Science",
        type: "multiple-choice",
        question:
          "Along with water and sunlight, what gas do plants take in to make their own food?",
        options: ["Carbon dioxide", "Oxygen", "Helium"],
        answer: "Carbon dioxide",
        explanation:
          "Plants use carbon dioxide from the air, plus sunlight and water, to make their own food. It's called photosynthesis!",
      },
      {
        id: "sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter"],
        answer: "Mars",
        explanation:
          "Mars looks reddish because its soil has a lot of iron oxide in it — the same stuff that makes rust red!",
      },
      {
        id: "sci-3",
        subject: "Science",
        type: "type-answer",
        question: "How many planets are in our solar system?",
        answer: "8",
        explanation:
          "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
      },
      {
        id: "sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "What is the tiny center of an atom called?",
        options: ["Nucleus", "Electron", "Orbit"],
        answer: "Nucleus",
        explanation: "The nucleus sits in the middle of an atom and holds protons and neutrons.",
      },
      {
        id: "sci-5",
        subject: "Science",
        type: "multiple-choice",
        question: "Which gas do people breathe in to survive?",
        options: ["Oxygen", "Nitrogen", "Helium"],
        answer: "Oxygen",
        explanation: "We breathe in oxygen and breathe out carbon dioxide!",
      },
      {
        id: "sci-6",
        subject: "Science",
        type: "type-answer",
        question: "What invisible force pulls objects down toward the Earth?",
        answer: "gravity",
        explanation: "Gravity is the invisible force that pulls everything toward the ground.",
      },
      {
        id: "sci-7",
        subject: "Science",
        type: "multiple-choice",
        question: "What do we call animals that only eat plants?",
        options: ["Herbivores", "Carnivores", "Omnivores"],
        answer: "Herbivores",
        explanation: "Herbivores — like elephants and giraffes — eat only plants!",
      },
      {
        id: "math-1",
        subject: "Math",
        type: "type-answer",
        question: "What is 7 × 8?",
        answer: "56",
        explanation: "7 × 8 = 56. Handy trick: that's the same as 7×4 doubled — 28 + 28 = 56!",
      },
      {
        id: "math-2",
        subject: "Math",
        type: "type-answer",
        question: "What is 144 ÷ 12?",
        answer: "12",
        explanation: "144 ÷ 12 = 12 — 12 goes into 144 exactly 12 times.",
      },
      {
        id: "math-3",
        subject: "Math",
        type: "multiple-choice",
        question: "Which shape always has exactly 3 sides?",
        options: ["Triangle", "Pentagon", "Hexagon"],
        answer: "Triangle",
        explanation: "A triangle always has 3 sides and 3 angles — no more, no less.",
      },
      {
        id: "math-4",
        subject: "Math",
        type: "type-answer",
        question: "What is 100 − 37?",
        answer: "63",
        explanation: "100 − 37 = 63. Try counting up from 37 all the way to 100!",
      },
      {
        id: "math-5",
        subject: "Math",
        type: "multiple-choice",
        question: "What do we call a number that can only be divided evenly by 1 and itself?",
        options: ["Prime number", "Even number", "Square number"],
        answer: "Prime number",
        explanation:
          "7, 11, and 13 are all prime numbers — only 1 and the number itself divide into them evenly.",
      },
      {
        id: "math-6",
        subject: "Math",
        type: "type-answer",
        question:
          "A pizza is cut into 8 equal slices. You eat 3. What fraction of the pizza is left? (e.g. 5/8)",
        answer: "5/8",
        explanation: "8 slices total, 3 eaten, so 5 are left — that's 5/8 of the pizza!",
      },
      {
        id: "math-7",
        subject: "Math",
        type: "multiple-choice",
        question: "What comes next in this pattern? 2, 4, 6, 8, __",
        options: ["10", "9", "12"],
        answer: "10",
        explanation: "This pattern adds 2 each time, so after 8 comes 10.",
      },
      {
        id: "tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "What do the letters \"www\" stand for?",
        options: ["World Wide Web", "World Wild Web", "Wide World Web"],
        answer: "World Wide Web",
        explanation: "WWW stands for World Wide Web — the system that lets you browse websites!",
      },
      {
        id: "tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question: "Which part of a computer is sometimes called its \"brain\"?",
        options: ["CPU", "Mouse", "Monitor"],
        answer: "CPU",
        explanation:
          "The CPU (Central Processing Unit) does most of the thinking and calculating inside a computer.",
      },
      {
        id: "tech-3",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "What do you call a set of step-by-step instructions that tells a computer what to do?",
        options: ["Algorithm", "Keyboard", "Password"],
        answer: "Algorithm",
        explanation: "An algorithm is a step-by-step recipe that tells a computer exactly what to do.",
      },
      {
        id: "tech-4",
        subject: "Tech",
        type: "multiple-choice",
        question: "Which of these sends information INTO a computer?",
        options: ["Keyboard", "Speaker", "Printer"],
        answer: "Keyboard",
        explanation: "A keyboard is an input device — it sends information INTO the computer.",
      },
      {
        id: "tech-5",
        subject: "Tech",
        type: "multiple-choice",
        question: "Computers store information using only two digits. What are they?",
        options: ["0 and 1", "1 and 2", "A and B"],
        answer: "0 and 1",
        explanation: "Computers use just two digits — 0 and 1 — to store everything. That's called binary!",
      },
      {
        id: "tech-6",
        subject: "Tech",
        type: "type-answer",
        question: "How many bits make one byte?",
        answer: "8",
        explanation: "8 bits make 1 byte — a tiny unit computers use to store information.",
      },
    ],
  },
  {
    id: "2026-11-02",
    weekOf: "Week of November 2, 2026",
    theme: "Ocean Explorers Week 🌊",
    dadNote:
      "You did it — 100% on your first week! Amazing job, buddy. This week we're diving into the ocean. Let's see what you know about the sea!",
    topics: ["Animals", "Geography"],
    questions: [
      {
        id: "ocean-1",
        subject: "Science",
        type: "multiple-choice",
        question: "What is the largest animal in the ocean (and on Earth)?",
        options: ["Blue whale", "Great white shark", "Giant squid"],
        answer: "Blue whale",
        explanation:
          "Blue whales can grow up to 30 meters long — longer than a basketball court!",
      },
      {
        id: "ocean-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which of these is NOT a fish?",
        options: ["Dolphin", "Tuna", "Shark"],
        answer: "Dolphin",
        explanation:
          "Dolphins are mammals, not fish! They breathe air through a blowhole and feed their babies milk.",
      },
      {
        id: "ocean-3",
        subject: "Science",
        type: "type-answer",
        question: "How many oceans are there on Earth?",
        answer: "5",
        explanation: "There are 5 oceans: the Pacific, Atlantic, Indian, Southern, and Arctic.",
      },
      {
        id: "ocean-4",
        subject: "Science",
        type: "multiple-choice",
        question: "What do we call a baby seal?",
        options: ["Pup", "Calf", "Kit"],
        answer: "Pup",
        explanation: "Baby seals are called pups — just like baby dogs!",
      },
      {
        id: "ocean-5",
        subject: "Science",
        type: "multiple-choice",
        question: "Which ocean is the biggest?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
        explanation:
          "The Pacific Ocean is so big it covers about a third of the Earth's surface!",
      },
      {
        id: "ocean-6",
        subject: "Math",
        type: "type-answer",
        question: "A fish tank holds 60 liters of water. If it's half full, how many liters are in it?",
        answer: "30",
        explanation: "Half of 60 is 30 — just divide by 2!",
      },
      {
        id: "ocean-7",
        subject: "Math",
        type: "multiple-choice",
        question: "An octopus has 8 arms. How many arms do 3 octopuses have?",
        options: ["24", "16", "20"],
        answer: "24",
        explanation: "8 × 3 = 24 arms in total!",
      },
      {
        id: "ocean-8",
        subject: "Math",
        type: "type-answer",
        question: "A coral reef is 100 meters long. A diver swims 45 meters. How many meters are left?",
        answer: "55",
        explanation: "100 − 45 = 55 meters left to go.",
      },
      {
        id: "ocean-9",
        subject: "Science",
        type: "multiple-choice",
        question: "Which ocean is closest to the North Pole?",
        options: ["Arctic Ocean", "Indian Ocean", "Pacific Ocean"],
        answer: "Arctic Ocean",
        explanation:
          "The Arctic Ocean is the smallest and coldest ocean, right at the top of the world.",
      },
      {
        id: "ocean-10",
        subject: "Science",
        type: "multiple-choice",
        question: "What do you call a group of fish swimming together?",
        options: ["A school", "A herd", "A flock"],
        answer: "A school",
        explanation: "A big group of fish swimming together is called a school of fish!",
      },
      {
        id: "ocean-11",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Which underwater vehicle helps scientists explore the deep ocean, where it's too dangerous for divers?",
        options: ["Submarine", "Bicycle", "Airplane"],
        answer: "Submarine",
        explanation:
          "Submarines (and special robot submersibles) let scientists explore deep parts of the ocean that are too dangerous for divers.",
      },
      {
        id: "ocean-12",
        subject: "Tech",
        type: "multiple-choice",
        question: "Which invention lets divers breathe underwater using a tank of air on their back?",
        options: ["Scuba gear", "A snorkel only", "A life jacket"],
        answer: "Scuba gear",
        explanation:
          "Scuba gear includes a tank of air so divers can breathe and explore underwater for a long time.",
      },
    ],
  },
  {
    id: "2026-11-09",
    weekOf: "Week of November 9, 2026",
    theme: "Robots & Machines Week 🤖",
    dadNote:
      "Two weeks in a row — I'm so proud of you! This week is all about robots, machines, and how things move. Let's get mechanical!",
    topics: ["Computers", "Physics", "Math"],
    questions: [
      {
        id: "robot-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "What do we call a machine that can be programmed to do tasks automatically?",
        options: ["A robot", "A calculator", "A remote control"],
        answer: "A robot",
        explanation:
          "A robot is a machine that can be programmed to sense, think, and act — often doing jobs automatically!",
      },
      {
        id: "robot-2",
        subject: "Tech",
        type: "multiple-choice",
        question: "Which of these is a real robot that explores Mars for NASA?",
        options: ["Perseverance", "Rover-bot", "Marsy"],
        answer: "Perseverance",
        explanation:
          "Perseverance is a real NASA rover robot that has been exploring Mars since 2021!",
      },
      {
        id: "robot-3",
        subject: "Science",
        type: "multiple-choice",
        question: "What force do wheels help reduce so objects can move more easily?",
        options: ["Friction", "Gravity", "Magnetism"],
        answer: "Friction",
        explanation:
          "Wheels reduce friction — the rubbing force that slows things down — so objects roll instead of drag.",
      },
      {
        id: "robot-4",
        subject: "Science",
        type: "type-answer",
        question:
          "What do we call a simple machine that helps lift heavy things, like a long bar balanced on a point?",
        answer: "lever",
        explanation:
          "A lever is a simple machine — a bar that pivots on a point to help lift heavy things with less effort.",
      },
      {
        id: "robot-5",
        subject: "Science",
        type: "multiple-choice",
        question: "Which simple machine is a ramp that makes it easier to move things up or down?",
        options: ["Inclined plane", "Pulley", "Screw"],
        answer: "Inclined plane",
        explanation:
          "An inclined plane (a ramp) makes it easier to move heavy things up or down instead of lifting them straight up.",
      },
      {
        id: "robot-6",
        subject: "Math",
        type: "type-answer",
        question: "A robot arm can pick up 1 box every 4 seconds. How many boxes can it pick up in 60 seconds?",
        answer: "15",
        explanation: "60 ÷ 4 = 15 boxes in one minute!",
      },
      {
        id: "robot-7",
        subject: "Math",
        type: "multiple-choice",
        question: "A toy robot has 4 wheels. How many wheels do 6 toy robots have?",
        options: ["24", "20", "18"],
        answer: "24",
        explanation: "4 × 6 = 24 wheels altogether.",
      },
      {
        id: "robot-8",
        subject: "Math",
        type: "type-answer",
        question: "A robot takes 7 steps forward and 2 steps back. How many steps forward did it net gain?",
        answer: "5",
        explanation: "7 − 2 = 5 steps forward overall.",
      },
      {
        id: "robot-9",
        subject: "Tech",
        type: "multiple-choice",
        question: "What do we call the \"brain\" instructions that tell a robot what to do?",
        options: ["Code", "A battery", "A remote"],
        answer: "Code",
        explanation:
          "Code (a program) is the set of instructions that tells a robot exactly what to do, step by step.",
      },
      {
        id: "robot-10",
        subject: "Science",
        type: "multiple-choice",
        question: "Which force pulls a dropped robot (or anything else) toward the ground?",
        options: ["Gravity", "Magnetism", "Friction"],
        answer: "Gravity",
        explanation: "Gravity is the force that pulls everything down toward the Earth.",
      },
      {
        id: "robot-11",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "What do we call sensors that help a robot \"see\" using light, similar to how cameras work?",
        options: ["Optical sensors", "Ears", "Wheels"],
        answer: "Optical sensors",
        explanation:
          "Optical (light) sensors act like a robot's eyes, helping it detect light, color, and objects around it.",
      },
      {
        id: "robot-12",
        subject: "Science",
        type: "multiple-choice",
        question: "What simple machine is a see-saw an example of?",
        options: ["Lever", "Pulley", "Wedge"],
        answer: "Lever",
        explanation:
          "A see-saw is a type of lever — it pivots in the middle to lift one side up when the other goes down.",
      },
    ],
  },
  {
    id: "2026-11-16",
    weekOf: "Week of November 16, 2026",
    theme: "Mighty Earth Week 🌍",
    dadNote:
      "Three weeks of hard work — I'm so proud of you! This week we're learning about planet Earth itself: mountains, weather, and the amazing creatures that live here.",
    topics: ["Geography", "Physics", "Animals"],
    questions: [
      {
        id: "earth-1",
        subject: "Science",
        type: "multiple-choice",
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji"],
        answer: "Mount Everest",
        explanation:
          "Mount Everest, in the Himalayas, is the tallest mountain above sea level at about 8,849 meters!",
      },
      {
        id: "earth-2",
        subject: "Science",
        type: "multiple-choice",
        question: "What do we call a huge wave caused by an earthquake under the ocean?",
        options: ["Tsunami", "Hurricane", "Tornado"],
        answer: "Tsunami",
        explanation:
          "A tsunami is a series of huge ocean waves usually caused by an earthquake or volcano under the sea.",
      },
      {
        id: "earth-3",
        subject: "Science",
        type: "type-answer",
        question: "What is the name of the layer of gases that surrounds Earth and lets us breathe?",
        answer: "atmosphere",
        explanation:
          "The atmosphere is the blanket of gases around Earth that we breathe and that protects us from the Sun.",
      },
      {
        id: "earth-4",
        subject: "Science",
        type: "multiple-choice",
        question: "Which of these is the hottest layer, at the very center of the Earth?",
        options: ["The core", "The crust", "The mantle"],
        answer: "The core",
        explanation: "The core is the Earth's super-hot center, made mostly of iron and nickel.",
      },
      {
        id: "earth-5",
        subject: "Science",
        type: "multiple-choice",
        question: "What causes rain to fall from clouds?",
        options: [
          "Water droplets getting too heavy",
          "Wind blowing hard",
          "The sun getting hot",
        ],
        answer: "Water droplets getting too heavy",
        explanation:
          "Tiny water droplets in clouds stick together until they're too heavy to float, then they fall as rain!",
      },
      {
        id: "earth-6",
        subject: "Math",
        type: "type-answer",
        question: "Mount Everest is about 8,849 meters tall. Round that to the nearest thousand.",
        answer: "9000",
        explanation: "8,849 rounds up to 9,000 since 849 is closer to 1,000 than to 0.",
      },
      {
        id: "earth-7",
        subject: "Math",
        type: "multiple-choice",
        question:
          "If a desert gets 5 cm of rain in January and 3 cm in February, how much rain fell in total?",
        options: ["8 cm", "7 cm", "2 cm"],
        answer: "8 cm",
        explanation: "5 + 3 = 8 cm of rain altogether.",
      },
      {
        id: "earth-8",
        subject: "Math",
        type: "type-answer",
        question: "Earth takes 24 hours to spin around once. How many hours is that in 2 days?",
        answer: "48",
        explanation: "24 × 2 = 48 hours in two days.",
      },
      {
        id: "earth-9",
        subject: "Science",
        type: "multiple-choice",
        question: "What do we call animals that are active mostly at night?",
        options: ["Nocturnal", "Diurnal", "Hibernal"],
        answer: "Nocturnal",
        explanation:
          "Nocturnal animals, like owls and bats, are most active at night and rest during the day.",
      },
      {
        id: "earth-10",
        subject: "Science",
        type: "multiple-choice",
        question: "Which continent is the largest by land area?",
        options: ["Asia", "Africa", "Europe"],
        answer: "Asia",
        explanation: "Asia is the biggest continent, home to more than half of the world's people!",
      },
      {
        id: "earth-11",
        subject: "Science",
        type: "multiple-choice",
        question: "What do we call it when a volcano releases hot melted rock?",
        options: ["Lava", "Lightning", "Avalanche"],
        answer: "Lava",
        explanation: "Lava is the hot, melted rock that flows out of an erupting volcano.",
      },
      {
        id: "earth-12",
        subject: "Tech",
        type: "multiple-choice",
        question: "What tool do scientists use to predict the weather, like rain or sunshine?",
        options: ["Weather satellites", "Telescopes", "Microscopes"],
        answer: "Weather satellites",
        explanation:
          "Weather satellites orbit Earth and take pictures of clouds and storms, helping scientists predict the weather.",
      },
    ],
  },
];

/**
 * "This Week's Homework from Daddy in Japan" — a weekly science/math/tech quiz, maintained by
 * hand (same pattern as the rest of src/data/). Newest week goes FIRST in `homeworkWeeks`.
 *
 * Workflow for a new week:
 *   1. Prepend a new HomeworkWeek with fresh `questions` and `topics` (no `result` yet) to the
 *      top of the array. `topics` should be the LearningCategory values (see
 *      src/data/learning-resources.ts) that the week's questions actually touch — that's what
 *      drives the "Keep Exploring" links shown on the score screen.
 *   2. After Tesla takes it, add a `result` to that same entry — score, date, optional note.
 * That's it. `homeworkWeeks[0]` is always "this week" on the page; every entry with a `result`
 * shows up in the "Daddy's Homework Log" history section, newest first.
 *
 * NOTE: everything below is PLACEHOLDER content for reviewing the page design. Replace the
 * questions/notes/scores with real ones once the design is approved.
 */

import type { LearningCategory } from "@/data/learning-resources";

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
    id: "2026-10-26",
    weekOf: "Week of October 26, 2026",
    theme: "Welcome to Homework Week! 🚀",
    dadNote:
      "Hi buddy! Starting this week, I'm going to leave you some fun science, math, and tech questions every week — kind of like homework, but way more fun. Take your time, use your brain, and don't worry about getting every single one right. I just want you to stay curious! Tell me how you did next time we talk. Love, Daddy.",
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
        explanation:
          "7 × 8 = 56. Handy trick: that's the same as 7×4 doubled — 28 + 28 = 56!",
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
        question:
          "What do we call a number that can only be divided evenly by 1 and itself?",
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
];

/**
 * "This Week's Homework from Daddy in Japan" — the weekly quiz content, INCLUDING ANSWERS.
 * This file only ever runs inside the Cloudflare Worker; answers/explanations are never sent to
 * the browser until Tesla has answered that question (see src/index.ts).
 *
 * `homeworkWeeks` is chronological (oldest first). A week becomes available when BOTH:
 *   - Tesla has scored 100% on the week before it, and
 *   - today (Tokyo date) is on or after its `opensOn` date.
 * The first week only needs its `opensOn` date.
 *
 * Workflow for a new week: APPEND a new entry to the END of the array with a fresh, unique `id`,
 * an `opensOn` date, `questions`, `topics` (LearningCategory names from the website's
 * src/data/learning-resources.ts), and optionally week-specific `resources`. Then redeploy:
 * `cd api && npm run deploy`. Scores are recorded automatically — no manual logging.
 *
 * Writing questions: Tesla is 9 and sharp. Explanations should give a "why" or a memory trick,
 * not just restate the answer. For type-answer questions, list reasonable alternative spellings
 * in `accept` (romaji especially: arigatou / arigato). Multiple-choice answers must match one of
 * the options exactly.
 *
 * Optional `logNote` is a comment from Daddy shown next to that week in the public Homework Log.
 */

export type HomeworkSubject = "Science" | "Math" | "Tech" | "Japanese" | "English" | "Geography";

type BaseQuestion = {
  id: string;
  subject: HomeworkSubject;
  question: string;
  answer: string;
  explanation: string;
};

export type HomeworkQuestion =
  | (BaseQuestion & { type: "multiple-choice"; options: string[] })
  | (BaseQuestion & { type: "type-answer"; accept?: string[] });

export type WeekResource = {
  title: string;
  description: string;
  href: string;
  kind: "video" | "site" | "game";
  minutes?: number;
};

export type HomeworkWeek = {
  id: string;
  weekOf: string;
  /** YYYY-MM-DD, compared against today's date in Tokyo. */
  opensOn: string;
  theme: string;
  dadNote: string;
  questions: HomeworkQuestion[];
  /** LearningCategory names — the website maps these to its general "Keep Exploring" links. */
  topics: string[];
  resources?: WeekResource[];
  logNote?: string;
};

export const homeworkWeeks: HomeworkWeek[] = [
  // ───────────────────────────── Week 1 ─────────────────────────────
  {
    id: "2026-10-26",
    weekOf: "Week of October 26, 2026",
    opensOn: "2026-10-26",
    theme: "Konnichiwa, Japan! Week 🗾",
    dadNote:
      "Hi buddy! Your very first homework from Daddy is here — and this week it's all about where I live: Japan! You'll learn some Japanese words, find out about volcanoes and super-fast trains, and do some math and English too. Get every answer right to unlock next week. Take your time and think it through — you've got this! Love, Daddy.",
    topics: ["Japanese", "Geography", "Math", "English"],
    resources: [
      { kind: "site", title: "Japan (National Geographic Kids)", description: "Learn about Japan's four main islands, Mount Fuji, Tokyo, and why Japan has so many earthquakes and volcanoes.", href: "https://kids.nationalgeographic.com/geography/countries/article/japan", },
      { kind: "video", title: "Hello! – Japanese greetings song", description: "Sing along and practise saying hello in Japanese.", href: "https://www.youtube.com/watch?v=Q9ocYaQs3g4", minutes: 2, },
      { kind: "video", title: "Count and Move – Japanese counting song", description: "Count out loud in Japanese (ichi, ni, san…) all the way to 20 while you clap and march.", href: "https://www.youtube.com/watch?v=z9-aptuAX3w", minutes: 1, },
      { kind: "video", title: "All About Volcanoes (SciShow Kids)", description: "Find out how volcanoes form and why they erupt.", href: "https://www.youtube.com/watch?v=K7Oq9_DU1Mc", minutes: 3, },
      { kind: "video", title: "The Tokaido Shinkansen", description: "Take a ride on Japan's famous bullet train, in a video from the company that runs it.", href: "https://www.youtube.com/watch?v=ZEAuJXhexco", minutes: 2, },
      { kind: "game", title: "Times Tables Games and Songs (BBC Bitesize)", description: "Play games and sing songs to practise every times table from 1 to 12.", href: "https://www.bbc.co.uk/bitesize/articles/z97rdnb", },
      { kind: "site", title: "What Are Verbs? (BBC Bitesize)", description: "Learn how verbs are the doing words in a sentence, then test yourself with the quiz.", href: "https://www.bbc.co.uk/bitesize/articles/zpxhdxs", },
    ],
    questions: [
      {
        id: "w1-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, how do you say “hello”?",
        options: ["Konnichiwa", "Sayounara", "Arigatou"],
        answer: "Konnichiwa",
        explanation:
          "Konnichiwa (kon-nee-chee-wah) is how people say hello during the day. Sayounara means goodbye and arigatou means thank you. Try saying konnichiwa to Daddy on your next call!",
      },
      {
        id: "w1-jp-2",
        subject: "Japanese",
        type: "type-answer",
        question: "How do you say “thank you” in Japanese? (Hint: it starts with “a”)",
        answer: "arigatou",
        accept: ["arigato", "arigatō", "arigatou gozaimasu", "arigato gozaimasu"],
        explanation:
          "Arigatou (ah-ree-gah-toh) means thank you. To be extra polite — like to a teacher — Japanese people say “arigatou gozaimasu”.",
      },
      {
        id: "w1-jp-3",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese counting, what number is “san”?",
        options: ["3", "5", "8"],
        answer: "3",
        explanation:
          "Ichi, ni, san — one, two, three! Then yon (4) and go (5). Try counting your fingers in Japanese.",
      },
      {
        id: "w1-jp-4",
        subject: "Japanese",
        type: "multiple-choice",
        question: "“Juu” means 10 and “go” means 5. What number is “juu-go”?",
        options: ["15", "50", "105"],
        answer: "15",
        explanation:
          "Japanese numbers snap together like LEGO: juu (10) + go (5) = 15. Flip them around and “go-juu” means five tens — 50!",
      },
      {
        id: "w1-jp-5",
        subject: "Japanese",
        type: "multiple-choice",
        question: "Which Japanese word means “good morning”?",
        options: ["Ohayou", "Oyasumi", "Sayounara"],
        answer: "Ohayou",
        explanation:
          "Ohayou (oh-hah-yoh) means good morning. Oyasumi means good night, and sayounara means goodbye.",
      },
      {
        id: "w1-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "Japan is a country made of islands. How many big MAIN islands does it have?",
        options: ["4", "2", "10"],
        answer: "4",
        explanation:
          "Japan has 4 main islands — Honshu (the biggest, where Tokyo is), Hokkaido, Kyushu, and Shikoku — plus thousands of tiny ones!",
      },
      {
        id: "w1-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "What is the capital city of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka"],
        answer: "Tokyo",
        explanation:
          "Tokyo is Japan's capital — and where Daddy works! Fun fact: Kyoto was the capital for more than 1,000 years before Tokyo took over.",
      },
      {
        id: "w1-geo-3",
        subject: "Geography",
        type: "multiple-choice",
        question: "Which ocean is Japan in?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"],
        answer: "Pacific Ocean",
        explanation:
          "Japan sits in the Pacific, the biggest ocean on Earth. Uganda doesn't touch any ocean at all — a country like that is called “landlocked”.",
      },
      {
        id: "w1-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "Mount Fuji, Japan's tallest mountain, is actually a…",
        options: ["Volcano", "Glacier", "Pyramid"],
        answer: "Volcano",
        explanation:
          "Mount Fuji is a volcano, 3,776 meters tall! Its last eruption was in 1707 — more than 300 years ago — so right now it's “sleeping”.",
      },
      {
        id: "w1-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Japan has lots of earthquakes. What causes most earthquakes?",
        options: [
          "Giant pieces of the Earth's crust moving and grinding",
          "Very strong winds",
          "The Moon pulling on mountains",
        ],
        answer: "Giant pieces of the Earth's crust moving and grinding",
        explanation:
          "The Earth's outer shell is cracked into giant pieces called plates. When they slip and grind past each other, the ground shakes. Japan sits right where four plates meet — that's why it shakes so often!",
      },
      {
        id: "w1-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "What is the name of Japan's super-fast “bullet train”?",
        options: ["Shinkansen", "Maglev Express", "Thunder Rail"],
        answer: "Shinkansen",
        explanation:
          "The Shinkansen zooms along at up to 320 km per hour — faster than a racing car! It first started running in 1964.",
      },
      {
        id: "w1-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question: "Japan makes lots of robots. What does a robot need so it knows what to do?",
        options: ["A program of step-by-step instructions", "A map", "Just batteries"],
        answer: "A program of step-by-step instructions",
        explanation:
          "A robot follows a program — instructions written by people, step by step. Batteries give it power, but without a program it wouldn't know what to do with that power!",
      },
      {
        id: "w1-math-1",
        subject: "Math",
        type: "type-answer",
        question: "What is 9 × 7?",
        answer: "63",
        explanation:
          "9 × 7 = 63. A 9-times-table trick: the first digit is one less than the number you're multiplying (7 − 1 = 6), and the two digits always add up to 9 (6 + 3 = 9)!",
      },
      {
        id: "w1-math-2",
        subject: "Math",
        type: "type-answer",
        question:
          "A Shinkansen has 16 cars. If each car had 100 seats, how many seats would the whole train have?",
        answer: "1600",
        accept: ["1,600", "1600 seats", "1,600 seats"],
        explanation:
          "16 × 100 = 1,600. Multiplying by 100 is a shortcut — just add two zeros to the end: 16 → 1,600!",
      },
      {
        id: "w1-math-3",
        subject: "Math",
        type: "multiple-choice",
        question:
          "The Shinkansen from Tokyo to Osaka takes about 2 and a half hours. If it leaves at 9:00 in the morning, when does it arrive?",
        options: ["11:30 am", "11:00 am", "12:30 pm"],
        answer: "11:30 am",
        explanation:
          "Add 2 hours first: 9:00 → 11:00. Then add the half hour (30 minutes): 11:00 → 11:30 am.",
      },
      {
        id: "w1-math-4",
        subject: "Math",
        type: "multiple-choice",
        question: "Which number is bigger: 3,776 or 3,767?",
        options: ["3,776", "3,767", "They're the same"],
        answer: "3,776",
        explanation:
          "Compare digit by digit from the left: 3 and 3 match, 7 and 7 match, then 7 beats 6 — so 3,776 wins. (That's Mount Fuji's height in meters!)",
      },
      {
        id: "w1-math-5",
        subject: "Math",
        type: "type-answer",
        question: "Share 24 pieces of sushi equally between 4 people. How many does each person get?",
        answer: "6",
        explanation:
          "24 ÷ 4 = 6. Think backwards: what times 4 makes 24? 6 × 4 = 24!",
      },
      {
        id: "w1-eng-1",
        subject: "English",
        type: "multiple-choice",
        question: "Which word is a VERB (an action word)? “The fast train zooms past the station.”",
        options: ["zooms", "fast", "station"],
        answer: "zooms",
        explanation:
          "A verb is something you DO — you can zoom! “Fast” describes the train (an adjective) and “station” is a place (a noun).",
      },
      {
        id: "w1-eng-2",
        subject: "English",
        type: "multiple-choice",
        question: "Which word is a NOUN (a person, place, or thing)?",
        options: ["mountain", "jump", "happy"],
        answer: "mountain",
        explanation:
          "A mountain is a thing (and a place!), so it's a noun. “Jump” is something you do (a verb) and “happy” describes a feeling (an adjective).",
      },
      {
        id: "w1-eng-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which sentence is written correctly?",
        options: ["Tokyo is a big city.", "tokyo is a big city.", "Tokyo is a big city"],
        answer: "Tokyo is a big city.",
        explanation:
          "Names of places always start with a capital letter (Tokyo), and every sentence needs a punctuation mark at the end, like a full stop.",
      },
    ],
  },

  // ───────────────────────────── Week 2 ─────────────────────────────
  {
    id: "2026-11-02",
    weekOf: "Week of November 2, 2026",
    opensOn: "2026-11-02",
    theme: "Ocean Explorers Week 🌊",
    dadNote:
      "You did it — 100% on your first week! I'm so proud of you, Tesla. This week we're diving into the ocean. You'll meet amazing sea animals, learn Japanese words for colors and animals, and solve some fishy math. Ready? Let's dive in! Love, Daddy.",
    topics: ["Animals", "Geography", "Japanese", "English", "Math"],
    resources: [
      { kind: "video", title: "The Outrageous Octopus! (SciShow Kids)", description: "Meet the octopus: eight arms, three hearts, and a very clever brain.", href: "https://www.youtube.com/watch?v=XyDNTfmFmJw", minutes: 5, },
      { kind: "video", title: "Blue Whales: The Biggest Animal EVER!", description: "Learn what blue whales eat, where they live, and just how big they really are.", href: "https://www.youtube.com/watch?v=GSmBYqmz4Y4", minutes: 6, },
      { kind: "video", title: "How Do Submarines Work? (SciShow Kids)", description: "Find out how submarines sink, float, and explore deep under the ocean.", href: "https://www.youtube.com/watch?v=c3W937dORLI", minutes: 4, },
      { kind: "video", title: "Red Yellow Green Blue – Japanese colours song", description: "Sing along to learn the Japanese words for colours, like aka (red) and ao (blue).", href: "https://www.youtube.com/watch?v=BnoA2dr2eqg", minutes: 2, },
      { kind: "site", title: "The Five Oceans of the World (BBC Bitesize)", description: "Learn the names of the five oceans, then try the oceans quiz.", href: "https://www.bbc.co.uk/bitesize/articles/zkr8jsg", },
      { kind: "site", title: "Adding -s and -es (BBC Bitesize)", description: "Learn when to add -s or -es to turn one thing into many, like bird → birds and box → boxes.", href: "https://www.bbc.co.uk/bitesize/articles/z3dw4xs", },
      { kind: "site", title: "What Are Fractions? (BBC Bitesize)", description: "Learn how fractions show equal parts of a whole, with examples and a quiz.", href: "https://www.bbc.co.uk/bitesize/articles/zd8mt39", },
    ],
    questions: [
      {
        id: "w2-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "What is the largest animal on Earth?",
        options: ["Blue whale", "African elephant", "Great white shark"],
        answer: "Blue whale",
        explanation:
          "Blue whales can be about 30 meters long — like three school buses in a row! They're bigger than any dinosaur we know of.",
      },
      {
        id: "w2-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which of these sea animals is a MAMMAL (breathes air and feeds its babies milk)?",
        options: ["Dolphin", "Shark", "Tuna"],
        answer: "Dolphin",
        explanation:
          "Dolphins are mammals like us! They come up to breathe air through a blowhole on top of their head. Sharks and tuna are fish — they breathe underwater using gills.",
      },
      {
        id: "w2-sci-3",
        subject: "Science",
        type: "type-answer",
        question: "How many arms does an octopus have?",
        answer: "8",
        accept: ["eight"],
        explanation: "8! “Octo” means eight — just like an octagon has 8 sides.",
      },
      {
        id: "w2-sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "Why is the ocean salty?",
        options: [
          "Rivers carry tiny bits of salt from rocks into the sea",
          "Fish add salt to the water",
          "Rain is salty",
        ],
        answer: "Rivers carry tiny bits of salt from rocks into the sea",
        explanation:
          "Rain and rivers wash tiny bits of salt out of rocks and carry them to the sea. When seawater evaporates into clouds, the salt gets left behind — so over millions of years, the sea got saltier and saltier!",
      },
      {
        id: "w2-geo-1",
        subject: "Geography",
        type: "type-answer",
        question: "How many oceans are there on Earth?",
        answer: "5",
        accept: ["five"],
        explanation:
          "There are 5 oceans: Pacific, Atlantic, Indian, Southern, and Arctic. They're all connected, so really it's one giant world ocean!",
      },
      {
        id: "w2-geo-2",
        subject: "Geography",
        type: "type-answer",
        question: "How many continents are there?",
        answer: "7",
        accept: ["seven"],
        explanation:
          "7 continents: Africa, Asia, Europe, North America, South America, Australia (Oceania), and Antarctica. Uganda is in Africa, and Japan is in Asia!",
      },
      {
        id: "w2-geo-3",
        subject: "Geography",
        type: "multiple-choice",
        question: "Which is the biggest ocean?",
        options: ["Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean",
        explanation:
          "The Pacific is the biggest — it's larger than all the land on Earth put together! The Arctic is the smallest and coldest.",
      },
      {
        id: "w2-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, what animal is an “inu”?",
        options: ["Dog", "Cat", "Fish"],
        answer: "Dog",
        explanation: "Inu = dog 🐶, neko = cat 🐱, sakana = fish 🐟. Can you remember all three?",
      },
      {
        id: "w2-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "What does “sakana” mean?",
        options: ["Fish", "Bird", "Bear"],
        answer: "Fish",
        explanation: "Sakana means fish. A bird is “tori” and a bear is “kuma”.",
      },
      {
        id: "w2-jp-3",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “ao” means blue. What color is “aka”?",
        options: ["Red", "Green", "Yellow"],
        answer: "Red",
        explanation:
          "Aka = red, ao = blue, kiiro = yellow, midori = green, shiro = white. The Japanese flag is a red circle on white — aka and shiro!",
      },
      {
        id: "w2-eng-1",
        subject: "English",
        type: "type-answer",
        question: "One mouse, two ___? (What's the plural of mouse?)",
        answer: "mice",
        explanation:
          "Mice! Some words don't just add an “s” — they change. One tooth → two teeth, one child → two children, one mouse → two mice.",
      },
      {
        id: "w2-eng-2",
        subject: "English",
        type: "multiple-choice",
        question: "One fish, two ___?",
        options: ["fish", "fishs", "fishies"],
        answer: "fish",
        explanation: "Some words stay the same: one fish, two fish! Same with sheep and deer.",
      },
      {
        id: "w2-eng-3",
        subject: "English",
        type: "multiple-choice",
        question: "What is the opposite of “deep”?",
        options: ["shallow", "wide", "wet"],
        answer: "shallow",
        explanation:
          "Shallow water isn't very deep — like the edge of a swimming pool where you can stand up.",
      },
      {
        id: "w2-eng-4",
        subject: "English",
        type: "multiple-choice",
        question: "What is the opposite of “float”?",
        options: ["sink", "swim", "splash"],
        answer: "sink",
        explanation:
          "A rubber duck floats on top of the water; a stone sinks to the bottom. Float and sink are opposites!",
      },
      {
        id: "w2-math-1",
        subject: "Math",
        type: "multiple-choice",
        question:
          "A coral reef is split into 4 equal parts. Fish live in 3 of the parts. What fraction of the reef has fish?",
        options: ["3/4", "1/4", "4/3"],
        answer: "3/4",
        explanation:
          "The bottom number is how many equal parts there are (4), and the top number is how many we're counting (3). So it's 3/4 — three quarters!",
      },
      {
        id: "w2-math-2",
        subject: "Math",
        type: "multiple-choice",
        question: "In the number 4,825, what is the 8 really worth?",
        options: ["800", "80", "8"],
        answer: "800",
        explanation:
          "The 8 is in the hundreds place, so it's worth 8 hundreds = 800. (4 thousands + 8 hundreds + 2 tens + 5 ones = 4,825.)",
      },
      {
        id: "w2-math-3",
        subject: "Math",
        type: "type-answer",
        question: "A whale swims 12 km every hour. How far does it swim in 5 hours? (in km)",
        answer: "60",
        accept: ["60 km", "60km"],
        explanation: "12 × 5 = 60 km. Trick: 10 × 5 = 50, and 2 × 5 = 10, so 50 + 10 = 60!",
      },
      {
        id: "w2-math-4",
        subject: "Math",
        type: "type-answer",
        question: "Half of 30 sea turtles crawl onto the beach to lay eggs. How many turtles is that?",
        answer: "15",
        explanation: "Half of 30 is 15 — splitting 30 into two equal groups gives 15 in each.",
      },
      {
        id: "w2-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Submarines send out a sound and listen for its echo to “see” things underwater. What is this called?",
        options: ["Sonar", "Radio", "Laser"],
        answer: "Sonar",
        explanation:
          "Sonar sends out a ping of sound and listens for the echo. The longer the echo takes to come back, the farther away the object is! Dolphins and bats do the same thing — it's called echolocation.",
      },
      {
        id: "w2-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Why do scientists send robot submarines to the deepest parts of the ocean instead of swimming there?",
        options: [
          "It's pitch dark, freezing cold, and the water would crush a person",
          "Robots are better swimmers than fish",
          "Swimming in the ocean isn't allowed",
        ],
        answer: "It's pitch dark, freezing cold, and the water would crush a person",
        explanation:
          "Deep down, the weight of all the water above pushes in incredibly hard — strong enough to crush a person. Robot subs are built tough to handle that pressure, the cold, and the darkness.",
      },
    ],
  },

  // ───────────────────────────── Week 3 ─────────────────────────────
  {
    id: "2026-11-09",
    weekOf: "Week of November 9, 2026",
    opensOn: "2026-11-09",
    theme: "Robots & Patterns Week 🤖",
    dadNote:
      "Two weeks done — you're on a roll! This week is about robots, magnets, and patterns, plus a trip to Uganda's own Lake Victoria and River Nile. Look out for the patterns — they're hiding everywhere, even in numbers and in Japanese! Love, Daddy.",
    topics: ["Computers", "Physics", "Geography", "Japanese", "English", "Math"],
    resources: [
      { kind: "video", title: "How Computers Work: Binary & Data (Code.org)", description: "Find out how computers use just 1s and 0s to store numbers, words, pictures, and sounds.", href: "https://www.youtube.com/watch?v=USCBCmwMCDA", minutes: 6, },
      { kind: "site", title: "What Is an Algorithm? (BBC Bitesize)", description: "Learn how algorithms are step-by-step instructions, with examples and a quiz.", href: "https://www.bbc.co.uk/bitesize/articles/zqrq7ty", },
      { kind: "video", title: "Fun with Magnets! (SciShow Kids)", description: "See which things a magnet will stick to and which ones it won't.", href: "https://www.youtube.com/watch?v=s236Q1nuWXg", minutes: 5, },
      { kind: "site", title: "The Geography of Africa (BBC Bitesize)", description: "Learn how the equator crosses Africa, about the River Nile, and the Rwenzori Mountains on Uganda's border.", href: "https://www.bbc.co.uk/bitesize/articles/z2k6p4j", },
      { kind: "video", title: "Days of the Week in Japanese", description: "Sing the days of the week in Japanese, from getsuyoubi (Monday) to nichiyoubi (Sunday).", href: "https://www.youtube.com/watch?v=1-Ae5Deniqc", minutes: 1, },
      { kind: "video", title: "The People in My Family – Japanese song", description: "Learn Japanese family words like okaasan and obaasan by singing along.", href: "https://www.youtube.com/watch?v=HAqoBzgLlVc", minutes: 2, },
      { kind: "site", title: "Homophones (BBC Bitesize)", description: "Learn about words that sound the same but are spelled differently and mean different things.", href: "https://www.bbc.co.uk/bitesize/articles/z7g8jhv", },
    ],
    questions: [
      {
        id: "w3-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "What is an algorithm?",
        options: [
          "A list of step-by-step instructions to solve a problem",
          "A kind of robot",
          "A computer screen",
        ],
        answer: "A list of step-by-step instructions to solve a problem",
        explanation:
          "An algorithm is like a recipe. Brushing your teeth is an algorithm too: get the brush, add toothpaste, brush, rinse. Computers follow algorithms super fast!",
      },
      {
        id: "w3-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Computers count using only 0 and 1. In this “binary” counting, 1, 10, 11 mean 1, 2, 3. What comes next for 4?",
        options: ["100", "12", "111"],
        answer: "100",
        explanation:
          "In binary, each place is worth double the one to its right: 1, 2, 4, 8… So 100 means “one 4, no 2s, no 1s” = 4!",
      },
      {
        id: "w3-tech-3",
        subject: "Tech",
        type: "multiple-choice",
        question: "What is a “bug” in a computer program?",
        options: [
          "A mistake that makes the program go wrong",
          "A real insect inside the computer",
          "A type of video game",
        ],
        answer: "A mistake that makes the program go wrong",
        explanation:
          "A bug is a mistake in the code. Fun fact: in 1947, scientists found a real moth stuck inside a giant computer — they taped it into their notebook as the “first actual bug”!",
      },
      {
        id: "w3-tech-4",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "A robot follows this program: “Repeat 4 times: move forward 10 steps, then turn right a quarter turn.” What shape does it draw?",
        options: ["Square", "Triangle", "Circle"],
        answer: "Square",
        explanation:
          "4 equal sides and 4 quarter turns make a square! A “repeat” is called a loop — it saves you from writing the same steps over and over.",
      },
      {
        id: "w3-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "You hold the NORTH end of one magnet near the SOUTH end of another. What happens?",
        options: ["They pull together", "They push apart", "Nothing happens"],
        answer: "They pull together",
        explanation:
          "Opposites attract! North and south pull together. Two norths (or two souths) push each other away — try it and you can feel the push.",
      },
      {
        id: "w3-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which object will a magnet pick up?",
        options: ["An iron nail", "A plastic spoon", "A wooden pencil"],
        answer: "An iron nail",
        explanation:
          "Magnets attract iron (and steel, which has iron in it). Plastic and wood aren't magnetic. Surprise: not even all metals are — a magnet won't pick up an aluminium can!",
      },
      {
        id: "w3-sci-3",
        subject: "Science",
        type: "type-answer",
        question: "A seesaw is an example of which simple machine? (Hint: it starts with L)",
        answer: "lever",
        accept: ["a lever"],
        explanation:
          "A lever is a bar that tips on a point. Push one end down and the other end goes up — that's how a small kid can lift a bigger kid on a seesaw if they sit farther from the middle!",
      },
      {
        id: "w3-sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "Which simple machine is a wheel with a rope over it, used to raise a flag up a pole?",
        options: ["Pulley", "Lever", "Wedge"],
        answer: "Pulley",
        explanation:
          "A pulley lets you pull DOWN on a rope to lift something UP. That's much easier than climbing the pole!",
      },
      {
        id: "w3-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "What is the biggest lake in Africa — part of which is in Uganda?",
        options: ["Lake Victoria", "Lake Kyoga", "Lake Chad"],
        answer: "Lake Victoria",
        explanation:
          "Lake Victoria is Africa's biggest lake! Three countries share it: Uganda, Kenya, and Tanzania.",
      },
      {
        id: "w3-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "The River Nile flows out of Lake Victoria at which Ugandan town?",
        options: ["Jinja", "Kabale", "Gulu"],
        answer: "Jinja",
        explanation:
          "The Nile leaves Lake Victoria at Jinja and travels north all the way through Sudan and Egypt to the sea — it's one of the longest rivers in the whole world!",
      },
      {
        id: "w3-geo-3",
        subject: "Geography",
        type: "multiple-choice",
        question:
          "The equator is an imaginary line around the middle of the Earth. Does it pass through Uganda?",
        options: ["Yes", "No"],
        answer: "Yes",
        explanation:
          "Yes! The equator crosses Uganda. At the equator line you can stand with one foot in the northern half of the world and one foot in the southern half!",
      },
      {
        id: "w3-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question:
          "Japanese days of the week are named after nature. “Nichi” means sun, so “nichiyoubi” is which day?",
        options: ["Sunday", "Monday", "Friday"],
        answer: "Sunday",
        explanation:
          "Nichiyoubi = SUN-day, just like English! And “getsu” means moon, so getsuyoubi is Monday — Moon-day!",
      },
      {
        id: "w3-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “otousan” means father. What does “okaasan” mean?",
        options: ["Mother", "Grandmother", "Sister"],
        answer: "Mother",
        explanation:
          "Okaasan = mother, otousan = father, obaasan = grandmother, ojiisan = grandfather. So Kaaka is your obaasan!",
      },
      {
        id: "w3-jp-3",
        subject: "Japanese",
        type: "type-answer",
        question: "“Ni” means 2 in Japanese. What is ni + ni? (Answer with a number)",
        answer: "4",
        accept: ["four", "yon", "shi"],
        explanation: "Ni + ni = 2 + 2 = 4 — which is “yon” in Japanese!",
      },
      {
        id: "w3-eng-1",
        subject: "English",
        type: "multiple-choice",
        question: "Which word fills the gap? “From the hill, I can ___ the lake.”",
        options: ["see", "sea", "sae"],
        answer: "see",
        explanation:
          "“See” (with your eyes) and “sea” (the ocean) sound exactly the same but mean different things. Words like that are called homophones.",
      },
      {
        id: "w3-eng-2",
        subject: "English",
        type: "multiple-choice",
        question: "Which word fills the gap? “The robots charged ___ batteries.”",
        options: ["their", "there", "they're"],
        answer: "their",
        explanation:
          "“Their” means belonging to them. “There” is a place (over there), and “they're” is short for “they are”. Tricky homophones!",
      },
      {
        id: "w3-eng-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which is a compound word (two words joined into one)?",
        options: ["sunflower", "flowery", "quickly"],
        answer: "sunflower",
        explanation: "Sun + flower = sunflower! Other compound words: football, rainbow, keyboard.",
      },
      {
        id: "w3-math-1",
        subject: "Math",
        type: "type-answer",
        question: "A rectangle is 6 cm long and 4 cm wide. What is its AREA (in square cm)?",
        answer: "24",
        accept: ["24 square cm", "24 cm2", "24cm2", "24 cm²"],
        explanation:
          "Area = length × width = 6 × 4 = 24. Imagine covering it with little 1 cm squares — you'd need 24 of them!",
      },
      {
        id: "w3-math-2",
        subject: "Math",
        type: "type-answer",
        question: "What is the PERIMETER of that same rectangle (6 cm by 4 cm)? (in cm)",
        answer: "20",
        accept: ["20 cm", "20cm"],
        explanation:
          "Perimeter is the distance all the way around the edge: 6 + 4 + 6 + 4 = 20 cm. Area is the inside; perimeter is the outside!",
      },
      {
        id: "w3-math-3",
        subject: "Math",
        type: "multiple-choice",
        question: "What comes next? 3, 6, 12, 24, __",
        options: ["48", "30", "36"],
        answer: "48",
        explanation:
          "Each number is double the one before: 24 × 2 = 48. It's the same doubling pattern binary numbers use!",
      },
    ],
  },

  // ───────────────────────────── Week 4 ─────────────────────────────
  {
    id: "2026-11-16",
    weekOf: "Week of November 16, 2026",
    opensOn: "2026-11-16",
    theme: "Planet Earth & Beyond Week 🌍🚀",
    dadNote:
      "Three weeks in a row — you're a homework champion! This week we zoom way out: the planets, the Moon, the weather, and why it's a different time in Tokyo than in Kampala right now. Love, Daddy.",
    topics: ["Space", "Geography", "Japanese", "English", "Math", "Computers"],
    resources: [
      { kind: "video", title: "Why Does the Moon Change? (SciShow Kids)", description: "Find out why the Moon looks like a full circle some nights and a thin sliver on others.", href: "https://www.youtube.com/watch?v=yXe0yxzYkjo", minutes: 4, },
      { kind: "video", title: "How Does GPS Work? (NASA Space Place)", description: "Watch how satellites in space help a phone work out exactly where you are.", href: "https://www.youtube.com/watch?v=RSA3feQ9gKk", minutes: 3, },
      { kind: "video", title: "The Great Aqua Adventure (Crash Course Kids)", description: "Follow water around the planet as it evaporates, condenses, and falls again as rain.", href: "https://www.youtube.com/watch?v=z5G4NCwWUxY", minutes: 4, },
      { kind: "site", title: "Day and Night (BBC Bitesize)", description: "Learn how Earth's spinning makes day and night and gives us time zones — that's why Tokyo and Kampala show different times.", href: "https://www.bbc.co.uk/bitesize/articles/zn34r2p", },
      { kind: "video", title: "Head, Shoulders, Knees & Toes in Japanese", description: "Learn Japanese body words like atama (head) and kata (shoulders) with a song you already know.", href: "https://www.youtube.com/watch?v=lDK6wPj-b8A", minutes: 1, },
      { kind: "site", title: "Past, Present and Future Tense (BBC Bitesize)", description: "Learn how verbs change to show when something happened, like “ran” and “swam” for the past.", href: "https://www.bbc.co.uk/bitesize/articles/z3dbg82", },
    ],
    questions: [
      {
        id: "w4-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "Which planet is the biggest in our solar system?",
        options: ["Jupiter", "Saturn", "Earth"],
        answer: "Jupiter",
        explanation:
          "Jupiter is so big that more than 1,000 Earths could fit inside it! It's a giant ball of gas with a storm bigger than our whole planet.",
      },
      {
        id: "w4-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which planet is closest to the Sun?",
        options: ["Mercury", "Venus", "Mars"],
        answer: "Mercury",
        explanation:
          "Mercury is closest. But here's a surprise: Venus is the HOTTEST planet, because its thick clouds trap heat like a blanket!",
      },
      {
        id: "w4-sci-3",
        subject: "Science",
        type: "multiple-choice",
        question: "Why does the Moon seem to change shape during the month?",
        options: [
          "We see different amounts of its sunlit side as it travels around Earth",
          "Clouds cover parts of it",
          "The Moon shrinks and grows",
        ],
        answer: "We see different amounts of its sunlit side as it travels around Earth",
        explanation:
          "The Sun always lights up half of the Moon. As the Moon circles Earth (about once a month), we see more or less of that bright half — from a thin crescent to a full moon and back.",
      },
      {
        id: "w4-sci-4",
        subject: "Science",
        type: "type-answer",
        question:
          "About how many days does it take Earth to travel all the way around the Sun? (Hint: it's one year)",
        answer: "365",
        accept: ["365 days", "365.25", "365 and a quarter", "366"],
        explanation:
          "About 365 days — one year! It's actually 365 and a quarter days, so every 4 years we add an extra day, February 29. That's called a leap year.",
      },
      {
        id: "w4-sci-5",
        subject: "Science",
        type: "multiple-choice",
        question:
          "The Sun heats a puddle and the water turns into invisible vapor that rises into the air. What is this called?",
        options: ["Evaporation", "Condensation", "Precipitation"],
        answer: "Evaporation",
        explanation:
          "Evaporation! That's why puddles disappear on a sunny day — the water doesn't vanish, it floats up into the air as vapor.",
      },
      {
        id: "w4-sci-6",
        subject: "Science",
        type: "multiple-choice",
        question:
          "High in the sky, water vapor cools down and turns into tiny droplets that make clouds. What is this called?",
        options: ["Condensation", "Evaporation", "Erosion"],
        answer: "Condensation",
        explanation:
          "Condensation — the same thing that makes drops appear on a cold glass of juice! When the cloud droplets get heavy, they fall as rain. That's the water cycle.",
      },
      {
        id: "w4-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "Tokyo is 6 hours ahead of Kampala. If it's 3 pm in Tokyo, what time is it in Kampala?",
        options: ["9 am", "9 pm", "3 am"],
        answer: "9 am",
        explanation:
          "Kampala is behind, so subtract: 3 pm − 6 hours = 9 am. So when Daddy is finishing his afternoon, you're just starting your morning!",
      },
      {
        id: "w4-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "Why do different countries have different times of day?",
        options: [
          "Earth spins, so the Sun shines on different places at different times",
          "Each country picks any time it likes",
          "The Sun moves around the Earth",
        ],
        answer: "Earth spins, so the Sun shines on different places at different times",
        explanation:
          "Earth spins once every 24 hours. Japan turns to face the Sun before Uganda does, so Japan's morning comes first!",
      },
      {
        id: "w4-geo-3",
        subject: "Geography",
        type: "multiple-choice",
        question: "Which continent is the coldest, covered almost completely in ice?",
        options: ["Antarctica", "Europe", "Asia"],
        answer: "Antarctica",
        explanation:
          "Antarctica, at the very bottom of the world. Penguins live there, but no one lives there all the time — only visiting scientists.",
      },
      {
        id: "w4-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "How does a phone's map know exactly where you are?",
        options: [
          "It listens to signals from GPS satellites in space",
          "It just guesses",
          "Someone watches you through the screen",
        ],
        answer: "It listens to signals from GPS satellites in space",
        explanation:
          "GPS satellites circle high above Earth sending out signals. Your phone listens to several at once and uses math to work out exactly where you are!",
      },
      {
        id: "w4-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question: "Where are the satellites that help scientists predict the weather?",
        options: ["Orbiting Earth in space", "At the bottom of the ocean", "Only on mountain tops"],
        answer: "Orbiting Earth in space",
        explanation:
          "Weather satellites orbit Earth and take pictures of clouds and storms from above, so forecasters can see the weather coming before it arrives.",
      },
      {
        id: "w4-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “ame” means rain. What does “yuki” mean?",
        options: ["Snow", "Sun", "Wind"],
        answer: "Snow",
        explanation:
          "Yuki = snow ❄️, ame = rain 🌧️, kaze = wind 💨, kumori = cloudy ☁️. Japan gets lots of yuki in winter!",
      },
      {
        id: "w4-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "Which Japanese word means “sunny” (a clear, bright day)?",
        options: ["Hare", "Ame", "Kumori"],
        answer: "Hare",
        explanation: "Hare (hah-reh) means sunny. Ame is rain and kumori is cloudy.",
      },
      {
        id: "w4-jp-3",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “te” means hand. What does “me” mean?",
        options: ["Eye", "Ear", "Nose"],
        answer: "Eye",
        explanation:
          "Me = eye 👁️, mimi = ear 👂, hana = nose 👃, te = hand ✋. Fun fact: “hana” can also mean flower!",
      },
      {
        id: "w4-eng-1",
        subject: "English",
        type: "multiple-choice",
        question: "Which word is a synonym of “huge” (means the same thing)?",
        options: ["enormous", "tiny", "quick"],
        answer: "enormous",
        explanation:
          "Huge and enormous both mean very, very big — like Jupiter! “Tiny” is the opposite (an antonym).",
      },
      {
        id: "w4-eng-2",
        subject: "English",
        type: "multiple-choice",
        question: "Which is correct? “Yesterday I ___ to the market.”",
        options: ["went", "goed", "go"],
        answer: "went",
        explanation:
          "“Go” is a tricky verb — its past tense is “went”, not “goed”. Others like it: run → ran, eat → ate.",
      },
      {
        id: "w4-eng-3",
        subject: "English",
        type: "type-answer",
        question: "Today I swim. Yesterday I ___. (What's the past tense of “swim”?)",
        answer: "swam",
        explanation:
          "Swim → swam! It follows a pattern you might spot: sing → sang, ring → rang, swim → swam.",
      },
      {
        id: "w4-math-1",
        subject: "Math",
        type: "type-answer",
        question: "Mangoes cost 500 shillings each. How much do 4 mangoes cost? (in shillings)",
        answer: "2000",
        accept: ["2,000", "2000 shillings", "2,000 shillings", "shs 2000", "ugx 2000"],
        explanation:
          "500 × 4 = 2,000 shillings. Trick: 5 × 4 = 20, then add the two zeros back on: 2,000!",
      },
      {
        id: "w4-math-2",
        subject: "Math",
        type: "multiple-choice",
        question: "A football match lasts 90 minutes. How long is that in hours and minutes?",
        options: ["1 hour 30 minutes", "1 hour 9 minutes", "9 hours"],
        answer: "1 hour 30 minutes",
        explanation:
          "60 minutes make 1 hour, and 90 − 60 = 30 minutes left over. So 1 hour 30 minutes — long enough for Liverpool to score a few goals!",
      },
      {
        id: "w4-math-3",
        subject: "Math",
        type: "type-answer",
        question:
          "You have 1,000 shillings and buy a snack for 350. How much change do you get? (in shillings)",
        answer: "650",
        accept: ["650 shillings", "shs 650", "ugx 650"],
        explanation:
          "1,000 − 350 = 650. Shopkeeper's trick — count UP from 350: +50 makes 400, then +600 makes 1,000. 50 + 600 = 650!",
      },
    ],
  },

  // ───────────────────────────── Week 5 ─────────────────────────────
  {
    id: "2026-11-23",
    weekOf: "Week of November 23, 2026",
    opensOn: "2026-11-23",
    theme: "Game Day Science Week ⚽",
    dadNote:
      "Four weeks done — you're on fire! This week is all about sport. Every kick, jump, and splash is secretly science: pushes, pulls, gravity, and friction. Next time you play football, see if you can spot the forces at work! Love, Daddy.",
    topics: ["Sports", "Physics", "Japanese", "English", "Math", "Geography"],
    resources: [
      { kind: "video", title: "Swings, Slides, and Science (SciShow Kids)", description: "Playgrounds are full of forces! Find the pushes, pulls, and gravity hiding in your favourite games.", href: "https://www.youtube.com/watch?v=JvSClZ3vHOI", minutes: 4, },
      { kind: "site", title: "Friction (BBC Bitesize)", description: "Why do football boots have studs? Learn how friction slows things down and why rough surfaces grip better.", href: "https://www.bbc.co.uk/bitesize/topics/zjrp46f/articles/zcmwkty", },
      { kind: "video", title: "Defining Gravity (Crash Course Kids)", description: "When you kick a ball high, why does it always come back down? Meet gravity, the pull towards the Earth.", href: "https://www.youtube.com/watch?v=ljRlB6TuMOU", minutes: 3, },
      { kind: "video", title: "Why Some Balls Don't Bounce (A Moment of Science)", description: "Some balls bounce high and some just go splat. Find out what makes the difference.", href: "https://www.youtube.com/watch?v=ewDXEpyT-tw", minutes: 2, },
      { kind: "video", title: "Arukou Arukou – Walking Walking (Super Simple Japanese)", description: "Get moving in Japanese! Sing and act out walk, hop, and run — like a warm-up before a match.", href: "https://www.youtube.com/watch?v=WiRbpBwxhfc", minutes: 2, },
      { kind: "site", title: "What Are Adjectives? (BBC Bitesize)", description: "Describing words make writing exciting — and this lesson uses a football match to show you how.", href: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn/articles/zrq4qyc", },
    ],
    questions: [
      {
        id: "w5-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "When you kick a football, what makes it start moving?",
        options: ["A push from your foot (a force)", "The colour of the ball", "The lines on the pitch"],
        answer: "A push from your foot (a force)",
        explanation:
          "A force is a push or a pull. Things don't start moving, stop, or change direction unless a force acts on them. Your kick is a big push!",
      },
      {
        id: "w5-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "You kick a ball high into the air. Why does it always come back down?",
        options: ["Gravity pulls it towards the Earth", "The wind always pushes it down", "The ball gets tired"],
        answer: "Gravity pulls it towards the Earth",
        explanation:
          "Gravity is a pull that the whole Earth has on everything near it. Your kick pushes the ball up, but gravity keeps pulling, slows it down, and brings it back.",
      },
      {
        id: "w5-sci-3",
        subject: "Science",
        type: "multiple-choice",
        question: "Why do football boots have studs on the bottom?",
        options: ["To grip the grass so you don't slip", "To make you taller", "To make the ball bounce higher"],
        answer: "To grip the grass so you don't slip",
        explanation:
          "Studs dig into the ground and give you more FRICTION — the gripping force between two surfaces. More friction means you can run and turn fast without sliding over.",
      },
      {
        id: "w5-sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "You roll the same ball, just as hard, on smooth ice and on long grass. Where does it roll further?",
        options: ["On the ice", "On the grass", "Exactly the same distance"],
        answer: "On the ice",
        explanation:
          "Long grass rubs against the ball and slows it down — that's friction. Smooth ice has very little friction, so the ball keeps going much further.",
      },
      {
        id: "w5-sci-5",
        subject: "Science",
        type: "multiple-choice",
        question: "Why do fast swimmers wear tight, smooth swimsuits and caps?",
        options: ["So they slide through the water more easily", "So the water feels warmer", "So they float higher like a boat"],
        answer: "So they slide through the water more easily",
        explanation:
          "Water pushes back on anything moving through it — this is called DRAG. Smooth, tight clothes (and a cap over the hair) give the water less to grab, so swimmers go faster.",
      },
      {
        id: "w5-sci-6",
        subject: "Science",
        type: "multiple-choice",
        question: "Why does a pumped-up ball bounce higher than a flat one?",
        options: [
          "The squashed air inside springs back and pushes it up",
          "A flat ball is much heavier",
          "Pumped-up balls are made of rubber and flat ones aren't",
        ],
        answer: "The squashed air inside springs back and pushes it up",
        explanation:
          "When a ball hits the ground, it squashes. The air packed inside acts like a spring and pushes back out, launching the ball up. A flat ball has less air to spring back, so it just goes “thud”.",
      },
      {
        id: "w5-sci-7",
        subject: "Science",
        type: "multiple-choice",
        question:
          "Two players kick the same ball at exactly the same moment, just as hard, from opposite sides. What happens?",
        options: ["It hardly moves — the pushes cancel out", "It flies twice as far", "It goes straight up into space"],
        answer: "It hardly moves — the pushes cancel out",
        explanation:
          "Equal pushes in opposite directions are called BALANCED forces — they cancel each other out, just like a tug-of-war where both teams pull equally and nobody moves.",
      },
      {
        id: "w5-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "In big football matches, how does goal-line technology know if the ball crossed the line?",
        options: ["Several super-fast cameras track the ball", "The referee guesses", "The goalkeeper presses a button"],
        answer: "Several super-fast cameras track the ball",
        explanation:
          "Cameras around the goal take hundreds of pictures every second. A computer combines them to work out exactly where the ball is, then buzzes the referee's watch if it's a goal!",
      },
      {
        id: "w5-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "Liverpool FC is one of your favourite teams. Which country is the city of Liverpool in?",
        options: ["England", "Spain", "Japan"],
        answer: "England",
        explanation:
          "Liverpool is a port city in the north-west of England, by the sea. England is part of the United Kingdom, along with Scotland, Wales, and Northern Ireland.",
      },
      {
        id: "w5-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "The “Tokyo 2020” Olympic Games were held in Daddy's city. Which country is that in?",
        options: ["Japan", "China", "Brazil"],
        answer: "Japan",
        explanation:
          "Tokyo is the capital of Japan. Fun fact: the Games were called “Tokyo 2020” but actually happened in 2021, because they were delayed by a year.",
      },
      {
        id: "w5-geo-3",
        subject: "Geography",
        type: "multiple-choice",
        question: "Uganda's Joshua Cheptegei won an Olympic gold medal at the Tokyo Games. What is his sport?",
        options: ["Running", "Swimming", "Boxing"],
        answer: "Running",
        explanation:
          "Joshua Cheptegei is a long-distance runner — he won the 5,000 metres race in Tokyo. Uganda has some of the best long-distance runners in the world!",
      },
      {
        id: "w5-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "Japanese fans shout “Ganbatte!” to cheer on a player. What does it mean?",
        options: ["Do your best!", "Goodbye!", "I'm hungry!"],
        answer: "Do your best!",
        explanation:
          "Ganbatte (gahn-baht-teh) means “do your best” or “go for it!” Japanese people say it before tests, races, and matches. Ganbatte on this homework!",
      },
      {
        id: "w5-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "Lots of sports words in Japanese come from English. What sport do you think “sakkā” is?",
        options: ["Football (soccer)", "Swimming", "Tennis"],
        answer: "Football (soccer)",
        explanation:
          "Sakkā (sah-kah) comes from the English word “soccer”. Try saying it out loud — it sounds just like soccer with a Japanese accent!",
      },
      {
        id: "w5-jp-3",
        subject: "Japanese",
        type: "type-answer",
        question:
          "A football team has 11 players. In Japanese, juu = 10 and ichi = 1. How do you say 11? (type it in romaji)",
        answer: "juuichi",
        accept: ["juu ichi", "juu-ichi", "juichi", "ju ichi", "ju-ichi", "jūichi", "jū ichi"],
        explanation:
          "Juu + ichi = juuichi (10 + 1). It's the same LEGO trick as juu-go = 15 from your first week!",
      },
      {
        id: "w5-en-1",
        subject: "English",
        type: "multiple-choice",
        question:
          "Which word is an ADVERB (it tells you HOW something was done)? “The striker ran quickly towards the goal.”",
        options: ["quickly", "striker", "goal"],
        answer: "quickly",
        explanation:
          "“Quickly” tells us HOW the striker ran. Lots of adverbs end in -ly: slowly, loudly, carefully. Striker and goal are nouns.",
      },
      {
        id: "w5-en-2",
        subject: "English",
        type: "type-answer",
        question: "fast → faster → ______ (the fastest of all)",
        answer: "fastest",
        accept: ["the fastest"],
        explanation:
          "Add -er to compare two things (faster) and -est when something beats everything else (fastest). Tall, taller, tallest — strong, stronger, strongest!",
      },
      {
        id: "w5-en-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which word fits? “Our team ___ the match 2–0!”",
        options: ["won", "one"],
        answer: "won",
        explanation:
          "“Won” and “one” sound exactly the same but mean different things — they're called homophones. “Won” is the past of win; “one” is the number 1.",
      },
      {
        id: "w5-math-1",
        subject: "Math",
        type: "type-answer",
        question:
          "A football match has two halves of 45 minutes, plus a 15-minute half-time break. How many minutes from kick-off to the final whistle? (no extra time)",
        answer: "105",
        accept: ["105 minutes", "105 mins", "105 min"],
        explanation:
          "45 + 45 = 90 minutes of football, then add the 15-minute break: 90 + 15 = 105 minutes. That's 1 hour and 45 minutes!",
      },
      {
        id: "w5-math-2",
        subject: "Math",
        type: "type-answer",
        question:
          "In a football league, a win gets 3 points and a draw gets 1 point. A team wins 5 games and draws 2. How many points do they have?",
        answer: "17",
        accept: ["17 points"],
        explanation:
          "Wins: 5 × 3 = 15 points. Draws: 2 × 1 = 2 points. Add them: 15 + 2 = 17 points.",
      },
      {
        id: "w5-math-3",
        subject: "Math",
        type: "multiple-choice",
        question: "A swimming pool is 50 metres long. You swim 4 lengths. How far did you swim?",
        options: ["200 metres", "54 metres", "150 metres"],
        answer: "200 metres",
        explanation:
          "4 lengths × 50 metres = 200 metres. Trick: 50 is half of 100, so 4 × 50 is half of 4 × 100 = half of 400 = 200.",
      },
    ],
  },

  // ───────────────────────────── Week 6 ─────────────────────────────
  {
    id: "2026-11-30",
    weekOf: "Week of November 30, 2026",
    opensOn: "2026-11-30",
    theme: "Inside the Computer Week 💻",
    dadNote:
      "You play Roblox and watch YouTube every week — but what's actually going on inside the computer? This week we open it up (not with a screwdriver!) and find the brain, the memory, the pixels, and how the internet connects the whole world. Love, Daddy.",
    topics: ["Computers", "Math", "Japanese", "English"],
    resources: [
      { kind: "video", title: "How Computers Work: CPU, Memory, Input & Output (Code.org)", description: "Meet the parts inside a computer: the CPU brain, the memory, and the input and output devices you use every day.", href: "https://www.youtube.com/watch?v=DKGZlaPlVLY", minutes: 4, },
      { kind: "site", title: "How Does the Internet Work? (BBC Bitesize)", description: "The internet is a giant network of computers sharing information. See how a webpage travels to your screen.", href: "https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z3tbgk7", },
      { kind: "site", title: "What Is Online Safety? (BBC Bitesize)", description: "The internet is amazing, but you need to stay safe on it. Learn smart ways to protect yourself online.", href: "https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zfmhfdm", },
      { kind: "site", title: "How Do Digital Images Work? (BBC Bitesize)", description: "Every picture on a screen is made of tiny squares called pixels. See how a computer stores a picture like colour-by-numbers!", href: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/z2tgr82", },
      { kind: "video", title: "Let's Count to 100 (Super Simple Japanese)", description: "Can you count all the way to hyaku (100) in Japanese? Sing along with the big numbers.", href: "https://www.youtube.com/watch?v=lO9iY7fDCeQ", minutes: 4, },
      { kind: "site", title: "Using Prefixes (BBC Bitesize)", description: "Put un- or re- at the front of a word and its meaning changes! Learn what prefixes mean.", href: "https://www.bbc.co.uk/bitesize/topics/zqqsw6f/articles/z2gnm39", },
    ],
    questions: [
      {
        id: "w6-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question: "Which part of a computer is often called its “brain”, because it does all the thinking and calculating?",
        options: ["The CPU (processor)", "The mouse", "The screen"],
        answer: "The CPU (processor)",
        explanation:
          "CPU stands for Central Processing Unit. It's a small chip that can do billions of tiny calculations every second — every game, video, and app is the CPU following instructions very, very fast.",
      },
      {
        id: "w6-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "A keyboard is an INPUT device — it puts information INTO the computer. Which of these is an OUTPUT device?",
        options: ["A speaker", "A mouse", "A microphone"],
        answer: "A speaker",
        explanation:
          "Output devices send information OUT of the computer to you: speakers (sound), screens (pictures), printers (paper). Mice and microphones send information in.",
      },
      {
        id: "w6-tech-3",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "A computer has short-term memory called RAM. When the power goes off, what happens to unsaved work in RAM?",
        options: ["It disappears", "It's kept forever", "It gets printed out"],
        answer: "It disappears",
        explanation:
          "RAM is like a whiteboard — super quick to use, but wiped clean when the power goes. Storage (the hard drive or SSD) is like a notebook that keeps things. That's why we press SAVE!",
      },
      {
        id: "w6-tech-4",
        subject: "Tech",
        type: "type-answer",
        question:
          "Every picture on a screen is made of thousands of tiny coloured squares. What are these squares called? (starts with p)",
        answer: "pixels",
        accept: ["pixel", "a pixel"],
        explanation:
          "Pixels! Look really closely at a screen (or zoom way into a photo) and you'll see them. Roblox's blocky look is a bit like seeing big pixels.",
      },
      {
        id: "w6-tech-5",
        subject: "Tech",
        type: "multiple-choice",
        question: "What is the internet?",
        options: [
          "Millions of computers around the world connected so they can share information",
          "One giant computer that lives in America",
          "A program that's only inside your tablet",
        ],
        answer: "Millions of computers around the world connected so they can share information",
        explanation:
          "The internet is a giant network — computers joined together by cables, Wi-Fi, and phone signals. When you open YouTube, your tablet asks another computer far away to send you the video.",
      },
      {
        id: "w6-tech-6",
        subject: "Tech",
        type: "multiple-choice",
        question: "How does a laptop get on the internet using Wi-Fi when there's no wire plugged in?",
        options: ["Invisible radio waves travel through the air", "Through tiny invisible strings", "It uses the light from the room"],
        answer: "Invisible radio waves travel through the air",
        explanation:
          "A Wi-Fi router sends and receives radio waves — the same kind of invisible waves that carry radio stations, just carrying computer messages instead.",
      },
      {
        id: "w6-tech-7",
        subject: "Tech",
        type: "multiple-choice",
        question: "A game or website asks you to type your home address and school name. What should you do?",
        options: ["Don't type it — ask a grown-up first", "Type it in quickly", "Post it so your friends can see"],
        answer: "Don't type it — ask a grown-up first",
        explanation:
          "Personal information — your address, school, phone number, and passwords — should stay private online. A real friend or a good game never needs it. When in doubt, ask Mum or Daddy!",
      },
      {
        id: "w6-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "Why do laptops and game consoles have little fans and air holes?",
        options: ["To stop them getting too hot", "To blow dust onto the screen", "To make the sound louder"],
        answer: "To stop them getting too hot",
        explanation:
          "When electricity flows through the chips, some of it turns into heat. Too much heat can damage them, so fans blow the hot air out. Never cover the air holes!",
      },
      {
        id: "w6-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "A screen can show every colour by mixing just three colours of light. Which three?",
        options: ["Red, green, and blue", "Red, yellow, and blue", "Black, white, and grey"],
        answer: "Red, green, and blue",
        explanation:
          "Each pixel has tiny red, green, and blue lights. Mixing them makes every colour — red + green light even makes yellow! (Paints mix differently from light.)",
      },
      {
        id: "w6-sci-3",
        subject: "Science",
        type: "multiple-choice",
        question: "In a thunderstorm, you see the lightning BEFORE you hear the thunder. Why?",
        options: ["Light travels much faster than sound", "Thunder starts later", "Your ears are slower than your eyes"],
        answer: "Light travels much faster than sound",
        explanation:
          "Both happen at the same moment, but light is almost a million times faster than sound. Count the seconds between the flash and the boom — about 3 seconds means the storm is 1 km away.",
      },
      {
        id: "w6-math-1",
        subject: "Math",
        type: "type-answer",
        question: "A tiny screen is 10 pixels wide and 6 pixels tall. How many pixels does it have altogether?",
        answer: "60",
        accept: ["60 pixels"],
        explanation:
          "It's a rectangle of pixels: 10 × 6 = 60. Real screens have millions — a phone might be over 1,000 pixels wide and 2,000 tall!",
      },
      {
        id: "w6-math-2",
        subject: "Math",
        type: "multiple-choice",
        question: "A game download is 800 MB. So far, 200 MB has downloaded. What fraction is done?",
        options: ["1/4", "1/2", "1/8"],
        answer: "1/4",
        explanation:
          "200 goes into 800 four times (4 × 200 = 800), so 200 is one quarter — 1/4. Three more quarters to go!",
      },
      {
        id: "w6-math-3",
        subject: "Math",
        type: "type-answer",
        question:
          "Your tablet starts at 100% battery and loses 10% every hour while you play. After how many hours will it be at 30%?",
        answer: "7",
        accept: ["7 hours", "seven", "seven hours"],
        explanation:
          "From 100% down to 30% is 70% used. 70 ÷ 10 = 7 hours. (Seven hours of games in a row is too many anyway — take breaks!)",
      },
      {
        id: "w6-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "Japanese borrows lots of English words for technology. What do you think “konpyūtā” means?",
        options: ["Computer", "Cucumber", "Camera"],
        answer: "Computer",
        explanation:
          "Konpyūtā (kon-pyoo-tah) is “computer” said the Japanese way. Others: terebi = TV, gēmu = game. Can you hear the English inside them?",
      },
      {
        id: "w6-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "“Hyaku” means 100 in Japanese. What number is “ni-hyaku”?",
        options: ["200", "102", "120"],
        answer: "200",
        explanation:
          "Ni (2) × hyaku (100) = 200. Same LEGO idea as go-juu (5 × 10 = 50). Now you can count to the hundreds in Japanese!",
      },
      {
        id: "w6-en-1",
        subject: "English",
        type: "multiple-choice",
        question: "The prefix “re-” at the start of a word means “again”. What does “restart” mean?",
        options: ["Start again", "Never start", "Start slowly"],
        answer: "Start again",
        explanation:
          "Re- = again. Restart, replay, rewrite, rebuild! When a game freezes, you restart it — start it again.",
      },
      {
        id: "w6-en-2",
        subject: "English",
        type: "type-answer",
        question: "The prefix “un-” means “not”. What word means “NOT safe”?",
        answer: "unsafe",
        accept: ["un-safe"],
        explanation:
          "Un + safe = unsafe. More: unhappy, unlock, unkind. Clicking a strange link from a stranger is unsafe!",
      },
      {
        id: "w6-en-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which sentence uses a question mark correctly?",
        options: ["Can you turn on the computer?", "Turn on the computer?", "I turned on the computer?"],
        answer: "Can you turn on the computer?",
        explanation:
          "A question mark goes at the end of a sentence that ASKS something. The other two tell or command, so they end with a full stop.",
      },
      {
        id: "w6-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "Famous game companies like Nintendo and Sony started in which country?",
        options: ["Japan", "Uganda", "Brazil"],
        answer: "Japan",
        explanation:
          "Nintendo (Mario, Pokémon games) and Sony (PlayStation) are both Japanese companies. Japan is one of the world's biggest homes of video games!",
      },
      {
        id: "w6-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "Most internet messages between continents travel through long cables laid where?",
        options: ["On the ocean floor", "On the Moon", "Inside the clouds"],
        answer: "On the ocean floor",
        explanation:
          "Huge cables run along the bottom of the oceans, joining the continents. Uganda has no sea, so its internet connects by land to cables that reach the coast in Kenya and Tanzania.",
      },
    ],
  },

  // ───────────────────────────── Week 7 ─────────────────────────────
  {
    id: "2026-12-07",
    weekOf: "Week of December 7, 2026",
    opensOn: "2026-12-07",
    theme: "Electricity & Energy Week ⚡",
    dadNote:
      "This one is extra special, because you're named after Nikola Tesla — one of the great electricity inventors! This week: circuits, switches, batteries, solar power, and how the River Nile helps light up Uganda. Please remember the safety question — it's the most important one. Love, Daddy.",
    topics: ["Physics", "Geography", "Japanese", "English", "Math"],
    resources: [
      { kind: "site", title: "What Are Electrical Circuits? (BBC Bitesize)", description: "Electricity needs a complete loop. See how batteries, wires, and bulbs join into a circuit — and what a gap does.", href: "https://www.bbc.co.uk/bitesize/topics/z8nqfdm/articles/zqgfp4j", },
      { kind: "site", title: "Conductors and Insulators (BBC Bitesize)", description: "Why are wires made of metal but covered in plastic? Find out which materials let electricity through.", href: "https://www.bbc.co.uk/bitesize/topics/z8nqfdm/articles/zhkgvwx", },
      { kind: "video", title: "The Sticky Balloon Trick! (SciShow Kids)", description: "Make a balloon stick to the wall with no tape — then find out how static electricity does it.", href: "https://www.youtube.com/watch?v=5TAIUCYMlIQ", minutes: 3, },
      { kind: "site", title: "Hydropower (Energy Kids)", description: "See how rushing water spins a turbine inside a dam to make electricity — just like on the Nile. Good one to read with Daddy.", href: "https://www.eia.gov/kids/energy-sources/hydropower/", },
      { kind: "video", title: "Renewable Energy 101 (National Geographic)", description: "Sunshine and wind never run out! See how solar panels and wind turbines make clean electricity.", href: "https://www.youtube.com/watch?v=1kUE0BZtTRc", minutes: 3, },
      { kind: "site", title: "Fractions of Amounts (BBC Bitesize)", description: "What is a quarter of 12? Learn how to find a fraction of an amount, like sharing money fairly.", href: "https://www.bbc.co.uk/bitesize/topics/zhdwxnb/articles/zdrbcqt", },
    ],
    questions: [
      {
        id: "w7-sci-1",
        subject: "Science",
        type: "type-answer",
        question:
          "For a bulb to light up, electricity must flow all the way round a complete loop. What is this loop called? (starts with c)",
        answer: "circuit",
        accept: ["a circuit", "electric circuit", "an electric circuit", "circut", "complete circuit"],
        explanation:
          "A circuit is a complete path — battery → wire → bulb → wire → back to the battery. Break the loop anywhere and the electricity stops, so the bulb goes out.",
      },
      {
        id: "w7-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Which of these lets electricity flow through it easily? (a CONDUCTOR)",
        options: ["A metal spoon", "A plastic ruler", "A rubber eraser"],
        answer: "A metal spoon",
        explanation:
          "Metals like copper, iron, and aluminium are good conductors — that's why wires have copper inside. Plastic, rubber, and wood don't let electricity through easily.",
      },
      {
        id: "w7-sci-3",
        subject: "Science",
        type: "multiple-choice",
        question: "Why are electric wires covered in plastic?",
        options: [
          "Plastic is an insulator — it keeps the electricity inside and keeps us safe",
          "Just to make them colourful",
          "Plastic makes electricity go faster",
        ],
        answer: "Plastic is an insulator — it keeps the electricity inside and keeps us safe",
        explanation:
          "An INSULATOR blocks electricity. The copper inside carries the electricity, and the plastic coat stops it escaping into your hand.",
      },
      {
        id: "w7-sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "You rub a balloon on your hair and then it sticks to the wall. What causes this?",
        options: ["Static electricity", "Glue in the balloon", "Gravity"],
        answer: "Static electricity",
        explanation:
          "Rubbing moves tiny charged bits called electrons from your hair onto the balloon. The charged balloon then pulls on the wall — and your hair may stand up too!",
      },
      {
        id: "w7-sci-5",
        subject: "Science",
        type: "multiple-choice",
        question: "What does a light switch actually do?",
        options: ["It closes or opens a gap in the circuit", "It makes brand-new electricity", "It cools the bulb down"],
        answer: "It closes or opens a gap in the circuit",
        explanation:
          "ON joins the gap so electricity can flow round the loop. OFF opens the gap, the loop is broken, and the light goes out. A switch is a little drawbridge for electricity!",
      },
      {
        id: "w7-sci-6",
        subject: "Science",
        type: "multiple-choice",
        question: "A solar panel turns what into electricity?",
        options: ["Sunlight", "Rain", "Noise"],
        answer: "Sunlight",
        explanation:
          "Solar panels catch sunlight and turn it straight into electricity. Uganda gets lots of strong sunshine all year because it sits on the equator — great for solar power!",
      },
      {
        id: "w7-sci-7",
        subject: "Science",
        type: "multiple-choice",
        question: "Why must you NEVER push your fingers or anything metal into a plug socket?",
        options: [
          "Electricity could flow through your body and badly hurt you",
          "It would make the TV turn off",
          "It's fine if you're quick",
        ],
        answer: "Electricity could flow through your body and badly hurt you",
        explanation:
          "Your body conducts electricity, and the electricity in a wall socket is strong enough to cause serious injury. Batteries in toys are weak and safe; wall sockets are not. Always ask a grown-up.",
      },
      {
        id: "w7-sci-8",
        subject: "Science",
        type: "multiple-choice",
        question:
          "Scientists named a unit after Nikola Tesla — the same Tesla you're named after! What does the “tesla” unit measure?",
        options: ["How strong a magnetic field is", "How heavy something is", "How hot something is"],
        answer: "How strong a magnetic field is",
        explanation:
          "Scientists measure magnetic fields in teslas, in honour of his work with electricity and magnetism. So somewhere in a science lab right now, people are measuring things in “Teslas”!",
      },
      {
        id: "w7-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Nikola Tesla worked on AC (alternating current) electricity systems. What were AC systems especially good at?",
        options: ["Sending electricity over long distances", "Taking photos", "Making phones waterproof"],
        answer: "Sending electricity over long distances",
        explanation:
          "AC power can be changed to very high voltages for travelling along long power lines, then changed back down for homes. That's why most power grids around the world use AC today.",
      },
      {
        id: "w7-tech-2",
        subject: "Tech",
        type: "type-answer",
        question: "What stores electricity inside a phone or torch so it works without being plugged in? (starts with b)",
        answer: "battery",
        accept: ["a battery", "batteries", "batery"],
        explanation:
          "A battery stores energy in chemicals and turns it into electricity when the circuit is complete. A phone battery is rechargeable — charging pushes energy back in.",
      },
      {
        id: "w7-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "Uganda makes most of its electricity from dams on which river?",
        options: ["The River Nile", "The Amazon", "The Thames"],
        answer: "The River Nile",
        explanation:
          "Fast-flowing water from the Nile spins giant wheels called turbines inside dams like Bujagali near Jinja. The spinning turbines make electricity — this is called hydropower.",
      },
      {
        id: "w7-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question:
          "Japan has lots of volcanoes. Some of its electricity is made using the heat from deep underground. What is this called?",
        options: ["Geothermal energy", "Wind energy", "Moon energy"],
        answer: "Geothermal energy",
        explanation:
          "“Geo” means Earth and “thermal” means heat — Earth-heat! The same hot rocks that make Japan's hot springs (onsen) can heat water into steam to spin turbines.",
      },
      {
        id: "w7-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “denki” means electricity — and also the lights. If someone says “Denki o keshite!”, what are they asking?",
        options: ["Turn off the light!", "Open the window!", "Eat your dinner!"],
        answer: "Turn off the light!",
        explanation:
          "Denki o keshite (den-kee oh keh-shteh) = “turn off the light, please”. Saving electricity — Nikola Tesla would approve!",
      },
      {
        id: "w7-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “hi” means fire and “mizu” means water. Which one would you use to put out a campfire?",
        options: ["Mizu", "Hi", "Denki"],
        answer: "Mizu",
        explanation:
          "Mizu (mee-zoo) is water. If you're thirsty in Japan, ask for “mizu, kudasai” — water, please!",
      },
      {
        id: "w7-en-1",
        subject: "English",
        type: "multiple-choice",
        question: "Which word is spelled correctly?",
        options: ["electricity", "electrisity", "elecktricity"],
        answer: "electricity",
        explanation:
          "e-lec-tric-i-ty. Memory trick: it starts with the word “electric” — then just add “ity” on the end.",
      },
      {
        id: "w7-en-2",
        subject: "English",
        type: "type-answer",
        question: "Clap the beats in e-lec-tric-i-ty. How many syllables does it have? (answer with a number)",
        answer: "5",
        accept: ["five"],
        explanation:
          "e (1) - lec (2) - tric (3) - i (4) - ty (5). Clapping along is the best way to count syllables!",
      },
      {
        id: "w7-en-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which word joins these best? “The bulb didn't light up ___ the battery was flat.”",
        options: ["because", "but", "or"],
        answer: "because",
        explanation:
          "“Because” gives a REASON — why didn't the bulb light? Because the battery was flat. Words that join ideas are called conjunctions.",
      },
      {
        id: "w7-math-1",
        subject: "Math",
        type: "type-answer",
        question: "Batteries come in packs of 4. You need 18 batteries. How many packs must you buy?",
        answer: "5",
        accept: ["5 packs", "five", "five packs"],
        explanation:
          "4 packs give only 16 — two short! So you need 5 packs (20 batteries), with 2 left over. When you can't buy part of a pack, always round UP.",
      },
      {
        id: "w7-math-2",
        subject: "Math",
        type: "type-answer",
        question: "One unit of electricity costs 750 shillings. How much do 4 units cost? (in shillings)",
        answer: "3000",
        accept: ["3,000", "3000 shillings", "3,000 shillings", "shs 3000", "ugx 3000", "ugx 3,000"],
        explanation:
          "750 × 4: double 750 to get 1,500 (that's 2 units), then double again for 4 units = 3,000 shillings.",
      },
      {
        id: "w7-math-3",
        subject: "Math",
        type: "type-answer",
        question: "A lamp is switched on for 6 hours every day. How many hours is it on in one week?",
        answer: "42",
        accept: ["42 hours"],
        explanation: "A week has 7 days, so 6 × 7 = 42 hours. Times-table trick: 6 × 7 is the same as 7 × 6 — both 42!",
      },
    ],
  },

  // ───────────────────────────── Week 8 ─────────────────────────────
  {
    id: "2026-12-14",
    weekOf: "Week of December 14, 2026",
    opensOn: "2026-12-14",
    theme: "Space Explorers Week 🚀🌙",
    dadNote:
      "Space week — we're blasting off! Astronauts, the Moon, Mars robots, and the Japanese spacecraft that brought back pieces of an asteroid. Uganda even has its own satellite now! Finish this one and you're a real space explorer. Love, Daddy.",
    topics: ["Space", "Physics", "Japanese", "English", "Math"],
    resources: [
      { kind: "site", title: "All About the Moon (NASA Space Place)", description: "The Moon has about one-sixth of Earth's gravity — imagine the jumps! Explore craters, Moon rocks, and the astronauts who visited.", href: "https://spaceplace.nasa.gov/all-about-the-moon/en/", },
      { kind: "video", title: "Take a Tour of the Space Station (SciShow Kids)", description: "Some astronauts live in space for months! See how they eat, sleep, and float around on the ISS.", href: "https://www.youtube.com/watch?v=SOCixRhRGDw", minutes: 3, },
      { kind: "site", title: "How Do Astronauts Stay Alive in Space? (BBC Bitesize)", description: "Find out how spacesuits and the space station keep astronauts safe and healthy.", href: "https://www.bbc.co.uk/bitesize/topics/z8vxb7h/articles/zyq4wxs", },
      { kind: "video", title: "Meet the Mars Rovers! (SciShow Kids)", description: "Robots are driving around on Mars right now! Meet the rovers exploring the Red Planet.", href: "https://www.youtube.com/watch?v=ujh-dtEvyIw", minutes: 7, },
      { kind: "site", title: "The Sun (BBC Bitesize)", description: "The Sun is a star — the closest one to us! Learn why it shines and why life on Earth needs it.", href: "https://www.bbc.co.uk/bitesize/topics/z8vxb7h/articles/zbh2jsg", },
      { kind: "video", title: "Hayabusa2 Comes Home (JAXA)", description: "Watch an animation of Japan's Hayabusa2 capsule zooming home to Earth with pieces of an asteroid. (No sound — you narrate it!)", href: "https://www.youtube.com/watch?v=Hexvd8OV28A", minutes: 3, },
    ],
    questions: [
      {
        id: "w8-sci-1",
        subject: "Science",
        type: "multiple-choice",
        question: "Is the Sun a planet or a star?",
        options: ["A star", "A planet", "A moon"],
        answer: "A star",
        explanation:
          "The Sun is a star — a gigantic ball of glowing hot gas. The stars you see at night are suns too, just so far away they look like tiny dots.",
      },
      {
        id: "w8-sci-2",
        subject: "Science",
        type: "multiple-choice",
        question: "Why do astronauts float inside the International Space Station?",
        options: [
          "The station and everything in it are falling around the Earth together",
          "There's no gravity at all in space",
          "They wear special floating suits",
        ],
        answer: "The station and everything in it are falling around the Earth together",
        explanation:
          "Surprise: gravity up there is still almost as strong as on Earth! The station zooms sideways so fast that it keeps falling AROUND the Earth instead of into it. Everything falls together, so everything floats.",
      },
      {
        id: "w8-sci-3",
        subject: "Science",
        type: "multiple-choice",
        question: "Mars is called the Red Planet. Why is it red?",
        options: ["Its dust and rocks have lots of rust in them", "It's very hot, like fire", "It's covered in red plants"],
        answer: "Its dust and rocks have lots of rust in them",
        explanation:
          "Mars's soil contains iron, and iron + oxygen makes rust — the same orange-red you see on an old bicycle. Mars is actually very cold!",
      },
      {
        id: "w8-sci-4",
        subject: "Science",
        type: "multiple-choice",
        question: "You're standing on the Moon and you shout really loudly. What happens?",
        options: ["Nobody hears it — there's no air to carry the sound", "It echoes all over the Moon", "It sounds much louder than on Earth"],
        answer: "Nobody hears it — there's no air to carry the sound",
        explanation:
          "Sound is a wobble passed along through air (or water, or solid things). The Moon has no air, so sound can't travel. Astronauts talk to each other by radio!",
      },
      {
        id: "w8-sci-5",
        subject: "Science",
        type: "multiple-choice",
        question: "Astronauts left footprints on the Moon in 1969. Why are they probably still there today?",
        options: ["There's no wind or rain on the Moon to wipe them away", "The astronauts glued them", "The Moon is made of cement"],
        answer: "There's no wind or rain on the Moon to wipe them away",
        explanation:
          "On Earth, wind and rain wipe footprints away quickly. The Moon has no air and no weather, so footprints can last for a very, very long time.",
      },
      {
        id: "w8-sci-6",
        subject: "Science",
        type: "multiple-choice",
        question: "A rocket blasts hot gas out of its engines to go UP. Which way does the gas shoot out?",
        options: ["Down", "Up", "Sideways"],
        answer: "Down",
        explanation:
          "Every push has an equal push back the other way. The rocket shoves gas DOWN, and the gas shoves the rocket UP. Try it: let go of a blown-up balloon — air rushes one way, balloon zooms the other!",
      },
      {
        id: "w8-sci-7",
        subject: "Science",
        type: "multiple-choice",
        question: "What is the name of the force that keeps the Moon going round and round the Earth?",
        options: ["Gravity", "Friction", "Magnetism"],
        answer: "Gravity",
        explanation:
          "The same gravity that brings your football back down also holds the Moon in orbit around Earth — and holds Earth in orbit around the Sun!",
      },
      {
        id: "w8-tech-1",
        subject: "Tech",
        type: "multiple-choice",
        question:
          "Japan's space agency, JAXA, sent a spacecraft called Hayabusa2 to an asteroid. What amazing thing did it do?",
        options: [
          "Brought tiny pieces of the asteroid back to Earth",
          "Landed people on Mars",
          "Built a hotel on the Moon",
        ],
        answer: "Brought tiny pieces of the asteroid back to Earth",
        explanation:
          "Hayabusa2 travelled to an asteroid called Ryugu, collected samples, and dropped them back to Earth in a capsule in 2020. Scientists study them to learn how our solar system began.",
      },
      {
        id: "w8-tech-2",
        subject: "Tech",
        type: "multiple-choice",
        question: "Why can't scientists drive a Mars rover live with a joystick, like a video game?",
        options: [
          "Messages take several minutes to travel between Earth and Mars",
          "Mars doesn't have Wi-Fi passwords",
          "The rover only listens on Sundays",
        ],
        answer: "Messages take several minutes to travel between Earth and Mars",
        explanation:
          "Even at the speed of light, a signal takes between about 3 and 22 minutes to reach Mars. Imagine pressing “turn left” and waiting 10 minutes! So rovers get a plan of instructions and partly drive themselves.",
      },
      {
        id: "w8-geo-1",
        subject: "Geography",
        type: "multiple-choice",
        question: "In 2022, Uganda put its very first satellite into space! What was it called?",
        options: ["PearlAfricaSat-1", "Hayabusa", "Apollo 11"],
        answer: "PearlAfricaSat-1",
        explanation:
          "Uganda is nicknamed “the Pearl of Africa”, so its first satellite was named PearlAfricaSat-1. It was built with help from Japan and launched from the International Space Station!",
      },
      {
        id: "w8-geo-2",
        subject: "Geography",
        type: "multiple-choice",
        question: "Rockets are often launched from places near the equator (like the line through Uganda). Why?",
        options: [
          "Earth spins fastest at the equator, giving rockets a free speed boost",
          "It's always cloudy at the equator",
          "There are fewer birds there",
        ],
        answer: "Earth spins fastest at the equator, giving rockets a free speed boost",
        explanation:
          "The Earth spins, and the middle (the equator) moves fastest — about 1,600 km per hour! A rocket launched eastward from there gets that speed for free, saving fuel.",
      },
      {
        id: "w8-jp-1",
        subject: "Japanese",
        type: "multiple-choice",
        question: "In Japanese, “tsuki” means the Moon. What does “hoshi” mean?",
        options: ["Star", "Sun", "Rocket"],
        answer: "Star",
        explanation: "Hoshi (hoh-shee) means star. Next clear night, look up and count the hoshi — in Japanese!",
      },
      {
        id: "w8-jp-2",
        subject: "Japanese",
        type: "multiple-choice",
        question: "What is “taiyou” in Japanese?",
        options: ["The Sun", "The Moon", "The sea"],
        answer: "The Sun",
        explanation:
          "Taiyou (tie-yoh) is the Sun. Japan's name in Japanese, Nihon, means “origin of the sun” — that's why Japan is called the Land of the Rising Sun.",
      },
      {
        id: "w8-jp-3",
        subject: "Japanese",
        type: "multiple-choice",
        question: "An astronaut goes to “uchuu”. Where is that?",
        options: ["Space", "The beach", "School"],
        answer: "Space",
        explanation:
          "Uchuu (oo-choo) means space or the universe. A Japanese astronaut is called an “uchuu hikoushi” — a space flyer!",
      },
      {
        id: "w8-en-1",
        subject: "English",
        type: "type-answer",
        question: "One galaxy, two ______? (write the plural)",
        answer: "galaxies",
        accept: ["galaxys"],
        explanation:
          "When a word ends in a consonant + y, change the y to i and add -es: galaxy → galaxies, story → stories, baby → babies.",
      },
      {
        id: "w8-en-2",
        subject: "English",
        type: "multiple-choice",
        question: "“Astro” comes from an old Greek word meaning “star”. Which word is about studying stars and space?",
        options: ["Astronomy", "Biology", "Geography"],
        answer: "Astronomy",
        explanation:
          "Astro = star. Astronomy is the study of stars and space, and an astronaut is a “star sailor”! Biology is the study of living things, geography is the study of places.",
      },
      {
        id: "w8-en-3",
        subject: "English",
        type: "multiple-choice",
        question: "Which sentence uses capital letters correctly?",
        options: [
          "The rover landed on Mars.",
          "The rover landed on mars.",
          "the Rover landed on Mars.",
        ],
        answer: "The rover landed on Mars.",
        explanation:
          "Sentences start with a capital letter, and so do names of particular places, like Mars, Uganda, and Tokyo. “Rover” is just a thing, so it doesn't need one.",
      },
      {
        id: "w8-math-1",
        subject: "Math",
        type: "multiple-choice",
        question:
          "The Moon's gravity is about 1/6 as strong as Earth's. If you can jump 30 cm high on Earth, about how high could you jump on the Moon?",
        options: ["About 180 cm", "About 5 cm", "About 30 cm"],
        answer: "About 180 cm",
        explanation:
          "With gravity 6 times weaker, the same jump goes about 6 times higher: 30 × 6 = 180 cm — taller than Daddy!",
      },
      {
        id: "w8-math-2",
        subject: "Math",
        type: "type-answer",
        question:
          "A backpack weighs 30 kg on Earth. The Moon's gravity is 1/6 of Earth's. How many kg would it feel like on the Moon?",
        answer: "5",
        accept: ["5 kg", "5kg", "five"],
        explanation:
          "1/6 of 30 means 30 ÷ 6 = 5. The backpack is still made of exactly the same stuff — it's just pulled down less, so it feels like 5 kg.",
      },
      {
        id: "w8-math-3",
        subject: "Math",
        type: "type-answer",
        question:
          "The International Space Station goes all the way round the Earth about every 90 minutes. How many times does it go round in one day (24 hours)?",
        answer: "16",
        accept: ["16 times", "sixteen"],
        explanation:
          "90 minutes is 1½ hours. In 3 hours it goes round twice, so in 24 hours: 24 ÷ 3 = 8, and 8 × 2 = 16 times. That's 16 sunrises a day for the astronauts!",
      },
    ],
  },
];

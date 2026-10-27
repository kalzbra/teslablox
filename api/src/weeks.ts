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
];

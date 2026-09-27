/**
 * Cleaned transcription of "Tesla's Memory Book while in Kabale," a memory book Tesla wrote,
 * typed, and printed himself with his grandmother's help (photographed pages in
 * `teslas-trip/`, processed to `public/trip/page-01.webp` … `page-11.webp` in reading order).
 * Spelling/grammar cleaned up for readability; Tesla's voice, sequence, and every named person,
 * place, and event are preserved exactly as he wrote them — nothing here is invented.
 * See internal-notes/kabale-trip.md for the raw transcription this was cleaned from.
 */

export const kabaleMeta = {
  title: "Tesla's Memory Book while in Kabale",
  subtitle: "A travel story written by Tesla",
  dateRange: "27 August – 9 September 2026",
  pageCount: 11,
};

export type KabaleChapter = {
  id: string;
  dateLabel: string;
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
};

export const kabaleChapters: KabaleChapter[] = [
  {
    id: "setting-off",
    dateLabel: "27 August 2026",
    heading: "Setting Off for Kabale",
    paragraphs: [
      "Tesla woke up, greeted his mother, and went to shower. After that he dressed up, went to the living room, and ate breakfast. “Mom, who will take me to the village?” Tesla asked. “You will go with your grandfather,” his mother answered, so Tesla sat down quietly and waited.",
      "When his grandfather arrived, Tesla grabbed his suitcase, said goodbye to his mother, and rushed downstairs to open the gate. He got in the car, and they drove to the bus park and boarded the bus to Kabale.",
    ],
    pullQuote: "Mom, who will take me to the village?",
  },
  {
    id: "the-journey",
    dateLabel: "27 August 2026",
    heading: "The Journey to Kabale",
    paragraphs: [
      "On the way, Tesla got hungry and asked his grandfather, “May I eat some cookies?” He said yes — and after eating them, Tesla pointed out that they'd forgotten important food like bread and water. Then Tesla decided to take a nap.",
      "When they reached Kabale, they stopped at a fuel station, found their car, and drove on. They stopped at a fish shop to buy fish, then went home, where Tesla ran to give his grandmother a big hug. He met a girl there and asked, “Is this Ayebare?” “No, this is Patience,” they told him. Tesla sat down, enjoyed dinner, took a shower, and went to bed.",
    ],
    pullQuote: "May I eat some cookies?",
  },
  {
    id: "first-days",
    dateLabel: "28–30 August 2026",
    heading: "First Days in the Village",
    paragraphs: [
      "The next day, Tesla woke up and greeted everyone in the house. After breakfast his grandmother left for work, leaving Tesla at home with Patience and Shwenkuru (his grandfather). Patience washed clothes while Tesla washed shoes, and his friend Lea came to help. After lunch, Tesla and Patience went with Lea to see his friend Ayebare at her home.",
      "On Saturday the 29th, his grandmother asked if he wanted to come to a wedding, and he said yes — they went and enjoyed the wedding of Drake and Abia. Back home, Tesla went inside and wrote an advertisement for his mother.",
      "The next day, a Sunday, they had planned to go to church but were too busy, so Tesla watched television instead. His friend Lea came back for lunch, along with a girl named Whitney and her cousin Alvin, and they all had fun watching television together. Late in the evening, once Whitney and Alvin had gone home, Tesla and Patience kept watching until his grandmother served supper. They said their prayers and went to bed.",
    ],
  },
  {
    id: "village-rhythm",
    dateLabel: "31 August – 1 September 2026",
    heading: "Settling Into Village Life",
    paragraphs: [
      "On Monday the 31st, his grandmother went to work, leaving Tesla with Shwenkuru and Patience to do his holiday homework. She joined them again in the evening.",
      "On Tuesday the 1st of September, Tesla went with Kaaka (his grandmother) to the Diocese of Kigezi Headquarters and the Bishop's Office, where the Bishop's secretary kindly gave him a samosa and Kaaka prayed for her. Afterward they went to the canteen, where Kaaka bought him a chapati, then back to her workplace, where she made him tea and he ate a banana, chapati, and bread.",
    ],
  },
  {
    id: "town-and-play",
    dateLabel: "2–4 September 2026",
    heading: "Trips to Town and a Small Accident",
    paragraphs: [
      "On the 2nd, Tesla went to town with his grandmother and Patience, where they bought things for the house plus clothes and snacks. Back home, Tesla tried on the new clothes Kaaka had bought him.",
      "On the 3rd, after breakfast, Tesla and Patience played with a ball Kaaka had brought him — until Tesla had a little accident and asked, “Kaaka, will it stop hurting?” She told him not to worry, and soon he felt okay again.",
      "On the 4th, Tesla, Patience, and Kaaka went to the canteen for chapati, then to church for the Diocese of Kigezi to pray before heading home.",
    ],
    pullQuote: "Kaaka, will it stop hurting?",
  },
  {
    id: "storm-and-sunday",
    dateLabel: "5–6 September 2026",
    heading: "A Stormy Night and Sunday School",
    paragraphs: [
      "On the 5th, Shwenkuru and Kaaka went to another wedding while Tesla and Patience stayed home. It rained hard and the power went out, which scared Tesla — but Kaaka came home and cooked for everyone, and Shwenkuru arrived later.",
      "On the 6th, Tesla went to church with Shwenkuru and enjoyed Sunday school. Back home, he spent the rest of the day with Patience, playing and watching Zee World and Bluey.",
    ],
  },
  {
    id: "busy-workdays",
    dateLabel: "7–9 September 2026",
    heading: "Busy Days at Kaaka's Workplace",
    paragraphs: [
      "On the 7th, Tesla got ready and went with Kaaka to her workplace for a busy day full of work — by the time they got home, they were already tired.",
      "On the 8th, after breakfast, Tesla went along again, and that evening they showered, watched television, had dinner, prayed together, and went to bed.",
      "On the 9th, Tesla woke up to find everyone mopping, so he stayed in bed until tea and cake were served. Then he went with Kaaka to her workplace, where he even got a turn playing on her phone.",
    ],
  },
  {
    id: "making-the-book",
    dateLabel: "9 September 2026",
    heading: "Making the Memory Book",
    paragraphs: [
      "Later that day, Tesla asked, “Are we going to town?” and his grandmother said yes, which made him excited. They called his aunt Pretty and chatted for a while.",
      "Then Tesla himself wrote, photocopied, and printed this very book with his grandmother's help — the two of them worked together and put a lot of effort into making it, enjoying their time at the workplace until it was time to go to town.",
      "Tesla and his grandmother pray together every night to be blessed. This is a lesson in Tesla's memory book: we love you all, and stay blessed. Amen.",
    ],
    pullQuote: "Are we going to town?",
  },
];

export const kabaleClosing = {
  line: "This is the end of Tesla's memory book — a story made in Uganda, created on 9th September 2026, and written by Tesla Riley Shyaka.",
};

export type TimelineStep = {
  label: string;
  dateLabel: string;
};

export const kabaleTimeline: TimelineStep[] = [
  { label: "Setting off from home", dateLabel: "27 Aug" },
  { label: "Bus journey to Kabale", dateLabel: "27 Aug" },
  { label: "Reuniting with Kaaka and Shwenkuru", dateLabel: "27 Aug" },
  { label: "A wedding celebration (Drake & Abia)", dateLabel: "29 Aug" },
  { label: "Visiting the Diocese of Kigezi", dateLabel: "1, 4, 6 & 8 Sep" },
  { label: "A little accident while playing ball", dateLabel: "3 Sep" },
  { label: "A stormy night with no power", dateLabel: "5 Sep" },
  { label: "Busy days at Kaaka's workplace", dateLabel: "7–9 Sep" },
  { label: "Writing and printing the memory book", dateLabel: "9 Sep" },
];

/**
 * Canonical reading order of the original photographed journal pages.
 * Filenames map to processed images at /trip/page-01.webp … page-11.webp (see
 * scripts/process-images.mjs). Page 1 is the unnumbered title page.
 */
export const kabaleOriginalPages = [
  { order: 1, printedPage: "Title page", file: "5DF7367A-2186-46DC-8247-B4C5D8881796.jpg" },
  { order: 2, printedPage: "Page 2", file: "4C72D10C-DE19-453B-A72B-5B8CA055596B.jpg" },
  { order: 3, printedPage: "Page 3", file: "25DA4056-468D-4147-8286-68FF95AEB576.jpg" },
  { order: 4, printedPage: "Page 4", file: "A2C0C7F7-81C8-4845-AC4E-EEE8B45DB30D.jpg" },
  { order: 5, printedPage: "Page 5", file: "0BFFBE33-9B62-4D88-9DFA-EEFA027B55D2.jpg" },
  { order: 6, printedPage: "Page 6", file: "BC0DA54D-212F-47C2-8A09-BB57305F1A92.jpg" },
  { order: 7, printedPage: "Page 7", file: "7C5BA684-872F-4C9B-9FE7-C964B4ABE7BA.jpg" },
  { order: 8, printedPage: "Page 8", file: "CB92CF04-8D28-4DEC-B5C8-96806A23E80B.jpg" },
  { order: 9, printedPage: "Page 9", file: "9E87F002-B7A8-4661-AFA0-74E8B55C00BD.jpg" },
  { order: 10, printedPage: "Page 10", file: "98A5E111-3F7D-4910-8AC8-7A381671DFE5.jpg" },
  { order: 11, printedPage: "Page 11", file: "7CF093D8-A1BC-4860-94A3-99E189B411B1.jpg" },
] as const;

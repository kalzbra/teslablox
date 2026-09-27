# Build Specification: Tesla’s World

## 1. Project Overview

Build a beautiful, responsive, interactive personal website for a child named **Tesla Riley Shyaka**.

The website should feel like a **digital scrapbook, personal portfolio, family memory book, adventure journal, and fun kids’ website** combined.

The central theme is:

> **⚡ Tesla’s World — Adventures • Family • Fun • Dreams • Science**

The website should be visually appealing to children while still looking polished enough that parents will enjoy exploring it.

The site should prominently use Tesla's real photographs from the project's `photos/` folder.

A second folder, `teslas-trip/`, contains photographs of Tesla's handwritten travel journal about his trip to Kabale. Extract the writing from these images, correct obvious spelling/grammar mistakes while preserving Tesla's original meaning and personality, and present the result in a dedicated section called:

> **Tesla Trip to Kabale**

Do not invent any information that is not supported by Tesla's writing or the supplied material.

---

# 2. Core Design Direction

## Overall personality

The site should feel:

* Bright
* Playful
* Warm
* Curious
* Adventurous
* Family-oriented
* Educational
* Modern
* Interactive

Avoid making it look like a school administration website or a generic children's template.

It should feel like:

> **“This is Tesla's own little world on the internet.”**

## Visual theme

Use a subtle **electricity / lightning / energy** theme inspired by Tesla's name and Nikola Tesla.

Use visual elements such as:

* Lightning bolts
* Stars
* Spark effects
* Clouds
* Energy lines
* Rounded cards
* Large photographs
* Colorful but tasteful backgrounds
* Soft shadows
* Playful icons
* Smooth transitions

Do not overuse lightning graphics. They should be a recurring design language rather than the entire interface.

## Typography

Use friendly, highly readable typography.

Headings can be playful and distinctive, while body text should remain easy to read.

The website must be comfortable to use on:

* Desktop
* Laptop
* Tablet
* Mobile phone

---

# 3. Recommended Technology

Use a modern, maintainable frontend implementation.

Preferred stack:

* Next.js
* TypeScript
* React
* Tailwind CSS
* Local/static assets
* Component-based architecture

Do not introduce a backend, database, authentication system, or unnecessary complexity.

The site should be deployable as a static or largely static website.

Keep Tesla's content in structured data files wherever practical so that the website can easily be updated later.

For example:

```text
src/
  components/
  pages/
  data/
    tesla.ts
    favorites.ts
    family.ts
    trip.ts
  styles/
```

---

# 4. Important Privacy Requirements

Tesla is a child.

Design the website with child privacy in mind.

Do NOT publicly display:

* His exact full date of birth
* Home address
* School name
* School location
* Daily routine
* Personal telephone number
* Parents' personal contact details
* Exact current location
* Other sensitive identifying information

Tesla's full date of birth is:

> 18 December 2017

Keep this information available in the project's private data if needed, but do not prominently publish the exact date on a public-facing site.

Public-facing wording should instead be something like:

> **Born in 2017**

or simply omit his birth year altogether.

Also:

* Do not expose GPS coordinates from photographs.
* Strip or ignore EXIF/GPS metadata when preparing images for web use.
* Do not create public comments.
* Do not create a public chat.
* Do not create accounts for children.
* Do not collect unnecessary visitor information.
* Do not add unnecessary analytics or tracking.
* Do not create a public contact form.

The site can be designed so it is suitable for private family sharing even if it is technically deployed on the web.

---

# 5. Tesla's Core Profile

Use the following information as the authoritative profile.

## Name

**Tesla Riley Shyaka**

## Grade

**Primary 3**

## Birth

**2017**

His actual date of birth is December 18, 2017, but do not display the full date publicly.

## Parents

### Dad

**Abraham**

Abraham works as an **AI Engineer in Tokyo, Japan**.

### Mom

**Brenda**

## Cousins

Tesla enjoys spending time with his cousins:

* Leora
* Asante
* Munashe
* Amaani
* Simba
* Krystal
* Tendo

---

# 6. Tesla's Personality

Create a warm biography rather than simply presenting adjectives as a list.

Suggested website copy:

> **Meet Tesla**
>
> Tesla Riley Shyaka is a bright, curious, kind, and energetic young boy who loves learning, creating, exploring, and having fun with the people around him.
>
> He is loved deeply by his family, especially by his parents. Tesla is known for being smart, sweet, hardworking, kind, and thoughtful. He has a natural curiosity about electronics and enjoys figuring out how things work.
>
> Tesla also loves music, games, sports, movies, storytelling, and spending time with his cousins. He enjoys creating things and dreams of becoming a famous YouTube star one day.
>
> His family hopes that as he grows, he will continue exploring his interests, discovering his talents, and becoming whatever kind of person he chooses to become.

The phrase **“God-fearing”** may be represented respectfully in the profile as:

> **Faithful and grounded in his family's values**

Do not make religion the dominant theme of the website unless additional content is provided.

---

# 7. Homepage

Create a visually impressive homepage.

## Hero section

Large Tesla photograph.

Headline:

> **Welcome to Tesla’s World! ⚡**

Subheading:

> **Adventures • Family • Fun • Dreams • Science**

Short introduction:

> Hi! I'm Tesla Riley Shyaka. Welcome to my little corner of the internet, where you can discover the things I love, see my adventures, meet my family, explore my favorite characters, and learn why I was named after one of the world's most famous inventors.

Include prominent interactive buttons:

* **Meet Tesla**
* **Explore My Favorites**
* **See My Adventures**
* **Visit the Tesla Gallery**
* **Meet Nikola Tesla**

Use animated hover effects and subtle transitions.

---

# 8. Homepage Interactive Highlights

Immediately below the hero section, create colorful cards for:

### 🎮 Gaming

Tesla loves playing games, especially Roblox.

### 🎤 Singing

Tesla enjoys singing and music.

### 🎬 YouTube

Tesla loves making videos and dreams of becoming a YouTube star.

### ⚽ Football

Tesla enjoys football.

### 🏊 Swimming

Tesla likes swimming.

### 👨‍👩‍👧‍👦 Family

Tesla loves playing with his cousins.

### 🌊 Moana

Moana is one of Tesla's favorite characters.

### ❄️ Elsa

Elsa is another favorite character.

### 🕷️ Spider-Man

Tesla also enjoys Spider-Man.

Each card should be interactive and lead to the relevant section.

---

# 9. About Tesla Page

Create a dedicated **About Tesla** page.

Sections:

## Who Is Tesla?

Use the polished biography above.

## Tesla at a Glance

Show a friendly profile card:

```text
Name: Tesla Riley Shyaka
Grade: Primary 3
Born: 2017
Loves: Games, music, sports, videos, family and adventure
Favorite characters: Elsa and Moana
Dream: Becoming a YouTube star
```

Do not display his exact birthday.

## What Makes Tesla Special?

Create a visually engaging list/cards highlighting:

* Kind
* Smart
* Curious
* Hard-working
* Sweet
* Creative
* Good with electronics
* Family-oriented
* Loves learning
* Loves creating

---

# 10. My Favorites Page

Create an interactive page titled:

> **Things Tesla Loves ❤️**

Create cards for each major interest.

## Roblox

Suggested copy:

> Tesla loves playing Roblox and enjoys exploring virtual worlds, playing games, and having fun.

Add an external link to the official Roblox website.

Do not embed unofficial downloads or suspicious third-party links.

## Singing

Suggested copy:

> Tesla enjoys singing and loves music. Music is one of the ways he expresses himself and has fun.

## YouTube

Suggested copy:

> Tesla loves making videos and dreams of becoming a YouTube star one day.

Include a link to YouTube's official site.

Do not create or expose a child-managed public account through this website.

## Football

Suggested copy:

> Tesla enjoys football and loves the energy, excitement, and fun that come with playing the game.

## Swimming

Suggested copy:

> Tesla enjoys swimming and having fun in the water.

## Moana

Suggested copy:

> Moana is one of Tesla's favorite characters. He enjoys her adventures, courage, and love of exploration.

Link to an official Disney resource where appropriate.

## Elsa

Suggested copy:

> Elsa is one of Tesla's favorite characters. He loves the world of Frozen and its music and characters.

Link only to appropriate official Disney resources.

## Spider-Man

Suggested copy:

> Tesla also enjoys Spider-Man and the exciting world of superheroes.

Use official Marvel resources where practical.

---

# 11. Favorite Song

Create a dedicated music card:

## 🎵 Tesla's Favorite Song

> **“Golden” — HUNTR/X**

Add a visually attractive music card.

Link to an official/authorized source such as YouTube Music, YouTube, Spotify, or another legitimate service where the song is available.

Do not host copyrighted audio files on the site.

If an appropriate official source is available, display an external-link icon.

---

# 12. Tesla's Dreams

Create a fun dedicated page or large homepage section:

# 🚀 Tesla's Dreams

The story should present both perspectives positively.

## Tesla's Dream

> **“I want to become famous and be a YouTube star.”**

Then expand:

> Tesla loves making videos and sharing ideas. He dreams of becoming a successful YouTube creator someday.

## Dad's Dream

> **“Dad thinks Tesla could become a famous scientist.”**

Then expand:

> Tesla's dad, Abraham, works in artificial intelligence and hopes Tesla will grow up to explore science, technology, and discovery.

## The Fun Twist

End with:

> **Maybe Tesla will become both! ⚡🎥🔬**
>
> A scientist who makes amazing videos.
>
> A YouTuber who teaches people about science.
>
> Or perhaps something completely different.
>
> The future belongs to Tesla to discover.

Do not portray either dream as the correct choice.

---

# 13. Why Is He Called Tesla?

Create a prominent section explaining the origin of his name.

Title:

> **⚡ Why Is His Name Tesla?**

Suggested copy:

> Tesla was named after **Nikola Tesla**, one of history's best-known inventors and electrical pioneers.
>
> Nikola Tesla helped develop important electrical systems and ideas that changed the way people used electricity. He worked with alternating-current electricity, helped develop electric motors, experimented with wireless communication and control, and became famous for exciting experiments involving electricity.
>
> His work helped inspire generations of scientists, engineers, inventors, and dreamers.

Keep the explanation child-friendly and non-technical.

---

# 14. Nikola Tesla Page

Create a separate educational page:

> **Nikola Tesla ⚡**

Suggested sections:

## Who Was Nikola Tesla?

Explain that he was an inventor and scientist who worked with electricity and new technologies.

## Things Nikola Tesla Is Famous For

Use simple cards:

### ⚡ Alternating-Current Electricity

He helped develop electrical systems based on alternating current, which became important for delivering electricity over long distances.

### 🔄 Electric Motors

He developed important ideas and inventions involving motors powered by alternating current.

### ⚡ Tesla Coil

He invented the Tesla coil, a device famous for producing impressive high-voltage electrical effects.

### 🚤 Wireless Control

He demonstrated an early radio-controlled boat, showing that machines could be controlled from a distance.

Do not make exaggerated claims such as “Nikola Tesla invented electricity” or “invented everything.”

## Tesla Connection

Create a visual link:

```text
Nikola Tesla
      ↓
Science + Invention + Electricity
      ↓
Tesla Riley Shyaka
      ↓
Curiosity + Technology + Dreams
```

The tone should be inspirational rather than implying Tesla Riley must become a scientist.

Include links to reputable educational sources such as museums, universities, or other trustworthy educational resources.

---

# 15. Tesla's Adventures

Create a major navigation item:

> **Adventures 🌍**

This section should eventually contain Tesla's trips and travel stories.

The first major adventure is:

> **Tesla Trip to Kabale**

---

# 16. Tesla Trip to Kabale

Create a dedicated page/tab called exactly:

> **Tesla Trip to Kabale**

This is an especially important page.

The project contains a folder:

```text
tesla-trip/
```

The folder contains photographs of Tesla's handwritten travel journal.

## Required workflow

Before finalizing the page:

1. Inspect every image in `tesla-trip/`.
2. Determine the correct sequence of the pages.
3. Extract Tesla's writing from the images.
4. Correct obvious spelling mistakes.
5. Correct grammar only where necessary for readability.
6. Preserve Tesla's original meaning, personality, storytelling, and sequence.
7. Do not invent missing words or events.
8. Do not substantially rewrite the story into an adult voice.
9. Maintain Tesla's perspective.
10. Compare the cleaned text against the original photographs.

The final page should be a **polished version of Tesla's own travel journal**, not a completely new story.

If a handwritten word is genuinely impossible to determine, do not invent it. Use the context carefully and flag the uncertainty in an internal project note.

---

# 17. Kabale Journal Presentation

Make the journal feel like a real adventure story.

Page layout:

## Header

> **Tesla's Trip to Kabale 🚗🌍**

Subtitle:

> *A travel story written by Tesla*

## Original Writing

Show Tesla's original handwritten journal pages in a beautiful image gallery.

Allow users to click an image to enlarge it.

## My Trip to Kabale

Below the originals, present a clean, readable transcription.

Possible styling:

* Journal-card layout
* Notebook/paper effect
* Chapter sections
* Large pull quotes
* Small travel icons
* Embedded photographs between story sections

## Trip Photos

Use relevant photos from the same folder or other provided photos where appropriate.

## Adventure Timeline

Where the journal provides enough information, create a simple timeline such as:

```text
Start of trip
    ↓
Journey
    ↓
Things Tesla saw
    ↓
Things Tesla did
    ↓
Favorite moments
    ↓
Return home
```

Only include events that are supported by Tesla's writing.

---

# 18. Preserve Tesla's Original Voice

This is important throughout the site.

Whenever something comes directly from Tesla, make it clear that it is his voice.

For example:

> **Tesla says...**

Use direct quotations when appropriate.

For the Kabale diary in particular, distinguish between:

### Tesla's Original Writing

The scanned/photographed journal.

### Cleaned-Up Version

The carefully edited transcription.

Do not make Tesla sound like an adult author.

His personality and age should remain visible in his writing.

---

# 19. Tesla Photo Gallery

Create a beautiful gallery page:

> **📸 Tesla's Gallery**

Use photographs from:

```text
photos/
```

Automatically discover supported image formats such as:

* JPG
* JPEG
* PNG
* WEBP

Do not require manually entering every filename.

## Gallery features

Include:

* Responsive image grid
* Lazy loading
* Thumbnail generation where useful
* Click-to-enlarge lightbox
* Previous/next navigation
* Keyboard navigation
* Smooth transitions
* Mobile-friendly layout

Where possible, categorize images based on filename/folder information without inventing metadata.

Potential categories:

* Family
* Cousins
* Adventures
* Sports
* Swimming
* Singing
* Fun
* Everyday Tesla

Only show categories when there are actually photos supporting them.

---

# 20. Random Photo Feature

Add a playful feature:

> **🎲 Show Me a Random Tesla Photo**

Clicking the button should select a random photograph from the available gallery.

Add a small animation when the new image appears.

---

# 21. Cousins Section

Create:

> **👨‍👩‍👧‍👦 Tesla & His Cousins**

Introduce:

> Tesla loves spending time with his cousins. They are an important part of his family adventures and fun.

Display the names as friendly cards:

* Leora
* Asante
* Munashe
* Amaani
* Simba
* Krystal
* Tendo

Do not expose additional information about the cousins unless it is explicitly supplied later.

If photos are available, associate them carefully.

Do not guess who is in a photograph.

---

# 22. Fun Zone

Create a dedicated interactive section:

> **🎮 Tesla's Fun Zone**

Include lightweight interactions rather than complicated games.

## Tesla Quiz

Example questions:

> What is Tesla's favorite Disney character?

Answer:

> Elsa!

Another:

> Which game does Tesla enjoy playing?

Answer:

> Roblox!

Another:

> What does Tesla dream of becoming?

Answer:

> A YouTube star!

Another:

> Which famous inventor was Tesla named after?

Answer:

> Nikola Tesla!

Use simple animations for correct answers.

Do not create a competitive leaderboard.

---

# 23. Random Tesla Fact

Create a button:

> **✨ Tell Me Something About Tesla**

When clicked, display a randomly selected fact from the approved Tesla data.

Example facts:

* Tesla loves Roblox.
* Tesla enjoys singing.
* Tesla likes swimming.
* Tesla loves playing with his cousins.
* Elsa is one of Tesla's favorite characters.
* Moana is one of Tesla's favorite characters.
* Tesla dreams of becoming a YouTube star.
* Tesla is good with electronics.
* Tesla enjoys football.
* Tesla was named after Nikola Tesla.

Only use facts contained in the project's approved data.

---

# 24. Interactive Navigation

Use a clear navbar.

Suggested navigation:

```text
Home
About Tesla
Favorites
Adventures
Gallery
Dreams
Nikola Tesla
Fun Zone
```

On mobile, use a hamburger menu.

Keep the navigation easy for a child to understand.

Use icons where appropriate but ensure text labels remain visible or accessible.

---

# 25. Animations

Animations should make the website fun without becoming distracting.

Use:

* Fade-ins
* Slide-ins
* Gentle floating effects
* Button hover animations
* Card hover effects
* Image transitions
* Subtle lightning/spark effects

Avoid:

* Constant flashing
* Loud visual effects
* Excessive particle systems
* Animations that significantly slow down the site
* Automatic music
* Anything that makes the website difficult to navigate

Respect the user's reduced-motion preference using:

```css
prefers-reduced-motion
```

---

# 26. Audio

Do NOT automatically play music.

If the favorite song is linked, the user must deliberately click to visit or play it.

Do not bundle copyrighted songs into the website.

---

# 27. Image Handling

Images are one of the most important parts of the project.

Use Tesla's supplied photos as the primary imagery.

The website should:

* Optimize image loading
* Use responsive image sizes
* Avoid unnecessarily huge downloads
* Preserve good visual quality
* Lazy-load images outside the initial viewport
* Provide descriptive alt text where the subject can be confidently identified

Do not invent descriptions such as “Tesla smiling at the beach” unless the photograph actually supports that description.

When uncertain, use a neutral description such as:

> Tesla — photo from his family collection

Strip GPS/EXIF information from copies used for public deployment where possible.

---

# 28. Copyright and External Links

For Roblox, Disney/Frozen/Moana, Spider-Man/Marvel, YouTube, music, etc.:

Do not scrape or download copyrighted images, videos, songs, or other media simply to decorate the website.

Prefer:

* Tesla's supplied personal photographs
* Original CSS illustrations
* Icons
* Properly licensed assets
* Links to official websites

External links should open safely and clearly indicate that the user is leaving Tesla's website.

---

# 29. Accessibility

The site should be accessible.

Include:

* Keyboard navigation
* Meaningful button labels
* Alt text for images
* Sufficient color contrast
* Visible focus states
* Semantic HTML
* Accessible mobile navigation
* Lightbox keyboard controls
* Reduced-motion support

Do not communicate important information through color alone.

---

# 30. Responsive Design

The website must work well on:

### Desktop

Use the full visual experience with larger cards and photo grids.

### Tablet

Reduce grid columns and typography appropriately.

### Mobile

Prioritize:

* Large images
* Simple navigation
* Large touch targets
* One- or two-column cards
* Comfortable text size
* Minimal clutter

Do not simply shrink the desktop version.

Design mobile deliberately.

---

# 31. Suggested Homepage Structure

Use this order:

```text
------------------------------------------------
Hero
"Welcome to Tesla's World!"
Tesla photograph
------------------------------------------------

Quick Intro
"Meet Tesla"
------------------------------------------------

Things Tesla Loves
Roblox | Singing | YouTube | Football
Moana | Elsa | Spider-Man | Swimming
------------------------------------------------

Tesla's Adventures
Kabale trip preview + photos
------------------------------------------------

Tesla's Dreams
YouTube Star 🎥 vs Scientist 🔬
------------------------------------------------

Why Is He Called Tesla?
Nikola Tesla introduction
------------------------------------------------

Photo Highlight
Large Tesla photographs
------------------------------------------------

Meet Tesla's Cousins
Family cards
------------------------------------------------

Fun Zone
Quiz + Random Fact + Random Photo
------------------------------------------------

Footer
Tesla's World ⚡
```

---

# 32. Homepage Photo Selection

Automatically select several strong images from the `photos/` collection for the homepage.

Do not repeatedly show the exact same photograph everywhere.

The homepage should feel dynamic while remaining fast.

Use a mixture of:

* Hero photo
* Smaller supporting photos
* Gallery preview
* Adventure photos

Where the identity of people in the photos is uncertain, do not invent names.

---

# 33. Content Architecture

Put the core profile in structured data.

For example:

```ts
export const tesla = {
  name: "Tesla Riley Shyaka",
  grade: "Primary 3",
  birthYear: 2017,
  father: {
    name: "Abraham",
    occupation: "AI Engineer",
    location: "Tokyo, Japan"
  },
  mother: {
    name: "Brenda"
  },
  cousins: [
    "Leora",
    "Asante",
    "Munashe",
    "Amaani",
    "Simba",
    "Krystal",
    "Tendo"
  ],
  interests: [
    "Roblox",
    "Singing",
    "YouTube",
    "Moana",
    "Football",
    "Disney characters",
    "Elsa",
    "Songs",
    "Spider-Man",
    "Swimming",
    "Playing with cousins"
  ],
  favoriteCharacters: [
    "Elsa",
    "Moana"
  ],
  favoriteSong: {
    title: "Golden",
    artist: "HUNTR/X"
  },
  dream: "To become a YouTube star"
}
```

Keep the exact birthday out of the public UI data.

---

# 34. Component Architecture

Build reusable components such as:

```text
Navbar
HeroSection
ProfileCard
InterestCard
FavoriteCard
PhotoGrid
PhotoLightbox
AdventureCard
TripJournal
DreamCard
FamilyCard
Quiz
RandomFact
RandomPhoto
NikolaTeslaCard
Footer
```

Avoid putting the entire site into one giant React component.

---

# 35. Performance

The site must remain fast even with many photographs.

Implement:

* Image lazy loading
* Responsive image sizing
* Code splitting where appropriate
* Minimal JavaScript
* Optimized fonts
* Avoid unnecessary third-party libraries
* Avoid large animation libraries unless necessary

Test the site with a reasonably large number of photographs.

---

# 36. SEO and Metadata

Use appropriate metadata.

Suggested title:

> Tesla's World | Tesla Riley Shyaka

Suggested description:

> Explore Tesla Riley Shyaka's world of family, adventures, favorite things, dreams, photographs, and fun.

Do not put his exact date of birth into public metadata.

---

# 37. Footer

Create a simple warm footer:

> **⚡ Tesla's World**
>
> Adventures • Family • Fun • Dreams • Science
>
> Made with love for Tesla.

Do not expose personal contact information.

---

# 38. Final Content Tone

The writing should consistently be:

* Warm
* Positive
* Child-friendly
* Natural
* Simple
* Encouraging
* Personal

Avoid making the website sound corporate.

Avoid excessive words like:

* Exceptional
* Extraordinary
* Genius
* Prodigy

Do not exaggerate Tesla's achievements.

The website should celebrate who Tesla is while leaving room for him to grow.

---

# 39. Important Rule About Facts

Never invent:

* Tesla's achievements
* School achievements
* Awards
* Friends
* Locations
* Travel events
* Favorite foods
* Favorite sports teams
* Family relationships beyond what has been provided
* Quotes supposedly said by Tesla
* Details visible in photographs but not confidently identifiable

When information is unavailable, omit it or use neutral wording.

---

# 40. Kabale OCR/Transcription Accuracy Rule

The `tesla-trip/` journal is source material.

Before implementing the final Kabale page:

* Inspect all supplied journal images.
* Preserve page order.
* Extract the handwriting carefully.
* Cross-check the cleaned text against the original images.
* Do not hallucinate unclear text.
* Preserve names and places exactly where confidently readable.
* Correct obvious spelling mistakes.
* Improve grammar only enough to make the story readable.
* Preserve Tesla's storytelling voice.

If the handwritten source conflicts with an assumption elsewhere in the website, the handwritten source should be treated as the authoritative source for the trip story.

---

# 41. Development Workflow

Build the project in this order:

### Step 1 — Inspect assets

Inspect:

```text
photos/
tesla-trip/
```

Understand the number and types of images available.

### Step 2 — Process the Kabale journal

Extract and clean the handwritten story.

### Step 3 — Create the data model

Put Tesla's profile, interests, family information, favorite characters, favorite song, dreams, and Nikola Tesla content into structured data.

### Step 4 — Build the design system

Establish:

* Typography
* Spacing
* Border radius
* Cards
* Buttons
* Icons
* Backgrounds
* Animation behavior

### Step 5 — Build the homepage

Make the homepage visually strong first.

### Step 6 — Build the content pages

Implement:

* About Tesla
* Favorites
* Adventures
* Tesla Trip to Kabale
* Gallery
* Dreams
* Nikola Tesla
* Fun Zone

### Step 7 — Add responsive behavior

Test desktop, tablet, and mobile.

### Step 8 — Optimize images

Ensure the gallery remains fast.

### Step 9 — Accessibility review

Keyboard navigation, focus states, alt text, reduced motion, contrast, etc.

### Step 10 — Final review

Check every page for:

* Spelling
* Broken links
* Broken images
* Layout problems
* Mobile problems
* Incorrect facts
* Accidental personal information
* Duplicate images
* Unnecessary external dependencies

---

# 42. Acceptance Criteria

The project is complete only when all of the following are true:

* The homepage immediately communicates that this is Tesla's personal world.
* Tesla's supplied photographs are prominently used.
* The website is responsive.
* Navigation works on desktop and mobile.
* The Favorites section covers Tesla's main interests.
* Tesla's dreams are presented as both his own aspiration and his dad's hope without declaring one to be better.
* Nikola Tesla is explained in simple, accurate language.
* The Tesla/Kabale journal is transcribed from the supplied images.
* The Kabale page preserves Tesla's original voice.
* Original handwritten journal images are viewable.
* The photo gallery has a working lightbox.
* Random photo works.
* Random fact works.
* The quiz works.
* External links are legitimate and clearly marked.
* Copyrighted media is not illegally hosted.
* No automatic audio plays.
* The site does not publicly reveal Tesla's exact date of birth.
* No sensitive personal information is exposed.
* Photograph GPS metadata is not unnecessarily exposed.
* Accessibility basics are implemented.
* Reduced-motion preferences are respected.
* The project runs without console errors.
* The project documentation explains how to add new photographs and future adventures.

---

# 43. Future Extensibility

Design the project so it is easy to add future sections such as:

```text
New Trips
New Photos
New Songs
School Projects
Tesla's Drawings
Tesla's Science Experiments
Tesla's YouTube Videos
Tesla's Favorite Books
Tesla's Birthday Memories
Family Adventures
```

A future trip should be possible to add without redesigning the entire application.

---

# 44. Final Instruction

Treat this document as the project's **source of truth**.

Do not merely create a generic children's website.

Create a website that feels specifically designed around:

**Tesla Riley Shyaka, his personality, his photographs, his family, his interests, his adventures, his dreams, and the connection between his name and Nikola Tesla.**

The result should feel like a website Tesla's family will enjoy looking back on years from now.

Most importantly:

> **Preserve Tesla's personality and childhood memories.**

The goal is not just to build a website about a child.

The goal is to create a small, beautiful digital record of **Tesla's world as he grows up.** ⚡

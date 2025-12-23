export type QuestionContent = {
  slug: string;
  question: string;
  heroMode: "full_answer" | "answer_below";
  heroText: string;
  youtubeUrl: string;
  category?: string;
  adEligible: boolean;
  status: string;
  body: string;
  _sys: { filename: string };
};

export const questionsContent: QuestionContent[] = [
  {
    slug: "bpss-health",
    question: "Why did things improve, but still not feel better?",
    heroMode: "answer_below",
    heroText:
      "Because symptom control reduced damage without changing the biological, psychological, social, and spiritual conditions that keep stress active.",
    youtubeUrl: "",
    category: "Health & Suffering",
    adEligible: false,
    status: "published",
    body: `## Answer

Pain can ease and numbers can improve while the body remains tense. If chronic stress, isolation, or loss of meaning continue, the nervous system keeps responding even when medications help. The Biopsychosocial-Spiritual view treats the leak, not just the puddle.

### How to apply it

- **Biology**: reduce inflammation, restore sleep, and nourish the nervous system.
- **Psychology**: lower threat signals through calm practice and accurate information.
- **Social**: strengthen support, safety, and daily conditions that reduce load.
- **Spiritual**: reconnect with purpose so the body is not fighting against meaninglessness.

### What to look for

Relief feels different when the roof holds: breathing eases, vigilance drops, and recovery time shortens. Improvements last when all layers repair together.`,
    _sys: { filename: "bpss-health" },
  },
  {
    slug: "syntropic-ecology",
    question: "Why does this land keep needing repair?",
    heroMode: "answer_below",
    heroText:
      "Because extraction replaced the relationships that once let the land repair itself, so each fix treats a symptom instead of restoring the system.",
    youtubeUrl: "",
    category: "Nature & Land",
    adEligible: false,
    status: "published",
    body: `## Answer

When soil life, water holding, and plant diversity are removed, the land stops completing its own cycles. Fertilizer, irrigation, and chemicals keep production going but deepen dependency. Syntropic ecology reverses this by rebuilding relationships instead of adding more inputs.

### What changes

- **Structure returns**: mixed canopies, continuous cover, and deep roots hold water and protect soil life.
- **Cycles close**: pruned biomass feeds the ground, and shade slows evaporation so moisture stays available.
- **Labor shifts**: effort moves from constant rescue to guiding succession so the system maintains itself.

### Why it stays stable

The design mirrors a forest: layered plants, continuous organic matter, and cooperative function. When these are present, the land begins repairing itself and the need for emergency fixes declines.`,
    _sys: { filename: "syntropic-ecology" },
  },
  {
    slug: "why-did-things-improve-but-still-not-feel-better",
    question: "Why did things improve, but still not feel better?",
    heroMode: "answer_below",
    heroText:
      "Because symptom management reduced harm without changing the conditions that keep stress flowing into the body.",
    youtubeUrl: "",
    category: "Health & Suffering",
    adEligible: false,
    status: "published",
    body: `## Answer

Imagine living beneath a roof with a small leak. Buckets keep the floor dry and mops keep people safe. The house looks fine, yet tension returns every time clouds gather. The fixes help, but they do not stop the rain.

Health can feel like that roof. Medications protect organs and calm pain, but if chronic stress, isolation, or meaninglessness continue, the body never fully relaxes. The conditions that drive stress keep dripping into the system.

### What changes the feeling

- Treat the leak, not just the puddle: address the social, psychological, and spiritual layers alongside biology.
- Restore the protective layers together: safety, nourishment, community, and purpose reinforce one another.
- Measure ease, not only symptoms: healing feels like the roof holding, not just better buckets.`,
    _sys: { filename: "why-did-things-improve-but-still-not-feel-better" },
  },
  {
    slug: "why-does-land-keep-degrading",
    question: "Why does land keep degrading, even as we invest more into fixing it?",
    heroMode: "full_answer",
    heroText:
      "Because extractive designs replace the relationships that let land repair itself, so every fix treats symptoms instead of restoring the system.",
    youtubeUrl: "https://www.youtube.com/watch?v=1VyWI1FQKIk",
    category: "Nature & Land",
    adEligible: false,
    status: "published",
    body: `## Answer

A field can look healthy while its underlying relationships unravel. Fertilizer keeps plants green while soil life thins. Irrigation keeps yields steady while water cycles weaken. Each fix works briefly because it replaces what the ecosystem once handled on its own.

Regeneration starts by asking what the land used to do for itself. In healthy systems, plants shield soil, roots hold water, and decaying matter feeds new life. When those links break, the land needs constant rescue. When they return, the land begins repairing itself again.

### How to read this room

- Notice where effort is replacing a missing relationship.
- Look for ways to restore the original cycle instead of adding another input.
- Expect healing to come from design changes, not harder labor.`,
    _sys: { filename: "why-does-land-keep-degrading" },
  },
];

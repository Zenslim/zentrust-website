// lib/ads/types.ts

export type AdsChoicePath = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export type AdsDisclosure = {
  title: string;
  body: string;
  links?: { label: string; href: string }[];
};

export type AdsTriggerBlock = {
  heading: string; // <= 8 words ideally
  body: string; // 2–3 lines
  disclosure?: AdsDisclosure;
};

export type AdsVideo = {
  src: string; // e.g. "/video/ads/ecology-60s.mp4"
  poster?: string; // e.g. "/images/ads/ecology-poster.jpg"
  label?: string; // e.g. "60-second orientation"
  note?: string; // short calm helper text
};

export type AdsPageContent = {
  slug: string;

  // Relevance + Status (Orientation)
  topicLabel: string; // e.g. "Regenerative Ecology & Systems Design"
  formatLabel: string; // e.g. "3-minute overview of integrated restoration patterns."
  orientationTldr: string; // the scent match TL;DR paragraph
  authorityLine: string; // IRS-recognized 501(c)(3) line

  // Primary retention
  video: AdsVideo;

  // Core experience
  whyTitle: string;
  whyParagraphs: string[]; // prose leading to the viz
  integrationClosing: string; // refined line after the viz

  // What we do
  whatWeDoTitle: string;
  whatWeDoSubtitle: string;
  whatWeDoCards: { title: string; body: string }[];

  // Trigger blocks + progressive disclosure
  triggersTitle: string;
  triggersSubtitle: string;
  triggers: AdsTriggerBlock[];

  // Short metaphor
  observationEyebrow: string;
  observationLines: string[]; // 4–6 lines

  // Choice paths
  choiceTitle: string;
  choiceSubtitle: string;
  choicePaths: AdsChoicePath[];

  // Meta
  pageTitle: string;
  pageDescription: string;
};

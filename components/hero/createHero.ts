export type HeroDefinition = {
  identity?: string;
  headlineLines?: string[];
  orientation?: string[];
  trustVerification?: {
    text: string;
    link?: { label: string; href: string };
  };
  cta?: { label: string; href: string };
};

export const ritualSpec = {
  label: "Pause here ▷ tap",
  timeoutMs: 15000,
};

export const defaultHero: HeroDefinition = {
  identity: "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487",
  headlineLines: [
    "Healing land.",
    "Supporting people.",
    "Science for recovery.",
  ],
  orientation: [
    "ZenTrust is a public charity helping nature and communities heal together through research, learning, and long-term stewardship.",
  ],
  trustVerification: {
    text: "Recognized as a 170(b)(1)(A)(vi) public charity.",
    link: {
      label: "View official determination letter",
      href: "https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf",
    },
  },
  cta: {
    label: "Enter the Stewardship Portal",
    href: "/stewardship",
  },
};

export function resolveHero(hero?: HeroDefinition) {
  return {
    identity: hero?.identity ?? defaultHero.identity,
    headlineLines:
      hero?.headlineLines && hero.headlineLines.length > 0
        ? hero.headlineLines
        : defaultHero.headlineLines,
    orientation:
      hero?.orientation && hero.orientation.length > 0
        ? hero.orientation
        : defaultHero.orientation,
    trustVerification: hero?.trustVerification ?? defaultHero.trustVerification,
    cta: hero?.cta,
  } satisfies HeroDefinition;
}

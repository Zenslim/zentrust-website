import { Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HeroRitual = {
  label?: string;
  description?: string;
  timeoutMs?: number;
  videoSrc?: string;
  poster?: string;
};

export type HeroDefinition = {
  identity: string;
  icon?: "sprout";
  headlineLines?: string[];
  orientation?: string[];
  trustVerification?: {
    text: string;
    link?: { label: string; href: string };
  };
  cta?: { label: string; href: string };
  ritual: HeroRitual;
};

export const iconRegistry: Record<string, LucideIcon> = {
  sprout: Sprout,
};

export const resolveHeroIcon = (name?: string) =>
  name ? iconRegistry[name] ?? null : null;

export const defaultRitual: HeroRitual = {
  label: "Pause here ▷ tap",
  description:
    "Take a brief pause. Tap anywhere or press Esc, Enter, or Space to return.",
  timeoutMs: 15000,
  videoSrc: "/video/syntropic-food-forest.mp4",
  poster: "/images/desktop-syntropy-v1-quiet-mirror.jpg",
};

export const defaultHero: HeroDefinition = {
  identity: "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487",
  icon: "sprout",
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
  ritual: defaultRitual,
};

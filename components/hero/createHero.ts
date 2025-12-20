import { Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Supported hero icons.
 * Extend cautiously — icons are optional and non-decorative.
 */
export type HeroIconName = "sprout";

export type HeroIcon = {
  name: HeroIconName;
  label?: string;
};

export type HeroCTA = {
  label: string;
  href: string;
};

export type HeroTrustBlock = {
  text: string;
  link?: {
    label: string;
    href: string;
  };
};

export type HeroRitual = {
  label?: string;
  description?: string;
  timeoutMs?: number;
};

export type HeroDefinition = {
  /**
   * Institutional identity / trust marker.
   * Mandatory across all heroes.
   */
  identity: string;

  /**
   * Optional small, monochrome icon.
   */
  icon?: HeroIcon;

  /**
   * Headline lines (0+).
   * Rendered as stacked lines.
   */
  headlineLines?: string[];

  /**
   * Short explanatory lines or paragraphs (0+).
   */
  orientation?: string[];

  /**
   * Optional trust verification block (e.g. IRS link).
   */
  trustVerification?: HeroTrustBlock;

  /**
   * Optional primary CTA.
   */
  cta?: HeroCTA;

  /**
   * Optional ritual pause configuration.
   */
  ritual?: HeroRitual;
};

/**
 * IRS determination letter (public record).
 */
const DETERMINATION_LETTER_URL =
  "https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf";

/**
 * Icon registry.
 * Keep intentionally small.
 */
const iconRegistry: Record<HeroIconName, LucideIcon> = {
  sprout: Sprout,
};

/**
 * Resolve a hero icon into a Lucide component.
 */
export function resolveHeroIcon(icon?: HeroIcon) {
  if (!icon) return null;
  return iconRegistry[icon.name] ?? null;
}

/**
 * Helper for defining hero content without JSX.
 * Intentionally identity-preserving (no mutation).
 */
export function createHero(definition: HeroDefinition): HeroDefinition {
  return definition;
}

/**
 * Default global hero (homepage + layouts).
 * Must obey single-screen containment.
 */
export const defaultHero = createHero({
  icon: { name: "sprout", label: "ZenTrust sprout" },

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
      href: DETERMINATION_LETTER_URL,
      label: "View official determination letter",
    },
  },

  cta: {
    label: "Enter the Stewardship Portal",
    href: "/stewardship",
  },

  ritual: {
    label: "Pause here",
    description:
      "Take a brief pause. Tap anywhere or press Esc, Enter, or Space to return.",
    timeoutMs: 15000,
  },
});

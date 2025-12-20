import type { LucideIcon } from "lucide-react";
import { Sprout } from "lucide-react";

export type HeroIconName = "sprout";

export type HeroRitual = {
  label?: string;
  description?: string;
  timeoutMs?: number;
  videoSrc?: string;
  poster?: string;
};

export type HeroDefinition = {
  identity?: string;
  icon?: HeroIconName;
  headlineLines?: string[];
  orientation?: string[];
  trustVerification?: {
    text: string;
    link?: { label: string; href: string };
  };
  cta?: { label: string; href: string };
  ritual?: HeroRitual;
};

export const ritualSpec = {
  label: "Pause here ▷ tap",
  timeoutMs: 15000,
};

export const defaultRitual: HeroRitual = {
  label: ritualSpec.label,
  description:
    "Take a brief pause. Tap anywhere or press Esc, Enter, or Space to return.",
  timeoutMs: ritualSpec.timeoutMs,
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

const iconRegistry: Record<HeroIconName, LucideIcon> = {
  sprout: Sprout,
};

export const resolveHeroIcon = (name?: HeroIconName) =>
  name ? iconRegistry[name] ?? null : null;

const resolveRitual = (ritual?: HeroRitual, usingDefault?: boolean) => {
  const base = usingDefault ? defaultRitual : undefined;

  if (!ritual && !base) return undefined;

  return {
    label: ritual?.label ?? base?.label ?? ritualSpec.label,
    description: ritual?.description ?? base?.description,
    timeoutMs: ritual?.timeoutMs ?? base?.timeoutMs ?? ritualSpec.timeoutMs,
    videoSrc: ritual?.videoSrc ?? base?.videoSrc,
    poster: ritual?.poster ?? base?.poster,
  };
};

export function resolveHero(hero?: HeroDefinition) {
  const source = hero ?? {};
  const usingDefault = !hero;

  return {
    identity: source.identity ?? defaultHero.identity,
    icon: source.icon ?? defaultHero.icon,
    headlineLines:
      source.headlineLines && source.headlineLines.length > 0
        ? source.headlineLines
        : defaultHero.headlineLines,
    orientation:
      source.orientation && source.orientation.length > 0
        ? source.orientation
        : defaultHero.orientation,
    trustVerification: source.trustVerification ?? defaultHero.trustVerification,
    cta: source.cta ?? defaultHero.cta,
    ritual: resolveRitual(source.ritual, usingDefault),
  } satisfies HeroDefinition;
}

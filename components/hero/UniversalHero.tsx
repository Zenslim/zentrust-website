'use client';

import { HeroShell } from "./HeroShell";
import { defaultHero, type HeroDefinition } from "./createHero";

type UniversalHeroProps = {
  /**
   * Optional hero override.
   * If not provided, the global defaultHero is used.
   */
  hero?: HeroDefinition;
};

export function UniversalHero({ hero = defaultHero }: UniversalHeroProps) {
  return <HeroShell hero={hero} />;
}

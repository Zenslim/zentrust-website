"use client";

import { useMemo } from "react";
import { HeroShell } from "./HeroShell";
import { resolveHero, type HeroDefinition } from "./createHero";

export function UniversalHero({ hero }: { hero?: HeroDefinition }) {
  const resolvedHero = useMemo(() => resolveHero(hero), [hero]);

  return (
    <>
      <HeroShell
        hero={resolvedHero}
        hidden={heroHidden}
        onRitualActiveChange={setHeroHidden}
      />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { HeroShell } from "./HeroShell";
import { resolveHero, type HeroDefinition } from "./createHero";

export function UniversalHero({ hero }: { hero?: HeroDefinition }) {
  const [heroHidden, setHeroHidden] = useState(false);

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

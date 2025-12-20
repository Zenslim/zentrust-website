"use client";

import { useMemo, useState } from "react";
import { HeroShell } from "./HeroShell";
import { RitualPause } from "./RitualPause";
import { resolveHero, type HeroDefinition } from "./createHero";

export function UniversalHero({ hero }: { hero?: HeroDefinition }) {
  const [heroHidden, setHeroHidden] = useState(false);

  const resolvedHero = useMemo(() => resolveHero(hero), [hero]);
  const ritual = resolvedHero.ritual;
  const ritualAvailable = Boolean(ritual?.videoSrc);

  return (
    <>
      <HeroShell
        hero={resolvedHero}
        hidden={heroHidden}
        ritualAffordance={
          ritualAvailable ? (
            <RitualPause ritual={ritual} onActiveChange={setHeroHidden} />
          ) : null
        }
      />
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { HeroShell } from "./HeroShell";
import { RitualPause } from "./RitualPause";
import { resolveHero, type HeroDefinition } from "./createHero";

export function UniversalHero({ hero }: { hero?: HeroDefinition }) {
  const [active, setActive] = useState(false);
  const [used, setUsed] = useState(false);

  const resolvedHero = useMemo(() => resolveHero(hero), [hero]);

  const startRitual = () => {
    if (used || active) return;
    setActive(true);
  };

  const endRitual = () => {
    setActive(false);
    if (!used) setUsed(true);
  };

  return (
    <>
      <HeroShell
        hero={resolvedHero}
        hidden={active}
        ritualAffordance={
          <RitualPause
            active={active}
            used={used}
            onStart={startRitual}
            onEnd={endRitual}
          />
        }
      />
    </>
  );
}

"use client";

import { HeroShell } from "./HeroShell";
import { RitualPause } from "./RitualPause";
import { defaultHero, type HeroDefinition } from "./createHero";

export function UniversalHero({ hero }: { hero?: HeroDefinition }) {
  const resolvedHero = hero ?? defaultHero;

  return (
    <>
      {/* Text-only hero */}
      <HeroShell hero={resolvedHero} />

      {/* Ritual trigger + fullscreen overlay (layout-free) */}
      {resolvedHero.ritual && (
        <RitualPause {...resolvedHero.ritual} />
      )}
    </>
  );
}

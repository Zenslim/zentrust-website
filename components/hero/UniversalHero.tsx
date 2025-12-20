import { HeroShell } from "./HeroShell";
import { RitualPause } from "./RitualPause";

export type HeroData = {
  identityLine: string;
  tension: [string, string, string];
  cta?: React.ReactNode;
};

export function UniversalHero({ hero }: { hero: HeroData }) {
  return (
    <HeroShell
      identityLine={hero.identityLine}
      tension={hero.tension}
      cta={hero.cta}
      ritual={<RitualPause />}
    />
  );
}

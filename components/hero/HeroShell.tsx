"use client";

import Link from "next/link";
import { RitualPause } from "./RitualPause";
import { resolveHeroIcon, type HeroDefinition } from "./createHero";

export function HeroShell({
  hero,
  hidden,
  onRitualActiveChange,
}: {
  hero: HeroDefinition;
  hidden?: boolean;
  onRitualActiveChange?: (active: boolean) => void;
}) {
  const Icon = resolveHeroIcon(hero.icon);

  return (
    <section
      className="relative flex min-h-[100svh] max-h-[100svh] items-center justify-center overflow-hidden px-6 bg-[#F6F0E6] text-foreground dark:bg-[#0f1110]"
      aria-live="polite"
    >
      <div
        className={`mx-auto w-full max-w-3xl text-center space-y-5 transition-opacity duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={hidden}
      >
        {Icon && (
          <Icon className="mx-auto h-10 w-10 text-foreground/70" aria-hidden />
        )}

        <p className="text-xs tracking-[0.18em] uppercase text-foreground/70">
          {hero.identity}
        </p>

        {hero.headlineLines && (
          <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            {hero.headlineLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
        )}

        {hero.orientation?.map((line, index) => (
          <p key={index} className="text-balance text-base text-foreground/80">
            {line}
          </p>
        ))}

        {hero.trustVerification && (
          <p className="text-xs text-foreground/60">
            {hero.trustVerification.text}{" "}
            {hero.trustVerification.link && (
              <a
                href={hero.trustVerification.link.href}
                className="underline"
              >
                {hero.trustVerification.link.label}
              </a>
            )}
          </p>
        )}

        <div className="flex flex-col items-center gap-3">
          {hero.cta && (
            <Link
              href={hero.cta.href}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-primary-foreground shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {hero.cta.label}
            </Link>
          )}

          <RitualPause ritual={hero.ritual} onActiveChange={onRitualActiveChange} />
        </div>
      </div>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import { type HeroDefinition } from "./createHero";

export function HeroShell({
  hero,
  hidden,
  ritualAffordance,
}: {
  hero: HeroDefinition;
  hidden?: boolean;
  ritualAffordance: ReactNode;
}) {
  return (
    <section
      className="relative flex min-h-[100svh] max-h-[100svh] items-center justify-center overflow-hidden px-6"
      aria-live="polite"
    >
      <div
        className={`mx-auto w-full max-w-3xl text-center space-y-5 transition-opacity duration-150 ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={hidden}
      >
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
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        {ritualAffordance}
      </div>
    </section>
  );
}

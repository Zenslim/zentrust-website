'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { resolveHeroIcon, type HeroDefinition } from "./createHero";
import { RitualPause } from "./RitualPause";

type HeroShellProps = {
  hero: HeroDefinition;
};

export function HeroShell({ hero }: HeroShellProps) {
  const {
    icon,
    identity,
    headlineLines = [],
    orientation = [],
    trustVerification,
    cta,
    ritual,
  } = hero;

  const Icon = resolveHeroIcon(icon);

  return (
    <section className="relative isolate h-[100svh] max-h-[100svh] overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-14 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          {Icon && (
            <div className="flex justify-center">
              <Icon
                aria-hidden="true"
                strokeWidth={1.6}
                className="h-10 w-10 text-foreground/80"
              />
            </div>
          )}

          <p className="text-[12px] sm:text-[13px] tracking-[0.18em] uppercase font-medium text-foreground/80">
            {identity}
          </p>

          <div className="space-y-4">
            {headlineLines.length > 0 && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                {headlineLines.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            )}

            {orientation.length > 0 && (
              <div className="space-y-3 text-base sm:text-lg text-foreground/80">
                {orientation.map((line, index) => (
                  <p key={index} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {trustVerification && (
            <p className="text-xs sm:text-sm text-foreground/70">
              {trustVerification.text}{" "}
              {trustVerification.link && (
                <a
                  href={trustVerification.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 font-medium text-foreground/80 hover:text-foreground"
                >
                  {trustVerification.link.label}
                </a>
              )}
            </p>
          )}

          {cta && (
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="px-7 py-4 text-base sm:text-lg rounded-xl"
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}

          <RitualPause
            label={ritual?.label}
            description={ritual?.description}
            timeoutMs={ritual?.timeoutMs}
          />
        </div>
      </div>
    </section>
  );
}

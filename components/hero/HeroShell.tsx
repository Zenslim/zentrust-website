"use client";

import Link from "next/link";
import { RitualPause } from "./RitualPause";

type Hero = {
  title?: string;
  description?: string;
  cta?: {
    href: string;
    label: string;
  };
  ritual?: {
    label?: string;
    timeoutMs?: number;
    videoSrc?: string;
  };
};

type Props = {
  hero: Hero;
};

export function HeroShell({ hero }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[70vh] flex-col justify-center py-10 sm:py-16">
          {hero.title && (
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {hero.title}
            </h1>
          )}

          {hero.description && (
            <p className="mt-4 max-w-2xl text-base text-foreground/80">
              {hero.description}
            </p>
          )}

          {(hero.cta || hero.ritual) && (
            <div className="pt-6">
              {hero.cta && (
                <Link
                  href={hero.cta.href}
                  className="inline-block rounded-xl bg-primary px-6 py-3 text-primary-foreground"
                >
                  {hero.cta.label}
                </Link>
              )}

              {/* Ritual is ALWAYS below CTA with safe spacing */}
              {hero.ritual && (
                <div className="mt-8">
                  <RitualPause {...hero.ritual} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

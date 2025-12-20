"use client";

import { ReactNode } from "react";

type HeroShellProps = {
  identityLine: string;
  tension: [string, string, string]; // EXACTLY 3 lines
  cta?: ReactNode;
  ritual: ReactNode; // mandatory
};

export function HeroShell({
  identityLine,
  tension,
  cta,
  ritual,
}: HeroShellProps) {
  return (
    <section className="min-h-[85svh] flex items-center justify-center px-6 pt-20 pb-16">
      <div className="max-w-3xl w-full text-center space-y-6">

        {/* Identity line */}
        <p className="text-[13px] tracking-[0.18em] uppercase opacity-80">
          {identityLine}
        </p>

        {/* Three-sentence tension */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          {tension.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Optional CTA */}
        {cta && <div className="pt-6">{cta}</div>}

        {/* Ritual (always present) */}
        <div className="pt-8">{ritual}</div>

      </div>
    </section>
  );
}

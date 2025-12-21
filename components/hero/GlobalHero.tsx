"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { RitualPause } from "./RitualPause";

type Cta = { label: string; href: string };

type GlobalHeroProps = {
  kicker?: string;
  headline: string;
  dek?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  belowAnchorId?: string;
  mode?: "answer" | "confirm";
  ritual?: { enabled: boolean };
};

const DEFAULT_KICKER = "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487";

export function GlobalHero({
  kicker = DEFAULT_KICKER,
  headline,
  dek,
  primaryCta,
  secondaryCta,
  belowAnchorId = "content",
  mode = "answer",
  ritual = { enabled: true },
}: GlobalHeroProps) {
  const confirmCopy = useMemo(
    () =>
      mode === "confirm"
        ? {
            label: "Answer below ↓",
            href: `#${belowAnchorId}`,
          }
        : null,
    [belowAnchorId, mode],
  );

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto flex min-h-[70vh] max-h-[100vh] flex-col justify-center px-6 pb-14 pt-28 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/70 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            <span className="whitespace-nowrap">{kicker}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {headline}
            </h1>
            {dek ? (
              <p className="text-pretty text-base text-foreground/80 sm:text-lg">
                {dek}
              </p>
            ) : null}
            {confirmCopy ? (
              <Link
                href={confirmCopy.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
              >
                {confirmCopy.label}
              </Link>
            ) : null}
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
                  )}
                >
                  {primaryCta.label}
                </Link>
              ) : null}

              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-md"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}

          <div className="pt-2">
            <RitualPause enabled={ritual?.enabled !== false} />
          </div>
        </div>
      </div>
    </section>
  );
}

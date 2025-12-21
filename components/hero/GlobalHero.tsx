"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { RitualPause } from "./RitualPause";

type Cta = { label: string; href: string };

type GlobalHeroProps = {
  kicker?: string;
  headline: string;          // newline-delimited supported
  dek?: string;              // newline-delimited supported
  primaryCta?: Cta;
  secondaryCta?: Cta;
  belowAnchorId?: string;
  mode?: "answer" | "confirm";
  ritual?: { enabled: boolean };
};

const DEFAULT_KICKER =
  "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487";

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
        ? { label: "Answer below ↓", href: `#${belowAnchorId}` }
        : null,
    [belowAnchorId, mode],
  );

  return (
    <section className="relative isolate flex h-[100svh] min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pb-16 pt-20 text-center sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full flex-col items-center gap-5">

          {/* Kicker */}
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80">
            {kicker}
          </p>

          {/* Headline — MULTI-LINE */}
          <div className="space-y-1 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {headline.split("\n").map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          {/* Dek — MULTI-LINE */}
          {dek && (
            <div className="space-y-1 text-pretty text-base text-foreground/80 sm:text-lg">
              {dek.split("\n").map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}

          {/* Confirm link */}
          {confirmCopy && (
            <Link
              href={confirmCopy.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
            >
              {confirmCopy.label}
            </Link>
          )}

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {primaryCta.label}
                </Link>
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-md"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}

          {/* Ritual */}
          <div className="pt-2 flex flex-col items-center gap-2">
            <RitualPause enabled={ritual?.enabled !== false} />
          </div>

        </div>
      </div>
    </section>
  );
}

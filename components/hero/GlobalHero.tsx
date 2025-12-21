"use client";

import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { RitualPause } from "./RitualPause";

type Cta = { label: string; href: string };

type GlobalHeroProps = {
  kicker?: string;
  headline?: string;
  headlineLines?: string[];
  dek?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  belowAnchorId?: string;
  mode?: "answer" | "confirm";
  ritual?: { enabled: boolean };
  determination?: { text: string; label: string; href: string };
  showIcon?: boolean;
  heroIcon?: ReactNode;
};

const DEFAULT_KICKER =
  "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487";

export function GlobalHero({
  kicker = DEFAULT_KICKER,
  headline,
  headlineLines,
  dek,
  primaryCta,
  secondaryCta,
  belowAnchorId = "content",
  mode = "answer",
  ritual = { enabled: true },
  determination,
  showIcon = false,
  heroIcon,
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

  const shouldShowLines = (headlineLines?.length ?? 0) > 0;

  const iconNode =
    heroIcon ?? (
      <Sprout
        className="h-10 w-10 text-emerald-700/90 dark:text-emerald-300/80"
        strokeWidth={1.6}
        aria-hidden="true"
      />
    );

  return (
    <section className="relative isolate flex h-[100svh] min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pb-16 pt-20 text-center sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full flex-col items-center gap-5">
          {showIcon && <div>{iconNode}</div>}

          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80">
            {kicker}
          </p>

          <div className="space-y-4">
            {shouldShowLines ? (
              <div className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {headlineLines?.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            ) : (
              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {headline}
              </h1>
            )}

            {dek && (
              <p className="text-pretty text-base text-foreground/80 sm:text-lg">
                {dek}
              </p>
            )}

            {determination && (
              <p className="text-sm text-foreground/70">
                {determination.text}{" "}
                <Link
                  href={determination.href}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {determination.label}
                </Link>
              </p>
            )}

            {confirmCopy && (
              <Link
                href={confirmCopy.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
              >
                {confirmCopy.label}
              </Link>
            )}
          </div>

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

          <div className="pt-2 flex flex-col items-center gap-2">
            <RitualPause enabled={ritual?.enabled !== false} />
          </div>
        </div>
      </div>
    </section>
  );
}

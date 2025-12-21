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
  ritualHelperText?: string;
  fullScreen?: boolean;
};

const DEFAULT_KICKER = "ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487";

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
  ritualHelperText,
  fullScreen = false,
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

  const isFullScreen = fullScreen;
  const shouldShowLines = (headlineLines?.length ?? 0) > 0;
  const iconNode = heroIcon ?? (
    <Sprout
      className="h-10 w-10 text-emerald-700/90 dark:text-emerald-300/80"
      strokeWidth={1.6}
      aria-hidden="true"
    />
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30",
        isFullScreen
          ? "isolate flex h-[100svh] min-h-[100svh] items-center justify-center"
          : "border-b border-border/60",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col",
          isFullScreen
            ? "max-w-3xl items-center gap-6 px-6 pb-16 pt-20 text-center sm:px-8 lg:px-10"
            : "min-h-[70vh] max-h-[100vh] justify-center gap-6 px-6 pb-14 pt-28 sm:px-8 lg:px-10",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-col gap-5",
            isFullScreen ? "items-center" : "max-w-5xl",
          )}
        >
          {showIcon ? (
            <div className="flex justify-center">{iconNode}</div>
          ) : null}

          {isFullScreen ? (
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80">
              {kicker}
            </p>
          ) : (
            <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-foreground/70 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              <span className="whitespace-nowrap">{kicker}</span>
            </div>
          )}

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

            {dek ? (
              <p className="text-pretty text-base text-foreground/80 sm:text-lg">
                {dek}
              </p>
            ) : null}

            {determination ? (
              <p className="text-sm text-foreground/70">
                {determination.text}{" "}
                <Link
                  href={determination.href}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {determination.label}
                </Link>
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
            <div
              className={cn(
                "flex flex-wrap items-center gap-3",
                isFullScreen ? "justify-center" : undefined,
              )}
            >
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

          <div
            className={cn(
              "pt-2",
              isFullScreen ? "flex flex-col items-center gap-2" : undefined,
            )}
          >
            <RitualPause enabled={ritual?.enabled !== false} />
            {ritual?.enabled !== false && ritualHelperText ? (
              <p className="text-xs text-foreground/60">{ritualHelperText}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

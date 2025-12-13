// components/zentrust/tldr.tsx
import Link from "next/link";
import { TRUST } from "@/lib/ads/adsContent";

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-300">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="font-medium text-zinc-900 dark:text-zinc-100">
        {value}
      </span>
    </div>
  );
}

export function TLDR({
  topicLabel,
  formatLabel,
  orientationTldr,
  authorityLine,
}: {
  topicLabel: string;
  formatLabel: string;
  orientationTldr: string;
  authorityLine: string;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
      <div>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Topic: <span className="text-zinc-700 dark:text-zinc-200">{topicLabel}</span>
        </h1>

        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Format: {formatLabel}
        </p>

        <p className="mt-5 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">TL;DR </span>
          {orientationTldr}
        </p>

        <p className="mt-3 text-pretty text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          {authorityLine}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Pill label="Entity" value={TRUST.legalName} />
          <Pill label="Status" value="501(c)(3)" />
          <Pill label="EIN" value={TRUST.ein} />
          <Pill label="Public charity" value={TRUST.publicCharity} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href={TRUST.determinationHref}
            className="rounded-xl border border-zinc-200/70 bg-white/70 px-4 py-2 font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:bg-zinc-950/60"
          >
            View IRS determination letter
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-transparent px-4 py-2 text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Return to homepage
          </Link>
        </div>
      </div>

      {/* Right column intentionally left for the retention video component */}
      <div className="hidden lg:block" />
    </section>
  );
}

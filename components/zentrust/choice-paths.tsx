// components/zentrust/choice-paths.tsx
import Link from "next/link";
import { AdsChoicePath } from "@/lib/ads/types";

function Card({
  title,
  description,
  href,
  ctaLabel,
}: AdsChoicePath) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </div>
      <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      <div className="mt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 bg-white/70 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-100 dark:hover:bg-zinc-950/60"
        >
          {ctaLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export function ChoicePaths({ paths }: { paths: AdsChoicePath[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paths.map((p) => (
        <Card key={p.title} {...p} />
      ))}
    </div>
  );
}

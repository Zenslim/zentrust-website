// components/zentrust/trigger-block.tsx
import Link from "next/link";
import { AdsTriggerBlock } from "@/lib/ads/types";

export function TriggerBlocks({
  items,
}: {
  items: AdsTriggerBlock[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, idx) => (
        <details
          key={`${item.heading}-${idx}`}
          className="group rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur open:bg-white/80 dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:open:bg-zinc-950/55"
        >
          <summary className="cursor-pointer list-none select-none">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.heading}
                </div>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  {item.body}
                </p>
                <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="group-open:hidden">Expand</span>
                  <span className="hidden group-open:inline">Collapse</span>
                </div>
              </div>

              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 text-zinc-700 transition-transform group-open:rotate-45 dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-300">
                +
              </div>
            </div>
          </summary>

          {item.disclosure ? (
            <div className="mt-4 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              <div className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                {item.disclosure.title}
              </div>
              <p className="mt-2">{item.disclosure.body}</p>

              {item.disclosure.links?.length ? (
                <div className="mt-3 flex flex-wrap gap-3">
                  {item.disclosure.links.map((l) => (
                    <Link
                      key={l.href}
                      className="underline underline-offset-4"
                      href={l.href}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </details>
      ))}
    </div>
  );
}

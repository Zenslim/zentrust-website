// components/zentrust/retention-vid.tsx

export function RetentionVideo({
  src,
  poster,
  label = "60-second orientation",
  note = "Plays inline · muted by default · subtitles recommended",
}: {
  src: string;
  poster?: string;
  label?: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {label}
          </div>
          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {note}
          </div>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Active stillness first
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-900/20">
        <video
          className="h-auto w-full"
          controls
          playsInline
          muted
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        No pitch. No urgency. A calm overview of the pattern.
      </p>
    </div>
  );
}

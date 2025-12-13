// components/zentrust/section-title.tsx

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      {eyebrow ? (
        <div className="mb-2 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

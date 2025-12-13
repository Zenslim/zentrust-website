// app/ads/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ADS_SLUGS, getAdsPage } from "@/lib/ads/adsContent";
import { TLDR } from "@/components/zentrust/tldr";
import { RetentionVideo } from "@/components/zentrust/retention-vid";
import { SectionTitle } from "@/components/zentrust/section-title";
import { SiloViz } from "@/components/zentrust/silo-viz";
import { TriggerBlocks } from "@/components/zentrust/trigger-block";
import { ChoicePaths } from "@/components/zentrust/choice-paths";

export function generateStaticParams() {
  return ADS_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getAdsPage(params.slug);
  if (!page) return { title: "ZenTrust" };
  return {
    title: page.pageTitle,
    description: page.pageDescription,
    alternates: { canonical: `/ads/${page.slug}` },
  };
}

export default function AdsSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getAdsPage(params.slug);
  if (!page) notFound();

  return (
    <div className="space-y-14">
      {/* Orientation + Status */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <TLDR
            topicLabel={page.topicLabel}
            formatLabel={page.formatLabel}
            orientationTldr={page.orientationTldr}
            authorityLine={page.authorityLine}
          />
        </div>
        <div className="lg:self-start">
          <RetentionVideo
            src={page.video.src}
            poster={page.video.poster}
            label={page.video.label}
            note={page.video.note}
          />
        </div>
      </div>

      {/* Why section + Silo Viz */}
      <section className="space-y-10">
        <SectionTitle
          eyebrow="Core experience"
          title={page.whyTitle}
          subtitle="A calm, systems-level link between land, health, and community—without blame, ideology, or urgency."
        />

        <div className="mx-auto max-w-3xl space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          {page.whyParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <SiloViz />

        <div className="mx-auto max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          <p className="mt-6 font-medium text-zinc-900 dark:text-zinc-100">
            Living systems don’t regenerate in pieces.
          </p>
          <p className="mt-3">{page.integrationClosing}</p>
        </div>
      </section>

      {/* What we do */}
      <section className="space-y-10">
        <SectionTitle
          eyebrow="What we do (plainly)"
          title={page.whatWeDoTitle}
          subtitle={page.whatWeDoSubtitle}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {page.whatWeDoCards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40"
            >
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {c.title}
              </div>
              <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trigger blocks */}
      <section className="space-y-10">
        <SectionTitle
          eyebrow="Core exploration"
          title={page.triggersTitle}
          subtitle={page.triggersSubtitle}
        />
        <TriggerBlocks items={page.triggers} />
      </section>

      {/* Quiet metaphor */}
      <section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
          <div className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            {page.observationEyebrow}
          </div>
          <p className="mt-3 text-pretty text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {page.observationLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < page.observationLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Choice paths */}
      <section className="space-y-10">
        <SectionTitle
          eyebrow="If you’d like to continue"
          title={page.choiceTitle}
          subtitle={page.choiceSubtitle}
        />
        <ChoicePaths paths={page.choicePaths} />
      </section>

      {/* Implementation detail: distinct ad groups should route to distinct slugs for scent matching. */}
    </div>
  );
}

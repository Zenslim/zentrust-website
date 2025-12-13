// app/ads/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ADS_SLUGS, getAdsPage } from "@/lib/ads/adsContent";

import { TLDR, TrustBlock } from "@/components/zentrust/tldr";
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
    <div className="space-y-16">
      {/* =====================================================
          ORIENTATION + PRIMARY RETENTION
          ===================================================== */}

      {/* MOBILE FIRST */}
      <section className="space-y-6 lg:hidden">
        <TLDR
          topicLabel={page.topicLabel}
          formatLabel={page.formatLabel}
          orientationTldr={page.orientationTldr}
          authorityLine={page.authorityLine}
        />

        <RetentionVideo
          src={page.video.src}
          poster={page.video.poster}
          label={page.video.label}
          note={page.video.note}
        />

        {/* Trust block moved BELOW video on mobile */}
        <TrustBlock />
      </section>

      {/* DESKTOP — SIDE BY SIDE (RESTORED) */}
      <section className="hidden lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          <TLDR
            topicLabel={page.topicLabel}
            formatLabel={page.formatLabel}
            orientationTldr={page.orientationTldr}
            authorityLine={page.authorityLine}
          />
        </div>

        <div className="self-start">
          <RetentionVideo
            src={page.video.src}
            poster={page.video.poster}
            label={page.video.label}
            note={page.video.note}
          />
        </div>
      </section>

      {/* =====================================================
          CORE EXPERIENCE
          ===================================================== */}
      <section className="space-y-12">
        <SectionTitle
          eyebrow="Core experience"
          title={page.whyTitle}
          subtitle="A systems-level link between land, health, and community — without blame, ideology, or urgency."
        />

        <div className="mx-auto max-w-3xl space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          {page.whyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <SiloViz />

        <div className="mx-auto max-w-3xl space-y-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            Living systems don’t regenerate in pieces.
          </p>
          <p>{page.integrationClosing}</p>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
          ===================================================== */}
      <section className="space-y-12">
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

      {/* =====================================================
          TRIGGERS
          ===================================================== */}
      <section className="space-y-12">
        <SectionTitle
          eyebrow="Core exploration"
          title={page.triggersTitle}
          subtitle={page.triggersSubtitle}
        />
        <TriggerBlocks items={page.triggers} />
      </section>

      {/* =====================================================
          METAPHOR
          ===================================================== */}
      <section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
          <div className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            {page.observationEyebrow}
          </div>
          <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {page.observationLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < page.observationLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* =====================================================
          CHOICE PATHS
          ===================================================== */}
      <section className="space-y-12">
        <SectionTitle
          eyebrow="If you’d like to continue"
          title={page.choiceTitle}
          subtitle={page.choiceSubtitle}
        />
        <ChoicePaths paths={page.choicePaths} />
      </section>
    </div>
  );
}

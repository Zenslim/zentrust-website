import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuietMirrorHeroMedia from "@/components/hero/QuietMirrorHeroMedia";

export const metadata: Metadata = {
  title: "Syntropic Ecology: The Regeneration Protocol",
  description:
    "Syntropic Ecology: A regenerative land-restoration protocol that restores soil, food systems, and community resilience by mimicking how forests heal themselves.",
};

export default function SyntropicEcologyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Quiet Mirror entry: ask nothing, safe to leave */}
      <section className="relative">
        <QuietMirrorHeroMedia
          mobileVideoSrc="/video/mobile-syntropy-v1-quiet-mirror.mp4"
          heroImageSrc="/images/desktop-syntropy-v1-quiet-mirror.jpg"
          heroImageAlt="Quiet Mirror: rich soil with subtle mycelial structure beneath the surface"
        />

        {/* Quiet Mirror title (understated) */}
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="pt-5 sm:pt-6">
              <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-900 backdrop-blur dark:bg-black/50 dark:text-neutral-50">
                There Is Order Beneath the Disorder.
              </div>
            </div>
          </div>
        </div>

        {/* Pivot copy (still above the fold on most screens) */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                We Don’t Plant Trees. We Restore the Code that Lets Forests Return.
              </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-800 dark:text-neutral-200 sm:text-lg">
                The world needs a protocol for regeneration, not another symptom-treating charity. This is the Syntropic
                Ecology engine—the open-source foundation of a living civilization.
              </p>

              {/* Gentle cue to continue (not a CTA) */}
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                If you’d like to continue, the map is below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Floodlight TL;DR Matrix (below fold) */}
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            The Shift from Transactional Pity to Systemic Power.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
            The traditional charity model fails because it treats the symptom in isolation. We understand that the soil
            is not just dirt—it is the original source code for all wealth, health, and spirit.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
            The Syntropic Protocol restores the deep, reciprocal relationship between life and land, transforming
            degraded acres into bio-diverse, self-financing ecosystems. This is the new flow:
          </p>

          <div className="mt-6 space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex gap-3">
              <div className="shrink-0">🌱</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">Healed Soil</span> creates nutrient-dense food that fuels{" "}
                <span className="font-medium">BPSS Wellness</span> (The Human).
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">💰</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">Generative Systems</span> eliminate external inputs, which converts a
                charitable cost into a <span className="font-medium">Community Wealth</span> asset.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">🧘</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">Reciprocity with Life</span> re-establishes a sense of place and purpose,
                grounding the Human Spirit in the natural world.
              </p>
            </div>
          </div>
        </div>

        {/* Depth accordion */}
        <div className="mt-10 max-w-3xl">
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                  The Syntropic Protocol: Beyond Sustainability, Towards Abundance.
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  View the mechanism (no hype, no urgency).
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p className="leading-relaxed">
                Syntropy is the organizing force of life that accumulates energy and structure. Our protocol is a
                precise, successional system that mimics the way a natural forest heals itself, replacing the entropic
                logic of industrial farming with an abundant, regenerative pattern.
              </p>

              <p className="leading-relaxed">This is an investment in nature&apos;s compounding return:</p>

              <div className="space-y-3">
                <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                  <p className="font-medium">Accumulate Energy</p>
                  <p className="mt-1 leading-relaxed">
                    We practice high-density, multi-strata planting and intensive biomass management (“chop and drop”)
                    to maximize photosynthesis and rapidly build organic matter—effectively creating soil fertility
                    on-site.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                  <p className="font-medium">Build Resilience</p>
                  <p className="mt-1 leading-relaxed">
                    We replace monoculture fragility with a hyper-diverse ecosystem that is resistant to disease, pests,
                    and climate-based shocks. Our complexity is our anti-fragility.
                  </p>
                </div>

                <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                  <p className="font-medium">Generate Viability (The PRI Model)</p>
                  <p className="mt-1 leading-relaxed">
                    The system accelerates ecological succession, generating continuous, diverse harvests. This converts
                    philanthropic capital into a self-financing, permanent economic asset.
                  </p>
                  <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                    Crucially: All revenue generated is reinvested exclusively into charitable, educational, and
                    scientific purposes.
                  </p>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Choice-based continuation (equal weight) */}
        <div className="mt-12 max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">Your Role in the New Ocean.</h3>
          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            This is a movement built on two types of capital: the immediate sponsorship that launches a site, and the
            strategic investment that makes it self-sustaining forever.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            Which kind of capital will you deploy?
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/stewardship"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Button 1</div>
              <div className="mt-2 text-base font-semibold">
                Be a Steward. Activate an Acre of Regeneration.
              </div>
              <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                (Destination: Stewardship Flow)
              </div>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Continue →
              </div>
            </Link>

            <Link
              href="/investor/pri"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Button 2</div>
              <div className="mt-2 text-base font-semibold">Invest in the Protocol: Review the Syntropic PRI Model.</div>
              <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">(Destination: Investor Portal)</div>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Continue →
              </div>
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href="/protocols/bpss-wellness"
              className="inline-flex items-center gap-2 text-sm text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
            >
              → Learn How This Protocol Heals the Human Condition (BPSS Wellness)
            </Link>
          </div>
        </div>

        {/* Mandatory Trust Footer (quiet, plain) */}
        <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              ZenTrust, Inc. | EIN: <span className="font-medium">33-4318487</span> | IRS Status:{" "}
              <span className="font-medium">170(b)(1)(A)(vi)</span>
            </div>

            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/docs/irs-determination-letter" className="hover:underline underline-offset-4">
                IRS Determination Letter
              </Link>
              <Link href="/financials" className="hover:underline underline-offset-4">
                Financials
              </Link>
              <Link href="/governance" className="hover:underline underline-offset-4">
                Governance
              </Link>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </section>
    </main>
  );
}


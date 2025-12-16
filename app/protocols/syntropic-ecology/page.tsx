import type { Metadata } from "next";
import Link from "next/link";
import QuietMirrorHeroMedia from "@/components/hero/QuietMirrorHeroMedia";

export const metadata: Metadata = {
  title: "Syntropic Ecology: The Regeneration Protocol",
  description:
    "A regenerative land-restoration protocol that restores soil, food systems, and community resilience by mimicking how forests heal themselves.",
};

export default function SyntropicEcologyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Quiet Mirror entry */}
      <section className="relative">
        <QuietMirrorHeroMedia
          mobileVideoSrc="/video/mobile-syntropy-v1-quiet-mirror.mp4"
          heroImageSrc="/images/desktop-syntropy-v1-quiet-mirror.jpg"
          heroImageAlt="Quiet Mirror: rich soil with subtle mycelial structure beneath the surface"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col px-4 sm:px-6">
            <div className="pt-5 sm:pt-6">
              <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-900 backdrop-blur dark:bg-black/50 dark:text-neutral-50">
                There Is Order Beneath the Disorder.
              </div>
            </div>

            <div className="flex-1" />

            <div className="pb-8 sm:pb-10">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  We Don’t Plant Trees. We Restore the Code that Lets Forests Return.
                </h1>
                <p className="mt-4 text-base leading-relaxed sm:text-lg">
                  The world needs a protocol for regeneration, not another
                  symptom-treating charity. This is the Syntropic Ecology engine—
                  the open-source foundation of a living civilization.
                </p>
                <p className="mt-4 text-sm sm:text-base">
                  If you’d like to continue, the map is below.
                </p>
              </div>
            </div>
          </div>
        </QuietMirrorHeroMedia>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* TL;DR */}
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            The Shift from Transactional Pity to Systemic Power.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
            The traditional charity model fails because it treats symptoms in
            isolation. Soil is not just dirt—it is the original source code for
            wealth, health, and spirit.
          </p>
        </div>

        {/* Choice-based continuation */}
        <div className="mt-14 max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
            Your Role in the New Ocean
          </h3>

          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            This work moves forward through two kinds of capital: the care that
            restores land directly, and the structure that makes regeneration
            permanent.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Stewardship */}
            <Link
              href="/stewardship"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <h4 className="text-base font-semibold">
                Be a Steward
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                Activate an acre of regeneration and help bring a living system
                back online through direct care of land and soil.
              </p>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Explore stewardship →
              </div>
            </Link>

            {/* Protocol / PRI */}
            <Link
              href="/investor/pri"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <h4 className="text-base font-semibold">
                Invest in the Protocol
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                Review the Syntropic PRI model and see how regeneration becomes
                self-sustaining through long-horizon structure.
              </p>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Review the protocol →
              </div>
            </Link>
          </div>
        </div>

        {/* Trust footer */}
        <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              ZenTrust, Inc. | EIN <span className="font-medium">33-4318487</span> |
              Public Charity <span className="font-medium">170(b)(1)(A)(vi)</span>
            </div>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/docs/irs-determination-letter" className="hover:underline">
                IRS Determination Letter
              </Link>
              <Link href="/financials" className="hover:underline">
                Financials
              </Link>
              <Link href="/governance" className="hover:underline">
                Governance
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </section>
    </main>
  );
}

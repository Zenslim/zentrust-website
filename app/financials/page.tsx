import { GlobalHero } from "@/components/hero/GlobalHero";

export const metadata = {
  title: "Financials | ZenTrust",
  description:
    "Plain details about ZenTrust's financial transparency commitments and compliance filings.",
};

export default function FinancialsPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen">
      <GlobalHero
        kicker="Governance"
        headline="Financial transparency is a daily practice, not a marketing line."
        dek="ZenTrust operates as a 501(c)(3) public charity. Filings, budgets, and stewardship details stay readable and verifiable."
        belowAnchorId={contentId}
        mode="confirm"
        secondaryCta={{ label: "Review the details", href: `#${contentId}` }}
      />

      <div id={contentId} className="mx-auto max-w-3xl px-6 py-16 sm:py-24 space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Governance</p>
          <h1 className="text-4xl font-semibold text-foreground">Financial transparency</h1>
          <p className="text-lg text-muted-foreground">
            ZenTrust operates as a 501(c)(3) public charity. We publish straightforward financial
            information to make our stewardship and compliance easy to verify.
          </p>
        </header>

        <section className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We keep accounting, banking, and audit records organized and accessible. There are no
            commercial affiliates, no fundraising agencies, and no revenue-sharing agreements that
            would conflict with our mission.
          </p>
          <p>
            Annual filings, including Form 990, are prepared for public review. If a filing is still
            in process, we note the timeline and provide the latest submitted version when
            requested.
          </p>
          <p>
            Budgets and spending are documented in plain language. Restricted gifts are tracked so
            they are used exactly as designated. Administrative costs are disclosed alongside
            program spending.
          </p>
        </section>

        <section className="space-y-3 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-semibold text-foreground">What to expect</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>No hidden fees, brokerage percentages, or revenue participation.</li>
            <li>Clear acknowledgement of grants, gifts, and in-kind contributions.</li>
            <li>Form 990 as the canonical public reference for financial disclosures.</li>
            <li>Updates posted without marketing language or donation prompts.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

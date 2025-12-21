import { GlobalHero } from "@/components/hero/GlobalHero";

export default function StewardshipRightsPage() {
  const contentId = "content";

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="Governance & Ethics"
        headline="Stewardship Rights & Participation Ethics."
        dek="A clear statement of rights and responsibilities within our regenerative ecosystem. The full text follows immediately below."
        belowAnchorId={contentId}
        mode="confirm"
      />

      <section id={contentId} className="py-16 md:py-20 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">

          {/* 1. Purpose */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              1. Right to Clarity of Purpose
            </h2>
            <p className="text-muted-foreground">
              Participants have the right to understand the purpose and direction of
              ZenTrust&apos;s work, including:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Our mission in regenerative ecology and BPSS-integrative research.</li>
              <li>How resources are stewarded toward long-term ecological benefit.</li>
              <li>The values that guide our decisions: transparency, regeneration, sovereignty, and interdependence.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              We commit to communicating these foundations in clear, accessible language.
            </p>
          </article>

          {/* 2. Voluntary Participation */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              2. Right to Voluntary Participation
            </h2>
            <p className="text-muted-foreground">
              All forms of engagement with ZenTrust are entirely voluntary. Individuals
              will never be pressured, coerced, or manipulated into participating in
              any form, including resource exchanges.
            </p>
            <p className="text-sm text-muted-foreground">
              Participation arises from inner alignment with the work, not from external
              demand or obligation.
            </p>
          </article>

          {/* 3. Respect & Dignity */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              3. Right to Respect & Dignity
            </h2>
            <p className="text-muted-foreground">
              Every participant will be treated with respect and dignity, regardless of
              the form or scale of their engagement. We recognize participants as
              co-stewards, not as benefactors or clients.
            </p>
            <p className="text-sm text-muted-foreground">
              No hierarchy is assumed between those who share resources, those who share
              knowledge, and those who steward land or communities. All are part of one
              ecological field.
            </p>
          </article>

          {/* 4. Transparent Stewardship */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              4. Right to Transparent Stewardship of Resources
            </h2>
            <p className="text-muted-foreground">
              Participants have the right to understand, at a reasonable level of detail,
              how ZenTrust stewards voluntary resource flows, including:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Allocation toward ecological and watershed regeneration.</li>
              <li>Support for scientific and BPSS-aligned research.</li>
              <li>Strengthening of community sovereignty and livelihoods.</li>
              <li>Development of open-access educational tools and trainings.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Transparency is an ecological principle for us: it strengthens systems and
              builds trust.
            </p>
          </article>

          {/* 5. Privacy & Data Sovereignty */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              5. Right to Privacy & Data Sovereignty
            </h2>
            <p className="text-muted-foreground">
              Participants have the right to know how their personal information is
              collected, used, and protected. This includes:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>The ability to request access, correction, or deletion of their data.</li>
              <li>The option to engage without public recognition.</li>
              <li>Anonymity where requested and reasonably feasible.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              ZenTrust does not sell or trade personal data. Any information shared with
              us is treated as a trust relationship.
            </p>
          </article>

          {/* 6. Non-Solicitation */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              6. Right to Non-Solicitation
            </h2>
            <p className="text-muted-foreground">
              ZenTrust does not engage in high-pressure fundraising or solicitation.
              Individuals have the right:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Not to receive repeated or unwanted appeals for resources.</li>
              <li>Not to be framed as “donors” or “benefactors.”</li>
              <li>To participate purely through learning, reflection, or sharing.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Any resource flow that occurs is understood as a voluntary expression of
              stewardship, not a response to solicitation.
            </p>
          </article>

          {/* 7. Honest Communication */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              7. Right to Honest & Clear Communication
            </h2>
            <p className="text-muted-foreground">
              Participants have the right to receive communication that is honest,
              accurate, and grounded. We will not:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Exaggerate impact or make misleading claims.</li>
              <li>Use imagery or language that manipulates emotions for response.</li>
              <li>Hide risks, limitations, or uncertainties in our work.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Our language aims to reflect reality, not to create artificial urgency.
            </p>
          </article>

          {/* 8. Withdraw / Modify Participation */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              8. Right to Withdraw or Modify Participation
            </h2>
            <p className="text-muted-foreground">
              Participants may change how they engage with ZenTrust at any time. This
              includes:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Adjusting or ending recurring resource flows.</li>
              <li>Unsubscribing from communications.</li>
              <li>Stepping back from involvement without judgment or pressure.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              There is no expectation of continuity; participation is always a choice.
            </p>
          </article>

          {/* 9. Accountability */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              9. Right to Accountability from ZenTrust
            </h2>
            <p className="text-muted-foreground">
              Participants have the right to expect that ZenTrust will:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Operate within the law as a 501(c)(3) public charity.</li>
              <li>Align resource use with its stated mission and values.</li>
              <li>Maintain governance structures that enable oversight.</li>
              <li>Respond in good faith to reasonable questions or concerns.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Accountability is part of our understanding of ecological and social integrity.
            </p>
          </article>

          {/* 10. Access to Information */}
          <article className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              10. Right to Access Key Information
            </h2>
            <p className="text-muted-foreground">
              Participants may request access to publicly available documents, including:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>ZenTrust&apos;s IRS determination letter.</li>
              <li>Governing documents such as bylaws and key policies.</li>
              <li>Required public filings and high-level stewardship summaries.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Open access supports trust, informed participation, and shared learning.
            </p>
          </article>

          {/* Closing Reflection */}
          <article className="space-y-3 border-t border-border pt-8 mt-4">
            <h2 className="text-xl md:text-2xl font-semibold">
              A Shared Field of Stewardship
            </h2>
            <p className="text-muted-foreground">
              Participation in ZenTrust is not transactional; it is relational. This
              framework exists to protect autonomy and dignity while honoring the
              interdependence of people, land, water, and living systems.
            </p>
            <p className="text-sm text-muted-foreground italic">
              “Regeneration begins with sovereignty — of ecosystems, of communities, and of
              the individuals who choose to care for them.”
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

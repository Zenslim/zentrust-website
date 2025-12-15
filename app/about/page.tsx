"use client"

import Link from "next/link"
import { Waves, Feather, Microscope, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* HERO */}
      <section className="pt-14 md:pt-18 pb-10 text-center">
        <div className="max-w-4xl mx-auto px-6">

          <p className="text-xs tracking-widest text-primary uppercase mb-3">
            About ZenTrust
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Regeneration Begins With Relationship
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            ZenTrust is a 501(c)(3) public charity working where land, science,
            and human wellbeing meet. We are not here to fix a broken machine,
            but to remember a living system.
          </p>

        </div>
      </section>

      {/* OUR PERSPECTIVE */}
      <section className="pt-10 md:pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Our Perspective
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            We Do Not See Problems. We See Living Systems.
          </h3>

          <p className="text-muted-foreground leading-relaxed space-y-3">
            <span className="block">
              Regeneration is not a project, a product, or a trend.
              It is a way of seeing.
            </span>
            <span className="block">
              Landscapes are not broken machines.
              Communities are not deficits to be fixed.
              Human wellbeing is not a siloed outcome.
            </span>
            <span className="block">
              They are living systems capable of restoring themselves
              when the right conditions are present.
            </span>
            <span className="block">
              Our work begins by listening long enough
              to understand those conditions.
            </span>
          </p>

        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="pt-10 md:pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Our Approach
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Science With Memory. Care With Structure.
          </h3>

          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            ZenTrust integrates regenerative ecology, watershed restoration,
            and Bio-Psycho-Social-Spiritual research into a single practice,
            ensuring that when land heals, the human body, social fabric,
            and inner life heal with it.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-border/40 px-6 py-6">
              <Microscope className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h4 className="font-semibold mb-2">Science</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rigorous ecological and health research grounded in evidence,
                transparency, and open inquiry.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 px-6 py-6">
              <Users className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h4 className="font-semibold mb-2">Community</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Knowledge rooted in lived experience, cultural memory,
                and shared stewardship of place.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 px-6 py-6">
              <BookOpen className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h4 className="font-semibold mb-2">Education</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Open, accessible learning that restores coherence
                between understanding and action.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="pt-10 md:pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Our Commitment
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Nothing Is Extracted Here
          </h3>

          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-3">
            <span className="block">
              ZenTrust does not persuade, pressure, or solicit.
            </span>
            <span className="block">
              Participation is always voluntary.
              Stewardship emerges from alignment.
            </span>
            <span className="block">
              If something grows here, it grows because
              the conditions were right.
            </span>
          </p>

        </div>
      </section>

      {/* GOVERNANCE & TRANSPARENCY */}
      <section className="pt-12 md:pt-14 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Governance and Transparency
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Clarity Is a Form of Respect
          </h3>

          <ul className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
            <li>IRS 501(c)(3) Public Charity</li>
            <li>EIN: 33-4318487</li>
            <li>Determination Letter: July 1, 2025</li>
            <li>Annual filings and compliance reporting</li>
            <li>Transparent stewardship of all voluntary resource flows</li>
          </ul>

        </div>
      </section>

      {/* OPERATING DISCIPLINE */}
      <section className="pt-4 md:pt-6 pb-12">
        <div className="max-w-4xl mx-auto px-6 space-y-4 text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-2">
            How We Work, Who We Answer To
          </h2>
          <p className="text-base leading-relaxed text-foreground/80">
            ZenTrust operates with a simple mandate: every action must strengthen ecological integrity and human dignity at the same time. Our board reviews program charters quarterly, and community advisors from partner watersheds participate in those reviews. If a pathway does not serve local residents or the land in front of us, it does not ship, no matter how elegant the proposal may be on paper.
          </p>
          <p className="text-base leading-relaxed text-foreground/80">
            Governance is handled with calm discipline. Stewardship teams publish narrative field notes alongside financials so donors, regulators, and neighbors can see how resources are moving. Independent auditors and pro bono legal counsel verify filings, and our public benefit statement is revisited annually to ensure alignment with evolving ecological and social realities. Transparency is treated as a daily practice, not a marketing line.
          </p>
          <p className="text-base leading-relaxed text-foreground/80">
            The public benefit we pursue is tangible: healthier soils, safer water tables, and resilient families who can stay rooted where they belong. Research partnerships with universities and local clinics track outcomes across the Bio-Psycho-Social-Spiritual spectrum, pairing qualitative community testimony with quantitative ecological indicators. This is how we know the work is honest, adaptive, and worthy of support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button asChild>
              <Link href="/financials">View financials</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact the board</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="pt-12 md:pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            If This Resonates
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-10">
            We do not seek followers. We seek alignment.
            If our perspective on land, science, and human wellbeing
            mirrors your own, there are quiet ways to join
            this field of possibility.
          </p>

          <div className="grid sm:grid-cols-2 gap-8">

            <div>
              <Waves className="h-7 w-7 mx-auto mb-3 text-slate-500" strokeWidth={1} />
              <h4 className="font-semibold mb-2">Practice Stewardship</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A voluntary resource flow that supports
                the ongoing work of regeneration.
                No pressure. No urgency.
              </p>
              <Button asChild variant="outline">
                <Link href="/stewardship">
                  Enter the Flow
                </Link>
              </Button>
            </div>

            <div>
              <Feather className="h-7 w-7 mx-auto mb-3 text-slate-500" strokeWidth={1} />
              <h4 className="font-semibold mb-2">Stay Present</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Infrequent, thoughtful dispatches
                from the field and the science of living systems.
              </p>
              <Button asChild variant="outline">
                <Link href="/newsletter">
                  Listen With Us
                </Link>
              </Button>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

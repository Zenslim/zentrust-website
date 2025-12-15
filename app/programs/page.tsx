"use client"

import { Eye, Waves, Sparkles, Microscope } from "lucide-react"

export default function ProgramsPage() {
  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="pt-10 md:pt-12 pb-8 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">
            Programs Arrive When They Are Ready
          </h1>
          <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
            These programs are not being rushed. They are being grown.
            Like forests, they form first underground.
          </p>
        </div>
      </section>

      {/* FRAMING */}
      <section className="pb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Not Initiatives. Living Systems.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not deploy solutions. We cultivate conditions.
            What emerges is shaped by place, community, and time.
          </p>
        </div>
      </section>

      {/* DELIVERY MODEL */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground">
            How Programs Become Real
          </h2>
          <p className="text-base text-foreground/80 leading-relaxed">
            Each program begins with a listening period led by local partners and watershed stewards. Baseline ecological readings, cultural priorities, and livelihood needs are mapped together before any intervention is proposed. This keeps the work accountable to the people who live with the outcomes and prevents extractive, outsider-driven experimentation.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            Funding is released in deliberate phases. Community assemblies review milestones, and scientific advisors validate methods for soil regeneration, water retention, and Bio-Psycho-Social-Spiritual wellbeing. If a milestone fails to serve the land or the community, the next phase waits until conditions are corrected. This rhythm keeps us humble and responsive rather than hurried.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            Oversight is shared: board members, regional scientists, youth apprentices, and indigenous knowledge holders all hold seats at the table. Their perspectives shape curricula, research protocols, and safety standards. The goal is not speed; it is integrity. When a program finally surfaces, it is because enough voices have said yes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/research"
              className="px-5 py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              Read the research approach
            </a>
            <a
              href="/contact"
              className="px-5 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
            >
              Share community priorities
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAM */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-4">
            Regenerative Agriculture Training
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-4">
            This is not a course. It is a re-learning.
            Hands return to soil. Observation replaces prescription.
            Farmers and landscapes learn from each other again.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-3">
            Land heals when relationship is restored.
            Everything else follows.
          </p>

          <p className="font-mono text-xs text-muted-foreground">
            ⦿ Field note: currently gathering strength beneath the surface
          </p>
        </div>
      </section>

      {/* PROGRAM DOMAINS */}
      <section className="pb-12">
        <div className="max-w-5xl mx-auto px-6 space-y-12">

          {/* EDUCATION */}
          <div className="flex gap-4">
            <Eye className="h-6 w-6 mt-1 text-muted-foreground" strokeWidth={1} />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Education
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Education here does not transfer information.
                It rebuilds perception.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                We are not teaching people about the land.
                We are helping them remember how to be of it.
              </p>
            </div>
          </div>

          {/* CONSERVATION */}
          <div className="flex gap-4">
            <Waves className="h-6 w-6 mt-1 text-muted-foreground" strokeWidth={1} />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Conservation
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Conservation is not preservation in glass.
                It is care in motion.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Watersheds are treated as living circulatory systems.
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                ⦿ Field note: mapping the veins of the watershed
              </p>
            </div>
          </div>

          {/* COMMUNITY */}
          <div className="flex gap-4">
            <Sparkles className="h-6 w-6 mt-1 text-muted-foreground" strokeWidth={1} />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Community
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Programs grow from trust, not recruitment.
                Leadership emerges from participation.
              </p>
            </div>
          </div>

          {/* PULL QUOTE */}
          <div className="border-l-2 border-border pl-6 max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl italic font-medium text-foreground">
              Youth pathways are not built.
              <br />
              They are cleared.
            </p>
          </div>

          {/* RESEARCH */}
          <div className="flex gap-4 pt-8">
            <Microscope className="h-6 w-6 mt-1 text-muted-foreground" strokeWidth={1} />
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Research
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                This research does not isolate variables until meaning disappears.
                It integrates body, mind, community, and meaning as one system.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Incomplete science fragments reality.
                Whole science restores it.
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                ⦿ Field note: frameworks forming for open measurement
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CLOSING */}
      <section className="pt-2 pb-14 md:pb-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Growing Slowly. Growing Strong.
          </h2>
          <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
            These programs are seeds.
            Alive. Quiet. Gathering strength beneath the surface.
          </p>
        </div>
      </section>

    </div>
  )
}

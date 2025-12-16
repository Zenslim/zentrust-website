"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { TreePine, Users, Microscope, Hourglass } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImpactPage() {
  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="pt-10 md:pt-12 pb-6 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Impact Begins Before Results
          </motion.h1>

          <motion.p
            className="text-[17px] md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            Before numbers appear, work is already underway. Quiet, patient, and mostly unseen.
          </motion.p>
        </div>
      </section>

      {/* TRANSITION LINE (replaces video for now) */}
      <section className="pb-8 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm text-muted-foreground">
            Healing begins underground. When one root is damaged, the whole system weakens.
            When care is restored, healing propagates naturally.
          </p>
        </div>
      </section>

      {/* WHAT IS ALREADY MOVING */}
      <section className="pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-5">
            What Is Already Moving
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-border/40 px-6 py-6 text-center">
              <TreePine className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h3 className="font-semibold mb-2">The Land</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Baselines established. Watersheds read carefully.
                Soil understood before intervention.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 px-6 py-6 text-center">
              <Users className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h3 className="font-semibold mb-2">The People</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trust forms before programs.
                Youth pathways are not built. They are cleared.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 px-6 py-6 text-center">
              <Microscope className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
              <h3 className="font-semibold mb-2">The Framework</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                BPSS research prepared to honor body, mind,
                community, and meaning together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 */}
      <section className="pb-10 md:pb-12 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Hourglass className="h-7 w-7 mx-auto mb-3 text-muted-foreground" strokeWidth={1} />
          <h2 className="text-xl md:text-2xl font-semibold mb-3">
            First Measurable Outcomes in 2026
          </h2>
          <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
            Foundations are already in place.
            Indicators will emerge in time, measured carefully and shared openly.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="pt-2 pb-14 md:pb-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We Are Not Just Planting Trees.
            <br />
            We Are Planting Time.
          </h2>

          <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed mb-6">
            If you believe that foundations matter more than headlines,
            we invite you to flow with us.
            Your stewardship ensures that this work remains quiet, patient, and true.
          </p>

          <Button asChild size="lg">
            <Link href="/stewardship">Enter the Flow</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}

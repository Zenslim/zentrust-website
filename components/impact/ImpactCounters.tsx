"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, Users, TreePine, BookOpen, Microscope } from "lucide-react"

interface Metric {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: number
  suffix: string
  label: string
  text: string
}

const impactMetrics: Metric[] = [
  {
    icon: TreePine,
    value: 50000,
    suffix: "+",
    label: "Ecosystem Layers to Regenerate",
    text: "Awakening canopy, understory, shrubs, herbs, and root systems across emerging syntropic forests.",
  },
  {
    icon: Leaf,
    value: 2500,
    suffix: "+",
    label: "Regenerative Cells Becoming Anti-Fragile",
    text: "Micro-watershed zones shifting toward self-renewing, drought-resilient ecological behavior.",
  },
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Families Moving Toward Self-Sufficiency",
    text: "Restoring autonomy, dignity, and regenerative livelihood pathways.",
  },
  {
    icon: Microscope,
    value: 15,
    suffix: "",
    label: "Regenerative Research Initiatives",
    text: "Deepening ecological and BPSS-aligned scientific understanding.",
  },
  {
    icon: BookOpen,
    value: 8500,
    suffix: "+",
    label: "Hours of Ecological & Inner Learning",
    text: "Cultivating ecological literacy and inner resilience.",
  },
]

function AnimatedCounter({
  end,
  suffix = "",
  isInView,
}: {
  end: number
  suffix?: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start: number | null = null
    const duration = 1800

    const animate = (t: number) => {
      if (!start) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [end, isInView])

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  )
}

export function ImpactCounters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section ref={ref} className="w-full pt-10 md:pt-12">
      {/* INTRO — tight, no section boxing */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mb-6"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-[18px] md:text-[20px] font-medium text-muted-foreground leading-snug">
          Regeneration is not charity — it is a return to relationship.
          These milestones reflect landscapes remembering how to heal
          and communities rising into sovereignty.
        </p>
      </motion.div>

      {/* METRICS GRID — grounded objects on the global surface */}
      <motion.div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5
          gap-5
          max-w-[1600px] mx-auto px-6
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {impactMetrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={i}
              className="
                rounded-2xl
                bg-card
                border border-border/40
                px-6 py-6
                text-center
              "
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {/* ICON */}
              <div className="flex items-center justify-center mb-3">
                <Icon className="h-7 w-7 text-primary" />
              </div>

              {/* VALUE */}
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                <AnimatedCounter
                  end={metric.value}
                  suffix={metric.suffix}
                  isInView={isInView}
                />
              </div>

              {/* LABEL */}
              <h3 className="text-base md:text-lg font-semibold tracking-tight mb-2">
                {metric.label}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {metric.text}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* OUTRO — minimal, no visual closure band */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mt-8"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-lg md:text-xl font-medium text-foreground leading-snug">
          Land heals through relationship — and so do we.
        </p>
        <p className="mt-1 text-[18px] md:text-[20px] font-semibold text-primary">
          Each step of regeneration strengthens the whole web.
        </p>
      </motion.div>
    </section>
  )
}

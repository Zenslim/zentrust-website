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
    text: "Cultivating ecological literacy and inner resilience through workshops & apprenticeships.",
  },
]

interface AnimatedCounterProps {
  end: number
  suffix?: string
  isInView: boolean
}

function AnimatedCounter({ end, suffix = "", isInView }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start: number | null = null
    const duration = 2000

    const animate = (t: number) => {
      if (!start) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [end, isInView])

  return <>{count.toLocaleString()}{suffix}</>
}

export function ImpactCounters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-20 bg-background overflow-hidden">

      {/* INTRO */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mb-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[20px] md:text-[22px] text-muted-foreground font-medium leading-snug md:leading-normal">
          Regeneration is not charity — it is a return to relationship.
          These milestones reflect landscapes remembering how to heal
          and communities rising into sovereignty.
        </p>
      </motion.div>

      {/* CARDS */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-[1700px] mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {impactMetrics.map((metric, i) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-card border border-border/30 shadow-sm text-center cursor-default"
              variants={{
                hidden: { opacity: 0, y: 35, filter: "brightness(0.7)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "brightness(1)",
                  transition: { duration: 0.55, ease: "easeOut" }
                },
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <motion.div
                className="flex items-center justify-center mb-4"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Icon className="h-8 w-8 text-primary" />
              </motion.div>

              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter end={metric.value} suffix={metric.suffix} isInView={isInView} />
              </div>

              <h3 className="text-lg font-semibold mb-3">{metric.label}</h3>

              <p className="text-sm text-muted-foreground leading-relaxed">{metric.text}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* OUTRO */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mt-16"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75 }}
      >
        <p className="text-xl md:text-2xl font-semibold">
          Land heals through relationship — and so do we.
          <br />
          <span className="text-primary font-bold text-[22px] md:text-[24px]">
            Each step of regeneration strengthens the whole web.
          </span>
        </p>
      </motion.div>

    </section>
  )
}

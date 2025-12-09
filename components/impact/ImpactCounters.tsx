"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Users, TreePine, BookOpen, Microscope } from 'lucide-react'

/**
 * Regenerative Milestones for ZenTrust’s first year.
 * These are not charity outputs — but indicators of ecological awakening,
 * anti-fragile landscape development, and community self-sufficiency.
 * 
 * Each metric represents a deeper transformation:
 * - Layers awakened in emerging ecosystems
 * - Regenerative cells transitioning into anti-fragile systems
 * - Families moving toward sovereignty and interdependence
 * - Research expanding collective ecological intelligence
 * - Hours of inner & outer learning shaping resilient communities
 */
const impactMetrics = [
  {
    icon: TreePine,
    value: 50000,
    label: 'Ecosystem Layers to Regenerate',
    suffix: '+',
    description:
      'Layers of life — canopy, understory, shrubs, herbs, roots — we aim to activate in emerging syntropic forests across watershed nodes. This is not planting trees; it is awakening whole ecosystems.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    icon: Leaf,
    value: 2500,
    label: 'Regenerative Cells Becoming Anti-Fragile',
    suffix: '+',
    description:
      'Micro-watershed zones transitioning into self-renewing, drought-resilient, biodiversity-rich systems. Land that does not merely recover — but grows stronger under stress.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
  {
    icon: Users,
    value: 1200,
    label: 'Families Moving Toward Self-Sufficiency',
    suffix: '+',
    description:
      'Families gaining the tools, skills, and ecological security to thrive without dependency. Not aid, not charity — but the return to autonomy, dignity, and regenerative livelihoods.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: Microscope,
    value: 15,
    label: 'Regenerative Research Initiatives',
    suffix: '',
    description:
      'Studies that deepen humanity’s understanding of climate resilience, syntropic design, watershed behavior, soil regeneration, and BPSS-aligned wellness ecosystems.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    icon: BookOpen,
    value: 8500,
    label: 'Hours of Ecological & Inner Learning',
    suffix: '+',
    description:
      'Workshops, apprenticeships, and community learning journeys cultivating ecological literacy, inner resilience, and a worldview grounded in Ubuntu — “I am because we are.”',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
]

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  isInView: boolean
}

function AnimatedCounter({ end, duration = 2, suffix = '', isInView }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startCount = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeOutCubic * (end - startCount) + startCount)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export function ImpactCounters() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Regeneration Is a Collective Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These milestones are more than numbers — they are signs of life returning,
            communities strengthening, and landscapes remembering how to heal themselves.
            Every step we take honors the principle of
            <span className="italic text-foreground"> Vasudhaiva Kutumbakam — the world is one family.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group space-y-4"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 mb-2">
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>

                {/* Counter */}
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  <AnimatedCounter
                    end={metric.value}
                    suffix={metric.suffix}
                    isInView={isInView}
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {metric.label}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            )
          })}
        </div>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Explore Regenerative Pathways
          </h3>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Regeneration emerges from relationship — between people, land, and the
            intelligence of living systems. Explore how your voluntary participation
            may align with this unfolding work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/donate"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter the Stewardship Portal
            </motion.a>

            <motion.a
              href="/programs"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Programs
            </motion.a>
          </div>

        </motion.div>


      </div>
    </section>
  )
}

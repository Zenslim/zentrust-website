"use client"

import { motion } from 'framer-motion'
import { FadeIn, MotionButton } from './animations'

export function CTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative isolate">
              <div className="animated-gradient absolute inset-0 opacity-80 dark:opacity-90" />
              <div className="relative z-10 grid gap-6 px-8 py-12 sm:px-12 sm:py-14 lg:grid-cols-[1.6fr_1fr] lg:items-center">
                <FadeIn className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Join the movement
                  </p>
                  <h3 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Fund regeneration where science, community, and transparency meet.
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Every contribution unlocks open data, field training, and landscape-scale restoration led by local stewards.
                  </p>
                </FadeIn>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                  <MotionButton
                    href="https://www.zentrust.world/stewardship"
                    pulse
                    size="lg"
                    className="rounded-full"
                  >
                    <span className="flex items-center gap-2">Donate now</span>
                  </MotionButton>
                  <MotionButton
                    href="/impact"
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                  >
                    <span className="flex items-center gap-2">View impact data</span>
                  </MotionButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

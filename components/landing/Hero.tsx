"use client"

import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { FadeIn, FloatingOrb, MotionButton, ParallaxText, Stagger, StaggerItem } from './animations'
import { Counter } from '@/components/motion/Counter'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white text-foreground dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.14),transparent_38%),radial-gradient(circle_at_70%_70%,rgba(236,254,255,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.18),transparent_38%),radial-gradient(circle_at_70%_70%,rgba(236,254,255,0.08),transparent_32%)]" />
      <FloatingOrb size={420} blur={160} offset={0.4} className="top-10 -left-32" />
      <FloatingOrb size={360} blur={120} color="rgba(6,182,212,0.16)" offset={1.2} className="bottom-0 right-[-120px]" />
      <FloatingOrb size={220} blur={90} color="rgba(94,234,212,0.18)" offset={0.8} className="top-1/2 left-10" />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-24 sm:px-8 lg:px-10">
        <div className="mb-12 inline-flex items-center rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="h-3 w-3" />
          </span>
          Regenerating ecosystems with science, data, and community.
        </div>

        <Stagger className="space-y-6">
          <StaggerItem>
            <ParallaxText className="text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              <span className="text-foreground/80">From soil to society—</span>{' '}
              <span className="bg-gradient-to-r from-primary via-emerald-500 to-foreground bg-clip-text text-transparent">
                rebuilding Earth’s regenerative systems.
              </span>
            </ParallaxText>
          </StaggerItem>

          <StaggerItem>
            <FadeIn className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
              ZenTrust unites field scientists, technologists, and local leaders to restore landscapes,
              secure water, and accelerate regenerative agriculture at planetary scale.
            </FadeIn>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <MotionButton
                href="https://www.zentrust.world/stewardship"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25"
              >
                <div className="flex items-center gap-2">
                  Donate to restore earth
                  <ArrowRight className="h-4 w-4" />
                </div>
              </MotionButton>
              <MotionButton
                href="/impact"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-base font-semibold text-foreground backdrop-blur transition hover:border-primary/60 hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  Explore our research
                  <Play className="h-4 w-4 fill-foreground/70 text-foreground" />
                </div>
              </MotionButton>
            </div>
          </StaggerItem>
        </Stagger>

        <div className="mt-12 grid gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 backdrop-blur lg:grid-cols-3">
          {[
            { label: 'Real-time soil intelligence', value: 120000, suffix: '+' },
            { label: 'Hectares under restoration', value: 42000, suffix: '+' },
            { label: 'Communities co-designing with us', value: 38, suffix: '' },
          ].map((item) => (
            <FadeIn key={item.label} className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              <div className="text-lg font-semibold text-foreground">
                <Counter from={0} to={item.value} duration={1.2} suffix={item.suffix} />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

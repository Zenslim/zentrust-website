"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const missionAreas = [
  {
    title: "Regenerative Ecology",
    desc: "Restoring forests, watersheds, soils, and native ecosystems.",
    status: "Launching 2025",
  },
  {
    title: "BPSS Integrative Wellness Research",
    desc: "Research linking ecological conditions and holistic human health using the BPSS model.",
    status: "In Development",
  },
  {
    title: "Open Scientific Education & Community Training",
    desc: "Workshops, farmer training, and open-access public education programs.",
    status: "Starting Soon",
  },
  {
    title: "Global Partnerships & Grantmaking",
    desc: "Supporting aligned nonprofits and community-led regeneration worldwide.",
    status: "Forming Now",
  },
]

const achievements = [
  "Regenerative Ecology Foundations",
  "BPSS Wellness Research Initiatives",
  "Watershed & Soil Restoration Planning",
  "Open-Access Scientific Education",
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % missionAreas.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-36">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10" />

      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Wrapper */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* BADGE */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Advancing ecological regeneration, BPSS research & public scientific education.
            </div>

            {/* HEADLINE */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground space-y-1">
              <span className="block">Healing Land.</span>
              <span className="block gradient-text">Elevating Humanity.</span>
              <span className="block">Science for Regeneration.</span>
            </h1>

            {/* SUBTEXT */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative ecology,
              BPSS-integrative wellness research, and open scientific education.
            </p>

            {/* IRS LINK */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              ZenTrust is recognized by the IRS as a 170(b)(1)(A)(vi) public charity.
              <a
                href="https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf"
                target="_blank"
                className="ml-1 underline font-semibold hover:text-primary"
              >
                View official IRS determination letter
              </a>
            </p>

            {/* ACHIEVEMENTS */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              {achievements.map((a, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{a}</span>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/donate">
                  Enter the Regeneration Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4" />
                Watch Our Vision
              </Button>
            </div>
          </motion.div>

          {/* RIGHT SIDE – RESPONSIVE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-6">Our Mission Areas</h3>

              {/* FIXED GRID → 1 column on mobile, 2 on md+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {missionAreas.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      current === index ? "bg-primary/10 scale-[1.02]" : "bg-muted/40 hover:bg-muted/60"
                    }`}
                  >
                    <div className="text-base sm:text-lg font-semibold mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">{item.status}</div>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* BOTTOM CARD */}
              <div className="mt-6 p-5 sm:p-6 bg-gradient-to-r from-primary/15 to-emerald-500/15 rounded-xl text-center">
                <h4 className="text-lg font-bold mb-1">The Journey Begins</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  ZenTrust is cultivating long-term ecological and community architectures that support regeneration.
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link href="/about">Explore Our Vision</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

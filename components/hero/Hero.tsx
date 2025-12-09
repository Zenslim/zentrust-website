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
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % missionAreas.length),
      3200
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center pt-24 md:pt-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.045]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Wrapper */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Advancing ecological regeneration, BPSS research & public scientific education.
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground space-y-1">
              <span className="block">Healing Land.</span>
              <span className="block gradient-text">Elevating Humanity.</span>
              <span className="block">Science for Regeneration.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
              ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative ecology,
              BPSS-integrative wellness research, and open scientific education.
            </p>

            {/* IRS Link */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              ZenTrust is recognized by the IRS as a 170(b)(1)(A)(vi) public charity.
              <a
                href="/irs-letter.pdf"
                target="_blank"
                className="ml-1 underline font-semibold hover:text-primary"
              >
                View official IRS determination letter
              </a>
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              {achievements.map((a, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{a}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
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

          {/* RIGHT SIDE — GLASS PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center">Our Mission Areas</h3>

            <div className="rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl shadow-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {missionAreas.map((item, index) => (
                  <div
                    key={index}
                    className={`transition-colors duration-300 ${
                      current === index ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <div className="text-base sm:text-lg font-semibold mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">{item.status}</div>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Journey Begins */}
              <div className="mt-6 pt-5 border-t border-white/30 text-center space-y-3">
                <h4 className="text-lg font-bold">The Journey Begins</h4>
                <p className="text-sm text-muted-foreground">
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



"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Updated pillars (IRS-aligned + descriptive)
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

// Achievement highlights (kept concise and mission-aligned)
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[110px] md:pt-[140px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-emerald-500/10" />
      {/* Soft pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE — TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Advancing ecological regeneration, BPSS research & public scientific education.
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Healing Land.
              <span className="block gradient-text">Elevating Humanity.</span>
              <span className="block">Science for Regeneration.</span>
            </motion.h1>

            {/* SUBHEADLINE — refined for clarity */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-8 max-w-xl"
            >
              ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative ecology,
              BPSS-integrative wellness research, and open scientific education.  
              We are building long-term ecological and scientific foundations that benefit communities and the living world.
            </motion.p>

            {/* IRS LETTER */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground mb-8"
            >
              ZenTrust is recognized by the IRS as a 170(b)(1)(A)(vi) public charity.  
              <Link
                href="/IRS_Determination_Letter.pdf"
                target="_blank"
                className="ml-1 font-semibold text-foreground underline hover:text-primary transition-colors"
              >
                View official IRS determination letter
              </Link>
            </motion.div>

            {/* ACHIEVEMENTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {achievements.map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link href="/donate">
                  Support the Regeneration
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Our Vision
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — MISSION CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-8 backdrop-blur-sm border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Our Mission Areas
              </h3>

              <div className="grid grid-cols-2 gap-6">
                {missionAreas.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      current === index ? "bg-primary/10 scale-[1.03]" : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="text-lg font-semibold text-foreground mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground font-medium mb-1">{item.status}</div>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-primary/15 to-emerald-500/15 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground mb-2">The Journey Begins</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    As a newly recognized 501(c)(3), ZenTrust is establishing the ecological, scientific, 
                    and community foundations that will shape long-term regenerative impact. 
                    Your support helps build this future from the ground up.
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/about">Explore Our Vision</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

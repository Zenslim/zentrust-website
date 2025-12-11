"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

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
  const { theme } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % missionAreas.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-36 overflow-hidden">
      {/* ============================= */}
      {/* 🌿 ATMOSPHERIC BACKGROUND LAYERS */}
      {/* ============================= */}

      {/* BASE GRADIENT — ALWAYS ON */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/40 to-emerald-900/70 dark:from-slate-950 dark:via-slate-900 dark:to-black" />

      {/* LIGHT MODE FLOATING LEAF GLOWS */}
      {theme === "light" && (
        <>
          <div className="floating-blob left-10 top-20 bg-emerald-300/30" />
          <div className="floating-blob right-14 top-40 bg-lime-300/20" />
          <div className="floating-blob left-1/3 bottom-10 bg-emerald-200/25" />
        </>
      )}

      {/* DARK MODE STARFIELD + MOON */}
      {theme === "dark" && (
        <>
          <div className="starfield absolute inset-0 opacity-40" />
          <div className="moon" />
        </>
      )}

      {/* WRAPPER */}
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
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium backdrop-blur-[2px]">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Advancing ecological regeneration, BPSS research & public scientific education.
            </div>

            {/* HEADLINE */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight space-y-1">
              <span className="block animate-text">Healing Land.</span>
              <span className="block gradient-pulse">Elevating Humanity.</span>
              <span className="block animate-text">Science for Regeneration.</span>
            </h1>

            {/* SUBTEXT */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground/90 max-w-xl">
              ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative ecology,
              BPSS-integrative wellness research, and open scientific education.
            </p>

            {/* IRS LINK */}
            <p className="text-xs sm:text-sm text-muted-foreground/90">
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
                <div key={idx} className="flex items-center space-x-2 fade-in-delayed">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{a}</span>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-600/20">
                <Link href="/donate">
                  Enter the Regeneration Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="w-full sm:w-auto backdrop-blur-sm">
                <Play className="mr-2 h-4 w-4" />
                Watch Our Vision
              </Button>
            </div>
          </motion.div>

          {/* RIGHT SIDE – MISSION AREAS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 backdrop-blur-[1px]"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center">Our Mission Areas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {missionAreas.map((item, index) => (
                <div
                  key={index}
                  className={`py-3 transition-colors duration-300 ${
                    current === index ? "text-primary" : "text-foreground"
                  }`}
                >
                  <div className="text-base sm:text-lg font-semibold mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground font-medium mb-1">{item.status}</div>
                  <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center space-y-3">
              <h4 className="text-lg font-bold">The Journey Begins</h4>
              <p className="text-sm text-muted-foreground">
                ZenTrust is cultivating long-term ecological and community architectures that support regeneration.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/about">Explore Our Vision</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================= */}
      {/* ADDITIONAL CSS (global inside this component) */}
      {/* ============================= */}

      <style jsx global>{`
        /* Floating atmospheric blobs (light mode) */
        .floating-blob {
          position: absolute;
          width: 120px;
          height: 120px;
          filter: blur(40px);
          border-radius: 50%;
          animation: float 12s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        /* Dark mode starfield */
        .starfield {
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 3px 3px;
          animation: twinkle 6s infinite alternate ease-in-out;
        }

        @keyframes twinkle {
          0% { opacity: 0.25; }
          100% { opacity: 0.45; }
        }

        /* Moon */
        .moon {
          position: absolute;
          top: 80px;
          right: 40px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 30%, rgba(255,255,255,0.05) 70%);
          opacity: 0.9;
          animation: moonFloat 14s ease-in-out infinite;
        }

        @keyframes moonFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0); }
        }

        /* Gradient text pulse */
        .gradient-pulse {
          background: linear-gradient(90deg, #f7c483, #e89d3f, #f7c483);
          background-size: 200%;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientShift 6s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0%; }
          100% { background-position: 100%; }
        }

        /* Soft shimmer for the other headings */
        .animate-text {
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }

        .fade-in-delayed {
          animation: fade 1.4s ease forwards;
        }

        @keyframes fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

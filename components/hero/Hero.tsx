"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)
  const fgParallaxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* DESKTOP PARALLAX MOVEMENT */
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) return
      setOffsetY(window.scrollY * 0.2)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* PARTICLE FLOATING LAYER */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      s: Math.random() * 0.3 + 0.1,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.25)"
        ctx.fill()

        p.y -= p.s
        if (p.y < 0) p.y = height
      })
      requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  /* CAMERA SWAY (Global breathing motion) */
  useEffect(() => {
    let angle = 0
    const sway = () => {
      angle += 0.002
      if (fgParallaxRef.current) {
        fgParallaxRef.current.style.transform =
          `translateY(${offsetY}px) rotate(${Math.sin(angle) * 0.6}deg)`
      }
      requestAnimationFrame(sway)
    }
    sway()
  }, [offsetY])

  return (
    <section
      className="
        relative min-h-screen flex items-center justify-center text-center
        px-6 pt-24 pb-20 overflow-hidden
        bg-gradient-to-b from-[#FAFAF7] to-[#F2F2ED]
        dark:from-[#060B08] dark:to-[#0A1E17]
      "
    >
      {/* DESKTOP BACKGROUND IMAGE */}
      <div
        ref={fgParallaxRef}
        className="
          hidden md:block absolute inset-0 bg-cover bg-center 
          brightness-[0.75] contrast-[1.15] saturate-[0.9]
          will-change-transform
        "
        style={{
          backgroundImage: `url('/images/zentrust-hero-image.jpeg')`,
        }}
      />

      {/* LIGHT RAY OVERLAY */}
      <div className="
        hidden md:block absolute inset-0 
        bg-[url('/images/light-rays.png')] opacity-[0.35] 
        mix-blend-screen animate-pulse-slow
      " />

      {/* DARKENING VIGNETTE FOR READABILITY */}
      <div className="
        hidden md:block absolute inset-0 
        bg-[rgba(0,0,0,0.55)]
        backdrop-blur-[2px]
      " />

      {/* FLOATING PARTICLES */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.5]"
      />

      {/* TEXT BLOCK */}
      <div className="relative z-20 max-w-2xl mx-auto animate-fade-in">

        {/* BADGE */}
        <div className="
          inline-flex items-center px-4 py-1.5 mb-6 rounded-full
          bg-emerald-700/20 dark:bg-white/10
          text-emerald-900 dark:text-white
          text-sm font-medium backdrop-blur
        ">
          ZenTrust · Ecological & Scientific Stewardship
        </div>

        {/* IMMERSIVE BREATHING HEADLINE */}
        <h1 className="font-bold leading-tight space-y-4 animate-breathe">

          <span className="
            block text-4xl sm:text-5xl md:text-6xl
            bg-gradient-to-r from-emerald-300 to-emerald-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_14px_rgba(0,0,0,0.65)]
          ">
            Healing Land.
          </span>

          <span className="
            block text-4xl sm:text-5xl md:text-6xl
            bg-gradient-to-r from-amber-300 to-orange-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_14px_rgba(0,0,0,0.65)]
          ">
            Elevating Humanity.
          </span>

          <span className="
            block text-4xl sm:text-5xl md:text-6xl
            bg-gradient-to-r from-cyan-300 to-blue-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_14px_rgba(0,0,0,0.65)]
          ">
            Science for Regeneration.
          </span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-light leading-relaxed max-w-xl mx-auto animate-fade-up">
          ZenTrust is a <strong>501(c)(3) public charity</strong> advancing regenerative ecology,
          BPSS-integrative wellness research, and open scientific education.
        </p>

        <div className="mt-10 animate-fade-up-delayed">
          <Button
            asChild
            className="
              px-9 py-4 rounded-full text-lg shadow-xl
              bg-emerald-600 hover:bg-emerald-700 text-white
              transition-all duration-300 hover:shadow-emerald-500/40
            "
          >
            <Link href="/stewardship">Enter the Stewardship Portal</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

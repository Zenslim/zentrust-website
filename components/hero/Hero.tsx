"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* PARALLAX SCROLL */
  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.3)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* PARTICLE CANVAS */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      s: Math.random() * 0.4 + 0.2,
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
      width = (canvas.width = window.innerWidth)
      height = (canvas.height = window.innerHeight)
    }
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-24 md:pt-32">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('/images/zentrust-hero-image.jpeg')`,
          transform: `translateY(${offsetY}px)`
        }}
      />

      {/* DARK GREEN OVERLAY */}
      <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-[1px]" />

      {/* PARTICLE LAYER */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* HERO TEXT BLOCK */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white drop-shadow-xl">

        {/* BADGE */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium backdrop-blur mb-6">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
          Advancing ecological regeneration, BPSS research & scientific education.
        </div>

        {/* HEADLINE (3 clean rows) */}
        <h1 className="font-bold leading-tight">

          <span className="block text-4xl sm:text-5xl md:text-6xl">
            Healing Land.
          </span>

          <span className="block text-4xl sm:text-5xl md:text-6xl text-orange-300">
            Elevating Humanity.
          </span>

          <span className="block text-4xl sm:text-5xl md:text-6xl">
            Science for Regeneration.
          </span>

        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg md:text-xl font-light max-w-2xl mx-auto">
          ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative ecology,
          BPSS-integrative wellness research, and open scientific education.
        </p>

        {/* IRS DETERMINATION LINK */}
        <p className="text-sm opacity-90 mt-2">
          Recognized by the IRS as a 170(b)(1)(A)(vi) public charity.
          <a
            href="https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf"
            target="_blank"
            className="underline ml-1 font-semibold hover:text-emerald-200"
          >
            View official determination letter
          </a>
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl"
            asChild
          >
            <Link href="/stewardship">Enter the Stewardship Portal</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

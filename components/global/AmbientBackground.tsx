"use client"

import { useEffect, useRef } from "react"

type AmbientBackgroundProps = {
  className?: string
}

export function AmbientBackground({ className = "absolute inset-0 w-full h-full -z-10 md:hidden pointer-events-none" }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()

    const isDark = () => document.documentElement.classList.contains("dark")

    const leafPath = new Path2D(
      "M0,-24 C12,-22 24,-8 18,10 C14,22 4,32 0,38 C-4,32 -14,22 -18,10 C-24,-8 -12,-22 0,-24 z",
    )
    const wingPath = new Path2D(
      "M0,-16 C10,-20 22,-12 24,0 C22,12 12,22 0,18 C-12,22 -22,12 -24,0 C-22,-12 -10,-20 0,-16 z",
    )

    const leaves = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      scale: Math.random() * 0.4 + 0.7,
      drift: Math.random() * 0.6 + 0.3,
      spin: Math.random() * 0.01 + 0.004,
      angle: Math.random() * Math.PI * 2,
      hue: 120 + Math.random() * 40,
      sway: Math.random() * 18 + 12,
    }))

    const butterflies = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      amplitude: Math.random() * 18 + 10,
      speed: Math.random() * 0.8 + 0.4,
      phase: Math.random() * Math.PI * 2,
      hue: 280 + Math.random() * 80,
      size: Math.random() * 0.35 + 0.65,
    }))

    const pollen = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.8,
      driftX: Math.random() * 0.2 - 0.1,
      driftY: Math.random() * 0.4 + 0.3,
      noise: Math.random() * Math.PI * 2,
    }))

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      twinkle: Math.random() * 0.6 + 0.3,
      offset: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    let rafId: number

    const drawAurora = (time: number) => {
      const { width, height } = canvas
      const gradient = ctx.createLinearGradient(0, height * 0.25, width, height * 0.8)
      gradient.addColorStop(0, "rgba(120, 80, 255, 0.18)")
      gradient.addColorStop(0.35, "rgba(80, 200, 255, 0.15)")
      gradient.addColorStop(0.7, "rgba(60, 255, 200, 0.18)")
      gradient.addColorStop(1, "rgba(180, 120, 255, 0.16)")

      ctx.save()
      ctx.globalCompositeOperation = "screen"
      const wave = Math.sin(time * 0.0006) * 40
      ctx.translate(Math.sin(time * 0.0004) * 30, 0)
      ctx.beginPath()
      ctx.moveTo(0, height * 0.4)
      for (let x = 0; x <= width; x += 10) {
        const y = height * 0.45 + Math.sin(x * 0.01 + wave) * 30 + Math.cos(time * 0.0008 + x * 0.008) * 12
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      if (!isDark()) {
        const bg = ctx.createLinearGradient(0, 0, 0, height)
        bg.addColorStop(0, "#f6fff6")
        bg.addColorStop(1, "#e7f6ea")
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, width, height)

        pollen.forEach((p) => {
          ctx.save()
          ctx.shadowColor = "rgba(255, 247, 200, 0.5)"
          ctx.shadowBlur = 6
          ctx.fillStyle = "rgba(255, 255, 210, 0.65)"
          const wobbleX = Math.sin(frame * 0.01 + p.noise) * 0.6
          const wobbleY = Math.cos(frame * 0.008 + p.noise) * 0.4
          ctx.beginPath()
          ctx.arc(p.x + wobbleX, p.y + wobbleY, p.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          p.y -= p.driftY
          p.x += p.driftX
          if (p.y < -6) p.y = height + 6
          if (p.x > width + 6) p.x = -6
          if (p.x < -6) p.x = width + 6
        })

        leaves.forEach((leaf) => {
          ctx.save()
          ctx.translate(leaf.x / 1.5, leaf.y / 1.5)
          ctx.rotate(leaf.angle)
          ctx.scale(leaf.scale, leaf.scale)
          const gradient = ctx.createRadialGradient(0, -6, 4, 0, 0, 28)
          gradient.addColorStop(0, `hsla(${leaf.hue}, 45%, 55%, 0.9)`)
          gradient.addColorStop(1, `hsla(${leaf.hue - 18}, 60%, 35%, 0.85)`)
          ctx.fillStyle = gradient
          ctx.filter = "drop-shadow(0px 4px 6px rgba(0,0,0,0.08))"
          ctx.fill(leafPath)
          ctx.restore()

          leaf.y -= leaf.drift
          leaf.angle += leaf.spin
          leaf.x += Math.sin(frame * 0.01) * 0.2 + Math.sin(frame * 0.02) * 0.1

          if (leaf.y < -40) {
            leaf.y = height + 30
            leaf.x = Math.random() * width
          }
        })

        butterflies.forEach((bf) => {
          ctx.save()
          const wave = Math.sin(frame * 0.02 + bf.phase) * bf.amplitude
          const flutter = Math.sin(frame * 0.25 + bf.phase) * 0.6
          ctx.translate(bf.x + wave, bf.y)
          ctx.scale(bf.size, bf.size)
          ctx.rotate(Math.sin(frame * 0.01 + bf.phase) * 0.1)

          const wingGradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 26)
          wingGradient.addColorStop(0, `hsla(${bf.hue}, 90%, 70%, 0.8)`)
          wingGradient.addColorStop(1, `hsla(${bf.hue + 30}, 80%, 55%, 0.65)`)
          ctx.fillStyle = wingGradient

          ctx.save()
          ctx.scale(1 + flutter, 1)
          ctx.fill(wingPath)
          ctx.restore()

          ctx.save()
          ctx.scale(-(1 + flutter), 1)
          ctx.fill(wingPath)
          ctx.restore()

          ctx.restore()

          bf.y -= bf.speed
          bf.x += Math.sin(frame * 0.01 + bf.phase) * 0.6
          if (bf.y < -30) {
            bf.y = height + 30
            bf.x = Math.random() * width
          }
        })
      } else {
        const deep = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, height * 0.9)
        deep.addColorStop(0, "#0a0b20")
        deep.addColorStop(1, "#050510")
        ctx.fillStyle = deep
        ctx.fillRect(0, 0, width, height)

        stars.forEach((star) => {
          const twinkle = 0.6 + Math.sin(frame * 0.03 + star.offset) * 0.25
          ctx.beginPath()
          ctx.arc(star.x / 1.4, star.y / 1.4, star.r * twinkle, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(220, 220, 255, ${star.twinkle})`
          ctx.fill()
        })

        drawAurora(frame)
      }

      frame += 1
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    const onResize = () => setSize()
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}

"use client"

import { useEffect, useRef } from "react"
import { Butterfly, Flower2, Leaf, Sparkles } from "lucide-react"

type AmbientBackgroundProps = {
  className?: string
}

type DriftParticle = {
  x: number
  y: number
  scale: number
  speed: number
  offset: number
  hue: number
}

type ButterflyParticle = {
  x: number
  y: number
  amplitude: number
  wavelength: number
  speed: number
  offset: number
  scale: number
}

type SparkleParticle = {
  x: number
  y: number
  scale: number
  twinkle: number
  offset: number
}

type StarParticle = {
  x: number
  y: number
  radius: number
  speed: number
  offset: number
}

type FlowerParticle = {
  x: number
  y: number
  driftX: number
  driftY: number
  scale: number
  rotation: number
}

const LEAF_PATH = "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
const LEAF_VEIN_PATH = "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
const BUTTERFLY_PATH =
  "M4 10c1-3 4.5-5.5 7.5-3.2c.5.37 1 .83 1.5 1.45c.5-.62 1-1.08 1.5-1.45C17.5 4.5 21 7 22 10c.6 2-1.1 4.2-3.4 4.2c-1.3 0-2.6-.64-3.6-1.7l-1 1.5c.7 1.8 1 3.6 1 6h-4c0-2.4.3-4.2 1-6l-1-1.5C8 13.56 6.7 14.2 5.4 14.2C3.1 14.2 2.4 12 3 10Z"
const FLOWER_PATH =
  "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"
const SPARKLES_PATH =
  "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"

const noise2d = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return s - Math.floor(s)
}

export function AmbientBackground({ className = "absolute inset-0 -z-10 block md:hidden pointer-events-none" }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const iconReferences = [Leaf, Butterfly, Flower2, Sparkles]
  void iconReferences

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.innerWidth >= 768) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const setSize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()

    const leafShape = new Path2D(LEAF_PATH)
    const leafVein = new Path2D(LEAF_VEIN_PATH)
    const butterflyShape = new Path2D(BUTTERFLY_PATH)
    const flowerShape = new Path2D(FLOWER_PATH)
    const sparkleShape = new Path2D(SPARKLES_PATH)

    const leaves: DriftParticle[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      scale: 0.5 + Math.random() * 0.6,
      speed: 0.4 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      hue: 125 + Math.random() * 30,
    }))

    const butterflies: ButterflyParticle[] = Array.from({ length: 2 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      amplitude: 16 + Math.random() * 10,
      wavelength: 160 + Math.random() * 60,
      speed: 0.4 + Math.random() * 0.35,
      offset: Math.random() * Math.PI * 2,
      scale: 0.65 + Math.random() * 0.45,
    }))

    const sparkles: SparkleParticle[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      scale: 0.3 + Math.random() * 0.4,
      twinkle: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }))

    const stars: StarParticle[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 0.5 + Math.random() * 1.2,
      speed: 0.08 + Math.random() * 0.08,
      offset: Math.random() * Math.PI * 2,
    }))

    const flowers: FlowerParticle[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      driftX: (Math.random() * 0.4 - 0.2) * 0.6,
      driftY: (Math.random() * 0.3 + 0.2) * 0.8,
      scale: 0.45 + Math.random() * 0.35,
      rotation: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    let rafId = 0

    const isDark = () => document.documentElement.classList.contains("dark")

    const drawAurora = (time: number) => {
      const { width, height } = canvas
      const aurora = ctx.createLinearGradient(0, height * 0.2, width, height)
      aurora.addColorStop(0, "rgba(95, 170, 255, 0.16)")
      aurora.addColorStop(0.35, "rgba(120, 95, 255, 0.14)")
      aurora.addColorStop(0.7, "rgba(70, 255, 200, 0.18)")
      aurora.addColorStop(1, "rgba(160, 255, 240, 0.12)")

      ctx.save()
      ctx.globalCompositeOperation = "screen"
      ctx.translate(Math.sin(time * 0.0004) * 24, 0)
      ctx.beginPath()
      ctx.moveTo(0, height * 0.45)
      for (let x = 0; x <= width; x += 10) {
        const wave = Math.sin(x * 0.008 + time * 0.0006) * 28
        const noiseWave = noise2d(x * 0.01, time * 0.0008) * 18
        ctx.lineTo(x, height * 0.45 + wave + noiseWave)
      }
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fillStyle = aurora
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      if (!isDark()) {
        const bg = ctx.createLinearGradient(0, 0, 0, height)
        bg.addColorStop(0, "#f3faf3")
        bg.addColorStop(1, "#e5f6ea")
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, width, height)

        leaves.forEach((leaf) => {
          ctx.save()
          const sway = Math.sin(frame * 0.01 + leaf.offset) * 12
          const drift = Math.cos(frame * 0.008 + leaf.offset) * 8
          ctx.translate(leaf.x + sway, leaf.y + drift)
          ctx.scale(leaf.scale, leaf.scale)
          ctx.rotate(Math.sin(frame * 0.005 + leaf.offset) * 0.4)
          const gradient = ctx.createLinearGradient(-6, -20, 14, 22)
          gradient.addColorStop(0, `hsla(${leaf.hue}, 65%, 60%, 0.9)`)
          gradient.addColorStop(1, `hsla(${leaf.hue - 18}, 50%, 36%, 0.85)`)
          ctx.fillStyle = gradient
          ctx.fill(leafShape)
          ctx.strokeStyle = `hsla(${leaf.hue - 25}, 40%, 28%, 0.6)`
          ctx.lineWidth = 1.6
          ctx.stroke(leafVein)
          ctx.restore()

          leaf.y -= leaf.speed
          leaf.x += Math.sin(frame * 0.008 + leaf.offset) * 0.6
          if (leaf.y < -30) {
            leaf.y = height + 30
            leaf.x = Math.random() * width
          }
        })

        butterflies.forEach((bf) => {
          const pathX = bf.x + Math.sin((frame + bf.offset * 60) / bf.wavelength) * bf.amplitude
          const pathY = bf.y + Math.sin((frame + bf.offset * 60) / (bf.wavelength * 0.6)) * bf.amplitude * 0.7
          ctx.save()
          ctx.translate(pathX, pathY)
          ctx.scale(bf.scale, bf.scale)
          ctx.rotate(Math.sin(frame * 0.01 + bf.offset) * 0.2)
          const wingGradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 20)
          wingGradient.addColorStop(0, "rgba(173, 108, 255, 0.8)")
          wingGradient.addColorStop(1, "rgba(255, 189, 120, 0.65)")
          ctx.fillStyle = wingGradient
          ctx.fill(butterflyShape)
          ctx.restore()

          bf.y -= bf.speed
          bf.x += noise2d(frame * 0.002 + bf.offset, 0) * 1.5 - 0.75
          if (bf.y < -24) {
            bf.y = height + 24
            bf.x = Math.random() * width
          }
        })

        sparkles.forEach((sp) => {
          const twinkle = 0.4 + Math.sin(frame * 0.05 + sp.offset) * sp.twinkle
          ctx.save()
          ctx.translate(sp.x, sp.y)
          ctx.scale(sp.scale * (0.9 + twinkle * 0.2), sp.scale * (0.9 + twinkle * 0.2))
          ctx.rotate(frame * 0.002 + sp.offset)
          ctx.globalAlpha = 0.35 + twinkle * 0.5
          ctx.fillStyle = "rgba(255, 221, 130, 0.9)"
          ctx.fill(sparkleShape)
          ctx.restore()
        })
      } else {
        const space = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, height * 0.85)
        space.addColorStop(0, "#080a1d")
        space.addColorStop(1, "#03050d")
        ctx.fillStyle = space
        ctx.fillRect(0, 0, width, height)

        stars.forEach((star) => {
          const twinkle = 0.6 + Math.sin(frame * star.speed + star.offset) * 0.25
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * twinkle, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(235, 240, 255, ${0.5 + twinkle * 0.5})`
          ctx.fill()
        })

        drawAurora(frame)

        flowers.forEach((fl) => {
          ctx.save()
          ctx.translate(fl.x, fl.y)
          ctx.scale(fl.scale, fl.scale)
          ctx.rotate(fl.rotation + Math.sin(frame * 0.002) * 0.08)
          ctx.strokeStyle = "rgba(180, 220, 255, 0.6)"
          ctx.lineWidth = 1.4
          ctx.shadowColor = "rgba(80, 200, 255, 0.4)"
          ctx.shadowBlur = 6
          ctx.stroke(flowerShape)
          ctx.restore()

          fl.x += fl.driftX + Math.sin(frame * 0.002 + fl.rotation) * 0.3
          fl.y += fl.driftY + Math.cos(frame * 0.002 + fl.rotation) * 0.2
          if (fl.y > height + 30) fl.y = -20
          if (fl.x > width + 20) fl.x = -20
          if (fl.x < -20) fl.x = width + 20
        })
      }

      frame += 1
      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    const resizeObserver = new ResizeObserver(() => setSize())
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}

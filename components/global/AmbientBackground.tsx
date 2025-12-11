"use client"
import { useEffect, useRef } from "react"

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.innerWidth >= 768) return // MOBILE ONLY

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isDark = () =>
      document.documentElement.classList.contains("dark")

    /* TOUCH PARALLAX STATE */
    let touchX = 0
    let touchY = 0

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      touchX = (t.clientX / width - 0.5) * 20
      touchY = (t.clientY / height - 0.5) * 20
    }
    window.addEventListener("touchmove", handleTouch, { passive: true })

    /* LIGHT MODE ELEMENTS */
    const pollenCount = 45
    const leafCount = 10
    const butterflyCount = 4
    const fogLayer = new Image()
    fogLayer.src = "/images/fog-layer.png" // simple 1024px transparent mist image

    const pollen = Array.from({ length: pollenCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.5,
      s: Math.random() * 0.5 + 0.1,
    }))

    const leaves = Array.from({ length: leafCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 18 + 12,
      drift: Math.random() * 0.5 + 0.2,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 0.4 + 0.05,
    }))

    const butterflies = Array.from({ length: butterflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      s: Math.random() * 0.8 + 0.4,
      phase: Math.random() * Math.PI * 2,
      color: ["#FF8FD5", "#FFA74D", "#74D7FF", "#A6FF9F"][
        Math.floor(Math.random() * 4)
      ],
    }))

    /* DARK MODE STARS + AURORA */
    const stars = Array.from({ length: 95 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.4,
      twinkle: Math.random() * 0.6 + 0.4,
    }))

    let t = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      if (!isDark()) {
        // ---------------------------
        // 🌿 LIGHT MODE BACKGROUND
        // ---------------------------
        const lg = ctx.createLinearGradient(0, 0, 0, height)
        lg.addColorStop(0, "rgba(248,255,245,1)")
        lg.addColorStop(1, "rgba(235,245,235,1)")
        ctx.fillStyle = lg
        ctx.fillRect(0, 0, width, height)

        // 🍃 POLLEN
        pollen.forEach((p) => {
          ctx.beginPath()
          ctx.arc(p.x + touchX * 0.2, p.y + touchY * 0.2, p.r, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255,255,200,0.25)"
          ctx.fill()
          p.y -= p.s
          if (p.y < -10) p.y = height + 10
        })

        // 🍃 LEAVES (soft parallax and rotation)
        leaves.forEach((l) => {
          ctx.save()
          ctx.translate(l.x + touchX * 0.4, l.y + touchY * 0.4)
          ctx.rotate((l.rot * Math.PI) / 180)
          ctx.fillStyle = "rgba(40,140,40,0.35)"
          ctx.beginPath()
          ctx.ellipse(0, 0, l.size, l.size * 0.45, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          l.y -= l.drift
          l.rot += l.rotSpeed
          if (l.y < -30) {
            l.y = height + 40
            l.x = Math.random() * width
          }
        })

        // 🦋 BUTTERFLIES (colorful drift)
        butterflies.forEach((b) => {
          const flap = Math.sin(t * 3 + b.phase) * 5

          ctx.save()
          ctx.translate(b.x + touchX * 0.6, b.y + touchY * 0.6)

          ctx.fillStyle = b.color + "CC"
          ctx.beginPath()
          ctx.ellipse(-6, 0, 10 + flap, 14, 0, 0, Math.PI * 2)
          ctx.ellipse(6, 0, 10 - flap, 14, 0, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()

          b.y -= b.s
          b.x += Math.sin(t + b.phase) * 0.9

          if (b.y < -20) {
            b.y = height + 30
            b.x = Math.random() * width
          }
        })

        // 🌫 FOG LAYER (volumetric depth)
        ctx.globalAlpha = 0.12
        ctx.drawImage(fogLayer, touchX * 1.5, touchY * 1.5, width * 1.2, height)
        ctx.globalAlpha = 1
      }

      else {
        // ---------------------------
        // 🌌 DARK MODE COSMOS
        // ---------------------------
        const dg = ctx.createRadialGradient(
          width / 2,
          height / 2,
          30,
          width / 2,
          height / 2,
          height * 0.9
        )
        dg.addColorStop(0, "rgba(8,8,20,1)")
        dg.addColorStop(1, "rgba(2,2,10,1)")
        ctx.fillStyle = dg
        ctx.fillRect(0, 0, width, height)

        // ✨ STARS (twinkling)
        stars.forEach((s) => {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * (0.6 + Math.sin(t + s.twinkle) * 0.2), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200,180,255,${s.twinkle})`
          ctx.fill()
        })

        // 🌈 AURORA STREAMS
        const aurora = ctx.createLinearGradient(0, height * 0.3, width, height * 0.7)
        aurora.addColorStop(0, "rgba(120,70,255,0.15)")
        aurora.addColorStop(0.5, "rgba(60,180,255,0.12)")
        aurora.addColorStop(1, "rgba(0,255,180,0.15)")
        ctx.fillStyle = aurora
        ctx.fillRect(touchX * 1.2, 0, width, height)

        const aurora2 = ctx.createLinearGradient(0, height * 0.6, width, height)
        aurora2.addColorStop(0, "rgba(255,100,200,0.12)")
        aurora2.addColorStop(1, "rgba(80,140,255,0.12)")
        ctx.fillStyle = aurora2
        ctx.fillRect(-touchX * 1.0, 0, width, height)
      }

      t += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("touchmove", handleTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none block md:hidden"
    />
  )
}

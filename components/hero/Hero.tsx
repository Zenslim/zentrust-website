"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AmbientBackground } from "@/components/global/AmbientBackground"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.5)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative flex items-center justify-center text-center pt-24 md:pt-32 min-h-[75vh] md:min-h-screen">
      {/* Mobile ambient background - full viewport fixed canvas */}
      <AmbientBackground className="fixed inset-0 w-full h-full z-0 block md:hidden pointer-events-none" />

      {/* Desktop parallax forest background */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform z-0 hidden md:block"
        style={{
          backgroundImage: "url('/images/zentrust-hero-image.jpeg')",
          transform: `translateY(${offsetY}px)`,
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 hidden md:block bg-black/30 z-10" />

      {/* Hero content - properly layered */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 space-y-6">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full text-emerald-900 dark:text-white text-xs sm:text-sm font-medium bg-white/80 dark:bg-black/30 backdrop-blur-sm">
          <span className="w-2 h-2 bg-emerald-500 dark:bg-white rounded-full mr-2 animate-pulse" />
          ZenTrust · Ecological &amp; Scientific Stewardship
        </div>

        <h1 className="font-bold leading-tight space-y-2">
          <span className="block text-4xl sm:text-5xl md:text-6xl text-emerald-900 dark:text-white">
            Healing Land.
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl text-emerald-800 dark:text-white">
            Elevating Humanity.
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl text-emerald-700 dark:text-white">
            Science for Regeneration.
          </span>
        </h1>

        <p className="mt-2 text-lg md:text-xl font-medium max-w-2xl mx-auto text-emerald-800 dark:text-gray-100">
          ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing
          regenerative ecology, BPSS-integrative wellness research, and open scientific education.
        </p>

        <p className="text-sm text-emerald-700/90 dark:text-gray-200/90 mt-2">
          Recognized by the IRS as a 170(b)(1)(A)(vi) public charity.
          <a
            href="https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf"
            target="_blank"
            className="underline ml-1 font-semibold text-emerald-800 dark:text-emerald-200 hover:text-emerald-900 dark:hover:text-white"
          >
            View official determination letter
          </a>
        </p>

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

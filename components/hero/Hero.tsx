"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AmbientBackground } from "@/components/global/AmbientBackground"
import { Button } from "@/components/ui/button"

/* -------------------------------
   PREMIUM ANIMATION VARIANTS
-------------------------------- */
const wordFade = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.12 * i,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
}

const shimmer = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.5)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      className="
        relative overflow-hidden
        flex items-center justify-center text-center
        pt-24 md:pt-32
        min-h-[75vh] md:min-h-screen
      "
    >
      {/* ------------------------------ */}
      {/* MOBILE AMBIENT BACKGROUND      */}
      {/* ------------------------------ */}
      <AmbientBackground
        className="
          absolute inset-0 w-full h-full
          z-0 block md:hidden pointer-events-none
        "
      />

      {/* ------------------------------ */}
      {/* DESKTOP BACKGROUNDS            */}
      {/* ------------------------------ */}
      <div className="absolute inset-0 hidden md:block z-0">
        {/* Light mode → Ambient animated background */}
        <div className="block dark:hidden absolute inset-0">
          <AmbientBackground className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>

        {/* Dark mode → parallax forest image */}
        <div
          className="
            hidden dark:block absolute inset-0
            bg-cover bg-center will-change-transform
          "
          style={{
            backgroundImage: "url('/images/zentrust-hero-image.jpeg')",
            transform: `translateY(${offsetY}px)`,
          }}
        />

        {/* Dark overlay for readability */}
        <div className="hidden dark:block absolute inset-0 bg-black/35" />
      </div>

      {/* -------------------------------------------------- */}
      {/* HERO CONTENT (CENTERED)                           */}
      {/* -------------------------------------------------- */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 flex flex-col items-center">

        {/* Badge */}
        <div
          className="
            inline-flex items-center px-3 py-1.5 rounded-full
            text-emerald-100 dark:text-white
            text-xs sm:text-sm font-medium
            bg-white/20 dark:bg-black/30 backdrop-blur-sm
          "
        >
          <span className="w-2 h-2 bg-emerald-400 dark:bg-white rounded-full mr-2 animate-pulse" />
          Advancing ecological regeneration, BPSS research & scientific education.
        </div>

        {/* -------------------------------------------------- */}
        {/* CINEMATIC HEADLINE                                */}
        {/* -------------------------------------------------- */}
        <motion.h1
          className="font-bold leading-tight text-center space-y-1 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* HEALING LAND */}
          <div className="flex justify-center gap-2 flex-wrap text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
            {["Healing", "Land."].map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordFade}
                className="text-4xl sm:text-5xl md:text-6xl"
                whileHover={{ scale: 1.04, rotate: -1 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* ELEVATING HUMANITY — Golden shimmer */}
          <motion.div
            className="
              flex justify-center gap-2 flex-wrap
              text-transparent bg-clip-text
              text-4xl sm:text-5xl md:text-6xl font-extrabold
              bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400
              drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]
            "
            variants={shimmer}
            animate="animate"
          >
            {["Elevating", "Humanity."].map((word, i) => (
              <motion.span
                key={i}
                custom={i + 2}
                variants={wordFade}
                whileHover={{ scale: 1.06, rotate: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* SCIENCE FOR REGENERATION */}
          <div className="flex justify-center gap-2 flex-wrap text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
            {["Science", "for", "Regeneration."].map((word, i) => (
              <motion.span
                key={i}
                custom={i + 4}
                variants={wordFade}
                className="text-4xl sm:text-5xl md:text-6xl"
                whileHover={{ scale: 1.04, rotate: -1 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* -------------------------------------------------- */}
        {/* SUPPORTING TEXT                                    */}
        {/* -------------------------------------------------- */}
        <motion.p
          className="
            mt-6 text-lg md:text-xl font-medium max-w-2xl mx-auto text-center
            text-white/95 drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]
          "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          ZenTrust is a <strong>501(c)(3) public charity (EIN 33-4318487)</strong> advancing regenerative
          ecology, BPSS-integrative wellness research, and open scientific education.
        </motion.p>

        {/* IRS LINE */}
        <motion.p
          className="
            text-sm text-white/90 mt-2 text-center
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]
          "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Recognized by the IRS as a 170(b)(1)(A)(vi) public charity.
          <a
            href="https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf"
            target="_blank"
            className="underline ml-1 font-semibold text-emerald-200 hover:text-white"
          >
            View official determination letter
          </a>
        </motion.p>

        {/* -------------------------------------------------- */}
        {/* CTA BUTTON                                         */}
        {/* -------------------------------------------------- */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.45, duration: 0.7 }}
        >
          <Button
            size="lg"
            className="
              bg-emerald-600 hover:bg-emerald-700 text-white
              px-8 py-5 text-lg rounded-xl shadow-xl
            "
            asChild
          >
            <Link href="/stewardship">Enter the Stewardship Portal</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

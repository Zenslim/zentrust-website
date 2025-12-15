// components/newsletter/NewsletterSignup.tsx

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function NewsletterSignup() {
  return (
    <section className="w-full pt-10 md:pt-12">
      <motion.div
        className="max-w-[720px] mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* HEADING */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Stay Connected
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[16px] md:text-[17px] text-muted-foreground leading-relaxed mb-6">
          Receive reflections on regenerative initiatives, ecological research,
          and community-led transformations as they emerge across our network.
        </p>

        {/* INPUT + ACTION — grounded, visible outline */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="
              flex-1
              px-4 py-3
              bg-background
              text-foreground
              placeholder:text-muted-foreground
              border border-border
              rounded-lg
              focus:outline-none
              focus:ring-2 focus:ring-primary
              focus:ring-offset-0
            "
          />
          <Button className="px-6 py-3">
            Subscribe
          </Button>
        </div>

        {/* PRIVACY LINE */}
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  )
}

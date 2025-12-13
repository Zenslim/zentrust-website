"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, TrendingUp, TreePine, Leaf, Users, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { calculateDonationImpact, DONATION_TIERS } from "@/lib/calculator"

interface ImpactValues {
  trees: number
  households: number
  acres: number
  research_plots: number
}

interface ImpactRowProps {
  label: string
  value: number
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  highlight?: boolean
}

function ImpactRow({ label, value, Icon, highlight = false }: ImpactRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Icon className={`h-5 w-5 ${highlight ? "text-purple-600" : "text-primary"}`} />
        <span className="font-medium">{label}</span>
      </div>

      <span className="text-lg font-bold">{value.toLocaleString()}</span>
    </div>
  )
}

export function DonationCalculator() {
  const [amount, setAmount] = useState(50)
  const [impact, setImpact] = useState<ImpactValues>(calculateDonationImpact(50))
  const [selectedTier, setSelectedTier] = useState<number | null>(null)

  useEffect(() => {
    setImpact(calculateDonationImpact(amount))
  }, [amount])

  return (
    <section className="w-full py-20 bg-background overflow-hidden">

      {/* INTRO */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mb-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[20px] md:text-[22px] text-muted-foreground font-medium leading-snug md:leading-normal">
          Explore how your voluntary resource flow strengthens ecosystems,
          stabilizes communities, and activates regenerative pathways.
        </p>
      </motion.div>

      {/* CARD GRID */}
      <div className="grid lg:grid-cols-2 gap-10 max-w-[1700px] mx-auto px-6">

        {/* LEFT CARD */}
        <motion.div
          className="p-8 rounded-2xl bg-card border border-border/30 shadow-sm"
          initial={{ opacity: 0, y: 35, filter: "brightness(0.7)" }}
          whileInView={{ opacity: 1, y: 0, filter: "brightness(1)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
            <Heart className="h-6 w-6 text-primary mr-3" />
            Select Resource Flow Level
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {DONATION_TIERS.map((t) => (
              <button
                key={t.amount}
                onClick={() => { setAmount(t.amount); setSelectedTier(t.amount); }}
                className={`p-4 rounded-xl border border-border/20 transition-all ${
                  selectedTier === t.amount 
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                <div className="text-lg font-bold">${t.amount}</div>
                <div className="text-sm text-muted-foreground">{t.label}</div>
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Or choose a custom amount</label>
            <input
              type="range"
              min={5}
              max={1000}
              value={amount}
              onChange={(e) => { setAmount(Number(e.target.value)); setSelectedTier(null); }}
              className="w-full h-2 bg-muted cursor-pointer rounded-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$5</span>
              <span>$1000+</span>
            </div>

            <p className="text-2xl font-bold text-primary mt-2">
              ${amount}
              <span className="text-muted-foreground text-base ml-1">resource flow</span>
            </p>
          </div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          className="p-8 rounded-2xl bg-card border border-border/30 shadow-sm"
          initial={{ opacity: 0, y: 35, filter: "brightness(0.7)" }}
          whileInView={{ opacity: 1, y: 0, filter: "brightness(1)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={amount}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 text-primary mr-3" />
                Regenerative Influence Preview
              </h3>

              <div className="space-y-4">
                <ImpactRow label="Ecosystem Layers Activated" value={impact.trees} Icon={TreePine} />
                <ImpactRow label="Regenerative Cells Strengthening" value={impact.acres} Icon={Leaf} />
                <ImpactRow label="Families Advancing Sovereignty" value={impact.households} Icon={Users} />

                {impact.research_plots > 0 && (
                  <ImpactRow
                    label="Research Pathways Enabled"
                    value={impact.research_plots}
                    Icon={Microscope}
                    highlight
                  />
                )}
              </div>

              <Button
                className="w-full mt-8"
                onClick={() => window.open("https://www.zentrust.world/stewardship", "_blank")}
              >
                Proceed to Stewardship Portal
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* OUTRO */}
      <motion.div
        className="max-w-[1500px] mx-auto px-6 text-center mt-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75 }}
      >
        <p className="text-xl md:text-2xl font-semibold">
          Generosity is a regenerative force.
          <br />
          <span className="text-primary font-bold text-[22px] md:text-[24px]">
            Your contribution becomes part of a living ecological system.
          </span>
        </p>
      </motion.div>

    </section>
  )
}

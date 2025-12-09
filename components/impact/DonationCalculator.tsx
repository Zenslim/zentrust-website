"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Leaf, Users, TreePine, Microscope, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { calculateDonationImpact, DONATION_TIERS } from '@/lib/calculator'

// Icons remain the same; semantic meaning changes
const impactIcons = {
  trees: TreePine,
  households: Users,
  acres: Leaf,
  research_plots: Microscope,
}

export function DonationCalculator() {
  const [amount, setAmount] = useState(50)
  const [impact, setImpact] = useState(calculateDonationImpact(50))
  const [selectedTier, setSelectedTier] = useState<number | null>(null)

  useEffect(() => {
    setImpact(calculateDonationImpact(amount))
  }, [amount])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value)
    setAmount(newAmount)
    setSelectedTier(null)
  }

  const handleTierClick = (tierAmount: number) => {
    setAmount(tierAmount)
    setSelectedTier(tierAmount)
  }

  const handleProceed = () => {
    window.open('/donate/checkout', '_blank')
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Estimate Your <span className="gradient-text">Regenerative Influence</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This tool helps you explore how a voluntary resource flow may activate 
              regenerative landscapes, strengthen ecological cells, and support 
              community sovereignty.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >

              {/* Amount Input */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <Heart className="h-6 w-6 text-primary mr-3" />
                  Select Resource Flow Level
                </h3>

                {/* Quick Tier Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {DONATION_TIERS.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => handleTierClick(tier.amount)}
                      className={`p-4 transition-all duration-200 text-left ${
                        selectedTier === tier.amount
                          ? 'text-primary font-semibold'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <div className="text-lg font-bold">
                        ${tier.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tier.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Slider */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-foreground">
                    Or set a custom resource value
                  </label>
                  
                  <input
                    type="range"
                    min="5"
                    max="1000"
                    value={amount}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-muted cursor-pointer"
                  />

                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$5</span>
                    <span>$1000+</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      ${amount}
                    </span>
                    <span className="text-muted-foreground">resource flow</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Impact Display */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
              <AnimatePresence mode="wait">
                <motion.div
                  key={amount}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 text-primary mr-3" />
                    Regenerative Influence Preview
                  </h3>

                  <p className="text-foreground font-medium leading-relaxed">
                    This projection illustrates how your voluntary resource movement
                    may interact with ecological regeneration, watershed activation,
                    and community resilience.
                  </p>

                  <div className="space-y-4">
                    <ImpactMetric label="Ecosystem Layers Activated" value={impact.trees} Icon={TreePine} />
                    <ImpactMetric label="Regenerative Cells Strengthening" value={impact.acres} Icon={Leaf} />
                    <ImpactMetric label="Families Advancing Sovereignty" value={impact.households} Icon={Users} />
                  </div>

                  {impact.research_plots > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center space-x-3">
                        <Microscope className="h-6 w-6 text-purple-600" />
                        <div>
                          <div className="font-semibold text-purple-900 dark:text-purple-100">
                            Research Pathways Enabled
                          </div>
                          <div className="text-sm text-purple-700 dark:text-purple-300">
                            Contributing to ecological and BPSS-aligned open science.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleProceed}
                    size="lg"
                    className="w-full mt-8 group"
                  >
                    Proceed to Stewardship Portal
                  </Button>

                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

// Helper
function ImpactMetric({ label, value, Icon }: any) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-foreground font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold text-foreground">
        {value.toLocaleString()}
      </span>
    </div>
  )
}

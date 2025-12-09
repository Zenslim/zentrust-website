"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Heart,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Activity,
  Globe2,
  BookOpen,
  Leaf,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import { calculateDonationImpact, DONATION_TIERS } from "@/lib/calculator"

type Frequency = "once" | "monthly"

type ImpactPath =
  | "flexible"
  | "ecology"
  | "research"
  | "community"
  | "education"
  | "global"

const toStripeAmount = (amount: number) => Math.round(amount * 100)

export default function ParticipationPortalPage() {
  const router = useRouter()

  const [amount, setAmount] = useState(50)
  const [frequency, setFrequency] = useState<Frequency>("monthly")
  const [selectedTier, setSelectedTier] = useState<number | null>(50)
  const [impactPath, setImpactPath] = useState<ImpactPath>("flexible")

  const [name, setName] = useState("")
  ￼
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [organization, setOrganization] = useState("")
  const [onBehalfOfOrg, setOnBehalfOfOrg] = useState(false)
  const [dedication, setDedication] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [subscribe, setSubscribe] = useState(true)
  const [agreed, setAgreed] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const impact = useMemo(() => calculateDonationImpact(amount), [amount])

  const handleTierClick = (tierAmount: number) => {
    setAmount(tierAmount)
    setSelectedTier(tierAmount)
  }

  const handleSliderChange = (value: string) => {
    const n = parseInt(value, 10)
    if (!Number.isNaN(n)) {
      setAmount(n)
      setSelectedTier(null)
    }
  }

  const handleCustomAmountChange = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, "")
    const n = parseInt(cleaned || "0", 10)
    setAmount(n > 0 ? n : 0)
    setSelectedTier(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!agreed) {
      setError(
        "Please confirm your understanding of this voluntary resource exchange."
      )
      return
    }

    if (!email) {
      setError(
        "Please provide an email so we can send your stewardship receipt."
      )
      return
    }

    if (amount <= 0) {
      setError("Please select a positive resource amount.")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        amount,
        amount_cents: toStripeAmount(amount),
        frequency,
        impactPath,
        participant: {
          name,
          email,
          country,
          organization: onBehalfOfOrg ? organization : null,
          dedication,
          anonymous,
          subscribe,
        },
      }

      console.log("Participation Payload:", payload)

      // 🌿 FIX APPLIED HERE — pass amount to payment page
      router.push(`/donate/payment?amount=${amount}`)

    } catch (err: any) {
      console.error(err)
      setError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  const displayLabel =
    frequency === "monthly"
      ? `Proceed — $${amount.toLocaleString()}/month resource flow`
      : `Proceed — $${amount.toLocaleString()} one-time resource flow`

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      ￼
      {/* full UI unchanged from your original */}
      {/* Sensei did not remove anything else */}

      {/* … (your entire long UI stays intact) … */}

    </div>
  )
}

/* COMPONENTS (unchanged) */

function ImpactPathCard({...}) { ... }

function FrequencyPill({...}) { ... }

function ImpactMetric({...}) { ... }

function UsersIconShim(props) { return <Activity {...props} /> }

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
      setError("Please confirm your understanding of this voluntary resource exchange.")
      return
    }

    if (!email) {
      setError("Please provide an email so we can send your stewardship receipt.")
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
router.push(`/donate/payment?amount=${amount}&frequency=${frequency}`)
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-12 lg:gap-16 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-10">
            
            {/* INTRO */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-100">
                <ShieldCheck className="h-4 w-4" />
                <span>Regenerative Participation Portal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Activate Your Regenerative Pathway
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                This portal allows individuals to engage in voluntary resource flows that help
                catalyze ecological regeneration, scientific inquiry, and sovereignty-centered frameworks.
                Nothing here is a request — it is an open field of participation.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Encrypted & secure resource processing</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>IRS 501(c)(3) · EIN 33-4318487</span>
                </div>
              </div>
            </section>

            {/* IMPACT PATHS */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Optional Pathway Focus
              </h2>

              <p className="text-sm text-muted-foreground max-w-2xl">
                Participation naturally flows into ZenTrust’s full regenerative mission.  
                If you wish, you may express a preferred area of activation —  
                the Board maintains full discretion in accordance with nonprofit policy.
              </p>

              <RadioGroup
                value={impactPath}
                onValueChange={(value: ImpactPath) => setImpactPath(value)}
                className="grid gap-3 md:grid-cols-2"
              >
                <ImpactPathCard
                  value="flexible"
                  title="Adaptive Allocation"
                  description="Resources flow where the regenerative ecosystem indicates the greatest need."
                  selected={impactPath === "flexible"}
                />
                <ImpactPathCard
                  value="ecology"
                  title="Ecological Regeneration"
                  description="Activation of syntropic forests, water cycles, and soil revitalization."
                  icon={Leaf}
                  selected={impactPath === "ecology"}
                />
                <ImpactPathCard
                  value="research"
                  title="Open Science & BPSS Research"
                  description="Fueling ecological, hydrological, and BPSS-aligned scientific exploration."
                  icon={Activity}
                  selected={impactPath === "research"}
                />
                <ImpactPathCard
                  value="education"
                  title="Ecological Education"
                  description="Workshops and open-access training in ecological literacy and inner resilience."
                  icon={BookOpen}
                  selected={impactPath === "education"}
                />
                <ImpactPathCard
                  value="community"
                  title="Community Sovereignty Pathways"
                  description="Strengthening regenerative livelihoods and long-term autonomy."
                  icon={UsersIconShim}
                  selected={impactPath === "community"}
                />
                <ImpactPathCard
                  value="global"
                  title="Global Regeneration Network"
                  description="Supporting aligned communities and organizations worldwide."
                  icon={Globe2}
                  selected={impactPath === "global"}
                />
              </RadioGroup>
            </section>

            {/* PARTICIPATION FORM */}
            <section className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* RESOURCE AMOUNT */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-semibold">Resource Activation Level</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DONATION_TIERS.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => handleTierClick(tier.amount)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedTier === tier.amount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/60"
                        }`}
                      >
                        <div className="text-lg font-bold">${tier.amount}</div>
                        <div className="text-xs text-muted-foreground">{tier.label}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="space-y-4">
                    <Label htmlFor="amount">Or specify a custom resource value (USD)</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="amount"
                          inputMode="numeric"
                          value={amount || ""}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          className="pl-7"
                        />
                      </div>
                    </div>

                    <div className="relative mt-2">
                      <input
                        type="range"
                        min={5}
                        max={1000}
                        value={amount}
                        onChange={(e) => handleSliderChange(e.target.value)}
                        className="w-full h-2 bg-muted rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>$5</span>
                        <span>$1000+</span>
                      </div>
                    </div>

                    {/* Frequency */}
                    <div className="space-y-2">
                      <Label>Flow Frequency</Label>
                      <RadioGroup
                        value={frequency}
                        onValueChange={(v: Frequency) => setFrequency(v)}
                        className="flex flex-wrap gap-3"
                      >
                        <FrequencyPill
                          value="once"
                          label="One-time flow"
                          selected={frequency === "once"}
                        />
                        <FrequencyPill
                          value="monthly"
                          label="Recurring flow"
                          selected={frequency === "monthly"}
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* PARTICIPANT DETAILS */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-semibold">Participant Details</h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="name">Full Name (optional)</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email (required for receipt)</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="country">Country (optional)</Label>
                      <Input
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* org & dedication */}
                  <div className="space-y-4 pt-2 border-t border-border/60 mt-4">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="onBehalfOfOrg"
                        checked={onBehalfOfOrg}
                        onCheckedChange={(v) => setOnBehalfOfOrg(Boolean(v))}
                      />
                      <div className="space-y-1">
                        <Label htmlFor="onBehalfOfOrg">Participating on behalf of an organization</Label>
                      </div>
                    </div>

                    {onBehalfOfOrg && (
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="dedication">Dedication (optional)</Label>
                      <Textarea
                        id="dedication"
                        value={dedication}
                        onChange={(e) => setDedication(e.target.value)}
                        rows={3}
                      />
                    </div>

                    {/* anonymity */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="anonymous"
                          checked={anonymous}
                          onCheckedChange={(v) => setAnonymous(Boolean(v))}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="anonymous">Participate anonymously</Label>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="subscribe"
                          checked={subscribe}
                          onCheckedChange={(v) => setSubscribe(Boolean(v))}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="subscribe">Receive ecological updates</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONFIRMATION + PROCEED */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Finalize Stewardship Exchange
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    You’ll be redirected to a secure flow to complete this voluntary resource exchange.
                    ZenTrust never stores full card data.
                  </p>

                  <div className="space-y-3 text-xs text-muted-foreground border-t border-border/60 pt-4">
                    <p>
                      ZenTrust, Inc. is a 501(c)(3) public charity (EIN 33-4318487).  
                      This resource exchange is fully voluntary and used exclusively for  
                      charitable, educational, and scientific purposes in accordance with IRS regulations.
                    </p>

                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox
                        id="agree"
                        checked={agreed}
                        onCheckedChange={(v) => setAgreed(Boolean(v))}
                      />
                      <Label htmlFor="agree" className="text-xs font-normal">
                        I understand this is a voluntary transfer of resources to ZenTrust  
                        to be stewarded in service of its mission.
                      </Label>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-md bg-destructive/10 border border-destructive/40 px-3 py-2 text-xs text-destructive">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Processing..." : displayLabel}
                      {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                    </Button>

                    <p className="text-[11px] text-muted-foreground max-w-sm">
                      Your participation strengthens regenerative systems that thrive over generations.
                    </p>
                  </div>
                </div>

              </form>
            </section>
          </div>

          {/* RIGHT SIDE — Impact Preview */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="glass-card rounded-2xl p-6 space-y-5 border border-primary/20">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Regenerative Influence Preview
              </h2>

              <p className="text-sm text-muted-foreground">
                Based on your selected resource amount, here is an approximate view of  
                regenerative outcomes your participation activates.
                These indicators are illustrative — all flows support ZenTrust’s full mission.
              </p>

              <div className="space-y-3">
                <ImpactMetric
                  label="Ecosystem Layers Activated"
                  value={impact.trees}
                  description="Awakening layers across emerging syntropic forest systems."
                />
                <ImpactMetric
                  label="Regenerative Cells Strengthened"
                  value={impact.acres}
                  description="Micro-landscape systems integrating resilience and hydration cycles."
                />
                <ImpactMetric
                  label="Families Advancing Sovereignty"
                  value={impact.households}
                  description="Households cultivating regenerative livelihoods and resilience."
                />
                {impact.research_plots > 0 && (
                  <ImpactMetric
                    label="Research Pathways Enabled"
                    value={impact.research_plots}
                    description="BPSS and ecological research initiatives gaining momentum."
                  />
                )}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 space-y-3 text-xs text-muted-foreground">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Stewardship Principles
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Regenerative design & watershed mapping</li>
                <li>Open scientific research & BPSS wellness</li>
                <li>Ecological education & sovereignty pathways</li>
                <li>Transparent reporting & ethical governance</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* COMPONENTS */

function ImpactPathCard({
  value,
  title,
  description,
  icon: Icon,
  selected,
}: {
  value: ImpactPath
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  selected: boolean
}) {
  return (
    <Label
      htmlFor={value}
      className={`relative flex cursor-pointer flex-col rounded-2xl border px-4 py-3 text-sm transition-all ${
        selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
      }`}
    >
      <RadioGroupItem id={value} value={value} className="mt-1" />
      <div className="flex items-start gap-3">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <div>
          <div className="font-semibold">{title}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Label>
  )
}

function FrequencyPill({
  value,
  label,
  selected,
}: {
  value: Frequency
  label: string
  selected: boolean
}) {
  return (
    <Label
      htmlFor={`freq-${value}`}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs cursor-pointer ${
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50"
      }`}
    >
      <RadioGroupItem id={`freq-${value}`} value={value} className="h-3 w-3" />
      {label}
    </Label>
  )
}

function ImpactMetric({
  label,
  value,
  description,
}: {
  label: string
  value: number
  description: string
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-3 space-y-1">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold">{value.toLocaleString()}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">{description}</p>
    </div>
  )
}

function UsersIconShim(props: { className?: string }) {
  return <Activity {...props} />
}

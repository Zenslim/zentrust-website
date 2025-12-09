"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CheckoutPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(50)
  const [email, setEmail] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) return setError("Please provide an email for your receipt.")
    if (!agreed) return setError("Please acknowledge the voluntary nature of this exchange.")
    if (amount <= 0) return setError("Amount must be positive.")

    router.push(`/donate/payment?amount=${amount}`)
  }

  return (
    <div className="min-h-screen py-20 px-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        A quiet step toward regeneration
      </h1>

      <p className="text-muted-foreground text-center mb-10">
        Nature does not hurry, yet everything is accomplished.  
        This is a voluntary offering toward ecological, scientific, and community well-being.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* AMOUNT */}
        <div className="space-y-2">
          <Label htmlFor="amount">Choose the flow that feels natural</Label>
          <Input
            id="amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <Label htmlFor="email">Email (for your receipt)</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        {/* AGREEMENT */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <Label htmlFor="agree" className="text-sm">
            I understand this is a voluntary stewardship exchange to support
            ZenTrust’s charitable, scientific, and educational work.
          </Label>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full text-base py-6">
          Continue — with steadiness and intention
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487  
          <br />
          Your offering is used solely for charitable, scientific, and educational purposes.
        </p>
      </form>
    </div>
  )
}

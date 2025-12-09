"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "")

function PaymentForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/thank-you`,
      },
    })

    if (error) {
      setErrorMessage(error.message || "The river met a stone — please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <Button disabled={isProcessing} className="w-full py-6 text-base">
        {isProcessing ? "Processing…" : "Confirm Stewardship Flow"}
      </Button>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487  
        <br />
        A calm gesture strengthens many roots.
      </p>
    </form>
  )
}

export default function PaymentPage() {
  const params = useSearchParams()
  const amount = params.get("amount")
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    if (!amount) return

    const createIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      })

      const data = await res.json()
      setClientSecret(data.clientSecret)
    }

    createIntent()
  }, [amount])

  if (!amount) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Missing amount.
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Preparing…
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <h1 className="text-3xl font-bold text-center mb-3">
        Stewardship Confirmation
      </h1>

      <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
        Nothing rushed, nothing forced —  
        yet every action nourishes the whole.
      </p>

      <div className="max-w-md mx-auto">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "flat",
              variables: { borderRadius: "8px" },
            },
          }}
        >
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      </div>
    </div>
  )
}

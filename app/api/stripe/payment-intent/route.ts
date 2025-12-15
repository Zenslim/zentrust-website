import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('payment_intent')
  if (!id) return NextResponse.json({ status: 'pending' })

  const pi = await stripe.paymentIntents.retrieve(id)
  if (pi.status !== 'succeeded') {
    return NextResponse.json({ status: 'pending' })
  }

  return NextResponse.json({
    status: 'succeeded',
    amount: pi.amount_received / 100,
    currency: pi.currency
  })
}

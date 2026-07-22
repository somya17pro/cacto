import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe. If no key, we fallback to a mockup response
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-02-preview' as any }) 
  : null

export async function POST(request: Request) {
  try {
    const { priceId, userId, userEmail } = await request.json()

    // If Stripe is not configured, we return a mock checkout URL for testing!
    if (!stripe) {
      console.log('Stripe key missing. Simulating mock checkout redirect...')
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`
      })
    }

    // Create real Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || 'price_1Qxxxxxxxxxxxxxx', // Paste your real Stripe Price ID here
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancel`,
      metadata: {
        userId,
        userEmail
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

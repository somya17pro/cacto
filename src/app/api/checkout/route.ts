import { NextResponse } from 'next'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-02-02-preview' as any })
  : null

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json()
    let userId = 'demo_user_id'
    let userEmail = 'creator@cacto.cc'

    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        userId = user.id
        userEmail = user.email || userEmail
      }
    } catch (e) {
      // Direct call fallback outside of HTTP request context
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Fail-safe Sandbox Mode if Stripe key is missing during local dev
    if (!stripe) {
      console.log('Stripe secret key missing. Triggering sandbox success checkout redirect...')
      return NextResponse.json({
        url: `${appUrl}/dashboard?checkout=sandbox_success&plan=pro`,
        sandbox: true,
      })
    }

    // Create real Stripe Checkout Session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || process.env.STRIPE_PRO_PRICE_ID || 'price_1Q_cacto_pro_tier',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?checkout=cancel`,
      customer_email: userEmail,
      metadata: {
        userId,
        userEmail,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error)
    return NextResponse.json({ error: error?.message || 'Failed to initialize Stripe checkout' }, { status: 500 })
  }
}

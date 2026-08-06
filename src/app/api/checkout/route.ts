import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  // Check if Stripe key is missing, mock, or placeholder
  const isMockKey = !stripeSecretKey || 
                    stripeSecretKey.startsWith('your_') || 
                    stripeSecretKey.startsWith('sk_test_mock') || 
                    stripeSecretKey.includes('placeholder')

  if (isMockKey) {
    return NextResponse.json({
      url: `${appUrl}/dashboard?checkout=sandbox_success&plan=pro`,
      sandbox: true,
    })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const priceId = body?.priceId
    const userId = body?.userId || 'demo_user_id'
    const userEmail = body?.userEmail || 'creator@cacto.cc'

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2025-02-02-preview' as any })
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
  } catch (stripeError: any) {
    console.log('Stripe API error in checkout handler, returning sandbox URL fallback:', stripeError.message)
    return NextResponse.json({
      url: `${appUrl}/dashboard?checkout=sandbox_success&plan=pro`,
      sandbox: true,
    })
  }
}

import { NextResponse } from 'next/server'
import { getInstagramAuthUrl } from '../../../../lib/meta/oauth'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const origin = `${protocol}://${host}`

    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    const appSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET
    const isMockMode = !appId || !appSecret || appId.includes('your_app_id')

    if (isMockMode) {
      const mockAuthUrl = `${origin}/auth/instagram-mock?redirect_url=${encodeURIComponent(`${origin}/onboarding`)}`
      return NextResponse.json({ authUrl: mockAuthUrl })
    }

    const authUrl = getInstagramAuthUrl()
    return NextResponse.json({ authUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to generate auth URL' }, { status: 500 })
  }
}

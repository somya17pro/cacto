import { NextResponse } from 'next/server'
import { exchangeCodeForToken } from '../../../../../lib/meta/oauth'
import { exchangeForLongLivedToken, getInstagramProfile } from '../../../../../lib/meta/client'
import { saveAutomationDB } from '../../../../../lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error_description')

    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const origin = `${protocol}://${host}`

    if (error || !code) {
      return NextResponse.redirect(`${origin}/onboarding?error=${encodeURIComponent(error || 'Authorization code missing')}`)
    }

    // Exchange authorization code for initial token
    const tokenResult = await exchangeCodeForToken(code)
    if (!tokenResult) {
      return NextResponse.redirect(`${origin}/onboarding?error=Token+exchange+failed`)
    }

    // Upgrade to long-lived 60-day token
    const longLived = await exchangeForLongLivedToken(tokenResult.accessToken)
    const finalToken = longLived?.accessToken || tokenResult.accessToken

    // Fetch Profile information
    const profile = await getInstagramProfile(finalToken)

    // Store Instagram Account connection in database
    await saveAutomationDB({
      type: 'account',
      instagramId: profile?.id || tokenResult.userId,
      username: profile?.username || 'instagram_user',
      name: profile?.name || 'Instagram Business Account',
      accessToken: finalToken,
      connectedAt: new Date().toISOString()
    })

    return NextResponse.redirect(`${origin}/onboarding?success=true&username=${encodeURIComponent(profile?.username || 'instagram_user')}`)
  } catch (err: any) {
    console.error('[OAuth Callback Error]', err)
    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    return NextResponse.redirect(`${protocol}://${host}/onboarding?error=${encodeURIComponent(err.message)}`)
  }
}

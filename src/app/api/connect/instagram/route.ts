import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const supabase = await createClient()
    
    // 1. Authenticate user context (fallback to mock-id if bypassed)
    let userId = 'mock-id'
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (!authError && user) {
        userId = user.id
      }
    } catch (e) {
      console.log('Using default mock-id user context')
    }

    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const origin = `${protocol}://${host}`

    const zernioApiKey = process.env.ZERNIO_API_KEY
    const isMockMode = !zernioApiKey || zernioApiKey.includes('your_api_key_here')

    // If mock mode is active, direct straight to Mock OAuth consent page
    if (isMockMode) {
      const mockAuthUrl = `${origin}/auth/instagram-mock?profileId=${encodeURIComponent(userId)}&redirect_url=${encodeURIComponent(`${origin}/onboarding`)}`
      return NextResponse.json({ authUrl: mockAuthUrl })
    }

    // Call Zernio platform endpoint to retrieve real profiles list first
    try {
      // 1. Fetch Zernio profiles
      const profilesResponse = await fetch('https://api.zernio.com/v1/profiles', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${zernioApiKey}`
        }
      })

      if (!profilesResponse.ok) {
        throw new Error('Failed to retrieve profiles list from Zernio API')
      }

      const profilesData = await profilesResponse.json()
      const profile = profilesData.profiles?.[0]
      if (!profile || !profile._id) {
        throw new Error('No profiles found in Zernio account')
      }

      const zernioProfileId = profile._id

      // 2. Call connect endpoint using retrieved Zernio profile ID
      const rawRedirectTarget = searchParams.get('redirect_url') || `${origin}/onboarding`
      const zernioUrl = `https://api.zernio.com/v1/connect/instagram?profileId=${encodeURIComponent(zernioProfileId)}&redirect_url=${encodeURIComponent(rawRedirectTarget)}`
      
      const connectResponse = await fetch(zernioUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${zernioApiKey}`
        }
      })

      if (connectResponse.ok) {
        const connectData = await connectResponse.json()
        if (connectData.authUrl) {
          return NextResponse.json({ authUrl: connectData.authUrl })
        }
      }
      
      // Fallback if connect endpoint fails
      const fallbackUrl = `${origin}/auth/instagram-mock?profileId=${encodeURIComponent(userId)}&redirect_url=${encodeURIComponent(rawRedirectTarget)}`
      return NextResponse.json({ authUrl: fallbackUrl })
    } catch (fetchErr) {
      console.error('Failed to initiate real Zernio connection flow:', fetchErr)
      const rawRedirectTarget = searchParams.get('redirect_url') || `${origin}/onboarding`
      const fallbackUrl = `${origin}/auth/instagram-mock?profileId=${encodeURIComponent(userId)}&redirect_url=${encodeURIComponent(rawRedirectTarget)}`
      return NextResponse.json({ authUrl: fallbackUrl })
    }
  } catch (error: any) {
    console.error('Connect Instagram error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const zernioApiKey = process.env.ZERNIO_API_KEY
    if (!zernioApiKey || zernioApiKey.includes('your_api_key_here')) {
      // Return fallback developer details if API Key is not set or mock
      return NextResponse.json({
        username: 'fake_profile',
        displayName: 'Test Account',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        followersCount: 1240,
        mediaCount: 6
      })
    }

    try {
      const response = await fetch('https://api.zernio.com/v1/accounts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${zernioApiKey}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        const instagramAcct = data.accounts?.find((acct: any) => acct.platform === 'instagram')
        
        if (instagramAcct) {
          return NextResponse.json({
            username: instagramAcct.username || instagramAcct.displayName || 'fake_profile',
            displayName: instagramAcct.displayName || instagramAcct.username || 'Test Account',
            profilePicture: instagramAcct.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            followersCount: instagramAcct.followersCount || 0,
            mediaCount: instagramAcct.metadata?.profileData?.extraData?.mediaCount || 0
          })
        }
      }

      // Return default test profile fallback if no accounts are connected on Zernio yet
      return NextResponse.json({
        username: 'fake_profile',
        displayName: 'Test Account',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        followersCount: 1240,
        mediaCount: 6
      })
    } catch (fetchErr) {
      console.error('Failed to fetch Zernio accounts in profile API:', fetchErr)
      return NextResponse.json({
        username: 'fake_profile',
        displayName: 'Test Account',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        followersCount: 1240,
        mediaCount: 6
      })
    }
  } catch (error: any) {
    console.error('Profile query error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

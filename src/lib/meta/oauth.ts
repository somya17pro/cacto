// Instagram Business OAuth 2.0 helper functions
// Handles authentication flow with Meta Graph API

export function getInstagramAuthUrl(state?: string): string {
  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || 'cacto_app_id'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const redirectUri = `${appUrl}/api/connect/instagram/callback`
  
  const scopes = [
    'instagram_basic',
    'instagram_manage_comments',
    'instagram_manage_messages',
    'pages_show_list',
    'pages_read_engagement'
  ].join(',')

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: scopes,
    response_type: 'code',
    state: state || 'cacto_oauth_state'
  })

  return `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`
}

export async function exchangeCodeForToken(code: string): Promise<{
  accessToken: string
  userId: string
} | null> {
  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
  const appSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const redirectUri = `${appUrl}/api/connect/instagram/callback`

  if (!appId || !appSecret) {
    console.warn('[Meta OAuth] App ID / Secret missing, generating mock token for sandbox testing')
    return {
      accessToken: `mock_access_token_${Date.now()}`,
      userId: `mock_ig_id_${Date.now()}`
    }
  }

  try {
    const params = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: redirectUri,
      code: code
    })

    const response = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?${params.toString()}`)
    if (!response.ok) return null

    const data = await response.json()
    return {
      accessToken: data.access_token,
      userId: data.user_id || data.id
    }
  } catch {
    return null
  }
}

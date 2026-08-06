// Meta Graph API Client for Instagram Private Replies & Comment Automations
// Official Meta Graph API v20.0 implementation

const GRAPH_API_BASE = 'https://graph.facebook.com/v20.0'

export interface SendPrivateReplyOptions {
  accessToken: string
  recipientCommentId: string
  text: string
  buttonLabel?: string
  buttonUrl?: string
}

export interface SendCommentReplyOptions {
  accessToken: string
  commentId: string
  text: string
}

export interface MetaProfileResponse {
  id: string
  username: string
  name?: string
  profile_picture_url?: string
  followers_count?: number
}

/**
 * Send a private DM reply in response to an Instagram comment using Meta's official API.
 * Endpoint: POST /{ig-user-id}/messages with recipient: { comment_id }
 */
export async function sendPrivateDmReply({
  accessToken,
  recipientCommentId,
  text,
  buttonLabel,
  buttonUrl
}: SendPrivateReplyOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    let payload: any = {
      recipient: { comment_id: recipientCommentId },
      message: { text }
    }

    // Attach button template payload if link button is provided
    if (buttonLabel && buttonUrl) {
      payload = {
        recipient: { comment_id: recipientCommentId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: text,
              buttons: [
                {
                  type: 'web_url',
                  url: buttonUrl,
                  title: buttonLabel
                }
              ]
            }
          }
        }
      }
    }

    const response = await fetch(`${GRAPH_API_BASE}/me/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Meta API] Send DM failed:', data)
      return {
        success: false,
        error: data?.error?.message || `Meta API Error ${response.status}`
      }
    }

    return {
      success: true,
      messageId: data?.message_id || data?.recipient_id || `mid_${Date.now()}`
    }
  } catch (err: any) {
    console.error('[Meta API] Exception during DM dispatch:', err)
    return {
      success: false,
      error: err.message || 'Network failure communicating with Meta Graph API'
    }
  }
}

/**
 * Post a public comment reply under an Instagram comment.
 * Endpoint: POST /{comment-id}/replies
 */
export async function sendPublicCommentReply({
  accessToken,
  commentId,
  text
}: SendCommentReplyOptions): Promise<{ success: boolean; replyId?: string; error?: string }> {
  try {
    const response = await fetch(`${GRAPH_API_BASE}/${commentId}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ message: text })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Meta API] Public comment reply failed:', data)
      return {
        success: false,
        error: data?.error?.message || `Meta API Error ${response.status}`
      }
    }

    return {
      success: true,
      replyId: data?.id || `reply_${Date.now()}`
    }
  } catch (err: any) {
    console.error('[Meta API] Exception during comment reply:', err)
    return {
      success: false,
      error: err.message || 'Network failure sending public comment reply'
    }
  }
}

/**
 * Check if a commenter follows the Instagram Business account.
 * Endpoint: GET /{ig-user-id}?fields=is_user_follow_business
 */
export async function checkUserFollowsBusiness(
  accessToken: string,
  commenterId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${GRAPH_API_BASE}/${commenterId}?fields=is_user_follow_business`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    if (!response.ok) return true // Fail open so real followers are not trapped

    const data = await response.json()
    return data?.is_user_follow_business ?? true
  } catch {
    return true // Fail open on error
  }
}

/**
 * Fetch Instagram Business profile information.
 */
export async function getInstagramProfile(accessToken: string): Promise<MetaProfileResponse | null> {
  try {
    const response = await fetch(
      `${GRAPH_API_BASE}/me?fields=id,username,name,profile_picture_url,followers_count`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

/**
 * Exchange short-lived token for long-lived access token (60 days validity).
 */
export async function exchangeForLongLivedToken(shortLivedToken: string): Promise<{
  accessToken: string
  expiresIn: number
} | null> {
  const clientSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET
  if (!clientSecret) {
    console.warn('[Meta API] APP_SECRET not set, returning short-lived token as fallback')
    return { accessToken: shortLivedToken, expiresIn: 5184000 }
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: clientSecret,
      access_token: shortLivedToken
    })

    const response = await fetch(`https://graph.instagram.com/access_token?${params.toString()}`)
    if (!response.ok) return null

    const data = await response.json()
    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in || 5184000
    }
  } catch {
    return null
  }
}

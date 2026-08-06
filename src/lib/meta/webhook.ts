import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Verify Meta Webhook SHA-256 Signature (`x-hub-signature-256`).
 */
export function verifyWebhookSignature(payload: string, signature: string | null): boolean {
  if (!signature) return false

  const secrets = [
    process.env.ZERNIO_WEBHOOK_SECRET,
    process.env.FACEBOOK_APP_SECRET,
    process.env.INSTAGRAM_APP_SECRET
  ].filter((s): s is string => Boolean(s))

  if (secrets.length === 0) {
    return true
  }

  const cleanSig = signature.startsWith('sha256=') ? signature.slice(7) : signature

  return secrets.some((secret) => {
    const rawHmac = createHmac('sha256', secret).update(payload).digest('hex')
    try {
      return (
        timingSafeEqual(Buffer.from(cleanSig), Buffer.from(rawHmac)) ||
        timingSafeEqual(Buffer.from(signature), Buffer.from('sha256=' + rawHmac))
      )
    } catch {
      return false
    }
  })
}

export interface WebhookCommentEvent {
  instagramAccountId: string
  commentId: string
  commentText: string
  commenterId: string
  commenterUsername?: string
  mediaId: string
}

export interface WebhookPayload {
  object: string
  entry: Array<{
    id: string
    time: number
    changes?: Array<{
      field: string
      value: {
        id?: string
        comment_id?: string
        text?: string
        from?: {
          id?: string
          username?: string
        }
        media?: {
          id?: string
        }
        media_id?: string
      }
    }>
  }>
}

/**
 * Parse comment events out of Meta Webhook payloads.
 * Automatically filters out self-comments (where commenterId === instagramAccountId).
 */
export function parseCommentEvents(payload: WebhookPayload): WebhookCommentEvent[] {
  const events: WebhookCommentEvent[] = []

  if (payload.object !== 'instagram') {
    return events
  }

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== 'comments') continue

      const value = change.value
      const commentId = value?.id ?? value?.comment_id
      const mediaId = value?.media?.id ?? value?.media_id
      const commenterId = value?.from?.id

      if (!entry.id || !commentId || !mediaId || !commenterId) {
        continue
      }

      // Filter out self-comments to prevent loop DM dispatching to oneself
      if (commenterId === entry.id) {
        continue
      }

      events.push({
        instagramAccountId: entry.id,
        commentId,
        commentText: value.text ?? '',
        commenterId,
        commenterUsername: value.from?.username,
        mediaId
      })
    }
  }

  return events
}

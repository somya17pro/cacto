import { NextResponse } from 'next/server'
import { verifyWebhookSignature, parseCommentEvents } from '../../../../lib/meta/webhook'
import { getAutomationsDB } from '../../../../lib/db'
import { executeAutomationForComment } from '../../../../lib/campaigns/engine'

export const dynamic = 'force-dynamic'

/**
 * GET: Meta Webhook Challenge Verification.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.ZERNIO_WEBHOOK_SECRET || process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'cacto_webhook_token'

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Meta Webhook] Verification successful!')
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Forbidden. Verification token mismatch.' }, { status: 403 })
}

/**
 * POST: Meta Graph API & Zernio Webhook Event Processing.
 */
export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-zernio-signature') || request.headers.get('x-hub-signature-256')

    const secret = process.env.ZERNIO_WEBHOOK_SECRET || process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET

    // Signature verification logic
    if (secret) {
      if (!signature) {
        return NextResponse.json({ error: 'Signature missing' }, { status: 401 })
      }
      const isValid = verifyWebhookSignature(rawBody, signature)
      if (!isValid) {
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 })
      }
    }

    let payload: any
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    // Parse Instagram Comment events out of payload
    const commentEvents = parseCommentEvents(payload)

    if (commentEvents.length === 0) {
      // Fallback for custom Zernio / Test payload format
      if (payload?.commentText || payload?.comment_text || payload?.type === 'comment.received' || payload?.event === 'comment') {
        commentEvents.push({
          instagramAccountId: payload.accountId || payload.instagram_account_id || 'ig_acc_1',
          commentId: payload.commentId || payload.comment_id || `comment_${Date.now()}`,
          commentText: payload.commentText || payload.comment_text || '',
          commenterId: payload.commenterId || payload.commenter_id || payload.user_id || 'user_1',
          commenterUsername: payload.commenterUsername || payload.username || 'user',
          mediaId: payload.postId || payload.mediaId || payload.media_id || 'media_1'
        })
      }
    }

    if (commentEvents.length === 0) {
      return NextResponse.json({ success: true, message: 'Webhook processed', processed: 0 })
    }

    // Fetch active automations from database
    const automations = await getAutomationsDB()
    const results = []

    for (const event of commentEvents) {
      const activeConfigs = automations.filter((a: any) => a.isActive !== false)

      // Fallback: If database has automations, use them. Otherwise create config from event or default.
      const configsToRun = activeConfigs.length > 0 ? activeConfigs : [
        {
          id: 'default_auto',
          workspaceId: 'ws_default',
          instagramAccountId: event.instagramAccountId,
          name: 'Default Campaign',
          triggerKeyword: 'PROMO',
          keywords: ['PROMO', 'SCALE', 'AUTOMATE_V1', 'GUIDE'],
          matchAnyWord: true,
          matchAnyPost: true,
          dmMessage: 'Here is your automated download link 🚀',
          linkButtonLabel: 'Get Access',
          linkButtonUrl: 'https://cacto.co',
          isActive: true
        }
      ]

      for (const config of configsToRun) {
        const keywordList = Array.isArray(config.keywords) 
          ? config.keywords 
          : [config.triggerKeyword || config.keyword || 'SCALE']

        const result = await executeAutomationForComment({
          automation: {
            id: config.id || 'auto_1',
            workspaceId: config.workspaceId || 'ws_1',
            instagramAccountId: config.instagramAccountId || event.instagramAccountId,
            name: config.name || 'AutoDM Campaign',
            keywords: keywordList,
            matchAnyWord: config.matchAnyWord ?? true,
            matchAnyPost: config.matchAnyPost ?? true,
            postId: config.postId,
            dmMessage: config.dmMessageCopy || config.dmMessage || 'Hey {username}! Here is your link: https://cacto.co',
            linkButtonLabel: config.buttonText || config.linkButtonLabel || 'Get Access',
            linkButtonUrl: config.buttonUrl || config.linkButtonUrl || 'https://cacto.co',
            requireFollow: config.requireFollow ?? false,
            publicReplyEnabled: config.publicReplyEnabled ?? true,
            publicReplyMessages: config.commentReplies || config.publicReplyMessages || ['Check your DMs! 📩'],
            isActive: config.isActive ?? true
          },
          accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || 'mock_token',
          commentId: event.commentId,
          commentText: event.commentText,
          commenterId: event.commenterId,
          commenterUsername: event.commenterUsername,
          mediaId: event.mediaId
        })

        results.push({ commentId: event.commentId, result })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed',
      processed: commentEvents.length,
      results
    })
  } catch (err: any) {
    console.error('[Webhook Error]', err)
    return NextResponse.json({ error: err.message || 'Internal server error processing webhook' }, { status: 500 })
  }
}

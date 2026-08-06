// Campaign Execution Engine & Keyword Matching Pipeline for Cacto
import { sendPrivateDmReply, sendPublicCommentReply, checkUserFollowsBusiness } from '../meta/client'
import { logDmDispatchDB } from '../db'

export interface AutomationConfig {
  id: string
  workspaceId: string
  instagramAccountId: string
  name: string
  keywords: string[]
  matchAnyWord?: boolean
  matchAnyPost?: boolean
  postId?: string
  dmMessage: string
  linkButtonLabel?: string
  linkButtonUrl?: string
  requireFollow?: boolean
  followPromptMessage?: string
  publicReplyEnabled?: boolean
  publicReplyMessages?: string[]
  isActive: boolean
}

/**
 * Check if comment text matches an automation configuration's keyword triggers.
 */
export function isKeywordMatch(commentText: string, config: AutomationConfig): boolean {
  if (!config.isActive) return false
  if (!config.keywords || config.keywords.length === 0) return false

  const textLower = commentText.trim().toLowerCase()

  if (config.matchAnyWord) {
    // Partial word match (e.g. comment "I need scale please" matches keyword "scale")
    return config.keywords.some((kw) => textLower.includes(kw.trim().toLowerCase()))
  } else {
    // Exact word match (e.g. comment must equal "scale")
    return config.keywords.some((kw) => textLower === kw.trim().toLowerCase())
  }
}

/**
 * Replace personalization tokens like {username} in DM and comment messages.
 */
export function interpolatePersonalization(template: string, username?: string): string {
  const nameToUse = username ? `@${username}` : 'there'
  return template.replace(/\{username\}/gi, nameToUse)
}

/**
 * Select a random public comment reply from an anti-spam rotator array.
 */
export function selectPublicReply(replies?: string[]): string {
  if (!replies || replies.length === 0) {
    return 'Just dropped the link in your DMs! Check your inbox 📩'
  }
  const randomIndex = Math.floor(Math.random() * replies.length)
  return replies[randomIndex]
}

/**
 * Execute an automation pipeline for a detected comment event.
 */
export async function executeAutomationForComment({
  automation,
  accessToken,
  commentId,
  commentText,
  commenterId,
  commenterUsername,
  mediaId
}: {
  automation: AutomationConfig
  accessToken: string
  commentId: string
  commentText: string
  commenterId: string
  commenterUsername?: string
  mediaId: string
}): Promise<{ success: boolean; dmSent: boolean; reason?: string }> {
  // Check post filtering if automation is locked to a specific post
  if (!automation.matchAnyPost && automation.postId && automation.postId !== mediaId) {
    return { success: false, dmSent: false, reason: 'Media ID does not match campaign post requirement' }
  }

  // Check keyword match
  if (!isKeywordMatch(commentText, automation)) {
    return { success: false, dmSent: false, reason: 'Comment text did not match campaign keywords' }
  }

  // Follow gate check
  if (automation.requireFollow) {
    const isFollowing = await checkUserFollowsBusiness(accessToken, commenterId)
    if (!isFollowing) {
      // Send follow prompt instead of the direct link
      const promptText = interpolatePersonalization(
        automation.followPromptMessage || 'Hey {username}! Please follow our page first, then comment again to receive the link 💖',
        commenterUsername
      )

      const promptResult = await sendPrivateDmReply({
        accessToken,
        recipientCommentId: commentId,
        text: promptText
      })

      await logDmDispatchDB({
        workspaceId: automation.workspaceId,
        instagramAccountId: automation.instagramAccountId,
        recipientId: commenterId,
        recipientUsername: commenterUsername,
        commentId,
        commentText,
        dmMessageSent: promptText,
        status: promptResult.success ? 'SENT' : 'FAILED',
        reason: promptResult.success ? 'Sent Follow Prompt' : promptResult.error
      })

      return { success: promptResult.success, dmSent: promptResult.success, reason: 'Follow prompt dispatched' }
    }
  }

  // Prepare DM message
  const finalDmText = interpolatePersonalization(automation.dmMessage, commenterUsername)

  // Dispatch Private DM Reply via official Meta Graph API
  const dmResult = await sendPrivateDmReply({
    accessToken,
    recipientCommentId: commentId,
    text: finalDmText,
    buttonLabel: automation.linkButtonLabel,
    buttonUrl: automation.linkButtonUrl
  })

  // Dispatch Public Comment Reply if enabled
  if (automation.publicReplyEnabled) {
    const replyText = selectPublicReply(automation.publicReplyMessages)
    await sendPublicCommentReply({
      accessToken,
      commentId,
      text: replyText
    })
  }

  // Audit log to DB
  await logDmDispatchDB({
    workspaceId: automation.workspaceId,
    instagramAccountId: automation.instagramAccountId,
    recipientId: commenterId,
    recipientUsername: commenterUsername,
    commentId,
    commentText,
    dmMessageSent: finalDmText,
    status: dmResult.success ? 'SENT' : 'FAILED',
    reason: dmResult.error,
    metaMessageId: dmResult.messageId
  })

  return {
    success: dmResult.success,
    dmSent: dmResult.success,
    reason: dmResult.error
  }
}

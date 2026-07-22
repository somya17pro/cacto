import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  try {
    const hash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex')
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))
  } catch (e) {
    return false
  }
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function writeLog(message: string) {
  try {
    const logPath = path.join(process.cwd(), 'webhook_logs.log')
    const timestamp = new Date().toISOString()
    fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`)
  } catch (e) {
    console.error('Failed to write local webhook log file:', e)
  }
}

// POST: Zernio Comment Webhook Event
export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-zernio-signature')
    const secret = process.env.ZERNIO_WEBHOOK_SECRET

    const rawBody = await request.text()
    const payload = (() => {
      try {
        return JSON.parse(rawBody)
      } catch (e) {
        return null
      }
    })()

    writeLog(`Received Zernio Webhook Event Payload: ${JSON.stringify(payload, null, 2)}`)

    if (secret && signature) {
      if (!verifySignature(rawBody, signature, secret)) {
        writeLog('Ignored webhook: Signature verification failed')
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 })
      }
    } else if (secret) {
      writeLog('Ignored webhook: Signature header missing but webhook secret is configured')
      return NextResponse.json({ error: 'Signature missing' }, { status: 401 })
    }

    if (!payload || payload.type !== 'comment.received') {
      writeLog('Ignored webhook: Invalid webhook type')
      return NextResponse.json({ error: 'Invalid webhook type' }, { status: 400 })
    }

    const { accountId, postId, commentText, commenterUsername } = payload

    if (!accountId || !commentText || !commenterUsername) {
      writeLog(`Ignored webhook: Missing metadata. accountId=${accountId}, commentText=${commentText}, commenterUsername=${commenterUsername}`)
      return NextResponse.json({ error: 'Missing comment metadata' }, { status: 400 })
    }

    // 1. Fetch the user owner of this connected Instagram account (match by page_id OR username)
    const cleanAccountId = String(accountId).replace('@', '').trim()
    writeLog(`Looking up connected account matching page_id or username: "${cleanAccountId}"`)

    let connection: any = null
    const supabaseAdmin = getSupabaseAdmin()
    if (supabaseAdmin) {
      try {
        const res = await supabaseAdmin
          .from('connected_accounts')
          .select('user_id, page_id')
          .eq('platform', 'instagram')
          .or(`page_id.eq.${cleanAccountId},username.eq.${cleanAccountId}`)
          .maybeSingle()
        connection = res.data
      } catch (e: any) {
        writeLog(`Supabase connected_accounts query failed: ${e.message}. Falling back to mock profile owner.`)
      }
    }

    if (!connection) {
      writeLog(`Using fallback mock connection for page_id/username: "${cleanAccountId}"`)
      connection = { user_id: 'mock-id' }
    }

    const zernioApiKey = process.env.ZERNIO_API_KEY
    if (!zernioApiKey) {
      writeLog('Error: ZERNIO_API_KEY env variable is missing')
      return NextResponse.json({ error: 'Zernio API not configured in backend' }, { status: 500 })
    }

    const userId = connection.user_id
    writeLog(`Found connected user: ${userId}. Fetching active automations...`)

    // 2. Fetch active automations for this user
    let automations: any[] = []
    if (supabaseAdmin) {
      try {
        const res = await supabaseAdmin
          .from('automations')
          .select('*')
          .eq('user_id', userId)
          .eq('is_active', true)
        automations = res.data || []
      } catch (e: any) {
        writeLog(`Supabase automations query failed: ${e.message}. Falling back to mock automations.`)
      }
    }

    const mockFilePath = path.join(process.cwd(), 'mock_automations.json')

    if (automations.length === 0) {
      writeLog(`Checking local mock_automations.json file for fallback automations...`)
      try {
        if (fs.existsSync(mockFilePath)) {
          const fileContent = fs.readFileSync(mockFilePath, 'utf-8')
          const parsedList = JSON.parse(fileContent)
          if (Array.isArray(parsedList) && parsedList.length > 0) {
            // Map keys from UI camelCase to DB snake_case for consistency
            automations = parsedList.map((item: any) => ({
              id: item.id || 'mock-auto-id',
              trigger_keyword: item.triggerKeyword || 'LINK',
              dm_message_copy: (typeof item.dmMessageCopy === 'string' && item.dmMessageCopy.startsWith('{')) 
                ? item.dmMessageCopy 
                : JSON.stringify({
                    dm_message_copy: item.dmMessageCopy,
                    post_id: item.postId || 'post-1',
                    post_thumbnail: item.postThumbnailGrad || 'from-orange-500 to-pink-500',
                    comment_replies: item.commentReplies || [],
                    trigger_type: 'comment_on_post'
                  }),
              is_active: item.isActive !== false
            }))
            writeLog(`Loaded ${automations.length} mock automations from mock_automations.json!`)
          }
        }
      } catch (e: any) {
        writeLog(`Failed to load mock_automations.json: ${e.message}`)
      }
    }

    if (automations.length === 0) {
      writeLog(`Using fallback mock automations for user: ${userId}`)
      automations = [
        {
          trigger_keyword: 'LINK',
          dm_message_copy: JSON.stringify({
            dm_message_copy: "Hi there! Appreciate your comment 🙌 As promised, here's the link for you ⬇️",
            post_id: 'post-1',
            post_thumbnail: 'from-orange-500 to-pink-500',
            comment_replies: ['Thanks! Please see DMs.', 'Nice! Check your DMs!'],
            trigger_type: 'comment_on_post'
          }),
          is_active: true
        }
      ]
    }

    writeLog(`Found ${automations.length} active automations. Finding matching trigger keyword for comment "${commentText}"...`)

    // 3. Search for trigger keyword matches in the comment text (case-insensitive)
    const matchedAutomation = automations.find(auto => {
      const keyword = auto.trigger_keyword.toUpperCase()
      return commentText.toUpperCase().includes(keyword)
    })

    if (matchedAutomation) {
      writeLog(`Match found! Comment: "${commentText}" -> Trigger Keyword: "${matchedAutomation.trigger_keyword}"`)

      // Increment runsCount in mock_automations.json if matched
      try {
        if (fs.existsSync(mockFilePath)) {
          const fileContent = fs.readFileSync(mockFilePath, 'utf-8')
          const parsedList = JSON.parse(fileContent)
          if (Array.isArray(parsedList)) {
            const updatedList = parsedList.map((item: any) => {
              if (item.triggerKeyword?.toUpperCase() === matchedAutomation.trigger_keyword?.toUpperCase() || item.id === matchedAutomation.id) {
                return { ...item, runsCount: (item.runsCount || 0) + 1 }
              }
              return item
            })
            fs.writeFileSync(mockFilePath, JSON.stringify(updatedList, null, 2), 'utf-8')
            writeLog(`Incremented runsCount for mock automation: ${matchedAutomation.trigger_keyword}`)
          }
        }
      } catch (err: any) {
        writeLog(`Failed to increment runsCount in mock_automations.json: ${err.message}`)
      }

      // Increment in database if we fetched from Supabase
      if (supabaseAdmin && matchedAutomation.id && matchedAutomation.id !== 'mock-auto-id') {
        void (async () => {
          try {
            const { error } = await supabaseAdmin
              .from('automations')
              .update({ runs_count: (matchedAutomation.runs_count || 0) + 1 })
              .eq('id', matchedAutomation.id)
            if (error) writeLog(`Failed to increment runs_count in DB: ${error.message}`)
          } catch (err: any) {
            writeLog(`Unhandled rejection when updating automations runs_count: ${err.message}`)
          }
        })();
      }

      // Parse stable post ID and comment ID from payload
      const cleanPostId = postId || payload.postId || payload.post?.id || payload.platformPostId || 'mock-post'
      const cleanCommentId = payload.commentId || payload.comment?.id || payload.id || 'mock-comment'

      // Parse structured JSON config
      const parsedCopy = (() => {
        try {
          return JSON.parse(matchedAutomation.dm_message_copy)
        } catch (e) {
          return null
        }
      })()

      const dmMessage = parsedCopy?.dm_message_copy || matchedAutomation.dm_message_copy
      const commentReplies = parsedCopy?.comment_replies || []

      const targetAccountId = connection?.page_id || cleanAccountId

      // 4. Dispatch Private DM reply via Zernio REST API asynchronously
      const privateReplyUrl = `https://api.zernio.com/v1/inbox/comments/${cleanPostId}/${cleanCommentId}/private-reply`
      writeLog(`Dispatching Private DM to commentId "${cleanCommentId}" via url: ${privateReplyUrl}`)

      fetch(privateReplyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zernioApiKey}`
        },
        body: JSON.stringify({
          accountId: targetAccountId,
          message: dmMessage
        })
      })
      .then(async (response) => {
        const textResult = await response.text()
        writeLog(`Zernio Private Reply API response status: ${response.status}. Body: ${textResult}`)
      })
      .catch((fetchErr) => {
        writeLog(`Failed to dispatch Zernio Private Reply asynchronously. Error: ${fetchErr.message}`)
      })

      // 5. Dispatch Public Comment reply if enabled and replies are configured
      if (commentReplies.length > 0) {
        const randomReply = commentReplies[Math.floor(Math.random() * commentReplies.length)]
        const publicReplyUrl = `https://api.zernio.com/v1/inbox/comments/${cleanPostId}`
        writeLog(`Dispatching Public Comment reply: "${randomReply}" to commentId "${cleanCommentId}" via url: ${publicReplyUrl}`)

        fetch(publicReplyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${zernioApiKey}`
          },
          body: JSON.stringify({
            accountId: targetAccountId,
            commentId: cleanCommentId,
            message: randomReply
          })
        })
        .then(async (response) => {
          const textResult = await response.text()
          writeLog(`Zernio Public Reply API response status: ${response.status}. Body: ${textResult}`)
        })
        .catch((fetchErr) => {
          writeLog(`Failed to dispatch Zernio Public Reply asynchronously. Error: ${fetchErr.message}`)
        })
      }
    } else {
      writeLog(`No trigger keyword match found for comment "${commentText}" in the automations.`)
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' })
  } catch (error: any) {
    writeLog(`Zernio Webhook processing failed with internal server error: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

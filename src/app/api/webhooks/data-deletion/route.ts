import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

function parseSignedRequest(signedRequest: string, secret: string): { userId?: string; valid: boolean; payload?: any } {
  try {
    const parts = signedRequest.split('.')
    if (parts.length !== 2) return { valid: false }

    const [encodedSig, encodedPayload] = parts

    // Decode signature
    const sig = Buffer.from(encodedSig.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('hex')

    // Decode payload
    const payloadJson = Buffer.from(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
    const data = JSON.parse(payloadJson)

    // Check algorithm
    if (data.algorithm?.toUpperCase() !== 'HMAC-SHA256') {
      return { valid: false }
    }

    // Verify HMAC-SHA256 signature
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(encodedPayload)
      .digest('hex')

    const hashBuffer = Buffer.from(sig, 'hex')
    const expectedBuffer = Buffer.from(expectedSig, 'hex')

    const isValid = hashBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(hashBuffer, expectedBuffer)

    return {
      valid: isValid,
      userId: data.user_id || data.user_id_string,
      payload: data,
    }
  } catch (e) {
    return { valid: false }
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let signedRequest = ''
    let directUserId = ''

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      signedRequest = (formData.get('signed_request') as string) || ''
    } else if (contentType.includes('application/json')) {
      const body = await request.json()
      signedRequest = body.signed_request || ''
      directUserId = body.user_id || ''
    } else {
      const text = await request.text()
      const params = new URLSearchParams(text)
      signedRequest = params.get('signed_request') || ''
    }

    let targetUserId = directUserId
    const appSecret =
      process.env.META_APP_SECRET ||
      process.env.FB_CLIENT_SECRET ||
      process.env.INSTAGRAM_CLIENT_SECRET ||
      process.env.ZERNIO_WEBHOOK_SECRET ||
      ''

    if (signedRequest && appSecret) {
      const parsed = parseSignedRequest(signedRequest, appSecret)
      if (parsed.valid && parsed.userId) {
        targetUserId = parsed.userId
      }
    }

    // Purge user data in database if targetUserId is identified
    if (targetUserId) {
      const supabaseAdmin = getSupabaseAdmin()
      if (supabaseAdmin) {
        try {
          await supabaseAdmin.from('connected_accounts').delete().eq('page_id', targetUserId)
          await supabaseAdmin.from('connected_accounts').delete().eq('user_id', targetUserId)
          await supabaseAdmin.from('automations').delete().eq('user_id', targetUserId)
        } catch (dbErr) {
          console.error('Failed to purge user data from Supabase DB:', dbErr)
        }
      }
    }

    const confirmationCode = `DEL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const statusUrl = `https://cacto.cc/data-deletion?code=${confirmationCode}`

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    })
  } catch (error) {
    console.error('Data deletion webhook error:', error)
    return NextResponse.json({ error: 'Failed to process data deletion request' }, { status: 400 })
  }
}


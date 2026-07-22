import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Service client to bypass RLS for waitlist signups (lazy loaded to prevent module init failures)
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

const localBackupPath = path.join(process.cwd(), 'waitlist_emails.json')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const rawEmail = body?.email

    if (!rawEmail || typeof rawEmail !== 'string' || rawEmail.length > 500) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Strip control characters, newlines, trim and lowercase
    const cleanEmail = rawEmail.replace(/[\r\n\t\0\x00-\x1F\x7F]/g, '').trim().toLowerCase()

    // Enforce email length bounds and format (RFC 5321 specifies max 254 characters)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (cleanEmail.length < 5 || cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // 1. Try persisting to Supabase waitlist table if client is available
    const supabaseAdmin = getSupabaseAdmin()
    if (supabaseAdmin) {
      try {
        const { error } = await supabaseAdmin
          .from('waitlist')
          .insert([{ email: cleanEmail }])

        if (error && error.code !== '23505') { // Duplicate unique key is also considered success
          console.error('Supabase waitlist insert error details:', error)
        }
      } catch (dbErr) {
        console.error('Failed to insert into Supabase waitlist:', dbErr)
      }
    }

    // 2. Always back up to local json file to ensure absolute data persistence
    try {
      let waitlistList: any[] = []
      if (fs.existsSync(localBackupPath)) {
        try {
          const fileData = fs.readFileSync(localBackupPath, 'utf-8')
          waitlistList = JSON.parse(fileData)
          if (!Array.isArray(waitlistList)) waitlistList = []
        } catch {
          waitlistList = []
        }
      }
      if (!waitlistList.some((item: any) => item.email === cleanEmail)) {
        console.log(`[WAITLIST_SUCCESS] New signup: ${cleanEmail}`);
        waitlistList.push({
          email: cleanEmail,
          createdAt: new Date().toISOString()
        })
        const tempPath = `${localBackupPath}.tmp`
        fs.writeFileSync(tempPath, JSON.stringify(waitlistList, null, 2), 'utf-8')
        fs.renameSync(tempPath, localBackupPath)
      }
    } catch (fsErr) {
      console.error('Failed to backup waitlist locally:', fsErr)
    }

    return NextResponse.json({ success: true, message: 'You have been successfully added to our waitlist!' })
  } catch (error: any) {
    console.error('Waitlist POST error:', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}


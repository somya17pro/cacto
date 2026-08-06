import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { saveWaitlistDB, getWaitlistDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

const localBackupPath = path.join(process.cwd(), 'waitlist_emails.json')

export async function GET() {
  try {
    const dbWaitlist = await getWaitlistDB()
    let fileWaitlist: any[] = []

    if (fs.existsSync(localBackupPath)) {
      try {
        const fileData = fs.readFileSync(localBackupPath, 'utf-8')
        fileWaitlist = JSON.parse(fileData)
        if (!Array.isArray(fileWaitlist)) fileWaitlist = []
      } catch {
        fileWaitlist = []
      }
    }

    const mergedMap = new Map<string, any>()
    for (const item of fileWaitlist) {
      if (item.email) mergedMap.set(item.email.toLowerCase(), item)
    }
    for (const item of dbWaitlist) {
      if (item.email) mergedMap.set(item.email.toLowerCase(), item)
    }

    const allWaitlist = Array.from(mergedMap.values())

    return NextResponse.json({
      success: true,
      count: allWaitlist.length,
      waitlist: allWaitlist
    })
  } catch (error: any) {
    console.error('Waitlist GET error:', error)
    return NextResponse.json({ error: 'Failed to retrieve waitlist.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const rawEmail = body?.email
    const source = body?.source || 'Unknown'

    if (!rawEmail || typeof rawEmail !== 'string' || rawEmail.length > 500) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Strip control characters, newlines, trim and lowercase
    const cleanEmail = rawEmail.replace(/[\r\n\t\0\x00-\x1F\x7F]/g, '').trim().toLowerCase()

    // Enforce RFC 5321 email length bounds and format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (cleanEmail.length < 5 || cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // 1. Save to Database & In-Memory Store
    await saveWaitlistDB(cleanEmail, source)

    // 2. Persist to local JSON file
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
        console.log(`[WAITLIST_SUCCESS] New signup: ${cleanEmail} (Source: ${source})`)
        waitlistList.push({
          email: cleanEmail,
          source: source,
          createdAt: new Date().toISOString()
        })
        const tempPath = `${localBackupPath}.tmp`
        fs.writeFileSync(tempPath, JSON.stringify(waitlistList, null, 2), 'utf-8')
        fs.renameSync(tempPath, localBackupPath)
      }
    } catch (fsErr) {
      console.warn('[WAITLIST] Local file backup skipped/failed (normal in serverless):', fsErr)
    }

    return NextResponse.json({
      success: true,
      message: 'You have been successfully added to our waitlist!',
      email: cleanEmail
    })
  } catch (error: any) {
    console.error('Waitlist POST error:', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}

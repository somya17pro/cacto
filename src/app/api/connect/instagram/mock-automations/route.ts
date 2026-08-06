import { NextResponse } from 'next/server'
import { getAutomationsDB, saveAutomationDB } from '../../../../../lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const automations = await getAutomationsDB()
    return NextResponse.json(automations)
  } catch (err: any) {
    console.error('Failed to read automations from DB:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const saved = await saveAutomationDB(data)
    return NextResponse.json({ success: true, automation: saved })
  } catch (err: any) {
    console.error('Failed to write automation to DB:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

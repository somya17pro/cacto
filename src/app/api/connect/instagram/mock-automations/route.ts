import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const mockFilePath = path.join(process.cwd(), 'mock_automations.json')

export async function GET() {
  try {
    if (fs.existsSync(mockFilePath)) {
      const data = fs.readFileSync(mockFilePath, 'utf-8')
      return NextResponse.json(JSON.parse(data))
    }
    return NextResponse.json([])
  } catch (err: any) {
    console.error('Failed to read mock automations:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    fs.writeFileSync(mockFilePath, JSON.stringify(data, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Failed to write mock automations:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const confirmationCode = `DEL-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    const statusUrl = `https://cacto.cc/data-deletion?code=${confirmationCode}`

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process data deletion request' }, { status: 400 })
  }
}

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const logFilePath = path.join(process.cwd(), 'ai_bot_crawls.json')

export async function POST(request: Request) {
  try {
    const { botName, path: crawledPath } = await request.json()

    if (!botName || !crawledPath) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    let logs: any[] = []
    if (fs.existsSync(logFilePath)) {
      try {
        const fileData = fs.readFileSync(logFilePath, 'utf-8')
        logs = JSON.parse(fileData)
        if (!Array.isArray(logs)) logs = []
      } catch {
        logs = []
      }
    }

    logs.push({
      botName,
      path: crawledPath,
      timestamp: new Date().toISOString()
    })

    // Write back securely
    const tempPath = `${logFilePath}.tmp`
    fs.writeFileSync(tempPath, JSON.stringify(logs, null, 2), 'utf-8')
    fs.renameSync(tempPath, logFilePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to log bot crawl:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

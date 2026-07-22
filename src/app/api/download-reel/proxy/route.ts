import { NextResponse } from 'next/server'
import path from 'path'

function isValidMediaDomain(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false
    }

    const hostname = parsed.hostname.toLowerCase()

    // Block private/local IP addresses and localhost
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname === '0.0.0.0' ||
      hostname.startsWith('169.254.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)
    ) {
      return false
    }

    // Must match valid Meta/Instagram CDN domain
    const allowedDomainRegex = /(?:^|\.)(?:cdninstagram\.com|fbcdn\.net|instagram\.com|fbsbx\.com)$/i
    return allowedDomainRegex.test(hostname)
  } catch {
    return false
  }
}

function sanitizeFilename(rawFilename: string | null): string {
  if (!rawFilename) return 'cacto_instagram_reel.mp4'
  const baseName = path.basename(rawFilename.trim())
  const sanitized = baseName.replace(/[^a-zA-Z0-9_\.-]/g, '_').slice(0, 100)
  if (!sanitized || sanitized === '.' || sanitized === '..') {
    return 'cacto_instagram_reel.mp4'
  }
  const ext = path.extname(sanitized).toLowerCase()
  const allowedExts = ['.mp4', '.mov', '.jpg', '.jpeg', '.png', '.webp']
  if (!allowedExts.includes(ext)) {
    return `${sanitized}.mp4`
  }
  return sanitized
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const mediaUrl = searchParams.get('url')
  const rawFilename = searchParams.get('filename')

  if (!mediaUrl) {
    return NextResponse.json({ error: 'Missing media URL parameter' }, { status: 400 })
  }

  if (!isValidMediaDomain(mediaUrl)) {
    return NextResponse.json({ error: 'Invalid or unauthorized media source URL' }, { status: 400 })
  }

  const safeFilename = sanitizeFilename(rawFilename)
  const encodedFilename = encodeURIComponent(safeFilename)

  try {
    const res = await fetch(mediaUrl, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': '*/*'
      }
    })

    // Handle 301/302 redirects by validating destination domain before following
    if (res.status === 301 || res.status === 302) {
      const redirectUrl = res.headers.get('location')
      if (!redirectUrl || !isValidMediaDomain(redirectUrl)) {
        return NextResponse.json({ error: 'Unauthorized redirect source domain' }, { status: 400 })
      }
      const redirectedRes = await fetch(redirectUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      })
      if (!redirectedRes.ok) {
        return NextResponse.json({ error: `Failed to fetch media stream from redirected source (Status ${redirectedRes.status}).` }, { status: 502 })
      }
      const rawType = redirectedRes.headers.get('content-type') || ''
      const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-m4v', 'image/jpeg', 'image/png', 'image/webp', 'application/octet-stream']
      const contentType = allowedTypes.find(t => rawType.toLowerCase().startsWith(t)) || (safeFilename.endsWith('.jpg') ? 'image/jpeg' : 'video/mp4')
      const blob = await redirectedRes.blob()
      return new Response(blob, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`,
          'Cache-Control': 'no-cache',
          'X-Content-Type-Options': 'nosniff'
        }
      })
    }

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch media stream from source (Status ${res.status}).` }, { status: 502 })
    }

    const rawType = res.headers.get('content-type') || ''
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-m4v', 'image/jpeg', 'image/png', 'image/webp', 'application/octet-stream']
    const contentType = allowedTypes.find(t => rawType.toLowerCase().startsWith(t)) || (safeFilename.endsWith('.jpg') ? 'image/jpeg' : 'video/mp4')
    const blob = await res.blob()

    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodedFilename}`,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff'
      }
    })
  } catch (err: any) {
    console.error('Download proxy error:', err)
    return NextResponse.json({ error: err.message || 'Error proxying media stream download' }, { status: 500 })
  }
}


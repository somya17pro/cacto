import { NextResponse } from 'next/server'

function isValidMediaDomain(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false
    }
    const hostname = parsed.hostname.toLowerCase()
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
    const allowedDomainRegex = /(?:^|\.)(?:cdninstagram\.com|fbcdn\.net|instagram\.com|fbsbx\.com)$/i
    return allowedDomainRegex.test(hostname)
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaUrl = searchParams.get('url')

    if (!mediaUrl) {
      return new Response('Missing image URL', { status: 400 })
    }

    if (!isValidMediaDomain(mediaUrl)) {
      return new Response('Invalid or unauthorized media source URL', { status: 400 })
    }

    const response = await fetch(mediaUrl, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    if (response.status === 301 || response.status === 302) {
      const redirectUrl = response.headers.get('location')
      if (!redirectUrl || !isValidMediaDomain(redirectUrl)) {
        return new Response('Unauthorized redirect image source', { status: 400 })
      }
      const redirectedResponse = await fetch(redirectUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      if (!redirectedResponse.ok) {
        return new Response('Failed to download redirected image', { status: redirectedResponse.status })
      }
      const rawType = redirectedResponse.headers.get('content-type') || ''
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']
      const contentType = allowedTypes.find(t => rawType.toLowerCase().startsWith(t)) || 'image/jpeg'
      return new Response(redirectedResponse.body, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400, must-revalidate',
          'X-Content-Type-Options': 'nosniff'
        }
      })
    }

    if (!response.ok) {
      return new Response('Failed to download image', { status: response.status })
    }

    const rawType = response.headers.get('content-type') || ''
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']
    const contentType = allowedTypes.find(t => rawType.toLowerCase().startsWith(t)) || 'image/jpeg'
    return new Response(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, must-revalidate',
        'X-Content-Type-Options': 'nosniff'
      }
    })
  } catch (err: any) {
    console.error('Failed to proxy Instagram image:', err)
    return new Response('Internal error proxying image', { status: 500 })
  }
}


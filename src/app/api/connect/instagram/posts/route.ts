import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const shortcode = searchParams.get('shortcode')

    // If shortcode is passed, scrape single post page via proxy
    if (shortcode) {
      if (!/^[a-zA-Z0-9_-]{5,35}$/.test(shortcode)) {
        return NextResponse.json({ error: 'Invalid shortcode parameter' }, { status: 400 })
      }
      try {
        const url = `https://imginn.com/p/${encodeURIComponent(shortcode)}/`
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        })
        if (response.ok) {
          const html = await response.text()
          // Extract <div class="img">...<img src="..."/>
          const imgMatch = html.match(/<div class="img">[\s\S]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/i)
          if (imgMatch) {
            const origImg = imgMatch[1].replace(/&#38;/g, '&')
            return NextResponse.json({
              image: `/api/connect/instagram/proxy-image?url=${encodeURIComponent(origImg)}`,
              caption: imgMatch[2] || ''
            })
          }
        }
        return NextResponse.json({ error: 'Post not found on Imginn scraper' }, { status: 404 })
      } catch (err) {
        console.error('Failed to scrape single Instagram post:', err)
        return NextResponse.json({ error: 'Failed to scrape single post' }, { status: 500 })
      }
    }

    let username = searchParams.get('username')

    // If username is not passed, fetch it from connected accounts in Zernio
    if (!username) {
      const zernioApiKey = process.env.ZERNIO_API_KEY
      if (zernioApiKey && !zernioApiKey.includes('your_api_key_here')) {
        try {
          const response = await fetch('https://api.zernio.com/v1/accounts', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${zernioApiKey}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            const instagramAcct = data.accounts?.find((acct: any) => acct.platform === 'instagram')
            if (instagramAcct) {
              username = instagramAcct.username
            }
          }
        } catch (e) {
          console.error('Failed to retrieve Zernio username for posts list:', e)
        }
      }
    }

    if (!username || username === 'fake_profile' || !/^[a-zA-Z0-9._]{1,30}$/.test(username)) {
      return NextResponse.json({ posts: [] })
    }

    // Query Imginn profile to parse public posts
    const url = `https://imginn.com/${username}/`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    })

    if (!response.ok) {
      return NextResponse.json({ posts: [] })
    }

    const html = await response.text()
    const posts: any[] = []
    
    // Parse href="/p/shortcode/" and img src="url" alt="caption"
    const regex = /<a\s+href="\/p\/([A-Za-z0-9_-]+)\/"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/gi
    let match
    while ((match = regex.exec(html)) !== null) {
      const origImg = match[2].replace(/&#38;/g, '&')
      posts.push({
        id: match[1],
        label: `Reel`,
        gradient: 'from-orange-500 to-pink-500',
        image: `/api/connect/instagram/proxy-image?url=${encodeURIComponent(origImg)}`,
        caption: match[3] || ''
      })
    }

    return NextResponse.json({ posts })
  } catch (err: any) {
    console.error('Failed to parse Instagram posts from Imginn:', err)
    return NextResponse.json({ posts: [] })
  }
}

import { NextResponse } from 'next/server'

function parseShortcode(inputUrl: string): string | null {
  if (!inputUrl || typeof inputUrl !== 'string') return null
  const clean = inputUrl.trim()

  // Primary regex matching standard and share URL patterns
  const match = clean.match(/(?:reel|reels|p|share\/p|share\/reel|tv)\/([A-Za-z0-9_-]+)/i)
  if (match && match[1]) return match[1]

  // Secondary fallback: match alphanumeric shortcode segments (8 to 25 chars)
  const pathParts = clean.split('?')[0].split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1]
  if (lastPart && /^[A-Za-z0-9_-]{8,25}$/.test(lastPart) && !['instagram', 'reel', 'reels', 'p', 'tv'].includes(lastPart.toLowerCase())) {
    return lastPart
  }

  return null
}

async function fetchWithTimeout(url: string, headers: Record<string, string> = {}, timeoutMs = 8000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        ...headers
      },
      signal: controller.signal,
      next: { revalidate: 0 }
    })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    return null
  }
}

function isValidMediaDomain(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false
    const hostname = parsed.hostname.toLowerCase()
    return /(?:^|\.)(?:cdninstagram\.com|fbcdn\.net|instagram\.com|fbsbx\.com)$/i.test(hostname)
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url } = body

    const shortcode = parseShortcode(url)
    if (!shortcode) {
      return NextResponse.json({ error: 'Please enter a valid Instagram Reel or Video link (e.g. https://www.instagram.com/reel/...)' }, { status: 400 })
    }

    let extractedVideoUrl: string | null = null
    let extractedDisplayUrl: string | null = null
    let extractedAuthor: string = '@instagram.user'
    let extractedCaption: string = ''
    let extractedLikes: string = '0'
    let extractedComments: string = '0'
    let extractedDuration: string = '0:30'

    // TIER 1: GraphQL doc_id query
    try {
      const doc_id = '10015901848480474'
      const variables = encodeURIComponent(JSON.stringify({ shortcode }))
      const igApiUrl = `https://www.instagram.com/graphql/query/?doc_id=${doc_id}&variables=${variables}`

      const res = await fetchWithTimeout(igApiUrl, { 'X-IG-App-ID': '936619743392459' })
      if (res && res.ok) {
        const json = await res.json()
        const media = json?.data?.xdt_shortcode_media || json?.data?.shortcode_media
        if (media) {
          extractedVideoUrl = media.video_url || media.video_versions?.[0]?.url || null
          if (!extractedVideoUrl && media.edge_sidecar_to_children?.edges?.length > 0) {
            for (const edge of media.edge_sidecar_to_children.edges) {
              if (edge.node?.is_video && (edge.node?.video_url || edge.node?.video_versions?.[0]?.url)) {
                extractedVideoUrl = edge.node.video_url || edge.node.video_versions[0].url
                break
              }
            }
          }

          extractedDisplayUrl = media.display_url || media.thumbnail_src || null
          if (media.owner?.username) extractedAuthor = `@${media.owner.username}`
          extractedCaption = media.edge_media_to_caption?.edges[0]?.node?.text || ''
          const lCount = media.edge_media_preview_like?.count || media.like_count
          if (lCount) extractedLikes = typeof lCount === 'number' ? lCount.toLocaleString() : String(lCount)
          const cCount = media.edge_media_to_comment?.count || media.comment_count
          if (cCount) extractedComments = typeof cCount === 'number' ? cCount.toLocaleString() : String(cCount)
          if (media.video_duration) {
            extractedDuration = `${Math.floor(media.video_duration / 60)}:${String(Math.floor(media.video_duration % 60)).padStart(2, '0')}`
          }
        }
      }
    } catch (e) {
      console.log('Tier 1 extraction skipped')
    }

    // TIER 2: ?__a=1 API endpoint fallback
    if (!extractedVideoUrl) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, { 'X-IG-App-ID': '936619743392459' })
        if (res && res.ok) {
          const json = await res.json()
          const item = json.items?.[0] || json.graphql?.shortcode_media
          if (item) {
            extractedVideoUrl = item.video_url || item.video_versions?.[0]?.url || null
            if (!extractedDisplayUrl) extractedDisplayUrl = item.display_url || item.image_versions2?.candidates?.[0]?.url || null
            if (item.user?.username) extractedAuthor = `@${item.user.username}`
            if (!extractedCaption && item.caption?.text) extractedCaption = item.caption.text
          }
        }
      } catch (e) {
        console.log('Tier 2 extraction skipped')
      }
    }

    // TIER 3: Embed HTML parser fallback
    if (!extractedVideoUrl) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/embed/captioned/`)
        if (res && res.ok) {
          const html = await res.text()
          const vMatch = html.match(/"video_url"\s*:\s*"([^"]+)"/) || html.match(/<video[^>]+src="([^"]+)"/)
          if (vMatch && vMatch[1]) {
            extractedVideoUrl = vMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '')
          }
          const iMatch = html.match(/"display_url"\s*:\s*"([^"]+)"/) || html.match(/<img[^>]+class="EmbeddedMediaImage"[^>]+src="([^"]+)"/)
          if (!extractedDisplayUrl && iMatch && iMatch[1]) {
            extractedDisplayUrl = iMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '')
          }
          const uMatch = html.match(/"username"\s*:\s*"([^"]+)"/)
          if (uMatch && uMatch[1]) extractedAuthor = `@${uMatch[1]}`
        }
      } catch (e) {
        console.log('Tier 3 extraction skipped')
      }
    }

    if (!extractedVideoUrl || !isValidMediaDomain(extractedVideoUrl)) {
      return NextResponse.json({ error: 'Could not extract downloadable video media from this Instagram link. The Reel may be from a private profile or deleted.' }, { status: 404 })
    }

    if (extractedDisplayUrl && !isValidMediaDomain(extractedDisplayUrl)) {
      extractedDisplayUrl = null
    }

    const title = extractedCaption.length > 120 ? `${extractedCaption.slice(0, 117)}...` : (extractedCaption || `Instagram Reel (${shortcode})`)

    return NextResponse.json({
      success: true,
      shortcode,
      isVideo: true,
      videoUrl: extractedVideoUrl,
      displayUrl: extractedDisplayUrl,
      author: extractedAuthor,
      title,
      caption: extractedCaption,
      likes: extractedLikes,
      comments: extractedComments,
      duration: extractedDuration
    })

  } catch (err: any) {
    console.error('Download Reel API Error:', err)
    return NextResponse.json({ error: err.message || 'An unexpected error occurred while processing the Reel.' }, { status: 500 })
  }
}

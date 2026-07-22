import { NextResponse } from 'next/server'

interface PhotoEntry {
  url: string
  width: number | null
  height: number | null
  alt: string
}

/**
 * Parse shortcode from Instagram post/reel URLs.
 * Returns null for profile-only URLs (handled separately).
 */
function parseShortcode(inputUrl: string): string | null {
  if (!inputUrl || typeof inputUrl !== 'string') return null
  const clean = inputUrl.trim()

  // Primary regex matching standard and share URL patterns
  const match = clean.match(/(?:reel|reels|p|share\/p|share\/reel|tv)\/([A-Za-z0-9_-]+)/i)
  if (match && match[1]) return match[1]

  // Secondary fallback: match alphanumeric shortcode segments (8 to 25 chars)
  const pathParts = clean.split('?')[0].split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1]
  if (lastPart && /^[A-Za-z0-9_-]{8,25}$/.test(lastPart) && !['instagram', 'reel', 'reels', 'p', 'tv', 'www.instagram.com', 'instagram.com'].includes(lastPart.toLowerCase())) {
    return lastPart
  }

  return null
}

/**
 * Detect if the URL is a profile URL (e.g. instagram.com/USERNAME/).
 * Returns the username or null.
 */
function parseProfileUsername(inputUrl: string): string | null {
  if (!inputUrl || typeof inputUrl !== 'string') return null
  const clean = inputUrl.trim()

  // Must be an instagram.com URL
  if (!/instagram\.com/i.test(clean)) return null

  // Must NOT contain /p/, /reel/, /reels/, /tv/, /share/ segments
  if (/\/(p|reel|reels|tv|share)\//i.test(clean)) return null

  try {
    const parsed = new URL(clean.startsWith('http') ? clean : `https://${clean}`)
    const segments = parsed.pathname.split('/').filter(Boolean)

    // A profile URL has exactly one path segment (the username)
    if (segments.length === 1) {
      const username = segments[0]
      // Filter out known non-profile paths
      const reserved = ['explore', 'accounts', 'directory', 'about', 'developer', 'legal', 'api', 'graphql', 'static', 'favicon.ico']
      if (!reserved.includes(username.toLowerCase()) && /^[A-Za-z0-9._]{1,30}$/.test(username)) {
        return username
      }
    }
  } catch {
    return null
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

function unescapeUrl(raw: string): string {
  return raw.replace(/\\u0026/g, '&').replace(/\\\//g, '/').replace(/\\/g, '')
}

/**
 * Extract photos from a post shortcode using 3-tier fallback.
 */
async function extractPostPhotos(shortcode: string): Promise<{
  photos: PhotoEntry[]
  author: string
  caption: string
  isCarousel: boolean
}> {
  const photos: PhotoEntry[] = []
  let author = '@instagram.user'
  let caption = ''
  let isCarousel = false

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
        if (media.owner?.username) author = `@${media.owner.username}`
        caption = media.edge_media_to_caption?.edges[0]?.node?.text || ''

        // Carousel handling
        if (media.edge_sidecar_to_children?.edges?.length > 0) {
          isCarousel = true
          for (const edge of media.edge_sidecar_to_children.edges) {
            const node = edge.node
            if (node) {
              const photoUrl = node.display_url || node.display_resources?.slice(-1)[0]?.src || null
              if (photoUrl) {
                photos.push({
                  url: photoUrl,
                  width: node.dimensions?.width || null,
                  height: node.dimensions?.height || null,
                  alt: node.accessibility_caption || caption.slice(0, 100) || `Photo from ${author}`
                })
              }
            }
          }
        }

        // Single post
        if (photos.length === 0) {
          const displayUrl = media.display_url || media.display_resources?.slice(-1)[0]?.src || null
          if (displayUrl) {
            photos.push({
              url: displayUrl,
              width: media.dimensions?.width || null,
              height: media.dimensions?.height || null,
              alt: media.accessibility_caption || caption.slice(0, 100) || `Photo from ${author}`
            })
          }
        }
      }
    }
  } catch (e) {
    console.log('Photo Tier 1 extraction skipped')
  }

  // TIER 2: ?__a=1&__d=1 JSON endpoint fallback
  if (photos.length === 0) {
    try {
      const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, { 'X-IG-App-ID': '936619743392459' })
      if (res && res.ok) {
        const json = await res.json()
        const item = json.items?.[0] || json.graphql?.shortcode_media
        if (item) {
          if (item.user?.username) author = `@${item.user.username}`
          if (!caption && item.caption?.text) caption = item.caption.text

          // Carousel from items API
          const carouselMedia = item.carousel_media || item.edge_sidecar_to_children?.edges
          if (carouselMedia && carouselMedia.length > 0) {
            isCarousel = true
            for (const child of carouselMedia) {
              const node = child.node || child
              const photoUrl = node.display_url || node.image_versions2?.candidates?.[0]?.url || null
              if (photoUrl) {
                photos.push({
                  url: photoUrl,
                  width: node.image_versions2?.candidates?.[0]?.width || node.dimensions?.width || null,
                  height: node.image_versions2?.candidates?.[0]?.height || node.dimensions?.height || null,
                  alt: node.accessibility_caption || caption.slice(0, 100) || `Photo from ${author}`
                })
              }
            }
          }

          // Single image fallback
          if (photos.length === 0) {
            const photoUrl = item.display_url || item.image_versions2?.candidates?.[0]?.url || null
            if (photoUrl) {
              photos.push({
                url: photoUrl,
                width: item.image_versions2?.candidates?.[0]?.width || item.dimensions?.width || null,
                height: item.image_versions2?.candidates?.[0]?.height || item.dimensions?.height || null,
                alt: item.accessibility_caption || caption.slice(0, 100) || `Photo from ${author}`
              })
            }
          }
        }
      }
    } catch (e) {
      console.log('Photo Tier 2 extraction skipped')
    }
  }

  // TIER 3: Embed HTML scraper fallback
  if (photos.length === 0) {
    try {
      const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/embed/`)
      if (res && res.ok) {
        const html = await res.text()

        // Try to extract display_url from embedded JSON
        const displayMatch = html.match(/"display_url"\s*:\s*"([^"]+)"/)
        if (displayMatch && displayMatch[1]) {
          photos.push({
            url: unescapeUrl(displayMatch[1]),
            width: null,
            height: null,
            alt: `Instagram photo (${shortcode})`
          })
        }

        // Fallback: extract og:image meta tag
        if (photos.length === 0) {
          const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i)
          if (ogMatch && ogMatch[1]) {
            photos.push({
              url: unescapeUrl(ogMatch[1]),
              width: null,
              height: null,
              alt: `Instagram photo (${shortcode})`
            })
          }
        }

        // Fallback: EmbeddedMediaImage class
        if (photos.length === 0) {
          const imgMatch = html.match(/<img[^>]+class="EmbeddedMediaImage"[^>]+src="([^"]+)"/)
          if (imgMatch && imgMatch[1]) {
            photos.push({
              url: unescapeUrl(imgMatch[1]),
              width: null,
              height: null,
              alt: `Instagram photo (${shortcode})`
            })
          }
        }

        const uMatch = html.match(/"username"\s*:\s*"([^"]+)"/)
        if (uMatch && uMatch[1]) author = `@${uMatch[1]}`
      }
    } catch (e) {
      console.log('Photo Tier 3 extraction skipped')
    }
  }

  return { photos, author, caption, isCarousel }
}

/**
 * Extract profile picture from a username.
 */
async function extractProfilePic(username: string): Promise<{
  photos: PhotoEntry[]
  author: string
  profilePic: string | null
}> {
  let profilePic: string | null = null
  const author = `@${username}`

  // Try GraphQL profile page
  try {
    const res = await fetchWithTimeout(`https://www.instagram.com/${username}/?__a=1&__d=dis`, { 'X-IG-App-ID': '936619743392459' })
    if (res && res.ok) {
      const json = await res.json()
      const user = json.graphql?.user || json.data?.user
      if (user) {
        profilePic = user.profile_pic_url_hd || user.profile_pic_url || null
      }
    }
  } catch {
    console.log('Profile GraphQL extraction skipped')
  }

  // Fallback: fetch profile page HTML and extract og:image
  if (!profilePic) {
    try {
      const res = await fetchWithTimeout(`https://www.instagram.com/${username}/`)
      if (res && res.ok) {
        const html = await res.text()
        const ogMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i)
        if (ogMatch && ogMatch[1]) {
          profilePic = unescapeUrl(ogMatch[1])
        }

        // Try extracting from embedded JSON
        if (!profilePic) {
          const hdMatch = html.match(/"profile_pic_url_hd"\s*:\s*"([^"]+)"/)
          if (hdMatch && hdMatch[1]) {
            profilePic = unescapeUrl(hdMatch[1])
          }
        }
      }
    } catch {
      console.log('Profile HTML extraction skipped')
    }
  }

  const photos: PhotoEntry[] = []
  if (profilePic && isValidMediaDomain(profilePic)) {
    photos.push({
      url: profilePic,
      width: null,
      height: null,
      alt: `${author}'s profile picture`
    })
  }

  return { photos, author, profilePic }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid Instagram URL.' }, { status: 400 })
    }

    // Check if this is a profile URL
    const profileUsername = parseProfileUsername(url)
    if (profileUsername) {
      const { photos, author, profilePic } = await extractProfilePic(profileUsername)

      if (photos.length === 0 || !profilePic) {
        return NextResponse.json({ error: 'Could not extract the profile picture. The profile may be private or does not exist.' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        photos,
        author,
        caption: '',
        isCarousel: false,
        profilePic
      })
    }

    // Parse shortcode for post/reel URLs
    const shortcode = parseShortcode(url)
    if (!shortcode) {
      return NextResponse.json({ error: 'Please enter a valid Instagram Photo link (e.g. https://www.instagram.com/p/...)' }, { status: 400 })
    }

    const { photos, author, caption, isCarousel } = await extractPostPhotos(shortcode)

    // Validate all photo URLs against allowed domains
    const validPhotos = photos.filter(p => isValidMediaDomain(p.url))

    if (validPhotos.length === 0) {
      return NextResponse.json({ error: 'Could not extract downloadable photo media from this Instagram link. The post may be from a private profile or deleted.' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      shortcode,
      photos: validPhotos,
      author,
      caption: caption.length > 300 ? `${caption.slice(0, 297)}...` : caption,
      isCarousel
    })

  } catch (err: any) {
    console.error('Download Photo API Error:', err)
    return NextResponse.json({ error: err.message || 'An unexpected error occurred while processing the photo.' }, { status: 500 })
  }
}

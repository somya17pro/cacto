import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { execFileSync } from 'child_process'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

function getFfmpegBinaryPath(): string {
  // Try ffmpeg-static first (bundled binary for serverless)
  try {
    const ffmpegStatic = require('ffmpeg-static')
    if (ffmpegStatic && typeof ffmpegStatic === 'string' && fs.existsSync(ffmpegStatic)) {
      return ffmpegStatic
    }
  } catch (e) {
    // ffmpeg-static not available
  }
  // Fallback to system ffmpeg
  return 'ffmpeg'
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

function parseShortcode(inputUrl: string): string | null {
  if (!inputUrl || typeof inputUrl !== 'string') return null
  let clean = inputUrl.trim()
  try {
    clean = decodeURIComponent(clean)
  } catch {}

  const match = clean.match(/(?:reel|reels|p|share\/p|share\/reel|tv)\/([A-Za-z0-9_-]+)/i)
  if (match && match[1]) return match[1]

  const pathParts = clean.split('?')[0].split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1]
  if (lastPart && /^[A-Za-z0-9_-]{8,25}$/.test(lastPart) && !['instagram', 'reel', 'reels', 'p', 'tv'].includes(lastPart.toLowerCase())) {
    return lastPart
  }

  return null
}

function cleanHtmlText(str: string): string {
  if (!str) return ''
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/<[^>]*>/g, '')
    .trim()
}

function cleanMediaUrl(rawUrl: string): string {
  if (!rawUrl) return ''
  return rawUrl
    .replace(/\\u0026/g, '&')
    .replace(/\\/g, '')
    .replace(/&amp;/g, '&')
    .trim()
}

async function fetchWithTimeout(url: string, headers: Record<string, string> = {}, timeoutMs = 12000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Mode': 'cors',
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

async function downloadMediaFile(url: string, dest: string): Promise<boolean> {
  if (!url || !isValidMediaDomain(url)) return false
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'video/webm,video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.instagram.com/',
        'Origin': 'https://www.instagram.com'
      }
    })

    if (!res.ok) return false
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    if (buffer.length < 5000) return false
    fs.writeFileSync(dest, buffer)
    return fs.existsSync(dest) && fs.statSync(dest).size > 5000
  } catch (err) {
    console.error('[Download] Error:', err)
    return false
  }
}

/**
 * Transcribe audio using OpenAI Whisper API (works on any serverless environment).
 * Falls back to local @xenova/transformers if OPENAI_API_KEY is not set.
 */
async function transcribeWithOpenAI(audioFilePath: string): Promise<{
  text: string
  segments: { time: string; text: string }[]
} | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'your_openai_api_key') {
    console.log('[Whisper] No OPENAI_API_KEY, skipping OpenAI transcription')
    return null
  }

  try {
    const audioBuffer = fs.readFileSync(audioFilePath)
    const blob = new Blob([audioBuffer], { type: 'audio/wav' })

    const formData = new FormData()
    formData.append('file', blob, 'audio.wav')
    formData.append('model', 'whisper-1')
    formData.append('response_format', 'verbose_json')
    formData.append('timestamp_granularities[]', 'segment')
    formData.append('language', 'en')

    console.log('[Whisper API] Sending audio to OpenAI (' + (audioBuffer.length / 1024).toFixed(0) + ' KB)')
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[Whisper API] Error:', res.status, errText.slice(0, 200))
      return null
    }

    const data = await res.json()
    console.log('[Whisper API] Success. Text length:', data.text?.length, 'Segments:', data.segments?.length)

    const fullText = (data.text || '').trim()
    if (!fullText) return null

    const segments: { time: string; text: string }[] = []
    if (data.segments && data.segments.length > 0) {
      for (const seg of data.segments) {
        const startSec = Math.floor(seg.start || 0)
        const timeStr = `${Math.floor(startSec / 60)}:${String(startSec % 60).padStart(2, '0')}`
        const text = (seg.text || '').trim()
        if (text) {
          segments.push({ time: timeStr, text })
        }
      }
    }

    return { text: fullText, segments }
  } catch (err: any) {
    console.error('[Whisper API] Exception:', err?.message)
    return null
  }
}

export async function POST(req: Request) {
  const tmpDir = os.tmpdir()
  let mp4Path = ''
  let wavPath = ''

  try {
    const body = await req.json()
    const { url } = body

    const shortcode = parseShortcode(url)
    if (!shortcode) {
      return NextResponse.json({ error: 'Please enter a valid Instagram Reel link (e.g. https://www.instagram.com/reel/...)' }, { status: 400 })
    }

    let videoUrl = ''
    let displayUrl = ''
    let author = '@instagram.user'
    let rawCaption = ''
    let durationSeconds = 30

    // TIER 1: GraphQL query with multiple doc_ids
    const docIds = ['10015901848480474', '8845758582119845', '7159494324135219', '17888483320008559']
    for (const doc_id of docIds) {
      if (videoUrl) break
      try {
        const variables = encodeURIComponent(JSON.stringify({ shortcode }))
        const res = await fetchWithTimeout(`https://www.instagram.com/graphql/query/?doc_id=${doc_id}&variables=${variables}`, {
          'X-IG-App-ID': '936619743392459',
          'Referer': `https://www.instagram.com/reel/${shortcode}/`
        })

        if (res && res.ok) {
          const json = await res.json()
          const media = json?.data?.xdt_shortcode_media || json?.data?.shortcode_media
          if (media) {
            videoUrl = cleanMediaUrl(media.video_url || media.video_versions?.[0]?.url || '')
            displayUrl = cleanMediaUrl(media.display_url || media.thumbnail_src || '')
            if (media.owner?.username) author = `@${media.owner.username}`
            rawCaption = media.edge_media_to_caption?.edges[0]?.node?.text || ''
            if (media.video_duration) durationSeconds = Math.round(media.video_duration)
          }
        }
      } catch (e) {
        console.log(`Tier 1 (${doc_id}) skipped`)
      }
    }

    // TIER 2: ?__a=1 REST API fallback
    if (!videoUrl) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, {
          'X-IG-App-ID': '936619743392459',
          'Referer': `https://www.instagram.com/reel/${shortcode}/`
        })
        if (res && res.ok) {
          const json = await res.json()
          const item = json.items?.[0] || json.graphql?.shortcode_media
          if (item) {
            videoUrl = cleanMediaUrl(item.video_url || item.video_versions?.[0]?.url || '')
            if (!displayUrl) displayUrl = cleanMediaUrl(item.display_url || item.image_versions2?.candidates?.[0]?.url || '')
            if (item.user?.username) author = `@${item.user.username}`
            if (!rawCaption && item.caption?.text) rawCaption = item.caption.text
            if (item.video_duration) durationSeconds = Math.round(item.video_duration)
          }
        }
      } catch (e) {
        console.log('Tier 2 skipped')
      }
    }

    // TIER 3: Embed HTML extraction
    if (!videoUrl || !rawCaption) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/embed/captioned/`)
        if (res && res.ok) {
          const html = await res.text()
          if (!videoUrl) {
            const vMatch = html.match(/"video_url"\s*:\s*"([^"]+)"/) ||
                           html.match(/\\"video_url\\"\s*:\s*\\"([^\\"]+)\\"/) ||
                           html.match(/video_versions"[\s\S]*?"url"\s*:\s*"([^"]+)"/) ||
                           html.match(/<video[^>]+src="([^"]+)"/)
            if (vMatch && vMatch[1]) videoUrl = cleanMediaUrl(vMatch[1])
          }
          if (!rawCaption) {
            const cMatch = html.match(/"caption"\s*:\s*"([^"]+)"/) || html.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/)
            if (cMatch && cMatch[1]) rawCaption = cleanHtmlText(cMatch[1])
          }
          if (author === '@instagram.user') {
            const uMatch = html.match(/"username"\s*:\s*"([^"]+)"/)
            if (uMatch && uMatch[1]) author = `@${uMatch[1]}`
          }
          if (!displayUrl) {
            const dMatch = html.match(/"display_url"\s*:\s*"([^"]+)"/) || html.match(/<img[^>]+class="EmbeddedMediaImage"[^>]+src="([^"]+)"/)
            if (dMatch && dMatch[1]) displayUrl = cleanMediaUrl(dMatch[1])
          }
        }
      } catch (e) {
        console.log('Tier 3 skipped')
      }
    }

    // TIER 4: OpenGraph page scraping fallback
    if (!videoUrl) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/reel/${shortcode}/`, {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        })
        if (res && res.ok) {
          const html = await res.text()
          const ogMatch = html.match(/<meta\s+property="og:video(?::secure_url)?"\s+content="([^"]+)"/i)
          if (ogMatch && ogMatch[1]) videoUrl = cleanMediaUrl(ogMatch[1])
          const descMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)
          if (!rawCaption && descMatch && descMatch[1]) rawCaption = cleanHtmlText(descMatch[1])
        }
      } catch (e) {
        console.log('Tier 4 skipped')
      }
    }

    // TIER 5: Instagram oEmbed metadata backup
    if (!rawCaption || author === '@instagram.user' || !displayUrl) {
      try {
        const res = await fetchWithTimeout(`https://api.instagram.com/oembed/?url=https://www.instagram.com/p/${shortcode}/`)
        if (res && res.ok) {
          const oembed = await res.json()
          if (!rawCaption && oembed.title) rawCaption = cleanHtmlText(oembed.title)
          if (author === '@instagram.user' && oembed.author_name) author = `@${oembed.author_name}`
          if (!displayUrl && oembed.thumbnail_url) displayUrl = cleanMediaUrl(oembed.thumbnail_url)
        }
      } catch (e) {
        console.log('Tier 5 skipped')
      }
    }

    let speechSegments: { time: string; text: string }[] = []
    let fullSpokenText = ''

    // AUDIO SPEECH TRANSCRIPTION PIPELINE
    // Step 1: Download the video MP4
    // Step 2: Extract audio to WAV using ffmpeg
    // Step 3: Send WAV to OpenAI Whisper API for transcription
    if (videoUrl && isValidMediaDomain(videoUrl)) {
      mp4Path = path.join(tmpDir, `reel_${shortcode}_${Date.now()}.mp4`)
      wavPath = path.join(tmpDir, `audio_${shortcode}_${Date.now()}.wav`)

      console.log('[Step 1] Downloading video:', videoUrl.slice(0, 80))
      const downloaded = await downloadMediaFile(videoUrl, mp4Path)
      const mp4Size = downloaded && fs.existsSync(mp4Path) ? fs.statSync(mp4Path).size : 0
      console.log('[Step 2] Download:', downloaded ? 'OK' : 'FAILED', 'Size:', mp4Size)

      if (downloaded && mp4Size > 5000) {
        try {
          // Extract audio from MP4 → WAV (16kHz mono PCM)
          const ffmpegBinary = getFfmpegBinaryPath()
          console.log('[Step 3] ffmpeg binary:', ffmpegBinary)
          execFileSync(ffmpegBinary, ['-y', '-i', mp4Path, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wavPath], { stdio: 'ignore', timeout: 30000 })

          const wavSize = fs.existsSync(wavPath) ? fs.statSync(wavPath).size : 0
          console.log('[Step 4] WAV extracted, size:', wavSize)

          if (wavSize > 1000) {
            // Primary: OpenAI Whisper API (works on Vercel serverless)
            const result = await transcribeWithOpenAI(wavPath)
            if (result && result.text) {
              fullSpokenText = result.text
              speechSegments = result.segments
              console.log('[Step 5] OpenAI transcription complete. Words:', fullSpokenText.split(/\s+/).length)
            }

            // Fallback: Local @xenova/transformers Whisper ONNX (works on local dev, may fail on serverless)
            if (!fullSpokenText) {
              console.log('[Step 5b] Trying local Whisper ONNX fallback...')
              try {
                if (!process.env.TRANSFORMERS_CACHE) {
                  process.env.TRANSFORMERS_CACHE = path.join(os.tmpdir(), 'transformers_cache')
                }
                const { WaveFile } = require('wavefile')
                const wavBuffer = fs.readFileSync(wavPath)
                const wav = new WaveFile(wavBuffer)
                wav.toBitDepth('32f')
                wav.toSampleRate(16000)
                let audioSamples = wav.getSamples()
                if (Array.isArray(audioSamples)) audioSamples = audioSamples[0]

                const { pipeline } = await import('@xenova/transformers')
                const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base.en')

                const WINDOW_SIZE = 25 * 16000
                const totalSamples = audioSamples.length
                const allChunks: any[] = []
                let fullTextParts: string[] = []

                if (totalSamples > WINDOW_SIZE) {
                  for (let offset = 0; offset < totalSamples; offset += WINDOW_SIZE) {
                    const chunkSamples = audioSamples.slice(offset, offset + WINDOW_SIZE)
                    if (chunkSamples.length < 16000) continue
                    const offsetSec = Math.floor(offset / 16000)
                    const wRes = await transcriber(chunkSamples, { return_timestamps: true })
                    if (wRes && wRes.text) {
                      const cleanedText = cleanHtmlText(wRes.text.trim())
                      if (cleanedText) fullTextParts.push(cleanedText)
                      if (wRes.chunks && wRes.chunks.length > 0) {
                        wRes.chunks.forEach((c: any) => {
                          const startSec = offsetSec + Math.floor(c.timestamp?.[0] || 0)
                          const timeStr = `${Math.floor(startSec / 60)}:${String(startSec % 60).padStart(2, '0')}`
                          const cleanChunk = cleanHtmlText(c.text)
                          if (cleanChunk) allChunks.push({ time: timeStr, text: cleanChunk })
                        })
                      }
                    }
                  }
                  fullSpokenText = fullTextParts.join(' ')
                  speechSegments = allChunks.filter(s => s.text.length > 0)
                } else {
                  const whisperOutput = await transcriber(audioSamples, { return_timestamps: true })
                  if (whisperOutput && whisperOutput.text && whisperOutput.text.trim().length > 0) {
                    fullSpokenText = cleanHtmlText(whisperOutput.text.trim())
                    if (whisperOutput.chunks && whisperOutput.chunks.length > 0) {
                      speechSegments = whisperOutput.chunks.map((chunk: any) => {
                        const startSec = Math.floor(chunk.timestamp?.[0] || 0)
                        const timeStr = `${Math.floor(startSec / 60)}:${String(startSec % 60).padStart(2, '0')}`
                        return { time: timeStr, text: cleanHtmlText(chunk.text) }
                      }).filter((s: any) => s.text.length > 0)
                    }
                  }
                }
                if (fullSpokenText) {
                  console.log('[Step 5b] Local Whisper done. Words:', fullSpokenText.split(/\s+/).length)
                }
              } catch (localErr: any) {
                console.log('[Step 5b] Local Whisper failed:', localErr?.message?.slice(0, 150))
              }
            }
          } else {
            console.log('[Step 4] WAV too small or missing, skipping transcription')
          }
        } catch (pipelineErr: any) {
          console.error('[PIPELINE ERROR]', pipelineErr?.message || pipelineErr)
        }
      } else {
        console.log('[Step 2] Video download failed, skipping audio pipeline')
      }
    } else {
      console.log('[SKIP] No valid video URL extracted')
    }

    // Fallback: If no audio speech was detected, use caption text
    if (!fullSpokenText || speechSegments.length === 0) {
      console.log('[Fallback] Using caption text (no speech transcription available)')
      const cleanText = rawCaption.replace(/#\w+/g, '').replace(/\[.*?\]/g, '').trim()
      if (cleanText) {
        fullSpokenText = cleanText
        const sentences = cleanText.split(/(?<=[.!?\n])\s+/).filter(s => s.trim().length > 0)
        const timeStep = Math.max(3, Math.floor(durationSeconds / Math.max(1, sentences.length)))
        speechSegments = sentences.map((sentence, idx) => {
          const sec = idx * timeStep
          return {
            time: `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`,
            text: sentence.trim()
          }
        })
      }
    }

    if (!fullSpokenText) {
      return NextResponse.json({ error: 'Could not transcribe video audio for this Instagram link. The account may be private or URL invalid.' }, { status: 404 })
    }

    const words = fullSpokenText.split(/\s+/).filter(Boolean)
    const wordCount = words.length
    const readingTime = (wordCount / 200).toFixed(1)
    const title = speechSegments[0]?.text ? (speechSegments[0].text.length > 100 ? `${speechSegments[0].text.slice(0, 97)}...` : speechSegments[0].text) : `Instagram Reel (${shortcode})`

    return NextResponse.json({
      success: true,
      shortcode,
      author,
      title,
      fullTranscript: fullSpokenText,
      wordCount,
      readingTime: `${readingTime} min`,
      duration: `${Math.floor(durationSeconds / 60)}:${String(durationSeconds % 60).padStart(2, '0')}`,
      thumbnail: displayUrl,
      segments: speechSegments
    })

  } catch (err: any) {
    console.error('Transcript API Error:', err)
    return NextResponse.json({ error: err.message || 'An unexpected error occurred while transcribing video.' }, { status: 500 })
  } finally {
    if (mp4Path) {
      try { if (fs.existsSync(mp4Path)) fs.unlinkSync(mp4Path) } catch (e) {}
    }
    if (wavPath) {
      try { if (fs.existsSync(wavPath)) fs.unlinkSync(wavPath) } catch (e) {}
    }
  }
}

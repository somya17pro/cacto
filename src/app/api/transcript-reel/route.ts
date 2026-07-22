import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import os from 'os'
import https from 'https'
import { execFileSync } from 'child_process'

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
  const clean = inputUrl.trim()

  const match = clean.match(/(?:reel|reels|p|share\/p|share\/reel|tv)\/([A-Za-z0-9_-]+)/i)
  if (match && match[1]) return match[1]

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

async function downloadMediaFile(url: string, dest: string, maxRedirects = 5): Promise<boolean> {
  if (!isValidMediaDomain(url) || maxRedirects <= 0) {
    return false
  }

  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest)
    let cleanedUp = false

    const cleanup = () => {
      if (cleanedUp) return
      cleanedUp = true
      try {
        file.close(() => {
          try { if (fs.existsSync(dest)) fs.unlinkSync(dest) } catch {}
        })
      } catch {
        try { if (fs.existsSync(dest)) fs.unlinkSync(dest) } catch {}
      }
    }

    const req = https.get(url, { timeout: 15000 }, (res) => {
      // Set response data idle timeout (15s) to prevent hung streams
      res.setTimeout(15000, () => {
        res.destroy()
        cleanup()
        resolve(false)
      })

      if (res.statusCode === 301 || res.statusCode === 302) {
        cleanup()
        if (res.headers.location && isValidMediaDomain(res.headers.location)) {
          downloadMediaFile(res.headers.location, dest, maxRedirects - 1).then(resolve)
          return
        }
        resolve(false)
        return
      }

      if (res.statusCode !== 200) {
        cleanup()
        resolve(false)
        return
      }

      res.pipe(file)
      file.on('finish', () => {
        file.close(() => resolve(true))
      })
      file.on('error', () => {
        cleanup()
        resolve(false)
      })
    })

    req.on('timeout', () => {
      req.destroy()
      cleanup()
      resolve(false)
    })

    req.on('error', () => {
      cleanup()
      resolve(false)
    })
  })
}

let transcriberPipeline: any = null

async function getTranscriber() {
  if (!transcriberPipeline) {
    const { pipeline } = await import('@xenova/transformers')
    transcriberPipeline = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en')
  }
  return transcriberPipeline
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

    // TIER 1: GraphQL query
    try {
      const doc_id = '10015901848480474'
      const variables = encodeURIComponent(JSON.stringify({ shortcode }))
      const res = await fetchWithTimeout(`https://www.instagram.com/graphql/query/?doc_id=${doc_id}&variables=${variables}`, {
        'X-IG-App-ID': '936619743392459'
      })

      if (res && res.ok) {
        const json = await res.json()
        const media = json?.data?.xdt_shortcode_media || json?.data?.shortcode_media
        if (media) {
          videoUrl = media.video_url || media.video_versions?.[0]?.url || ''
          displayUrl = media.display_url || media.thumbnail_src || ''
          if (media.owner?.username) author = `@${media.owner.username}`
          rawCaption = media.edge_media_to_caption?.edges[0]?.node?.text || ''
          if (media.video_duration) durationSeconds = Math.round(media.video_duration)
        }
      }
    } catch (e) {
      console.log('Tier 1 extraction skipped')
    }

    // TIER 2 Fallback: Embed HTML
    if (!videoUrl || !rawCaption) {
      try {
        const res = await fetchWithTimeout(`https://www.instagram.com/p/${shortcode}/embed/captioned/`)
        if (res && res.ok) {
          const html = await res.text()
          const vMatch = html.match(/"video_url"\s*:\s*"([^"]+)"/) || html.match(/<video[^>]+src="([^"]+)"/)
          if (vMatch && vMatch[1]) videoUrl = vMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '')
          const cMatch = html.match(/"caption"\s*:\s*"([^"]+)"/) || html.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/)
          if (cMatch && cMatch[1] && !rawCaption) rawCaption = cMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
          const uMatch = html.match(/"username"\s*:\s*"([^"]+)"/)
          if (uMatch && uMatch[1] && author === '@instagram.user') author = `@${uMatch[1]}`
        }
      } catch (e) {
        console.log('Tier 2 extraction skipped')
      }
    }

    let speechSegments: { time: string; text: string }[] = []
    let fullSpokenText = ''

    // Run AI Audio Transcription on the MP4 file if videoUrl is available and valid
    if (videoUrl && isValidMediaDomain(videoUrl)) {
      mp4Path = path.join(tmpDir, `reel_${shortcode}_${Date.now()}.mp4`)
      wavPath = path.join(tmpDir, `audio_${shortcode}_${Date.now()}.wav`)

      const downloaded = await downloadMediaFile(videoUrl, mp4Path)
      if (downloaded && fs.existsSync(mp4Path)) {
        try {
          execFileSync('ffmpeg', ['-y', '-i', mp4Path, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wavPath], { stdio: 'ignore', timeout: 30000 })
          
          if (fs.existsSync(wavPath) && fs.statSync(wavPath).size > 1000) {
            const { WaveFile } = require('wavefile')
            const wavBuffer = fs.readFileSync(wavPath)
            const wav = new WaveFile(wavBuffer)
            wav.toBitDepth('32f')
            wav.toSampleRate(16000)
            let audioSamples = wav.getSamples()
            if (Array.isArray(audioSamples)) audioSamples = audioSamples[0]

            const transcriber = await getTranscriber()
            const whisperOutput = await transcriber(audioSamples, {
              return_timestamps: true,
              chunk_length_s: 30,
              stride_length_s: 5
            })

            if (whisperOutput && whisperOutput.text && whisperOutput.text.trim().length > 0) {
              fullSpokenText = whisperOutput.text.trim()

              if (whisperOutput.chunks && whisperOutput.chunks.length > 0) {
                speechSegments = whisperOutput.chunks.map((chunk: any) => {
                  const startSec = Math.floor(chunk.timestamp?.[0] || 0)
                  const timeStr = `${Math.floor(startSec / 60)}:${String(startSec % 60).padStart(2, '0')}`
                  return {
                    time: timeStr,
                    text: chunk.text.trim()
                  }
                }).filter((s: any) => s.text.length > 0)
              }
            }
          }
        } catch (whisperErr) {
          console.error('Whisper AI Transcription error:', whisperErr)
        }
      }
    }

    // Fallback: If no audio speech was detected or video audio is non-speech music, fallback to caption text
    if (!fullSpokenText || speechSegments.length === 0) {
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
      try { if (fs.existsSync(mp4Path)) fs.unlinkSync(mp4Path) } catch (e) { console.error('Error unlinking temp mp4:', e) }
    }
    if (wavPath) {
      try { if (fs.existsSync(wavPath)) fs.unlinkSync(wavPath) } catch (e) { console.error('Error unlinking temp wav:', e) }
    }
  }
}


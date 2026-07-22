'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { freeToolsList, ToolData } from '@/utils/toolsData'
import { ArrowLeft, ArrowRight, ChevronRight, X, Mail, Check, Shield, Copy, RefreshCw, Award, Plus, Trash, Play, Info, Edit, Sparkles, Send, TrendingUp, User, Percent, HelpCircle, CheckCircle, Smartphone, Download, Film, Layers, ChevronUp, ChevronDown, Trash2, Quote, ListChecks, MessageSquare, Type, Sliders, Eye, Image } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

interface ClientProps {
  toolSlug: string
  initialTool?: ToolData | null
}

export default function ToolDetailClient({ toolSlug, initialTool }: ClientProps) {
  const [tool, setTool] = useState<ToolData | null>(() => initialTool || freeToolsList.find(t => t.slug === toolSlug) || null)
  const [copied, setCopied] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  useEffect(() => {
    if (toolSlug && !tool) {
      const matched = freeToolsList.find(t => t.slug === toolSlug)
      setTool(matched || null)
    }
  }, [toolSlug, tool])

  // 18. Reel Downloader states
  const [reelUrl, setReelUrl] = useState('')
  const [reelQuality, setReelQuality] = useState<'1080p' | '720p'>('1080p')
  const [isExtractingReel, setIsExtractingReel] = useState(false)
  const [reelError, setReelError] = useState('')
  const [extractedReel, setExtractedReel] = useState<{
    url: string
    title: string
    author: string
    likes: string
    comments: string
    duration: string
    thumbnail: string
    videoUrl?: string
  } | null>(null)

  const handleExtractReel = async () => {
    if (!reelUrl.trim() || (!reelUrl.includes('instagram.com') && !reelUrl.includes('instagr.am'))) {
      setReelError('Please enter a valid Instagram Reel or Video URL (e.g. https://www.instagram.com/reel/...)')
      return
    }
    checkAndIncrementUsage(async () => {
      setReelError('')
      setIsExtractingReel(true)
      setExtractedReel(null)
      try {
        const res = await fetch('/api/download-reel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: reelUrl.trim() })
        })
        const data = await res.json()

        if (res.ok && data.success && data.videoUrl) {
          setExtractedReel({
            url: reelUrl.trim(),
            title: data.title || `Instagram Reel (${data.shortcode})`,
            author: data.author || '@instagram.user',
            likes: data.likes || '0',
            comments: data.comments || '0',
            duration: data.duration || '0:30',
            thumbnail: data.displayUrl || '',
            videoUrl: data.videoUrl
          })
        } else {
          setReelError(data.error || 'Failed to extract video media from Instagram. The account may be private or URL invalid.')
        }
      } catch (err) {
        setReelError('Failed to connect to Instagram extraction API. Please try again.')
      } finally {
        setIsExtractingReel(false)
      }
    })
  }

  const handleDownloadReel = (fileType: 'mp4' | 'jpg') => {
    if (!extractedReel) return
    const targetUrl = fileType === 'mp4' ? extractedReel.videoUrl : extractedReel.thumbnail
    if (!targetUrl) return

    const filename = `cacto_instagram_reel_${fileType === 'mp4' ? 'video' : 'cover'}.${fileType}`
    const proxyUrl = `/api/download-reel/proxy?url=${encodeURIComponent(targetUrl)}&filename=${encodeURIComponent(filename)}`
    
    setCopiedText(`Downloading ${fileType.toUpperCase()}...`)
    window.location.href = proxyUrl
    setTimeout(() => setCopiedText(null), 2500)
  }

  // 19. Reel Transcript Generator states
  const [transcriptUrl, setTranscriptUrl] = useState('')
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false)
  const [transcriptError, setTranscriptError] = useState('')
  const [transcriptData, setTranscriptData] = useState<{
    author: string
    title: string
    fullTranscript: string
    wordCount: number
    readingTime: string
    duration: string
    thumbnail: string
    segments: { time: string; text: string }[]
  } | null>(null)

  const handleGenerateTranscript = async () => {
    if (!transcriptUrl.trim() || (!transcriptUrl.includes('instagram.com') && !transcriptUrl.includes('instagr.am'))) {
      setTranscriptError('Please enter a valid Instagram Reel or Video link (e.g. https://www.instagram.com/reel/...)')
      return
    }
    checkAndIncrementUsage(async () => {
      setTranscriptError('')
      setIsGeneratingTranscript(true)
      setTranscriptData(null)
      try {
        const res = await fetch('/api/transcript-reel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: transcriptUrl.trim() })
        })
        const data = await res.json()

        if (res.ok && data.success) {
          setTranscriptData(data)
        } else {
          setTranscriptError(data.error || 'Failed to extract transcript. Account may be private or link invalid.')
        }
      } catch (err) {
        setTranscriptError('Network error connecting to transcript engine. Please try again.')
      } finally {
        setIsGeneratingTranscript(false)
      }
    })
  }

  const handleDownloadTranscriptTxt = () => {
    if (!transcriptData) return
    const content = `Instagram Reel Transcript - ${transcriptData.author}\nTitle: ${transcriptData.title}\nDuration: ${transcriptData.duration} | Words: ${transcriptData.wordCount}\n\n` +
      transcriptData.segments.map(s => `[${s.time}] ${s.text}`).join('\n\n')
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `cacto_reel_transcript_${transcriptData.author.replace('@', '')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
    setCopiedText('Downloaded .TXT')
    setTimeout(() => setCopiedText(null), 2000)
  }

  // 25. Photo Downloader states
  const [photoUrl, setPhotoUrl] = useState('')
  const [isExtractingPhoto, setIsExtractingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const [extractedPhotos, setExtractedPhotos] = useState<{
    photos: { url: string; width: number; height: number }[]
    author: string
    caption: string
    isProfile: boolean
    profilePicUrl?: string
  } | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const handleExtractPhoto = async () => {
    if (!photoUrl.trim() || (!photoUrl.includes('instagram.com') && !photoUrl.includes('instagr.am'))) {
      setPhotoError('Please enter a valid Instagram post or profile URL (e.g. https://www.instagram.com/p/... or https://www.instagram.com/username)')
      return
    }
    checkAndIncrementUsage(async () => {
      setPhotoError('')
      setIsExtractingPhoto(true)
      setExtractedPhotos(null)
      setActivePhotoIndex(0)
      try {
        const res = await fetch('/api/download-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: photoUrl.trim() })
        })
        const data = await res.json()

        if (res.ok && data.success) {
          setExtractedPhotos({
            photos: data.photos || [],
            author: data.author || '@instagram.user',
            caption: data.caption || '',
            isProfile: data.isProfile || false,
            profilePicUrl: data.profilePicUrl || ''
          })
        } else {
          setPhotoError(data.error || 'Failed to extract photos from Instagram. The account may be private or URL invalid.')
        }
      } catch (err) {
        setPhotoError('Failed to connect to Instagram photo extraction API. Please try again.')
      } finally {
        setIsExtractingPhoto(false)
      }
    })
  }

  const handleDownloadPhoto = (imageUrl: string, index: number) => {
    if (!imageUrl) return
    const filename = `cacto_instagram_photo_${index + 1}.jpg`
    const proxyUrl = `/api/download-photo/proxy?url=${encodeURIComponent(imageUrl)}&filename=${encodeURIComponent(filename)}`
    setCopiedText(`Downloading Photo ${index + 1}...`)
    window.location.href = proxyUrl
    setTimeout(() => setCopiedText(null), 2500)
  }

  // Waitlist & Usage Wall states
  const [generationCount, setGenerationCount] = useState<number>(0)
  const [isWaitlistUnlocked, setIsWaitlistUnlocked] = useState<boolean>(false)
  const [isUsageWallOpen, setIsUsageWallOpen] = useState<boolean>(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [usageEmail, setUsageEmail] = useState<string>('')
  const [usageModalStatus, setUsageModalStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [usageModalMessage, setUsageModalMessage] = useState<string>('')

  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

  // 1. Engagement Calculator states
  const [followers, setFollowers] = useState(12500)
  const [likes, setLikes] = useState(620)
  const [comments, setComments] = useState(72)
  const [saves, setSaves] = useState(85)
  const [shares, setShares] = useState(48)
  const [industryNiche, setIndustryNiche] = useState('Coaching')

  // 2. Caption Generator states
  const [capTopic, setCapTopic] = useState('My 3-step comment automation playbook')
  const [capTone, setCapTone] = useState('witty')
  const [capKeyword, setCapKeyword] = useState('PLAY')
  const [capOffer, setCapOffer] = useState('Free Lead Magnet Delivery Guide')

  // 3. Bio Generator states
  const [bioNiche, setBioNiche] = useState('Agency Owner')
  const [bioAudience, setBioAudience] = useState('ecommerce brands')
  const [bioValue, setBioValue] = useState('scale to €100k/month using comment checkouts')
  const [bioOffer, setBioOffer] = useState('Free Direct Payments Playbook PDF')

  // 4. CTR Calculator states
  const [ctrViews, setCtrViews] = useState(75000)
  const [ctrComments, setCtrComments] = useState(1800)
  const [ctrDMs, setCtrDMs] = useState(1720)
  const [ctrClicks, setCtrClicks] = useState(850)
  const [ctrSales, setCtrSales] = useState(42)

  // 5. Hook Generator states
  const [hookTopic, setHookTopic] = useState('automated Stripe sales')
  const [hookGoal, setHookGoal] = useState('FOMO')
  const [hookAudience, setHookAudience] = useState('content creators')

  // 6. Username Checker states
  const [checkUsername, setCheckUsername] = useState('alex_checkout')
  const [suffixPref, setSuffixPref] = useState('official')

  // 7. Hashtag Generator states
  const [hashtagKeyword, setHashtagKeyword] = useState('comment automation')
  const [hashtagLevel, setHashtagLevel] = useState('Medium')

  // 8. Character Counter states
  const [charText, setCharText] = useState('Write or paste your Reel caption copy here to validate Instagram feed limits, check hashtags counts, and optimize your keyword call-to-actions instantly...')

  // 9. CTA Generator states
  const [ctaKeyword, setCtaKeyword] = useState('NOTION')
  const [ctaOffer, setCtaOffer] = useState('free workspace database link')

  // 10. Click Value Estimator states
  const [estFollowers, setEstFollowers] = useState(45000)
  const [estCtr, setEstCtr] = useState(4.2)
  const [estConv, setEstConv] = useState(3.5)
  const [estPrice, setEstPrice] = useState(39)

  // 11. Line Breaker states
  const [lineText, setLineText] = useState('Hey creators!\n\nHere is a common spacing error.\n\nInstagram removes double empty paragraphs when publishing captions.\n\nUse this Spacing Tool to preserve breaks.')

  // 12. Script Outline states
  const [scriptTopic, setScriptTopic] = useState('How I scaled comment lead captures by 400%')
  const [scriptDuration, setScriptDuration] = useState('60s')
  const [scriptCtaKeyword, setScriptCtaKeyword] = useState('LEADS')

  // 13. Audit Checklist states
  const [auditFocus, setAuditFocus] = useState('Creator')
  const [checkedAuditItems, setCheckedAuditItems] = useState<number[]>([])

  // 14. Follower Growth Projector states
  const [currentFollowers, setCurrentFollowers] = useState(14200)
  const [dailyGrowth, setDailyGrowth] = useState(65)
  const [monthlyChurn, setMonthlyChurn] = useState(2.8)

  // 15. Lead Magnet Value Estimator states
  const [leadTraffic, setLeadTraffic] = useState(28000)
  const [leadOptin, setLeadOptin] = useState(14.5)
  const [leadVal, setLeadVal] = useState(8.50)

  // 16. Subject Line Optimizer states
  const [subjOffer, setSubjOffer] = useState('automated checkout template')
  const [subjBenefit, setSubjBenefit] = useState('double DM click-through rates')

  // 17. DM Previewer states
  const [dmText, setDmText] = useState('Thanks for commenting! 🙌 As promised, here is the direct checkout button to secure your Copy of the Cacto Pro Blueprint ⬇️')
  const [dmBtnText, setDmBtnText] = useState('Secure Checkout')
  const [dmBtnUrl, setDmBtnUrl] = useState('https://cacto.ai/checkout')

  // 20. Carousel Generator states
  const [carouselTopic, setCarouselTopic] = useState('5 Steps to Scale Lead Generation with Auto-DMs')
  const [carouselSlideCount, setCarouselSlideCount] = useState(5)
  const [carouselTheme, setCarouselTheme] = useState<'minimal' | 'dark' | 'bold'>('minimal')
  const [carouselCtaKeyword, setCarouselCtaKeyword] = useState('SCALE')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  useEffect(() => {
    if (toolSlug) {
      const matched = freeToolsList.find(t => t.slug === toolSlug)
      setTool(matched || null)
    }
    if (typeof window !== 'undefined') {
      const savedCount = parseInt(localStorage.getItem('cacto_tool_generations_count') || '0', 10)
      const savedUnlocked = localStorage.getItem('cacto_waitlist_unlocked') === 'true'
      setGenerationCount(isNaN(savedCount) ? 0 : savedCount)
      setIsWaitlistUnlocked(savedUnlocked)
    }
  }, [toolSlug])

  const checkAndIncrementUsage = (action?: () => void): boolean => {
    if (isWaitlistUnlocked) {
      if (action) action()
      return true
    }

    if (generationCount < 3) {
      const nextCount = generationCount + 1
      setGenerationCount(nextCount)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cacto_tool_generations_count', nextCount.toString())
      }
      if (action) action()
      return true
    }

    if (action) {
      setPendingAction(() => action)
    }
    setIsUsageWallOpen(true)
    return false
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setCopiedText(text)
    setTimeout(() => {
      setCopied(false)
      setCopiedText(null)
    }, 2000)
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!waitlistEmail.trim() || !waitlistEmail.includes('@')) {
      setWaitlistStatus('error')
      setWaitlistMessage('Please enter a valid email address.')
      return
    }

    setWaitlistStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail })
      })
      const data = await res.json()
      if (res.ok) {
        setWaitlistStatus('success')
        setWaitlistMessage(data.message || 'You have been successfully added to our waitlist!')
        setWaitlistEmail('')
        if (typeof window !== 'undefined') {
          localStorage.setItem('cacto_waitlist_unlocked', 'true')
        }
        setIsWaitlistUnlocked(true)
      } else {
        setWaitlistStatus('error')
        setWaitlistMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setWaitlistStatus('error')
      setWaitlistMessage('Failed to connect to the server. Please try again.')
    }
  }

  const handleUsageWallSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!usageEmail.trim() || !usageEmail.includes('@')) {
      setUsageModalStatus('error')
      setUsageModalMessage('Please enter a valid email address.')
      return
    }

    setUsageModalStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usageEmail.trim() })
      })
      const data = await res.json()
      if (res.ok) {
        setUsageModalStatus('success')
        if (typeof window !== 'undefined') {
          localStorage.setItem('cacto_waitlist_unlocked', 'true')
        }
        setIsWaitlistUnlocked(true)
        setIsUsageWallOpen(false)
        setUsageEmail('')
        setUsageModalStatus('idle')
        setUsageModalMessage('')

        if (pendingAction) {
          pendingAction()
          setPendingAction(null)
        }
      } else {
        setUsageModalStatus('error')
        setUsageModalMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setUsageModalStatus('error')
      setUsageModalMessage('Failed to connect to the server. Please try again.')
    }
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] flex flex-col justify-center items-center p-6 text-center">
        <h1 className="font-serif text-3xl font-black mb-4">Tool Not Found</h1>
        <p className="text-zinc-500 text-xs font-semibold mb-8">The requested growth tool could not be located.</p>
        <Link 
          href="/tools"
          className="px-6 py-3 rounded-full bg-[#1A1510] text-[#FAF6EE] border-2 border-[#1A1510] font-extrabold text-xs transition hover:opacity-90 shadow-md"
        >
          Back to Free Tools
        </Link>
      </div>
    )
  }

  // 1. Engagement Calculator Formula & Variables
  const parsedFollowers = Math.max(0, isNaN(followers) ? 0 : followers)
  const parsedLikes = Math.max(0, isNaN(likes) ? 0 : likes)
  const parsedComments = Math.max(0, isNaN(comments) ? 0 : comments)
  const parsedSaves = Math.max(0, isNaN(saves) ? 0 : saves)
  const parsedShares = Math.max(0, isNaN(shares) ? 0 : shares)
  const totalInteractions = parsedLikes + parsedComments + parsedSaves + parsedShares
  const engRate = parsedFollowers > 0 ? ((totalInteractions / parsedFollowers) * 100).toFixed(2) : '0.00'

  const industryBenchmarks: { [key: string]: number } = {
    Coaching: 4.8,
    Beauty: 3.2,
    ECommerce: 2.1,
    Tech: 2.8,
    Lifestyle: 3.6
  }
  const selectedBenchmark = industryBenchmarks[industryNiche] || 3.0
  const rateAssessment = Number(engRate) >= selectedBenchmark ? 'Above Average' : 'Below Average'
  const engagementSummaryText = `Instagram Engagement Rate: ${engRate}% (${rateAssessment} for ${industryNiche}, Benchmark: ${selectedBenchmark}%) | Followers: ${parsedFollowers.toLocaleString()}, Total Interactions: ${totalInteractions.toLocaleString()} (Likes: ${parsedLikes}, Comments: ${parsedComments}, Saves: ${parsedSaves}, Shares: ${parsedShares})`

  // 2. Caption Generator Formula
  const safeCapTopic = capTopic.trim() || 'My 3-step comment automation playbook'
  const safeCapKeyword = (capKeyword.trim() || 'PLAY').toUpperCase()
  const safeCapOffer = capOffer.trim() || 'Free Lead Magnet Delivery Guide'
  const capTonality = capTone === 'witty' 
    ? 'Witty & playful' 
    : capTone === 'friendly' 
      ? 'Warm & inviting' 
      : capTone === 'salesy' 
        ? 'Direct & sales-driven' 
        : 'Professional & analytical'
  const generatedCaption = `🔥 Stop losing leads to broken Link-in-Bios! \n\nIf you want access to my exact "${safeCapTopic}" strategy, you don't need to exit the feed and click random folders anymore. \n\nI built a compliant Cacto comment-to-DM system that drops the direct download link right in your inbox instantly. \n\n👇 COMMENT the keyword "${safeCapKeyword}" below and my automated system will drop the ${safeCapOffer} to you immediately!\n\n(${capTonality} copy. Lock in your spot now!)\n\n#socialgrowth #marketingautomation #creators #nocode`

  // 3. Bio Generator Formula
  const safeBioNiche = bioNiche.trim() || 'Agency Owner'
  const safeBioAudience = bioAudience.trim() || 'ecommerce brands'
  const safeBioValue = bioValue.trim() || 'scale to €100k/month using comment checkouts'
  const safeBioOffer = bioOffer.trim() || 'Free Direct Payments Playbook PDF'
  const generatedBios = [
    `⚡ I help ${safeBioAudience}\n🔥 ${safeBioValue}\n🎁 Claim your ${safeBioOffer} below! 👇`,
    `💡 Ex-Corporate Leader turns ${safeBioNiche}\n💪 Helping ${safeBioAudience} ${safeBioValue}\n⬇️ Get my ${safeBioOffer} instantly!`,
    `🎯 ${safeBioNiche} | Growth Specialist\n🔑 Helping you ${safeBioValue}\n📨 Comment or click below for the ${safeBioOffer} ⬇️`
  ]

  // 4. CTR Calculator Formula
  const parsedCtrViews = Math.max(0, isNaN(ctrViews) ? 0 : ctrViews)
  const parsedCtrComments = Math.max(0, isNaN(ctrComments) ? 0 : ctrComments)
  const parsedCtrDMs = Math.max(0, isNaN(ctrDMs) ? 0 : ctrDMs)
  const parsedCtrClicks = Math.max(0, isNaN(ctrClicks) ? 0 : ctrClicks)
  const parsedCtrSales = Math.max(0, isNaN(ctrSales) ? 0 : ctrSales)

  const commentRate = parsedCtrViews > 0 ? ((parsedCtrComments / parsedCtrViews) * 100).toFixed(1) : '0.0'
  const commentToDmCtr = parsedCtrComments > 0 ? ((parsedCtrDMs / parsedCtrComments) * 100).toFixed(0) : '0'
  const ctrRate = parsedCtrDMs > 0 ? ((parsedCtrClicks / parsedCtrDMs) * 100).toFixed(1) : '0.0'
  const salesConv = parsedCtrClicks > 0 ? ((parsedCtrSales / parsedCtrClicks) * 100).toFixed(1) : '0.0'
  const ctrSummaryText = `Auto-DM CTR Funnel Breakdown | Views: ${parsedCtrViews.toLocaleString()} ➔ Comment Rate: ${commentRate}% (${parsedCtrComments.toLocaleString()} comments) ➔ DM Delivery Rate: ${commentToDmCtr}% (${parsedCtrDMs.toLocaleString()} DMs) ➔ Link CTR: ${ctrRate}% (${parsedCtrClicks.toLocaleString()} clicks) ➔ Sales Conv: ${salesConv}% (${parsedCtrSales.toLocaleString()} sales)`

  // 5. Hook Idea Generator
  const safeHookTopic = hookTopic.trim() || 'automated Stripe sales'
  const safeHookAudience = hookAudience.trim() || 'content creators'
  const hookTemplates = {
    FOMO: [
      `"Only sending the ${safeHookTopic} access code to the next 50 ${safeHookAudience} who comment..."`,
      `"If you aren't automating checkouts for ${safeHookTopic} by Friday, you are paying double."`,
      `"The exact setup that got 1,200 leads for ${safeHookTopic} is closing in 2 hours."`,
      `"Don't read the caption unless you want to automate client outreach."`,
      `"This 5-minute Cacto workflow does the work of 2 assistants on autopilot."`
    ],
    Benefit: [
      `"How I automated ${safeHookTopic} to secure clients while sleeping..."`,
      `"The low-friction trick to scale lead magnets delivery for ${safeHookAudience}."`,
      `"Stop copying links manually. Build this keyword script in under 5 minutes."`,
      `"Why comment automation has a 5x higher click CTR than bio directories."`,
      `"The direct path to turn Instagram Reels traffic into Stripe payments."`
    ],
    Controversy: [
      `"Your Link-in-Bio directory is where warm sales go to die."`,
      `"Why manually messaging clients on social media is a waste of time."`,
      `"Stop telling scrollers to look at your profile bio page."`,
      `"Why Manychat is too complicated for solo creators."`,
      `"The truth about social media reach: you don't need more views, you need CTRs."`
    ]
  }
  const generatedHooks = hookTemplates[hookGoal as keyof typeof hookTemplates] || hookTemplates['FOMO']

  // 6. Username Checker Formula
  const safeCheckUsername = checkUsername.trim() || 'alex_checkout'
  const suggestedUsernames = [
    `${safeCheckUsername}_${suffixPref}`,
    `${safeCheckUsername}_hq`,
    `the_${safeCheckUsername}`,
    `real_${safeCheckUsername}`,
    `${safeCheckUsername}_hub`
  ]
  const nameScore = checkUsername.trim().length === 0 
    ? 'Enter Handle' 
    : checkUsername.trim().length > 30 
      ? 'Exceeds 30 Chars' 
      : checkUsername.trim().length < 12 
        ? 'High Searchability' 
        : 'Moderate Length'

  // 7. Hashtag Generator Formula
  const cleanHashKeyword = hashtagKeyword.toLowerCase().replace(/[^a-z0-9_]/g, '') || 'growth'
  const generatedHashtags = [
    `#${cleanHashKeyword}`, `#${cleanHashKeyword}tips`, `#${cleanHashKeyword}strategy`, `#${cleanHashKeyword}creator`,
    `#marketingautomation`, `#commentautomation`, `#creatorsstack`,
    `#nocodemarketing`, `#buildinpublic`, `#solocreator`, `#growthhacks`
  ]

  // 9. CTA Generator Formula
  const cleanCtaKeyword = ctaKeyword.trim().toUpperCase().replace(/\s+/g, '') || 'KEYWORD'
  const generatedCTAs = [
    `💬 Comment "${cleanCtaKeyword}" below and I'll DM you the link!`,
    `👇 Drop the word "${cleanCtaKeyword}" in the comments to get the ${ctaOffer} delivered instantly.`,
    `🚀 Want the ${ctaOffer}? Comment "${cleanCtaKeyword}" and check your inbox!`,
    `📬 Type "${cleanCtaKeyword}" in the comments and Cacto will DM you the template.`,
    `🔥 Comment "${cleanCtaKeyword}" right now to claim early access!`
  ]

  // 10. Click Value Estimator Formula
  const revenueEst = isNaN(estFollowers) || isNaN(estCtr) || isNaN(estConv) || isNaN(estPrice)
    ? '0'
    : (estFollowers * (estCtr / 100) * (estConv / 100) * estPrice).toFixed(0)

  // 11. Line Breaker Formula
  const formattedLineText = lineText
    .split('\n')
    .map(line => line.trimEnd() === '' ? '\u2800' : line.trimEnd())
    .join('\n')

  // 12. Script Outline
  const cleanScriptCtaKeyword = scriptCtaKeyword.trim().toUpperCase().replace(/\s+/g, '') || 'KEYWORD'
  const wordCountTarget = scriptDuration === '30s' ? '65 - 75 words (~130 wpm pace)' : scriptDuration === '90s' ? '200 - 225 words (~140 wpm pace)' : '130 - 150 words (~140 wpm pace)'
  const scriptTimestamps = scriptDuration === '30s' 
    ? { hook: '0:00 - 0:03', prob: '0:03 - 0:08', core: '0:08 - 0:22', cta: '0:22 - 0:30' }
    : scriptDuration === '90s'
      ? { hook: '0:00 - 0:08', prob: '0:08 - 0:20', core: '0:20 - 1:10', cta: '1:10 - 1:30' }
      : { hook: '0:00 - 0:05', prob: '0:05 - 0:15', core: '0:15 - 0:45', cta: '0:45 - 0:60' }
  const generatedScript = `⏱ TARGET DURATION: ${scriptDuration} | OPTIMAL SCRIPT LENGTH: ${wordCountTarget}\n\n[${scriptTimestamps.hook}] VIRAL HOOK:\n"Here is how I automated "${scriptTopic}" to scale client signups..."\n\n[${scriptTimestamps.prob}] PROBLEM COGNITION:\nExplain how typing links manually is slow and leads to visitor drop-off.\n\n[${scriptTimestamps.core}] SYSTEM WALKTHROUGH:\nShow how setting up a keyword rule auto-delivers links to DMs instantly.\n\n[${scriptTimestamps.cta}] CALL TO ACTION INTENT:\n"Comment "${cleanScriptCtaKeyword}" below and my system will DM you the link!"`

  // 14. Follower Growth Projector
  const parsedCurrentFollowers = isNaN(currentFollowers) ? 0 : Math.max(0, currentFollowers)
  const parsedDailyGrowth = isNaN(dailyGrowth) ? 0 : Math.max(0, dailyGrowth)
  const parsedMonthlyChurn = isNaN(monthlyChurn) ? 0 : Math.max(0, Math.min(100, monthlyChurn))

  const calculateProjectedFollowers = (months: number) => {
    let followers = parsedCurrentFollowers
    const monthlyAddition = parsedDailyGrowth * 30
    const churnFactor = 1 - (parsedMonthlyChurn / 100)
    for (let i = 0; i < months; i++) {
      followers = Math.max(0, (followers + monthlyAddition) * churnFactor)
    }
    return Math.round(followers)
  }

  const thirtyDaysProj = calculateProjectedFollowers(1)
  const ninetyDaysProj = calculateProjectedFollowers(3)
  const annualProj = calculateProjectedFollowers(12)

  // 15. Lead Magnet Value Estimator Formula
  const parsedTraffic = isNaN(leadTraffic) ? 0 : Math.max(0, leadTraffic)
  const parsedOptin = isNaN(leadOptin) ? 0 : Math.max(0, Math.min(100, leadOptin))
  const parsedVal = isNaN(leadVal) ? 0 : Math.max(0, leadVal)
  const monthlyLeads = (parsedTraffic * (parsedOptin / 100)).toFixed(0)
  const monthlyLeadVal = (Number(monthlyLeads) * parsedVal).toFixed(0)

  // 16. Subject Line Optimizer
  const safeSubjOffer = subjOffer.trim() || 'lead magnet'
  const safeSubjBenefit = subjBenefit.trim() || 'boost conversions'
  const generatedSubjects = [
    `🔒 [Locked] Your ${safeSubjOffer} is inside`,
    `Here is the ${safeSubjOffer} to ${safeSubjBenefit} (download link)`,
    `Did you miss this? ${safeSubjOffer} details`,
    `Your ${safeSubjOffer} guide is ready`,
    `3 steps to ${safeSubjBenefit} today`
  ]

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      {/* Navbar Header */}
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-12 md:pt-32 space-y-12">
        
        {/* Back Link */}
        <Link 
          href="/tools"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Free Tools
        </Link>

        {/* Header content */}
        <header className="space-y-4 text-left">
          <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-widest bg-[#E6F4EA] border border-[#16A34A]/10 px-3 py-1 rounded-md inline-block">
            {tool.category} Tool
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-tight text-[#1A1510]">
            {tool.title}
          </h1>
          <p className="text-zinc-555 text-xs font-bold leading-relaxed max-w-2xl">
            {tool.description}
          </p>
        </header>

        {/* Quick Answer Summary Block */}
        <section className="p-6 rounded-[24px] bg-[#E6F4EA] border-2 border-[#1A1510] shadow-[5px_6px_0_#1A1510] space-y-4 text-left">
          <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Quick Answer & Summary</span>
          </div>
          <p className="text-xs md:text-sm font-bold text-zinc-900 leading-relaxed">
            Cacto's <strong>{tool.title}</strong> is a free interactive utility designed for Instagram creators and digital marketers to streamline content generation, calculate key engagement metrics, and maximize DM lead conversion with zero friction or sign-up required.
          </p>
          {tool.steps && tool.steps.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {tool.steps.slice(0, 3).map((s, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-white border border-[#1A1510] text-[11px] font-bold text-zinc-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#16A34A] text-white text-[9px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                  <span><strong>{s.title}:</strong> {s.desc}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Dynamic Interactive Rebuilt Tools */}
        <section 
          className="p-8 md:p-10 rounded-[28px] bg-white border-2 border-[#1A1510] text-left space-y-8"
          style={{ boxShadow: '6px 8px 0 #1A1510' }}
        >
          <h2 className="text-xs font-black uppercase text-[#16A34A] tracking-wider">
            How do you calculate metrics using the interactive {tool.title} workspace?
          </h2>

          {/* TOOL 1: Engagement Calculator */}
          {toolSlug === 'engagement-calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Followers Count</label>
                  <input 
                    type="number" 
                    value={followers} 
                    onChange={(e) => setFollowers(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Industry Niche</label>
                  <select 
                    value={industryNiche} 
                    onChange={(e) => setIndustryNiche(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="Coaching">Coaching / Education (Benchmark: 4.8%)</option>
                    <option value="Beauty">Beauty / Fashion (Benchmark: 3.2%)</option>
                    <option value="ECommerce">E-Commerce (Benchmark: 2.1%)</option>
                    <option value="Tech">Tech / Business (Benchmark: 2.8%)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Likes</label>
                  <input type="number" value={likes} onChange={(e) => setLikes(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Comments</label>
                  <input type="number" value={comments} onChange={(e) => setComments(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Saves</label>
                  <input type="number" value={saves} onChange={(e) => setSaves(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Shares</label>
                  <input type="number" value={shares} onChange={(e) => setShares(Number(e.target.value))} className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 text-center space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Calculated Engagement Rate (ER)</p>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(engagementSummaryText))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === engagementSummaryText ? 'Copied' : 'Copy Results'}
                  </button>
                </div>
                <p className="text-5xl font-serif font-black text-[#16A34A]">{engRate}%</p>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {rateAssessment}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-zinc-200 text-zinc-700">
                    Niche Average: {selectedBenchmark}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 2: Caption Generator */}
          {toolSlug === 'caption-generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Reel Topic / Focus</label>
                  <input 
                    type="text" 
                    value={capTopic} 
                    onChange={(e) => setCapTopic(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. My 3-step comment automation playbook"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Trigger Keyword</label>
                  <input 
                    type="text" 
                    value={capKeyword} 
                    onChange={(e) => setCapKeyword(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold uppercase"
                    placeholder="e.g. PLAY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Offer / Lead Magnet Asset</label>
                  <input 
                    type="text" 
                    value={capOffer} 
                    onChange={(e) => setCapOffer(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. Free Lead Magnet Delivery Guide"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Caption Tone & Style</label>
                  <select 
                    value={capTone} 
                    onChange={(e) => setCapTone(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="witty">Witty & Playful</option>
                    <option value="friendly">Warm & Inviting</option>
                    <option value="salesy">Direct & Sales-Driven</option>
                    <option value="analytical">Professional & Analytical</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Formatted Reel Caption</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(generatedCaption))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === generatedCaption ? 'Copied' : 'Copy Caption'}
                  </button>
                </div>
                <pre className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-700 max-h-72 overflow-y-auto">
                  {generatedCaption}
                </pre>
              </div>
            </div>
          )}

          {/* TOOL 3: Bio Generator */}
          {toolSlug === 'bio-generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Your Role / Niche</label>
                  <input 
                    type="text" 
                    value={bioNiche} 
                    onChange={(e) => setBioNiche(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Target Audience</label>
                  <input 
                    type="text" 
                    value={bioAudience} 
                    onChange={(e) => setBioAudience(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Main Value Proposition</label>
                  <input 
                    type="text" 
                    value={bioValue} 
                    onChange={(e) => setBioValue(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Lead Magnet / Free Resource</label>
                  <input 
                    type="text" 
                    value={bioOffer} 
                    onChange={(e) => setBioOffer(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">High-Converting Bio Layouts (3 Options)</span>
                <div className="grid grid-cols-1 gap-4">
                  {generatedBios.map((bioOption, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2">
                        <span className="text-[10px] font-extrabold uppercase text-[#16A34A]">Option 0{idx + 1}</span>
                        <button 
                          onClick={() => checkAndIncrementUsage(() => copyToClipboard(bioOption))}
                          className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedText === bioOption ? 'Copied' : 'Copy Bio'}
                        </button>
                      </div>
                      <pre className="text-xs font-semibold text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {bioOption}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 4: Auto-DM CTR Calculator */}
          {toolSlug === 'ctr-calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Reel / Post Views</label>
                  <input 
                    type="number" 
                    value={ctrViews} 
                    onChange={(e) => setCtrViews(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Comment Triggers</label>
                  <input 
                    type="number" 
                    value={ctrComments} 
                    onChange={(e) => setCtrComments(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Auto DMs Delivered</label>
                  <input 
                    type="number" 
                    value={ctrDMs} 
                    onChange={(e) => setCtrDMs(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Link Clicks in DM</label>
                  <input 
                    type="number" 
                    value={ctrClicks} 
                    onChange={(e) => setCtrClicks(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Sales / Conversions Completed</label>
                  <input 
                    type="number" 
                    value={ctrSales} 
                    onChange={(e) => setCtrSales(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Conversion Funnel Breakdown</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(ctrSummaryText))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === ctrSummaryText ? 'Copied' : 'Copy Funnel Metrics'}
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                    <p className="text-[10px] text-zinc-400 font-black uppercase">Comment Rate</p>
                    <p className="text-2xl font-serif font-black text-[#1A1510]">{commentRate}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                    <p className="text-[10px] text-zinc-400 font-black uppercase">Comment ➔ DM Delivery</p>
                    <p className="text-2xl font-serif font-black text-[#16A34A]">{commentToDmCtr}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                    <p className="text-[10px] text-zinc-400 font-black uppercase">DM Link CTR</p>
                    <p className="text-2xl font-serif font-black text-[#1A1510]">{ctrRate}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                    <p className="text-[10px] text-zinc-400 font-black uppercase">Sales Conv Rate</p>
                    <p className="text-2xl font-serif font-black text-[#16A34A]">{salesConv}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 5: Hook Idea Generator */}
          {toolSlug === 'hook-generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Video Topic / Offer</label>
                  <input 
                    type="text" 
                    value={hookTopic} 
                    onChange={(e) => setHookTopic(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Target Audience</label>
                  <input 
                    type="text" 
                    value={hookAudience} 
                    onChange={(e) => setHookAudience(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Hook Angle / Goal</label>
                  <select 
                    value={hookGoal} 
                    onChange={(e) => setHookGoal(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="FOMO">Urgency & FOMO</option>
                    <option value="Benefit">Clear Direct Benefit</option>
                    <option value="Controversy">Contrarian & Mystery</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Generated Video Hooks (5 Variations)</span>
                <div className="space-y-3">
                  {generatedHooks.map((hk, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex justify-between items-center gap-4">
                      <p className="text-xs font-bold text-zinc-800 leading-snug">{hk}</p>
                      <button 
                        onClick={() => checkAndIncrementUsage(() => copyToClipboard(hk))}
                        className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] shrink-0 transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedText === hk ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 6: Username Checker */}
          {toolSlug === 'username-checker' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Base Desired Handle</label>
                  <input 
                    type="text" 
                    value={checkUsername} 
                    onChange={(e) => setCheckUsername(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ''))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. alex_checkout"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Suffix Preference</label>
                  <select 
                    value={suffixPref} 
                    onChange={(e) => setSuffixPref(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="official">_official</option>
                    <option value="hq">_hq</option>
                    <option value="growth">_growth</option>
                    <option value="app">_app</option>
                    <option value="hub">_hub</option>
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-black uppercase">Searchability Assessment</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                    {nameScore}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Recommended Available Handle Variations</span>
                  <div className="flex flex-wrap gap-2">
                    {suggestedUsernames.map((u, i) => (
                      <button 
                        key={i}
                        onClick={() => checkAndIncrementUsage(() => copyToClipboard(`@${u}`))}
                        className="px-3.5 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-extrabold text-[#1A1510] hover:border-[#16A34A] hover:text-[#16A34A] transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{copiedText === `@${u}` ? 'Copied!' : `@${u}`}</span>
                        <Copy className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 7: Hashtag Generator */}
          {toolSlug === 'hashtag-generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Primary Keyword / Focus Phrase</label>
                  <input 
                    type="text" 
                    value={hashtagKeyword} 
                    onChange={(e) => setHashtagKeyword(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. comment automation"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Competition Volume</label>
                  <select 
                    value={hashtagLevel} 
                    onChange={(e) => setHashtagLevel(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="Low">Low Competition (10k - 100k posts)</option>
                    <option value="Medium">Medium Niche (100k - 1M posts)</option>
                    <option value="High">High Reach (1M+ posts)</option>
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Structured Hashtag Set (11 Tags)</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(generatedHashtags.join(' ')))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === generatedHashtags.join(' ') ? 'Copied Set' : 'Copy All 11 Tags'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generatedHashtags.map((ht, i) => (
                    <button 
                      key={i}
                      onClick={() => checkAndIncrementUsage(() => copyToClipboard(ht))}
                      className="px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-[#16A34A] hover:bg-emerald-50 hover:border-[#16A34A] transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>{ht}</span>
                      <Copy className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 8: Character & Caption Length Counter */}
          {(toolSlug === 'char-counter' || toolSlug === 'character-counter') && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Caption Text Draft</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => checkAndIncrementUsage(() => {
                        const formatted = charText.split('\n').map(l => l.trimEnd() === '' ? '\u2800' : l.trimEnd()).join('\n')
                        setCharText(formatted)
                        copyToClipboard(formatted)
                      })}
                      className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Format Line Breaks & Copy
                    </button>
                    <button 
                      onClick={() => checkAndIncrementUsage(() => copyToClipboard(charText))}
                      className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedText === charText ? 'Copied' : 'Copy Text'}
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={6}
                  value={charText}
                  onChange={(e) => setCharText(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-[#1A1510] outline-none text-xs font-medium leading-relaxed bg-white"
                  placeholder="Paste or type your caption copy here..."
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">Characters</p>
                  <p className={`text-2xl font-serif font-black ${charText.length > 2200 ? 'text-rose-600' : 'text-[#16A34A]'}`}>
                    {charText.length} <span className="text-xs font-sans text-zinc-400 font-bold">/ 2,200</span>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">Words</p>
                  <p className="text-2xl font-serif font-black text-[#1A1510]">
                    {charText.trim() ? charText.trim().split(/\s+/).length : 0}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">Hashtags</p>
                  <p className={`text-2xl font-serif font-black ${(charText.match(/#/g) || []).length > 30 ? 'text-rose-600' : 'text-[#1A1510]'}`}>
                    {(charText.match(/#/g) || []).length} <span className="text-xs font-sans text-zinc-400 font-bold">/ 30</span>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">Links Detected</p>
                  <p className="text-2xl font-serif font-black text-[#1A1510]">
                    {(charText.match(/https?:\/\//g) || []).length}
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                charText.length > 125 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <Info className="w-4 h-4 shrink-0" />
                <span>
                  {charText.length > 125 
                    ? 'Note: Caption exceeds 125 characters and will be truncated behind the "More" button on mobile feeds.' 
                    : 'Great job! Hook copy fits before the 125-character mobile feed fold.'}
                </span>
              </div>
            </div>
          )}

          {/* TOOL 9: Call-to-Action (CTA) Generator */}
          {toolSlug === 'cta-generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Trigger Keyword</label>
                  <input 
                    type="text" 
                    value={ctaKeyword} 
                    onChange={(e) => setCtaKeyword(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold uppercase"
                    placeholder="e.g. NOTION"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Offer / Resource Name</label>
                  <input 
                    type="text" 
                    value={ctaOffer} 
                    onChange={(e) => setCtaOffer(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. free workspace database link"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">High-Converting Call-To-Action Lines (5 Options)</span>
                <div className="space-y-3">
                  {generatedCTAs.map((cta, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex justify-between items-center gap-4">
                      <p className="text-xs font-bold text-zinc-800 leading-snug">{cta}</p>
                      <button 
                        onClick={() => checkAndIncrementUsage(() => copyToClipboard(cta))}
                        className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] shrink-0 transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedText === cta ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 10: Link-in-Bio Click Value Estimator */}
          {toolSlug === 'click-value-estimator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Total Followers</label>
                  <input 
                    type="number" 
                    value={estFollowers} 
                    onChange={(e) => setEstFollowers(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Bio Click-Through Rate (CTR %)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={estCtr} 
                    onChange={(e) => setEstCtr(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Landing Page Conv Rate %</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={estConv} 
                    onChange={(e) => setEstConv(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Average Product Price ($)</label>
                  <input 
                    type="number" 
                    value={estPrice} 
                    onChange={(e) => setEstPrice(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 text-center space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Projected Monthly Bio Revenue</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(
                      `Link-in-Bio Revenue Projection Report:\n- Followers: ${estFollowers.toLocaleString()}\n- Bio CTR: ${estCtr}%\n- Estimated Monthly Clicks: ${Math.round(estFollowers * (estCtr / 100)).toLocaleString()}\n- Landing Page Conv Rate: ${estConv}%\n- Average Order Value: $${estPrice}\n- Projected Monthly Bio Revenue: $${Number(revenueEst).toLocaleString()}`
                    ))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText?.includes('Revenue Projection') ? 'Copied Report' : 'Copy Report'}
                  </button>
                </div>
                <p className="text-5xl font-serif font-black text-[#16A34A]">${Number(revenueEst).toLocaleString()}</p>
                <p className="text-xs font-semibold text-zinc-500">
                  Based on {estFollowers.toLocaleString()} followers generating ~{Math.round(estFollowers * (estCtr / 100))} monthly bio clicks.
                </p>
              </div>
            </div>
          )}

          {/* TOOL 11: Comment Formatting & Line Breaker */}
          {toolSlug === 'line-breaker' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Raw Caption Copy</label>
                <textarea 
                  rows={5}
                  value={lineText}
                  onChange={(e) => setLineText(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-[#1A1510] outline-none text-xs font-medium leading-relaxed bg-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Clean Formatted Output (Preserves Blank Lines)</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(formattedLineText))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === formattedLineText ? 'Copied' : 'Copy Formatted Caption'}
                  </button>
                </div>
                <pre className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-700 max-h-64 overflow-y-auto">
                  {formattedLineText}
                </pre>
              </div>
            </div>
          )}

          {/* TOOL 12: Reels Script Outline Creator */}
          {toolSlug === 'script-outline' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Reel Topic / Title</label>
                  <input 
                    type="text" 
                    value={scriptTopic} 
                    onChange={(e) => setScriptTopic(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Duration Target</label>
                  <select 
                    value={scriptDuration} 
                    onChange={(e) => setScriptDuration(e.target.value)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="30s">30 Seconds Short (~70 words)</option>
                    <option value="60s">60 Seconds Full (~140 words)</option>
                    <option value="90s">90 Seconds In-Depth (~210 words)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Trigger Keyword</label>
                  <input 
                    type="text" 
                    value={scriptCtaKeyword} 
                    onChange={(e) => setScriptCtaKeyword(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold uppercase"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Structured Script Breakdown</span>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(generatedScript))}
                    className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedText === generatedScript ? 'Copied' : 'Copy Script'}
                  </button>
                </div>
                <pre className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-700 max-h-80 overflow-y-auto">
                  {generatedScript}
                </pre>
              </div>
            </div>
          )}

          {/* TOOL 13: Social Media Audit Checklist Generator */}
          {toolSlug === 'audit-checklist' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Account Category</label>
                <select 
                  value={auditFocus} 
                  onChange={(e) => {
                    setAuditFocus(e.target.value)
                    setCheckedAuditItems([])
                  }} 
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                >
                  <option value="Creator">Content Creator / Influencer</option>
                  <option value="ECommerce">E-Commerce & Digital Products</option>
                  <option value="Agency">Agency & B2B Services</option>
                  <option value="Coach">Coach & Educator</option>
                </select>
              </div>

              {(() => {
                const auditItemsMap: Record<string, string[]> = {
                  Creator: [
                    'Is your handle clean without excessive numbers or underscores?',
                    'Is your target keyword trigger clear in the bio description?',
                    'Are your top 3 highest converting Reels pinned to profile top?',
                    'Have you set up automated DM response delivery for your lead magnet?',
                    'Have you rotated 3+ comment variations for anti-spam safety?'
                  ],
                  ECommerce: [
                    'Does your bio link point directly to instant checkout or catalog?',
                    'Are product customer review videos saved in featured Highlights?',
                    'Is comment-to-discount code DM automation active on product Reels?',
                    'Are post graphics rendered in high contrast mobile-friendly font sizes?',
                    'Do caption calls-to-action focus on a single keyword trigger?'
                  ],
                  Agency: [
                    'Does your bio state your exact target niche and outcome benefit?',
                    'Do you feature client case studies in pinned post slot #1?',
                    'Is instant audit booking configured in your automated DM flow?',
                    'Are your Reel scripts structured under 60 seconds with clear hooks?',
                    'Is your monthly follower retention and engagement rate above 3.5%?'
                  ],
                  Coach: [
                    'Is your main lead magnet (PDF/Notion) delivered via instant DM trigger?',
                    'Does your Name field include searchable industry keywords?',
                    'Are student testimonials highlighted in profile Stories?',
                    'Do carousel slides end with a single keyword CTA on final slide?',
                    'Is your bio text formatted with clean line breaks and zero clutter?'
                  ]
                }
                const currentItems = auditItemsMap[auditFocus] || auditItemsMap['Creator']
                const completedCount = checkedAuditItems.length
                const pct = Math.round((completedCount / currentItems.length) * 100)

                return (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-400 font-black uppercase">Audit Completion</span>
                      <span className="text-xs font-extrabold text-[#16A34A]">{completedCount} / {currentItems.length} Done ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#16A34A] rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="space-y-3 pt-2">
                      {currentItems.map((item, idx) => {
                        const isChecked = checkedAuditItems.includes(idx)
                        return (
                          <label 
                            key={idx} 
                            className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 cursor-pointer transition ${
                              isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                setCheckedAuditItems(prev => 
                                  prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                                )
                              }}
                              className="w-4 h-4 accent-[#16A34A] rounded"
                            />
                            <span>{item}</span>
                          </label>
                        )
                      })}
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          const summary = `Social Media Audit Checklist (${auditFocus}):\nCompleted ${completedCount}/${currentItems.length} items (${pct}%)\n\n` +
                            currentItems.map((item, i) => `${checkedAuditItems.includes(i) ? '✅' : '⬜'} ${item}`).join('\n')
                          checkAndIncrementUsage(() => copyToClipboard(summary))
                        }}
                        className="py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#16A34A]" />
                        {copiedText?.startsWith('Social Media Audit Checklist') ? 'Copied Audit Summary!' : 'Copy Audit Summary'}
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* TOOL 14: Follower Growth Projector */}
          {(toolSlug === 'growth-projector' || toolSlug === 'follower-growth-projector') && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Current Followers</label>
                  <input 
                    type="number" 
                    value={currentFollowers} 
                    onChange={(e) => setCurrentFollowers(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Net Daily Growth (Followers/Day)</label>
                  <input 
                    type="number" 
                    value={dailyGrowth} 
                    onChange={(e) => setDailyGrowth(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Monthly Churn %</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={monthlyChurn} 
                    onChange={(e) => setMonthlyChurn(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">30-Day Milestone</p>
                  <p className="text-3xl font-serif font-black text-[#1A1510]">{thirtyDaysProj.toLocaleString()}</p>
                  <p className="text-[10px] font-extrabold text-[#16A34A]">+{Math.max(0, thirtyDaysProj - parsedCurrentFollowers).toLocaleString()} Followers</p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">90-Day Milestone</p>
                  <p className="text-3xl font-serif font-black text-[#1A1510]">{ninetyDaysProj.toLocaleString()}</p>
                  <p className="text-[10px] font-extrabold text-[#16A34A]">+{Math.max(0, ninetyDaysProj - parsedCurrentFollowers).toLocaleString()} Followers</p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
                  <p className="text-[10px] text-zinc-400 font-black uppercase">365-Day Milestone</p>
                  <p className="text-3xl font-serif font-black text-[#16A34A]">{annualProj.toLocaleString()}</p>
                  <p className="text-[10px] font-extrabold text-[#16A34A]">+{Math.max(0, annualProj - parsedCurrentFollowers).toLocaleString()} Followers</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    const text = `Follower Growth Projections:\nCurrent: ${parsedCurrentFollowers.toLocaleString()} followers\nDaily Growth: +${parsedDailyGrowth} followers/day | Churn: ${parsedMonthlyChurn}%\n\n30-Day Target: ${thirtyDaysProj.toLocaleString()} (+${Math.max(0, thirtyDaysProj - parsedCurrentFollowers).toLocaleString()})\n90-Day Target: ${ninetyDaysProj.toLocaleString()} (+${Math.max(0, ninetyDaysProj - parsedCurrentFollowers).toLocaleString()})\n365-Day Target: ${annualProj.toLocaleString()} (+${Math.max(0, annualProj - parsedCurrentFollowers).toLocaleString()})`
                    checkAndIncrementUsage(() => copyToClipboard(text))
                  }}
                  className="py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                >
                  <Copy className="w-3.5 h-3.5 text-[#16A34A]" />
                  {copiedText?.startsWith('Follower Growth Projections:') ? 'Copied Projections!' : 'Copy Growth Projections'}
                </button>
              </div>
            </div>
          )}

          {/* TOOL 15: Lead Magnet Value Estimator */}
          {(toolSlug === 'lead-value-estimator' || toolSlug === 'lead-magnet-value-estimator') && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Monthly Reel & Profile Traffic</label>
                  <input 
                    type="number" 
                    value={leadTraffic} 
                    onChange={(e) => setLeadTraffic(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Opt-In Conversion Rate %</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={leadOptin} 
                    onChange={(e) => setLeadOptin(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Average Value Per Lead ($)</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={leadVal} 
                    onChange={(e) => setLeadVal(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-2">
                  <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Projected Monthly Leads</p>
                  <p className="text-4xl font-serif font-black text-[#1A1510]">{Number(monthlyLeads).toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-2">
                  <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Pipeline Monthly Value ($)</p>
                  <p className="text-4xl font-serif font-black text-[#16A34A]">${Number(monthlyLeadVal).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    const text = `Lead Magnet Value Projections:\nMonthly Traffic: ${parsedTraffic.toLocaleString()} visitors\nOpt-In Rate: ${parsedOptin}%\nAvg Lead Value: $${parsedVal}\n\nProjected Monthly Leads: ${Number(monthlyLeads).toLocaleString()}\nPipeline Monthly Value: $${Number(monthlyLeadVal).toLocaleString()}`
                    checkAndIncrementUsage(() => copyToClipboard(text))
                  }}
                  className="py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                >
                  <Copy className="w-3.5 h-3.5 text-[#16A34A]" />
                  {copiedText?.startsWith('Lead Magnet Value Projections:') ? 'Copied Report!' : 'Copy Lead Value Projection'}
                </button>
              </div>
            </div>
          )}

          {/* TOOL 16: Email Subject Line Optimizer */}
          {toolSlug === 'subject-line-optimizer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Lead Magnet / Asset Name</label>
                  <input 
                    type="text" 
                    value={subjOffer} 
                    onChange={(e) => setSubjOffer(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. automated checkout template"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Core Benefit / Outcome</label>
                  <input 
                    type="text" 
                    value={subjBenefit} 
                    onChange={(e) => setSubjBenefit(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                    placeholder="e.g. double DM click-through rates"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">High Open-Rate Subject Lines (5 Variations)</span>
                <div className="space-y-3">
                  {generatedSubjects.map((subj, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex justify-between items-center gap-4">
                      <p className="text-xs font-bold text-zinc-800 leading-snug">{subj}</p>
                      <button 
                        onClick={() => checkAndIncrementUsage(() => copyToClipboard(subj))}
                        className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] shrink-0 transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedText === subj ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 17: DM Copy Editor & Previewer */}
          {toolSlug === 'dm-previewer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Automated DM Message Text</label>
                  <textarea 
                    rows={3}
                    value={dmText}
                    onChange={(e) => setDmText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-medium leading-relaxed bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-[#1A1510]/50 font-extrabold uppercase tracking-wider block">CTA Button Label</label>
                  <input 
                    type="text" 
                    value={dmBtnText} 
                    onChange={(e) => setDmBtnText(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Destination URL</label>
                  <input 
                    type="text" 
                    value={dmBtnUrl} 
                    onChange={(e) => setDmBtnUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
              </div>

              {/* Smartphone Mockup */}
              <div className="max-w-sm mx-auto p-4 rounded-3xl border-2 border-[#1A1510] bg-white shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center">🌵</div>
                    <div>
                      <p className="text-xs font-black text-zinc-900 leading-tight">cacto_bot</p>
                      <p className="text-[9px] text-[#16A34A] font-bold">Active now</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(dmText))}
                    className="text-[11px] font-extrabold text-[#16A34A] hover:underline cursor-pointer border-none bg-transparent"
                  >
                    {copiedText === dmText ? 'Copied' : 'Copy Message'}
                  </button>
                </div>

                <div className="space-y-2 py-2">
                  <div className="p-3.5 rounded-2xl bg-zinc-100 text-xs font-medium text-zinc-800 leading-relaxed max-w-[85%] whitespace-pre-wrap break-words">
                    {dmText || 'Type your message above...'}
                  </div>
                  {dmBtnText && (
                    <div className="max-w-[85%]">
                      <a 
                        href={!dmBtnUrl ? '#' : (dmBtnUrl.startsWith('http://') || dmBtnUrl.startsWith('https://') ? dmBtnUrl : `https://${dmBtnUrl}`)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="block w-full py-2.5 px-4 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs text-center no-underline hover:bg-[#15803D] transition shadow-sm"
                      >
                        {dmBtnText} ➔
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 18: Instagram Reel Downloader */}
          {toolSlug === 'reel-downloader' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Instagram Reel Link URL</label>
                  <input 
                    type="url" 
                    value={reelUrl} 
                    onChange={(e) => setReelUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/..."
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Resolution Quality</label>
                  <select 
                    value={reelQuality} 
                    onChange={(e) => setReelQuality(e.target.value as any)} 
                    className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
                  >
                    <option value="1080p">1080p HD (Original)</option>
                    <option value="720p">720p Compressed</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleExtractReel}
                disabled={isExtractingReel}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#16A34A] text-white font-extrabold text-xs md:text-sm hover:bg-[#15803D] transition shadow-[4px_4px_0_#1A1510] cursor-pointer border-2 border-[#1A1510] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isExtractingReel ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Fetching Media Streams...
                  </span>
                ) : (
                  <span>Extract HD Reel Media ⚡</span>
                )}
              </button>

              {reelError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                  {reelError}
                </p>
              )}

              {extractedReel && (
                <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {extractedReel.thumbnail && (
                      <img 
                        src={extractedReel.thumbnail} 
                        alt="Reel Thumbnail" 
                        className="w-24 h-32 rounded-xl object-cover border border-zinc-300 shrink-0" 
                      />
                    )}
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <span className="text-[10px] font-black uppercase text-[#16A34A]">{extractedReel.author}</span>
                      <p className="text-xs font-bold text-zinc-900 leading-snug">{extractedReel.title}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-[11px] font-semibold text-zinc-500">
                        <span>❤️ {extractedReel.likes} Likes</span>
                        <span>💬 {extractedReel.comments} Comments</span>
                        <span>⏱️ {extractedReel.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => handleDownloadReel('mp4')}
                      className="py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                    >
                      <Download className="w-4 h-4 text-[#16A34A]" /> Download MP4 Video (HD)
                    </button>
                    <button 
                      onClick={() => handleDownloadReel('jpg')}
                      className="py-3 px-4 rounded-xl bg-white border-2 border-[#1A1510] text-[#1A1510] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-zinc-100 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#16A34A]" /> Download Cover Image (.JPG)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 19: Instagram Reel Transcript Generator */}
          {toolSlug === 'reel-transcript' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Instagram Reel Link URL</label>
                <input 
                  type="url" 
                  value={transcriptUrl} 
                  onChange={(e) => setTranscriptUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                />
              </div>

              <button 
                onClick={handleGenerateTranscript}
                disabled={isGeneratingTranscript}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#16A34A] text-white font-extrabold text-xs md:text-sm hover:bg-[#15803D] transition shadow-[4px_4px_0_#1A1510] cursor-pointer border-2 border-[#1A1510] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingTranscript ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Transcribing Audio Stream...
                  </span>
                ) : (
                  <span>Extract Transcript & Timestamps 🎙️</span>
                )}
              </button>

              {transcriptError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                  {transcriptError}
                </p>
              )}

              {transcriptData && (
                <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-5">
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#16A34A]">{transcriptData.author}</span>
                      <p className="text-xs font-bold text-zinc-900">{transcriptData.title}</p>
                    </div>
                    <div className="flex gap-2 text-[10px] font-extrabold text-zinc-500">
                      <span className="px-2.5 py-1 rounded-md bg-zinc-200">{transcriptData.wordCount} Words</span>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-200">{transcriptData.readingTime} min read</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Timestamped Audio Segments</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => checkAndIncrementUsage(() => copyToClipboard(transcriptData.fullTranscript))}
                          className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copiedText === transcriptData.fullTranscript ? 'Copied' : 'Copy Transcript'}
                        </button>
                        <button 
                          onClick={() => checkAndIncrementUsage(handleDownloadTranscriptTxt)}
                          className="text-xs font-extrabold text-zinc-800 hover:text-black transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
                        >
                          <Download className="w-3.5 h-3.5" /> Download .TXT
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {transcriptData.segments.map((seg, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-zinc-200 text-xs font-medium flex gap-3">
                          <span className="font-mono font-bold text-[#16A34A] shrink-0">[{seg.time}]</span>
                          <span className="text-zinc-800 leading-relaxed">{seg.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 20: Carousel Generator */}
          {toolSlug === 'carousel-generator' && (
            <CarouselGenerator copyToClipboard={copyToClipboard} copiedText={copiedText} checkAndIncrementUsage={checkAndIncrementUsage} />
          )}

          {/* TOOL 21: Text Formatter */}
          {toolSlug === 'text-formatter' && (
            <TextFormatter copyToClipboard={copyToClipboard} copiedText={copiedText} checkAndIncrementUsage={checkAndIncrementUsage} />
          )}

          {/* TOOL 22: Profile Feedback & Audit */}
          {(toolSlug === 'profile-feedback' || toolSlug === 'profile-audit') && (
            <ProfileFeedback copyToClipboard={copyToClipboard} copiedText={copiedText} checkAndIncrementUsage={checkAndIncrementUsage} />
          )}

          {/* TOOL 23: Claude Skills Generator */}
          {(toolSlug === 'claude-skills' || toolSlug === 'claude-skills-generator') && (
            <ClaudeSkills copyToClipboard={copyToClipboard} copiedText={copiedText} checkAndIncrementUsage={checkAndIncrementUsage} />
          )}

          {/* TOOL 24: Viral Post Booster */}
          {(toolSlug === 'post-booster' || toolSlug === 'viral-post-booster') && (
            <PostBooster copyToClipboard={copyToClipboard} copiedText={copiedText} checkAndIncrementUsage={checkAndIncrementUsage} />
          )}

          {/* TOOL 25: Instagram Photo Downloader */}
          {(toolSlug === 'photo-downloader' || toolSlug === 'instagram-photo-downloader') && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Instagram Post or Profile URL</label>
                <input 
                  type="url" 
                  value={photoUrl} 
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/... or https://www.instagram.com/username"
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                />
              </div>

              <button 
                onClick={handleExtractPhoto}
                disabled={isExtractingPhoto}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#16A34A] text-white font-extrabold text-xs md:text-sm hover:bg-[#15803D] transition shadow-[4px_4px_0_#1A1510] cursor-pointer border-2 border-[#1A1510] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isExtractingPhoto ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Extracting Photos...
                  </span>
                ) : (
                  <span>Extract HD Photos 📸</span>
                )}
              </button>

              {photoError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                  {photoError}
                </p>
              )}

              {/* Profile Picture Mode */}
              {extractedPhotos && extractedPhotos.isProfile && extractedPhotos.profilePicUrl && (
                <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <img 
                        src={extractedPhotos.profilePicUrl} 
                        alt="Profile Picture HD" 
                        className="w-40 h-40 rounded-full object-cover border-4 border-[#16A34A] shadow-lg" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#16A34A] rounded-full flex items-center justify-center shadow-md">
                        <Image className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider">Profile Picture • HD</span>
                      <p className="text-sm font-bold text-zinc-900">{extractedPhotos.author}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadPhoto(extractedPhotos.profilePicUrl!, 0)}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                  >
                    <Download className="w-4 h-4 text-[#16A34A]" /> Save Profile Picture (HD JPG)
                  </button>
                </div>
              )}

              {/* Post Photos / Carousel Mode */}
              {extractedPhotos && !extractedPhotos.isProfile && extractedPhotos.photos.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-5">
                  {/* Photo Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-zinc-300 bg-white">
                    <img 
                      src={extractedPhotos.photos[activePhotoIndex]?.url} 
                      alt={`Instagram Photo ${activePhotoIndex + 1}`} 
                      className="w-full max-h-[500px] object-contain mx-auto" 
                    />
                    {/* Carousel Navigation Arrows */}
                    {extractedPhotos.photos.length > 1 && (
                      <>
                        <button 
                          onClick={() => setActivePhotoIndex(prev => prev > 0 ? prev - 1 : extractedPhotos!.photos.length - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer border-none transition backdrop-blur-sm"
                          aria-label="Previous photo"
                        >
                          ◀
                        </button>
                        <button 
                          onClick={() => setActivePhotoIndex(prev => prev < extractedPhotos!.photos.length - 1 ? prev + 1 : 0)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer border-none transition backdrop-blur-sm"
                          aria-label="Next photo"
                        >
                          ▶
                        </button>
                        {/* Slide Counter */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-extrabold">
                          {activePhotoIndex + 1} / {extractedPhotos.photos.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Author & Caption Info */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider">{extractedPhotos.author}</span>
                      {extractedPhotos.photos[activePhotoIndex] && (
                        <span className="text-[10px] font-extrabold text-zinc-500">
                          {extractedPhotos.photos[activePhotoIndex].width} × {extractedPhotos.photos[activePhotoIndex].height} px
                        </span>
                      )}
                    </div>
                    {extractedPhotos.caption && (
                      <p className="text-xs font-semibold text-zinc-700 leading-relaxed line-clamp-3">
                        {extractedPhotos.caption}
                      </p>
                    )}
                  </div>

                  {/* Download Button */}
                  <button 
                    onClick={() => handleDownloadPhoto(extractedPhotos!.photos[activePhotoIndex]?.url, activePhotoIndex)}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none"
                  >
                    <Download className="w-4 h-4 text-[#16A34A]" /> 
                    Download JPG {extractedPhotos.photos.length > 1 ? `(Slide ${activePhotoIndex + 1})` : '(HD)'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Default Tool View Fallback */}
          {toolSlug !== 'engagement-calculator' && 
           toolSlug !== 'caption-generator' && 
           toolSlug !== 'bio-generator' && 
           toolSlug !== 'ctr-calculator' && 
           toolSlug !== 'hook-generator' && 
           toolSlug !== 'username-checker' && 
           toolSlug !== 'hashtag-generator' && 
           toolSlug !== 'char-counter' && 
           toolSlug !== 'character-counter' && 
           toolSlug !== 'cta-generator' && 
           toolSlug !== 'click-value-estimator' && 
           toolSlug !== 'line-breaker' && 
           toolSlug !== 'script-outline' && 
           toolSlug !== 'audit-checklist' && 
           toolSlug !== 'growth-projector' && 
           toolSlug !== 'follower-growth-projector' && 
           toolSlug !== 'lead-value-estimator' && 
           toolSlug !== 'lead-magnet-value-estimator' && 
           toolSlug !== 'subject-line-optimizer' && 
           toolSlug !== 'dm-previewer' && 
           toolSlug !== 'reel-downloader' && 
           toolSlug !== 'reel-transcript' && 
           toolSlug !== 'carousel-generator' && 
           toolSlug !== 'text-formatter' && 
           toolSlug !== 'profile-feedback' && 
           toolSlug !== 'profile-audit' && 
           toolSlug !== 'claude-skills' && 
           toolSlug !== 'claude-skills-generator' && 
           toolSlug !== 'post-booster' && 
           toolSlug !== 'viral-post-booster' && 
           toolSlug !== 'photo-downloader' && 
           toolSlug !== 'instagram-photo-downloader' && (
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-4">
              <p className="text-xs font-bold text-zinc-600">
                Ready to use {tool.title}. Adjust variables above to generate real-time metrics and copy previews.
              </p>
            </div>
          )}
        </section>

        {/* Section 1: Why This Tool */}
        <section 
          className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left" 
          style={{ boxShadow: '5px 7px 0 #1A1510' }}
        >
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">
              Strategic Growth Advantage
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-black italic tracking-tight text-[#1A1510]">
              Why Use {tool.title}?
            </h2>
          </div>

          {/* Quick Answer Callout */}
          <div className="p-5 rounded-2xl bg-[#E6F4EA] border-2 border-[#1A1510] shadow-[3px_4px_0_#1A1510] space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#16A34A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Quick Answer
            </span>
            <p className="text-xs md:text-sm font-bold text-zinc-900 leading-relaxed">
              Cacto's {tool.title} enables Instagram creators and brands to optimize content velocity, eliminate link-in-bio drop-off, and increase DM link click-through rates by up to 5x using automated keyword triggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <h3 className="font-extrabold text-xs text-[#1A1510]">Streamlined Audience Retention</h3>
              <p className="text-zinc-600 text-xs font-medium leading-relaxed">
                {tool.description} By providing immediate value in real-time, you capture scroller intent at peak momentum without forcing visitors through complex website multi-links.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <h3 className="font-extrabold text-xs text-[#1A1510]">Algorithm & Meta Compliant</h3>
              <p className="text-zinc-600 text-xs font-medium leading-relaxed">
                Every asset generated by Cacto is optimized for search visibility, caption readability, and Instagram Graph API rates to keep your profile algorithmically safe and conversion-ready.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Tabbed Knowledge Hub */}
        <ToolTabbedHub toolTitle={tool.title} />

        {/* Section 3: 2-Column Comparison Grid */}
        <ToolComparisonGrid currentSlug={toolSlug} />

        {/* Section 4: 2-Column Search FAQs */}
        <ToolFaqGrid faqs={tool.faqs || []} toolTitle={tool.title} />

        {/* Section 5: Strategic Edge */}
        <section 
          className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left"
          style={{ boxShadow: '5px 7px 0 #1A1510' }}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">
              Execution Architecture
            </span>
            <h2 className="font-serif text-2xl font-black italic tracking-tight text-[#1A1510]">
              How does the Cacto growth playbook increase Instagram conversions?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black text-xs">01</div>
              <h3 className="font-extrabold text-xs text-[#1A1510]">Zero Friction</h3>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Scrollers comment 1 keyword without exiting their social feed.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black text-xs">02</div>
              <h3 className="font-extrabold text-xs text-[#1A1510]">Instant Auto-DM</h3>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">System drops direct offer links in inbox within milliseconds.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black text-xs">03</div>
              <h3 className="font-extrabold text-xs text-[#1A1510]">High DM CTR</h3>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Direct messages achieve up to 50% click-through conversion.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-black text-xs">04</div>
              <h3 className="font-extrabold text-xs text-[#1A1510]">Owned Lead List</h3>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">Build a warm subscriber list you own independently of algorithms.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Action Checklist */}
        <section 
          className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left"
          style={{ boxShadow: '5px 7px 0 #1A1510' }}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">
              Workflow Guide
            </span>
            <h2 className="font-serif text-2xl font-black italic tracking-tight text-[#1A1510]">
              What are the recommended next steps to deploy your results?
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0" />
              <p className="text-xs font-bold text-zinc-800">Generate copy or metrics above and copy output to your clipboard.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0" />
              <p className="text-xs font-bold text-zinc-800">Include a clear 1-word comment trigger keyword in your Reel caption & video audio.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0" />
              <p className="text-xs font-bold text-zinc-800">Connect Cacto Auto-DM automation to deliver your offer link instantly when followers comment.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Conversion Metrics */}
        <section 
          className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left"
          style={{ boxShadow: '5px 7px 0 #1A1510' }}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">
              Verified Benchmarks
            </span>
            <h2 className="font-serif text-2xl font-black italic tracking-tight text-[#1A1510]">
              What performance and conversion benchmarks can you expect?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] text-center space-y-1">
              <p className="text-3xl font-serif font-black text-[#16A34A]">85%+</p>
              <p className="text-xs font-extrabold text-[#1A1510]">DM Delivery Success Rate</p>
              <p className="text-[10px] text-zinc-400 font-semibold">Instant response trigger</p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] text-center space-y-1">
              <p className="text-3xl font-serif font-black text-[#16A34A]">3.2x</p>
              <p className="text-xs font-extrabold text-[#1A1510]">Higher Lead Opt-In</p>
              <p className="text-[10px] text-zinc-400 font-semibold">vs traditional bio links</p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] text-center space-y-1">
              <p className="text-3xl font-serif font-black text-[#16A34A]">99.9%</p>
              <p className="text-xs font-extrabold text-[#1A1510]">Meta API Safety Rating</p>
              <p className="text-[10px] text-zinc-400 font-semibold">Zero password policy</p>
            </div>
          </div>
        </section>

        {/* Section 9: Security Note */}
        <ToolSafetyNote />

        {/* Section 10: Bottom CTA Bar */}
        <ToolBottomCtaBar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      </main>

      {/* Free Tools Usage Wall Modal */}
      {isUsageWallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FAF6EE] border-2 border-[#1A1510] rounded-[28px] p-6 md:p-8 space-y-6 shadow-[8px_10px_0_#1A1510] overflow-hidden text-left">
            <button
              onClick={() => setIsUsageWallOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-200/60 transition text-zinc-500 hover:text-[#1A1510] cursor-pointer border-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Limit Reached
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1A1510] leading-tight tracking-tight">
                How can you unlock unlimited access to all Cacto growth tools?
              </h2>
              <p className="text-xs md:text-sm font-semibold text-zinc-600 leading-relaxed">
                Enter your email to get 100% unlimited free access to all 25 tools & lock in your 50% launch discount.
              </p>
            </div>

            <form onSubmit={handleUsageWallSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={usageEmail}
                    onChange={(e) => setUsageEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-[#1A1510] bg-white text-xs font-bold text-[#1A1510] placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition"
                  />
                </div>
              </div>

              {usageModalStatus === 'error' && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  {usageModalMessage}
                </p>
              )}

              {usageModalStatus === 'success' && (
                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  Access unlocked! Resuming your request...
                </p>
              )}

              <button
                type="submit"
                disabled={usageModalStatus === 'loading'}
                className="w-full py-4 px-6 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs md:text-sm transition-all shadow-[4px_4px_0_#1A1510] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2 cursor-pointer border-2 border-[#1A1510] disabled:opacity-50"
              >
                {usageModalStatus === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Unlocking Access...
                  </span>
                ) : (
                  <span>Unlock Unlimited Access 🚀</span>
                )}
              </button>

              <p className="text-[10px] text-center font-bold text-zinc-400">
                🔒 Zero spam. Unsubscribe anytime in 1 click.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Header Join Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  )
}

function ToolTabbedHub({ toolTitle }: { toolTitle: string }) {
  const [activeTab, setActiveTab] = useState<'steps' | 'usecases' | 'benefits' | 'device'>('steps')

  return (
    <section 
      className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left"
      style={{ boxShadow: '5px 7px 0 #1A1510' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block mb-1">
            Interactive Knowledge Base
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black italic tracking-tight text-[#1A1510]">
            How do you implement {toolTitle} for maximum Instagram reach?
          </h2>
        </div>
      </div>

      {/* Tabs bar */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-3">
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
            activeTab === 'steps'
              ? 'bg-[#1A1510] text-[#FAF6EE] border-[#1A1510] shadow-[2px_3px_0_#16A34A]'
              : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-[#1A1510]'
          }`}
        >
          📋 3 Steps Guide
        </button>
        <button
          onClick={() => setActiveTab('usecases')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
            activeTab === 'usecases'
              ? 'bg-[#1A1510] text-[#FAF6EE] border-[#1A1510] shadow-[2px_3px_0_#16A34A]'
              : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-[#1A1510]'
          }`}
        >
          💡 Use Cases
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
            activeTab === 'benefits'
              ? 'bg-[#1A1510] text-[#FAF6EE] border-[#1A1510] shadow-[2px_3px_0_#16A34A]'
              : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-[#1A1510]'
          }`}
        >
          ⚡ Key Benefits
        </button>
        <button
          onClick={() => setActiveTab('device')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
            activeTab === 'device'
              ? 'bg-[#1A1510] text-[#FAF6EE] border-[#1A1510] shadow-[2px_3px_0_#16A34A]'
              : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-[#1A1510]'
          }`}
        >
          📱 Device Guide
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'steps' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center">1</span>
            <h3 className="font-bold text-xs md:text-sm text-[#1A1510]">Fill Inputs & Options</h3>
            <p className="text-zinc-600 text-xs font-medium leading-relaxed">
              Enter your campaign details, handles, metrics, or topic ideas into the interactive inputs above.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center">2</span>
            <h3 className="font-bold text-xs md:text-sm text-[#1A1510]">Review Real-Time Output</h3>
            <p className="text-zinc-600 text-xs font-medium leading-relaxed">
              Instantly preview calculated percentages, formatted text, or customized copy options tailored to your niche.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#16A34A] text-white text-xs font-black flex items-center justify-center">3</span>
            <h3 className="font-bold text-xs md:text-sm text-[#1A1510]">Deploy to Instagram</h3>
            <p className="text-zinc-600 text-xs font-medium leading-relaxed">
              Copy results with one click or link with Cacto Auto-DM triggers to capture leads directly inside Instagram DMs.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'usecases' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs">
              <Sparkles className="w-4 h-4" /> Lead Magnet Distribution
            </div>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Deliver free PDFs, Notion templates, or checklists directly into prospect DMs when they comment on your Reel.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs">
              <TrendingUp className="w-4 h-4" /> Direct Product Sales
            </div>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Send instant checkout buttons and discount codes straight to interested followers, bypassing low-intent link bios.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs">
              <User className="w-4 h-4" /> Creator Audience Retention
            </div>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Boost comment velocity and algorithm reach by encouraging scrollers to trigger automated personalized responses.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs">
              <Mail className="w-4 h-4" /> Email List Growth
            </div>
            <p className="text-xs text-zinc-700 font-medium leading-relaxed">
              Capture email addresses seamlessly within DM conversations with zero form drop-off or external redirect friction.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'benefits' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 font-bold text-xs">5x</div>
            <div>
              <h4 className="font-bold text-xs text-[#1A1510]">5x Higher Click-Through Rates</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                Direct DM delivery converts up to 5x higher than passive link-in-bio website directories.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 font-bold text-xs">100%</div>
            <div>
              <h4 className="font-bold text-xs text-[#1A1510]">Meta Terms Compliant</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                Fully compliant with official Instagram Graph API rules to protect account safety.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 font-bold text-xs">0s</div>
            <div>
              <h4 className="font-bold text-xs text-[#1A1510]">Instant Real-Time Output</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                Calculations and copy variations generate instantly right in your browser.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 font-bold text-xs">FREE</div>
            <div>
              <h4 className="font-bold text-xs text-[#1A1510]">No Credit Card Required</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed mt-0.5">
                Free tools are 100% free with zero hidden fees or mandatory sign-up steps.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'device' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
            <Smartphone className="w-5 h-5 mx-auto text-[#16A34A]" />
            <p className="text-xs font-bold text-[#1A1510]">iOS App</p>
            <p className="text-[10px] text-zinc-500 font-medium">Fully Compatible</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
            <Smartphone className="w-5 h-5 mx-auto text-[#16A34A]" />
            <p className="text-xs font-bold text-[#1A1510]">Android App</p>
            <p className="text-[10px] text-zinc-500 font-medium">Fully Compatible</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
            <Sliders className="w-5 h-5 mx-auto text-[#16A34A]" />
            <p className="text-xs font-bold text-[#1A1510]">Mobile Safari/Chrome</p>
            <p className="text-[10px] text-zinc-500 font-medium">Responsive Layout</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-1">
            <Eye className="w-5 h-5 mx-auto text-[#16A34A]" />
            <p className="text-xs font-bold text-[#1A1510]">Desktop Browser</p>
            <p className="text-[10px] text-zinc-500 font-medium">HD Studio Mode</p>
          </div>
        </div>
      )}
    </section>
  )
}

function ToolComparisonGrid({ currentSlug }: { currentSlug: string }) {
  const relatedTools = freeToolsList.filter(t => t.slug !== currentSlug).slice(0, 6)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Left Column: Comparison Table */}
      <div 
        className="lg:col-span-7 p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6"
        style={{ boxShadow: '5px 7px 0 #1A1510' }}
      >
        <div>
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block mb-1">
            Strategy Benchmark
          </span>
          <h2 className="font-serif text-2xl font-black italic tracking-tight text-[#1A1510]">
            How does Cacto Auto-DM compare to traditional link-in-bio tools?
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-[#1A1510]">
                <th className="py-2.5 px-3 font-extrabold text-[#1A1510]">Feature / Metric</th>
                <th className="py-2.5 px-3 font-extrabold text-[#16A34A] bg-emerald-50">Cacto Auto-DM</th>
                <th className="py-2.5 px-3 font-extrabold text-zinc-500">Link-in-Bio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-800">Viewer Click CTR</td>
                <td className="py-2.5 px-3 font-black text-[#16A34A] bg-emerald-50/50">35% - 50%</td>
                <td className="py-2.5 px-3 font-semibold text-zinc-500">3% - 8%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-800">User Action Friction</td>
                <td className="py-2.5 px-3 font-black text-[#16A34A] bg-emerald-50/50">1-Word Comment</td>
                <td className="py-2.5 px-3 font-semibold text-zinc-500">5+ Tap Directory</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-800">Lead Magnet Delivery</td>
                <td className="py-2.5 px-3 font-black text-[#16A34A] bg-emerald-50/50">Instant Inbox DM</td>
                <td className="py-2.5 px-3 font-semibold text-zinc-500">External Web Page</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-800">Reel Algorithm Signals</td>
                <td className="py-2.5 px-3 font-black text-[#16A34A] bg-emerald-50/50">High Comment Vol</td>
                <td className="py-2.5 px-3 font-semibold text-zinc-500">Zero Comment Boost</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-800">Meta API Safety</td>
                <td className="py-2.5 px-3 font-black text-[#16A34A] bg-emerald-50/50">100% Compliant</td>
                <td className="py-2.5 px-3 font-semibold text-zinc-500">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: 6 Related Tool Cards */}
      <div 
        className="lg:col-span-5 p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6"
        style={{ boxShadow: '5px 7px 0 #1A1510' }}
      >
        <div>
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block mb-1">
            Free Toolkit
          </span>
          <h2 className="font-serif text-2xl font-black italic tracking-tight text-[#1A1510]">
            Which related growth tools can help scale your Instagram workflow?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {relatedTools.map(t => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#1A1510] hover:bg-emerald-50/40 transition group flex items-start justify-between gap-3 text-left"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 inline-block">
                  {t.category}
                </span>
                <h3 className="text-xs font-extrabold text-[#1A1510] group-hover:text-[#16A34A] transition leading-snug">
                  {t.title}
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-[#16A34A] shrink-0 self-center" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ToolFaqGrid({ faqs, toolTitle }: { faqs: Array<{ q: string; a: string }>; toolTitle: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  const displayFaqs = faqs.length >= 6 ? faqs.slice(0, 6) : faqs
  const leftColumnFaqs = displayFaqs.filter((_, i) => i % 2 === 0)
  const rightColumnFaqs = displayFaqs.filter((_, i) => i % 2 === 1)

  return (
    <section 
      className="p-6 md:p-10 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left"
      style={{ boxShadow: '5px 7px 0 #1A1510' }}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase text-[#16A34A] tracking-wider block mb-1">
            Search-Intent Knowledge Base
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black italic tracking-tight text-[#1A1510]">
            What are the most common questions about {toolTitle}?
          </h2>
        </div>
        <HelpCircle className="h-6 w-6 text-zinc-400 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          {leftColumnFaqs.map((faq, originalIdx) => {
            const idx = originalIdx * 2
            const isOpen = openIndex === idx
            return (
              <div 
                key={idx}
                className={`rounded-2xl border-2 border-[#1A1510] overflow-hidden transition-all duration-200 bg-white ${
                  isOpen ? 'shadow-[3px_4px_0_#1A1510]' : 'hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-4 py-3.5 text-left font-bold text-xs text-[#1A1510] flex justify-between items-center gap-3 bg-zinc-50/50 hover:bg-zinc-100/60 transition-colors cursor-pointer border-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E6F4EA] text-[#16A34A] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-semibold text-zinc-900 leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown 
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#16A34A]' : ''
                    }`} 
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-zinc-100 text-xs font-medium text-zinc-600 leading-relaxed bg-white">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightColumnFaqs.map((faq, originalIdx) => {
            const idx = originalIdx * 2 + 1
            const isOpen = openIndex === idx
            return (
              <div 
                key={idx}
                className={`rounded-2xl border-2 border-[#1A1510] overflow-hidden transition-all duration-200 bg-white ${
                  isOpen ? 'shadow-[3px_4px_0_#1A1510]' : 'hover:border-zinc-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-4 py-3.5 text-left font-bold text-xs text-[#1A1510] flex justify-between items-center gap-3 bg-zinc-50/50 hover:bg-zinc-100/60 transition-colors cursor-pointer border-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#E6F4EA] text-[#16A34A] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-semibold text-zinc-900 leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown 
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#16A34A]' : ''
                    }`} 
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-2 border-t border-zinc-100 text-xs font-medium text-zinc-600 leading-relaxed bg-white">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ToolSafetyNote() {
  return (
    <section 
      className="p-6 md:p-8 rounded-[28px] bg-emerald-50/80 border-2 border-[#1A1510] space-y-4 text-left"
      style={{ boxShadow: '5px 7px 0 #1A1510' }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#16A34A] text-white shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">
            Security & Meta API Compliance
          </span>
          <h2 className="font-serif text-xl font-black text-[#1A1510]">
            Is Cacto free growth tools safe and compliant with Instagram API terms?
          </h2>
        </div>
      </div>
      <p className="text-zinc-700 text-xs font-medium leading-relaxed">
        Cacto tools operate strict non-intrusive rate limits and client-side processing. We never request your Instagram password or execute unauthorized actions. All direct message delivery flows adhere fully to official Meta Graph API Developer Guidelines.
      </p>
      <div className="flex flex-wrap gap-4 text-[11px] font-extrabold text-[#16A34A]">
        <span>✓ Zero Password Required</span>
        <span>✓ Official Graph API Protocol</span>
        <span>✓ Rate-Limit Protected</span>
        <span>✓ Secure HTTPS Processing</span>
      </div>
    </section>
  )
}

function ToolBottomCtaBar({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
  return (
    <section 
      className="p-6 md:p-8 rounded-[28px] bg-[#1A1510] text-[#FAF6EE] border-2 border-[#1A1510] space-y-6 text-left"
      style={{ boxShadow: '6px 8px 0 #16A34A' }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#FAF6EE]">
            Join our waitlist.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="px-6 py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition-all shadow-md cursor-pointer border-none flex items-center justify-center gap-2"
          >
            Join Waitlist
          </button>
          <Link
            href="/tools"
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6EE] font-extrabold text-xs transition-all border border-white/20 text-center flex items-center justify-center gap-2"
          >
            Browse All 24 Tools ➔
          </Link>
        </div>
      </div>
    </section>
  )
}

interface CarouselSlide {
  id: string
  type: 'title' | 'content' | 'quote' | 'checklist' | 'cta'
  headline: string
  subheadline: string
  bullets: string[]
}

type CarouselTheme = 'emerald' | 'dark' | 'neon' | 'pastel' | 'monokai'
type CarouselFont = 'Inter' | 'Serif' | 'Mono' | 'Outfit'

function getWrappedLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return []
  const paragraphs = text.split('\n')
  const lines: string[] = []
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push('')
      continue
    }
    const words = paragraph.split(' ')
    let currentLine = words[0] || ''
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i]
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine
      } else {
        lines.push(currentLine)
        currentLine = words[i]
      }
    }
    lines.push(currentLine)
  }
  return lines
}

function drawSlideToCanvas(
  slide: CarouselSlide,
  index: number,
  totalSlides: number,
  themeKey: CarouselTheme,
  fontKey: CarouselFont,
  author: string,
  badge: boolean,
  swipe: boolean
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1350
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const fontFam = fontKey === 'Serif' ? 'Georgia, serif' : fontKey === 'Mono' ? 'monospace' : fontKey === 'Outfit' ? 'Impact, Inter, sans-serif' : 'Inter, sans-serif'
  
  const themeMap = {
    emerald: { bg1: '#022c22', bg2: '#064e3b', card: 'rgba(6, 95, 70, 0.45)', text: '#ecfdf5', sub: '#a7f3d0', accent: '#34d399', badgeBg: 'rgba(52, 211, 153, 0.2)', border: 'rgba(52, 211, 153, 0.3)' },
    dark: { bg1: '#09090b', bg2: '#18181b', card: 'rgba(39, 39, 42, 0.75)', text: '#ffffff', sub: '#a1a1aa', accent: '#60a5fa', badgeBg: 'rgba(96, 165, 250, 0.2)', border: 'rgba(113, 113, 122, 0.3)' },
    neon: { bg1: '#0f172a', bg2: '#2e1065', card: 'rgba(76, 29, 149, 0.45)', text: '#fdf2f8', sub: '#a5f3fc', accent: '#f472b6', badgeBg: 'rgba(244, 114, 182, 0.2)', border: 'rgba(244, 114, 182, 0.3)' },
    pastel: { bg1: '#fffbeb', bg2: '#fff1f2', card: '#ffffff', text: '#451a03', sub: '#92400e', accent: '#b45309', badgeBg: 'rgba(253, 230, 138, 0.8)', border: '#fde68a' },
    monokai: { bg1: '#272822', bg2: '#1e1e1e', card: 'rgba(62, 61, 50, 0.65)', text: '#f8f8f2', sub: '#e6db74', accent: '#a6e22e', badgeBg: 'rgba(253, 151, 31, 0.2)', border: 'rgba(117, 113, 94, 0.4)' }
  }
  const t = themeMap[themeKey] || themeMap.emerald

  // 1. Background Gradient
  const grad = ctx.createLinearGradient(0, 0, 1080, 1350)
  grad.addColorStop(0, t.bg1)
  grad.addColorStop(1, t.bg2)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1080, 1350)

  // Decorative border
  ctx.lineWidth = 14
  ctx.strokeStyle = t.border
  ctx.strokeRect(24, 24, 1032, 1302)

  // 2. Top Header (Author Avatar, Handle, Counter)
  ctx.fillStyle = t.badgeBg
  ctx.beginPath()
  ctx.arc(80, 95, 24, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = `bold 24px ${fontFam}`
  ctx.fillStyle = t.text
  ctx.textAlign = 'center'
  ctx.fillText(author.charAt(1)?.toUpperCase() || 'C', 80, 103)

  ctx.textAlign = 'left'
  ctx.font = `bold 28px ${fontFam}`
  ctx.fillText(author || '@cacto.ai', 120, 103)

  if (badge) {
    ctx.textAlign = 'right'
    ctx.font = `bold 24px ${fontFam}`
    ctx.fillStyle = t.accent
    ctx.fillText(`${index + 1} / ${totalSlides}`, 1000, 103)
    ctx.textAlign = 'left'
  }

  // 3. Card Center Content
  const cX = 70
  const cY = 160
  const cW = 940
  const cH = 1040

  ctx.fillStyle = t.card
  ctx.beginPath()
  ctx.roundRect(cX, cY, cW, cH, 36)
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = t.border
  ctx.stroke()

  let curY = cY + 90

  // Badge Tag
  ctx.font = `bold 20px ${fontFam}`
  ctx.fillStyle = t.accent
  ctx.fillText(`✦ ${slide.type.toUpperCase()} SLIDE`, cX + 50, curY)
  curY += 65

  // Headline
  ctx.font = `bold 50px ${fontFam}`
  ctx.fillStyle = t.text
  const hLines = getWrappedLines(ctx, slide.headline || '', cW - 100)
  for (const line of hLines) {
    ctx.fillText(line, cX + 50, curY)
    curY += 64
  }
  curY += 15

  // Subheadline
  if (slide.subheadline) {
    ctx.font = `30px ${fontFam}`
    ctx.fillStyle = t.sub
    const sLines = getWrappedLines(ctx, slide.subheadline, cW - 100)
    for (const line of sLines) {
      if (curY > cY + cH - 220) break
      ctx.fillText(line, cX + 50, curY)
      curY += 44
    }
    curY += 25
  }

  // Bullets
  const validBullets = slide.bullets.filter(Boolean)
  if (validBullets.length > 0) {
    ctx.font = `28px ${fontFam}`
    for (let i = 0; i < validBullets.length; i++) {
      if (curY > cY + cH - 80) break
      const bText = slide.type === 'checklist' ? `✓  ${validBullets[i]}` : `${i + 1}.  ${validBullets[i]}`
      const bLines = getWrappedLines(ctx, bText, cW - 120)
      for (const bl of bLines) {
        if (curY > cY + cH - 70) break
        ctx.fillStyle = t.text
        ctx.fillText(bl, cX + 60, curY)
        curY += 42
      }
      curY += 8
    }
  }

  // 4. Bottom Footer
  ctx.font = `bold 24px ${fontFam}`
  ctx.fillStyle = t.sub
  ctx.fillText('cacto.ai', 80, 1270)

  if (swipe) {
    ctx.textAlign = 'right'
    ctx.fillStyle = t.accent
    ctx.fillText('Swipe ➔', 1000, 1270)
    ctx.textAlign = 'left'
  }

  return canvas
}

function CarouselGenerator({ copyToClipboard, copiedText, checkAndIncrementUsage }: { copyToClipboard: (text: string) => void; copiedText: string | null; checkAndIncrementUsage: (action?: () => void) => boolean }) {
  const [slides, setSlides] = useState<CarouselSlide[]>([
    {
      id: 'slide-1',
      type: 'title',
      headline: '5 Hacks to Double Your Instagram DM Conversions',
      subheadline: 'The exact comment-to-lead workflow top creators use to turn traffic into Stripe revenue.',
      bullets: ['No link-in-bio required', '100% compliant automation', 'Works for any niche']
    },
    {
      id: 'slide-2',
      type: 'content',
      headline: '1. Replace Bio Links With Keyword Triggers',
      subheadline: 'Clicking out of Instagram kills retention. Ask users to drop a 1-word comment instead.',
      bullets: ['90%+ lower drop-off rate', 'Instant direct message delivery', 'Zero manual work needed']
    },
    {
      id: 'slide-3',
      type: 'quote',
      headline: 'The highest converting funnel is the one that requires the fewest clicks.',
      subheadline: '— Cacto Growth Insights 2026',
      bullets: []
    },
    {
      id: 'slide-4',
      type: 'checklist',
      headline: 'Carousel Optimization Checklist',
      subheadline: 'Make sure every slide hits these 4 core conversion triggers:',
      bullets: [
        'Strong scroll-stopping headline',
        'High contrast visual design',
        'One clear value takeaway per slide',
        'Direct call-to-action on final slide'
      ]
    },
    {
      id: 'slide-5',
      type: 'cta',
      headline: 'Want Our Free Instagram Lead Playbook?',
      subheadline: 'Comment "GROWTH" below and we will DM you the step-by-step setup guide instantly!',
      bullets: ['Free setup template', 'Includes pre-built automation rules', 'Ready in 5 minutes']
    }
  ])

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [previewSlideIndex, setPreviewSlideIndex] = useState(0)
  const [theme, setTheme] = useState<CarouselTheme>('emerald')
  const [fontFamily, setFontFamily] = useState<CarouselFont>('Inter')
  const [authorHandle, setAuthorHandle] = useState('@cacto.ai')
  const [showBadge, setShowBadge] = useState(true)
  const [showSwipe, setShowSwipe] = useState(true)
  const [isExportingBatch, setIsExportingBatch] = useState(false)

  const activeSlide = slides[activeSlideIndex] || slides[0]
  const previewSlide = slides[previewSlideIndex] || slides[0]

  const themesConfig: Record<CarouselTheme, {
    name: string
    bg: string
    cardBg: string
    textHeadline: string
    textSub: string
    accent: string
    badge: string
    swipe: string
    border: string
    swatch: string
  }> = {
    emerald: {
      name: 'Emerald',
      bg: 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-emerald-50',
      cardBg: 'bg-emerald-900/40 border-emerald-500/20',
      textHeadline: 'text-emerald-50',
      textSub: 'text-emerald-200/80',
      accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      swipe: 'text-emerald-400',
      border: 'border-emerald-500/20',
      swatch: 'bg-emerald-600'
    },
    dark: {
      name: 'Dark',
      bg: 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100',
      cardBg: 'bg-zinc-900/70 border-zinc-800',
      textHeadline: 'text-white',
      textSub: 'text-zinc-400',
      accent: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      badge: 'bg-zinc-800/80 text-zinc-300 border-zinc-700',
      swipe: 'text-blue-400',
      border: 'border-zinc-800',
      swatch: 'bg-zinc-900'
    },
    neon: {
      name: 'Neon',
      bg: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-pink-50',
      cardBg: 'bg-purple-900/30 border-pink-500/20',
      textHeadline: 'text-pink-100',
      textSub: 'text-cyan-200/80',
      accent: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      swipe: 'text-cyan-400',
      border: 'border-pink-500/20',
      swatch: 'bg-pink-600'
    },
    pastel: {
      name: 'Pastel',
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-amber-950',
      cardBg: 'bg-white/80 border-amber-200/60',
      textHeadline: 'text-amber-950',
      textSub: 'text-amber-800/80',
      accent: 'text-amber-800 bg-amber-200/50 border-amber-300',
      badge: 'bg-amber-200/80 text-amber-900 border-amber-300',
      swipe: 'text-amber-800',
      border: 'border-amber-200',
      swatch: 'bg-amber-300'
    },
    monokai: {
      name: 'Monokai',
      bg: 'bg-gradient-to-br from-[#272822] via-[#1e1e1e] to-[#272822] text-[#F8F8F2]',
      cardBg: 'bg-[#3E3D32]/50 border-[#75715E]/40',
      textHeadline: 'text-[#F8F8F2]',
      textSub: 'text-[#E6DB74]',
      accent: 'text-[#A6E22E] bg-[#A6E22E]/10 border-[#A6E22E]/30',
      badge: 'bg-[#FD971F]/20 text-[#FD971F] border-[#FD971F]/30',
      swipe: 'text-[#A6E22E]',
      border: 'border-[#75715E]/40',
      swatch: 'bg-[#272822]'
    }
  }

  const fontClasses: Record<CarouselFont, string> = {
    Inter: 'font-sans',
    Serif: 'font-serif',
    Mono: 'font-mono',
    Outfit: 'font-sans tracking-tight font-extrabold'
  }

  const currentTheme = themesConfig[theme]

  const addSlide = () => {
    if (slides.length >= 10) return
    const newSlide: CarouselSlide = {
      id: `slide-${Date.now()}`,
      type: 'content',
      headline: `Key Insight #${slides.length + 1}`,
      subheadline: 'Explain this point clearly with actionable advice.',
      bullets: ['First key point', 'Second key point']
    }
    const newSlides = [...slides, newSlide]
    setSlides(newSlides)
    setActiveSlideIndex(newSlides.length - 1)
    setPreviewSlideIndex(newSlides.length - 1)
  }

  const deleteSlide = (index: number) => {
    if (slides.length <= 1) return
    const newSlides = slides.filter((_, i) => i !== index)
    setSlides(newSlides)
    const nextIdx = Math.min(index, newSlides.length - 1)
    setActiveSlideIndex(nextIdx)
    setPreviewSlideIndex(nextIdx)
  }

  const duplicateSlide = (index: number) => {
    if (slides.length >= 10) return
    const target = slides[index]
    const dup: CarouselSlide = {
      ...target,
      id: `slide-${Date.now()}`,
      headline: `${target.headline} (Copy)`
    }
    const newSlides = [...slides]
    newSlides.splice(index + 1, 0, dup)
    setSlides(newSlides)
    setActiveSlideIndex(index + 1)
    setPreviewSlideIndex(index + 1)
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= slides.length) return
    const newSlides = [...slides]
    const temp = newSlides[index]
    newSlides[index] = newSlides[targetIndex]
    newSlides[targetIndex] = temp
    setSlides(newSlides)
    setActiveSlideIndex(targetIndex)
    setPreviewSlideIndex(targetIndex)
  }

  const updateActiveSlide = (fields: Partial<CarouselSlide>) => {
    setSlides(slides.map((s, i) => i === activeSlideIndex ? { ...s, ...fields } : s))
  }

  const exportSingleSlidePNG = (index: number) => {
    const slide = slides[index]
    if (!slide) return
    const canvas = drawSlideToCanvas(slide, index, slides.length, theme, fontFamily, authorHandle, showBadge, showSwipe)
    const dataUrl = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `carousel_slide_${index + 1}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    copyToClipboard(`Downloaded carousel_slide_${index + 1}.png (1080x1350 HD)!`)
  }

  const exportBatchDeckPNG = async () => {
    setIsExportingBatch(true)
    for (let i = 0; i < slides.length; i++) {
      exportSingleSlidePNG(i)
      await new Promise((resolve) => setTimeout(resolve, 350))
    }
    setIsExportingBatch(false)
    copyToClipboard(`Exported all ${slides.length} slides at 1080x1350 px (300 DPI)!`)
  }

  const copyInstagramCaption = () => {
    let caption = `📌 SLIDE-BY-SLIDE CAROUSEL BREAKDOWN:\n\n`
    slides.forEach((s, idx) => {
      caption += `Slide ${idx + 1}: ${s.headline}\n`
      if (s.subheadline) caption += `${s.subheadline}\n`
      if (s.bullets.filter(Boolean).length > 0) {
        caption += s.bullets.filter(Boolean).map(b => `• ${b}`).join('\n') + `\n`
      }
      caption += `\n`
    })
    caption += `👇 COMMENT "CAROUSEL" below to get our full growth templates sent directly to your DMs!\n\n`
    caption += `#instagramcarousel #carouselgenerator #contentcreation #socialmediamarketing #cacto #growthhacks`

    copyToClipboard(caption)
  }

  const exportTextScript = () => {
    const script = slides.map((s, idx) => {
      const num = String(idx + 1).padStart(2, '0')
      let res = `--- SLIDE ${num} [${s.type.toUpperCase()}] ---\nHeadline: ${s.headline}\nSubheadline: ${s.subheadline}`
      if (s.bullets.length > 0) {
        res += `\nBullets:\n` + s.bullets.map(b => `• ${b}`).join('\n')
      }
      return res
    }).join('\n\n')
    const fullText = `📱 INSTAGRAM CAROUSEL SCRIPT (${slides.length} SLIDES)\nAuthor: ${authorHandle}\nTheme: ${theme.toUpperCase()} | Font: ${fontFamily}\n\n` + script
    copyToClipboard(fullText)
  }

  return (
    <div className="space-y-8">
      {/* Top Controls Grid: Global Settings & Themes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-zinc-50/70 p-6 rounded-2xl border border-zinc-200">
        
        {/* Theme Selector */}
        <div className="space-y-3">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
            Visual Theme Presets (5)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {(['emerald', 'dark', 'neon', 'pastel', 'monokai'] as CarouselTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-2.5 rounded-xl border-2 transition text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                  theme === t ? 'border-[#1A1510] bg-white shadow-sm' : 'border-zinc-200 bg-white/50 hover:bg-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full ${themesConfig[t].swatch}`} />
                <span className="text-[10px] font-black capitalize text-zinc-700">{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font & Global Meta Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Typography Font</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as CarouselFont)}
                className="w-full p-2.5 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
              >
                <option value="Inter">Inter (Sans Clean)</option>
                <option value="Serif">Editorial (Serif Elegance)</option>
                <option value="Mono">Tech Code (Mono)</option>
                <option value="Outfit">Modern Display (Outfit)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Author Handle</label>
              <input
                type="text"
                value={authorHandle}
                onChange={(e) => setAuthorHandle(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold"
                placeholder="@username"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700">
              <input
                type="checkbox"
                checked={showBadge}
                onChange={(e) => setShowBadge(e.target.checked)}
                className="w-4 h-4 accent-[#16A34A] rounded"
              />
              Show Slide Counter Badge
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-700">
              <input
                type="checkbox"
                checked={showSwipe}
                onChange={(e) => setShowSwipe(e.target.checked)}
                className="w-4 h-4 accent-[#16A34A] rounded"
              />
              Show Swipe Indicator (Swipe ➔)
            </label>
          </div>
        </div>
      </div>

      {/* Main Workspace: Left Editor + Right 4:5 Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Editor Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Slide Navigation Header Tabs */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
                Carousel Slides ({slides.length} / 10)
              </span>
              <button
                onClick={() => checkAndIncrementUsage(addSlide)}
                disabled={slides.length >= 10}
                className="text-xs font-extrabold bg-[#1A1510] text-white px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:opacity-90 disabled:opacity-40 transition cursor-pointer border-none"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slide
              </button>
            </div>

            {/* Slide Tabs Bar */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlideIndex(idx)
                    setPreviewSlideIndex(idx)
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer border-2 ${
                    activeSlideIndex === idx
                      ? 'border-[#16A34A] bg-[#E6F4EA] text-[#16A34A]'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <span>Slide {idx + 1}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200/60 font-bold text-zinc-600">
                    {slide.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Slide Form & Controls */}
          {activeSlide && (
            <div className="p-6 rounded-2xl border-2 border-[#1A1510] bg-white space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#16A34A]">
                  Editing Slide {activeSlideIndex + 1} of {slides.length}
                </span>

                {/* Reorder & Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSlide(activeSlideIndex, 'up')}
                    disabled={activeSlideIndex === 0}
                    title="Move Up"
                    className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSlide(activeSlideIndex, 'down')}
                    disabled={activeSlideIndex === slides.length - 1}
                    title="Move Down"
                    className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => duplicateSlide(activeSlideIndex)}
                    disabled={slides.length >= 10}
                    title="Duplicate Slide"
                    className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSlide(activeSlideIndex)}
                    disabled={slides.length <= 1}
                    title="Delete Slide"
                    className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Type Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Slide Type Layout</label>
                <div className="grid grid-cols-5 gap-2">
                  {(['title', 'content', 'quote', 'checklist', 'cta'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateActiveSlide({ type: t })}
                      className={`py-2 px-1 rounded-xl text-[11px] font-black capitalize transition border-2 cursor-pointer ${
                        activeSlide.type === t
                          ? 'border-[#1A1510] bg-[#1A1510] text-white'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headline Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Headline Copy</label>
                <textarea
                  rows={2}
                  value={activeSlide.headline}
                  onChange={(e) => updateActiveSlide({ headline: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold leading-snug"
                  placeholder="Enter main headline..."
                />
              </div>

              {/* Subheadline Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Subheadline / Paragraph Copy</label>
                <textarea
                  rows={2}
                  value={activeSlide.subheadline}
                  onChange={(e) => updateActiveSlide({ subheadline: e.target.value })}
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold leading-snug"
                  placeholder="Enter subheadline or body text..."
                />
              </div>

              {/* Bullets Input (for content/checklist/title/cta) */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
                  Key Points / Bullets (One per line)
                </label>
                <textarea
                  rows={3}
                  value={activeSlide.bullets.join('\n')}
                  onChange={(e) => updateActiveSlide({ bullets: e.target.value.split('\n') })}
                  className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-medium leading-relaxed"
                  placeholder="Bullet 1&#10;Bullet 2&#10;Bullet 3"
                />
              </div>

            </div>
          )}

          {/* Export Text Script Action */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
            <span className="text-xs font-bold text-zinc-600">Export copy & captions for all {slides.length} slides</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => checkAndIncrementUsage(copyInstagramCaption)}
                className="px-3.5 py-2 rounded-xl bg-[#1A1510] text-[#FAF6EE] font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#2C2C2B] transition cursor-pointer border-none shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Caption
              </button>
              <button
                onClick={() => checkAndIncrementUsage(exportTextScript)}
                className="px-3.5 py-2 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#15803D] transition cursor-pointer border-none shadow"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Script
              </button>
            </div>
          </div>

        </div>

        {/* 4:5 Aspect Ratio Live Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" /> Live 4:5 Aspect Ratio Canvas
            </span>
            <span className="text-[10px] text-zinc-400 font-bold">1080 x 1350 px Format</span>
          </div>

          {/* Live Preview Container 4:5 Ratio */}
          <div 
            className={`aspect-[4/5] relative w-full rounded-3xl p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 border ${currentTheme.bg} ${fontClasses[fontFamily]}`}
          >
            {/* Top Bar: Author + Counter Badge */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-black ${currentTheme.badge}`}>
                  {authorHandle.charAt(1)?.toUpperCase() || 'C'}
                </span>
                <span className={`text-xs font-extrabold tracking-tight ${currentTheme.textHeadline}`}>
                  {authorHandle}
                </span>
              </div>

              {showBadge && (
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${currentTheme.badge}`}>
                  {previewSlideIndex + 1} / {slides.length}
                </span>
              )}
            </div>

            {/* Dynamic Slide Content Render */}
            <div className="my-auto space-y-4 z-10">
              
              {/* Title Slide */}
              {previewSlide.type === 'title' && (
                <div className="space-y-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${currentTheme.accent}`}>
                    INSTAGRAM CAROUSEL
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-black leading-tight ${currentTheme.textHeadline}`}>
                    {previewSlide.headline || 'Your Catchy Carousel Headline'}
                  </h3>
                  {previewSlide.subheadline && (
                    <p className={`text-xs md:text-sm font-medium leading-relaxed ${currentTheme.textSub}`}>
                      {previewSlide.subheadline}
                    </p>
                  )}
                  {previewSlide.bullets.filter(Boolean).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {previewSlide.bullets.filter(Boolean).map((b, i) => (
                        <span key={i} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${currentTheme.cardBg} ${currentTheme.textHeadline}`}>
                          ✦ {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Content Slide */}
              {previewSlide.type === 'content' && (
                <div className="space-y-4">
                  <h3 className={`text-xl md:text-2xl font-black leading-snug ${currentTheme.textHeadline}`}>
                    {previewSlide.headline || 'Content Slide Title'}
                  </h3>
                  {previewSlide.subheadline && (
                    <p className={`text-xs font-normal leading-relaxed ${currentTheme.textSub}`}>
                      {previewSlide.subheadline}
                    </p>
                  )}
                  {previewSlide.bullets.filter(Boolean).length > 0 && (
                    <div className="space-y-2 pt-1">
                      {previewSlide.bullets.filter(Boolean).map((b, i) => (
                        <div key={i} className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2.5 ${currentTheme.cardBg}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${currentTheme.badge}`}>
                            {i + 1}
                          </span>
                          <span className={currentTheme.textHeadline}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quote Slide */}
              {previewSlide.type === 'quote' && (
                <div className="space-y-4 text-center py-4">
                  <Quote className={`w-10 h-10 mx-auto opacity-40 ${currentTheme.swipe}`} />
                  <p className={`text-lg md:text-xl font-bold italic leading-relaxed ${currentTheme.textHeadline}`}>
                    "{previewSlide.headline || 'Quote text goes here...'}"
                  </p>
                  {previewSlide.subheadline && (
                    <p className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textSub}`}>
                      {previewSlide.subheadline}
                    </p>
                  )}
                </div>
              )}

              {/* Checklist Slide */}
              {previewSlide.type === 'checklist' && (
                <div className="space-y-4">
                  <h3 className={`text-xl font-black leading-snug ${currentTheme.textHeadline}`}>
                    {previewSlide.headline || 'Checklist Summary'}
                  </h3>
                  {previewSlide.subheadline && (
                    <p className={`text-xs font-medium ${currentTheme.textSub}`}>
                      {previewSlide.subheadline}
                    </p>
                  )}
                  <div className="space-y-2 pt-1">
                    {(previewSlide.bullets.filter(Boolean).length > 0
                      ? previewSlide.bullets.filter(Boolean)
                      : ['Action item 1', 'Action item 2', 'Action item 3']
                    ).map((item, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${currentTheme.cardBg}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 ${currentTheme.badge}`}>
                          ✓
                        </div>
                        <span className={currentTheme.textHeadline}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Slide */}
              {previewSlide.type === 'cta' && (
                <div className="space-y-5 text-center py-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${currentTheme.accent}`}>
                    TAKE ACTION NOW
                  </span>
                  <h3 className={`text-2xl font-black leading-tight ${currentTheme.textHeadline}`}>
                    {previewSlide.headline || 'Ready to Scale Your Results?'}
                  </h3>
                  {previewSlide.subheadline && (
                    <p className={`text-xs font-medium leading-relaxed ${currentTheme.textSub}`}>
                      {previewSlide.subheadline}
                    </p>
                  )}
                  <div className={`p-3.5 rounded-2xl border-2 text-center font-extrabold text-xs uppercase tracking-wider shadow-lg ${currentTheme.accent}`}>
                    Drop a Comment Below ➔
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Bar: Swipe Indicator */}
            <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10">
              <span className={`text-[10px] font-bold opacity-60 ${currentTheme.textHeadline}`}>
                cacto.ai
              </span>
              {showSwipe && (
                <span className={`text-xs font-black flex items-center gap-1 ${currentTheme.swipe}`}>
                  Swipe <ArrowRight className="w-3.5 h-3.5 inline" />
                </span>
              )}
            </div>

          </div>

          {/* Canvas Navigation Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 border border-zinc-200">
            <button
              onClick={() => {
                const prev = Math.max(0, previewSlideIndex - 1)
                setPreviewSlideIndex(prev)
                setActiveSlideIndex(prev)
              }}
              disabled={previewSlideIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPreviewSlideIndex(i)
                    setActiveSlideIndex(i)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition cursor-pointer border-none ${
                    previewSlideIndex === i ? 'bg-[#16A34A] scale-125' : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                const next = Math.min(slides.length - 1, previewSlideIndex + 1)
                setPreviewSlideIndex(next)
                setActiveSlideIndex(next)
              }}
              disabled={previewSlideIndex === slides.length - 1}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-white disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>

          {/* HD Export Action Toolbar */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => checkAndIncrementUsage(() => exportSingleSlidePNG(previewSlideIndex))}
              className="w-full py-3 px-4 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#2C2C2B] transition cursor-pointer border-none shadow-md"
            >
              <Download className="w-4 h-4 text-[#16A34A]" />
              Download Slide #{previewSlideIndex + 1} PNG (1080x1350 HD)
            </button>
            <button
              onClick={() => checkAndIncrementUsage(exportBatchDeckPNG)}
              disabled={isExportingBatch}
              className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#15803D] disabled:opacity-50 transition cursor-pointer border-none shadow-md"
            >
              <Download className="w-4 h-4" />
              {isExportingBatch ? 'Exporting All HD Slides...' : `Batch Export Full Deck (${slides.length} PNGs)`}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

function convertUnicode(text: string, style: 'boldSans' | 'boldSerif' | 'italicSans' | 'italicSerif' | 'script' | 'fraktur' | 'monospace' | 'strikethrough') {
  if (!text) return ''

  if (style === 'strikethrough') {
    return text.split('').map(char => char === '\n' ? '\n' : char + '\u0336').join('')
  }

  return text.split('').map(char => {
    const code = char.charCodeAt(0)

    if (style === 'boldSans') {
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + (code - 97))
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7EC + (code - 48))
    }
    
    if (style === 'boldSerif') {
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + (code - 97))
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7CE + (code - 48))
    }

    if (style === 'italicSans') {
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D608 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D622 + (code - 97))
      if (code >= 48 && code <= 57) return char
    }

    if (style === 'italicSerif') {
      if (code === 104) return 'ℎ'
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + (code - 97))
      if (code >= 48 && code <= 57) return char
    }

    if (style === 'script') {
      const scriptUpper: Record<number, string> = {
        66: 'ℬ', 69: 'ℰ', 70: 'ℱ', 72: 'ℋ', 73: 'ℐ', 76: 'ℒ', 77: 'ℳ', 82: 'ℛ'
      }
      const scriptLower: Record<number, string> = {
        101: 'ℯ', 103: 'ℊ', 111: 'ℴ'
      }
      if (code >= 65 && code <= 90) return scriptUpper[code] || String.fromCodePoint(0x1D49C + (code - 65))
      if (code >= 97 && code <= 122) return scriptLower[code] || String.fromCodePoint(0x1D4B6 + (code - 97))
    }

    if (style === 'fraktur') {
      const frakturUpper: Record<number, string> = {
        67: 'ℭ', 72: 'ℌ', 73: 'ℑ', 82: 'ℜ', 90: 'ℨ'
      }
      if (code >= 65 && code <= 90) return frakturUpper[code] || String.fromCodePoint(0x1D504 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D51E + (code - 97))
    }

    if (style === 'monospace') {
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D670 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D68A + (code - 97))
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7F6 + (code - 48))
    }

    return char
  }).join('')
}

function TextFormatter({ copyToClipboard, copiedText, checkAndIncrementUsage }: { copyToClipboard: (text: string) => void; copiedText: string | null; checkAndIncrementUsage: (action?: () => void) => boolean }) {
  const [inputText, setInputText] = useState('Transform your Instagram captions & bio with eye-catching fonts!')
  const [activeTab, setActiveTab] = useState<'all' | 'preview'>('all')

  const fontStyles: Array<{ id: string; name: string; styleKey: 'boldSans' | 'boldSerif' | 'italicSans' | 'italicSerif' | 'script' | 'fraktur' | 'monospace' | 'strikethrough'; example: string }> = [
    { id: 'bold-sans', name: 'Bold Sans', styleKey: 'boldSans', example: '𝟣𝟤𝟥 𝗔𝗕𝗖 𝗮b𝗰' },
    { id: 'bold-serif', name: 'Bold Serif', styleKey: 'boldSerif', example: '𝟏𝟐𝟑 𝐀𝐁𝐂 𝐚𝐛𝐜' },
    { id: 'italic-sans', name: 'Italic Sans', styleKey: 'italicSans', example: '𝘈𝘉𝘊 𝘢𝘣𝘤' },
    { id: 'italic-serif', name: 'Italic Serif', styleKey: 'italicSerif', example: '𝐴𝐵𝐶 𝑎𝑏c' },
    { id: 'script', name: 'Script', styleKey: 'script', example: '𝒜ℬ𝒞 𝒶𝒷𝒸' },
    { id: 'fraktur', name: 'Fraktur', styleKey: 'fraktur', example: '𝔄𝔅ℭ 𝔞𝔟𝔠' },
    { id: 'monospace', name: 'Monospace', styleKey: 'monospace', example: '𝙰𝙱𝙲 𝚊b𝚌' },
    { id: 'strikethrough', name: 'Strikethrough', styleKey: 'strikethrough', example: 'A̶B̶C̶' }
  ]

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
  const charCount = inputText.length

  return (
    <div className="space-y-8">
      {/* Input area */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
            Type or Paste Text to Convert
          </label>
          <div className="flex items-center gap-3 text-xs font-bold text-zinc-500">
            <span>{charCount} / 2,200 chars</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>
        </div>
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your caption, hook, or bio here..."
          className="w-full p-4 rounded-2xl border-2 border-[#1A1510] outline-none text-sm font-medium leading-relaxed bg-white focus:ring-2 focus:ring-[#16A34A]/20 transition shadow-sm"
        />
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border-none ${
            activeTab === 'all' ? 'bg-[#1A1510] text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          All 8 Unicode Styles
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border-none flex items-center gap-1.5 ${
            activeTab === 'preview' ? 'bg-[#1A1510] text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Live Caption Mockup
        </button>
      </div>

      {/* 8 Result Cards Grid */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fontStyles.map((item) => {
            const formatted = convertUnicode(inputText || 'Sample Text', item.styleKey)
            const isCopied = copiedText === formatted
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border-2 border-zinc-200 bg-white hover:border-[#1A1510] transition space-y-3 flex flex-col justify-between shadow-sm"
              >
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#1A1510] uppercase tracking-wide">{item.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">({item.example})</span>
                  </div>
                  <button
                    onClick={() => checkAndIncrementUsage(() => copyToClipboard(formatted))}
                    className={`px-3 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 transition cursor-pointer border-none ${
                      isCopied
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-[#16A34A] hover:text-white'
                    }`}
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-sm leading-relaxed whitespace-pre-wrap font-normal min-h-[60px] max-h-40 overflow-y-auto">
                  {formatted || <span className="text-zinc-300 italic">Enter text above...</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Caption Mockup Preview Container */}
      {activeTab === 'preview' && (
        <div className="max-w-md mx-auto p-4 rounded-3xl border-2 border-[#1A1510] bg-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-pink-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black text-zinc-800">
                  C
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-zinc-900 leading-tight">cacto_growth</p>
                <p className="text-[9px] text-zinc-400 font-bold">Original Audio</p>
              </div>
            </div>
            <div className="text-zinc-400 font-bold text-xs">•••</div>
          </div>

          {/* Post Card Image Mockup */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-900 via-emerald-950 to-zinc-900 text-white p-6 flex flex-col justify-center items-center text-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#16A34A] animate-pulse" />
            <p className="text-lg font-black tracking-tight leading-snug">
              {convertUnicode(inputText || 'Your Formatted Hook', 'boldSans')}
            </p>
            <p className="text-xs text-emerald-300 font-medium">
              Swipe for full guide ➔
            </p>
          </div>

          {/* Caption Text Render */}
          <div className="space-y-2 text-xs text-zinc-800">
            <p className="leading-relaxed">
              <span className="font-black mr-2">cacto_growth</span>
              {convertUnicode(inputText || 'Your formatted text will display here in real time.', 'boldSans')}
            </p>
            <p className="text-[10px] text-zinc-400 font-bold uppercase">2 HOURS AGO</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileFeedback({ copyToClipboard, copiedText, checkAndIncrementUsage }: { copyToClipboard: (text: string) => void; copiedText: string | null; checkAndIncrementUsage: (action?: () => void) => boolean }) {
  const [handle, setHandle] = useState('alex_coaching')
  const [bioText, setBioText] = useState('Helping coaches scale to $10k/mo with automated systems. 🎁 DM "SCALE" for free guide!')
  const [bioLink, setBioLink] = useState('https://cacto.ai/coaching-blueprint')
  const [niche, setNiche] = useState('Coaching')

  // Sanitize handle
  const cleanHandle = handle.replace(/^@/, '').trim()

  // 1. Handle Readability (20 pts)
  let handleScore = 20
  if (cleanHandle.length > 15) handleScore -= 5
  if (cleanHandle.length > 25) handleScore -= 5
  const numberCount = (cleanHandle.match(/\d/g) || []).length
  if (numberCount > 0) handleScore -= Math.min(6, numberCount * 3)
  const symbolCount = (cleanHandle.match(/[_.]/g) || []).length
  if (symbolCount > 1) handleScore -= Math.min(6, (symbolCount - 1) * 3)
  handleScore = Math.max(5, Math.min(20, handleScore))

  // 2. Bio Hook Clarity (30 pts)
  let bioHookScore = 5
  const bioLen = bioText.length
  if (bioLen >= 40 && bioLen <= 150) bioHookScore += 10
  else if (bioLen > 0) bioHookScore += 5

  const lines = bioText.split('\n').filter(Boolean)
  if (lines.length >= 2) bioHookScore += 5

  const hasEmoji = /\p{Extended_Pictographic}/u.test(bioText)
  if (hasEmoji) bioHookScore += 5

  const benefitVerbs = ['help', 'scale', 'build', 'grow', 'learn', 'transform', 'boost', 'generate', 'turn', 'make', 'double']
  const hasValueVerb = benefitVerbs.some(v => bioText.toLowerCase().includes(v))
  if (hasValueVerb) bioHookScore += 10

  bioHookScore = Math.max(5, Math.min(30, bioHookScore))

  // 3. CTA Link Friction (25 pts)
  let ctaScore = 5
  if (bioLink.trim()) {
    ctaScore += 10
    const lowerLink = bioLink.toLowerCase()
    if (lowerLink.includes('linktr.ee') || lowerLink.includes('bio.link') || lowerLink.includes('beacons.ai')) {
      ctaScore += 4
    } else if (lowerLink.includes('cacto') || lowerLink.includes('checkout') || lowerLink.includes('blueprint')) {
      ctaScore += 10
    } else {
      ctaScore += 7
    }
  }

  const ctaWords = ['comment', 'dm', 'link', 'below', 'download', 'claim', '👇', 'click', 'get', 'grab']
  const hasCtaWord = ctaWords.some(w => bioText.toLowerCase().includes(w))
  if (hasCtaWord) ctaScore += 5

  ctaScore = Math.max(5, Math.min(25, ctaScore))

  // 4. Niche Keyword Density (25 pts)
  const nicheKeywords: Record<string, string[]> = {
    Coaching: ['coach', 'mentor', 'client', 'training', 'help', 'course', 'scale', 'mindset', 'strategy', 'results'],
    ECommerce: ['store', 'brand', 'shop', 'product', 'ship', 'sale', 'order', 'ecommerce', 'apparel', 'deals'],
    Agency: ['agency', 'leads', 'b2b', 'marketing', 'growth', 'scale', 'roi', 'services', 'funnel', 'clients'],
    Tech: ['saas', 'software', 'code', 'app', 'tech', 'ai', 'developer', 'automation', 'tools', 'platform'],
    Beauty: ['skin', 'beauty', 'hair', 'glow', 'care', 'cosmetics', 'salon', 'style', 'aesthetic', 'routine'],
    Creator: ['creator', 'content', 'reels', 'youtube', 'community', 'tips', 'daily', 'build', 'podcast', 'video']
  }

  const currentNicheTerms = nicheKeywords[niche] || nicheKeywords['Coaching']
  const fullTextToSearch = (cleanHandle + ' ' + bioText).toLowerCase()
  const matchedTerms = currentNicheTerms.filter(term => fullTextToSearch.includes(term))

  let nicheScore = 5
  if (matchedTerms.length >= 3) nicheScore = 25
  else if (matchedTerms.length === 2) nicheScore = 20
  else if (matchedTerms.length === 1) nicheScore = 14

  // Overall Score (0-100)
  const overallScore = Math.round(handleScore + bioHookScore + ctaScore + nicheScore)

  // Status badge
  const scoreBadge = overallScore >= 85 
    ? { label: 'Excellent Funnel', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    : overallScore >= 70
      ? { label: 'Good Foundation', color: 'bg-blue-100 text-blue-800 border-blue-300' }
      : overallScore >= 50
        ? { label: 'Moderate Friction', color: 'bg-amber-100 text-amber-800 border-amber-300' }
        : { label: 'Needs Optimization', color: 'bg-rose-100 text-rose-800 border-rose-300' }

  // Strengths & Weaknesses
  const strengths: string[] = []
  const weaknesses: string[] = []

  if (handleScore >= 16) strengths.push('Clean & readable username handle')
  else weaknesses.push('Handle contains excess numbers or underscores')

  if (bioHookScore >= 24) strengths.push('Clear bio hook with strong value verb')
  else weaknesses.push('Bio lacks clear value hook or multi-line formatting')

  if (ctaScore >= 20) strengths.push('Low friction CTA & direct destination link')
  else weaknesses.push('High CTA friction (missing link or multi-choice linktree)')

  if (nicheScore >= 20) strengths.push(`High density of ${niche} niche keywords`)
  else weaknesses.push(`Low density of ${niche} search keywords in bio copy`)

  // AI Copy Recommendations
  const suggestedBio = `⚡ ${niche} Specialist | Helping ${niche.toLowerCase()} pros ${matchedTerms[0] ? matchedTerms[0] + ' & grow' : 'scale results'}\n🔥 Practical systems & actionable growth frameworks\n👇 Comment "BLUEPRINT" below or click to claim free guide!`
  
  const handleTip = handleScore >= 18
    ? `Your handle @${cleanHandle} is clean, short, and highly search-friendly.`
    : `Consider shortening @${cleanHandle} and removing trailing numbers or multiple dots to boost searchability.`

  const ctaTip = ctaScore >= 20
    ? `Your bio CTA is direct. Pair it with Cacto comment-to-DM automation for 3x higher click rates.`
    : `Direct visitors to comment a single keyword on your Reels instead of sending them to third-party link trees.`

  // SVG Gauge calculations
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (overallScore / 100) * circumference

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-50/70 p-6 rounded-2xl border border-zinc-200">
        <div className="space-y-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Instagram Handle</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@username"
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Niche Category</label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
          >
            <option value="Coaching">Coaching / Education</option>
            <option value="ECommerce">E-Commerce & Brands</option>
            <option value="Agency">Agency & B2B Services</option>
            <option value="Tech">Tech & SaaS Software</option>
            <option value="Beauty">Beauty & Lifestyle</option>
            <option value="Creator">Content Creator & Influencer</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Bio Text Copy</label>
          <textarea
            rows={3}
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Enter your profile bio text..."
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-medium bg-white leading-relaxed"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Bio Link URL</label>
          <input
            type="text"
            value={bioLink}
            onChange={(e) => setBioLink(e.target.value)}
            placeholder="https://yourwebsite.com or https://cacto.ai/..."
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white"
          />
        </div>
      </div>

      {/* Audit Gauge & Vector Scores Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl border-2 border-[#1A1510] bg-white shadow-md">
        {/* Gauge (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3 text-center border-b md:border-b-0 md:border-r border-zinc-200 pb-6 md:pb-0 md:pr-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-zinc-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#16A34A] transition-all duration-700 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-serif font-black text-[#1A1510]">{overallScore}</span>
              <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">OUT OF 100</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border tracking-wider ${scoreBadge.color}`}>
            {scoreBadge.label}
          </span>
        </div>

        {/* 4 Vector Breakdown Bars (8 cols) */}
        <div className="md:col-span-8 space-y-4">
          <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider">Multi-Vector Optimization Scoring</h3>
          
          {/* Vector 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-extrabold">
              <span>Handle Readability</span>
              <span className="text-[#16A34A]">{handleScore} / 20 pts</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full transition-all duration-500" style={{ width: `${(handleScore / 20) * 100}%` }} />
            </div>
          </div>

          {/* Vector 2 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-extrabold">
              <span>Bio Hook Clarity</span>
              <span className="text-[#16A34A]">{bioHookScore} / 30 pts</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full transition-all duration-500" style={{ width: `${(bioHookScore / 30) * 100}%` }} />
            </div>
          </div>

          {/* Vector 3 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-extrabold">
              <span>CTA Link Friction</span>
              <span className="text-[#16A34A]">{ctaScore} / 25 pts</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full transition-all duration-500" style={{ width: `${(ctaScore / 25) * 100}%` }} />
            </div>
          </div>

          {/* Vector 4 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-extrabold">
              <span>Niche Keyword Density ({niche})</span>
              <span className="text-[#16A34A]">{nicheScore} / 25 pts</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full transition-all duration-500" style={{ width: `${(nicheScore / 25) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Key Profile Strengths ({strengths.length})
          </div>
          <div className="space-y-2">
            {strengths.map((item, i) => (
              <span key={i} className="inline-block mr-2 mb-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-extrabold">
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/50 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
            <Info className="w-4 h-4 text-amber-600" /> Optimization Areas ({weaknesses.length})
          </div>
          <div className="space-y-2">
            {weaknesses.length > 0 ? (
              weaknesses.map((item, i) => (
                <span key={i} className="inline-block mr-2 mb-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 text-xs font-extrabold">
                  ⚠ {item}
                </span>
              ))
            ) : (
              <p className="text-xs font-bold text-emerald-700">No major weaknesses detected!</p>
            )}
          </div>
        </div>
      </div>

      {/* Actionable Copy Recommendations */}
      <div className="p-6 rounded-2xl border-2 border-[#1A1510] bg-white space-y-5 shadow-sm">
        <h3 className="text-xs font-black uppercase text-[#16A34A] tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> AI Recommendations & Optimized Copy Rewrite
        </h3>

        {/* Rewritten Bio */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Suggested High-Converting Bio Rewrite</span>
            <button
              onClick={() => checkAndIncrementUsage(() => copyToClipboard(suggestedBio))}
              className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 cursor-pointer border-none bg-transparent"
            >
              {copiedText === suggestedBio ? 'Copied!' : 'Copy Bio Rewrite'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-800">
            {suggestedBio}
          </pre>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Handle Searchability Tip</span>
            <p className="text-xs font-medium text-zinc-700 leading-relaxed">{handleTip}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">CTA & Funnel Tweak</span>
            <p className="text-xs font-medium text-zinc-700 leading-relaxed">{ctaTip}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClaudeSkills({ copyToClipboard, copiedText, checkAndIncrementUsage }: { copyToClipboard: (text: string) => void; copiedText: string | null; checkAndIncrementUsage: (action?: () => void) => boolean }) {
  const [niche, setNiche] = useState<'E-commerce' | 'Coaching' | 'Personal Brand' | 'Agency'>('Coaching')
  const [strategy, setStrategy] = useState<'Lead Magnet' | 'Cart Recovery' | 'Call Booking'>('Lead Magnet')

  const generateSkillContent = () => {
    const slugifiedNiche = niche.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const slugifiedStrategy = strategy.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const skillName = `cacto-automation-${slugifiedNiche}-${slugifiedStrategy}`

    let triggerKeywords = ['GUIDE', 'PLAYBOOK', 'CHATS', 'ACCESS']
    let primaryGoal = 'Capture email leads by delivering high-value PDF/Notion resource directly in Instagram DMs.'
    let dmScriptSample = `Hey {first_name}! 🌵 Here is your instant access to the ${niche} Growth Playbook. Tap below to download PDF:`
    let rotatorReplies = [
      'Sent the guide straight to your DMs! 📩',
      'Check your inbox! The PDF is ready 🚀',
      'Just sent your download link over! 📥',
      'Guide delivered! Check your DMs 🎁',
      'Check your messages! Happy building ✨'
    ]
    let buttonLabel = 'Download Free Asset 📥'

    if (strategy === 'Cart Recovery') {
      triggerKeywords = ['CART', 'DEAL', 'RECOVER', 'SAVE']
      primaryGoal = `Re-engage abandoned carts or incomplete purchases for ${niche} with instant discount triggers in DMs.`
      dmScriptSample = `Hey {first_name}! Noticed you left items in your cart. Here is an exclusive 15% VIP discount code valid for 2 hours:`
      rotatorReplies = [
        'Sent your VIP coupon code in DMs! 🛒',
        'Check your inbox for your cart discount code! 💥',
        'DMed you the recovery link + bonus discount! 📩',
        'Check your DMs! Your cart deal is inside 🎁',
        "Messaged you! Don't miss out on the offer ⚡"
      ]
      buttonLabel = 'Claim 15% Off Cart 🛒'
    } else if (strategy === 'Call Booking') {
      triggerKeywords = ['BOOK', 'SCALE', 'AUDIT', 'CALL']
      primaryGoal = `Qualify prospects and route high-intent leads to calendar booking link inside DM chat.`
      dmScriptSample = `Hey {first_name}! Excited to connect. Click below to pick a 15-min strategy call slot on my calendar:`
      rotatorReplies = [
        'Sent my booking link to your DMs! 🗓️',
        'Check your inbox! Grab a time on my calendar 🚀',
        'DMed you the strategy call booking link! 📩',
        "Check your messages! Let's map out your plan 🎯",
        'Sent over! Pick a slot that works best for you ⚡'
      ]
      buttonLabel = 'Book Strategy Call 🗓️'
    }

    return `---
name: ${skillName}
description: Production-ready Claude AI Agent skill for ${niche} creators implementing ${strategy} automations and comment rotators on Instagram.
---

# Cacto ${niche} ${strategy} Skill & Comment Rotator Rules

This skill defines execution rules, comment rotators, and DM trigger sequences for **${niche}** creators utilizing **${strategy}** automations via Cacto.

---

## 🎯 Primary Conversion Objective
- **Target Audience:** ${niche}
- **Strategy Focus:** ${strategy}
- **Objective:** ${primaryGoal}
- **Target Trigger Keywords:** \`${triggerKeywords.join('`, `')}\`

---

## 💬 Instagram Comment Rotator Rules
To comply with Meta API safety guidelines and prevent rate-limiting or spam flags, automated comment replies MUST rotate across these 5 templates:

1. "${rotatorReplies[0]}"
2. "${rotatorReplies[1]}"
3. "${rotatorReplies[2]}"
4. "${rotatorReplies[3]}"
5. "${rotatorReplies[4]}"

*Rule: Never output identical comment replies consecutively on the same post.*

---

## 📩 Automated Direct Message (DM) Sequence
When a user comments any target keyword (\`${triggerKeywords.join('`, `')}\`), deliver the following structured message flow:

### Step 1: Initial DM Greeting & Value Pitch
> "${dmScriptSample}"

### Step 2: Interactive CTA Button
- **Button Label:** ${buttonLabel}
- **Action Type:** Open URL / Deep Link

---

## 🔒 Safety & Compliance Guardrails
- **Double Opt-in:** Validate user interaction prior to sending multi-message follow-ups.
- **Message Rate Cap:** Max 1 automated DM trigger per user per 24-hour window.
- **Privacy Assurance:** Do not request sensitive passwords or financial credentials inside chat bubbles.
`
  }

  const skillContent = generateSkillContent()

  const handleDownloadMd = () => {
    const blob = new Blob([skillContent], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SKILL.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Select Creator Niche */}
        <div className="space-y-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
            Select Creator Niche
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value as any)}
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white cursor-pointer"
          >
            <option value="Coaching">Coaching / Education</option>
            <option value="E-commerce">E-commerce / Retail</option>
            <option value="Personal Brand">Personal Brand / Creator</option>
            <option value="Agency">Agency / B2B Services</option>
          </select>
        </div>

        {/* Select DM Automation Strategy */}
        <div className="space-y-2">
          <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
            Select DM Automation Strategy
          </label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as any)}
            className="w-full p-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold bg-white cursor-pointer"
          >
            <option value="Lead Magnet">Lead Magnet Delivery</option>
            <option value="Cart Recovery">Cart Recovery & VIP Discount</option>
            <option value="Call Booking">Call Booking & Qualification</option>
          </select>
        </div>
      </div>

      {/* Generated Output Block */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div>
            <span className="text-[10px] text-[#16A34A] font-black uppercase tracking-wider block">
              YAML Frontmatter & Guidelines Output
            </span>
            <p className="text-xs font-bold text-zinc-800">Production-Ready SKILL.md Document</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => checkAndIncrementUsage(() => copyToClipboard(skillContent))}
              className="px-3 py-2 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs hover:bg-[#15803D] transition flex items-center gap-1.5 cursor-pointer border-none shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedText === skillContent ? 'Copied SKILL.md!' : '1-Click Copy SKILL.md'}
            </button>
            <button
              onClick={() => checkAndIncrementUsage(handleDownloadMd)}
              className="px-3 py-2 rounded-xl bg-[#1A1510] text-white font-extrabold text-xs hover:bg-[#2C2C2B] transition flex items-center gap-1.5 cursor-pointer border-none shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#16A34A]" />
              Download .md File
            </button>
          </div>
        </div>

        <pre className="p-5 rounded-2xl bg-[#1A1510] text-[#E6F4EA] border border-zinc-800 text-xs font-mono leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
          {skillContent}
        </pre>
      </div>
    </div>
  )
}

function PostBooster({ copyToClipboard, copiedText, checkAndIncrementUsage }: { copyToClipboard: (text: string) => void; copiedText: string | null; checkAndIncrementUsage: (action?: () => void) => boolean }) {
  const [draft, setDraft] = useState(
    "I was struggling to get sales from my Instagram posts until I stopped linking in my bio and started telling people to comment a keyword. In 30 days my DM open rate jumped by 400% and I made $12k in automated sales."
  )

  const generateHookFirst = () => {
    if (!draft.trim()) return "Please enter a rough draft or transcript above..."
    return `🔥 STOP DOING THIS ON INSTAGRAM (Do this instead):

${draft.trim()}

Most creators make the mistake of relying on outdated tactics that scrollers ignore. By making one simple change to your caption structure, you trigger instant algorithm distribution.

👇 Comment "BOOST" below and I'll DM you the exact step-by-step framework right now!`
  }

  const generateEpiphanyBridge = () => {
    if (!draft.trim()) return "Please enter a rough draft or transcript above..."
    return `I used to think traditional Instagram posting was enough to make consistent sales.

The Problem: I was spending hours creating content, but my conversions were stuck near zero and scrollers kept bouncing.

The Turning Point: ${draft.trim()}

The Solution: Stop friction-heavy bio links and switch to automated DM delivery triggers. It reaches scrollers when their intent is highest.

💬 Comment "STORY" below to get the complete breakdown sent straight to your DMs!`
  }

  const generateHighDwellDeck = () => {
    if (!draft.trim()) return "Please enter a rough draft or transcript above..."
    const snippet = draft.trim().slice(0, 80) + (draft.length > 80 ? '...' : '')
    return `5 Rules for High-Converting Instagram Posts 📈

1️⃣ Lead with an impossible-to-ignore hook line.
2️⃣ ${snippet}
3️⃣ Keep paragraph length under 3 lines for mobile readability.
4️⃣ Use clean line breaks to maximize viewer dwell time.
5️⃣ Place a single keyword trigger in your final call-to-action.

Which of these 5 are you testing on your next Reel?

👇 Comment "DECK" below to get our free 1-click post booster templates in your DMs!`
  }

  const framework1 = generateHookFirst()
  const framework2 = generateEpiphanyBridge()
  const framework3 = generateHighDwellDeck()

  return (
    <div className="space-y-8">
      {/* Input box */}
      <div className="space-y-3">
        <label className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">
          Paste Your Rough Draft or Video Transcript
        </label>
        <textarea
          rows={4}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type or paste your rough post ideas, audio transcript, or draft copy here..."
          className="w-full p-4 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold leading-relaxed resize-y focus:border-[#16A34A] transition bg-white"
        />
        <p className="text-[11px] text-zinc-500 font-semibold">
          💡 Our engine transforms your unedited text into 3 viral Instagram frameworks instantly.
        </p>
      </div>

      {/* 3 Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Hook-First */}
        <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-4 flex flex-col justify-between" style={{ boxShadow: '4px 4px 0 #1A1510' }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-[10px] font-black uppercase tracking-wider">
                01. Hook-First Framework
              </span>
              <button
                onClick={() => checkAndIncrementUsage(() => copyToClipboard(framework1))}
                className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedText === framework1 ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-white border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-800 max-h-80 overflow-y-auto">
              {framework1}
            </pre>
          </div>
        </div>

        {/* Card 2: Epiphany Bridge */}
        <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-4 flex flex-col justify-between" style={{ boxShadow: '4px 4px 0 #1A1510' }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-[10px] font-black uppercase tracking-wider">
                02. Epiphany Bridge
              </span>
              <button
                onClick={() => checkAndIncrementUsage(() => copyToClipboard(framework2))}
                className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedText === framework2 ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-white border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-800 max-h-80 overflow-y-auto">
              {framework2}
            </pre>
          </div>
        </div>

        {/* Card 3: High-Dwell Deck */}
        <div className="p-6 rounded-2xl bg-zinc-50 border-2 border-[#1A1510] space-y-4 flex flex-col justify-between" style={{ boxShadow: '4px 4px 0 #1A1510' }}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-[10px] font-black uppercase tracking-wider">
                03. High-Dwell Deck
              </span>
              <button
                onClick={() => checkAndIncrementUsage(() => copyToClipboard(framework3))}
                className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] transition flex items-center gap-1 cursor-pointer border-none bg-transparent"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedText === framework3 ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-white border border-zinc-200 text-xs font-semibold leading-relaxed whitespace-pre-wrap font-sans text-zinc-800 max-h-80 overflow-y-auto">
              {framework3}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}



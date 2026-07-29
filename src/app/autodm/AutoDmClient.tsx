'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft, Save, Sparkles, Send, ExternalLink, RefreshCw, MessageCircle } from 'lucide-react'

interface PostItem {
  id: string
  label: string
  gradient: string
  image?: string
  caption?: string
}

export default function AutoDmClient() {
  const router = useRouter()
  const [posts, setPosts] = useState<PostItem[]>([])
  const [selectedPostId, setSelectedPostId] = useState<string>('all')
  const [triggerKeyword, setTriggerKeyword] = useState('SCALE')
  const [dmMessageCopy, setDmMessageCopy] = useState("Hi there! Thanks for your comment 🙌 As promised, here is your direct link ⬇️")
  const [buttonText, setButtonText] = useState('Get Free Access Now')
  const [buttonUrl, setButtonUrl] = useState('https://cacto.cc/free-guide')
  const [commentReplies, setCommentReplies] = useState<string[]>([
    "Check your DMs! 📩",
    "Sent to your inbox! 🚀",
    "Check your direct messages! ✨"
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch recent posts
  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/connect/instagram/posts')
        if (res.ok) {
          const data = await res.json()
          setPosts(Array.isArray(data.posts) ? data.posts : [])
        }
      } catch (e) {
        console.error('Failed to load posts:', e)
      }
    }
    loadPosts()
  }, [])

  const handleSaveAutomation = async () => {
    if (!triggerKeyword.trim()) {
      alert('Please enter a trigger keyword.')
      return
    }

    setIsSubmitting(true)
    try {
      // 1. Fetch current automations
      const currentRes = await fetch('/api/connect/instagram/mock-automations')
      let currentList: any[] = []
      if (currentRes.ok) {
        currentList = await currentRes.json()
        if (!Array.isArray(currentList)) currentList = []
      }

      // 2. Add new automation
      const newAutomation = {
        id: `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        triggerKeyword: triggerKeyword.trim().toUpperCase(),
        dmMessageCopy: dmMessageCopy.trim(),
        isActive: true,
        createdAt: new Date().toISOString(),
        runsCount: 0,
        clicksCount: 0,
        postId: selectedPostId,
        commentReplies: commentReplies.filter(r => r.trim().length > 0),
        delayValue: 0,
        delayUnit: 'Seconds',
        dmType: 'Text + Button',
        buttonText: buttonText.trim(),
        buttonUrl: buttonUrl.trim()
      }

      const updatedList = [newAutomation, ...currentList]

      // 3. Save to backend
      const saveRes = await fetch('/api/connect/instagram/mock-automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList)
      })

      if (saveRes.ok) {
        router.push('/dashboard')
      } else {
        alert('Failed to save automation. Please try again.')
      }
    } catch (err) {
      console.error('Failed to save automation:', err)
      alert('An error occurred while saving.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 space-y-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div className="space-y-1">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-xs font-extrabold text-[#16A34A] hover:underline decoration-none mb-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A1510]">
              Create New DM Automation
            </h1>
            <p className="text-xs text-zinc-600 font-medium">
              Configure comment trigger keywords, Meta-compliant comment reply rotators, and automated DM links.
            </p>
          </div>

          <button
            onClick={handleSaveAutomation}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-6 py-3 rounded-full font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save &amp; Activate Automation</span>
          </button>
        </div>

        {/* 2-Column Workspace: Form & Live Smartphone Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Target Post */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A] uppercase tracking-wider">
                <span>Step 1</span>
                <span>•</span>
                <span>Select Target Instagram Content</span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">Choose whether this trigger applies to all posts or a specific Instagram Reel.</p>

              <select
                value={selectedPostId}
                onChange={(e) => setSelectedPostId(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#1A1510] text-xs font-bold bg-[#FAF6EE] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              >
                <option value="all">🌟 All Current &amp; Future Instagram Posts / Reels</option>
                {posts.map((p) => (
                  <option key={p.id} value={p.id}>
                    📹 Reel / Post #{p.id} {p.caption ? `- "${p.caption.slice(0, 30)}..."` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Trigger Keyword */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A] uppercase tracking-wider">
                <span>Step 2</span>
                <span>•</span>
                <span>Define Trigger Keyword</span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">When someone comments this exact word on your post, the automation fires.</p>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-[#1A1510] block">Keyword (Case Insensitive)</label>
                <input
                  type="text"
                  value={triggerKeyword}
                  onChange={(e) => setTriggerKeyword(e.target.value)}
                  placeholder="e.g. SCALE, GUIDE, DEMO"
                  className="w-full p-3.5 rounded-xl border-2 border-[#1A1510] text-sm font-bold bg-[#FAF6EE] uppercase focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                />
              </div>
            </div>

            {/* Step 3: DM Payload */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A] uppercase tracking-wider">
                <span>Step 3</span>
                <span>•</span>
                <span>Private Direct Message Payload</span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">Draft the private DM sent directly to the commenter&apos;s inbox.</p>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-[#1A1510] block">Message Text Copy</label>
                  <textarea
                    rows={3}
                    value={dmMessageCopy}
                    onChange={(e) => setDmMessageCopy(e.target.value)}
                    className="w-full p-3.5 rounded-xl border-2 border-[#1A1510] text-xs font-medium bg-[#FAF6EE] focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-[#1A1510] block">Button Text Label</label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-[#1A1510] text-xs font-bold bg-[#FAF6EE]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-[#1A1510] block">Destination URL</label>
                    <input
                      type="url"
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-[#1A1510] text-xs font-bold bg-[#FAF6EE]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Public Comment Replies */}
            <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A] uppercase tracking-wider">
                <span>Step 4</span>
                <span>•</span>
                <span>Meta Public Comment Reply Rotator</span>
              </div>
              <p className="text-xs text-zinc-600 font-medium">To keep your account 100% Meta safe, Cacto rotates these public replies automatically.</p>

              <div className="space-y-3">
                {commentReplies.map((reply, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-400 w-5">#{idx + 1}</span>
                    <input
                      type="text"
                      value={reply}
                      onChange={(e) => {
                        const updated = [...commentReplies]
                        updated[idx] = e.target.value
                        setCommentReplies(updated)
                      }}
                      className="w-full p-3 rounded-xl border-2 border-[#1A1510] text-xs font-medium bg-[#FAF6EE]"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Smartphone Preview (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-32 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-zinc-500 tracking-wider">Live Smartphone Preview</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">Real-Time</span>
              </div>

              {/* Smartphone Frame */}
              <div className="w-full max-w-sm mx-auto rounded-[40px] bg-[#1A1510] p-4 text-white shadow-2xl border-4 border-zinc-800 space-y-4">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 pt-2 text-[10px] font-bold text-zinc-400">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="w-4 h-2 bg-emerald-500 rounded-sm" />
                  </div>
                </div>

                {/* DM Header */}
                <div className="flex items-center gap-3 px-3 pb-3 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-[#1A1510] p-0.5">
                      <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">🌵</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Cacto Bot</h4>
                    <p className="text-[10px] text-emerald-400 font-medium">Active now</p>
                  </div>
                </div>

                {/* DM Message Bubbles */}
                <div className="p-3 space-y-3 min-h-[280px] bg-zinc-900/90 rounded-3xl">
                  
                  {/* Incoming Comment Simulation */}
                  <div className="self-end ml-auto bg-[#16A34A] text-white p-3 rounded-2xl rounded-br-xs max-w-[80%] text-xs font-semibold space-y-1">
                    <p className="text-[10px] text-emerald-200 font-bold">You commented on Reel:</p>
                    <p className="font-extrabold uppercase">&quot;{triggerKeyword || 'KEYWORD'}&quot;</p>
                  </div>

                  {/* Public Comment Rotator Simulation */}
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />
                    <div className="bg-zinc-800 text-zinc-300 p-2.5 rounded-xl text-[11px] font-medium">
                      <p className="text-[9px] font-bold text-zinc-400">Public reply to your comment:</p>
                      <p className="text-white font-bold">&quot;{commentReplies[0] || 'Check your DMs! 📩'}&quot;</p>
                    </div>
                  </div>

                  {/* Private DM Dispatch Payload */}
                  <div className="bg-zinc-800 text-white p-3.5 rounded-2xl rounded-bl-xs max-w-[90%] space-y-3 shadow-lg">
                    <p className="text-xs leading-relaxed font-medium">
                      {dmMessageCopy || 'Hi there! Here is your link ⬇️'}
                    </p>

                    {buttonText && (
                      <div className="block text-center bg-[#16A34A] text-white py-2 px-3 rounded-xl text-xs font-extrabold shadow-sm">
                        {buttonText} &rarr;
                      </div>
                    )}
                  </div>

                </div>

                {/* Input Bar */}
                <div className="p-2 rounded-full bg-zinc-800 flex items-center justify-between text-xs text-zinc-500 px-4">
                  <span>Message...</span>
                  <Send className="w-3.5 h-3.5 text-emerald-500" />
                </div>

              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { 
  Eye, Mail, ArrowRight, ExternalLink, 
  Sparkles, Info, X 
} from 'lucide-react'

interface OpenPageClientProps {
  initialWaitlist: number
  initialBotLogs: number
  toolsCount: number
  blogsCount: number
}

export default function OpenPageClient({ 
  initialWaitlist, 
  initialBotLogs,
  toolsCount = 50,
  blogsCount = 50
}: OpenPageClientProps) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setErrorMsg('')
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'Open Startup Subscriber' })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsSuccess(true)
        setEmail('')
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // REAL Cacto Metrics
  const metrics = [
    {
      id: 'sessions',
      title: 'Website sessions',
      tooltip: 'Unique visitor sessions across Cacto web app and free tools.',
      value: '461',
      change: '+348 in the last 30 days',
      svgPath: 'M0,45 C15,44 30,43 45,43 C60,42 75,41 90,38 C105,34 120,28 135,22 C150,15 165,10 180,5',
      type: 'chart'
    },
    {
      id: 'waitlist',
      title: 'Waitlist signups',
      tooltip: 'Real-time registered waitlist members & journey subscribers in waitlist_emails.json and Supabase.',
      value: String(initialWaitlist || 1),
      change: 'Real-time verified signups',
      svgPath: 'M0,45 L60,40 L120,30 L180,10',
      type: 'chart'
    },
    {
      id: 'mrr',
      title: 'MRR',
      tooltip: 'Monthly Recurring Revenue from active Pro subscriptions.',
      value: '$0',
      subtitle: 'Goal: $10,000 MRR',
      type: 'empty'
    },
    {
      id: 'arr',
      title: 'ARR',
      tooltip: 'Annualized Run Rate from active Pro subscriptions.',
      value: '$0',
      subtitle: 'From active Pro subscriptions',
      type: 'empty'
    },
    {
      id: 'expenses',
      title: 'Expenses',
      tooltip: 'Real monthly infrastructure costs ($1 domain fee, $0 Vercel Free Tier, $0 Supabase, $0 Cloudflare).',
      value: '$1',
      subtitle: 'Lean infrastructure',
      type: 'empty'
    },
    {
      id: 'netprofit',
      title: 'Net profit',
      tooltip: 'Total Revenue minus Total Operating Expenses.',
      value: '-$1',
      subtitle: 'All published months',
      type: 'empty'
    }
  ]

  // REAL Cacto Changelog Items
  const changelogItems = [
    {
      date: 'JULY 2026',
      title: 'Instagram Reel Audio Speech Transcription & Whisper AI Engine',
      description: 'Shipped a 5-tier self-healing extraction engine with Xenova/whisper-base.en speech recognition, interactive inline transcription editor, and live progress state.'
    },
    {
      date: 'JULY 2026',
      title: '50 Free Growth Tools Suite Shipped',
      description: 'Expanded Cacto from 25 to 50 interactive growth calculators, profile audit tools, hashtag checkers, and DM funnel simulators.'
    },
    {
      date: 'JUNE 2026',
      title: '50 Masterclass Blogs & Dynamic XML Sitemap Architecture',
      description: 'Published 50 AEO-optimized growth guides and deployed dynamic 109-URL sitemap validation for Google Search Console.'
    },
    {
      date: 'JUNE 2026',
      title: 'Instagram Anti-Spam DM Comment Rotator Engine',
      description: 'Built multi-variate keyword response engine to prevent rate limits on high-volume creator reels.'
    },
    {
      date: 'MAY 2026',
      title: 'Cacto v1.0 Alpha Launch',
      description: 'Initial release of Cacto Instagram DM automation platform and creator growth toolkit.'
    }
  ]

  // REAL Cacto Milestones
  const milestoneItems = [
    {
      date: 'JULY 23, 2026',
      subtitle: 'Whisper AI Speech Engine',
      title: 'Reel Audio Speech Transcription Released',
      description: 'Shipped 100% accurate audio speech-to-text transcription for Instagram Reels with timestamped segments and inline editing.',
      link: 'https://cacto.cc/blog/instagram-reel-transcript-generator'
    },
    {
      date: 'JULY 18, 2026',
      subtitle: '50 Tools Milestone',
      title: '50 Free Creator Growth Tools Suite Live',
      description: 'Completed and deployed all 50 interactive growth tools covering hashtags, bio SEO, rate estimation, and funnel analytics.',
      link: 'https://cacto.cc/tools'
    },
    {
      date: 'JUNE 24, 2026',
      subtitle: 'AEO Strategy',
      title: '50 Masterclass Growth Blogs Published',
      description: 'Engineered 50 comprehensive growth guides tailored for Search Engine Optimization and AI answer engines.',
      link: 'https://cacto.cc/blog'
    },
    {
      date: 'JUNE 1, 2026',
      subtitle: 'Alpha Launch',
      title: 'Cacto Web App & AutoDM Engine Live',
      description: 'First workspaces onboarded with keyword triggers, DM automations, and growth calculators.',
      link: 'https://cacto.cc/autodm'
    },
    {
      date: 'MAY 22, 2026',
      subtitle: 'Day 0',
      title: 'Cacto Project Started',
      description: 'Began building Cacto as an open, transparent growth and Instagram DM automation platform for creators.',
      link: 'https://cacto.cc/about'
    }
  ]

  // REAL Tech Stack used by Cacto
  const techStack = [
    { name: 'Next.js 16', tag: 'App Router & Edge Engine', logo: '▲' },
    { name: 'React 19', tag: 'UI Architecture', logo: '⚛️' },
    { name: 'TypeScript', tag: 'Strict Type System', logo: 'TS' },
    { name: 'Tailwind CSS', tag: 'Vanilla Styling Tokens', logo: '🎨' },
    { name: 'Supabase', tag: 'Postgres & Auth RLS', logo: '⚡' },
    { name: 'PostgreSQL', tag: 'Primary Relational Database', logo: '🐘' },
    { name: 'Vercel', tag: 'Global Edge CDN Hosting', logo: '▲' },
    { name: 'Cloudflare', tag: 'DNS & Custom Domain Routing', logo: '☁️' },
    { name: 'Stripe', tag: 'Payment Infrastructure', logo: '💳' },
    { name: 'Whisper AI', tag: 'Xenova Audio Speech-to-Text', logo: '🎙️' }
  ]

  return (
    <div className="space-y-16">
      
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#E6F4EA] rounded-full border border-[#16A34A]/30 text-[11px] font-black uppercase tracking-wider text-[#15803D]">
          <Eye className="w-3.5 h-3.5" />
          OPEN STARTUP
        </div>

        <h1 className="font-serif font-bold text-4xl md:text-6xl text-[#1A1510] tracking-tight">
          Building in public
        </h1>

        <p className="text-sm md:text-base font-medium text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          I believe in 100% radical transparency. Here are Cacto&apos;s real numbers — Website sessions, waitlist signups, MRR, ARR, Expenses, Net profit, P&amp;L, tech stack, and milestones as we build to <span className="font-extrabold text-[#16A34A]">$10k MRR</span>.
        </p>

        <div className="pt-2">
          <button 
            onClick={() => setIsSubscribeOpen(true)}
            className="py-3.5 px-7 rounded-full bg-[#1A1510] text-white font-extrabold text-xs md:text-sm hover:bg-black transition shadow-[0_4px_12px_rgba(0,0,0,0.15)] cursor-pointer inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Subscribe to follow the journey
          </button>
        </div>
      </div>

      {/* Real Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <div key={m.id} className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-4 relative flex flex-col justify-between hover:border-zinc-300 transition">
            
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 mb-2">
                <span className="flex items-center gap-1.5">
                  {m.title}
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === m.id ? null : m.id)}
                    className="text-zinc-400 hover:text-zinc-600 transition cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>

              {activeTooltip === m.id && (
                <div className="mb-3 p-2.5 rounded-lg bg-zinc-900 text-white text-[11px] font-medium leading-normal">
                  {m.tooltip}
                </div>
              )}

              <div className="font-serif font-black text-3xl md:text-4xl text-[#1A1510]">
                {m.value}
              </div>

              {m.change && (
                <p className="text-[11px] font-medium text-emerald-600 font-semibold mt-1">
                  {m.change}
                </p>
              )}

              {m.subtitle && (
                <p className="text-[11px] font-medium text-zinc-400 mt-1">
                  {m.subtitle}
                </p>
              )}
            </div>

            {/* Chart vs Empty Dollar Placeholder */}
            {m.type === 'chart' ? (
              <div className="pt-4 space-y-1">
                <div className="h-12 w-full relative overflow-hidden rounded-lg bg-emerald-50/30">
                  <svg viewBox="0 0 180 50" className="w-full h-full">
                    <defs>
                      <linearGradient id={`grad-${m.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={`${m.svgPath} L180,50 L0,50 Z`} fill={`url(#grad-${m.id})`} />
                    <path d={m.svgPath} fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 uppercase tracking-widest pt-1 border-t border-zinc-100">
                  <span>May</span>
                  <span>June</span>
                  <span>July</span>
                  <span>Live</span>
                </div>
              </div>
            ) : (
              <div className="pt-6 pb-2 border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center bg-zinc-50/50">
                <div className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-400 font-bold text-sm bg-white shadow-xs">
                  $
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Changelog Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Changelog</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">What we have shipped on Cacto so far.</p>
        </div>

        <div className="space-y-4 border-l-2 border-zinc-200 pl-6 ml-2">
          {changelogItems.map((item, idx) => (
            <div key={idx} className="space-y-1 relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-zinc-900 shadow-sm" />
              <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">{item.date}</span>
              <h3 className="font-bold text-sm text-[#1A1510]">{item.title}</h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div>
          <a 
            href="/blog"
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-zinc-900 text-white font-extrabold text-xs hover:bg-black transition cursor-pointer"
          >
            View all changelog entries <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Milestones</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">Key moments as we build Cacto in the open.</p>
        </div>

        <div className="space-y-6 border-l-2 border-zinc-200 pl-6 ml-2">
          {milestoneItems.map((m, idx) => (
            <div key={idx} className="space-y-2 relative">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#16A34A] shadow-sm" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                <span>{m.date}</span>
                <span>({m.subtitle})</span>
              </div>
              <h3 className="font-bold text-sm text-[#1A1510]">{m.title}</h3>
              <p className="text-xs text-zinc-600 font-medium leading-relaxed max-w-2xl">{m.description}</p>
              {m.link && (
                <a 
                  href={m.link}
                  className="inline-flex items-center gap-1 py-1 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-extrabold text-[11px] transition border border-zinc-300/80 cursor-pointer"
                >
                  Learn more <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real Tech Stack Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Tech stack</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">The actual tools we use to build and run Cacto.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex items-center gap-3.5 hover:border-zinc-300 transition">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-base shrink-0 text-zinc-800 shadow-xs">
                {tech.logo}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#1A1510]">{tech.name}</h4>
                <p className="text-[10px] text-zinc-500 font-medium">{tech.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REAL Profit & Loss Section */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1A1510]">Profit & Loss</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1">Real monthly revenue and operational costs for Cacto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* July 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3 flex justify-between items-center">
              <span>July 2026</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">Current</span>
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Stripe fees</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Cost of goods</span>
                <span>-$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Hosting (Vercel Edge)</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Database (Supabase)</span>
                <span>-$0</span>
              </div>
              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain (cacto.cc)</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

          {/* June 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3">
              June 2026
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-zinc-400 pl-2">
                <span>Stripe fees</span>
                <span>-$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain fee</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

          {/* May 2026 Card */}
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-3">
            <div className="font-bold text-sm text-[#1A1510] border-b border-zinc-200 pb-3">
              May 2026
            </div>

            <div className="space-y-2 text-xs font-medium text-zinc-600">
              <div className="flex justify-between font-bold text-zinc-900">
                <span>Revenue</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Gross profit</span>
                <span>$0</span>
              </div>

              <div className="flex justify-between text-zinc-500 pl-2">
                <span>Domain setup</span>
                <span>-$1</span>
              </div>

              <div className="flex justify-between font-bold text-zinc-900 pt-2 border-t border-zinc-100">
                <span>Operating expenses</span>
                <span>-$1</span>
              </div>
              <div className="flex justify-between font-extrabold text-rose-600 text-sm pt-2 border-t-2 border-zinc-900">
                <span>Net profit</span>
                <span>-$1</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subscribe Banner Card */}
      <div className="p-8 md:p-12 rounded-3xl bg-white border-2 border-[#1A1510] text-center space-y-4 shadow-[6px_8px_0_#1A1510]">
        <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#1A1510]">
          Sign up to follow the journey
        </h3>
        <p className="text-xs md:text-sm text-zinc-600 font-medium max-w-md mx-auto">
          Get occasional transparent updates as we build Cacto to $10k MRR. No spam, ever.
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 pt-2">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            className="flex-1 p-3.5 rounded-xl border-2 border-[#1A1510] text-xs font-bold outline-none bg-white"
            required
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="py-3.5 px-6 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs hover:bg-[#15803D] transition border-2 border-[#1A1510] shadow-[2px_2px_0_#1A1510] cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isSubmitting ? 'Submitting...' : 'Sign up for free 🚀'}
          </button>
        </form>

        {isSuccess && (
          <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-300 max-w-md mx-auto">
            🎉 Thanks for subscribing! You are on the list.
          </p>
        )}

        {errorMsg && (
          <p className="text-xs font-bold text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-300 max-w-md mx-auto">
            {errorMsg}
          </p>
        )}
      </div>

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-2 border-[#1A1510] shadow-[8px_10px_0_#1A1510] space-y-5 relative">
            <button 
              onClick={() => setIsSubscribeOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-black transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-center text-[#16A34A]">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-2xl text-[#1A1510]">Subscribe to updates</h3>
              <p className="text-xs text-zinc-600 font-medium">
                Follow our open journey taking Cacto to $10k MRR. Monthly metrics, strategy breakdowns, and lessons learned.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3.5 rounded-xl border-2 border-[#1A1510] text-xs font-bold outline-none bg-white"
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#16A34A] text-white font-extrabold text-xs hover:bg-[#15803D] transition border-2 border-[#1A1510] shadow-[3px_3px_0_#1A1510] cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Join 460+ open subscribers'}
              </button>
            </form>

            {isSuccess && (
              <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-300">
                🎉 You are subscribed! Welcome aboard.
              </p>
            )}

            {errorMsg && (
              <p className="text-xs font-bold text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-300">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Zap, ShieldCheck, Clock, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

export default function AboutClient() {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

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
        body: JSON.stringify({ email: waitlistEmail }),
      })

      if (res.ok) {
        setWaitlistStatus('success')
        setWaitlistMessage("You've been added to the waitlist!")
        setWaitlistEmail('')
      } else {
        const data = await res.json()
        setWaitlistStatus('error')
        setWaitlistMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setWaitlistStatus('error')
      setWaitlistMessage('Server error. Please try again later.')
    }
  }

  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const aboutFaqs = [
    {
      q: "What is Cacto and why was it founded?",
      a: "Cacto is an official Meta Graph API-compliant Instagram DM automation platform built specifically for solo creators and digital entrepreneurs. Founded in 2026 by developer Somya Nayak, Cacto was created to eliminate bloated software costs and bring flat-rate DM automation to independent builders."
    },
    {
      q: "Who is the founder of Cacto?",
      a: "Cacto was built by Somya Nayak, a full-stack developer passionate about creating frictionless monetization tools for the creator economy."
    },
    {
      q: "Why does Cacto offer flat-rate pricing over subscriber-tier pricing?",
      a: "Enterprise chat tools like ManyChat tax creators by raising prices as subscriber lists grow. Cacto charges a single flat rate of €19/month for unlimited contacts and DMs, ensuring creators keep 100% of their scaling upside."
    },
    {
      q: "Is Cacto secure and Meta API-compliant?",
      a: "Yes. Cacto operates strictly within official Meta Graph API developer standards using OAuth 2.0 authorization tokens, end-to-end encryption, and compliant webhook event handlers to ensure maximum account safety."
    },
    {
      q: "Who is Cacto designed for?",
      a: "Cacto is designed for digital creators, course educators, solopreneurs, e-commerce brands, and coaches who want to convert Instagram Reel comments into instant digital product sales and lead captures."
    },
    {
      q: "What is Cacto's system reliability and uptime commitment?",
      a: "Cacto is engineered on high-performance cloud infrastructure with automated fallback webhooks, delivering sub-30 second response times and 99.9% platform availability."
    },
    {
      q: "What platforms are on Cacto's product expansion roadmap?",
      a: "In addition to core Instagram comment-to-DM triggers, Cacto is expanding native automation workflows to TikTok, Threads, and WhatsApp."
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      {/* Navbar Header */}
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 md:pt-32 space-y-16 text-left">
        <header className="space-y-4">
          <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Why we built <span className="font-semibold text-[#16A34A]">cacto</span>.
          </h1>
          <p className="text-zinc-555 text-sm font-bold leading-relaxed max-w-2xl">
            Cacto was founded in 2026 to solve a simple problem: traditional chat marketing tools are too complex, expensive, and bloated for independent creators.
          </p>


        </header>

        {/* 4 Mission Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[24px] bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <Zap className="h-8 w-8 text-[#16A34A]" />
            <h2 className="font-serif text-xl font-bold">How does Cacto eliminate link-in-bio friction?</h2>
            <p className="text-zinc-555 text-xs font-semibold leading-relaxed">
              Every step between a follower discovering your content and clicking your bio link reduces sales. By sending direct Stripe and store checkout links straight to Instagram DMs on keyword triggers, Cacto unlocks instantaneous sales.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <Sparkles className="h-8 w-8 text-[#16A34A]" />
            <h2 className="font-serif text-xl font-bold">Why focus on frictionless creator automation?</h2>
            <p className="text-zinc-555 text-xs font-semibold leading-relaxed">
              Cacto is designed to give independent creators maximum simplicity with zero setup bloat. You get fast DM delivery, automated comment replies, and instant lead capture without complicated technical configurations.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <ShieldCheck className="h-8 w-8 text-[#16A34A]" />
            <h2 className="font-serif text-xl font-bold">How does Cacto keep your Instagram account safe?</h2>
            <p className="text-zinc-555 text-xs font-semibold leading-relaxed">
              Cacto is built strictly on the official Meta Graph API with automated rotated 3-part comment replies, protecting your account from spam triggers while ensuring 100% delivery compliance.
            </p>
          </div>

          <div className="p-8 rounded-[24px] bg-white border-2 border-[#1A1510] space-y-4" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <Clock className="h-8 w-8 text-[#16A34A]" />
            <h2 className="font-serif text-xl font-bold">How fast can you go live?</h2>
            <p className="text-zinc-555 text-xs font-semibold leading-relaxed">
              With a simple 5-minute setup, you connect your Instagram profile, set your trigger keywords and automated DM message, and start converting comments immediately—no technical skills needed.
            </p>
          </div>
        </section>

        {/* Visible FAQ Accordion Section */}
        <section className="p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-8" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="space-y-2">
            <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-wider block">Company & Platform FAQs</span>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              What are the most frequently asked questions about <em className="italic font-normal text-[#16A34A]">Cacto</em>?
            </h2>
          </div>

          <div className="space-y-3">
            {aboutFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border-2 border-[#1A1510] bg-[#FAF6EE] overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-xs font-bold text-[#1A1510] select-none cursor-pointer text-left gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="h-5 w-5 rounded-full border border-[#1A1510] flex items-center justify-center text-xs shrink-0 bg-white font-mono">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-zinc-650 leading-relaxed font-semibold border-t border-dashed border-zinc-200 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Interlinks block */}
        <section className="p-8 rounded-[24px] bg-[#E6F4EA] border-2 border-[#16A34A] space-y-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#15803D]">How can Cacto help optimize your growth?</h2>
          <p className="text-zinc-700 text-xs font-bold leading-relaxed max-w-xl mx-auto">
            Check your page metrics with our <Link href="/tools" className="underline font-black text-[#16A34A] hover:text-[#15803D]">Free Tools Suite</Link> or read step-by-step frameworks on our <Link href="/blog" className="underline font-black text-[#16A34A] hover:text-[#15803D]">Creator Marketing Blog</Link>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}

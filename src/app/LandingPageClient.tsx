'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Sparkles, X, Zap, Link2, RefreshCw, Mail, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

const InstagramIcon = () => (
  <svg className="h-5 w-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

export default function LandingPageClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeRole, setActiveRole] = useState('john')
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
        body: JSON.stringify({ email: waitlistEmail })
      })
      const data = await res.json()
      if (res.ok) {
        setWaitlistStatus('success')
        setWaitlistMessage(data.message || 'You have been successfully added to our waitlist!')
        setWaitlistEmail('')
      } else {
        setWaitlistStatus('error')
        setWaitlistMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setWaitlistStatus('error')
      setWaitlistMessage('Failed to connect to the server. Please try again.')
    }
  }

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const homepageFaqs = [
    {
      q: "Is Cacto compliant with Meta and Instagram platform rules?",
      a: "Yes, Cacto is 100% compliant with Meta platform guidelines. We use official Meta Graph API endpoints with secure OAuth 2.0 token authorization, ensuring your Instagram account is never flagged or shadowbanned."
    },
    {
      q: "How does Cacto compare as a ManyChat alternative?",
      a: "Unlike complex flow-builder tools like ManyChat, Cacto is streamlined specifically for Instagram creators with zero complex flowchart building, 5-minute setup, and native Meta API security."
    },
    {
      q: "How fast are DM responses sent when a follower comments?",
      a: "Cacto triggers instant comment-to-DM responses within 5 to 30 seconds of a user leaving a matching keyword comment on your Instagram Reel, Post, or Story, keeping engagement high while followers are actively online."
    },
    {
      q: "Can I connect direct payment links and store URLs?",
      a: "Yes! You can attach direct DM checkout links for Stripe, Stan Store, Shopify, Gumroad, Calendly, or custom lead magnets directly inside Instagram DMs."
    },
    {
      q: "What platforms and stores can I connect to Cacto DMs?",
      a: "Cacto allows you to send direct checkout links to Stripe, Stan Store, Shopify, Gumroad, Calendly, or custom web links directly inside Instagram DMs."
    },
    {
      q: "Will automated DMs get my Instagram account flagged or banned?",
      a: "No. Cacto includes a Meta Anti-Spam Reply Rotator that rotates between 3 comment reply variations and incorporates natural delay timing to stay fully within Meta API rate limits."
    },
    {
      q: "How does instant lead capture work inside Instagram DMs?",
      a: "Cacto can prompt followers to provide their email address right inside the Instagram DM conversation before delivering digital downloads, instantly syncing leads into your email marketing platform."
    },
    {
      q: "Will my followers know they are receiving automated DMs?",
      a: "Cacto dispatches clean, personalized direct messages with actionable checkout buttons or instant guide links. It operates as a fast, helpful delivery assistant that feels natural to your audience."
    },
    {
      q: "How long does it take to set up Cacto for Instagram?",
      a: "Setup takes under 5 minutes: connect your Instagram account, select your Reel, Post, or Story, set your trigger keyword, configure your 3 rotated comment replies, and add your store link."
    },
    {
      q: "Can I join the early access waitlist?",
      a: "Yes! Join our early access waitlist today to get priority onboarding and instant notification as soon as new creator spots open up."
    }
  ]

  return (
    <div 
      className="min-h-screen text-[#1A1510] selection:bg-[#16A34A] selection:text-white font-sans antialiased overflow-x-hidden"
      style={{
        backgroundImage: 'radial-gradient(800px 300px at 90% 0%, rgba(22,163,74,0.1), transparent 60%), radial-gradient(500px 280px at 10% 95%, rgba(34,197,94,0.06), transparent 60%)',
        backgroundColor: '#FAF6EE'
      }}
    >
      {/* Header / Navbar */}
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative px-5 pt-28 pb-6 md:px-14 md:pt-32 md:pb-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-center max-w-7xl mx-auto">
        <header className="space-y-6 text-left">
          <h1 className="font-serif font-semibold text-[clamp(40px,5.5vw,76px)] leading-[0.98] tracking-[-2.5px] text-[#1A1510]">
            Turn Instagram comments into <span className="font-semibold text-[#16A34A]">automated DMs</span> & sales.
          </h1>



          {/* 3-Step Instant Visual Flow */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#1A1510] pt-1">
            <span className="px-3.5 py-2 rounded-xl bg-white border-2 border-[#1A1510] shadow-[3px_3px_0_#1A1510]">
              💬 Follower comments keyword
            </span>
            <span className="text-[#16A34A] font-bold text-sm">➔</span>
            <span className="px-3.5 py-2 rounded-xl bg-[#E6F4EA] text-[#15803D] border-2 border-[#1A1510] shadow-[3px_3px_0_#15803D]">
              ⚡ Cacto auto-sends DM link
            </span>
          </div>

          <div className="pt-3 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-5">
            <button 
              onClick={() => setIsWaitlistModalOpen(true)}
              className="relative inline-flex items-center gap-3 bg-[#1A1510] text-[#FAF6EE] px-8 py-[16px] rounded-full font-bold text-[15px] border-2 border-[#1A1510] hover:bg-[#2C2C2B] transition shadow-[4px_6px_0_#16A34A] cursor-pointer"
            >
              Join Waitlist
              <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white grid place-items-center text-[12px] font-bold">→</span>
            </button>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="relative inline-flex items-center gap-2 bg-transparent text-[#1A1510] px-8 py-[16px] rounded-full font-bold text-[15px] border-2 border-[#1A1510] hover:bg-black/5 transition cursor-pointer"
            >
              Experience Live Demo
            </a>
          </div>
        </header>

        {/* Hero Right: Floating Role Cards */}
        <div className="relative h-[520px] hidden lg:block select-none">
          {/* John (Cart Recovery) */}
          <div 
            className="absolute bg-white border-2 border-[#1A1510] rounded-3xl p-5 w-[230px] top-4 right-10 rotate-[-3deg] z-10 transition-transform hover:scale-105 duration-300"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
          >
            <div className="absolute -top-3 -right-3 bg-[#FFF6E8] text-[#1A1510] font-mono text-[9px] tracking-[0.15em] px-2 py-1 rounded-md border-2 border-[#1A1510] uppercase font-bold">
              Active Rule
            </div>
            <div className="w-[60px] h-[60px] rounded-full mb-3 border-2 border-[#1A1510] relative overflow-hidden bg-amber-400 flex items-center justify-center font-black text-white text-base">
              JO
            </div>
            <div className="font-serif font-semibold text-[22px] tracking-[-0.5px] leading-none">John</div>
            <div className="font-mono text-[9px] text-zinc-400 tracking-[0.12em] uppercase mt-1">Cart Recovery · Digital Guides</div>
            <div className="font-serif italic text-[13px] text-zinc-650 leading-[1.4] mt-3 pt-3 border-t border-dashed border-zinc-200">
              "Auto follow-up on digital guides. Here's your direct link to download the PDF guide!"
            </div>
            <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-zinc-400 font-bold">
              <span>recovery rate</span>
              <b className="font-serif font-semibold text-[16px] text-[#16A34A] tracking-[-0.5px]">↑ 18%</b>
            </div>
          </div>

          {/* Carla (Inbound Sales) */}
          <div 
            className="absolute bg-white border-2 border-[#1A1510] rounded-3xl p-5 w-[220px] top-[140px] left-0 rotate-[2deg] z-20 transition-transform hover:scale-105 duration-300"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
          >
            <div className="w-[60px] h-[60px] rounded-full mb-3 border-2 border-[#1A1510] relative overflow-hidden bg-rose-400 flex items-center justify-center font-black text-white text-base">
              CA
            </div>
            <div className="font-serif font-semibold text-[22px] tracking-[-0.5px] leading-none">Carla</div>
            <div className="font-mono text-[9px] text-zinc-400 tracking-[0.12em] uppercase mt-1">Inbound Sales · Course Checkout</div>
            <div className="font-serif italic text-[13px] text-zinc-650 leading-[1.4] mt-3 pt-3 border-t border-dashed border-zinc-200">
              "Direct course checkout link is ready. Tap below to join our next masterclass cohort!"
            </div>
            <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-zinc-400 font-bold">
              <span>conversions</span>
              <b className="font-serif font-semibold text-[16px] text-[#16A34A] tracking-[-0.5px]">↑ 31%</b>
            </div>
          </div>

          {/* Yuki (Booking Links) */}
          <div 
            className="absolute bg-white border-2 border-[#1A1510] rounded-3xl p-5 w-[210px] top-[300px] right-4 rotate-[4deg] z-30 transition-transform hover:scale-105 duration-300"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
          >
            <div className="w-[60px] h-[60px] rounded-full mb-3 border-2 border-[#1A1510] relative overflow-hidden bg-emerald-400 flex items-center justify-center font-black text-white text-base">
              YU
            </div>
            <div className="font-serif font-semibold text-[22px] tracking-[-0.5px] leading-none">Yuki</div>
            <div className="font-mono text-[9px] text-zinc-400 tracking-[0.12em] uppercase mt-1">Booking Links · Calendly</div>
            <div className="font-serif italic text-[13px] text-zinc-650 leading-[1.4] mt-3 pt-3 border-t border-dashed border-zinc-200">
              "Here's my Calendly calendar invite link! Pick a 1:1 strategy call time that works for you."
            </div>
            <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-zinc-400 font-bold">
              <span>show rate</span>
              <b className="font-serif font-semibold text-[16px] text-[#16A34A] tracking-[-0.5px]">↑ 92%</b>
            </div>
          </div>
        </div>
      </section>



      {/* 4 Core V1 Feature Pillars */}
      <section id="features" className="px-5 py-16 md:px-14 md:py-24 relative max-w-7xl mx-auto border-b border-[rgba(26,20,16,0.08)]">
        <div className="text-center mb-14 space-y-3">
          <h2 className="font-serif font-semibold text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-1.5px] max-w-[24ch] mx-auto">
            Why is Cacto built for speed, safety & sales?
          </h2>
          <p className="text-zinc-500 text-xs font-bold max-w-md mx-auto">
            Everything you need to automate Instagram DMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Pillar 1 */}
          <div className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 shadow-[4px_6px_0_#1A1510] hover:-translate-y-1 hover:shadow-[6px_10px_0_#16A34A] transition-all duration-200 cursor-pointer space-y-3 relative overflow-hidden group">
            <div className="h-12 w-12 rounded-2xl bg-[#E6F4EA] border-2 border-[#16A34A]/30 flex items-center justify-center text-[#16A34A] group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-lg leading-tight text-[#1A1510]">Instant Auto-DMs</h3>
            <p className="text-xs font-medium text-zinc-600 leading-relaxed">
              Auto-sends DMs in 30 seconds when followers comment keywords on your Reels & Posts.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 shadow-[4px_6px_0_#1A1510] hover:-translate-y-1 hover:shadow-[6px_10px_0_#16A34A] transition-all duration-200 cursor-pointer space-y-3 relative overflow-hidden group">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Link2 className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-lg leading-tight text-[#1A1510]">Direct Store Links</h3>
            <p className="text-xs font-medium text-zinc-600 leading-relaxed">
              Sends Stripe, Stan Store & Shopify checkout links straight to follower inboxes.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 shadow-[4px_6px_0_#1A1510] hover:-translate-y-1 hover:shadow-[6px_10px_0_#16A34A] transition-all duration-200 cursor-pointer space-y-3 relative overflow-hidden group">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-lg leading-tight text-[#1A1510]">Meta Anti-Spam Safety</h3>
            <p className="text-xs font-medium text-zinc-600 leading-relaxed">
              Rotates 3 comment reply variations with natural delays to keep your account 100% safe.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 shadow-[4px_6px_0_#1A1510] hover:-translate-y-1 hover:shadow-[6px_10px_0_#16A34A] transition-all duration-200 cursor-pointer space-y-3 relative overflow-hidden group">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-serif font-bold text-lg leading-tight text-[#1A1510]">Instant Lead Capture</h3>
            <p className="text-xs font-medium text-zinc-600 leading-relaxed">
              Collects follower emails inside DMs before delivering free guides or downloads.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Setup Section */}
      <section id="how-it-works" className="px-5 py-16 md:px-14 md:py-24 relative max-w-7xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <h2 className="font-serif font-semibold text-[clamp(36px,5vw,60px)] leading-[0.96] tracking-[-2px] max-w-[22ch] mx-auto">
            How do you launch Instagram DM automation in under 5 minutes?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="relative bg-white border-2 border-[#1A1510] rounded-[24px] p-7 shadow-sm thick-sticker-hover text-left space-y-3">
            <div className="inline-flex items-center justify-center font-mono text-[11px] font-bold tracking-[0.05em] px-3.5 py-1 rounded-md border-2 border-[#1A1510] bg-[#FFF6E8]">
              STEP 01
            </div>
            <h3 className="font-serif font-semibold text-[24px] tracking-[-0.5px] leading-tight">Pick your posts</h3>
            <p className="text-[14px] leading-[1.55] text-zinc-555 font-semibold">
              Select specific Reels, Posts, or Stories directly from your Instagram feed inside your Cacto dashboard.
            </p>
          </div>

          <div className="relative bg-white border-2 border-[#1A1510] rounded-[24px] p-7 shadow-sm thick-sticker-hover text-left space-y-3">
            <div className="inline-flex items-center justify-center font-mono text-[11px] font-bold tracking-[0.05em] px-3.5 py-1 rounded-md border-2 border-[#1A1510] bg-[#FFF0EB]">
              STEP 02
            </div>
            <h3 className="font-serif font-semibold text-[24px] tracking-[-0.5px] leading-tight">Set your keywords & replies</h3>
            <p className="text-[14px] leading-[1.55] text-zinc-555 font-semibold">
              Set trigger phrases (e.g. "GUIDE") and 3 rotated comment replies to stay 100% Meta anti-spam compliant.
            </p>
          </div>

          <div className="relative bg-white border-2 border-[#1A1510] rounded-[24px] p-7 shadow-sm thick-sticker-hover text-left space-y-3">
            <div className="inline-flex items-center justify-center font-mono text-[11px] font-bold tracking-[0.05em] px-3.5 py-1 rounded-md border-2 border-[#1A1510] bg-[#EAF0EB]">
              STEP 03
            </div>
            <h3 className="font-serif font-semibold text-[24px] tracking-[-0.5px] leading-tight">Connect stores & Stripe</h3>
            <p className="text-[14px] leading-[1.55] text-zinc-555 font-semibold">
              Attach direct DM checkout buttons for Stripe, Stan Store, or custom URLs to deliver instant download links.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section id="comparison" className="py-20 bg-[#FAF6EE] border-t border-[rgba(26,20,16,0.08)]">
        <div className="max-w-5xl mx-auto px-6 space-y-10 text-left">
          <div className="text-center space-y-3">
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-center tracking-tight text-[#1A1510]">
              Why do creators choose <span className="font-bold text-[#16A34A]">Cacto</span> for Instagram DM automation?
            </h2>
            <p className="text-zinc-600 text-sm font-bold text-center">Built for instant DM responses, zero setup bloat, and 100% Meta API compliance.</p>
          </div>

          <div className="overflow-hidden rounded-[24px] border-2 border-[#1A1510] bg-white shadow-[6px_10px_0_#1A1510]">
            <table className="w-full min-w-[640px] border-collapse text-xs font-bold text-left text-zinc-700">
              <thead>
                <tr className="bg-[#1A1510] text-[#FAF6EE] border-b-2 border-[#1A1510]">
                  <th className="p-5 font-serif font-bold text-sm w-1/4 text-white">Capabilities</th>
                  <th className="p-5 border-l border-zinc-700 w-1/4 text-zinc-300">Manual Comment DMs</th>
                  <th className="p-5 border-l border-zinc-700 w-1/4 text-zinc-300">Complex Chat Builders</th>
                  <th className="p-5 border-l border-zinc-700 bg-[#16A34A] text-white w-1/4 text-sm font-black tracking-wide">
                    🌵 Cacto AutoDM
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm font-semibold">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4.5 font-bold text-[#1A1510]">Response Speed</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-400">Slow (hours later)</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-600">Sub-30 seconds</td>
                  <td className="p-4.5 border-l border-zinc-200 bg-[#E6F4EA]/60 font-bold text-[#15803D] flex items-center gap-2">
                    <span className="text-[#16A34A] font-black text-base">✓</span> Sub-30 Seconds
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4.5 font-bold text-[#1A1510]">Setup Time</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-400">Never ending</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-600">Complex flowcharts</td>
                  <td className="p-4.5 border-l border-zinc-200 bg-[#E6F4EA]/60 font-bold text-[#15803D] flex items-center gap-2">
                    <span className="text-[#16A34A] font-black text-base">✓</span> Under 5 Minutes
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4.5 font-bold text-[#1A1510]">Anti-Spam Comment Rotator</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-400">Manual typing</td>
                  <td className="p-4.5 border-l border-zinc-200 text-rose-500 font-bold">✕ Hard setup</td>
                  <td className="p-4.5 border-l border-zinc-200 bg-[#E6F4EA]/60 font-bold text-[#15803D] flex items-center gap-2">
                    <span className="text-[#16A34A] font-black text-base">✓</span> 3 Rotated Variations
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4.5 font-bold text-[#1A1510]">Direct Checkout Links</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-400">Manual copy-paste</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-600">Supported</td>
                  <td className="p-4.5 border-l border-zinc-200 bg-[#E6F4EA]/60 font-bold text-[#15803D] flex items-center gap-2">
                    <span className="text-[#16A34A] font-black text-base">✓</span> Stripe, Store & Custom
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4.5 font-bold text-[#1A1510]">0% Contact Taxes</td>
                  <td className="p-4.5 border-l border-zinc-200 text-zinc-400">Free but slow</td>
                  <td className="p-4.5 border-l border-zinc-200 text-rose-500 font-bold">✕ Contact Tier Tax</td>
                  <td className="p-4.5 border-l border-zinc-200 bg-[#E6F4EA]/60 font-bold text-[#15803D] flex items-center gap-2">
                    <span className="text-[#16A34A] font-black text-base">✓</span> 0% Extra Taxes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* Architecture Tech Diagram */}
      <section className="py-24 bg-[#FAF6EE] border-t border-[rgba(26,20,16,0.08)]">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif font-bold text-3xl md:text-5xl tracking-tight text-[#1A1510]">
              Built for <span className="text-[#16A34A]">Safety</span>. Engineered for Speed.
            </h2>
            <p className="text-zinc-600 text-sm font-bold max-w-2xl mx-auto">See exactly how Cacto routes your DMs securely through Meta's official Graph API.</p>
          </div>

          <div className="bg-white border-2 border-[#1A1510] rounded-3xl p-8 md:p-12 shadow-[6px_10px_0_#1A1510] overflow-x-auto">
            <div className="min-w-[800px] flex items-center justify-between gap-4 font-mono text-xs font-bold text-center">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3 w-40">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#1A1510] bg-rose-100 flex items-center justify-center text-rose-500 shadow-[2px_3px_0_#1A1510]">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[#1A1510]">Instagram Follower</div>
                  <div className="text-zinc-400 font-normal text-[10px] mt-1">Comments "GUIDE"</div>
                </div>
              </div>

              <div className="flex-1 h-0.5 bg-dashed bg-zinc-300 border-t-2 border-dashed border-zinc-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-zinc-300">▶</div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3 w-40">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#1A1510] bg-blue-100 flex items-center justify-center text-blue-500 shadow-[2px_3px_0_#1A1510]">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[#1A1510]">Meta Graph API</div>
                  <div className="text-zinc-400 font-normal text-[10px] mt-1">Official OAuth Webhook</div>
                </div>
              </div>

              <div className="flex-1 h-0.5 bg-dashed bg-zinc-300 border-t-2 border-dashed border-zinc-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-zinc-300">▶</div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3 w-48 relative">
                <div className="absolute -top-3 -right-2 bg-[#1A1510] text-[#FAF6EE] text-[9px] px-2 py-1 rounded-md tracking-widest z-10">Cacto Engine</div>
                <div className="w-16 h-16 rounded-2xl border-2 border-[#1A1510] bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-[2px_3px_0_#1A1510]">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[#1A1510]">Anti-Spam Rotator</div>
                  <div className="text-zinc-400 font-normal text-[10px] mt-1">Rotates 3 replies + delay</div>
                </div>
              </div>

              <div className="flex-1 h-0.5 bg-dashed bg-zinc-300 border-t-2 border-dashed border-zinc-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-zinc-300">▶</div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-3 w-40">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#1A1510] bg-purple-100 flex items-center justify-center text-purple-500 shadow-[2px_3px_0_#1A1510]">
                  <Link2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[#1A1510]">Direct Checkout</div>
                  <div className="text-zinc-400 font-normal text-[10px] mt-1">Stripe Link Delivered in DM</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 10 High-Intent Search FAQs Section */}
      <section className="py-24 bg-white border-t border-zinc-200 text-left">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center tracking-tight text-[#1A1510]">
              What are the most frequently asked questions about <span className="font-bold text-[#16A34A]">Cacto</span>?
            </h2>
            <p className="text-zinc-600 text-xs font-bold text-center">Clear answers about Instagram DM automation and Meta API compliance.</p>
          </div>

          <div className="space-y-4">
            {homepageFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border-2 border-[#1A1510] bg-[#FAF6EE] overflow-hidden transition shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex justify-between items-center text-sm font-bold text-[#1A1510] select-none cursor-pointer text-left gap-4"
                >
                  <span>{faq.q}</span>
                  <span className="h-6 w-6 rounded-full border border-[#1A1510] flex items-center justify-center text-xs shrink-0 bg-white">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-zinc-555 leading-relaxed font-semibold border-t border-dashed border-zinc-200 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}

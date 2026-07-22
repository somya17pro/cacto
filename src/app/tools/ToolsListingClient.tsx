'use client'

import { useState } from 'react'
import Link from 'next/link'
import { freeToolsList } from '@/utils/toolsData'
import { Search, ChevronRight, X, Mail, Check, Shield, TrendingUp, Sparkles, User, Percent, Compass, CheckCircle, Tag, FileText, MessageSquare, DollarSign, AlignLeft, Play, ClipboardList, ArrowUpRight, PlusCircle, Heart, ArrowRight, Layers } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

export default function ToolsListingClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Waitlist states
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

  const categories = ['All', 'Calculators', 'Generators', 'Utility']

  const filteredTools = freeToolsList.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="h-6 w-6 text-[#16A34A]" />
      case 'Sparkles': return <Sparkles className="h-6 w-6 text-[#16A34A]" />
      case 'User': return <User className="h-6 w-6 text-[#16A34A]" />
      case 'Percent': return <Percent className="h-6 w-6 text-[#16A34A]" />
      case 'Compass': return <Compass className="h-6 w-6 text-[#16A34A]" />
      case 'CheckCircle': return <CheckCircle className="h-6 w-6 text-[#16A34A]" />
      case 'Tag': return <Tag className="h-6 w-6 text-[#16A34A]" />
      case 'FileText': return <FileText className="h-6 w-6 text-[#16A34A]" />
      case 'MessageSquare': return <MessageSquare className="h-6 w-6 text-[#16A34A]" />
      case 'DollarSign': return <DollarSign className="h-6 w-6 text-[#16A34A]" />
      case 'AlignLeft': return <AlignLeft className="h-6 w-6 text-[#16A34A]" />
      case 'Play': return <Play className="h-6 w-6 text-[#16A34A]" />
      case 'ClipboardList': return <ClipboardList className="h-6 w-6 text-[#16A34A]" />
      case 'ArrowUpRight': return <ArrowUpRight className="h-6 w-6 text-[#16A34A]" />
      case 'PlusCircle': return <PlusCircle className="h-6 w-6 text-[#16A34A]" />
      case 'Mail': return <Mail className="h-6 w-6 text-[#16A34A]" />
      case 'Heart': return <Heart className="h-6 w-6 text-[#16A34A]" />
      case 'Layers': return <Layers className="h-6 w-6 text-[#16A34A]" />
      default: return <Sparkles className="h-6 w-6 text-[#16A34A]" />
    }
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
      } else {
        setWaitlistStatus('error')
        setWaitlistMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setWaitlistStatus('error')
      setWaitlistMessage('Failed to connect to the server. Please try again.')
    }
  }

  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const toolsFaqs = [
    {
      q: "Are Cacto free growth tools completely free to use?",
      a: "Yes! All 25 growth utilities, calculators, caption generators, script outline builders, and DM copy previewers are 100% free with zero sign-up required."
    },
    {
      q: "How are Instagram engagement rate benchmarks calculated?",
      a: "Engagement rates are calculated using standard industry formulas: total engagements (likes, comments, shares, saves) divided by follower count or impressions, benchmarked against real creator niche data."
    },
    {
      q: "What character count limits apply to Instagram captions and DMs?",
      a: "Instagram captions allow up to 2,200 characters and 30 hashtags. Direct messages allow up to 1,000 characters per message, and Cacto's DM previewer validates character bounds in real-time."
    },
    {
      q: "Does Cacto collect private account data when I use free tools?",
      a: "No. Cacto free tools process calculations client-side inside your browser. No private passwords, access tokens, or personal profile data are collected or stored."
    },
    {
      q: "How do I turn free tool calculations into automated Cacto DM campaigns?",
      a: "Once you estimate your conversion lift with our CTR calculator or test DM copy using the previewer, copy your top keyword trigger into your Cacto dashboard to launch a live DM campaign in 5 minutes."
    },
    {
      q: "How frequently are Cacto growth tools updated?",
      a: "Our utilities are continuously updated to align with Meta Graph API specifications, current Instagram algorithm ranking factors, and updated creator monetization benchmarks."
    },
    {
      q: "What types of free tools are included in the Cacto suite?",
      a: "The suite includes engagement rate calculators, DM conversion CTR projectors, Reels script outline planners, caption generators, hashtag analyzers, carousel layout aids, and inbox copy previewers."
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      
      {/* Navbar Header */}
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-16 md:pt-32 space-y-16">
        
        {/* Banner header */}
        <header className="text-left space-y-4">
          <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Interactive <span className="font-semibold text-[#16A34A]">marketing</span> tools.
          </h1>
          <p className="text-zinc-555 text-sm max-w-xl font-bold leading-relaxed">
            Free calculators, visual template preview helpers, script generator sheets, and hook planners to optimize your social reach.
          </p>
        </header>

        {/* Search and Tag Filtering Toolbar */}
        <section className="space-y-6">
          <h2 className="sr-only">How can you filter free Instagram growth tools by category?</h2>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-[#1A1510] focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-xs placeholder:text-zinc-400 font-bold text-[#1A1510] transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border-2 text-xs font-extrabold transition cursor-pointer select-none ${
                  selectedCategory === cat
                    ? 'bg-[#16A34A] text-white border-[#16A34A]'
                    : 'bg-white text-zinc-650 border-[#1A1510] hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h2 className="sr-only">Which interactive creator calculators and generators are available for free?</h2>
          {filteredTools.map((tool) => (
            <div 
              key={tool.slug}
              className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 flex flex-col justify-between items-start transition-transform hover:scale-[1.01] text-left"
              style={{ boxShadow: '4px 6px 0 #1A1510' }}
            >
              <div className="space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    {getIcon(tool.icon)}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 border border-zinc-200 px-2 py-1 rounded">
                    {tool.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-[#1A1510] leading-snug">
                  {tool.title}
                </h3>
                <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-6 w-full border-t border-dashed border-zinc-150 mt-6 flex justify-end">
                <Link 
                  href={`/tools/${tool.slug}`}
                  className="px-4 py-2 rounded-full bg-[#1A1510] hover:bg-[#2C2C2B] text-white font-extrabold text-[10px] transition cursor-pointer select-none border-none text-center"
                >
                  Use Tool →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {filteredTools.length === 0 && (
          <div className="p-16 text-center border-2 border-[#1A1510] rounded-[24px] bg-white max-w-md mx-auto">
            <p className="text-sm font-bold text-zinc-400">No free growth tools found matching your criteria.</p>
          </div>
        )}

        {/* Visible FAQ Accordion Section */}
        <section className="p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-8 text-left" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="space-y-2">
            <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-wider block">Free Growth Tools FAQs</span>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              What are the most frequently asked questions about <em className="italic font-normal text-[#16A34A]">free creator utilities</em>?
            </h2>
          </div>

          <div className="space-y-3">
            {toolsFaqs.map((faq, idx) => (
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

        {/* Early Access Waitlist Banner */}
        <section 
          className="w-full bg-[#1A1510] rounded-[28px] p-8 md:p-10 text-left relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 border-2 border-[#1A1510]"
          style={{ boxShadow: '6px 8px 0 #16A34A' }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
            Join our waitlist.
          </h2>
          <button
            onClick={() => setIsWaitlistModalOpen(true)}
            className="px-8 py-4 bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-md transition whitespace-nowrap cursor-pointer border-2 border-[#1A1510]"
          >
            Join Waitlist
          </button>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}

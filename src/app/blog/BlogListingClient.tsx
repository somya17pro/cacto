'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/utils/blogData'
import { Search, ChevronRight, X, Mail, Check, Shield, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

export default function BlogListingClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Waitlist states
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))]

  const filteredPosts = blogPosts.filter(post => {
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = !query || 
                          post.title.toLowerCase().includes(query) || 
                          post.excerpt.toLowerCase().includes(query) ||
                          post.category.toLowerCase().includes(query)
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

  const blogFaqs = [
    {
      q: "How do comment-to-DM triggers increase Instagram conversion rates?",
      a: "Asking followers to comment a specific keyword on a Reel or Post captures intent while their attention is highest. Delivering the link directly to their Instagram inbox removes link-in-bio friction, increasing click-through rates by up to 300%."
    },
    {
      q: "What comment auto-reply tactics drive the highest Reel engagement?",
      a: "Use short, memorable single-word keywords (e.g. 'GUIDE', 'PLAN', 'SCALE') prominently displayed in video overlay text and captions. Paired with automated comment replies, this creates strong engagement loops that boost algorithmic distribution."
    },
    {
      q: "Why are direct DM links superior to traditional link-in-bio pages?",
      a: "Link-in-bio pages force users to leave their current post feed, navigate to your profile, tap a bio link, and search through multiple links. Direct DMs deliver single-purpose checkout or lead links straight into their private inbox in under 30 seconds."
    },
    {
      q: "Does auto-DM engagement impact the Instagram Reel algorithm?",
      a: "Yes! High comment volume within the first hour of posting signals strong audience interest to Meta's recommendation algorithm, increasing Reel placement on the Explore page and Reels feed."
    },
    {
      q: "What are the best practices for automated lead magnet delivery?",
      a: "Keep your initial DM message concise, include a prominent call-to-action button, and pair the lead magnet PDF or link with a follow-up offer or Stripe checkout link to monetize immediate interest."
    },
    {
      q: "How does Cacto maintain Meta anti-spam compliance in blog tactics?",
      a: "Cacto automatically rotates multiple variations of public comment replies (e.g., 'Sent you a DM!', 'Check your inbox 🙌') and applies natural delay buffers so your account complies with Meta Graph API rate limits."
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
            The Cacto <span className="font-semibold text-[#16A34A]">marketing</span> blog.
          </h1>
          <p className="text-zinc-555 text-sm max-w-xl font-bold leading-relaxed">
            Tips, guides, and growth hacks on comment-to-DM triggers, monetization funnel pipelines, and Instagram marketing automation.
          </p>
        </header>

        {/* Search and Tag Filtering Toolbar */}
        <section className="space-y-6">
          <h2 className="sr-only">How can you search and filter growth articles?</h2>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search articles..."
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
                    : 'bg-white text-zinc-[#1A1510] border-[#1A1510] hover:bg-zinc-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Filtered Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h2 className="sr-only">Which Instagram growth and DM automation guides will scale your reach?</h2>
          {filteredPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 flex flex-col justify-between items-start transition-transform hover:scale-[1.01] text-left"
              style={{ boxShadow: '4px 6px 0 #1A1510' }}
            >
              <div className="space-y-4 w-full">
                {post.image && (
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 relative select-none">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-350 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  <span className="text-[#16A34A] bg-[#E6F4EA] px-2.5 py-1 rounded-md border border-[#16A34A]/10">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-[#1A1510] hover:text-[#16A34A] transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-zinc-500 text-xs font-semibold leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 w-full border-t border-dashed border-zinc-150 mt-6 flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 font-extrabold">{post.date}</span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-xs font-extrabold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 transition"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <div className="p-16 text-center border-2 border-[#1A1510] rounded-[24px] bg-white max-w-md mx-auto">
            <p className="text-sm font-bold text-zinc-400">No blog posts found matching your criteria.</p>
          </div>
        )}

        {/* Visible FAQ Accordion Section */}
        <section className="p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-8 text-left" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="space-y-2">
            <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-wider block">Instagram Growth FAQs</span>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              What are the most frequently asked questions on <em className="italic font-normal text-[#16A34A]">Instagram growth tactics</em>?
            </h2>
          </div>

          <div className="space-y-3">
            {blogFaqs.map((faq, idx) => (
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
        <section className="p-8 md:p-10 rounded-[28px] bg-[#1A1510] text-[#FAF6EE] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden" style={{ boxShadow: '6px 8px 0 #16A34A' }}>
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

'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { blogPosts, BlogPost } from '@/utils/blogData'
import { ArrowLeft, ArrowRight, Calendar, User, Clock, ChevronRight, ChevronDown, HelpCircle, X, Mail, Check, Shield, BookOpen } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'

interface ClientProps {
  slug: string
  initialPost?: BlogPost | null
}

interface TocItem {
  id: string
  text: string
  isH3: boolean
}

export default function BlogSlugClient({ slug, initialPost }: ClientProps) {
  const [post, setPost] = useState<BlogPost | null>(() => initialPost || blogPosts.find(p => p.slug === slug) || null)
  const [toc, setToc] = useState<TocItem[]>([])
  const [openFaqIndexes, setOpenFaqIndexes] = useState<Record<number, boolean>>({ 0: true })
  
  // Waitlist states
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistMessage, setWaitlistMessage] = useState('')

  useEffect(() => {
    if (slug && !post) {
      const matched = blogPosts.find(p => p.slug === slug)
      setPost(matched || null)
    }
  }, [slug, post])

  // Dynamically extract table of contents from content
  useEffect(() => {
    if (post && typeof window !== 'undefined') {
      const parser = new DOMParser()
      const doc = parser.parseFromString(post.content, 'text/html')
      const headings = doc.querySelectorAll('h2, h3')
      const extracted: TocItem[] = []
      
      headings.forEach((heading, idx) => {
        const text = heading.textContent || ''
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + idx
        extracted.push({
          id,
          text,
          isH3: heading.tagName.toLowerCase() === 'h3'
        })
      })

      if (post.faqs && post.faqs.length > 0) {
        extracted.push({
          id: 'search-faqs',
          text: 'Frequently Asked Questions',
          isH3: false
        })
      }

      setToc(extracted)
    }
  }, [post])

  const getInjectedContent = () => {
    if (!post) return ''
    if (typeof window === 'undefined') return post.content
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(post.content, 'text/html')
    const headings = doc.querySelectorAll('h2, h3')
    headings.forEach((heading, idx) => {
      const text = heading.textContent || ''
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + idx
      heading.setAttribute('id', id)
      const currentClass = heading.getAttribute('class') || ''
      if (!currentClass.includes('scroll-mt-24')) {
        heading.setAttribute('class', `${currentClass} scroll-mt-24`.trim())
      }
    })
    return doc.body.innerHTML
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

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] flex flex-col justify-center items-center p-6 text-center">
        <h1 className="font-serif text-3xl font-black mb-4">Article Not Found</h1>
        <p className="text-zinc-500 text-xs font-semibold mb-8">The requested blog post could not be located.</p>
        <Link 
          href="/blog"
          className="px-6 py-3 rounded-full bg-[#1A1510] text-[#FAF6EE] border-2 border-[#1A1510] font-extrabold text-xs transition hover:opacity-90 shadow-md"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      
      {/* Navbar Header */}
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      {/* Main Container Grid */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-12 md:pt-32 space-y-12">
        
        {/* Back Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {/* Dynamic Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.7fr_1.1fr] gap-12 items-start">
          
          {/* Left Column: Post Contents */}
          <div className="space-y-8 text-left">
            {post.image && (
              <div 
                className="w-full aspect-[21/9] rounded-[28px] overflow-hidden border-2 border-[#1A1510] bg-zinc-50 relative select-none"
                style={{ boxShadow: '6px 8px 0 #1A1510' }}
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <header className="space-y-6">
              <span className="inline-block text-xs font-black uppercase tracking-wider text-[#16A34A] bg-[#E6F4EA] px-3.5 py-1.5 rounded-md border border-[#16A34A]/10">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#1A1510]">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-zinc-450 font-bold border-t border-dashed border-zinc-200">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-[#16A34A]" /> {post.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#16A34A]" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#16A34A]" /> {post.readTime}</span>
              </div>
            </header>

            {/* TL;DR Summary Block */}
            <div 
              className="p-6 rounded-2xl bg-emerald-50/60 border-2 border-[#16A34A] text-left space-y-3"
              style={{ boxShadow: '4px 6px 0 #16A34A' }}
            >
              <h2 className="flex items-center gap-2 text-xs font-black uppercase text-[#16A34A] tracking-wider">
                <BookOpen className="h-4 w-4 text-[#16A34A]" /> What is the Quick Answer & Summary of this Guide?
              </h2>
              <p className="text-[#1A1510] text-xs font-black leading-relaxed">
                {post.excerpt}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-zinc-650 text-[11px] font-bold leading-relaxed border-t border-dashed border-emerald-200/55 pt-3">
                {post.tldr.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Detailed Article HTML */}
            <article 
              className="p-8 md:p-12 rounded-[28px] bg-white border-2 border-[#1A1510] text-left space-y-6 text-[#1A1510] prose prose-emerald max-w-none font-semibold leading-relaxed text-sm md:text-[15px]"
              style={{ boxShadow: '6px 8px 0 #1A1510' }}
              dangerouslySetInnerHTML={{ __html: getInjectedContent() }}
            />

            {/* Search-Intent FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section 
                id="search-faqs" 
                className="p-8 md:p-10 rounded-[28px] bg-white border-2 border-[#1A1510] text-left space-y-6 scroll-mt-24"
                style={{ boxShadow: '6px 8px 0 #1A1510' }}
              >
                <div className="flex items-center gap-3 border-b border-dashed border-zinc-200 pb-4">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 border border-[#16A34A]/20 flex items-center justify-center text-[#16A34A] shrink-0 font-bold">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-black text-[#1A1510] tracking-tight">
                      What are the most frequently asked questions about this guide?
                    </h2>
                    <p className="text-zinc-500 text-xs font-semibold">
                      Search-intent insights & expert answers for {post.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {post.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndexes[idx] ?? (idx === 0)
                    return (
                      <div 
                        key={idx}
                        className="rounded-2xl border-2 border-[#1A1510] bg-[#FAF6EE]/50 overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => setOpenFaqIndexes(prev => ({ ...prev, [idx]: !isOpen }))}
                          className="w-full px-5 py-4 text-left font-bold text-sm text-[#1A1510] flex items-center justify-between gap-4 hover:bg-emerald-50/60 transition-colors cursor-pointer select-none border-none"
                          aria-expanded={isOpen}
                        >
                          <span className="font-semibold text-sm leading-snug">{faq.q}</span>
                          <ChevronDown 
                            className={`h-4.5 w-4.5 shrink-0 text-[#16A34A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 pt-1 text-xs text-zinc-650 font-medium leading-relaxed border-t border-dashed border-zinc-200 bg-white">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Table of Contents navigator summary */}
          <aside className="hidden lg:block sticky top-28 p-6 rounded-2xl bg-white border-2 border-[#1A1510]" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <h2 className="font-serif text-lg font-bold italic tracking-tight text-[#1A1510] mb-4 border-b border-dashed border-zinc-200 pb-2">
              What topics are covered in this guide?
            </h2>
            <nav className="space-y-2 text-left">
              {toc.length === 0 ? (
                <p className="text-[10px] text-zinc-400 font-bold">No headings found.</p>
              ) : (
                <ul className="space-y-3 list-none pl-0">
                  {toc.map((item, idx) => (
                    <li key={idx} className={item.isH3 ? 'pl-4' : ''}>
                      <a 
                        href={`#${item.id}`}
                        className="text-zinc-555 hover:text-[#16A34A] text-xs font-bold tracking-tight transition-colors block decoration-none select-none hover:underline"
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        {item.isH3 ? '▪ ' : '• '}{item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </aside>

        </div>

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

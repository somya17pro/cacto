'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Heart } from 'lucide-react'
import WaitlistModal from './WaitlistModal'

interface FooterProps {
  onOpenWaitlist?: () => void
}

export default function Footer({ onOpenWaitlist }: FooterProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleWaitlistClick = () => {
    if (onOpenWaitlist) {
      onOpenWaitlist()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <footer className="bg-[#1A1510] text-[#FAF6EE] border-t-2 border-[#1A1510] pt-16 pb-12 text-left select-none relative overflow-hidden">
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Top Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-14">
        
        {/* Top Callout Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#1A1510] to-zinc-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2.5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Meta Graph API Engine • 1,010 Free Tools</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">
              Ready to turn Reel comments into automatic sales?
            </h3>
            <p className="text-xs text-zinc-400 font-medium max-w-xl">
              Deliver instant checkout links, lead magnet PDFs, and custom DM dispatches in under 500ms without link-in-bio drop-off.
            </p>
          </div>
          <button
            type="button"
            onClick={handleWaitlistClick}
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-full font-extrabold text-xs transition-all shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.02] active:scale-95 shrink-0 cursor-pointer border border-emerald-400/30 relative z-10"
          >
            <span>Get Early Access Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          
          {/* Col 1: Brand & Status */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-3xl font-black tracking-tight text-white lowercase flex items-center gap-2.5 decoration-none group">
              <span className="text-2xl group-hover:scale-110 transition-transform">🌵</span> cacto
            </Link>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              The zero-friction Instagram comment-to-DM automation engine for creators, educators, and e-commerce brands.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <p className="text-[11px] text-zinc-500 font-bold flex items-center gap-1">
                © 2026 Cacto Inc. Made with <Heart className="w-3 h-3 text-emerald-500 inline fill-emerald-500" /> for creators.
              </p>
            </div>
          </div>

          {/* Col 2: Platform & Features */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">Platform &amp; Features</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/#features" className="hover:text-white transition decoration-none">Features Overview</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition decoration-none">How It Works</Link></li>
              <li><Link href="/templates" className="hover:text-white transition decoration-none">DM Automation Templates</Link></li>
              <li><Link href="/compare" className="hover:text-white transition decoration-none text-emerald-400 font-bold">Compare Solutions (10 Hubs)</Link></li>
              <li><Link href="/compare/cacto-vs-manychat" className="hover:text-white transition decoration-none">Cacto vs. ManyChat</Link></li>
              <li><Link href="/about" className="hover:text-white transition decoration-none">About Cacto</Link></li>
              <li><Link href="/open" className="hover:text-white transition decoration-none">/Open Startup Metrics</Link></li>
            </ul>
          </div>

          {/* Col 3: App & Product */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">App &amp; Product</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/dashboard" className="hover:text-white transition decoration-none">Creator Dashboard</Link></li>
              <li><Link href="/autodm" className="hover:text-white transition decoration-none">AutoDM Campaign Builder</Link></li>
              <li><Link href="/onboarding" className="hover:text-white transition decoration-none">Connect Instagram Account</Link></li>
              <li><Link href="/profile" className="hover:text-white transition decoration-none">Account &amp; Webhook Settings</Link></li>
              <li><Link href="/login" className="hover:text-white transition decoration-none">Sign In / Register</Link></li>
              <li><Link href="/tools" className="text-emerald-400 font-extrabold hover:underline transition decoration-none flex items-center gap-1 mt-1">1,010 Free Tools Directory &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Legal */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">Resources &amp; Legal</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/blog" className="hover:text-white transition decoration-none font-bold text-emerald-400">Masterclass Blog (100 Guides)</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition decoration-none">Privacy Policy (GDPR / CCPA)</Link></li>
              <li><Link href="/terms" className="hover:text-white transition decoration-none">Terms of Service</Link></li>
              <li><Link href="/data-deletion" className="hover:text-white transition decoration-none">Data Deletion Status</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition decoration-none">XML Sitemap</Link></li>
              <li><Link href="/sitemap_index.xml" className="hover:text-white transition decoration-none">Sitemap Index</Link></li>
            </ul>
          </div>

        </div>



      </div>
    </footer>
  )
}

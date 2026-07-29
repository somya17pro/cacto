'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1A1510] text-[#FAF6EE] border-t-2 border-[#1A1510] pt-16 pb-12 text-left select-none relative overflow-hidden">
      
      {/* Top Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#16A34A]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-14">
        
        {/* Top Callout Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-[#1A1510] to-zinc-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Meta Graph API Engine</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white">
              Ready to turn Reel comments into automatic sales?
            </h3>
            <p className="text-xs text-zinc-400 font-medium max-w-xl">
              Deliver instant checkout links, lead magnet PDFs, and custom DM dispatches in under 3 seconds without link-in-bio drop-off.
            </p>
          </div>
          <Link
            href="/?waitlist=true"
            className="inline-flex items-center gap-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white px-6 py-3.5 rounded-full font-extrabold text-xs transition-all shadow-lg hover:shadow-emerald-900/30 hover:scale-[1.02] shrink-0 decoration-none"
          >
            <span>Get Early Access Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          
          {/* Col 1: Brand & Status */}
          <div className="space-y-4">
            <Link href="/" className="font-serif text-3xl font-black tracking-tight text-white lowercase flex items-center gap-2.5 decoration-none">
              <span className="text-2xl">🌵</span> cacto
            </Link>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              The zero-friction Instagram comment-to-DM automation tool for creators, educators, and e-commerce stores.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-xl w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Meta API v20.0 • All Systems Operational</span>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold">© 2026 Cacto Inc. Made with 💚</p>
            </div>
          </div>

          {/* Col 2: Platform & Comparison Pages */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-[#16A34A] tracking-wider block">Platform &amp; Ecosystem</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/#features" className="hover:text-white transition decoration-none">Features Overview</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition decoration-none">How It Works</Link></li>
              <li><Link href="/templates" className="hover:text-white transition decoration-none">DM Automation Templates</Link></li>
              <li><Link href="/compare/cacto-vs-manychat" className="hover:text-white transition decoration-none">Cacto vs. ManyChat Comparison</Link></li>
              <li><Link href="/about" className="hover:text-white transition decoration-none">About Cacto</Link></li>
              <li><Link href="/open" className="hover:text-white transition decoration-none">Cacto /Open Metrics</Link></li>
            </ul>
          </div>

          {/* Col 3: Free Growth Utilities */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-[#16A34A] tracking-wider block">Free Growth Utilities</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/tools/engagement-calculator" className="hover:text-white transition decoration-none">Engagement Calculator</Link></li>
              <li><Link href="/tools/bio-generator" className="hover:text-white transition decoration-none">Instagram Bio Generator</Link></li>
              <li><Link href="/tools/banned-hashtag-checker" className="hover:text-white transition decoration-none">Banned Hashtag Scanner</Link></li>
              <li><Link href="/tools/meta-24hr-window-calculator" className="hover:text-white transition decoration-none">24-Hour Window Calculator</Link></li>
              <li><Link href="/tools/shadowban-risk-simulator" className="hover:text-white transition decoration-none">Shadowban Risk Simulator</Link></li>
              <li><Link href="/tools/bio-seo-auditor" className="hover:text-white transition decoration-none">Bio SEO Auditor</Link></li>
              <li><Link href="/tools" className="text-[#16A34A] font-extrabold hover:underline transition decoration-none flex items-center gap-1 mt-1">View All 100 Free Tools &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 4: Featured Masterclasses */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-[#16A34A] tracking-wider block">Featured Masterclasses</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/blog/definitive-guide-instagram-dm-automation" className="hover:text-white transition decoration-none">Instagram DM Automation Guide</Link></li>
              <li><Link href="/blog/how-to-automate-dm-on-instagram-reel-comment" className="hover:text-white transition decoration-none">Automate Reel Comment DMs</Link></li>
              <li><Link href="/blog/how-to-send-automated-link-in-dm-instagram" className="hover:text-white transition decoration-none">Send Automated Links in DMs</Link></li>
              <li><Link href="/blog/how-to-create-comment-to-dm-sales-funnel" className="hover:text-white transition decoration-none">40%+ DM Sales Funnel Playbook</Link></li>
              <li><Link href="/blog/manychat-alternatives-instagram-dm-automation" className="hover:text-white transition decoration-none">10 Best ManyChat Alternatives</Link></li>
              <li><Link href="/blog" className="text-[#16A34A] font-extrabold hover:underline transition decoration-none flex items-center gap-1 mt-1">View All 100 Blogs &rarr;</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Disclosure Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-400 pt-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <p>Cacto is an official Meta Graph API developer integration. All trademarks belong to their respective owners.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold">
            <Link href="/privacy" className="hover:text-white transition decoration-none">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition decoration-none">Terms of Service</Link>
            <Link href="/data-deletion" className="hover:text-white transition decoration-none">Data Deletion</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition decoration-none">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}

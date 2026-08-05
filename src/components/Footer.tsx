'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1A1510] text-[#FAF6EE] border-t-2 border-[#1A1510] pt-16 pb-12 text-left select-none relative overflow-hidden">
      
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
          <Link
            href="/?waitlist=true"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-full font-extrabold text-xs transition-all shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.02] active:scale-95 shrink-0 decoration-none relative z-10 border border-emerald-400/30"
          >
            <span>Get Early Access Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
              <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-xl w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Meta API v20.0 • All Systems Operational</span>
              </div>
              <p className="text-[11px] text-zinc-500 font-bold flex items-center gap-1">
                © 2026 Cacto Inc. Made with <Heart className="w-3 h-3 text-emerald-500 inline fill-emerald-500" /> for creators.
              </p>
            </div>
          </div>

          {/* Col 2: Platform & Ecosystem */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">Platform &amp; Ecosystem</span>
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
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">1,010 Free Growth Utilities</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/tools/social/fast-image-resizer" className="hover:text-white transition decoration-none">Fast Image Resizer Pro</Link></li>
              <li><Link href="/tools/converters/fast-png-compressor" className="hover:text-white transition decoration-none">Fast PNG Compressor</Link></li>
              <li><Link href="/tools/developer/fast-json-validator-pro" className="hover:text-white transition decoration-none">JSON Validator Pro</Link></li>
              <li><Link href="/tools/seo/fast-serp-snippet-simulator" className="hover:text-white transition decoration-none">SERP Snippet Simulator</Link></li>
              <li><Link href="/tools/finance/fast-saas-mrr-calculator" className="hover:text-white transition decoration-none">SaaS MRR Growth Calculator</Link></li>
              <li><Link href="/tools/legal/fast-privacy-policy-generator" className="hover:text-white transition decoration-none">Privacy Policy Generator</Link></li>
              <li><Link href="/tools" className="text-emerald-400 font-extrabold hover:underline transition decoration-none flex items-center gap-1 mt-1">Explore All 1,010 Free Tools &rarr;</Link></li>
            </ul>
          </div>

          {/* Col 4: Masterclass Blogs */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">Masterclass Blogs</span>
            <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-300">
              <li><Link href="/blog/how-to-automate-instagram-dms-safely" className="hover:text-white transition decoration-none">Automate Instagram DMs Safely</Link></li>
              <li><Link href="/blog/top-5-instagram-automation-strategies" className="hover:text-white transition decoration-none">Top 5 Automation Strategies</Link></li>
              <li><Link href="/blog/definitive-guide-instagram-comment-auto-reply" className="hover:text-white transition decoration-none">Definitive Comment Auto-Reply Guide</Link></li>
              <li><Link href="/blog/why-manychat-alternatives-are-rising" className="hover:text-white transition decoration-none">Why ManyChat Alternatives Rise</Link></li>
              <li><Link href="/blog/how-to-craft-high-converting-comment-cta" className="hover:text-white transition decoration-none">Craft High-Converting CTAs</Link></li>
              <li><Link href="/blog" className="text-emerald-400 font-extrabold hover:underline transition decoration-none flex items-center gap-1 mt-1">Explore All 100 Blogs &rarr;</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Disclosure Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-400 pt-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <p>Cacto is an official Meta Graph API integration. All trademarks belong to their respective owners.</p>
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

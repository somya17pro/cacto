'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#FAF6EE] border-t-2 border-[#1A1510] pt-16 pb-12 text-left select-none space-y-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Tagline */}
        <div className="space-y-4">
          <Link href="/" className="font-serif text-3xl font-black tracking-tight text-[#1A1510] lowercase flex items-center gap-2 decoration-none">
            <span>🌵</span> cacto
          </Link>
          <p className="text-xs text-zinc-600 font-medium leading-relaxed">
            The zero-friction Instagram DM automation engine. Convert Reel comments into direct sales without link-in-bio drop-off.
          </p>
          <p className="text-[11px] text-zinc-400 font-bold pt-2">© 2026 Cacto Inc. Made with 💚</p>
        </div>

        {/* Col 2: Growth Utilities */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">Free Growth Utilities</span>
          <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-700">
            <li><Link href="/tools/engagement-calculator" className="hover:text-[#16A34A] transition decoration-none">Engagement Calculator</Link></li>
            <li><Link href="/tools/bio-generator" className="hover:text-[#16A34A] transition decoration-none">Instagram Bio Generator</Link></li>
            <li><Link href="/tools/banned-hashtag-checker" className="hover:text-[#16A34A] transition decoration-none">Banned Hashtag Scanner</Link></li>
            <li><Link href="/tools/meta-24hr-window-calculator" className="hover:text-[#16A34A] transition decoration-none">24-Hour Window Calculator</Link></li>
            <li><Link href="/tools/shadowban-risk-simulator" className="hover:text-[#16A34A] transition decoration-none">Shadowban Risk Simulator</Link></li>
            <li><Link href="/tools/bio-seo-auditor" className="hover:text-[#16A34A] transition decoration-none">Bio SEO Auditor</Link></li>
            <li><Link href="/tools/sponsored-rate-calculator" className="hover:text-[#16A34A] transition decoration-none">Sponsored Rate Calculator</Link></li>
            <li><Link href="/tools/dm-funnel-calculator" className="hover:text-[#16A34A] transition decoration-none">DM Funnel ROI Calculator</Link></li>
          </ul>
        </div>

        {/* Col 3: Masterclass Guides */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">Featured Masterclasses</span>
          <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-700">
            <li><Link href="/blog/definitive-guide-instagram-dm-automation" className="hover:text-[#16A34A] transition decoration-none">Instagram DM Automation Guide</Link></li>
            <li><Link href="/blog/how-to-automate-dm-on-instagram-reel-comment" className="hover:text-[#16A34A] transition decoration-none">Automate Reel Comment DMs</Link></li>
            <li><Link href="/blog/how-to-send-automated-link-in-dm-instagram" className="hover:text-[#16A34A] transition decoration-none">Send Automated Links in DMs</Link></li>
            <li><Link href="/blog/how-to-create-comment-to-dm-sales-funnel" className="hover:text-[#16A34A] transition decoration-none">40%+ DM Sales Funnel Playbook</Link></li>
            <li><Link href="/blog/manychat-alternatives-instagram-dm-automation" className="hover:text-[#16A34A] transition decoration-none">10 Best ManyChat Alternatives</Link></li>
            <li><Link href="/blog/manychat-vs-cacto-vs-mobilemonkey" className="hover:text-[#16A34A] transition decoration-none">ManyChat vs. Cacto vs. MobileMonkey</Link></li>
            <li><Link href="/blog/future-of-instagram-dm-automation-2026" className="hover:text-[#16A34A] transition decoration-none">Future of Instagram DMs in 2026</Link></li>
            <li><Link href="/blog/how-does-comment-to-dm-automation-work-technical" className="hover:text-[#16A34A] transition decoration-none">Meta Graph API Technical Guide</Link></li>
          </ul>
        </div>

        {/* Col 4: Platform Navigation */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase text-[#16A34A] tracking-wider block">Navigation & Open Metric</span>
          <ul className="space-y-2 list-none pl-0 text-xs font-semibold text-zinc-700">
            <li><Link href="/" className="hover:text-[#16A34A] transition decoration-none">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#16A34A] transition decoration-none">About Cacto</Link></li>
            <li><Link href="/tools" className="hover:text-[#16A34A] transition decoration-none">All 100 Free Growth Utilities</Link></li>
            <li><Link href="/blog" className="hover:text-[#16A34A] transition decoration-none">All 100 Masterclass Articles</Link></li>
            <li><Link href="/open" className="hover:text-[#16A34A] transition decoration-none">Cacto /Open Metrics</Link></li>
            <li><Link href="/compare/cacto-vs-manychat" className="hover:text-[#16A34A] transition decoration-none">Cacto vs. ManyChat Comparison</Link></li>
            <li><Link href="/templates" className="hover:text-[#16A34A] transition decoration-none">DM Automation Templates</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
        <p>Cacto is an official Meta Graph API developer integration. All trademarks belong to their respective owners.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-[#16A34A] transition decoration-none">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#16A34A] transition decoration-none">Terms of Service</Link>
          <Link href="/data-deletion" className="hover:text-[#16A34A] transition decoration-none">Data Deletion</Link>
          <Link href="/blog" className="hover:text-[#16A34A] transition decoration-none">Blog</Link>
          <Link href="/tools" className="hover:text-[#16A34A] transition decoration-none">Tools</Link>
          <Link href="/open" className="hover:text-[#16A34A] transition decoration-none">Transparency</Link>
        </div>
      </div>
    </footer>
  )
}

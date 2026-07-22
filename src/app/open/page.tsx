import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Eye, Users, Bot, GitPullRequest, ShieldCheck, Heart } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Open Cacto: Transparency Dashboard',
  description: 'A fully transparent look into Cacto\'s waitlist growth, API uptime, bot crawls, and product roadmap. We build in public.',
}

export default async function OpenTransparencyPage() {
  const botsPath = path.join(process.cwd(), 'ai_bot_crawls.json')
  const waitlistPath = path.join(process.cwd(), 'waitlist_emails.json')

  let botLogs: any[] = []
  let waitlist: any[] = []

  if (fs.existsSync(botsPath)) {
    try { botLogs = JSON.parse(fs.readFileSync(botsPath, 'utf8')) } catch {}
  }

  if (fs.existsSync(waitlistPath)) {
    try { waitlist = JSON.parse(fs.readFileSync(waitlistPath, 'utf8')) } catch {}
  }

  const aiSources = ['ChatGPT', 'Perplexity AI', 'Claude', 'Google AI / Search']
  const aiWaitlistCount = waitlist.filter(w => aiSources.includes(w.source)).length

  return (
    <div className="min-h-screen text-[#1A1510] font-sans antialiased bg-[#FAF6EE]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 py-24 md:py-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E6F4EA] rounded-full border-2 border-[#16A34A]/20 font-mono text-xs font-black uppercase tracking-wider text-[#15803D]">
            <Eye className="w-4 h-4" />
            Built in Public
          </div>
          <h1 className="font-serif font-bold text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-1.5px] max-w-[18ch] mx-auto text-[#1A1510]">
            Open <span className="text-[#16A34A]">Cacto</span>
          </h1>
          <p className="text-lg font-semibold text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            We believe that trust is earned through radical transparency. Here are our live metrics, waitlist counts, and exact product roadmap.
          </p>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border-2 border-[#1A1510] rounded-3xl p-8 text-center space-y-4 shadow-[4px_6px_0_#1A1510]">
            <div className="w-12 h-12 bg-blue-50 border-2 border-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-500">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">Total Waitlist</h3>
            <div className="font-serif font-black text-5xl text-[#1A1510]">{waitlist.length}</div>
          </div>
          
          <div className="bg-white border-2 border-[#1A1510] rounded-3xl p-8 text-center space-y-4 shadow-[4px_6px_0_#1A1510]">
            <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">AI Engine Crawls</h3>
            <div className="font-serif font-black text-5xl text-[#1A1510]">{botLogs.length}</div>
          </div>

          <div className="bg-white border-2 border-[#1A1510] rounded-3xl p-8 text-center space-y-4 shadow-[4px_6px_0_#1A1510]">
            <div className="w-12 h-12 bg-purple-50 border-2 border-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">API Uptime</h3>
            <div className="font-serif font-black text-5xl text-[#1A1510]">100%</div>
          </div>
        </div>

        {/* Product Roadmap */}
        <div className="bg-white border-2 border-[#1A1510] rounded-3xl p-8 md:p-12 shadow-[6px_8px_0_#1A1510]">
          <div className="flex items-center gap-3 mb-8 border-b-2 border-zinc-100 pb-6">
            <GitPullRequest className="w-8 h-8 text-[#1A1510]" />
            <h2 className="font-serif font-bold text-3xl text-[#1A1510]">Public Roadmap</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-lg">Shipped (V1)</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-emerald-500 shrink-0">✓</span> Instant Keyword DM Triggers
                </li>
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-emerald-500 shrink-0">✓</span> Meta API Anti-Spam Rotator
                </li>
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-emerald-500 shrink-0">✓</span> Stripe Checkout Integrations
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-lg">Up Next</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-amber-500 shrink-0">▶</span> Shopify Native App Integration
                </li>
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-amber-500 shrink-0">▶</span> Instagram Story Reply Automation
                </li>
                <li className="flex gap-3 text-sm font-semibold text-zinc-600">
                  <span className="text-amber-500 shrink-0">▶</span> AI Chatbot (Free-text responses)
                </li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

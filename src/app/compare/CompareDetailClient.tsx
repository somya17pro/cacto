'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CompetitorComparison } from '@/utils/competitorData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WaitlistModal from '@/components/WaitlistModal'
import { ArrowLeft, Check, X, Sparkles, ArrowRight, Shield, Zap, Calculator, HelpCircle } from 'lucide-react'

export default function CompareDetailClient({ competitor }: { competitor: CompetitorComparison }) {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const [contactsCount, setContactsCount] = useState(5000)

  // Interactive Switch & Save Calculator
  const estimatedManychatCost = Math.round(15 + (contactsCount / 5000) * 45)
  const cactoFlatCost = 19
  const monthlySavings = Math.max(0, estimatedManychatCost - cactoFlatCost)
  const yearlySavings = monthlySavings * 12

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      <Navbar onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 space-y-12 text-left">
        {/* Back Link */}
        <Link
          href="/compare/cacto-vs-manychat"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition"
        >
          <ArrowLeft className="h-4 w-4" /> Compare Solutions
        </Link>

        {/* Hero Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Competitive Head-to-Head Comparison</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1A1510] leading-tight tracking-tight">
            Cacto vs. {competitor.name}: Which Instagram DM Automation Platform is Right for You?
          </h1>

          <p className="text-zinc-600 text-xs md:text-sm font-semibold leading-relaxed max-w-3xl">
            {competitor.tagline} Compare pricing models, execution speeds, free tools ecosystems, and Meta Graph API compliance side-by-side.
          </p>
        </header>

        {/* Interactive "Switch & Save Calculator" */}
        <section
          className="p-6 md:p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6"
          style={{ boxShadow: '6px 8px 0 #1A1510' }}
        >
          <div className="flex items-center justify-between border-b border-dashed border-zinc-200 pb-4">
            <div className="flex items-center gap-2 text-[#16A34A] font-extrabold text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Interactive Switch & Save Calculator</span>
            </div>
            <span className="text-[10px] font-black uppercase bg-[#16A34A] text-white px-2.5 py-0.5 rounded-full">
              Real-Time Savings Engine
            </span>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-extrabold text-zinc-700 block">
              Estimated Monthly Active Contacts: <span className="text-[#16A34A] font-black text-base">{contactsCount.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={contactsCount}
              onChange={(e) => setContactsCount(Number(e.target.value))}
              className="w-full accent-[#16A34A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-extrabold text-zinc-400">
              <span>500 Contacts</span>
              <span>25,000 Contacts</span>
              <span>50,000 Contacts</span>
            </div>
          </div>

          {/* Calculator Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-100 border border-zinc-300 text-center">
              <span className="text-[10px] font-black text-zinc-500 uppercase block">{competitor.name} Est. Cost</span>
              <span className="text-2xl font-black text-zinc-800">${estimatedManychatCost}/mo</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-[#16A34A] text-center">
              <span className="text-[10px] font-black text-[#16A34A] uppercase block">Cacto Flat Creator Price</span>
              <span className="text-2xl font-black text-[#16A34A]">$19/mo</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center">
              <span className="text-[10px] font-black text-amber-800 uppercase block">Your Annual Net Savings</span>
              <span className="text-2xl font-black text-amber-900">+${yearlySavings.toLocaleString()}/yr</span>
            </div>
          </div>

          <button
            onClick={() => setIsWaitlistModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs md:text-sm transition-all shadow-[4px_4px_0_#1A1510] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer border-2 border-[#1A1510] flex items-center justify-center gap-2"
          >
            <span>Lock In Flat $19/mo Creator Pricing Now 🚀</span>
          </button>
        </section>

        {/* Feature Comparison Matrix Table */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-black text-[#1A1510]">
            Feature-by-Feature Comparison
          </h2>

          <div className="overflow-x-auto rounded-[24px] border-2 border-[#1A1510] bg-white" style={{ boxShadow: '5px 7px 0 #1A1510' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1A1510] text-[#FAF6EE] text-xs font-black uppercase">
                  <th className="p-4 border-b border-zinc-700">Capability / Metric</th>
                  <th className="p-4 border-b border-zinc-700 text-[#16A34A]">Cacto</th>
                  <th className="p-4 border-b border-zinc-700">{competitor.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-xs font-bold text-[#1A1510]">
                {competitor.featuresMatrix.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}>
                    <td className="p-4 font-black">{row.feature}</td>
                    <td className="p-4 text-[#16A34A] bg-emerald-50/50">{row.cacto}</td>
                    <td className="p-4 text-zinc-600">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose Guide */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-[24px] bg-emerald-50 border-2 border-[#16A34A] space-y-4">
            <h3 className="font-serif text-lg font-black text-[#16A34A]">
              Choose Cacto If You Want:
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-zinc-800">
              {competitor.whenToChooseCacto.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-[24px] bg-zinc-50 border-2 border-zinc-300 space-y-4">
            <h3 className="font-serif text-lg font-black text-zinc-700">
              Choose {competitor.name} If You Need:
            </h3>
            <ul className="space-y-2.5 text-xs font-bold text-zinc-600">
              {competitor.whenToChooseCompetitor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-black text-[#1A1510]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {competitor.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-[20px] bg-white border-2 border-[#1A1510] space-y-2 text-left" style={{ boxShadow: '4px 5px 0 #1A1510' }}>
                <h3 className="font-extrabold text-sm text-[#1A1510] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#16A34A]" />
                  {faq.q}
                </h3>
                <p className="text-xs font-medium text-zinc-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}

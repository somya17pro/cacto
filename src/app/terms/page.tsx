import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Cacto - Instagram DM Automation',
  description: 'Terms of Service governing the use of Cacto website, free growth tools, and Instagram comment-to-DM automation services.',
  alternates: {
    canonical: 'https://cacto.cc/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <header className="space-y-3 border-b border-zinc-200 pb-6">
          <h1 className="font-serif text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-xs font-semibold text-zinc-500">Last updated: July 29, 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">1. Agreement to Terms</h2>
            <p>
              By accessing or using Cacto (&quot;Service&quot;) at <a href="https://cacto.cc" className="text-[#16A34A] underline font-semibold">https://cacto.cc</a>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">2. Service Description &amp; Meta Compliance</h2>
            <p>
              Cacto provides automated comment-to-DM link delivery tools and analytics for Instagram creators. You agree to use Cacto strictly in compliance with Meta Developer Platform Policies, Instagram Community Guidelines, and applicable anti-spam laws.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">3. Acceptable Use</h2>
            <p>You agree not to use Cacto to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Send unsolicited bulk messages or deceptive commercial spam.</li>
              <li>Violate Meta API rate limits or attempt to bypass security guardrails.</li>
              <li>Distribute malicious software, unlawful content, or infringe upon third-party intellectual property rights.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">4. Intellectual Property &amp; Subscriptions</h2>
            <p>
              Cacto and its original content, features, and functionality remain the exclusive property of Cacto and its founder. Subscriptions are billed at the advertised flat rate and can be canceled at any time.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">5. Limitation of Liability</h2>
            <p>
              Cacto is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We are not liable for third-party platform API outages, network delays, or Instagram policy changes outside our direct control.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">6. Contact Information</h2>
            <p>
              For legal inquiries regarding these Terms, contact us at <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

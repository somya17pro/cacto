import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Cacto - Instagram DM Automation',
  description: 'Terms of Service governing the use of Cacto website, free growth tools, and Instagram comment-to-DM automation services in compliance with Meta Platform Policies.',
  alternates: {
    canonical: 'https://cacto.cc/terms',
  },
}

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://cacto.cc/terms/#webpage',
        name: 'Terms of Service | Cacto - Instagram DM Automation',
        url: 'https://cacto.cc/terms',
        description: 'Terms of Service governing the use of Cacto website, free growth tools, and Instagram comment-to-DM automation services.'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/terms/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://cacto.cc/terms' }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <header className="space-y-3 border-b border-zinc-200 pb-6">
          <h1 className="font-serif text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-xs font-semibold text-zinc-500">Last updated: August 5, 2026 • Effective Date: August 5, 2026</p>
        </header>

        <section className="space-y-8 text-sm leading-relaxed text-zinc-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or using Cacto (&quot;Service&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) at <a href="https://cacto.cc" className="text-[#16A34A] underline font-semibold">https://cacto.cc</a>, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must immediately cease accessing and using our website and services.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">2. Service Description &amp; Meta Developer Platform Compliance</h2>
            <p>
              Cacto provides automated comment-to-DM link delivery tools, campaign analytics, and free growth utilities for creators, educators, and e-commerce businesses. You agree to use Cacto strictly in compliance with Meta Developer Platform Terms, Instagram Community Guidelines, the CAN-SPAM Act, GDPR, and all applicable global advertising standards.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">3. Acceptable Use &amp; Anti-Spam Requirements</h2>
            <p>You strictly agree not to use Cacto to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Send unsolicited bulk messages, deceptive commercial spam, or phishing links to Instagram users.</li>
              <li>Exceed or attempt to bypass Meta API velocity rate limits or security filters.</li>
              <li>Use single static comment replies at velocity without utilizing comment reply rotators or jitter delays.</li>
              <li>Attempt to scrape, reverse engineer, or decompile any part of the Cacto platform or Meta Graph API endpoints.</li>
              <li>Distribute malicious software, unlawful content, hate speech, or infringe upon third-party intellectual property rights.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">4. Account Registration &amp; Security</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account login credentials and for all activities conducted under your account. You agree to notify us immediately of any unauthorized access or security breaches.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">5. Subscriptions, Payments &amp; Cancellations</h2>
            <p>
              Cacto offers free access to standalone growth tools and flat-rate monthly/annual subscription plans for Instagram DM automation. Payments are processed securely via Stripe. You may cancel your subscription at any time via your account settings. Subscriptions remain active until the end of the current billing cycle.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">6. Intellectual Property Rights</h2>
            <p>
              Cacto and its original code, logos, visual interfaces, documentation, and tools are the exclusive intellectual property of Cacto Inc. Instagram, Facebook, and Meta are trademarks of Meta Platforms, Inc. Cacto is an independent integration utilizing official Meta Graph API nodes.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">7. Limitation of Liability &amp; Disclaimers</h2>
            <p>
              Cacto is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. We are not liable for indirect, incidental, or consequential damages resulting from third-party platform API maintenance outages, network latency, or account actions resulting from non-compliant user activities.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">8. Governing Law &amp; Legal Inquiries</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable state and federal laws. For questions or formal legal notices regarding these Terms, contact us at <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

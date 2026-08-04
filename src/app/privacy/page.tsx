import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cacto - Instagram DM Automation',
  description: 'Cacto Privacy Policy detailing how we collect, use, and protect your data in compliance with GDPR and Meta Graph API platform guidelines.',
  alternates: {
    canonical: 'https://cacto.cc/privacy',
  },
}

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://cacto.cc/privacy/#webpage',
        name: 'Privacy Policy | Cacto - Instagram DM Automation',
        url: 'https://cacto.cc/privacy',
        description: 'Cacto Privacy Policy detailing how we collect, use, and protect your data in compliance with GDPR and Meta Graph API platform guidelines.'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/privacy/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://cacto.cc/privacy' }
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
          <h1 className="font-serif text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xs font-semibold text-zinc-500">Last updated: July 29, 2026</p>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">1. Introduction</h2>
            <p>
              Cacto (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website <a href="https://cacto.cc" className="text-[#16A34A] underline font-semibold">https://cacto.cc</a> and associated Instagram direct message automation services. We are committed to protecting your personal information and respecting your privacy in compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and Meta Developer Platform Policies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">2. Information We Collect</h2>
            <p>We collect information you provide directly to us when using our services:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Account &amp; Contact Information:</strong> Email addresses provided during waitlist registration or account creation.</li>
              <li><strong>Instagram Platform Data:</strong> Account ID, handle, public comments, and webhook event payloads received through authorized Meta OAuth permissions.</li>
              <li><strong>Usage &amp; Analytics Data:</strong> Anonymized browser information, device type, and feature interaction metrics.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">3. How We Use Your Information</h2>
            <p>We use collected data solely to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Trigger automated direct message link deliveries upon receiving matching Instagram keyword comments.</li>
              <li>Monitor API rate limit compliance and prevent spam flags via dynamic comment reply rotators.</li>
              <li>Send critical system notifications and product updates.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">4. Data Protection &amp; Meta API Security</h2>
            <p>
              Cacto accesses Meta Graph API endpoints strictly using OAuth 2.0 authorized user access tokens. Access tokens and sensitive account credentials are encrypted at rest and in transit. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">5. Your Rights &amp; Data Deletion Requests</h2>
            <p>
              You have the right to access, rectify, or request deletion of your personal data at any time. To submit a data deletion request, visit our <Link href="/data-deletion" className="text-[#16A34A] underline font-semibold">Data Deletion Request Page</Link> or email us at <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a>.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

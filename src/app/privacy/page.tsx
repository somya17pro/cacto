import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cacto - Instagram DM Automation',
  description: 'Cacto Privacy Policy detailing how we collect, use, and protect your data in compliance with GDPR, ePrivacy Directive, and Meta Graph API platform guidelines.',
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
          <p className="text-xs font-semibold text-zinc-500">Last updated: August 5, 2026 • Effective Date: August 5, 2026</p>
        </header>

        <section className="space-y-8 text-sm leading-relaxed text-zinc-800">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">1. Introduction &amp; Overview</h2>
            <p>
              Cacto (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website <a href="https://cacto.cc" className="text-[#16A34A] underline font-semibold">https://cacto.cc</a> and associated Instagram direct message automation services. We are dedicated to maintaining the trust and privacy of our visitors, creators, and business users. This Privacy Policy details how we collect, process, store, and safeguard personal information in full compliance with global privacy regulations, including the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act, the California Consumer Privacy Act (CCPA/CPRA), the ePrivacy Directive, and Meta Developer Platform Policies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">2. Information We Collect</h2>
            <p>We collect information directly provided by you, as well as data received through authorized platform integrations:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Account &amp; Contact Data:</strong> Name, email address, and authentication credentials provided during sign-up, magic link requests, or waitlist submissions.</li>
              <li><strong>Meta &amp; Instagram Platform Data:</strong> Authorized profile handles, Instagram Business/Creator Account IDs, public comment text triggers, and webhook events delivered via official Meta Graph API v20.0+ OAuth tokens.</li>
              <li><strong>Financial &amp; Billing Data:</strong> Payment processing is handled securely by Stripe. We do not store full payment card details or CVVs on our servers.</li>
              <li><strong>Technical Telemetry &amp; Device Information:</strong> Anonymized IP addresses, browser types, operating systems, and page interaction metrics.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">3. Meta Graph API Data Standards &amp; Purpose Limitation</h2>
            <p>
              Cacto accesses Meta Graph API endpoints strictly through OAuth 2.0 user permission flows (such as <code>instagram_basic</code>, <code>instagram_manage_comments</code>, and <code>instagram_manage_messages</code>). We strictly adhere to Meta Developer Platform Terms (Section 3 - Data Use and Protection):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Purpose Limitation:</strong> Meta platform data is processed solely to execute user-configured comment-to-DM automation workflows and comment reply rotations.</li>
              <li><strong>No Data Transfer or Sale:</strong> We never sell, rent, license, or transfer Meta platform data or user contact records to third-party ad networks, data brokers, or marketing aggregates.</li>
              <li><strong>Data Retention &amp; Auto-Purging:</strong> Meta platform data and tokens are retained only for as long as necessary to maintain active automation service. Upon permission revocation or data deletion requests, stored tokens and account data are permanently purged.</li>
            </ul>
          </div>

          <div className="space-y-3" id="cookies">
            <h2 className="text-lg font-bold text-[#1A1510]">4. Cookie Tracking Policy &amp; Analytics</h2>
            <p>
              In compliance with the ePrivacy Directive and GDPR consent requirements, Cacto uses essential and optional cookies on <a href="https://cacto.cc" className="text-[#16A34A] underline font-semibold">https://cacto.cc</a>:
            </p>
            <div className="p-4 rounded-2xl bg-white border border-zinc-200 space-y-3 text-xs">
              <div>
                <strong className="text-[#1A1510]">Strictly Necessary Cookies:</strong>
                <p className="text-zinc-600 mt-0.5">Includes session authentication cookies (<code>sb-*-auth-token</code>) and local consent state identifiers (<code>cacto_cookie_consent</code>). These are required for secure operation and cannot be disabled.</p>
              </div>
              <div>
                <strong className="text-[#1A1510]">Analytics &amp; Performance Cookies:</strong>
                <p className="text-zinc-600 mt-0.5">We utilize Google Analytics with Default Consent Mode set to <code>denied</code> for unconsented visitors. Analytics cookies (e.g. <code>_ga</code>) are initialized only when explicitly accepted via our Cookie Preference Banner.</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600">
              You can modify your cookie preferences at any time by clearing your browser cache or updating preferences via the Cookie Banner at the bottom of the page.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">5. Data Security &amp; Encryption Standards</h2>
            <p>
              All data transmitted between your browser, our servers, and Meta Graph API endpoints is protected using Transport Layer Security (TLS 1.3 / HTTPS). Sensitive access tokens, secret keys, and database records are encrypted at rest using AES-256 encryption within isolated server environments.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">6. Your Rights Under GDPR &amp; CCPA</h2>
            <p>Depending on your jurisdiction, you possess the following privacy rights:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Right of Access &amp; Portability:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal information.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request permanent deletion of your account and associated Meta data.</li>
              <li><strong>Right to Restrict or Object to Processing:</strong> Opt out of optional analytics tracking or communications.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">7. Data Deletion Instructions</h2>
            <p>
              To execute your right to data erasure or revoke Meta API access, visit our dedicated <Link href="/data-deletion" className="text-[#16A34A] underline font-semibold">Data Deletion Request Page</Link>, or send an email to <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a> with your account handle. We confirm and execute complete data purges within 24 to 48 hours.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#1A1510]">8. Contact Information</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to our Data Protection Officer at <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-semibold">support@cacto.cc</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

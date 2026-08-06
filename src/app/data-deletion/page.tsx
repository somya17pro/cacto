import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShieldCheck, CheckCircle2, Trash2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | Cacto',
  description: 'Instructions on how to request deletion of your account data and remove Cacto Instagram permissions in compliance with Meta Developer Platform Policies.',
  alternates: {
    canonical: 'https://cacto.cc/data-deletion',
  },
  openGraph: {
    title: 'Data Deletion Instructions | Cacto',
    description: 'How to request deletion of your account data and remove Cacto Instagram permissions.',
    url: 'https://cacto.cc/data-deletion',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Data Deletion Instructions | Cacto',
    description: 'How to request deletion of your account data and remove Cacto Instagram permissions.',
  },
}

export default async function DataDeletionPage({
  searchParams,
}: {
  searchParams?: Promise<{ code?: string }>
}) {
  const resolvedParams = searchParams ? await searchParams : {}
  const code = resolvedParams?.code

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 space-y-8">
        <header className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Meta Developer Platform Policy Standard</span>
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight">Data Deletion Instructions</h1>
          <p className="text-xs font-semibold text-zinc-500">
            User Rights &amp; Automated Data Purging Guidelines under GDPR &amp; Meta Developer Rules
          </p>
        </header>

        {code && (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border-2 border-[#16A34A] space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A]">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              <span>CONFIRMATION STATUS: DATA PURGED 🟢</span>
            </div>
            <p className="text-xs text-zinc-800 font-bold">
              Confirmation Code:{' '}
              <code className="bg-white px-2.5 py-1 rounded border border-[#16A34A] text-emerald-800 font-mono">
                {code}
              </code>
            </p>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
              In accordance with Meta Developer Platform Terms and GDPR Article 17 (&quot;Right to Erasure&quot;), all user access tokens, cached profile data, connected Instagram account IDs, and automation campaign logs linked to this deletion request have been permanently purged from our database.
            </p>
          </div>
        )}

        <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
          <p>
            Cacto respects user privacy and strictly complies with Meta Developer Platform Terms regarding user data ownership and retention. You retain full control over your Instagram connected accounts and personal data.
          </p>

          <div className="space-y-4 p-6 rounded-2xl bg-white border-2 border-[#1A1510]" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <h2 className="text-base font-bold text-[#1A1510] flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-[#16A34A]" />
              <span>Option 1: Automatic Deletion via Meta / Instagram App Revocation</span>
            </h2>
            <p className="text-xs text-zinc-600">
              When you revoke Cacto&apos;s permissions from your Facebook or Instagram account, Meta automatically invokes our Data Deletion Callback URL (<code>https://cacto.cc/api/webhooks/data-deletion</code>) via a signed HMAC request:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs font-medium">
              <li>Log in to your Instagram account or Facebook Business Manager profile.</li>
              <li>Navigate to <strong>Settings &amp; Privacy</strong> &rarr; <strong>Website Permissions</strong> &rarr; <strong>Apps and Websites</strong>.</li>
              <li>Locate <strong>Cacto</strong> in the active apps list.</li>
              <li>Click <strong>Remove</strong> to revoke all Meta Graph API OAuth access tokens.</li>
              <li>Our webhook immediately purges your connected access tokens and campaign data, providing Meta with a unique confirmation code status URL.</li>
            </ol>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-white border-2 border-[#1A1510]" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <h2 className="text-base font-bold text-[#1A1510]">Option 2: Direct Email Data Deletion Request</h2>
            <p className="text-xs">
              To request manual purging of your email address, waitlist entries, payment records, or automation analytics from our servers, submit an email to <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-bold">support@cacto.cc</a> with the subject line <strong>&quot;Data Deletion Request&quot;</strong> along with your account email or Instagram handle. Our privacy operations team executes manual data purges within 24 to 48 hours and issues a confirmation receipt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-100 border border-zinc-300 space-y-2 text-xs text-zinc-600">
            <h3 className="font-bold text-[#1A1510]">Data Retention &amp; Security Policy</h3>
            <p>
              Once a deletion request is executed, your data cannot be recovered. Backup logs containing unidentifiable aggregate technical metrics are overwritten within 14 days. Read our full <Link href="/privacy" className="text-[#16A34A] underline font-bold">Privacy Policy</Link> for additional details.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

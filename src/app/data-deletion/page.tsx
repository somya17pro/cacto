import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | Cacto',
  description: 'Instructions on how to request deletion of your account data and remove Cacto Instagram permissions in compliance with Meta Platform Policies.',
  alternates: {
    canonical: 'https://cacto.cc/data-deletion',
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
          <h1 className="font-serif text-4xl font-bold tracking-tight">Data Deletion Instructions</h1>
          <p className="text-xs font-semibold text-zinc-500">Meta Platform Policy Compliance</p>
        </header>

        {code && (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border-2 border-[#16A34A] space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A34A]">
              <span>Confirmation Status: DATA PURGED 🟢</span>
            </div>
            <p className="text-xs text-zinc-800 font-bold">
              Confirmation Code: <code className="bg-white px-2 py-0.5 rounded border border-[#16A34A]">{code}</code>
            </p>
            <p className="text-xs text-zinc-600 font-medium">
              In accordance with Meta Developer Platform Rules, your user access tokens, cached account data, and automation logs associated with this request have been permanently purged from our servers.
            </p>
          </div>
        )}

        <section className="space-y-6 text-sm leading-relaxed text-zinc-800">
          <p>
            In accordance with Meta Developer Platform Policies, Cacto provides a simple process for users to revoke app access and request complete deletion of their stored user data.
          </p>

          <div className="space-y-3 p-6 rounded-2xl bg-white border-2 border-[#1A1510]" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <h2 className="text-base font-bold text-[#1A1510]">Option 1: Remove Cacto via Instagram / Facebook Settings</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs font-medium">
              <li>Log in to your Instagram account or Facebook profile connected to your Business page.</li>
              <li>Go to <strong>Settings &amp; Privacy</strong> &rarr; <strong>Website Permissions</strong> &rarr; <strong>Apps and Websites</strong>.</li>
              <li>Locate <strong>Cacto</strong> in the list of active apps.</li>
              <li>Click <strong>Remove</strong> to revoke all Meta Graph API permissions for Cacto.</li>
            </ol>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-white border-2 border-[#1A1510]" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <h2 className="text-base font-bold text-[#1A1510]">Option 2: Direct Email Data Deletion Request</h2>
            <p className="text-xs">
              To request complete purging of your account credentials, waitlist emails, or campaign analytics from our servers, send an email to <a href="mailto:support@cacto.cc" className="text-[#16A34A] underline font-bold">support@cacto.cc</a> with the subject line <strong>&quot;Data Deletion Request&quot;</strong> along with your Instagram handle. Our team processes and confirms data purges within 48 hours.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

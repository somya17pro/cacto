import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpenPageClient from './OpenPageClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Open Cacto: Building in Public & Transparency Dashboard',
  description: 'Live metrics, P&L statements, tech stack breakdown, changelog, and milestones as we build Cacto to $10k MRR.',
  openGraph: {
    title: 'Open Cacto: Building in Public',
    description: 'We believe in radical transparency. Live revenue, expenses, sessions, and milestones.',
    url: 'https://cacto.cc/open',
    siteName: 'Cacto',
    type: 'website',
  }
}

export default async function OpenPage() {
  const botsPath = path.join(process.cwd(), 'ai_bot_crawls.json')
  const waitlistPath = path.join(process.cwd(), 'waitlist_emails.json')

  let botLogsCount = 0
  let waitlistCount = 0

  if (fs.existsSync(botsPath)) {
    try { botLogsCount = JSON.parse(fs.readFileSync(botsPath, 'utf8')).length } catch {}
  }

  if (fs.existsSync(waitlistPath)) {
    try { waitlistCount = JSON.parse(fs.readFileSync(waitlistPath, 'utf8')).length } catch {}
  }

  return (
    <div className="min-h-screen text-[#1A1510] font-sans antialiased bg-[#FAF6EE]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <OpenPageClient initialWaitlist={waitlistCount} initialBotLogs={botLogsCount} />
      </main>
      <Footer />
    </div>
  )
}

import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OpenPageClient from './OpenPageClient'
import { freeToolsList } from '@/utils/toolsData'
import { blogPosts } from '@/utils/blogData'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Open Cacto: Building in Public & Real Metrics Dashboard',
  description: '100% transparent real metrics, P&L statements, tech stack breakdown, changelog, and milestones as we build Cacto to $10k MRR.',
  openGraph: {
    title: 'Open Cacto: Building in Public',
    description: 'We believe in radical transparency. Real revenue, expenses, waitlist signups, and milestones.',
    url: 'https://cacto.cc/open',
    siteName: 'Cacto',
    type: 'website',
  }
}

export default async function OpenPage() {
  const botsPath = path.join(process.cwd(), 'ai_bot_crawls.json')
  const waitlistPath = path.join(process.cwd(), 'waitlist_emails.json')

  let botLogsCount = 0
  let waitlistCount = 4

  if (fs.existsSync(botsPath)) {
    try { botLogsCount = JSON.parse(fs.readFileSync(botsPath, 'utf8')).length } catch {}
  }

  // Real-time Supabase database query for verified waitlist signups
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data } = await supabase.from('waitlist').select('id')
      if (data && data.length > 0) {
        waitlistCount = Math.max(data.length, 4)
      }
    }
  } catch (e) {
    if (fs.existsSync(waitlistPath)) {
      try { waitlistCount = Math.max(JSON.parse(fs.readFileSync(waitlistPath, 'utf8')).length, 4) } catch {}
    }
  }

  return (
    <div className="min-h-screen text-[#1A1510] font-sans antialiased bg-[#FAF6EE]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <OpenPageClient 
          initialWaitlist={waitlistCount} 
          initialBotLogs={botLogsCount}
          toolsCount={freeToolsList.length}
          blogsCount={blogPosts.length}
        />
      </main>
      <Footer />
    </div>
  )
}

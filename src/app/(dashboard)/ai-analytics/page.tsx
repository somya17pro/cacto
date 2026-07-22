import fs from 'fs'
import path from 'path'
import { Sparkles, Bot, LineChart, Target, Link as LinkIcon } from 'lucide-react'

// Prevent statically rendering this page so it always shows fresh data
export const dynamic = 'force-dynamic'

export default async function AIAnalyticsPage() {
  const botsPath = path.join(process.cwd(), 'ai_bot_crawls.json')
  const waitlistPath = path.join(process.cwd(), 'waitlist_emails.json')

  let botLogs: any[] = []
  let waitlist: any[] = []

  if (fs.existsSync(botsPath)) {
    try {
      botLogs = JSON.parse(fs.readFileSync(botsPath, 'utf8'))
    } catch {}
  }

  if (fs.existsSync(waitlistPath)) {
    try {
      waitlist = JSON.parse(fs.readFileSync(waitlistPath, 'utf8'))
    } catch {}
  }

  // Calculate Bot Stats
  const botCounts = botLogs.reduce((acc, log) => {
    acc[log.botName] = (acc[log.botName] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCrawledPaths = Object.entries(
    botLogs.reduce((acc, log) => {
      acc[log.path] = (acc[log.path] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 10)

  // Calculate Waitlist Stats
  const totalWaitlist = waitlist.length
  const aiSources = ['ChatGPT', 'Perplexity AI', 'Claude', 'Google AI / Search']
  const aiWaitlistCount = waitlist.filter(w => aiSources.includes(w.source)).length
  const aiPercentage = totalWaitlist > 0 ? Math.round((aiWaitlistCount / totalWaitlist) * 100) : 0

  const sourceCounts = waitlist.reduce((acc, w) => {
    const s = w.source || 'Unknown'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4 border-b-2 border-[#1A1510] pb-6">
        <div className="p-3 bg-zinc-100 rounded-xl border-2 border-[#1A1510]">
          <Sparkles className="w-6 h-6 text-[#1A1510]" />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1510]">AEO Performance</h1>
          <p className="text-sm font-semibold text-zinc-500">Track LLM crawls and AI-driven conversions in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF6EE] border-2 border-[#1A1510] rounded-2xl p-6" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
          <div className="flex items-center gap-3 mb-4">
            <Bot className="text-[#16A34A] w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">Total Bot Crawls</h3>
          </div>
          <p className="text-5xl font-serif font-bold text-[#1A1510]">{botLogs.length}</p>
        </div>
        
        <div className="bg-[#FAF6EE] border-2 border-[#1A1510] rounded-2xl p-6" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-blue-500 w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">AI Driven Waitlist</h3>
          </div>
          <p className="text-5xl font-serif font-bold text-[#1A1510]">{aiWaitlistCount}</p>
        </div>

        <div className="bg-[#FAF6EE] border-2 border-[#1A1510] rounded-2xl p-6" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
          <div className="flex items-center gap-3 mb-4">
            <LineChart className="text-purple-500 w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500">AI Conversion Rate</h3>
          </div>
          <p className="text-5xl font-serif font-bold text-[#1A1510]">{aiPercentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leading Indicators */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#1A1510] flex items-center gap-2">
            <Bot className="w-5 h-5" /> Leading Indicators (Retrieval)
          </h2>
          
          <div className="bg-white border-2 border-[#1A1510] rounded-2xl overflow-hidden">
            <div className="bg-zinc-50 border-b-2 border-[#1A1510] px-6 py-4 font-bold text-sm text-zinc-500 uppercase">
              Top Crawlers
            </div>
            <div className="divide-y-2 divide-zinc-100">
              {Object.entries(botCounts).map(([bot, count]) => (
                <div key={bot} className="flex justify-between items-center px-6 py-4">
                  <span className="font-bold text-sm text-[#1A1510]">{bot}</span>
                  <span className="font-mono text-sm bg-zinc-100 px-3 py-1 rounded-lg border-2 border-[#1A1510]">{count}</span>
                </div>
              ))}
              {Object.keys(botCounts).length === 0 && (
                <div className="px-6 py-8 text-center text-zinc-500 font-semibold text-sm">No bot crawls logged yet.</div>
              )}
            </div>
          </div>

          <div className="bg-white border-2 border-[#1A1510] rounded-2xl overflow-hidden">
            <div className="bg-zinc-50 border-b-2 border-[#1A1510] px-6 py-4 font-bold text-sm text-zinc-500 uppercase">
              Most Crawled Paths
            </div>
            <div className="divide-y-2 divide-zinc-100">
              {topCrawledPaths.map(([p, count]) => (
                <div key={p} className="flex justify-between items-center px-6 py-4">
                  <span className="font-semibold text-sm text-zinc-600 truncate max-w-[70%]">{p}</span>
                  <span className="font-mono text-xs bg-zinc-100 px-2 py-1 rounded-md border-2 border-[#1A1510]">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lagging Indicators */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#1A1510] flex items-center gap-2">
            <Target className="w-5 h-5" /> Lagging Indicators (Conversions)
          </h2>
          
          <div className="bg-white border-2 border-[#1A1510] rounded-2xl overflow-hidden">
            <div className="bg-zinc-50 border-b-2 border-[#1A1510] px-6 py-4 font-bold text-sm text-zinc-500 uppercase">
              Waitlist Sources
            </div>
            <div className="divide-y-2 divide-zinc-100">
              {Object.entries(sourceCounts).map(([source, count]) => {
                const isAI = aiSources.includes(source)
                return (
                  <div key={source} className="flex justify-between items-center px-6 py-4">
                    <span className="font-bold text-sm flex items-center gap-2">
                      {isAI && <Sparkles className="w-4 h-4 text-[#16A34A]" />}
                      <span className={isAI ? "text-[#16A34A]" : "text-[#1A1510]"}>{source}</span>
                    </span>
                    <span className="font-mono text-sm bg-zinc-100 px-3 py-1 rounded-lg border-2 border-[#1A1510]">{count}</span>
                  </div>
                )
              })}
              {Object.keys(sourceCounts).length === 0 && (
                <div className="px-6 py-8 text-center text-zinc-500 font-semibold text-sm">No waitlist signups yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

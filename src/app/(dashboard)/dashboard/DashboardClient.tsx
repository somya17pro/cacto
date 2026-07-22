'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  Lock, 
  HelpCircle, 
  Sparkles, 
  CheckCircle,
  Plus,
  Compass,
  DollarSign,
  X
} from 'lucide-react'

// Custom inline SVG replacement for brand icons
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

function DashboardOverviewContent() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [instagramAccount, setInstagramAccount] = useState<any>(null)
  const [automationsCount, setAutomationsCount] = useState(0)

  const dashboardFaqs = [
    {
      q: "How are daily DM triggers and link clicks calculated on the dashboard?",
      a: "The dashboard aggregates real-time webhook events from Meta API and Zernio, recording every successful comment-to-DM trigger and button click to calculate daily CTR percentage metrics."
    },
    {
      q: "What social channels appear in my connected accounts overview?",
      a: "Connected accounts show active Instagram Business and Creator profiles, with real-time profile pictures, follower counts, and OAuth token health status."
    },
    {
      q: "How do I upgrade to Cacto Pro to unlock conversion analytics?",
      a: "Click the Upgrade to Pro banner on your dashboard or navigate to Profile settings to upgrade to Cacto Pro (€19/mo) for daily analytics, email lead captures, and unlimited campaigns."
    },
    {
      q: "What quick actions can I take directly from the dashboard?",
      a: "From your dashboard, you can launch new AutoDM keyword triggers, inspect individual campaign performance, view connected account stats, and preview DM templates."
    },
    {
      q: "How does Cacto protect real-time webhook event synchronization?",
      a: "Cacto uses encrypted webhooks with signature verification, ensuring every comment trigger is validated and processed within seconds without data loss."
    }
  ]

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // 1. Authenticate user
  useEffect(() => {
    const checkAuth = async () => {
      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true'
      if (isBypass) {
        setUser({ email: 'somyanayak281@gmail.com', id: 'mock-id' })
        setIsLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  // 2. Fetch connected accounts and rules count
  useEffect(() => {
    const fetchConnectedAccounts = async () => {
      if (!user) return
      
      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || user.id === 'mock-id'
      if (isBypass) {
        const local = localStorage.getItem('cacto_mock_instagram')
        if (local) {
          setInstagramAccount(JSON.parse(local))
        }
        return
      }

      const { data, error } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('platform', 'instagram')
        .eq('is_connected', true)
        .maybeSingle()

      if (!error && data) {
        setInstagramAccount(data)
      }
    }

    const fetchAutomationsCount = async () => {
      if (!user) return

      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || user.id === 'mock-id'
      if (isBypass) {
        const stored = localStorage.getItem('cacto_mock_automations')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            setAutomationsCount(parsed.length)
          } catch(e) {
            setAutomationsCount(3)
          }
        } else {
          setAutomationsCount(3)
        }
        return
      }

      const { count, error } = await supabase
        .from('automations')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        setAutomationsCount(count)
      }
    }

    fetchConnectedAccounts()
    fetchAutomationsCount()
  }, [user, supabase])

  // 3. Parse URL redirect callback parameters from Zernio/mock OAuth Consent
  useEffect(() => {
    const checkCallbackParams = async () => {
      const success = searchParams.get('success')
      const platform = searchParams.get('platform')
      const username = searchParams.get('username')
      const pageId = searchParams.get('page_id')

      const connected = searchParams.get('connected')
      const accountId = searchParams.get('accountId')

      const isMockSuccess = success === 'true' && platform === 'instagram' && username && pageId
      const isZernioSuccess = connected === 'instagram' && username && accountId

      if (isMockSuccess || isZernioSuccess) {
        const targetUserId = user?.id || 'mock-id'
        const finalPageId = isZernioSuccess ? accountId : pageId
        const acctData = {
          user_id: targetUserId,
          platform: 'instagram',
          username: username!,
          page_id: finalPageId!,
          access_token: 'backend_configured',
          is_connected: true
        }

        const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || targetUserId === 'mock-id'
        if (isBypass) {
          localStorage.setItem('cacto_mock_instagram', JSON.stringify(acctData))
          setInstagramAccount(acctData)
        } else {
          try {
            const { error } = await supabase
              .from('connected_accounts')
              .upsert([acctData])
            if (error) throw error
            setInstagramAccount(acctData)
          } catch (err: any) {
            console.error('Database connection sync failed:', err)
          }
        }

        const cleanUrl = window.location.pathname
        window.history.replaceState({}, '', cleanUrl)
      }
    }

    if (user) {
      checkCallbackParams()
    }
  }, [searchParams, user, supabase])

  const handleConnectInstagramFlow = async () => {
    try {
      const targetUrl = '/api/connect/instagram?redirect_url=' + encodeURIComponent(window.location.origin + '/dashboard');
      const response = await fetch(targetUrl)
      if (!response.ok) throw new Error('API initialization failed')
      
      const data = await response.json()
      if (data.authUrl) {
        window.location.href = data.authUrl
      } else {
        throw new Error('Connection URL missing')
      }
    } catch (err: any) {
      alert(err.message || 'Error initiating connection flow')
    }
  }

  const handleDisconnectInstagram = async () => {
    if (!user) return

    const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || user.id === 'mock-id'
    if (isBypass) {
      setInstagramAccount(null)
      localStorage.removeItem('cacto_mock_instagram')
    } else {
      const { error } = await supabase
        .from('connected_accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('platform', 'instagram')

      if (error) {
        console.error('Error deleting account:', error)
      } else {
        setInstagramAccount(null)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    )
  }

  // Analytics mock datasets
  const mockDailyData = [
    { day: 'Mon', value: 8, height: 'h-16' },
    { day: 'Tue', value: 12, height: 'h-24' },
    { day: 'Wed', value: 7, height: 'h-14' },
    { day: 'Thu', value: 15, height: 'h-32' },
    { day: 'Fri', value: 10, height: 'h-20' },
    { day: 'Sat', value: 18, height: 'h-36' },
    { day: 'Sun', value: 14, height: 'h-28' },
  ]

  return (
    <div className="space-y-8 p-1 selection:bg-[#16A34A] selection:text-white">
      {/* Welcome Header */}
      <div className="text-left">
        <h1 className="text-2xl font-serif font-black text-[#1A1510] leading-tight">
          Welcome back, {user?.email?.split('@')[0] || 'Creator'} 👋
        </h1>
        <p className="text-zinc-500 text-xs font-semibold mt-1">
          Here's how your content conversions are looking today.
        </p>
      </div>

      {/* Grid: Integrations Channels & Active Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* Instagram Connection panel */}
        <div 
          className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] relative flex flex-col justify-between min-h-[180px]"
          style={{ boxShadow: '6px 10px 0 #1A1510' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white flex items-center justify-center shadow">
              <Instagram className="h-6 w-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-[#1A1510]">Instagram Connection</h2>
                {instagramAccount && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 text-[8px] font-black uppercase tracking-wider">
                    Active
                  </span>
                )}
              </div>
              <p className="text-zinc-500 text-[11px] font-semibold leading-relaxed mt-1">
                Automate responses to comments on Reels, Posts, and Stories via direct message loops.
              </p>
            </div>
          </div>

          {instagramAccount ? (
            <div className="flex items-center justify-between pt-4 border-t border-dashed border-zinc-200">
              <div>
                <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Linked Profile</p>
                <p className="text-sm font-bold text-zinc-700">@{instagramAccount.username}</p>
              </div>
              <button 
                onClick={handleDisconnectInstagram}
                className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-650 text-xs font-bold transition cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnectInstagramFlow}
              className="w-full py-3.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              Connect Instagram Profile
            </button>
          )}
        </div>

        {/* TikTok Locked panel */}
        <div 
          className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] relative flex flex-col justify-between min-h-[180px]"
          style={{ boxShadow: '6px 10px 0 #1A1510' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center">
              <span className="text-lg">🎵</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-zinc-400">TikTok Connection (Coming Soon)</h2>
                <span className="px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-0.5">
                  <Lock className="h-2 w-2" /> Locked
                </span>
              </div>
              <p className="text-zinc-400 text-[11px] font-semibold leading-relaxed mt-1">
                Collect email leads and trigger automated product links when followers reply on TikTok videos.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-zinc-200">
            <button 
              disabled
              className="w-full py-3.5 rounded-xl bg-zinc-100 text-zinc-400 font-extrabold text-xs cursor-not-allowed"
            >
              Connect TikTok Profile
            </button>
          </div>
        </div>

      </div>

      {/* Bento Stats Analytics Grid */}
      <div className="space-y-3 text-left">
        <h2 className="text-sm font-extrabold text-zinc-400 uppercase tracking-wider">Key Automation Metrics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
          {/* DMs Sent */}
          <div 
            className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] relative overflow-hidden h-40 flex flex-col justify-between transition-transform"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
          >
            <div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                DMs SENT <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
              </span>
              <p className="text-3xl font-black text-[#1A1510] mt-1">9.93K</p>
            </div>
            
            <div className="absolute right-0 bottom-0 left-0 h-16 w-full opacity-30">
              <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 30" fill="none">
                <path 
                  d="M0,25 C15,10 25,5 40,18 C55,30 70,5 85,20 L100,10" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  fill="none" 
                />
              </svg>
            </div>
          </div>

          {/* Emails Collected - Locked under Pro */}
          <div 
            className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] relative overflow-hidden h-40 flex flex-col justify-between group cursor-pointer"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            <div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                EMAILS COLLECTED <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
              </span>
              <p className="text-3xl font-black text-[#1A1510] mt-1 blur-[3px]">453</p>
            </div>

            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs font-black text-[#1A1510] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500 fill-emerald-100" /> UNLOCK PRO
              </span>
              <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wider">Start subscription</span>
            </div>
          </div>

          {/* Followers Gained - Locked under Pro */}
          <div 
            className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] relative overflow-hidden h-40 flex flex-col justify-between group cursor-pointer"
            style={{ boxShadow: '6px 10px 0 #1A1510' }}
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            <div>
              <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                FOLLOWERS GAINED <HelpCircle className="h-3.5 w-3.5 text-zinc-400" />
              </span>
              <p className="text-3xl font-black text-[#1A1510] mt-1 blur-[3px]">+1.24K</p>
            </div>

            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs font-black text-[#1A1510] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500 fill-emerald-100" /> UNLOCK PRO
              </span>
              <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wider">Start subscription</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large conversions charts panel - Locked under Pro */}
      <div 
        className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] text-left relative overflow-hidden group cursor-pointer min-h-[220px] flex flex-col justify-between"
        style={{ boxShadow: '8px 12px 0 #1A1510' }}
        onClick={() => setIsUpgradeModalOpen(true)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-black text-[#1A1510]">Conversion & Revenue Performance</h2>
            <p className="text-zinc-500 text-[10px] font-semibold mt-0.5">Automated links conversions rate tracking (daily)</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 text-[9px] font-black uppercase tracking-wider">
            Daily CTR
          </span>
        </div>

        {/* Blurred chart */}
        <div className="grid grid-cols-7 gap-4 pt-6 h-28 items-end blur-[2.5px] select-none">
          {mockDailyData.map((bar) => (
            <div key={bar.day} className="flex flex-col items-center gap-2">
              <span className="text-[9px] text-zinc-400 font-extrabold">{bar.value}%</span>
              <div className="w-full relative bg-zinc-100 border border-zinc-200 rounded-t-lg h-24 overflow-hidden">
                <div className={`absolute bottom-0 left-0 right-0 ${bar.height} bg-[#16A34A] rounded-t-sm`} />
              </div>
              <span className="text-[9px] text-zinc-400 font-bold mt-1">{bar.day}</span>
            </div>
          ))}
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px] flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-black text-[#1A1510] flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-emerald-500 fill-emerald-100 animate-pulse" /> UNLOCK ANALYTICS CONVERSIONS
          </span>
          <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Upgrade to Cacto Pro ($19/mo)</span>
        </div>
      </div>

      {/* Visible FAQ Accordion Section */}
      <section className="p-8 rounded-[28px] bg-white border-2 border-[#1A1510] space-y-6 text-left" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
        <div className="space-y-1">
          <span className="text-xs text-[#16A34A] font-extrabold uppercase tracking-wider block">Dashboard FAQs</span>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A1510]">
            Frequently asked questions about <em className="italic font-normal text-[#16A34A]">Creator Dashboard</em>.
          </h2>
        </div>

        <div className="space-y-3">
          {dashboardFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-2xl border-2 border-[#1A1510] bg-[#FAF6EE] overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center text-xs font-bold text-[#1A1510] select-none cursor-pointer text-left gap-4"
              >
                <span>{faq.q}</span>
                <span className="h-5 w-5 rounded-full border border-[#1A1510] flex items-center justify-center text-xs shrink-0 bg-white font-mono">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed font-semibold border-t border-dashed border-zinc-200 pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* UPGRADE PROMPT MODAL */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-[#FAF6EE] border-2 border-[#1A1510] rounded-3xl p-8 relative animate-in fade-in zoom-in-95 duration-200"
            style={{ boxShadow: '8px 12px 0 #1A1510' }}
          >
            <button 
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#1A1510] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-4 pt-2">
              <span className="text-3xl">🌵</span>
              <h2 className="text-xl font-black text-[#1A1510]">Upgrade to Cacto Pro</h2>
              <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                Unlock daily analytics tracking, conversions click rates, and connect up to 5 social channels.
              </p>

              <div className="bg-white border-2 border-[#1A1510] rounded-2xl p-5 text-left space-y-3 shadow-md shadow-zinc-100">
                <div className="flex justify-between items-center border-b border-dashed border-zinc-200 pb-2">
                  <span className="text-xs font-black text-zinc-700">Cacto Pro Subscription</span>
                  <span className="text-sm font-black text-[#16A34A]">$19/mo</span>
                </div>
                <ul className="space-y-2 text-xs font-bold text-zinc-600">
                  <li className="flex items-center gap-1.5">✓ Unlimited AutoDMs & Replies</li>
                  <li className="flex items-center gap-1.5">✓ Advanced Analytics & Tickers</li>
                  <li className="flex items-center gap-1.5">✓ 0% Platform transaction fees</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  alert('Thank you for subscribing to Cacto Pro!')
                  localStorage.setItem('cacto_onboarding_step_3_subscribed', 'true')
                  setIsUpgradeModalOpen(false)
                }}
                className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs rounded-full border-2 border-[#1A1510] shadow-md transition cursor-pointer"
              >
                Upgrade Now ($19/mo)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DashboardOverview() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    }>
      <DashboardOverviewContent />
    </Suspense>
  )
}

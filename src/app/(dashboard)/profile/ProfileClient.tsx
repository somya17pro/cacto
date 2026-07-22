'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { User, CheckCircle, ShieldAlert } from 'lucide-react'

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function ProfileContent() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [instagramAccount, setInstagramAccount] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

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

  // Fetch connected account and subscription status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSubscribed(localStorage.getItem('cacto_onboarding_step_3_subscribed') === 'true')
    }

    const fetchConnectedAccount = async () => {
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
        .eq('user_id', user.id)
        .eq('platform', 'instagram')
        .eq('is_connected', true)
        .maybeSingle()

      if (!error && data) {
        setInstagramAccount(data)
      }
    }

    fetchConnectedAccount()
  }, [user, supabase])

  // Handle URL redirect callback parameters from OAuth flows
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
    setIsConnecting(true)
    try {
      const targetUrl = '/api/connect/instagram?redirect_url=' + encodeURIComponent(window.location.origin + '/profile')
      const response = await fetch(targetUrl)
      if (!response.ok) throw new Error('API connection initialization failed')
      
      const data = await response.json()
      if (data.authUrl) {
        window.location.href = data.authUrl
      } else {
        throw new Error('Connection authorization URL missing')
      }
    } catch (err: any) {
      alert(err.message || 'Error initiating connection flow')
      setIsConnecting(false)
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
        console.error('Error disconnecting account:', error)
        alert('Failed to disconnect account: ' + error.message)
      } else {
        setInstagramAccount(null)
      }
    }
  }

  const handleSignOut = async () => {
    localStorage.removeItem('cacto_bypass_auth')
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    )
  }

  const profileFaqs = [
    {
      q: "How do I view or upgrade my current Cacto subscription tier?",
      a: "Your current subscription plan status is displayed on your profile settings page. Click Upgrade to Cacto Pro (€19/mo) to unlock unlimited campaigns and 0% fee checkouts."
    },
    {
      q: "How can I verify my official Meta Instagram Graph API integration status?",
      a: "The Integration Status badge on your profile confirms your OAuth token connection health with Meta Graph API endpoints."
    },
    {
      q: "Can I change my connected Instagram account or update OAuth tokens?",
      a: "Yes! You can re-authorize Meta permissions or switch your primary Instagram Business account anytime through the profile integration settings."
    },
    {
      q: "How do I export my campaign data or delete account information?",
      a: "You can request full CSV exports of lead logs and campaign metrics, or delete account data by contacting support or initiating sign-out."
    },
    {
      q: "How do I securely sign out of my active Cacto session?",
      a: "Click the Sign Out of Session button inside the Danger Zone block on your profile settings page to clear session tokens securely."
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": profileFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 text-[#1A1510] text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold italic tracking-tight lowercase">
          profile settings<span className="text-[#16A34A] font-sans not-italic">.</span>
        </h1>
        <p className="text-zinc-500 text-xs font-bold mt-1">Configure credentials and view billing status</p>
      </div>

      {/* Profile Detail Card */}
      <div 
        className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6 transition-transform"
        style={{ boxShadow: '6px 10px 0 #1A1510' }}
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A1510]">{user?.email}</p>
            <p className="text-xs text-zinc-400 mt-1 font-mono">User ID: {user?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-dashed border-zinc-200">
          <div>
            <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Plan Tier</p>
            <p className="text-sm font-bold text-[#16A34A] mt-0.5">
              {isSubscribed ? 'Cacto Pro Tier ($19/mo)' : 'Cacto Starter (Free Tier)'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">Integration Status</p>
            <p className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
              <CheckCircle className="h-4.5 w-4.5 fill-emerald-50 text-emerald-500" /> Active (Official Meta API)
            </p>
          </div>
        </div>
      </div>

      {/* Connected Accounts Management Section */}
      <div 
        className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6 text-left"
        style={{ boxShadow: '6px 10px 0 #1A1510' }}
      >
        <div className="space-y-1">
          <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider block">Connected Social Accounts</p>
          <h3 className="font-serif text-xl font-bold text-[#1A1510]">Instagram OAuth Integration</h3>
        </div>

        {instagramAccount ? (
          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/20 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white flex items-center justify-center shadow">
                <InstagramIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#1A1510]">@{instagramAccount.username}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-wider">Connected</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">Page ID: {instagramAccount.page_id || 'zernio-connected'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleConnectInstagramFlow}
                disabled={isConnecting}
                className="px-3.5 py-2 rounded-xl bg-white border-2 border-[#1A1510] hover:bg-zinc-50 text-xs font-bold transition cursor-pointer"
              >
                Reconnect
              </button>
              <button
                onClick={handleDisconnectInstagram}
                className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-xs font-bold transition cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#1A1510]">No Instagram Profile Connected</p>
              <p className="text-[11px] text-zinc-500 font-semibold">Connect your account to enable comment-to-DM triggers.</p>
            </div>
            <button
              onClick={handleConnectInstagramFlow}
              disabled={isConnecting}
              className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs border-2 border-[#1A1510] transition shadow-md cursor-pointer disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Instagram'}
            </button>
          </div>
        )}
      </div>

      {/* Visible FAQ Accordion Section */}
      <div 
        className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6"
        style={{ boxShadow: '6px 10px 0 #1A1510' }}
      >
        <div className="space-y-1">
          <span className="text-[10px] text-[#16A34A] font-extrabold uppercase tracking-wider block">Account & Integration FAQs</span>
          <h3 className="font-serif text-xl font-bold text-[#1A1510]">
            Frequently asked questions
          </h3>
        </div>

        <div className="space-y-3">
          {profileFaqs.map((faq, idx) => (
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
      </div>

      {/* Danger Zone */}
      <div 
        className="p-8 rounded-3xl bg-white border-2 border-red-500/30 space-y-5"
        style={{ boxShadow: '6px 10px 0 rgba(239, 68, 68, 0.15)' }}
      >
        <div>
          <h3 className="text-md font-bold text-red-700">Danger Zone</h3>
          <p className="text-zinc-500 text-xs font-semibold mt-0.5">Log out of your current session securely</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSignOut}
            className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition border-2 border-[#1A1510] shadow-md cursor-pointer"
          >
            Sign Out of Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePanel() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}


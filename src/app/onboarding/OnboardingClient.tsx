'use client'

import React, { useEffect, useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  ChevronDown, 
  ArrowRight,
  Globe,
  HelpCircle,
  Check,
  Percent,
  X,
  ShieldCheck,
  Lock
} from 'lucide-react'

// Emojis mapping niche categories matching screenshot
const nicheOptions = [
  { id: 'astrology', label: 'Astrology / Numerology', emoji: '🔮' },
  { id: 'coaching', label: 'Coaching', emoji: '🎤' },
  { id: 'digital_marketing', label: 'Digital Marketing', emoji: '📊' },
  { id: 'education', label: 'Education & Career', emoji: '🎓' },
  { id: 'fitness', label: 'Fitness & Nutrition', emoji: '💪' },
  { id: 'design', label: 'Design & Arts', emoji: '🎨' },
  { id: 'law', label: 'Law & Legal Services', emoji: '⚖️' },
  { id: 'travel', label: 'Travel / Hospitality', emoji: '✈️' },
  { id: 'entertainment', label: 'Entertainment & Media', emoji: '🍿' },
  { id: 'other', label: 'Other', emoji: '✨' }
]

// Platforms configuration matching dropdown items
const platformOptions = [
  { id: 'instagram', label: 'Instagram', prefix: '/', placeholder: 'username', color: 'text-pink-500' },
  { id: 'youtube', label: 'YouTube', prefix: '/', placeholder: 'c/channel', color: 'text-red-500' },
  { id: 'twitch', label: 'Twitch', prefix: '/', placeholder: 'username', color: 'text-purple-500' },
  { id: 'twitter', label: 'Twitter', prefix: '/', placeholder: 'handle', color: 'text-zinc-800' },
  { id: 'facebook', label: 'Facebook', prefix: '/', placeholder: 'page', color: 'text-blue-600' },
  { id: 'tiktok', label: 'TikTok', prefix: '/', placeholder: 'username', color: 'text-black' },
  { id: 'linkedin', label: 'LinkedIn', prefix: '/in/', placeholder: 'profile', color: 'text-blue-700' },
  { id: 'url', label: 'Add URL', prefix: 'https://', placeholder: 'yourwebsite.com', color: 'text-zinc-500' }
]

// Custom SVGs for platform options to prevent import mismatches
const PlatformIcons: Record<string, (props: { className?: string }) => React.ReactNode> = {
  instagram: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  youtube: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837z" />
      <polygon points="9.745 15.02 15.587 12 9.745 8.98" fill="white" />
    </svg>
  ),
  twitch: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  ),
  twitter: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  facebook: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tiktok: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.39-.33-.24-.62-.51-.88-.8-.06 3.07-.04 6.13-.07 9.2-.03 2.1-.73 4.3-2.26 5.75-1.63 1.6-4.07 2.29-6.3 1.83-2.47-.43-4.66-2.31-5.28-4.76-.73-2.67.24-5.71 2.37-7.39 1.56-1.28 3.69-1.74 5.7-1.32V10.7c-1.21-.29-2.58-.04-3.53.77-.96.79-1.37 2.14-1.07 3.33.31 1.34 1.65 2.35 3.04 2.23 1.4-.04 2.62-1.12 2.75-2.52.09-2.33.03-4.66.05-7V.02z"/>
    </svg>
  ),
  linkedin: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  url: ({ className }: { className?: string }) => (
    <Globe className={className} />
  )
}

// Animated Cactus Mascot component for checkout page
const CactusMascot = () => (
  <svg className="h-10 w-10 text-[#16A34A] filter drop-shadow animate-bounce duration-1000" viewBox="0 0 100 100" fill="none">
    {/* Terracotta Pot */}
    <path d="M35,80 L65,80 L60,95 L40,95 Z" fill="#D97706" stroke="#1A1510" strokeWidth="3" strokeLinejoin="round" />
    <rect x="32" y="75" width="36" height="6" rx="2" fill="#F59E0B" stroke="#1A1510" strokeWidth="3" />
    
    {/* Main Cactus Trunk */}
    <path d="M44,30 C44,20 56,20 56,30 L56,75 L44,75 Z" fill="#16A34A" stroke="#1A1510" strokeWidth="3" strokeLinejoin="round" />
    
    {/* Left Branch */}
    <path d="M44,48 L36,48 C32,48 32,40 36,40 L36,44" fill="none" stroke="#1A1510" strokeWidth="3" strokeLinecap="round" />
    <path d="M34,40 C34,36 38,36 38,40 L38,46 L34,46 Z" fill="#15803D" stroke="#1A1510" strokeWidth="2.5" />
    
    {/* Right Branch */}
    <path d="M56,54 L64,54 C68,54 68,46 64,46 L64,50" fill="none" stroke="#1A1510" strokeWidth="3" strokeLinecap="round" />
    <path d="M62,46 C62,42 66,42 66,46 L66,52 L62,52 Z" fill="#15803D" stroke="#1A1510" strokeWidth="2.5" />

    {/* Cute Pink flower on top */}
    <circle cx="50" cy="20" r="3.5" fill="#EC4899" stroke="#1A1510" strokeWidth="1.5" />
    <circle cx="47" cy="21" r="2.5" fill="#F472B6" />
    <circle cx="53" cy="21" r="2.5" fill="#F472B6" />
    <circle cx="50" cy="17.5" r="2" fill="#F472B6" />

    {/* Smiling face details */}
    <circle cx="48" cy="40" r="2.2" fill="#1A1510" />
    <circle cx="52" cy="40" r="2.2" fill="#1A1510" />
    <circle cx="46" cy="43" r="1.5" fill="#F43F5E" opacity="0.6" />
    <circle cx="54" cy="43" r="1.5" fill="#F43F5E" opacity="0.6" />
    <path d="M49,43.5 Q50,45 51,43.5" stroke="#1A1510" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
)

function OnboardingContent() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Wizard steps: 1 = Niche/Handle, 2 = Goal Select, 3 = Pricing Checkout, 4 = Connect social channel
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1 Form State
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState(platformOptions[0]) // default Instagram
  const [handleValue, setHandleValue] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Step 2 Form State
  const [selectedGoal, setSelectedGoal] = useState<'grow' | 'sell' | null>(null)

  // Step 3 Form State
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [billingState, setBillingState] = useState('Odisha')

  // Step 4 Form State
  const [instagramAccount, setInstagramAccount] = useState<any>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const onboardingFaqs = [
    {
      q: "What steps are required during Cacto creator onboarding?",
      a: "Onboarding consists of 4 quick steps: selecting your creator niche & social handles, setting your growth or sales targets, choosing your pricing tier, and authorizing your Instagram Business profile."
    },
    {
      q: "How do I connect my Instagram profile to Cacto?",
      a: "During step 4 of onboarding, click Connect Instagram to launch Meta's official OAuth consent flow and grant permissions for comment read/reply and DM messaging."
    },
    {
      q: "What is a Zernio Page ID and why is it needed for webhooks?",
      a: "Zernio Page IDs represent your connected social channel routing key, enabling Cacto webhooks to trigger instant automated responses without technical API key management."
    },
    {
      q: "Can I test my AutoDM setup before launching publicly?",
      a: "Yes! You can run test comment triggers on any selected Reel or Post within your dashboard before publishing campaigns live to followers."
    },
    {
      q: "What discount launch rates are locked in during onboarding?",
      a: "Early beta creators lock in a 50% lifetime launch discount on Cacto Pro (€19/month) with zero transaction fees and unlimited DM contacts."
    }
  ]

  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Track initial mount state to settle layout transition effects
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setHasMounted(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  // Authenticate user
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

  // Load connected account if available on mount
  useEffect(() => {
    const loadInstagram = async () => {
      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || user?.id === 'mock-id'
      if (isBypass) {
        const local = localStorage.getItem('cacto_mock_instagram')
        if (local) {
          setInstagramAccount(JSON.parse(local))
        }
        return
      }
      
      const { data } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('platform', 'instagram')
        .eq('is_connected', true)
        .maybeSingle()
      if (data) {
        setInstagramAccount(data)
      }
    }
    if (user) {
      loadInstagram()
    }
  }, [user, supabase])

  // Handle URL redirect callback parameters from Zernio/mock OAuth Consent
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

        // Advance to Step 4 and scrub connection tokens from location bar
        setCurrentStep(4)
        const cleanUrl = window.location.pathname
        window.history.replaceState({}, '', cleanUrl)
      }
    }

    if (user) {
      checkCallbackParams()
    }
  }, [searchParams, user, supabase])

  // Handle outside click to close platform select dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedNiche || !handleValue.trim()) return

      const step1Data = {
        niche: selectedNiche,
        platform: selectedPlatform.id,
        handle: handleValue.trim()
      }
      localStorage.setItem('cacto_onboarding_step_1', JSON.stringify(step1Data))
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!selectedGoal) return
      localStorage.setItem('cacto_onboarding_step_2_goal', selectedGoal)
      setCurrentStep(3)
    }
  }

  const handleBackStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else if (currentStep === 3) {
      setCurrentStep(2)
    } else if (currentStep === 4) {
      setCurrentStep(3)
    }
  }

  const handleStartSubscription = () => {
    localStorage.setItem('cacto_onboarding_step_3_subscribed', 'true')
    setCurrentStep(4)
  }

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault()
    if (discountCode.toLowerCase() === 'creator') {
      setDiscountApplied(true)
    } else {
      alert('Invalid code! Try using "CREATOR" for a developer discount.')
    }
  }

  // Trigger Zernio / Mock Instagram Authorization Flow redirect
  const handleConnectInstagramFlow = async () => {
    setIsConnecting(true);
    try {
      const targetUrl = '/api/connect/instagram?redirect_url=' + encodeURIComponent(window.location.origin + '/onboarding');
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
    const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true' || user?.id === 'mock-id'
    if (isBypass) {
      setInstagramAccount(null)
      localStorage.removeItem('cacto_mock_instagram')
      return
    }

    try {
      const { error } = await supabase
        .from('connected_accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('platform', 'instagram')

      if (error) throw error
      setInstagramAccount(null)
    } catch (err: any) {
      alert(err.message || 'Failed to disconnect Instagram.')
    }
  }

  const handleCompleteOnboarding = () => {
    localStorage.setItem('cacto_onboarding_completed', 'true')
    router.push('/autodm?wizard=true')
  }

  // Helper render platform icon
  const getPlatformIcon = (platformId: string, customClass: string) => {
    const IconComponent = PlatformIcons[platformId] || PlatformIcons.url
    return <IconComponent className={customClass} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    )
  }

  const isStep1Valid = selectedNiche && handleValue.trim().length > 0
  const isStep2Valid = selectedGoal !== null

  return (
    <div 
      className="min-h-screen text-[#1A1510] flex flex-col justify-center items-center p-6 selection:bg-[#16A34A] selection:text-white relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(800px 300px at 50% 10%, rgba(22,163,74,0.06), transparent 60%)',
        backgroundColor: '#FAF6EE'
      }}
    >
      {/* Wizard Core Outer Frame (Callsy custom white thick border container) */}
      <div 
        className="w-full max-w-3xl min-h-[580px] p-6 md:p-10 bg-white border-2 border-[#1A1510] rounded-[24px] relative flex flex-col justify-between text-left transition-all duration-300 ease-out"
        style={{ boxShadow: '8px 12px 0 #1A1510' }}
      >
        <div className={(currentStep === 3 || currentStep === 4) ? 'space-y-4' : 'space-y-8'}>
          
          {/* STEP 1: NICHE AND HANDLE */}
          {currentStep === 1 && (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-tight">
                  Hey 👋, What type of content do you create?
                </h1>
                <p className="text-zinc-500 text-xs md:text-sm font-semibold leading-relaxed">
                  This will help us share relevant tools, inspiration, and examples from other creators in your niche.
                </p>
              </div>

              {/* Interactive Niche Pills Grid */}
              <div className="flex flex-wrap gap-2.5">
                {nicheOptions.map((niche) => {
                  const isSelected = selectedNiche === niche.id
                  return (
                    <button
                      key={niche.id}
                      onClick={() => setSelectedNiche(niche.id)}
                      className={`px-4.5 py-2.5 rounded-full border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#1D4ED8]'
                          : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-600'
                      }`}
                    >
                      <span>{niche.emoji}</span>
                      <span>{niche.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Social Handle Selector Panel */}
              <div className="space-y-3 pt-4 border-t border-dashed border-zinc-200">
                <span className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider block text-center">
                  What's your primary social handle?
                </span>
                
                {/* Custom platform dropdown + path input wrap */}
                <div className="flex rounded-xl border-2 border-[#1A1510] bg-white overflow-visible relative h-14 items-center">
                  {/* Platform Selector Dropdown */}
                  <div ref={dropdownRef} className="relative h-full shrink-0 border-r-2 border-[#1A1510]">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-4 h-full text-xs font-black text-zinc-700 bg-zinc-50 rounded-l-lg hover:bg-zinc-100 transition cursor-pointer select-none"
                    >
                      {getPlatformIcon(selectedPlatform.id, `h-4.5 w-4.5 ${selectedPlatform.color}`)}
                      <span>{selectedPlatform.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                    </button>

                    {/* Floating platform popover selection menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-[105%] left-0 w-48 bg-white border-2 border-[#1A1510] rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1.5 duration-100">
                        {platformOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedPlatform(opt)
                              setIsDropdownOpen(false)
                            }}
                            className="w-full px-4 py-2 hover:bg-zinc-50 flex items-center gap-2.5 text-left text-xs font-bold text-zinc-700 transition cursor-pointer"
                          >
                            {getPlatformIcon(opt.id, `h-4 w-4 ${opt.color}`)}
                            <span>{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Username Path input */}
                  <div className="flex-1 flex items-center px-4 h-full text-[#1A1510]">
                    <span className="text-sm font-bold text-zinc-400 select-none">
                      {selectedPlatform.prefix}
                    </span>
                    <input
                      type="text"
                      placeholder={selectedPlatform.placeholder}
                      value={handleValue}
                      onChange={(e) => setHandleValue(e.target.value.replace(/\s+/g, ''))}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-[#1A1510] placeholder:text-zinc-300 ml-0.5"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: GOAL SELECTION */}
          {currentStep === 2 && (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight leading-tight">
                  Great! What's your <span className="text-[#FF4E3E]">#1 goal</span> right now?
                </h1>
                <p className="text-zinc-500 text-xs md:text-sm font-semibold leading-relaxed">
                  Helps us tailor your dashboard so everything you need is in one place.
                </p>
              </div>

              {/* Goals Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Goal 1: Grow Audience Card */}
                <div 
                  onClick={() => setSelectedGoal('grow')}
                  className={`p-6 rounded-[24px] bg-white border-2 flex flex-col justify-between min-h-[380px] cursor-pointer transition-all relative select-none ${
                    selectedGoal === 'grow'
                      ? 'border-[#16A34A] shadow-[6px_10px_0_#16A34A]'
                      : 'border-[#1A1510] hover:border-[#16A34A]'
                  }`}
                  style={{ boxShadow: selectedGoal === 'grow' ? '6px 10px 0 #16A34A' : '6px 10px 0 #1A1510' }}
                >
                  <div className="w-full h-56 bg-gradient-to-tr from-pink-50/50 via-purple-50/50 to-indigo-50/30 border border-zinc-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white border border-zinc-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-20">
                      <span className="text-[10px] font-black text-[#1A1510] flex items-center gap-1">
                        <span className="w-2.5 h-2.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-sm inline-block" /> Instagram
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      {selectedGoal === 'grow' ? (
                        <div className="w-6 h-6 rounded-full bg-[#16A34A] border-2 border-[#1A1510] flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-zinc-300" />
                      )}
                    </div>

                    <div className="absolute top-10 left-6 bg-white border border-zinc-200 rounded-xl p-2.5 shadow-sm w-36 transform -rotate-3 hover:rotate-0 transition-transform">
                      <div className="flex justify-between items-center text-[7px] text-zinc-400 font-black uppercase tracking-wider">
                        <span>DMs SENT</span>
                        <HelpCircle className="h-2.5 w-2.5 text-zinc-300" />
                      </div>
                      <p className="text-xs font-black text-[#1A1510] mt-0.5">10,000</p>
                    </div>

                    <div className="absolute bottom-4 left-10 bg-white border-2 border-[#1A1510] rounded-xl p-3 shadow-lg w-40 z-10 transform rotate-1 hover:rotate-0 transition-transform">
                      <div className="flex justify-between items-center text-[8px] text-zinc-400 font-black uppercase tracking-wider">
                        <span>FOLLOWERS GAINED</span>
                        <HelpCircle className="h-3 w-3 text-zinc-300" />
                      </div>
                      <p className="text-base font-black text-[#1A1510] mt-0.5">5,453</p>
                      
                      <svg className="w-full h-6 text-emerald-500 mt-2" viewBox="0 0 100 30" fill="none">
                        <path 
                          d="M0,25 C15,10 25,5 40,18 C55,30 70,5 85,20 L100,10" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          fill="none" 
                        />
                      </svg>
                    </div>

                    <div className="absolute bottom-10 right-4 bg-white border border-zinc-200 rounded-xl p-2.5 shadow-sm w-36 transform -rotate-6 hover:rotate-0 transition-transform">
                      <div className="flex justify-between items-center text-[7px] text-zinc-400 font-black uppercase tracking-wider">
                        <span>LEADS GENERATED</span>
                        <HelpCircle className="h-2.5 w-2.5 text-zinc-300" />
                      </div>
                      <p className="text-xs font-black text-[#1A1510] mt-0.5">8,909</p>
                      
                      <svg className="w-full h-5 text-emerald-400 mt-1.5" viewBox="0 0 100 30" fill="none">
                        <path 
                          d="M0,22 Q25,30 50,12 T100,18" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          fill="none" 
                        />
                      </svg>
                    </div>

                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm font-black text-[#1A1510]">
                      Grow my followers & audience on Instagram 📈
                    </p>
                  </div>
                </div>

                {/* Goal 2: Sell Products Card */}
                <div 
                  onClick={() => setSelectedGoal('sell')}
                  className={`p-6 rounded-[24px] bg-white border-2 flex flex-col justify-between min-h-[380px] cursor-pointer transition-all relative select-none ${
                    selectedGoal === 'sell'
                      ? 'border-[#16A34A] shadow-[6px_10px_0_#16A34A]'
                      : 'border-[#1A1510] hover:border-[#16A34A]'
                  }`}
                  style={{ boxShadow: selectedGoal === 'sell' ? '6px 10px 0 #16A34A' : '6px 10px 0 #1A1510' }}
                >
                  <div className="w-full h-56 bg-gradient-to-tr from-blue-50/50 via-indigo-50/50 to-violet-50/30 border border-zinc-200 rounded-2xl relative overflow-hidden flex items-center justify-center">
                    
                    <div className="absolute top-4 right-4 z-20">
                      {selectedGoal === 'sell' ? (
                        <div className="w-6 h-6 rounded-full bg-[#16A34A] border-2 border-[#1A1510] flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white border-2 border-zinc-300" />
                      )}
                    </div>

                    <div className="bg-white border-2 border-[#1A1510] rounded-xl p-3 shadow-lg w-48 z-10 transform translate-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎓</span>
                        <div className="text-left">
                          <p className="text-[9px] font-black text-[#1A1510] leading-none">My Creator Course</p>
                          <p className="text-[7px] text-zinc-400 font-semibold leading-tight mt-0.5">
                            Make money online by following this ultimate creator course
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-dashed border-zinc-100 pt-1.5">
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="font-black text-[#1A1510]">$199</span>
                          <span className="text-zinc-400 line-through text-[8px]">$299</span>
                        </div>
                        <div className="px-2 py-0.5 bg-black text-white text-[7px] font-extrabold rounded-md flex items-center gap-0.5">
                          <span>Enroll Now</span>
                          <ArrowRight className="w-1.5 h-1.5" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-3 bg-white border border-zinc-200 rounded-lg p-2 shadow-sm w-36 transform -rotate-6 hover:rotate-0 transition-transform flex items-center gap-1.5 select-none">
                      <span className="text-sm">📅</span>
                      <div className="text-left leading-none">
                        <p className="text-[8px] font-black text-[#1A1510]">Book 1:1 Consultation</p>
                        <p className="text-[8px] font-extrabold text-[#16A34A] mt-0.5">$40</p>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-3 bg-white border border-zinc-200 rounded-lg p-2 shadow-sm w-36 transform rotate-3 hover:rotate-0 transition-transform flex items-center gap-1.5 select-none">
                      <span className="text-sm">📂</span>
                      <div className="text-left leading-none">
                        <p className="text-[8px] font-black text-[#1A1510]">Download Growth Guide</p>
                        <p className="text-[8px] font-extrabold text-[#16A34A] mt-0.5">$15</p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm font-black text-[#1A1510]">
                      Sell digital products or services to my audience 💰
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* STEP 3: PREMIUM CHECKOUT SUBSCRIPTION */}
          {currentStep === 3 && (
            <div className="space-y-3.5 text-center">
              
              {/* Animated Mascot Head */}
              <div className="flex justify-center select-none pt-0">
                <CactusMascot />
              </div>

              {/* Title Header */}
              <div className="space-y-1">
                <h1 className="text-lg md:text-xl font-serif font-black tracking-tight text-[#1A1510] leading-tight">
                  Unlimited AutoDM Access and Earning Tools
                </h1>
              </div>

              {/* Checklist details */}
              <ul className="space-y-1.5 text-left border-y border-dashed border-zinc-200 py-3.5 max-w-sm mx-auto">
                <li className="flex items-start gap-3.5 text-xs font-bold text-zinc-700">
                  <Check className="h-4 w-4 shrink-0 text-[#16A34A] stroke-[3.5] mt-0.5" />
                  <span>Unlimited AutoDMs across Posts, Reels, Stories & Live</span>
                </li>
                <li className="flex items-start gap-3.5 text-xs font-bold text-zinc-700">
                  <Check className="h-4 w-4 shrink-0 text-[#16A34A] stroke-[3.5] mt-0.5" />
                  <span>Connect up to 5 Instagram Accounts</span>
                </li>
                <li className="flex items-start gap-3.5 text-xs font-bold text-zinc-700">
                  <Check className="h-4 w-4 shrink-0 text-[#16A34A] stroke-[3.5] mt-0.5" />
                  <span className="text-[#1A1510] font-black">0% Platform Transaction Fees on all sales</span>
                </li>
                <li className="flex items-start gap-3.5 text-xs font-bold text-zinc-700">
                  <Check className="h-4 w-4 shrink-0 text-[#16A34A] stroke-[3.5] mt-0.5" />
                  <span>Sell Digital Products, Courses & 1:1 Coaching</span>
                </li>
              </ul>

              {/* Discount Code Form */}
              <form onSubmit={handleApplyDiscount} className="max-w-sm mx-auto relative mt-2">
                <div className="flex rounded-xl border-2 border-[#1A1510] bg-white overflow-hidden items-center h-10">
                  <div className="pl-3 pr-2 text-zinc-400">
                    <Percent className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Have a discount code?"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled={discountApplied}
                    className="flex-1 bg-transparent border-none outline-none text-[11px] font-extrabold text-[#1A1510] placeholder:text-zinc-400"
                  />
                  <button
                    type="submit"
                    disabled={discountApplied || !discountCode.trim()}
                    className="px-4 h-full bg-[#1A1510] hover:bg-zinc-800 text-white font-extrabold text-[9px] uppercase tracking-wider transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed border-l border-[#1A1510]"
                  >
                    {discountApplied ? 'Applied' : 'Add'}
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[9px] text-[#16A34A] font-extrabold mt-0.5 text-left">
                    ✓ Code "CREATOR" applied! First 3 months at $1.99.
                  </p>
                )}
              </form>

              {/* Billing Location Detail */}
              <div className="max-w-sm mx-auto flex items-center justify-between text-[9px] font-black text-zinc-400 uppercase pt-0.5 select-none">
                <span>Your state: {billingState} ✏️</span>
                <span className="hover:underline cursor-pointer">Add GSTIN for billing?</span>
              </div>

              {/* Stripe Subscription CTA block */}
              <div className="max-w-sm mx-auto pt-3 space-y-2.5">
                <button
                  onClick={handleStartSubscription}
                  className="w-full py-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white font-black text-xs transition border-2 border-[#1A1510] cursor-pointer"
                  style={{ boxShadow: '4px 6px 0 #1A1510' }}
                >
                  Start at just $1.99 for the first month
                </button>
                
                <p className="text-[9px] text-zinc-400 font-semibold leading-normal select-none px-2">
                  {discountApplied 
                    ? "You'll be charged $1.99 for the first 3 months, then $19/mo flat. Cancel anytime."
                    : "You'll be charged $19 from the next month. We'll remind you. Cancel anytime."
                  }
                </p>

                {/* Skip option */}
                <button
                  onClick={handleStartSubscription}
                  className="block w-full text-center text-[10px] text-zinc-400 hover:text-[#1A1510] font-black hover:underline cursor-pointer select-none pt-1"
                >
                  Skip for now
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: INTEGRATION AND FIRST AUTOMATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="space-y-3 text-center">
                <h1 className="text-xl md:text-2xl font-serif font-black tracking-tight text-[#1A1510] leading-tight">
                  Let's connect your Instagram and create your first automation!
                </h1>
              </div>

              {/* Vertical Connection Process Steps List */}
              <div className="space-y-4 pt-4 border-t border-dashed border-zinc-200 max-w-xl mx-auto">
                
                {/* Process Step 1 Card: Connect Instagram */}
                <div 
                  className={`p-5 rounded-2xl border-2 flex items-start gap-4 transition bg-white ${
                    instagramAccount 
                      ? 'border-emerald-350 bg-emerald-50/10'
                      : 'border-[#1A1510]'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="pt-0.5 shrink-0">
                    {instagramAccount ? (
                      <div className="w-5.5 h-5.5 rounded-full bg-[#16A34A] border border-[#1A1510] flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                      </div>
                    ) : (
                      <div className="w-5.5 h-5.5 rounded-full bg-white border-2 border-zinc-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-3 text-left">
                    <div>
                      <h4 className="text-sm font-black text-[#1A1510]">Step 1: Connect your Instagram Account</h4>
                      <p className="text-zinc-500 text-xs mt-1 font-semibold leading-relaxed">
                        You'll be able to create your first automation and enable the Unlimited Follower Growth feature after connecting your Instagram account.
                      </p>
                    </div>

                    {instagramAccount ? (
                      <div className="flex items-center justify-between p-3 bg-white border border-dashed border-emerald-300 rounded-xl">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon('instagram', 'h-4.5 w-4.5 text-pink-500')}
                          <span className="text-xs font-bold text-zinc-700">Connected as @{instagramAccount.username}</span>
                        </div>
                        <button 
                          onClick={handleDisconnectInstagram}
                          className="px-2.5 py-1 text-[10px] font-black text-red-500 hover:text-red-650 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleConnectInstagramFlow}
                        disabled={isConnecting}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-95 text-white font-extrabold text-[11px] transition shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {isConnecting ? (
                          <>
                            <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            {getPlatformIcon('instagram', 'h-4 w-4')} Connect Instagram Account
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Process Step 2 Card: Create First Automation */}
                <div 
                  className={`p-5 rounded-2xl border-2 flex items-start gap-4 transition bg-white ${
                    instagramAccount 
                      ? 'border-[#1A1510]'
                      : 'border-zinc-200 opacity-50 bg-zinc-50/30'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="pt-0.5 shrink-0">
                    <div className="w-5.5 h-5.5 rounded-full bg-white border-2 border-zinc-200 flex items-center justify-center text-zinc-400">
                      <Lock className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 text-left">
                    <div>
                      <h4 className={`text-sm font-black ${instagramAccount ? 'text-[#1A1510]' : 'text-zinc-400'}`}>
                        Step 2: Create your first Automation
                      </h4>
                      <p className="text-zinc-500 text-xs mt-1 font-semibold leading-relaxed">
                        Automate for comments on one of your Posts/Reels, Stories, Live, or when someone DMs you.
                      </p>
                    </div>

                    {instagramAccount && (
                      <button
                        onClick={handleCompleteOnboarding}
                        className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-[11px] transition shadow-md flex items-center gap-1.5 cursor-pointer border-2 border-[#1A1510]"
                        style={{ boxShadow: '3px 4px 0 #1A1510' }}
                      >
                        Create First Automation <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer actions bar */}
        <div className={`flex justify-between items-center pt-6 border-t border-dashed border-zinc-200 ${currentStep === 3 ? 'mt-4' : 'mt-10'}`}>
          
          {/* Progress state */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-14 h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
              <div 
                className="h-full bg-[#16A34A] rounded-full transition-all duration-300"
                style={{ width: currentStep === 1 ? '25%' : currentStep === 2 ? '50%' : currentStep === 3 ? '75%' : '100%' }}
              />
            </div>
            <span className="text-zinc-400 text-xs font-bold">Step {currentStep} of 4</span>
          </div>

          {/* Action buttons (Step 1 and Step 2) */}
          {currentStep < 3 && (
            <div className="flex items-center gap-4 select-none">
              {currentStep > 1 && (
                <button
                  onClick={handleBackStep}
                  className="px-4 py-3 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition cursor-pointer"
                >
                  &lt; Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                className={`px-6 py-3 rounded-full flex items-center gap-1.5 text-xs font-extrabold transition cursor-pointer ${
                  (currentStep === 1 ? isStep1Valid : isStep2Valid)
                    ? 'bg-black text-white hover:bg-zinc-800'
                    : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Back button link for Step 3 */}
          {currentStep === 3 && (
            <button
              onClick={handleBackStep}
              className="px-4 py-3 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition cursor-pointer select-none"
            >
              &lt; Back to Goals
            </button>
          )}

          {/* Back & Skip triggers for Step 4 */}
          {currentStep === 4 && (
            <div className="flex items-center gap-4 select-none">
              <button
                onClick={handleBackStep}
                className="px-4 py-3 text-xs font-extrabold text-zinc-500 hover:text-[#1A1510] transition cursor-pointer"
              >
                &lt; Back to Pricing
              </button>
              
              <button
                onClick={handleCompleteOnboarding}
                className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 font-extrabold text-xs transition cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Visible FAQ Accordion Section */}
      <div className="w-full max-w-3xl mx-auto p-6 rounded-3xl bg-white border-2 border-[#1A1510] text-left mt-8 space-y-4" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
        <div className="space-y-1">
          <span className="text-[10px] text-[#16A34A] font-extrabold uppercase tracking-wider block">Onboarding & Setup FAQs</span>
          <h3 className="font-serif text-lg font-bold text-[#1A1510]">
            Frequently asked questions
          </h3>
        </div>

        <div className="space-y-2.5">
          {onboardingFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-[#1A1510] bg-[#FAF6EE] overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-3.5 flex justify-between items-center text-xs font-bold text-[#1A1510] select-none cursor-pointer text-left gap-3"
              >
                <span>{faq.q}</span>
                <span className="h-4 w-4 rounded-full border border-[#1A1510] flex items-center justify-center text-[10px] shrink-0 bg-white font-mono">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-3.5 pb-3.5 text-xs text-zinc-600 leading-relaxed font-semibold border-t border-dashed border-zinc-200 pt-2.5 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function Onboarding() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6EE] flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}

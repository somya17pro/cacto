'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, ShieldCheck, X } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cacto_cookie_consent')
      if (!consent) {
        setShowBanner(true)
      } else if (consent === 'granted') {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          ;(window as any).gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          })
        }
      }
    } catch {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('cacto_cookie_consent', 'granted')
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        })
      }
    } catch {
      // ignore
    }
    setShowBanner(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem('cacto_cookie_consent', 'denied')
      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        })
      }
    } catch {
      // ignore
    }
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[120] bg-[#1A1510] text-stone-100 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-base">
          <Cookie className="w-5 h-5 text-emerald-400" />
          <span>Cookie &amp; Privacy Preferences</span>
        </div>
        <button
          onClick={handleDecline}
          className="text-stone-400 hover:text-white transition bg-transparent border-none cursor-pointer"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-stone-300 leading-relaxed font-medium mb-4">
        We use essential cookies for authentication and performance telemetry to improve your Instagram automation experience. Learn more in our{' '}
        <Link href="/privacy#cookies" className="text-emerald-400 underline font-semibold">
          Cookie Policy
        </Link>
        .
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer border-none"
        >
          Accept All
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl border border-stone-700 transition cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </div>
  )
}

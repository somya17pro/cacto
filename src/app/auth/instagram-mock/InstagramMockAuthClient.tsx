'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shield, Check, Lock } from 'lucide-react'

function InstagramMockAuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('fake_profile')
  const [pageId, setPageId] = useState('17841400000000000')
  const [profileId, setProfileId] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')

  useEffect(() => {
    setProfileId(searchParams.get('profileId') || 'mock-user-id')
    setRedirectUrl(searchParams.get('redirect_url') || '')
  }, [searchParams])

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct callback parameters
    const cleanUsername = username.replace('@', '').trim()
    const cleanPageId = pageId.trim() || '17841400000000000'
    const targetRedirect = redirectUrl || `${window.location.origin}/onboarding`

    const redirectUri = new URL(targetRedirect, window.location.origin)
    redirectUri.searchParams.set('success', 'true')
    redirectUri.searchParams.set('platform', 'instagram')
    redirectUri.searchParams.set('username', cleanUsername)
    redirectUri.searchParams.set('page_id', cleanPageId)
    redirectUri.searchParams.set('profileId', profileId)

    // Redirect user back to the application onboarding flow with query parameters
    router.push(redirectUri.pathname + redirectUri.search)
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center p-6 text-[#1A1510]">
      <div 
        className="w-full max-w-md bg-white border-2 border-[#1A1510] rounded-[24px] p-8 text-left relative overflow-hidden"
        style={{ boxShadow: '8px 12px 0 #1A1510' }}
      >
        {/* Meta / Instagram Mock Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-dashed border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌵</span>
            <span className="font-serif font-black text-sm tracking-tight">cacto.</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#EFF6FF] border border-blue-200 rounded-full text-[10px] font-black text-blue-600">
            <Shield className="h-3 w-3 fill-blue-100" />
            <span>Secure Meta Connect</span>
          </div>
        </div>

        <div className="space-y-6 pt-6">
          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-lg font-black text-[#1A1510] leading-tight">
              Authorize Cacto access
            </h1>
            <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
              Cacto wants to connect to your Instagram Business/Creator profile to automate comments and DMs.
            </p>
          </div>

          {/* Requested Permissions List */}
          <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-wider block">
              Requested Permissions:
            </span>
            <ul className="space-y-2">
              <li className="flex items-start gap-2.5 text-xs font-bold text-zinc-600">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Read comments, mentions, and media posts</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs font-bold text-zinc-600">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Send direct messages (DMs) to responders</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs font-bold text-zinc-600">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Access account username and profile statistics</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthorize} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-450 font-black uppercase tracking-wider block">
                Configure Test Account Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. your_instagram_handle"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-xs font-bold text-[#1A1510] focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-zinc-450 font-black uppercase tracking-wider block">
                Instagram Page ID (Optional)
              </label>
              <input
                type="text"
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                placeholder="17841400000000000"
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-[#1A1510] outline-none text-xs font-bold text-[#1A1510] focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs rounded-full border-2 border-[#1A1510] shadow-md transition cursor-pointer"
            >
              Authorize & Connect Account
            </button>
          </form>

          {/* Policy Info */}
          <div className="flex justify-center items-center gap-1 text-[9px] text-zinc-400 font-bold select-none pt-2">
            <Lock className="h-3 w-3" />
            <span>Cacto will never post content without permission.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InstagramMockAuth() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6EE] flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    }>
      <InstagramMockAuthContent />
    </Suspense>
  )
}

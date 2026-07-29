'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ShieldCheck, Key, Camera, CheckCircle2, Copy } from 'lucide-react'

export default function ProfileClient() {
  const [profile, setProfile] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/connect/instagram/profile')
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
        }
      } catch (e) {
        console.error('Failed to load profile:', e)
      }
    }
    loadProfile()
  }, [])

  const webhookUrl = 'https://cacto.cc/api/webhooks/zernio'

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24 space-y-10">
        
        {/* Header Title */}
        <div className="space-y-1 pb-6 border-b border-zinc-200">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#1A1510]">
            Account &amp; Integration Settings
          </h1>
          <p className="text-xs text-zinc-600 font-medium">
            Manage your Meta API access tokens, webhook dispatches, and third-party integrations.
          </p>
        </div>

        {/* Connected Instagram Account */}
        <div className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-[#16A34A]" />
              <h2 className="font-serif text-xl font-bold text-[#1A1510]">Connected Instagram Business Account</h2>
            </div>
            <span className="text-xs font-bold text-[#16A34A] bg-emerald-100 px-3 py-1 rounded-full">Connected 🟢</span>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF6EE] border border-zinc-200">
            <img
              src={profile?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={profile?.username || 'Profile'}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#1A1510]"
            />
            <div className="space-y-1">
              <h3 className="font-bold text-base text-[#1A1510]">@{profile?.username || 'fake_profile'}</h3>
              <p className="text-xs text-zinc-600 font-medium">{profile?.displayName || 'Test Creator Account'} • {(profile?.followersCount || 1240).toLocaleString()} Followers</p>
            </div>
          </div>
        </div>

        {/* Webhook Dispatch Configuration */}
        <div className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="flex items-center gap-3">
            <Key className="w-6 h-6 text-[#16A34A]" />
            <h2 className="font-serif text-xl font-bold text-[#1A1510]">Meta &amp; Zernio Webhook Endpoint</h2>
          </div>

          <p className="text-xs text-zinc-600 font-medium">
            This URL receives comment events directly from Meta Graph API webhooks to process comment-to-DM triggers in real-time.
          </p>

          <div className="p-4 rounded-2xl bg-zinc-900 text-white font-mono text-xs flex items-center justify-between gap-4">
            <span className="truncate">{webhookUrl}</span>
            <button
              onClick={handleCopyWebhook}
              className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white px-3 py-1.5 rounded-xl font-sans font-bold text-xs cursor-pointer border-none"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Camera, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export default function OnboardingClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectInstagram = async () => {
    setIsConnecting(true)
    try {
      const res = await fetch('/api/connect/instagram')
      if (res.ok) {
        const data = await res.json()
        if (data.authUrl) {
          window.location.href = data.authUrl
          return
        }
      }
      setStep(2)
    } catch (err) {
      console.error('Connection error:', err)
      setStep(2)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 md:px-8 pt-32 pb-24 space-y-10">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200 pb-6">
          <div className={`flex items-center gap-2 text-xs font-extrabold ${step >= 1 ? 'text-[#16A34A]' : 'text-zinc-400'}`}>
            <span className="w-6 h-6 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-xs">1</span>
            <span>Connect Instagram</span>
          </div>
          <div className="h-0.5 flex-1 bg-zinc-200 mx-2" />
          <div className={`flex items-center gap-2 text-xs font-extrabold ${step >= 2 ? 'text-[#16A34A]' : 'text-zinc-400'}`}>
            <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-xs">2</span>
            <span>Create First Automation</span>
          </div>
          <div className="h-0.5 flex-1 bg-zinc-200 mx-2" />
          <div className={`flex items-center gap-2 text-xs font-extrabold ${step >= 3 ? 'text-[#16A34A]' : 'text-zinc-400'}`}>
            <span className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center text-xs">3</span>
            <span>Launch</span>
          </div>
        </div>

        {/* Step 1 Content */}
        {step === 1 && (
          <div className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6 text-center" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] mx-auto flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold text-[#1A1510]">Connect Your Instagram Account</h1>
              <p className="text-xs text-zinc-600 font-medium max-w-md mx-auto">
                Authorize Cacto via official Meta Graph API OAuth to catch incoming Reel comments and send automated DM links.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2 text-left text-xs font-medium text-zinc-600 max-w-md mx-auto">
              <div className="flex items-center gap-2 font-bold text-[#1A1510]">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Meta API Security Guarantee</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px]">
                <li>Requires Instagram Professional (Business or Creator) account.</li>
                <li>Uses official Meta OAuth 2.0 token authorization.</li>
                <li>0% spam risk with built-in comment reply rotators.</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={handleConnectInstagram}
                disabled={isConnecting}
                className="inline-flex items-center gap-3 bg-[#16A34A] hover:bg-[#15803D] text-white px-8 py-4 rounded-full font-extrabold text-sm shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Camera className="w-5 h-5" />
                <span>{isConnecting ? 'Connecting to Meta...' : 'Connect Instagram Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-zinc-500 hover:text-[#1A1510] underline bg-transparent border-none cursor-pointer"
              >
                Skip for now &amp; test in developer sandbox mode &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {step === 2 && (
          <div className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6 text-center" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] mx-auto flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-bold text-[#1A1510]">Account Connected Successfully!</h1>
              <p className="text-xs text-zinc-600 font-medium max-w-md mx-auto">
                Your Instagram profile is ready. Now create your first comment-to-DM automation trigger.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/autodm"
                className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-8 py-3.5 rounded-full font-extrabold text-xs shadow-md transition-all decoration-none"
              >
                <span>Create First Automation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#1A1510] text-white px-6 py-3.5 rounded-full font-bold text-xs decoration-none"
              >
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}

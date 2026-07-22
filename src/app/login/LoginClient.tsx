'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message || 'You have been successfully added to our waitlist!')
        setEmail('')
      } else {
        setError(data.error || 'Failed to join waitlist. Please try again.')
      }
    } catch (err: any) {
      setError('Failed to connect to the server. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBypass = () => {
    // Route directly to dashboard using localstorage session bypass
    localStorage.setItem('cacto_bypass_auth', 'true')
    router.push('/onboarding')
  }

  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const loginFaqs = [
    {
      q: "How do I request private beta waitlist access for Cacto?",
      a: "Enter your email address on the sign-in card to join the waitlist. Priority invitations are sent on a rolling basis as server capacity expands."
    },
    {
      q: "What is developer bypass mode used for?",
      a: "Developer bypass mode allows creators and testers to preview and evaluate the Cacto automation dashboard immediately without waiting for OAuth approval."
    },
    {
      q: "How does passwordless and OAuth authentication work on Cacto?",
      a: "Cacto uses passwordless email magic links and official Meta OAuth 2.0 logins for fast, secure authentication without storing passwords."
    },
    {
      q: "What should I do if my Instagram account authorization expires?",
      a: "Simply log back into Cacto and re-authorize your Meta connection in Profile Settings to generate a fresh API access token."
    },
    {
      q: "Who can I contact for early onboarding assistance?",
      a: "For priority access or questions, email founder Somya Nayak at somyanayak281@gmail.com for direct technical assistance."
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": loginFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  return (
    <div 
      className="min-h-screen text-[#1A1510] flex flex-col justify-center items-center p-6 selection:bg-[#16A34A] selection:text-white relative overflow-hidden py-12"
      style={{
        backgroundImage: 'radial-gradient(600px 300px at 50% 10%, rgba(22,163,74,0.1), transparent 60%)',
        backgroundColor: '#FAF6EE'
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-2 mb-8 z-10 select-none">
        <span className="text-3xl">🌵</span>
        <span className="font-serif text-4xl font-bold italic tracking-tight text-[#1A1510] lowercase">
          cacto<span className="text-[#16A34A] font-sans not-italic">.</span>
        </span>
      </div>

      {/* Rebuilt Waitlist Card */}
      <div 
        className="w-full max-w-md p-8 rounded-3xl bg-white border-2 border-[#1A1510] z-10 text-left"
        style={{ boxShadow: '8px 12px 0 #1A1510' }}
      >
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A1510]">Join the Waitlist</h2>
        <p className="text-zinc-500 text-xs font-semibold mt-1 mb-8 leading-relaxed">
          Join our waitlist and make sure you are in for our launch.
        </p>

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex gap-2.5 items-start">
            <ShieldAlert className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {message && (
          <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-extrabold flex gap-2.5 items-start">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#16A34A]" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleWaitlist} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="email"
              placeholder="somyanayak281@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-2 border-[#1A1510] focus:ring-1 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-sm placeholder:text-zinc-400 font-bold text-[#1A1510]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-[#16A34A] hover:bg-[#15803D] active:scale-95 disabled:opacity-50 disabled:scale-100 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 border-2 border-[#1A1510] shadow-md cursor-pointer"
          >
            {isLoading ? 'Joining Waitlist...' : 'Join Waitlist'} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="relative my-8 text-center select-none">
          <hr className="border-zinc-200 border-dashed" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-white text-[9px] text-zinc-400 font-extrabold uppercase tracking-wider">
            Developer Options
          </span>
        </div>

        <button
          onClick={handleBypass}
          className="w-full py-3.5 rounded-full bg-white border-2 border-[#1A1510] hover:bg-zinc-50 active:scale-95 transition text-xs font-extrabold text-[#1A1510] cursor-pointer"
        >
          Bypass Auth (Skip to App Testing)
        </button>
      </div>

      {/* Visible FAQ Accordion Section */}
      <div 
        className="w-full max-w-md p-6 rounded-3xl bg-white border-2 border-[#1A1510] z-10 text-left mt-8 space-y-4"
        style={{ boxShadow: '6px 8px 0 #1A1510' }}
      >
        <div className="space-y-1">
          <span className="text-[10px] text-[#16A34A] font-extrabold uppercase tracking-wider block">Access & Sign-In FAQs</span>
          <h3 className="font-serif text-lg font-bold text-[#1A1510]">
            Frequently asked questions
          </h3>
        </div>

        <div className="space-y-2.5">
          {loginFaqs.map((faq, idx) => (
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Lock } from 'lucide-react'

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(true)

  const supabase = createClient()

  const handleGoogleLogin = async () => {
    if (!agreedToTerms) {
      setMessage({ type: 'error', text: 'Please agree to the Terms of Service & Privacy Policy to proceed.' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      console.error('Google Auth Error:', err)
      setMessage({ type: 'error', text: err.message || 'Failed to initialize Google login. Please try again.' })
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms) {
      setMessage({ type: 'error', text: 'Please agree to the Terms of Service & Privacy Policy to proceed.' })
      return
    }

    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: '✨ Magic login link sent! Check your inbox to complete sign in.',
      })
    } catch (err: any) {
      console.error('Magic Link Error:', err)
      setMessage({ type: 'error', text: err.message || 'Failed to send magic link.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0D0A] text-stone-100 flex flex-col justify-between selection:bg-[#16A34A] selection:text-white">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#16A34A]/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md bg-[#1A1510]/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80">
          
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16A34A] to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-[#1A1510] rounded-[15px] flex items-center justify-center font-extrabold text-[#16A34A] text-xl group-hover:bg-transparent group-hover:text-white transition-all">
                  C
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Cacto</span>
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">
              Welcome to Cacto v1
            </h1>
            <p className="text-stone-400 text-sm">
              Automate Instagram Reel & Post DMs in 60 Seconds
            </p>
          </div>

          {/* Alert Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl text-xs font-medium flex items-start gap-3 border ${
                message.type === 'success'
                  ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> : <Zap className="w-4 h-4 text-rose-400" />}
              </div>
              <span>{message.text}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-stone-600 rounded-2xl font-semibold text-sm text-stone-100 flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group mb-6"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-stone-800"></div>
            <span className="absolute bg-[#1A1510] px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Or sign in with email
            </span>
          </div>

          {/* Email Magic Link Form */}
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-stone-400 mb-2">
                Work or Creator Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@creator.com"
                required
                className="w-full h-11 bg-stone-950 border border-stone-800 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] rounded-xl px-4 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-[#16A34A] to-emerald-500 hover:from-emerald-500 hover:to-[#16A34A] font-bold text-sm text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#16A34A]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Send Magic Link</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Terms & Privacy Consent Checkbox */}
          <div className="mt-6 pt-6 border-t border-stone-800/80">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-stone-400 select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-stone-700 text-[#16A34A] focus:ring-[#16A34A] bg-stone-900 cursor-pointer"
              />
              <span>
                I agree to Cacto&apos;s{' '}
                <Link href="/terms" className="text-[#16A34A] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#16A34A] hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Security Footnote */}
          <div className="mt-6 text-center flex items-center justify-center gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Meta Graph API v20.0 Verified • 256-bit Encrypted</span>
          </div>

        </div>
      </main>
    </div>
  )
}

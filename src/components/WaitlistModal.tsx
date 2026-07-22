'use client'

import React, { useState } from 'react'
import { X, Mail, CheckCircle } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const handleClose = () => {
    setStatus('idle')
    setMessage('')
    setEmail('')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('You are on the waitlist! We will notify you when spots open up.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to join waitlist. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div 
        className="bg-[#FAF6EE] border-2 border-[#1A1510] rounded-[28px] max-w-md w-full p-8 space-y-6 relative text-left"
        style={{ boxShadow: '8px 12px 0 #1A1510' }}
      >
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 text-zinc-400 hover:text-[#1A1510] transition border-none bg-transparent cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#1A1510] flex items-center gap-2">
            <span>🌵</span> Join our waitlist.
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
            Join our waitlist and make sure you are in for our launch.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-extrabold flex gap-2.5 items-start">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#16A34A]" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-[#1A1510] outline-none text-xs font-bold text-[#1A1510] placeholder:text-zinc-400 bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 bg-[#16A34A] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#15803D] transition border-none cursor-pointer"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
            {status === 'error' && (
              <p className="text-xs font-bold text-center text-red-500">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

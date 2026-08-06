'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'

interface NavbarProps {
  onOpenWaitlist?: () => void
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Tools', href: '/tools' },
    { name: 'Blog', href: '/blog' },
  ]

  const handleWaitlistClick = () => {
    if (onOpenWaitlist) {
      onOpenWaitlist()
    } else {
      window.location.href = '/?waitlist=true'
    }
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-5xl transition-all duration-300">
      <div 
        className={`bg-[#1A1510]/95 backdrop-blur-md text-[#FAF6EE] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_20px_rgba(22,163,74,0.2)] transition-all duration-300 ${
          mobileMenuOpen ? 'rounded-[28px] p-4' : 'rounded-full px-5 py-2.5'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none group shrink-0">
            <span className="text-xl group-hover:scale-110 transition-transform duration-200">🌵</span>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6EE] lowercase group-hover:text-emerald-400 transition-colors">
              cacto
            </span>
            <span className="text-[10px] uppercase tracking-wider bg-emerald-900/60 text-emerald-300 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
              v1.0
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-zinc-300 font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-emerald-400 transition-all duration-200 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleWaitlistClick}
              type="button"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4.5 py-2 rounded-full font-extrabold text-xs transition-all shadow-md shadow-emerald-900/30 cursor-pointer border border-emerald-400/30 active:scale-95 hover:shadow-emerald-500/20 hover:shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Join Free Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-1.5 text-[#FAF6EE] hover:bg-white/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 px-2 space-y-2 border-t border-white/10 mt-3 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-sm font-bold text-zinc-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

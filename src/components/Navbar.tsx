'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenWaitlist?: () => void
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Comparison', href: '/#comparison' },
    { name: 'Blog', href: '/blog' },
    { name: 'Free Tools', href: '/tools' },
  ]

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-5xl transition-all duration-300">
      <div 
        className={`bg-[#1A1510] text-[#FAF6EE] border border-[#1A1510]/80 shadow-[0_14px_35px_rgba(26,21,16,0.3),0_2px_8px_rgba(22,163,74,0.15)] transition-all duration-300 ${
          mobileMenuOpen ? 'rounded-[28px] p-4' : 'rounded-full px-5 py-2.5'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 select-none group shrink-0">
            <span className="text-xl group-hover:scale-110 transition-transform">🌵</span>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6EE] lowercase">
              cacto
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-zinc-300 font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 hover:text-[#16A34A]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenWaitlist && onOpenWaitlist()}
              type="button"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 rounded-full font-extrabold text-xs transition-all shadow-sm cursor-pointer border-none active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Join Waitlist
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-1.5 text-[#FAF6EE] hover:bg-white/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
              aria-label="Toggle menu"
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
                className="block px-3 py-2 text-sm font-bold text-zinc-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
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

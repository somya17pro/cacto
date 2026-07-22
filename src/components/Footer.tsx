'use client'

import React from 'react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#FAF6EE] border-t border-zinc-200 py-24 text-center select-none space-y-6">
      <div className="font-serif text-[10vw] font-black tracking-tighter text-[#1A1510] lowercase leading-none flex items-center justify-center gap-2">
        <Logo className="w-[8vw] h-[8vw]" /> cacto
      </div>
      <p className="text-xs text-zinc-500 font-bold">Made with 💚</p>
    </footer>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#FAF6EE] border-t border-zinc-200 py-24 text-center select-none space-y-6">
      {/* Temporarily hidden links
      <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
        <Link href="/templates" className="text-zinc-500 hover:text-[#16A34A] font-bold transition text-sm uppercase tracking-wider">Automations We Love</Link>
        <Link href="/compare/cacto-vs-manychat" className="text-zinc-500 hover:text-[#16A34A] font-bold transition text-sm uppercase tracking-wider">Cacto vs. ManyChat</Link>
        <Link href="/open" className="text-zinc-500 hover:text-[#16A34A] font-bold transition text-sm uppercase tracking-wider">Transparency</Link>
      </div>
      */}
      
      <div className="font-serif text-[10vw] font-black tracking-tighter text-[#1A1510] lowercase leading-none flex items-center justify-center gap-2">
        <span>🌵</span> cacto
      </div>
      <p className="text-xs text-zinc-500 font-bold">Made with 💚</p>
    </footer>
  )
}

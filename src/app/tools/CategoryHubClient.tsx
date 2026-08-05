'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolData } from '@/utils/toolsData'
import { Search, ArrowRight } from 'lucide-react'

interface HubClientProps {
  category: string
  categoryName: string
  tools: ToolData[]
}

export default function CategoryHubClient({ category, categoryName, tools }: HubClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<'All' | 'Calculators' | 'Generators' | 'Utility'>('All')

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'All' || t.category === selectedTag
    return matchesSearch && matchesTag
  })

  return (
    <div>
      {/* Search & Tag Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border-2 border-[#1A1510] shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder={`Search ${categoryName} tools...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1A1510] transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {(['All', 'Calculators', 'Generators', 'Utility'] as const).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#1A1510] text-[#FAF6EE]'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-bold text-[#1A1510]">
          Showing {filteredTools.length} {categoryName} Tools
        </h2>
        <span className="text-xs font-semibold text-zinc-500">100% Free • Client-Side Engine</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredTools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${category}/${t.slug}`}
            className="group bg-white rounded-2xl p-6 border-2 border-[#1A1510] hover:border-emerald-600 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold uppercase border border-emerald-200">
                  {t.category}
                </span>
                <span className="text-[10px] font-bold text-zinc-400 group-hover:text-emerald-600 transition flex items-center gap-1">
                  Open Tool <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1510] mb-2 group-hover:text-emerald-700 transition">
                {t.title}
              </h3>
              <p className="text-zinc-600 text-xs leading-relaxed line-clamp-2 mb-4">
                {t.description}
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-semibold">
              <span>⚡ Sub-50ms Execution</span>
              <span>🔒 Zero Upload</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#1A1510] via-zinc-900 to-emerald-950 text-[#FAF6EE] rounded-3xl p-8 sm:p-10 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
            Powered by Cacto Growth Engine
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-black mb-3">
            Want to Automate Your Instagram & E-Commerce Leads?
          </h3>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
            Turn your comments, DMs, and story votes into paying customers automatically with Cacto&apos;s Meta-compliant automation suite.
          </p>
          <Link
            href="/autodm"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-extrabold text-xs transition hover:bg-emerald-400 shadow-lg"
          >
            Start Free 14-Day Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

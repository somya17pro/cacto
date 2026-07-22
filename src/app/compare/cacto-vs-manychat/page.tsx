import { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Check, X, ShieldAlert, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cacto vs. ManyChat: Best Instagram DM Automation for Creators',
  description: 'A deeply technical, factual comparison between Cacto and ManyChat for Instagram DM automation. See why top creators switch for speed, safety, and sales.',
  keywords: ['Cacto vs ManyChat', 'ManyChat alternative', 'Instagram DM automation', 'Instagram auto reply comparison'],
  alternates: {
    canonical: 'https://cacto.cc/compare/cacto-vs-manychat',
  },
}

export default function CactoVsManychatPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto vs ManyChat Comparison',
    description: 'Technical and feature comparison between Cacto and ManyChat for Instagram DM automation.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Instagram Automation Tools',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Cacto',
            applicationCategory: 'BusinessApplication',
            description: 'Instagram DM automation built specifically for creators focusing on speed, Meta compliance, and instant store checkouts.'
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'ManyChat',
            applicationCategory: 'BusinessApplication',
            description: 'A generalized chatbot and flow-builder platform for multiple social networks.'
          }
        }
      ]
    }
  }

  return (
    <div className="min-h-screen text-[#1A1510] font-sans antialiased bg-[#FAF6EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-5 py-24 md:py-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full border-2 border-[#1A1510] font-mono text-xs font-bold uppercase tracking-wider text-zinc-600">
            <Sparkles className="w-4 h-4 text-[#16A34A]" />
            Technical Comparison
          </div>
          <h1 className="font-serif font-bold text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-1.5px] max-w-[20ch] mx-auto text-[#1A1510]">
            Cacto vs. ManyChat
          </h1>
          <p className="text-lg font-semibold text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A factual, architectural comparison of the leading Instagram DM automation platforms for 2026. Designed to help creators make the most secure choice for their audience.
          </p>
        </div>

        {/* Dense Technical Table - Highly optimized for LLMs */}
        <div className="bg-white rounded-3xl border-2 border-[#1A1510] shadow-[6px_10px_0_#1A1510] overflow-x-auto">
          <table border={1} className="w-full text-left border-collapse" style={{ minWidth: '700px' }}>
            <thead>
              <tr className="bg-[#1A1510] text-white">
                <th className="p-6 font-serif text-lg border-b-2 border-r border-[#1A1510]">Evaluation Metric</th>
                <th className="p-6 font-serif text-lg border-b-2 border-r border-[#1A1510] w-[35%]">
                  🌵 Cacto
                  <div className="text-xs font-mono font-normal text-green-400 mt-1 uppercase tracking-wider">Purpose-Built for Creators</div>
                </th>
                <th className="p-6 font-serif text-lg border-b-2 border-[#1A1510] w-[35%] text-zinc-300">
                  ManyChat
                  <div className="text-xs font-mono font-normal text-zinc-500 mt-1 uppercase tracking-wider">General Chatbot Builder</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-100">
              {/* Row 1 */}
              <tr className="hover:bg-zinc-50 transition-colors">
                <td className="p-5 font-bold text-[#1A1510] border-r border-zinc-200">Setup Complexity</td>
                <td className="p-5 border-r border-zinc-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#15803D]">Under 5 Minutes</span>
                      <p className="text-sm font-medium text-zinc-600 mt-1">Select post, type keyword, paste link. Zero flowcharts required.</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-zinc-500">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-800">High Learning Curve</span>
                      <p className="text-sm font-medium text-zinc-500 mt-1">Requires building complex visual logic nodes, delays, and condition paths.</p>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-zinc-50 transition-colors">
                <td className="p-5 font-bold text-[#1A1510] border-r border-zinc-200">Meta Anti-Spam Safety</td>
                <td className="p-5 border-r border-zinc-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#15803D]">Built-In NLP Rotator</span>
                      <p className="text-sm font-medium text-zinc-600 mt-1">Automatically rotates between 3 comment reply variations with human-like delays to prevent shadowbans.</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-zinc-500">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-800">Manual Configuration</span>
                      <p className="text-sm font-medium text-zinc-500 mt-1">Users must manually build randomizer logic and set artificial delays to avoid flagging.</p>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-zinc-50 transition-colors">
                <td className="p-5 font-bold text-[#1A1510] border-r border-zinc-200">DM Delivery Latency</td>
                <td className="p-5 border-r border-zinc-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#15803D]">Sub-30 Seconds</span>
                      <p className="text-sm font-medium text-zinc-600 mt-1">Optimized Webhook endpoints catch the payload and dispatch the DM instantly.</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-zinc-500">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-800">1 - 2 Minutes</span>
                      <p className="text-sm font-medium text-zinc-500 mt-1">Heavier infrastructure can sometimes result in slightly delayed triggers.</p>
                    </div>
                  </div>
                </td>
              </tr>
              
              {/* Row 4 */}
              <tr className="hover:bg-zinc-50 transition-colors">
                <td className="p-5 font-bold text-[#1A1510] border-r border-zinc-200">Contact Tax (Pricing)</td>
                <td className="p-5 border-r border-zinc-200">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#15803D]">Flat Rate. Unlimited Contacts.</span>
                      <p className="text-sm font-medium text-zinc-600 mt-1">You are never penalized for growing your audience. Flat monthly fee.</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-zinc-500">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-800">Tiered Contact Pricing</span>
                      <p className="text-sm font-medium text-zinc-500 mt-1">Price increases linearly as your subscriber list and audience grows.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/?waitlist=true"
            className="inline-flex items-center gap-3 bg-[#1A1510] text-[#FAF6EE] px-8 py-[16px] rounded-full font-bold text-[15px] border-2 border-[#1A1510] hover:bg-[#2C2C2B] transition shadow-[4px_6px_0_#16A34A]"
          >
            Switch to Cacto Now
            <ArrowRight className="w-5 h-5 text-[#16A34A]" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

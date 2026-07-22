import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Sparkles, MessageCircle, Heart, Share2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Automations We Love: High-Converting Instagram DM Scripts',
  description: 'See the exact Instagram DM automation scripts, triggers, and anti-spam replies used by top creators to drive massive conversions.',
  keywords: ['Instagram DM templates', 'automation scripts', 'Cacto templates', 'Instagram DM examples'],
  alternates: {
    canonical: 'https://cacto.cc/templates',
  },
}

const templates = [
  {
    title: 'The Course Checkout',
    industry: 'Education / Coaches',
    trigger: '"MASTERCLASS"',
    conversion: '31%',
    replies: [
      'Sending the link to your DMs now! 🚀',
      'Check your requests! Just sent the checkout link.',
      'Got it! The masterclass link is in your inbox.'
    ],
    payload: 'Hey! As promised, here is your private link to join the next cohort of the Masterclass: [Link]. Let me know if you have any questions before enrolling!'
  },
  {
    title: 'The Digital Product Freebie',
    industry: 'Creators',
    trigger: '"GUIDE"',
    conversion: '44%',
    replies: [
      'The PDF is waiting for you in your DMs! 📖',
      'Sent! Let me know what you think of page 4.',
      'Check your DMs for the free guide!'
    ],
    payload: 'Thanks for asking for the guide! You can download your free PDF right here: [Link]. Enjoy!'
  },
  {
    title: 'The Strategy Call Booking',
    industry: 'Consultants / Agency',
    trigger: '"AUDIT"',
    conversion: '18%',
    replies: [
      'Just DMed you my calendar! 🗓️',
      'Sending you the booking link now!',
      'Check your inbox to grab a time.'
    ],
    payload: 'Hey! I would love to chat. Pick a time on my Calendly that works for you: [Link]. Looking forward to it!'
  },
  {
    title: 'The Shopify Cart Recovery',
    industry: 'E-commerce',
    trigger: '"DISCOUNT"',
    conversion: '22%',
    replies: [
      'Check your DMs for the 15% off code! 🛍️',
      'Sent the promo code to your inbox!',
      'Discount coming right up! Check your DMs.'
    ],
    payload: 'Hey! Here is your exclusive 15% off code: INSTA15. You can apply it directly at checkout here: [Link].'
  },
  {
    title: 'The Newsletter Opt-in',
    industry: 'Writers / Media',
    trigger: '"SUBSCRIBE"',
    conversion: '56%',
    replies: [
      'Just sent the subscription link! 💌',
      'Check your DMs to join the club.',
      'Sent! Welcome to the community.'
    ],
    payload: 'Hey! Tap this link to instantly subscribe to the weekly newsletter: [Link]. See you on Sunday!'
  }
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen text-[#1A1510] font-sans antialiased bg-[#FAF6EE]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-24 md:py-32">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full border-2 border-[#1A1510] font-mono text-xs font-bold uppercase tracking-wider text-zinc-600">
            <Heart className="w-4 h-4 text-rose-500" />
            Automations We Love
          </div>
          <h1 className="font-serif font-bold text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-1.5px] max-w-[18ch] mx-auto text-[#1A1510]">
            Steal these <span className="text-[#16A34A]">DM scripts</span>
          </h1>
          <p className="text-lg font-semibold text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Don't guess what works. Here are the exact trigger keywords, anti-spam comment replies, and DM payloads used by top Cacto creators to drive massive conversions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl, i) => (
            <div key={i} className="bg-white border-2 border-[#1A1510] rounded-[24px] p-6 shadow-[4px_6px_0_#1A1510] hover:-translate-y-1 hover:shadow-[6px_10px_0_#16A34A] transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">{tpl.industry}</div>
                  <h3 className="font-serif font-bold text-2xl text-[#1A1510]">{tpl.title}</h3>
                </div>
                <div className="bg-[#E6F4EA] border-2 border-[#16A34A]/30 text-[#15803D] px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3" /> {tpl.conversion}
                </div>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Trigger Keyword
                  </div>
                  <div className="font-mono text-sm font-bold text-[#1A1510]">{tpl.trigger}</div>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Rotated Replies (Anti-Spam)
                  </div>
                  <ul className="space-y-2">
                    {tpl.replies.map((reply, j) => (
                      <li key={j} className="text-sm font-semibold text-zinc-600 flex gap-2">
                        <span className="text-zinc-400">↳</span> {reply}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> The DM Payload
                  </div>
                  <div className="text-sm font-semibold text-blue-900 leading-relaxed">
                    "{tpl.payload}"
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

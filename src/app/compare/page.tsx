import { Metadata } from 'next';
import Link from 'next/link';
import { competitorComparisons } from '@/utils/competitorData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Cacto vs. Top Instagram DM Automation Platforms (2026)',
  description:
    'Compare Cacto vs ManyChat, Chatfuel, LinkDM, Customers.ai, ReplyKaro, Respond.io, and more. Flat $19/mo pricing, 100% Meta Graph API safety, sub-50ms speed.',
  keywords: [
    'Instagram DM automation comparison',
    'ManyChat alternatives',
    'Chatfuel alternatives',
    'LinkDM alternative',
    'Instagram comment to DM tools',
  ],
  alternates: {
    canonical: 'https://cacto.cc/compare',
  },
  openGraph: {
    title: 'Compare Cacto vs. Top Instagram DM Automation Platforms',
    description:
      'Compare Cacto vs ManyChat, Chatfuel, LinkDM, and more. Flat $19/mo pricing and 1,010 free tools.',
    url: 'https://cacto.cc/compare',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Cacto vs. Top Instagram DM Automation Platforms',
    description: 'Compare Cacto vs ManyChat, Chatfuel, LinkDM, and more. Flat $19/mo pricing and 1,010 free tools.',
  },
};

export default function CompareIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Instagram DM Automation Platform Comparisons',
    description: 'Head-to-head comparisons of Cacto vs top Instagram DM automation platforms.',
    url: 'https://cacto.cc/compare',
    hasPart: competitorComparisons.map((c) => ({
      '@type': 'WebPage',
      name: c.metaTitle,
      url: `https://cacto.cc/compare/${c.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 space-y-12 text-left">
        {/* Header */}
        <header className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E6F4EA] border border-[#16A34A]/20 text-[#16A34A] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Competitive Intelligence Hub</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1A1510] leading-tight tracking-tight">
            Compare Cacto vs. Leading Instagram DM Automation Platforms
          </h1>

          <p className="text-zinc-600 text-xs md:text-sm font-semibold leading-relaxed">
            See how Cacto’s flat $19/mo pricing, sub-50ms execution speed, and 1,010 free tools ecosystem stack up against traditional contact-tier taxed competitors.
          </p>
        </header>

        {/* Competitor Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitorComparisons.map((item) => (
            <article
              key={item.slug}
              className="p-6 rounded-[24px] bg-white border-2 border-[#1A1510] flex flex-col justify-between space-y-4 transition-transform hover:-translate-y-1"
              style={{ boxShadow: '5px 6px 0 #1A1510' }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF6EE] border border-zinc-300 text-[11px] font-extrabold uppercase tracking-wider text-zinc-700">
                    <MessageSquare className="w-3 h-3 text-[#16A34A]" />
                    <span>vs {item.name}</span>
                  </span>
                  <span className="text-[11px] font-black text-[#16A34A] bg-[#E6F4EA] px-2 py-0.5 rounded-md">
                    Save Up to 80%/mo
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#1A1510]">
                  Cacto vs. {item.name}
                </h2>

                <p className="text-zinc-600 text-xs font-medium line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>

                <div className="pt-2 border-t border-dashed border-zinc-200 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400">Cacto</span>
                    <span className="font-extrabold text-[#16A34A]">{item.cactoStartingPrice}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-zinc-400">{item.name}</span>
                    <span className="font-bold text-zinc-700">{item.startingPrice}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/compare/${item.slug}`}
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#1A1510] text-white text-xs font-bold hover:bg-[#16A34A] transition"
              >
                <span>Read Head-to-Head Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

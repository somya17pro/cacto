import Link from 'next/link'
import { permanentRedirect, notFound } from 'next/navigation'
import { freeToolsList, getToolSiloCategory } from '@/utils/toolsData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoryHubClient from '../CategoryHubClient'

interface PageProps {
  params: Promise<{ tool: string }>
}

const categories = ['converters', 'pdf', 'text', 'developer', 'seo', 'finance', 'business', 'office', 'legal', 'ai', 'ecommerce', 'social']

const categoryTitles: { [key: string]: { name: string; desc: string } } = {
  converters: { name: 'Converters', desc: 'Free online image, audio, data, and unit converters. Instant 100% client-side conversion with zero file uploads.' },
  pdf: { name: 'PDF Tools', desc: 'Merge, split, compress, unlock, watermark, and reorient PDF files directly inside your browser.' },
  text: { name: 'Text Utilities', desc: 'Deduplicate lines, count words, analyze Flesch readability, format text cases, and inspect diffs.' },
  developer: { name: 'Developer Tools', desc: 'Decode JWT tokens, format SQL queries, minifier code, generate UUIDs v4, test regex, and encode Base64.' },
  seo: { name: 'SEO Tools', desc: 'Generate meta title and description snippets, robots.txt, sitemaps, hreflang tags, and canonical tags.' },
  finance: { name: 'Finance Calculators', desc: 'Calculate GST, SIP mutual fund returns, loan EMIs, fixed deposits, SWP, and tax exemptions.' },
  business: { name: 'Business Calculators', desc: 'Calculate gross profit margins, SaaS MRR/ARR, unit economics breakeven, and customer lifetime value (LTV).' },
  office: { name: 'Office & HR Templates', desc: 'Generate professional resignation letters, employment offer formats, and overtime calculations.' },
  legal: { name: 'Legal Templates', desc: 'Create freelancer invoices, non-disclosure agreements (NDAs), and business agreements.' },
  ai: { name: 'AI Prompt Tools', desc: 'Structure master prompts for ChatGPT, Midjourney, Claude, and B2B cold email outreach.' },
  ecommerce: { name: 'E-Commerce Tools', desc: 'Calculate Amazon FBA fees, dimensional weight shipping rates, and Shopify cart recovery ROI.' },
  social: { name: 'Social Media Tools', desc: 'Format LinkedIn posts with bold text, calculate Instagram engagement rate, and boost CTR.' },
}

export async function generateStaticParams() {
  const toolParams = freeToolsList.map((t) => ({ tool: t.slug }))
  const catParams = categories.map((c) => ({ tool: c }))
  return [...toolParams, ...catParams]
}

export default async function ToolOrCategoryPage({ params }: PageProps) {
  const { tool: slugOrCat } = await params

  // 1. Check if slugOrCat is a Category Hub (e.g. /tools/pdf)
  if (categories.includes(slugOrCat)) {
    const catInfo = categoryTitles[slugOrCat]
    const categoryTools = freeToolsList.filter((t) => getToolSiloCategory(t) === slugOrCat)

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://cacto.cc/tools' },
        { '@type': 'ListItem', position: 3, name: catInfo.name, item: `https://cacto.cc/tools/${slugOrCat}` },
      ],
    }

    return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <nav className="flex items-center text-xs text-zinc-500 font-semibold mb-6 space-x-2">
            <Link href="/" className="hover:text-[#1A1510]">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#1A1510]">Tools</Link>
            <span>/</span>
            <span className="text-[#1A1510] font-bold">{catInfo.name}</span>
          </nav>

          <div className="bg-[#1A1510] text-[#FAF6EE] rounded-3xl p-8 sm:p-12 mb-12 shadow-xl border border-zinc-800">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
              {catInfo.name} Silo Hub • {categoryTools.length} Free Tools
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-tight">
              Free {catInfo.name}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {catInfo.desc}
            </p>
          </div>

          <CategoryHubClient category={slugOrCat} categoryName={catInfo.name} tools={categoryTools} />
        </main>

        <Footer />
      </div>
    )
  }

  // 2. Check if slugOrCat is a Tool Slug -> Issue HTTP 301 Redirect to /tools/[category]/[slug]
  const tool = freeToolsList.find((t) => t.slug === slugOrCat)
  if (!tool) {
    notFound()
  }

  const category = getToolSiloCategory(tool)
  permanentRedirect(`/tools/${category}/${tool.slug}`)
}

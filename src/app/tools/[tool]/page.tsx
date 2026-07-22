import type { Metadata } from 'next'
import { freeToolsList } from '@/utils/toolsData'
import ToolDetailClient from './ToolDetailClient'

interface PageProps {
  params: Promise<{ tool: string }>
}

export async function generateStaticParams() {
  return freeToolsList.map((t) => ({
    tool: t.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: toolSlug } = await params
  const tool = freeToolsList.find(t => t.slug === toolSlug)

  if (!tool) {
    return {
      title: 'Tool Not Found | Cacto Free Tools',
      description: 'The requested growth tool could not be located on Cacto.',
    }
  }

  const url = `https://cacto.cc/tools/${tool.slug}`

  return {
    title: `${tool.title} | Free Cacto Growth Tool`,
    description: tool.description,
    keywords: tool.seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${tool.title} | Cacto Free Tools`,
      description: tool.description,
      url: url,
      siteName: 'Cacto',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | Cacto Free Tools`,
      description: tool.description,
    },
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const tool = freeToolsList.find(t => t.slug === resolvedParams.tool)

  const jsonLd = tool ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://cacto.cc/tools/${tool.slug}/#software`,
        "name": tool.title,
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      ...(tool.steps && tool.steps.length > 0 ? [{
        "@type": "HowTo",
        "@id": `https://cacto.cc/tools/${tool.slug}/#howto`,
        "name": `How to Use ${tool.title}`,
        "description": tool.description,
        "step": tool.steps.map((s, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "name": s.title,
          "text": s.desc
        }))
      }] : []),
      ...(tool.faqs && tool.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `https://cacto.cc/tools/${tool.slug}/#faq`,
        "mainEntity": tool.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }] : []),
      {
        "@type": "BreadcrumbList",
        "@id": `https://cacto.cc/tools/${tool.slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cacto.cc"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://cacto.cc/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.title,
            "item": `https://cacto.cc/tools/${tool.slug}`
          }
        ]
      }
    ]
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ToolDetailClient toolSlug={resolvedParams.tool} initialTool={tool || null} />
    </>
  )
}

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
        "@type": ["SoftwareApplication", "WebApplication"],
        "@id": `https://cacto.cc/tools/${tool.slug}/#software`,
        "name": tool.title,
        "url": `https://cacto.cc/tools/${tool.slug}`,
        "image": "https://cacto.cc/icon.svg",
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5, JavaScript. Compatible with all modern web browsers.",
        "softwareVersion": "1.0",
        "author": {
          "@type": "Organization",
          "name": "Cacto",
          "url": "https://cacto.cc",
          "logo": "https://cacto.cc/icon.svg"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Cacto",
          "url": "https://cacto.cc"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "128",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": tool.benefits ? tool.benefits.join(", ") : tool.description
      },
      ...(tool.steps && tool.steps.length > 0 ? [{
        "@type": "HowTo",
        "@id": `https://cacto.cc/tools/${tool.slug}/#howto`,
        "name": `How to Use ${tool.title}`,
        "description": tool.description,
        "totalTime": "PT3M",
        "step": tool.steps.map((s, idx) => ({
          "@type": "HowToStep",
          "position": idx + 1,
          "name": s.title,
          "text": s.desc,
          "url": `https://cacto.cc/tools/${tool.slug}#step-${idx + 1}`
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

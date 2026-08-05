import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { freeToolsList, getToolSiloCategory } from '@/utils/toolsData'
import ToolDetailClient from '@/app/tools/ToolDetailClient'

interface PageProps {
  params: Promise<{
    silo: string
    slug: string
  }>
}

export async function generateStaticParams() {
  return freeToolsList.map((t) => ({
    silo: getToolSiloCategory(t),
    slug: t.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { silo, slug } = await params
  const tool = freeToolsList.find((t) => t.slug === slug)
  if (!tool) return {}

  const canonicalUrl = `https://cacto.cc/tools/${silo}/${slug}`

  return {
    title: `${tool.title} | Free ${silo.toUpperCase()} Tool | Cacto`,
    description: tool.description,
    keywords: tool.seoKeywords || [tool.title, `${silo} tool`, 'Cacto free tools'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} | Free ${silo.toUpperCase()} Tool | Cacto`,
      description: tool.description,
      url: canonicalUrl,
      siteName: 'Cacto',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | Free ${silo.toUpperCase()} Tool | Cacto`,
      description: tool.description,
    },
  }
}

export default async function SiloToolPage({ params }: PageProps) {
  const { silo, slug } = await params
  const tool = freeToolsList.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  const canonicalUrl = `https://cacto.cc/tools/${silo}/${slug}`

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': `${canonicalUrl}/#software`,
        name: tool.title,
        url: canonicalUrl,
        description: tool.description,
        applicationCategory: silo.toUpperCase(),
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        author: {
          '@type': 'Organization',
          name: 'Cacto',
          url: 'https://cacto.cc'
        }
      },
      {
        '@type': 'HowTo',
        '@id': `${canonicalUrl}/#howto`,
        name: `How to use ${tool.title}`,
        description: tool.description,
        step: tool.steps.map((s) => ({
          '@type': 'HowToStep',
          position: s.step,
          name: s.title,
          text: s.desc
        }))
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}/#faq`,
        mainEntity: tool.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://cacto.cc/tools' },
          { '@type': 'ListItem', position: 3, name: silo.toUpperCase(), item: `https://cacto.cc/tools/${silo}` },
          { '@type': 'ListItem', position: 4, name: tool.title, item: canonicalUrl }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <ToolDetailClient toolSlug={slug} initialTool={tool} />
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { freeToolsList, getToolSiloCategory } from '@/utils/toolsData'
import ToolDetailClient from '../../[tool]/ToolDetailClient'

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function generateStaticParams() {
  return freeToolsList.map((t) => ({
    category: getToolSiloCategory(t),
    slug: t.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params
  const tool = freeToolsList.find((t) => t.slug === slug)
  if (!tool) return {}

  const canonicalUrl = `https://cacto.cc/tools/${category}/${slug}`

  return {
    title: `${tool.title} | Free ${category.toUpperCase()} Tool | Cacto`,
    description: tool.description,
    keywords: tool.seoKeywords || [tool.title, `${category} tool`, 'Cacto free tools'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} | Free ${category.toUpperCase()} Tool | Cacto`,
      description: tool.description,
      url: canonicalUrl,
      siteName: 'Cacto',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | Free ${category.toUpperCase()} Tool | Cacto`,
      description: tool.description,
    },
  }
}

export default async function SiloToolPage({ params }: PageProps) {
  const { category, slug } = await params
  const tool = freeToolsList.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  const canonicalUrl = `https://cacto.cc/tools/${category}/${slug}`

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    '@id': `${canonicalUrl}/#software`,
    name: tool.title,
    url: canonicalUrl,
    description: tool.description,
    applicationCategory: category.toUpperCase(),
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
  }

  const howToSchema = {
    '@context': 'https://schema.org',
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
  }

  const faqSchema = {
    '@context': 'https://schema.org',
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
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://cacto.cc/tools' },
      { '@type': 'ListItem', position: 3, name: category.toUpperCase(), item: `https://cacto.cc/tools/${category}` },
      { '@type': 'ListItem', position: 4, name: tool.title, item: canonicalUrl }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ToolDetailClient toolSlug={slug} initialTool={tool} />
    </>
  )
}

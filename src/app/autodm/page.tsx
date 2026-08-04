import type { Metadata } from 'next'
import AutoDmClient from './AutoDmClient'

export const metadata: Metadata = {
  title: 'Automation Builder | Cacto - Instagram Comment-to-DM',
  description: 'Create automated Instagram Reel comment-to-DM triggers, public reply rotators, and instant link dispatch payloads.',
  alternates: {
    canonical: 'https://cacto.cc/autodm',
  },
}

export default function AutoDmPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': 'https://cacto.cc/autodm/#software',
        name: 'Cacto AutoDM Campaign Builder',
        url: 'https://cacto.cc/autodm',
        description: 'Create automated Instagram Reel comment-to-DM triggers, public reply rotators, and instant link dispatch payloads.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        author: { '@type': 'Organization', name: 'Cacto', url: 'https://cacto.cc' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/autodm/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'AutoDM Builder', item: 'https://cacto.cc/autodm' }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutoDmClient />
    </>
  )
}

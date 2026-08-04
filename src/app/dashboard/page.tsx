import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard | Cacto - Instagram DM Automation',
  description: 'Manage your connected Instagram Business account, monitor comment-to-DM triggers, and track real-time sales conversions.',
  alternates: {
    canonical: 'https://cacto.cc/dashboard',
  },
}

export default function DashboardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': 'https://cacto.cc/dashboard/#software',
        name: 'Cacto Creator Dashboard',
        url: 'https://cacto.cc/dashboard',
        description: 'Manage your connected Instagram Business account, monitor comment-to-DM triggers, and track real-time sales conversions.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        author: { '@type': 'Organization', name: 'Cacto', url: 'https://cacto.cc' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/dashboard/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Dashboard', item: 'https://cacto.cc/dashboard' }
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
      <DashboardClient />
    </>
  )
}

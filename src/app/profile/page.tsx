import type { Metadata } from 'next'
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
  title: 'Account Settings & Integrations | Cacto',
  description: 'Manage connected Meta Graph API credentials, webhook endpoints, and email provider integrations.',
  alternates: {
    canonical: 'https://cacto.cc/profile',
  },
}

export default function ProfilePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': 'https://cacto.cc/profile/#software',
        name: 'Cacto Profile & Settings',
        url: 'https://cacto.cc/profile',
        description: 'Manage connected Meta Graph API credentials, webhook endpoints, and email provider integrations.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        author: { '@type': 'Organization', name: 'Cacto', url: 'https://cacto.cc' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/profile/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Profile', item: 'https://cacto.cc/profile' }
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
      <ProfileClient />
    </>
  )
}

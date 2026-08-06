import type { Metadata } from 'next'
import OnboardingClient from './OnboardingClient'

export const metadata: Metadata = {
  title: 'Connect Instagram Account | Cacto Onboarding',
  description: 'Connect your Instagram Business or Creator account to start automating comment-to-DM link dispatches.',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: 'https://cacto.cc/onboarding',
  },
}

export default function OnboardingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['SoftwareApplication', 'WebApplication'],
        '@id': 'https://cacto.cc/onboarding/#software',
        name: 'Cacto Instagram Connection Portal',
        url: 'https://cacto.cc/onboarding',
        description: 'Connect your Instagram Business or Creator account to start automating comment-to-DM link dispatches.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        author: { '@type': 'Organization', name: 'Cacto', url: 'https://cacto.cc' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/onboarding/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Onboarding', item: 'https://cacto.cc/onboarding' }
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
      <OnboardingClient />
    </>
  )
}

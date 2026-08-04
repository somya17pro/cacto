import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In | Cacto Instagram DM Automation',
  description: 'Sign in to Cacto to build Instagram Reel & post comment-to-DM triggers, manage automations, and double your conversion rates.',
  alternates: {
    canonical: 'https://cacto.cc/login',
  },
}

export default function LoginPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://cacto.cc/login/#webpage',
        name: 'Sign In | Cacto Instagram DM Automation',
        url: 'https://cacto.cc/login',
        description: 'Sign in to Cacto to build Instagram Reel & post comment-to-DM triggers, manage automations, and double your conversion rates.'
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://cacto.cc/login/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cacto.cc' },
          { '@type': 'ListItem', position: 2, name: 'Sign In', item: 'https://cacto.cc/login' }
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
      <LoginClient />
    </>
  )
}

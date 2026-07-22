import type { Metadata } from 'next'
import InstagramMockAuthClient from './InstagramMockAuthClient'

export const metadata: Metadata = {
  title: 'Meta Instagram Connect Sandbox | Cacto',
  description: 'Simulated Instagram Meta API OAuth permission consent portal for developer testing and campaign previews.',
  keywords: ['Instagram OAuth mock', 'Meta connect sandbox', 'Cacto testing portal'],
  alternates: {
    canonical: 'https://cacto.cc/auth/instagram-mock',
  },
  openGraph: {
    title: 'Meta Instagram Connect Sandbox | Cacto',
    description: 'Simulated Instagram Meta API OAuth permission consent portal for developer testing and campaign previews.',
    url: 'https://cacto.cc/auth/instagram-mock',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meta Instagram Connect Sandbox | Cacto',
    description: 'Simulated Instagram Meta API OAuth permission consent portal for developer testing and campaign previews.',
  },
}

export default function InstagramMockAuthPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Meta Instagram Connect Sandbox',
    url: 'https://cacto.cc/auth/instagram-mock',
    description: 'Simulated Instagram Meta API OAuth permission consent portal for developer testing and campaign previews.'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <InstagramMockAuthClient />
    </>
  )
}

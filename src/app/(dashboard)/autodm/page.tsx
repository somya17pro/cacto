import type { Metadata } from 'next'
import AutoDMClient from './AutoDMClient'

export const metadata: Metadata = {
  title: 'Auto-DM Campaign Builder | Cacto',
  description: 'Build and manage automated comment-to-DM triggers, keyword responses, lead capture sequences, and instant product link delivery for Instagram.',
  keywords: ['Auto-DM builder', 'Instagram comment automation', 'DM campaign builder', 'keyword triggers', 'Cacto AutoDM'],
  alternates: {
    canonical: 'https://cacto.cc/autodm',
  },
  openGraph: {
    title: 'Auto-DM Campaign Builder | Cacto',
    description: 'Build and manage automated comment-to-DM triggers, keyword responses, lead capture sequences, and instant product link delivery for Instagram.',
    url: 'https://cacto.cc/autodm',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-DM Campaign Builder | Cacto',
    description: 'Build and manage automated comment-to-DM triggers, keyword responses, lead capture sequences, and instant product link delivery for Instagram.',
  },
}

export default function AutoDMPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cacto Auto-DM Campaign Builder',
    operatingSystem: 'Web',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: 'Automated Instagram comment-to-DM trigger builder and link delivery tool for creators.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I configure my first keyword trigger in AutoDM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select your target Instagram Reel or Post, enter your trigger keyword (such as "LINK" or "GUIDE"), define automated public comment replies, and specify your DM copy and button redirect URL.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I target specific Instagram Reels or Posts individually?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Cacto allows you to pick specific Reels, Carousel posts, or Stories from your feed, or paste native Instagram post URLs directly.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does rotated comment reply variation protect my account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacto rotates up to 3 distinct comment reply variations randomly when replying to followers, staying strictly compliant with Meta anti-spam regulations.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of direct message call-to-action buttons can I send?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can send text-only DMs or Text + Button messages containing custom button copy linking directly to Stripe checkouts, Calendly bookings, or digital product downloads.'
        }
      },
      {
        '@type': 'Question',
        name: 'How are AutoDM trigger runs and link clicks tracked?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every campaign card displays total trigger execution counts and unique button clicks in real-time, giving you clear visibility into lead conversion rates.'
        }
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AutoDMClient />
    </>
  )
}

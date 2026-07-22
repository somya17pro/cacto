import type { Metadata } from 'next'
import OnboardingClient from './OnboardingClient'

export const metadata: Metadata = {
  title: 'Creator Setup & Onboarding | Cacto',
  description: 'Set up your niche, target goals, Instagram connection, and launch your first automated DM campaign with Cacto.',
  keywords: ['Cacto onboarding', 'Instagram setup', 'creator onboarding', 'AutoDM setup'],
  alternates: {
    canonical: 'https://cacto.cc/onboarding',
  },
  openGraph: {
    title: 'Creator Setup & Onboarding | Cacto',
    description: 'Set up your niche, target goals, Instagram connection, and launch your first automated DM campaign with Cacto.',
    url: 'https://cacto.cc/onboarding',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Setup & Onboarding | Cacto',
    description: 'Set up your niche, target goals, Instagram connection, and launch your first automated DM campaign with Cacto.',
  },
}

export default function OnboardingPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Creator Onboarding',
    url: 'https://cacto.cc/onboarding',
    description: 'Interactive onboarding wizard for setting up Cacto Instagram automation.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What steps are required during Cacto creator onboarding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Onboarding consists of 4 quick steps: selecting your creator niche & social handles, setting your growth or sales targets, choosing your pricing tier, and authorizing your Instagram Business profile.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I connect my Instagram profile to Cacto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'During step 4 of onboarding, click Connect Instagram to launch Meta\'s official OAuth consent flow and grant permissions for comment read/reply and DM messaging.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is a Zernio Page ID and why is it needed for webhooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zernio Page IDs represent your connected social channel routing key, enabling Cacto webhooks to trigger instant automated responses without technical API key management.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I test my AutoDM setup before launching publicly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can run test comment triggers on any selected Reel or Post within your dashboard before publishing campaigns live to followers.'
        }
      },
      {
        '@type': 'Question',
        name: 'What discount launch rates are locked in during onboarding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Early beta creators lock in a 50% lifetime launch discount on Cacto Pro (€19/month) with zero transaction fees and unlimited DM contacts.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <OnboardingClient />
    </>
  )
}

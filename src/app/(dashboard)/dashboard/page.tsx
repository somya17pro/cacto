import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Creator Dashboard | Cacto',
  description: 'Overview of your connected social accounts, active comment-to-DM automations, link clicks, and conversion analytics.',
  keywords: ['Cacto dashboard', 'creator analytics', 'Instagram DM metrics', 'conversion tracking'],
  alternates: {
    canonical: 'https://cacto.cc/dashboard',
  },
  openGraph: {
    title: 'Creator Dashboard | Cacto',
    description: 'Overview of your connected social accounts, active comment-to-DM automations, link clicks, and conversion analytics.',
    url: 'https://cacto.cc/dashboard',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Dashboard | Cacto',
    description: 'Overview of your connected social accounts, active comment-to-DM automations, link clicks, and conversion analytics.',
  },
}

export default function DashboardPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Creator Dashboard',
    url: 'https://cacto.cc/dashboard',
    description: 'Analytics and social channel management overview for Cacto creators.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How are daily DM triggers and link clicks calculated on the dashboard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The dashboard aggregates real-time webhook events from Meta API and Zernio, recording every successful comment-to-DM trigger and button click to calculate daily CTR percentage metrics.'
        }
      },
      {
        '@type': 'Question',
        name: 'What social channels appear in my connected accounts overview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Connected accounts show active Instagram Business and Creator profiles, with real-time profile pictures, follower counts, and OAuth token health status.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I upgrade to Cacto Pro to unlock conversion analytics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click the Upgrade to Pro banner on your dashboard or navigate to Profile settings to upgrade to Cacto Pro (€19/mo) for daily analytics, email lead captures, and unlimited campaigns.'
        }
      },
      {
        '@type': 'Question',
        name: 'What quick actions can I take directly from the dashboard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From your dashboard, you can launch new AutoDM keyword triggers, inspect individual campaign performance, view connected account stats, and preview DM templates.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Cacto protect real-time webhook event synchronization?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacto uses encrypted webhooks with signature verification, ensuring every comment trigger is validated and processed within seconds without data loss.'
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
      <DashboardClient />
    </>
  )
}

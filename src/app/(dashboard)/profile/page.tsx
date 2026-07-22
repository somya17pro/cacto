import type { Metadata } from 'next'
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
  title: 'Profile & Account Settings | Cacto',
  description: 'Manage your user account credentials, subscription plan tier, and Meta Instagram API integration status on Cacto.',
  keywords: ['Cacto profile', 'account settings', 'Cacto subscription', 'integration status'],
  alternates: {
    canonical: 'https://cacto.cc/profile',
  },
  openGraph: {
    title: 'Profile & Account Settings | Cacto',
    description: 'Manage your user account credentials, subscription plan tier, and Meta Instagram API integration status on Cacto.',
    url: 'https://cacto.cc/profile',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile & Account Settings | Cacto',
    description: 'Manage your user account credentials, subscription plan tier, and Meta Instagram API integration status on Cacto.',
  },
}

export default function ProfilePage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Profile Settings',
    url: 'https://cacto.cc/profile',
    description: 'User profile settings and subscription details for Cacto.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I view or upgrade my current Cacto subscription tier?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your current subscription plan status is displayed on your profile settings page. Click Upgrade to Cacto Pro (€19/mo) to unlock unlimited campaigns and 0% fee checkouts.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can I verify my official Meta Instagram Graph API integration status?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Integration Status badge on your profile confirms your OAuth token connection health with Meta Graph API endpoints.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I change my connected Instagram account or update OAuth tokens?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can re-authorize Meta permissions or switch your primary Instagram Business account anytime through the profile integration settings.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I export my campaign data or delete account information?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can request full CSV exports of lead logs and campaign metrics, or delete account data by contacting support or initiating sign-out.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I securely sign out of my active Cacto session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click the Sign Out of Session button inside the Danger Zone block on your profile settings page to clear session tokens securely.'
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
      <ProfileClient />
    </>
  )
}

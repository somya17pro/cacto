import type { Metadata } from 'next'
import LandingPageClient from './LandingPageClient'

export const metadata: Metadata = {
  title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
  description: 'Cacto detects keyword comments on your Reels, Posts, and Stories to deliver direct checkout links, digital downloads, and lead capture messages in under 30 seconds.',
  keywords: ['Instagram DM automation', 'comment to DM', 'Instagram sales funnel', 'Stripe checkout Instagram', 'lead magnet automation', 'Instagram marketing tools', 'ManyChat alternative'],
  alternates: {
    canonical: 'https://cacto.cc',
  },
  openGraph: {
    title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
    description: 'Cacto detects keyword comments on your Reels, Posts, and Stories to deliver direct checkout links, digital downloads, and lead capture messages in under 30 seconds.',
    url: 'https://cacto.cc',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cacto | Turn Instagram Comments into Automatic Sales & Auto-DMs',
    description: 'Cacto detects keyword comments on your Reels, Posts, and Stories to deliver direct checkout links, digital downloads, and lead capture messages in under 30 seconds.',
  },
}

export default function HomePage() {
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://cacto.cc/#website',
        name: 'Cacto',
        url: 'https://cacto.cc',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://cacto.cc/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://cacto.cc/#organization',
        name: 'Cacto',
        url: 'https://cacto.cc',
        logo: 'https://cacto.cc/favicon.ico',
        description: 'Instagram comment-to-DM automation, direct checkout links, and lead email capture for creators.',
        sameAs: [
          'https://instagram.com/cacto',
          'https://twitter.com/cacto'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://cacto.cc/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Cacto compliant with Meta and Instagram platform rules?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Cacto is 100% compliant with Meta platform guidelines. We use official Meta Graph API endpoints with secure OAuth 2.0 token authorization, ensuring your Instagram account is never flagged or shadowbanned.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Cacto compare as a ManyChat alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Unlike complex flow-builder tools like ManyChat, Cacto is streamlined specifically for Instagram creators with zero complex flowchart building, 5-minute setup, and native Meta API security.'
            }
          },
          {
            '@type': 'Question',
            name: 'How fast are DM responses sent when a follower comments?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto triggers instant comment-to-DM responses within 5 to 30 seconds of a user leaving a matching keyword comment on your Instagram Reel, Post, or Story, keeping engagement high while followers are actively online.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I connect direct payment links and store URLs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can attach direct DM checkout links for Stripe, Stan Store, Shopify, Gumroad, Calendly, or custom lead magnets directly inside Instagram DMs.'
            }
          },
          {
            '@type': 'Question',
            name: 'What platforms and stores can I connect to Cacto DMs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto allows you to send direct checkout links to Stripe, Stan Store, Shopify, Gumroad, Calendly, or custom web links directly inside Instagram DMs.'
            }
          },
          {
            '@type': 'Question',
            name: 'Will automated DMs get my Instagram account flagged or banned?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Cacto includes a Meta Anti-Spam Reply Rotator that rotates between 3 comment reply variations and incorporates natural delay timing to stay fully within Meta API rate limits.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does instant lead capture work inside Instagram DMs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto can prompt followers to provide their email address right inside the Instagram DM conversation before delivering digital downloads, instantly syncing leads into your email marketing platform.'
            }
          },
          {
            '@type': 'Question',
            name: 'Will my followers know they are receiving automated DMs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto dispatches clean, personalized direct messages with actionable checkout buttons or instant guide links. It operates as a fast, helpful delivery assistant that feels natural to your audience.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does it take to set up Cacto for Instagram?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Setup takes under 5 minutes: connect your Instagram account, select your Reel, Post, or Story, set your trigger keyword, configure your 3 rotated comment replies, and add your store link.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I join the early access waitlist?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Join our early access waitlist today to get priority onboarding and instant notification as soon as new creator spots open up.'
            }
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <LandingPageClient />
    </>
  )
}

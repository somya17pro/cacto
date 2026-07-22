import type { Metadata } from 'next'
import ToolsListingClient from './ToolsListingClient'

export const metadata: Metadata = {
  title: 'Cacto Free Growth Tools Suite for Creators | 25 Free Marketing Utilities',
  description: '25 free interactive calculators, generators, script outline builders, reel downloaders, carousel generators, and DM copy previewers for Instagram creators.',
  keywords: ['free Instagram tools', 'creator calculators', 'DM copy previewer', 'Reel video downloader', 'carousel generator', 'engagement rate calculator', 'Cacto growth suite'],
  alternates: {
    canonical: 'https://cacto.cc/tools',
  },
  openGraph: {
    title: 'Cacto Free Growth Tools Suite for Creators | 25 Free Marketing Utilities',
    description: '25 free interactive calculators, generators, script outline builders, reel downloaders, carousel generators, and DM copy previewers for Instagram creators.',
    url: 'https://cacto.cc/tools',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cacto Free Growth Tools Suite for Creators | 25 Free Marketing Utilities',
    description: '25 free interactive calculators, generators, script outline builders, reel downloaders, carousel generators, and DM copy previewers for Instagram creators.',
  },
}

export default function ToolsPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Free Growth Tools Suite for Creators',
    url: 'https://cacto.cc/tools',
    description: '25 free interactive calculators, generators, script outline builders, reel downloaders, carousel generators, and DM copy previewers for Instagram creators.'
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cacto.cc'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://cacto.cc/tools'
      }
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are Cacto free growth tools completely free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All 25 growth utilities, calculators, caption generators, script outline builders, and DM copy previewers are 100% free with zero sign-up required.'
        }
      },
      {
        '@type': 'Question',
        name: 'How are Instagram engagement rate benchmarks calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Engagement rates are calculated using standard industry formulas: total engagements (likes, comments, shares, saves) divided by follower count or impressions, benchmarked against real creator niche data.'
        }
      },
      {
        '@type': 'Question',
        name: 'What character count limits apply to Instagram captions and DMs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Instagram captions allow up to 2,200 characters and 30 hashtags. Direct messages allow up to 1,000 characters per message, and Cacto\'s DM previewer validates character bounds in real-time.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Cacto collect private account data when I use free tools?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Cacto free tools process calculations client-side inside your browser. No private passwords, access tokens, or personal profile data are collected or stored.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I turn free tool calculations into automated Cacto DM campaigns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Once you estimate your conversion lift with our CTR calculator or test DM copy using the previewer, copy your top keyword trigger into your Cacto dashboard to launch a live DM campaign in 5 minutes.'
        }
      },
      {
        '@type': 'Question',
        name: 'How frequently are Cacto growth tools updated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our utilities are continuously updated to align with Meta Graph API specifications, current Instagram algorithm ranking factors, and updated creator monetization benchmarks.'
        }
      },
      {
        '@type': 'Question',
        name: 'What types of free tools are included in the Cacto suite?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The suite includes engagement rate calculators, DM conversion CTR projectors, Reels script outline planners, caption generators, hashtag analyzers, carousel layout aids, and inbox copy previewers.'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ToolsListingClient />
    </>
  )
}


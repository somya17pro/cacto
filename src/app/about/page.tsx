import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Cacto - Why We Built Cacto',
  description: 'Cacto was founded in 2026 to solve a simple problem: traditional chat marketing tools are too complex, expensive, and bloated for independent creators.',
  keywords: ['About Cacto', 'Instagram automation mission', 'creator economy tools', 'Somya Nayak', 'flat rate DM automation', 'Instagram DM automation'],
  alternates: {
    canonical: 'https://cacto.cc/about',
  },
  openGraph: {
    title: 'About Cacto - Why We Built Cacto',
    description: 'Cacto was founded in 2026 to solve a simple problem: traditional chat marketing tools are too complex, expensive, and bloated for independent creators.',
    url: 'https://cacto.cc/about',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cacto - Why We Built Cacto',
    description: 'Cacto was founded in 2026 to solve a simple problem: traditional chat marketing tools are too complex, expensive, and bloated for independent creators.',
  },
}

export default function AboutPage() {
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://cacto.cc/about/#webpage',
        name: 'About Cacto',
        url: 'https://cacto.cc/about',
        description: 'Cacto was founded in 2026 to solve a simple problem: traditional chat marketing tools are too complex, expensive, and bloated for independent creators.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://cacto.cc/#website',
          url: 'https://cacto.cc',
          name: 'Cacto'
        },
        mainEntity: {
          '@id': 'https://cacto.cc/#organization'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://cacto.cc/#organization',
        name: 'Cacto',
        url: 'https://cacto.cc',
        logo: 'https://cacto.cc/favicon.ico',
        description: 'Instagram comment-to-DM automation, lead magnet delivery, and direct Stripe checkout links for independent creators.',
        founder: {
          '@id': 'https://cacto.cc/about/#person'
        },
        sameAs: [
          'https://instagram.com/cacto',
          'https://twitter.com/cacto'
        ]
      },
      {
        '@type': 'Person',
        '@id': 'https://cacto.cc/about/#person',
        name: 'Somya Nayak',
        jobTitle: 'Founder & Developer',
        description: 'Founder & Full-Stack Developer of Cacto, building flat-rate Instagram comment-to-DM automation tools for independent creators.',
        worksFor: {
          '@id': 'https://cacto.cc/#organization'
        },
        url: 'https://cacto.cc/about',
        knowsAbout: ['Instagram DM Automation', 'Meta Graph API', 'Creator Economy', 'Software Engineering']
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://cacto.cc/about/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Cacto and why was it founded?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto is an official Meta Graph API-compliant Instagram DM automation platform built specifically for solo creators and digital entrepreneurs. Founded in 2026 by developer Somya Nayak, Cacto was created to eliminate bloated software costs and bring flat-rate DM automation to independent builders.'
            }
          },
          {
            '@type': 'Question',
            name: 'Who is the founder of Cacto?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto was built by Somya Nayak, a full-stack developer passionate about creating frictionless monetization tools for the creator economy.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why does Cacto offer flat-rate pricing over subscriber-tier pricing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enterprise chat tools like ManyChat tax creators by raising prices as subscriber lists grow. Cacto charges a single flat rate of €19/month for unlimited contacts and DMs, ensuring creators keep 100% of their scaling upside.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Cacto secure and Meta API-compliant?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Cacto operates strictly within official Meta Graph API developer standards using OAuth 2.0 authorization tokens, end-to-end encryption, and compliant webhook event handlers to ensure maximum account safety.'
            }
          },
          {
            '@type': 'Question',
            name: 'Who is Cacto designed for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto is designed for digital creators, course educators, solopreneurs, e-commerce brands, and coaches who want to convert Instagram Reel comments into instant digital product sales and lead captures.'
            }
          },
          {
            '@type': 'Question',
            name: "What is Cacto's system reliability and uptime commitment?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cacto is engineered on high-performance cloud infrastructure with automated fallback webhooks, delivering sub-30 second response times and 99.9% platform availability.'
            }
          },
          {
            '@type': 'Question',
            name: "What platforms are on Cacto's product expansion roadmap?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In addition to core Instagram comment-to-DM triggers, Cacto is expanding native automation workflows to TikTok, Threads, and WhatsApp.'
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
      <AboutClient />
    </>
  )
}

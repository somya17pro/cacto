import type { Metadata } from 'next'
import BlogListingClient from './BlogListingClient'

export const metadata: Metadata = {
  title: 'Cacto Creator Marketing Blog - Instagram Growth & Automation Guides',
  description: 'Tips, guides, and growth hacks on comment-to-DM triggers, monetization funnel pipelines, and Instagram marketing automation.',
  keywords: ['Instagram growth blog', 'creator marketing guides', 'comment trigger strategies', 'social sales funnels', 'Instagram automation tips'],
  alternates: {
    canonical: 'https://cacto.cc/blog',
  },
  openGraph: {
    title: 'Cacto Creator Marketing Blog - Instagram Growth & Automation Guides',
    description: 'Tips, guides, and growth hacks on comment-to-DM triggers, monetization funnel pipelines, and Instagram marketing automation.',
    url: 'https://cacto.cc/blog',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cacto Creator Marketing Blog - Instagram Growth & Automation Guides',
    description: 'Tips, guides, and growth hacks on comment-to-DM triggers, monetization funnel pipelines, and Instagram marketing automation.',
  },
}

export default function BlogPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Creator Marketing Blog',
    url: 'https://cacto.cc/blog',
    description: 'Tips, guides, and growth hacks on comment-to-DM triggers, monetization funnel pipelines, and Instagram marketing automation.'
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
        name: 'Blog',
        item: 'https://cacto.cc/blog'
      }
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do comment-to-DM triggers increase Instagram conversion rates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Asking followers to comment a specific keyword on a Reel or Post captures intent while their attention is highest. Delivering the link directly to their Instagram inbox removes link-in-bio friction, increasing click-through rates by up to 300%.'
        }
      },
      {
        '@type': 'Question',
        name: 'What comment auto-reply tactics drive the highest Reel engagement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use short, memorable single-word keywords (e.g. "GUIDE", "PLAN", "SCALE") prominently displayed in video overlay text and captions. Paired with automated comment replies, this creates strong engagement loops that boost algorithmic distribution.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why are direct DM links superior to traditional link-in-bio pages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Link-in-bio pages force users to leave their current post feed, navigate to your profile, tap a bio link, and search through multiple links. Direct DMs deliver single-purpose checkout or lead links straight into their private inbox in under 30 seconds.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does auto-DM engagement impact the Instagram Reel algorithm?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! High comment volume within the first hour of posting signals strong audience interest to Meta\'s recommendation algorithm, increasing Reel placement on the Explore page and Reels feed.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the best practices for automated lead magnet delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keep your initial DM message concise, include a prominent call-to-action button, and pair the lead magnet PDF or link with a follow-up offer or Stripe checkout link to monetize immediate interest.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Cacto maintain Meta anti-spam compliance in blog tactics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacto automatically rotates multiple variations of public comment replies (e.g., "Sent you a DM!", "Check your inbox 🙌") and applies natural delay buffers so your account complies with Meta Graph API rate limits.'
        }
      },
      {
        '@type': 'Question',
        name: 'How are Cacto guides optimized for AEO and AI Overviews?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacto blog posts feature bold 40-60 word direct quick-answer summary blocks and question-based H2 headings, making them easy for AI engines like Gemini, ChatGPT, Claude, and Perplexity to crawl and quote.'
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
      <BlogListingClient />
    </>
  )
}

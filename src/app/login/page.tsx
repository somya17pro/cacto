import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In & Waitlist Access | Cacto',
  description: 'Log in to your Cacto account or join the private beta waitlist for Instagram comment automation and DM checkout tools.',
  keywords: ['Cacto login', 'Cacto sign in', 'Instagram automation login', 'Cacto waitlist'],
  alternates: {
    canonical: 'https://cacto.cc/login',
  },
  openGraph: {
    title: 'Sign In & Waitlist Access | Cacto',
    description: 'Log in to your Cacto account or join the private beta waitlist for Instagram comment automation and DM checkout tools.',
    url: 'https://cacto.cc/login',
    siteName: 'Cacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In & Waitlist Access | Cacto',
    description: 'Log in to your Cacto account or join the private beta waitlist for Instagram comment automation and DM checkout tools.',
  },
}

export default function LoginPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cacto Login & Waitlist',
    url: 'https://cacto.cc/login',
    description: 'Sign in to Cacto or apply for early waitlist access.'
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I request private beta waitlist access for Cacto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your email address on the sign-in card to join the waitlist. Priority invitations are sent on a rolling basis as server capacity expands.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is developer bypass mode used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Developer bypass mode allows creators and testers to preview and evaluate the Cacto automation dashboard immediately without waiting for OAuth approval.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does passwordless and OAuth authentication work on Cacto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacto uses passwordless email magic links and official Meta OAuth 2.0 logins for fast, secure authentication without storing passwords.'
        }
      },
      {
        '@type': 'Question',
        name: 'What should I do if my Instagram account authorization expires?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply log back into Cacto and re-authorize your Meta connection in Profile Settings to generate a fresh API access token.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who can I contact for early onboarding assistance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For priority access or questions, email founder Somya Nayak at somyanayak281@gmail.com for direct technical assistance.'
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
      <LoginClient />
    </>
  )
}

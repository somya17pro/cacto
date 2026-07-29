import type { Metadata } from 'next'
import OnboardingClient from './OnboardingClient'

export const metadata: Metadata = {
  title: 'Connect Instagram Account | Cacto Onboarding',
  description: 'Connect your Instagram Business or Creator account to start automating comment-to-DM link dispatches.',
  alternates: {
    canonical: 'https://cacto.cc/onboarding',
  },
}

export default function OnboardingPage() {
  return <OnboardingClient />
}

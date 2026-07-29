import type { Metadata } from 'next'
import AutoDmClient from './AutoDmClient'

export const metadata: Metadata = {
  title: 'Automation Builder | Cacto - Instagram Comment-to-DM',
  description: 'Create automated Instagram Reel comment-to-DM triggers, public reply rotators, and instant link dispatch payloads.',
  alternates: {
    canonical: 'https://cacto.cc/autodm',
  },
}

export default function AutoDmPage() {
  return <AutoDmClient />
}

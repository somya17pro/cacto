import type { Metadata } from 'next'
import ProfileClient from './ProfileClient'

export const metadata: Metadata = {
  title: 'Account Settings & Integrations | Cacto',
  description: 'Manage connected Meta Graph API credentials, webhook endpoints, and email provider integrations.',
  alternates: {
    canonical: 'https://cacto.cc/profile',
  },
}

export default function ProfilePage() {
  return <ProfileClient />
}

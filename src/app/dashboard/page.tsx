import type { Metadata } from 'next'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard | Cacto - Instagram DM Automation',
  description: 'Manage your connected Instagram Business account, monitor comment-to-DM triggers, and track real-time sales conversions.',
  alternates: {
    canonical: 'https://cacto.cc/dashboard',
  },
}

export default function DashboardPage() {
  return <DashboardClient />
}

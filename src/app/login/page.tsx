import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In | Cacto Instagram DM Automation',
  description: 'Sign in to Cacto to build Instagram Reel & post comment-to-DM triggers, manage automations, and double your conversion rates.',
}

export default function LoginPage() {
  return <LoginClient />
}

'use client'
import { useEffect } from 'react'

export default function ClientReferrerTracker() {
  useEffect(() => {
    // Only run once per session to avoid overwriting if they navigate internally
    if (!sessionStorage.getItem('ai_referrer_captured')) {
      const ref = document.referrer.toLowerCase()
      if (ref.includes('chatgpt.com') || ref.includes('openai.com')) {
        sessionStorage.setItem('cacto_attribution_source', 'ChatGPT')
      } else if (ref.includes('perplexity.ai')) {
        sessionStorage.setItem('cacto_attribution_source', 'Perplexity AI')
      } else if (ref.includes('claude.ai') || ref.includes('anthropic.com')) {
        sessionStorage.setItem('cacto_attribution_source', 'Claude')
      } else if (ref.includes('google.com')) {
        sessionStorage.setItem('cacto_attribution_source', 'Google AI / Search')
      }
      sessionStorage.setItem('ai_referrer_captured', 'true')
    }
  }, [])
  
  return null
}

import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const appRoutes = ['/dashboard', '/autodm', '/onboarding', '/profile']

  const isAppRoute = appRoutes.some(route => pathname.startsWith(route))
  
  // Explicit Dev mode testing parameter or cookie
  const isDevMode = request.nextUrl.searchParams.get('dev') === 'true' || 
                    request.cookies.get('cacto_dev_mode')?.value === 'true'

  // Check Supabase authenticated session cookies
  const hasAuthSession = request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

  // Waitlist Protection Mode:
  // Public visitors without authenticated session or dev parameter get redirected to waitlist homepage
  if (isAppRoute && !isDevMode && !hasAuthSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    url.searchParams.set('waitlist', 'true')
    return NextResponse.redirect(url)
  }

  // AI Bot Tracker
  const AI_BOT_AGENTS = [
    'GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 
    'Google-Extended', 'Bytespider', 'CCBot', 'anthropic-ai', 'cohere-ai'
  ]
  const userAgent = request.headers.get('user-agent') || ''
  const botMatch = AI_BOT_AGENTS.find(bot => userAgent.includes(bot))

  if (botMatch) {
    try {
      const url = new URL('/api/log-bot', request.url)
      // Non-blocking fetch to log the bot
      fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botName: botMatch,
          path: pathname
        }),
      }).catch(err => console.error('Failed to ping bot log API:', err))
    } catch (e) {}
  }

  return await updateSession(request)
}

export async function middleware(request: NextRequest) {
  return proxy(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)',
  ],
}

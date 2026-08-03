import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const appRoutes = ['/dashboard', '/autodm', '/onboarding', '/profile']

  const isAppRoute = appRoutes.some(route => pathname.startsWith(route))
  
  // Dev mode testing bypass or authenticated cookie check
  const isDevMode = request.nextUrl.searchParams.get('dev') === 'true' || 
                    request.cookies.get('cacto_dev_mode')?.value === 'true' ||
                    process.env.NODE_ENV === 'development'

  // Check Supabase session cookies
  const hasAuthSession = request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

  if (isAppRoute && !isDevMode && !hasAuthSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

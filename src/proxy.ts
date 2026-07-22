import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const appRoutes = ['/dashboard', '/autodm', '/onboarding', '/profile']

  // Protect the AI Analytics dashboard with Basic Auth
  if (pathname.startsWith('/ai-analytics') || pathname.startsWith('/dashboard/ai-analytics')) {
    const basicAuth = request.headers.get('authorization')
    
    // Check if the auth header exists and matches our hardcoded admin credentials (admin:admin)
    // You can change 'admin:admin' to a more secure password using btoa('username:password')
    const validAuth = `Basic ${btoa('somya:cacto2026')}`
    
    if (basicAuth !== validAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      })
    }
    
    // If authenticated, allow the request to pass through by skipping the appRoutes check
  } else if (appRoutes.some(route => pathname.startsWith(route))) {
    // If user accesses an unreleased app route, redirect to waitlist login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
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

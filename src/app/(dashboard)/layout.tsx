'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { 
  Zap, 
  LogOut, 
  MessageSquare,
  User,
  LayoutDashboard
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [instagramAccount, setInstagramAccount] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const isBypass = localStorage.getItem('cacto_bypass_auth') === 'true'
      let sessionUser = null

      if (isBypass) {
        sessionUser = { email: 'somyanayak281@gmail.com', id: 'mock-id' }
        setUser(sessionUser)
        setIsLoading(false)
      } else {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        } else {
          sessionUser = session.user
          setUser(sessionUser)
          setIsLoading(false)
        }
      }

      // Query connected account info
      if (sessionUser) {
        const targetUserId = sessionUser.id
        let dbAccount: any = null
        if (targetUserId === 'mock-id') {
          const local = localStorage.getItem('cacto_mock_instagram')
          if (local) dbAccount = JSON.parse(local)
        } else {
          const { data } = await supabase
            .from('connected_accounts')
            .select('*')
            .eq('user_id', targetUserId)
            .eq('platform', 'instagram')
            .maybeSingle()
          if (data) dbAccount = data
        }

        if (dbAccount) {
          setInstagramAccount(dbAccount)
          try {
            const res = await fetch('/api/connect/instagram/profile')
            if (res.ok) {
              const zernioProfile = await res.json()
              setInstagramAccount({
                ...dbAccount,
                username: zernioProfile.username || dbAccount.username,
                profilePicture: zernioProfile.profilePicture
              })
            }
          } catch (e) {
            console.error('Failed to sync profile pic in dashboard layout:', e)
          }
        }
      }
    }

    checkAuth()
  }, [router, supabase, pathname])

  const handleSignOut = async () => {
    localStorage.removeItem('cacto_bypass_auth')
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex justify-center items-center">
        <div className="h-10 w-10 border-4 border-zinc-200 border-t-[#16A34A] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] bg-[radial-gradient(#e4e4e7_1.5px,transparent_1.5px)] [background-size:24px_24px] text-[#1A1510] flex font-sans antialiased">
      {/* Shared Sidebar */}
      <aside className="w-64 bg-[#1A1510] border-r border-[#1A1510] flex flex-col justify-between p-6 shrink-0 text-[#FAF6EE]">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 mb-2">
            <span className="text-2xl">🌵</span>
            <span className="font-serif text-3xl font-bold italic tracking-tight text-white lowercase">
              cacto<span className="text-[#16A34A] font-sans not-italic">.</span>
            </span>
          </div>

          {/* Navigation Links pointed to /dashboard, /autodm, /profile */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition ${
                pathname === '/dashboard' ? 'bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="h-4.5 w-4.5" />
              Dashboard
            </Link>
            
            <Link
              href="/autodm"
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition ${
                pathname === '/autodm' ? 'bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="h-4.5 w-4.5" />
              AutoDM
            </Link>

            <Link
              href="/profile"
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition ${
                pathname === '/profile' ? 'bg-[#16A34A] text-white shadow-lg shadow-[#16A34A]/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="h-4.5 w-4.5" />
              Profile
            </Link>
          </nav>
        </div>

        {/* Bottom User Session Info */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="truncate pr-4">
            <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider mb-0.5">Logged In</p>
            <p className="text-sm text-zinc-300 font-bold truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2.5 rounded-xl text-zinc-450 hover:text-red-500 hover:bg-red-500/10 transition"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* Page Content Panel */}
      <main className="flex-1 p-8 overflow-y-auto flex flex-col">
        {/* Top Header Bar */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#1A1510]/10 select-none">
          <div>
            <h1 className="text-2xl font-serif font-bold italic tracking-tight text-[#1A1510]">
              {pathname === '/dashboard' ? 'Overview' : pathname === '/autodm' ? 'AutoDM Automations' : 'Profile Settings'}
            </h1>
          </div>
          {/* Connected Instagram Account Badge */}
          {instagramAccount && (
            <div className="flex items-center gap-3 bg-white border-2 border-[#1A1510] px-4 py-2 rounded-2xl shadow-[3px_3px_0_#1A1510]">
              <div className="relative">
                <img 
                  src={instagramAccount.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                  alt={instagramAccount.username} 
                  className="w-7 h-7 rounded-full border border-[#1A1510] object-cover"
                />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="text-left">
                <p className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wider leading-none">Connected Instagram</p>
                <p className="text-xs font-black text-[#1A1510] leading-normal">@{instagramAccount.username}</p>
              </div>
            </div>
          )}
        </header>
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}

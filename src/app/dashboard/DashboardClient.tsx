'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Plus, Zap, MessageSquare, ExternalLink, Trash2, Power, RefreshCw, Camera, ArrowRight, CheckCircle2 } from 'lucide-react'

interface Automation {
  id: string
  triggerKeyword: string
  dmMessageCopy: string
  isActive: boolean
  createdAt: string
  runsCount: number
  clicksCount: number
  postId?: string
  commentReplies?: string[]
  buttonText?: string
  buttonUrl?: string
}

interface ProfileData {
  username: string
  displayName: string
  profilePicture: string
  followersCount: number
  mediaCount: number
}

export default function DashboardClient() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [testSuccessMsg, setTestSuccessMsg] = useState<string | null>(null)
  const [testingKeyword, setTestingKeyword] = useState<string | null>(null)

  // Fetch automations and connected profile
  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [autoRes, profRes] = await Promise.all([
          fetch('/api/connect/instagram/mock-automations'),
          fetch('/api/connect/instagram/profile')
        ])

        if (autoRes.ok) {
          const autoData = await autoRes.json()
          setAutomations(Array.isArray(autoData) ? autoData : [])
        }

        if (profRes.ok) {
          const profData = await profRes.json()
          setProfile(profData)
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  // Toggle active status
  const toggleAutomation = async (id: string) => {
    const updated = automations.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
    setAutomations(updated)
    try {
      await fetch('/api/connect/instagram/mock-automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
    } catch (e) {
      console.error('Failed to update automation status:', e)
    }
  }

  // Delete automation
  const deleteAutomation = async (id: string) => {
    const updated = automations.filter(a => a.id !== id)
    setAutomations(updated)
    try {
      await fetch('/api/connect/instagram/mock-automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
    } catch (e) {
      console.error('Failed to delete automation:', e)
    }
  }

  // Trigger test webhook
  const triggerTestWebhook = async (keyword: string) => {
    setTestingKeyword(keyword)
    setTestSuccessMsg(null)
    try {
      const res = await fetch('/api/webhooks/zernio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zernio-event': 'comment'
        },
        body: JSON.stringify({
          type: 'comment.received',
          accountId: 'mock-id',
          postId: 'test-post-123',
          commentId: `test-comment-${Date.now()}`,
          commentText: keyword,
          commenterUsername: 'test_creator'
        })
      })

      if (res.ok) {
        setTestSuccessMsg(`Test trigger for "${keyword}" succeeded! DM dispatch simulated.`)
        // Refresh automations count
        const autoRes = await fetch('/api/connect/instagram/mock-automations')
        if (autoRes.ok) {
          const autoData = await autoRes.json()
          setAutomations(Array.isArray(autoData) ? autoData : [])
        }
      }
    } catch (err) {
      console.error('Test trigger failed:', err)
    } finally {
      setTestingKeyword(null)
    }
  }

  const totalRuns = automations.reduce((acc, a) => acc + (a.runsCount || 0), 0)
  const activeCount = automations.filter(a => a.isActive).length

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1510] font-sans antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24 space-y-10">
        
        {/* Header Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#16A34A] text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>Live Creator Sandbox v1</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#1A1510]">
              Automations Dashboard
            </h1>
            <p className="text-xs text-zinc-600 font-medium">
              Monitor active Reel comment triggers, test webhook dispatches, and manage direct message campaigns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/autodm"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-5 py-2.5 rounded-full font-extrabold text-xs shadow-md transition-all active:scale-95 decoration-none"
            >
              <Plus className="w-4 h-4" />
              <span>New Automation</span>
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-[#1A1510] hover:bg-zinc-800 text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all decoration-none"
            >
              <Camera className="w-4 h-4 text-[#16A34A]" />
              <span>Reconnect Account</span>
            </Link>
          </div>
        </div>

        {/* Test Trigger Banner Notification */}
        {testSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-[#16A34A] flex items-center justify-between gap-4 text-xs font-bold text-[#16A34A] animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{testSuccessMsg}</span>
            </div>
            <button
              onClick={() => setTestSuccessMsg(null)}
              className="text-zinc-500 hover:text-[#1A1510] text-xs font-bold bg-transparent border-none cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Connected Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Profile Card */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-4 flex flex-col justify-between" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <div className="flex items-center gap-3">
              <img
                src={profile?.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={profile?.username || 'Profile'}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#1A1510]"
              />
              <div className="space-y-0.5 overflow-hidden">
                <h3 className="font-bold text-sm text-[#1A1510] truncate">@{profile?.username || 'fake_profile'}</h3>
                <p className="text-[11px] font-semibold text-zinc-500">{profile?.displayName || 'Test Creator Account'}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-zinc-100">
              <span className="text-zinc-500">Followers:</span>
              <span className="text-[#16A34A] font-extrabold">{(profile?.followersCount || 1240).toLocaleString()}</span>
            </div>
          </div>

          {/* Metric 1 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-2 flex flex-col justify-between" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <span className="text-[11px] font-extrabold uppercase text-zinc-500 tracking-wider">Total Active Automations</span>
            <div className="text-3xl font-black text-[#1A1510]">{activeCount} / {automations.length}</div>
            <p className="text-[11px] text-zinc-500 font-semibold">Running 24/7 on Meta Webhooks</p>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-2 flex flex-col justify-between" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <span className="text-[11px] font-extrabold uppercase text-zinc-500 tracking-wider">Total DMs Delivered</span>
            <div className="text-3xl font-black text-[#16A34A]">{totalRuns}</div>
            <p className="text-[11px] text-zinc-500 font-semibold">0% Link-in-bio drop-off rate</p>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-3xl bg-white border-2 border-[#1A1510] space-y-2 flex flex-col justify-between" style={{ boxShadow: '4px 6px 0 #1A1510' }}>
            <span className="text-[11px] font-extrabold uppercase text-zinc-500 tracking-wider">Estimated DM Sales</span>
            <div className="text-3xl font-black text-[#1A1510]">${(totalRuns * 18.5).toFixed(0)}</div>
            <p className="text-[11px] text-zinc-500 font-semibold">Based on 40% lead conversion</p>
          </div>

        </div>

        {/* Automations List */}
        <div className="p-8 rounded-3xl bg-white border-2 border-[#1A1510] space-y-6" style={{ boxShadow: '6px 8px 0 #1A1510' }}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-[#1A1510]">Active Campaign Triggers</h2>
              <p className="text-xs text-zinc-500 font-medium">Keywords configured to automatically trigger DM responses when commented on your posts.</p>
            </div>
            <Link
              href="/autodm"
              className="text-xs font-extrabold text-[#16A34A] hover:underline flex items-center gap-1 decoration-none"
            >
              <span>+ Create New</span>
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs font-bold text-zinc-400">Loading active campaign triggers...</div>
          ) : automations.length === 0 ? (
            <div className="p-12 text-center space-y-4 border-2 border-dashed border-zinc-200 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-zinc-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#1A1510]">No active automations set up yet</h3>
                <p className="text-xs text-zinc-500 font-medium">Create your first comment-to-DM trigger to start delivering automated links.</p>
              </div>
              <Link
                href="/autodm"
                className="inline-flex items-center gap-2 bg-[#16A34A] text-white px-5 py-2 rounded-full font-bold text-xs decoration-none"
              >
                Create Automation Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {automations.map((a) => (
                <div
                  key={a.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    a.isActive ? 'bg-[#FAF6EE] border-[#1A1510]' : 'bg-zinc-50 border-zinc-200 opacity-70'
                  }`}
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-[#16A34A] text-white font-extrabold text-xs uppercase tracking-wide">
                        Keyword: &quot;{a.triggerKeyword}&quot;
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        a.isActive ? 'bg-emerald-100 text-[#16A34A]' : 'bg-zinc-200 text-zinc-600'
                      }`}>
                        {a.isActive ? 'ACTIVE 🟢' : 'PAUSED ⏸️'}
                      </span>
                      <span className="text-[11px] font-semibold text-zinc-500">
                        {a.runsCount || 0} DMs sent
                      </span>
                    </div>

                    <p className="text-xs text-zinc-800 font-medium line-clamp-2">
                      &quot;{a.dmMessageCopy}&quot;
                    </p>

                    {a.buttonUrl && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#16A34A]">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <a href={a.buttonUrl} target="_blank" rel="noreferrer" className="hover:underline text-[#16A34A] truncate max-w-xs">
                          {a.buttonText || 'Link Target'}: {a.buttonUrl}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-200">
                    <button
                      onClick={() => triggerTestWebhook(a.triggerKeyword)}
                      disabled={testingKeyword === a.triggerKeyword}
                      className="inline-flex items-center gap-1.5 bg-white border border-zinc-300 hover:border-[#1A1510] text-[#1A1510] px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      title="Simulate incoming comment webhook"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${testingKeyword === a.triggerKeyword ? 'animate-spin' : ''}`} />
                      <span>Test Trigger</span>
                    </button>

                    <button
                      onClick={() => toggleAutomation(a.id)}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        a.isActive ? 'bg-emerald-50 border-emerald-300 text-[#16A34A]' : 'bg-zinc-100 border-zinc-300 text-zinc-500'
                      }`}
                      title={a.isActive ? 'Pause Automation' : 'Activate Automation'}
                    >
                      <Power className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteAutomation(a.id)}
                      className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition cursor-pointer"
                      title="Delete Automation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  )
}

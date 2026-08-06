import { createClient } from '@supabase/supabase-js'

// In-Memory Storage Fallback for local sandbox execution & serverless builds
const inMemoryStore = {
  automations: [] as any[],
  dmLogs: [] as any[],
  accounts: [] as any[],
  trackedLinks: [] as any[],
  waitlist: [] as any[]
}

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  return createClient(supabaseUrl, supabaseKey)
}

export async function saveAutomationDB(automationData: any) {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase.from('automations').upsert(automationData).select()
    if (!error && data) return data[0]
  } catch (err) {
    console.warn('[DB] Supabase store warning, falling back to in-memory store:', err)
  }
  
  const existingIdx = inMemoryStore.automations.findIndex(a => a.id === automationData.id)
  if (existingIdx >= 0) {
    inMemoryStore.automations[existingIdx] = { ...inMemoryStore.automations[existingIdx], ...automationData }
    return inMemoryStore.automations[existingIdx]
  }
  
  const newRecord = { id: `auto_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, ...automationData }
  inMemoryStore.automations.push(newRecord)
  return newRecord
}

export async function getAutomationsDB(workspaceId?: string) {
  try {
    const supabase = getSupabaseAdmin()
    const query = supabase.from('automations').select('*').order('created_at', { ascending: false })
    if (workspaceId) query.eq('workspace_id', workspaceId)
    const { data, error } = await query
    if (!error && data && data.length > 0) return data
  } catch (err) {
    console.warn('[DB] Supabase get error, returning in-memory automations:', err)
  }

  return inMemoryStore.automations
}

export async function logDmDispatchDB(logData: {
  workspaceId: string
  instagramAccountId: string
  recipientId: string
  recipientUsername?: string
  commentId?: string
  commentText?: string
  dmMessageSent: string
  status: 'SENT' | 'SKIPPED' | 'FAILED' | 'QUEUED'
  reason?: string
  metaMessageId?: string
}) {
  const record = { id: `log_${Date.now()}`, ...logData, sentAt: new Date().toISOString() }
  inMemoryStore.dmLogs.push(record)

  try {
    const supabase = getSupabaseAdmin()
    await supabase.from('dm_logs').insert(record)
  } catch (err) {
    console.warn('[DB] Could not write to Supabase dm_logs, logged in memory:', err)
  }

  return record
}

export function getInMemoryStore() {
  return inMemoryStore
}

export async function saveWaitlistDB(email: string, source: string = 'Unknown') {
  const cleanEmail = email.toLowerCase().trim()
  const record = { email: cleanEmail, source, createdAt: new Date().toISOString() }

  // Check if already in memory
  if (!inMemoryStore.waitlist.some(item => item.email === cleanEmail)) {
    inMemoryStore.waitlist.push(record)
  }

  // Persist to Supabase if configured (passing email column safely)
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      const supabase = getSupabaseAdmin()
      await supabase.from('waitlist').upsert({ email: cleanEmail }, { onConflict: 'email' })
    }
  } catch (err) {
    console.warn('[DB] Supabase waitlist write warning:', err)
  }

  return record
}

export async function getWaitlistDB() {
  let supabaseWaitlist: any[] = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      const supabase = getSupabaseAdmin()
      const { data, error } = await supabase.from('waitlist').select('*').order('created_at', { ascending: false })
      if (!error && data) {
        supabaseWaitlist = data
      }
    }
  } catch (err) {
    console.warn('[DB] Supabase waitlist fetch warning:', err)
  }

  // Merge Supabase, inMemoryStore, and local disk file
  const mergedMap = new Map<string, any>()

  for (const item of inMemoryStore.waitlist) {
    if (item.email) mergedMap.set(item.email.toLowerCase(), item)
  }

  for (const item of supabaseWaitlist) {
    const email = item.email || item.email_address
    if (email) mergedMap.set(email.toLowerCase(), { email, source: item.source || 'Supabase', createdAt: item.created_at || item.createdAt })
  }

  return Array.from(mergedMap.values())
}


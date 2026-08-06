import { createClient } from '@supabase/supabase-js'

// In-Memory Storage Fallback for local sandbox execution & serverless builds
const inMemoryStore = {
  automations: [] as any[],
  dmLogs: [] as any[],
  accounts: [] as any[],
  trackedLinks: [] as any[]
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

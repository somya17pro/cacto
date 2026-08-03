import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || 'default-fallback-32-byte-key-cacto-v1!'

/**
 * Encrypts sensitive text (e.g. Meta Graph API Access Tokens) using AES-256-GCM
 */
export function encryptToken(text: string): { encryptedData: string; iv: string; authTag: string } {
  const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag
  }
}

/**
 * Decrypts AES-256-GCM encrypted tokens safely
 */
export function decryptToken(encryptedData: string, ivHex: string, authTagHex: string): string {
  const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  
  decipher.setAuthTag(authTag)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

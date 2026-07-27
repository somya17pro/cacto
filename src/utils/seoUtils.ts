/**
 * Formats metadata title tags to strictly comply with Google SERP character limits (<= 60 characters).
 * Prevents title truncation warnings in Google Search Console & SEO Audits.
 */
export function formatSeoTitle(rawTitle: string, suffix: string = ' | Cacto'): string {
  if (!rawTitle) return `Cacto | Instagram DM Automation & Growth Tools`

  let cleanTitle = rawTitle.trim()

  // Remove redundant Cacto branding if already present in title
  cleanTitle = cleanTitle.replace(/\s*\|\s*Cacto.*$/i, '').trim()

  // If title already fits with default suffix, append suffix
  if ((cleanTitle + suffix).length <= 60) {
    return cleanTitle + suffix
  }

  // If title fits with shorter branding ' | Cacto'
  const shortSuffix = ' | Cacto'
  if ((cleanTitle + shortSuffix).length <= 60) {
    return cleanTitle + shortSuffix
  }

  // If clean title alone is <= 60 chars, return clean title
  if (cleanTitle.length <= 60) {
    return cleanTitle
  }

  // Otherwise, smartly truncate at word boundary before 57 chars and add '...'
  const targetLen = 57
  let truncated = cleanTitle.substring(0, targetLen)
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > 30) {
    truncated = truncated.substring(0, lastSpace)
  }
  return `${truncated}...`
}

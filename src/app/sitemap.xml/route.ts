import { blogPosts } from '@/utils/blogData'
import { freeToolsList, getToolSiloCategory } from '@/utils/toolsData'

export async function GET() {
  const baseUrl = 'https://cacto.cc'
  const currentDate = new Date().toISOString().split('T')[0] // W3C YYYY-MM-DD format

  const urls: Array<{ url: string; priority: string; changefreq: string }> = [
    { url: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
    { url: `${baseUrl}/tools`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/blog`, priority: '0.9', changefreq: 'daily' },
    { url: `${baseUrl}/templates`, priority: '0.8', changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/compare/cacto-vs-manychat`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/open`, priority: '0.7', changefreq: 'weekly' },
    { url: `${baseUrl}/privacy`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/terms`, priority: '0.5', changefreq: 'monthly' },
    { url: `${baseUrl}/data-deletion`, priority: '0.5', changefreq: 'monthly' },
  ]

  const categories = ['converters', 'pdf', 'text', 'developer', 'seo', 'finance', 'business', 'office', 'legal', 'ai', 'ecommerce', 'social']
  categories.forEach(cat => {
    urls.push({
      url: `${baseUrl}/tools/${cat}`,
      priority: '0.9',
      changefreq: 'daily'
    })
  })

  freeToolsList.forEach(t => {
    urls.push({
      url: `${baseUrl}/tools/${t.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    })
  })

  freeToolsList.forEach(t => {
    const cat = getToolSiloCategory(t)
    urls.push({
      url: `${baseUrl}/tools/${cat}/${t.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    })
  })

  blogPosts.forEach(b => {
    urls.push({
      url: `${baseUrl}/blog/${b.slug}`,
      priority: '0.8',
      changefreq: 'weekly'
    })
  })

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`

  const xmlFooter = `\n</urlset>`

  const xmlBody = urls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')

  const fullXml = `${xmlHeader}\n${xmlBody}${xmlFooter}`

  return new Response(fullXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    }
  })
}

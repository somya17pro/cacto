import { MetadataRoute } from 'next'
import { blogPosts } from '@/utils/blogData'
import { freeToolsList } from '@/utils/toolsData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cacto.cc'
  const lastmodDate = new Date('2026-08-04')

  // Core Static Pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastmodDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: lastmodDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastmodDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: lastmodDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastmodDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/cacto-vs-manychat`,
      lastModified: lastmodDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/open`,
      lastModified: lastmodDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastmodDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastmodDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/data-deletion`,
      lastModified: lastmodDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // 100 Interactive Growth Tool Pages
  const toolRoutes: MetadataRoute.Sitemap = freeToolsList.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: lastmodDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // 100 Masterclass Blog Pages
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: lastmodDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...routes, ...toolRoutes, ...blogRoutes]
}

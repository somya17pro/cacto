import type { Metadata } from 'next'
import { blogPosts } from '@/utils/blogData'
import { formatSeoTitle } from '@/utils/seoUtils'
import BlogSlugClient from './BlogSlugClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return {
      title: 'Article Not Found | Cacto',
      description: 'The requested blog post could not be located on Cacto.',
    }
  }

  const url = `https://cacto.cc/blog/${post.slug}`
  const imageUrl = post.image ? `https://cacto.cc${post.image}` : 'https://cacto.cc/blog_growth.jpg'
  const formattedTitle = formatSeoTitle(post.title, ' | Cacto')

  return {
    title: formattedTitle,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: 'Cacto',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date || '2026-07-27',
      authors: [post.author || 'Cacto Growth Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = blogPosts.find(p => p.slug === resolvedParams.slug)

  if (!post) {
    return <BlogSlugClient slug={resolvedParams.slug} initialPost={null} />
  }

  const plainBody = post.content ? post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : (post.excerpt || '')
  const wordCount = plainBody.split(/\s+/).filter(Boolean).length

  let publishedDate = "2026-07-27T08:00:00+00:00"
  try {
    if (post.date) {
      const parsed = new Date(post.date)
      if (!isNaN(parsed.getTime())) {
        publishedDate = parsed.toISOString()
      }
    }
  } catch (e) {
    publishedDate = "2026-07-27T08:00:00+00:00"
  }

  const graphItems: any[] = [
    {
      "@type": "BlogPosting",
      "@id": `https://cacto.cc/blog/${post.slug}/#article`,
      "url": `https://cacto.cc/blog/${post.slug}`,
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image ? `https://cacto.cc${post.image}` : 'https://cacto.cc/blog_growth.jpg',
      "datePublished": publishedDate,
      "dateModified": publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author || "Cacto Team",
        "url": "https://cacto.cc/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cacto",
        "url": "https://cacto.cc",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cacto.cc/icon.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://cacto.cc/blog/${post.slug}`
      },
      "articleBody": plainBody,
      "wordCount": wordCount
    },
    {
      "@type": "BreadcrumbList",
      "@id": `https://cacto.cc/blog/${post.slug}/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://cacto.cc"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://cacto.cc/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://cacto.cc/blog/${post.slug}`
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://cacto.cc/#organization",
      "name": "Cacto",
      "url": "https://cacto.cc",
      "logo": "https://cacto.cc/blog_growth.jpg"
    }
  ]

  if (Array.isArray(post.faqs) && post.faqs.length > 0) {
    graphItems.push({
      "@type": "FAQPage",
      "@id": `https://cacto.cc/blog/${post.slug}/#faq`,
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    })
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graphItems
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogSlugClient slug={resolvedParams.slug} initialPost={post} />
    </>
  )
}

import type { Metadata } from 'next'
import { blogPosts } from '@/utils/blogData'
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
      title: 'Article Not Found | Cacto Blog',
      description: 'The requested blog post could not be located on Cacto.',
    }
  }

  const url = `https://cacto.cc/blog/${post.slug}`
  const imageUrl = `https://cacto.cc${post.image}`

  return {
    title: `${post.title} | Cacto Masterclass`,
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
      publishedTime: post.date,
      authors: [post.author],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://cacto.cc/blog/${post.slug}/#article`,
        "url": `https://cacto.cc/blog/${post.slug}`,
        "headline": post.title,
        "datePublished": post.date,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Cacto",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cacto.cc/blog_growth.jpg"
          }
        },
        "description": post.excerpt,
        "image": `https://cacto.cc${post.image}`
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
      },
      {
        "@type": "FAQPage",
        "@id": `https://cacto.cc/blog/${post.slug}/#faq`,
        "mainEntity": (post.faqs || []).map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
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

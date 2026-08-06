import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { competitorComparisons, getCompetitorBySlug } from '@/utils/competitorData';
import CompareDetailClient from '../CompareDetailClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return competitorComparisons.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const item = getCompetitorBySlug(resolvedParams.slug);

  if (!item) {
    return {
      title: 'Competitor Comparison Not Found | Cacto',
    };
  }

  const title = `${item.metaTitle} | Cacto`;
  const description = item.metaDescription;
  const canonicalUrl = `https://cacto.cc/compare/${item.slug}`;

  return {
    title,
    description,
    keywords: [
      `${item.name} alternative`,
      `Cacto vs ${item.name}`,
      'Instagram DM automation',
      'Instagram comment to DM',
      'creator growth tools',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Cacto',
      type: 'website',
      images: [
        {
          url: 'https://cacto.cc/blog_1.jpg',
          width: 1200,
          height: 630,
          alt: `${item.metaTitle} - Cacto vs ${item.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cacto.cc/blog_1.jpg'],
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const resolvedParams = await params;
  const item = getCompetitorBySlug(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: item.metaTitle,
    description: item.metaDescription,
    url: `https://cacto.cc/compare/${item.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Cacto',
      url: 'https://cacto.cc',
      logo: 'https://cacto.cc/icon.svg',
    },
    mainEntity: {
      '@type': 'Product',
      name: 'Cacto Instagram DM Automation',
      description: 'Zero-commission Instagram DM automation & bio-link platform for creators.',
      brand: {
        '@type': 'Brand',
        name: 'Cacto',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompareDetailClient competitor={item} />
    </>
  );
}

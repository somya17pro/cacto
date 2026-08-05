import { permanentRedirect, notFound } from 'next/navigation'
import { freeToolsList, getToolSiloCategory } from '@/utils/toolsData'

interface PageProps {
  params: Promise<{ tool: string }>
}

export async function generateStaticParams() {
  return freeToolsList.map((t) => ({
    tool: t.slug,
  }))
}

export default async function LegacyToolRedirectPage({ params }: PageProps) {
  const { tool: toolSlug } = await params
  const tool = freeToolsList.find((t) => t.slug === toolSlug)

  if (!tool) {
    notFound()
  }

  const category = getToolSiloCategory(tool)
  // Official Next.js HTTP 301 Permanent Redirect to Canonical Category Silo URL
  permanentRedirect(`/tools/${category}/${tool.slug}`)
}

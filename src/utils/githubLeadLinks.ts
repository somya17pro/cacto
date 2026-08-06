export interface GithubLeadChannel {
  id: number
  repo: string
  stars: string
  targetAudience: string
  intentSignal: 'Dependents (Budget & Live Products)' | 'Stargazers (Active Shoppers)' | 'Issues (High Pain & Debugging)'
  url: string
}

export const GITHUB_LEAD_CHANNELS: GithubLeadChannel[] = [
  {
    id: 1,
    repo: 'praw-dev/praw',
    stars: '4.2k',
    targetAudience: 'Teams pulling Reddit data at scale. Sell done-for-you scrapers.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/praw-dev/praw/network/dependents'
  },
  {
    id: 2,
    repo: 'JustAnotherArchivist/snscrape',
    stars: '5.4k',
    targetAudience: 'People wanting social data who hit rate-limit walls.',
    intentSignal: 'Stargazers (Active Shoppers)',
    url: 'https://github.com/JustAnotherArchivist/snscrape/stargazers'
  },
  {
    id: 3,
    repo: 'spinlud/py-linkedin-jobs-scraper',
    stars: '486',
    targetAudience: 'Founders & recruiters fighting code to extract LinkedIn jobs.',
    intentSignal: 'Stargazers (Active Shoppers)',
    url: 'https://github.com/spinlud/py-linkedin-jobs-scraper/stargazers'
  },
  {
    id: 4,
    repo: 'instaloader/instaloader',
    stars: '13k',
    targetAudience: 'Agencies & brands scraping Instagram needing clean data.',
    intentSignal: 'Stargazers (Active Shoppers)',
    url: 'https://github.com/instaloader/instaloader/stargazers'
  },
  {
    id: 5,
    repo: 'yt-dlp/yt-dlp',
    stars: '180k',
    targetAudience: 'Video creators & media agencies downloading bulk content.',
    intentSignal: 'Stargazers (Active Shoppers)',
    url: 'https://github.com/yt-dlp/yt-dlp/stargazers'
  },
  {
    id: 6,
    repo: 'gosom/google-maps-scraper',
    stars: '5.3k',
    targetAudience: 'Agencies building local B2B lead lists.',
    intentSignal: 'Stargazers (Active Shoppers)',
    url: 'https://github.com/gosom/google-maps-scraper/stargazers'
  },
  {
    id: 7,
    repo: 'scrapy/scrapy',
    stars: '63.4k',
    targetAudience: 'Companies in pain debugging broken crawlers.',
    intentSignal: 'Issues (High Pain & Debugging)',
    url: 'https://github.com/scrapy/scrapy/issues'
  },
  {
    id: 8,
    repo: 'puppeteer/puppeteer',
    stars: '95.4k',
    targetAudience: 'Engineering teams spending dev hours maintaining custom scrapers.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/puppeteer/puppeteer/network/dependents'
  },
  {
    id: 9,
    repo: 'vercel/next.js',
    stars: '141k',
    targetAudience: 'Shipped products with active dev/design budgets.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/vercel/next.js/network/dependents'
  },
  {
    id: 10,
    repo: 'shadcn-ui/ui',
    stars: '120k',
    targetAudience: 'Tech products that prioritize modern UI/UX aesthetics.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/shadcn-ui/ui/network/dependents'
  },
  {
    id: 11,
    repo: 'medusajs/medusa',
    stars: '35.4k',
    targetAudience: 'E-commerce brands with real store revenue.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/medusajs/medusa/network/dependents'
  },
  {
    id: 12,
    repo: 'stripe/stripe-node',
    stars: '4.5k',
    targetAudience: 'Active commercial apps with verified Stripe revenue.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/stripe/stripe-node/network/dependents'
  },
  {
    id: 13,
    repo: 'TryGhost/Ghost',
    stars: '54.6k',
    targetAudience: 'Creators & publishers building newsletter audiences.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/TryGhost/Ghost/network/dependents'
  },
  {
    id: 14,
    repo: 'supabase/supabase',
    stars: '107k',
    targetAudience: 'Funded early-stage software startups.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/supabase/network/dependents'
  },
  {
    id: 15,
    repo: 'n8n-io/n8n',
    stars: '198k',
    targetAudience: 'Automation-minded teams needing custom integrations.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/n8n-io/n8n/network/dependents'
  },
  {
    id: 16,
    repo: 'langchain-ai/langchain',
    stars: '143k',
    targetAudience: 'Enterprise & startup AI teams needing engineering support.',
    intentSignal: 'Dependents (Budget & Live Products)',
    url: 'https://github.com/langchain-ai/langchain/network/dependents'
  }
]

export function buildCustomNicheGithubQueries(niche: string, toolName: string, serviceName: string) {
  const cleanNiche = encodeURIComponent(niche.trim().toLowerCase().replace(/\s+/g, '-'))
  const cleanTool = encodeURIComponent(toolName.trim())
  const cleanService = encodeURIComponent(serviceName.trim())

  return {
    topicUrl: `https://github.com/topics/${cleanNiche}`,
    toolAlternativeUrl: `https://github.com/search?q="alternative+to+${cleanTool}"&type=issues`,
    serviceHiringUrl: `https://github.com/search?q="looking+for"+${cleanService}&type=issues`
  }
}

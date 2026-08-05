const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🚀 Generating 200 additional programmatic tools (Tools 311 to 510)...');

const categories = ['converters', 'pdf', 'text', 'developer', 'seo', 'finance', 'business', 'office', 'legal', 'ai', 'ecommerce', 'social'];

const extraToolsSpecs = [];

const prefixes = [
  { prefix: 'fast', adjective: 'Fast' },
  { prefix: 'pro', adjective: 'Pro' },
  { prefix: 'smart', adjective: 'Smart' },
  { prefix: 'batch', adjective: 'Batch' },
  { prefix: 'online', adjective: 'Online' },
];

const coreDomains = [
  // Converters
  { domain: 'Image Resizer', slug: 'image-resizer', cat: 'converters', icon: 'Image' },
  { domain: 'Image Cropper', slug: 'image-cropper', cat: 'converters', icon: 'Image' },
  { domain: 'PNG Compressor', slug: 'png-compressor', cat: 'converters', icon: 'Image' },
  { domain: 'JPG Compressor', slug: 'jpg-compressor', cat: 'converters', icon: 'Image' },
  { domain: 'SVG Optimizer', slug: 'svg-optimizer', cat: 'converters', icon: 'Image' },
  { domain: 'GIF to MP4', slug: 'gif-to-mp4', cat: 'converters', icon: 'Image' },
  { domain: 'MP4 to GIF', slug: 'mp4-to-gif', cat: 'converters', icon: 'Image' },
  { domain: 'WebP to PNG Pro', slug: 'webp-to-png-pro', cat: 'converters', icon: 'Image' },
  { domain: 'ICO Favicon Generator', slug: 'ico-favicon-generator', cat: 'converters', icon: 'Image' },
  { domain: 'Color Palette Extractor', slug: 'color-palette-extractor', cat: 'converters', icon: 'Sparkles' },

  // Developer
  { domain: 'JSON Validator Pro', slug: 'json-validator-pro', cat: 'developer', icon: 'Shield' },
  { domain: 'YAML Validator Pro', slug: 'yaml-validator-pro', cat: 'developer', icon: 'Shield' },
  { domain: 'XML Validator Pro', slug: 'xml-validator-pro', cat: 'developer', icon: 'Shield' },
  { domain: 'HTML Formatter Pro', slug: 'html-formatter-pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-formatter-pro', domain: 'CSS Formatter Pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'js-formatter-pro', domain: 'JS Formatter Pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'graphql-prettifier', domain: 'GraphQL Prettifier', cat: 'developer', icon: 'Sparkles' },
  { slug: 'markdown-table-generator', domain: 'Markdown Table Generator', cat: 'developer', icon: 'Sparkles' },
  { slug: 'ascii-tree-generator', domain: 'ASCII Folder Tree Generator', cat: 'developer', icon: 'Sparkles' },
  { slug: 'reg-ex-builder', domain: 'Visual Regex Builder', cat: 'developer', icon: 'Sparkles' },

  // Finance
  { slug: 'crypto-tax-calculator', domain: 'Crypto Tax Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'stock-cagr-calculator', domain: 'Stock CAGR Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'bond-yield-calculator', domain: 'Bond Yield Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'mortgage-refinance-calc', domain: 'Mortgage Refinance Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'heloc-payment-calc', domain: 'HELOC Payment Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'student-loan-payoff-calc', domain: 'Student Loan Payoff Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'lease-vs-buy-calc', domain: 'Car Lease vs Buy Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'rent-vs-buy-home-calc', domain: 'Rent vs Buy Home Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'tip-calculator-pro', domain: 'Tip & Bill Split Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'hourly-to-salary-calc', domain: 'Hourly Wage to Annual Salary Calculator', cat: 'finance', icon: 'TrendingUp' },

  // Text
  { slug: 'text-anonymizer', domain: 'Text PII Anonymizer', cat: 'text', icon: 'Shield' },
  { slug: 'word-scrambler', domain: 'Word Scrambler', cat: 'text', icon: 'Type' },
  { slug: 'slug-cleaner-pro', domain: 'Slug Cleaner Pro', cat: 'text', icon: 'Type' },
  { slug: 'paragraph-shuffler', domain: 'Paragraph Shuffler', cat: 'text', icon: 'Type' },
  { slug: 'markdown-cleaner', domain: 'Markdown Cleaner', cat: 'text', icon: 'Type' },
  { slug: 'csv-to-markdown-table', domain: 'CSV to Markdown Table', cat: 'text', icon: 'Type' },
  { slug: 'json-to-markdown-table', domain: 'JSON to Markdown Table', cat: 'text', icon: 'Type' },
  { slug: 'bbcode-to-html', domain: 'BBCode to HTML Converter', cat: 'text', icon: 'Type' },
  { slug: 'html-to-bbcode', domain: 'HTML to BBCode Converter', cat: 'text', icon: 'Type' },
  { slug: 'text-padding-generator', domain: 'Text Line Padding Generator', cat: 'text', icon: 'Type' },

  // SEO
  { slug: 'serp-ctr-calculator', domain: 'SERP CTR Lift Calculator', cat: 'seo', icon: 'Sparkles' },
  { slug: 'heading-tag-extractor', domain: 'Heading Tag (H1-H6) Extractor', cat: 'seo', icon: 'Sparkles' },
  { slug: 'meta-robots-builder', domain: 'Meta Robots Tag Builder', cat: 'seo', icon: 'Shield' },
  { slug: 'canonical-link-generator', domain: 'Canonical Link Tag Generator', cat: 'seo', icon: 'Shield' },
  { slug: 'hreflang-xml-builder', domain: 'Hreflang XML Sitemap Builder', cat: 'seo', icon: 'Sparkles' },
  { slug: 'sitemap-split-utility', domain: 'XML Sitemap Splitter Utility', cat: 'seo', icon: 'Layers' },
  { slug: 'mobile-viewport-builder', domain: 'Mobile Viewport Meta Builder', cat: 'seo', icon: 'Sparkles' },
  { slug: 'dns-txt-record-builder', domain: 'DNS TXT Verification Record Builder', cat: 'seo', icon: 'Shield' },
  { slug: 'google-search-url-builder', domain: 'Google Advanced Search Operator Builder', cat: 'seo', icon: 'Sparkles' },
  { slug: 'bing-site-auth-builder', domain: 'Bing Webmaster Verification Builder', cat: 'seo', icon: 'Shield' },

  // Business & Office
  { slug: 'billable-hours-calc', domain: 'Billable Hours & Earnings Calculator', cat: 'office', icon: 'TrendingUp' },
  { slug: 'meeting-cost-calculator', domain: 'Real-Time Meeting Cost Calculator', cat: 'office', icon: 'TrendingUp' },
  { slug: 'employee-onboarding-checklist', domain: 'Employee Onboarding Checklist Builder', cat: 'office', icon: 'Sparkles' },
  { slug: 'project-timeline-estimator', domain: 'Project Timeline & Delivery Estimator', cat: 'office', icon: 'TrendingUp' },
  { slug: 'client-proposal-generator', domain: 'Freelance Client Proposal Generator', cat: 'legal', icon: 'Sparkles' },
  { slug: 'subcontractor-agreement-builder', domain: 'Subcontractor Agreement Builder', cat: 'legal', icon: 'Shield' },
  { slug: 'consulting-invoice-generator', domain: 'Consulting PDF Invoice Generator', cat: 'legal', icon: 'Sparkles' },
  { slug: 'agency-markup-calc', domain: 'Agency Service Markup Calculator', cat: 'business', icon: 'TrendingUp' },
  { slug: 'ecommerce-profit-calc-pro', domain: 'E-Commerce Net Profit Calculator Pro', cat: 'business', icon: 'TrendingUp' },
  { slug: 'saas-churn-roi-calc', domain: 'SaaS Churn Reduction ROI Calculator', cat: 'business', icon: 'TrendingUp' },

  // AI & Social
  { slug: 'chatgpt-system-prompt-builder', domain: 'ChatGPT System Prompt Builder', cat: 'ai', icon: 'Sparkles' },
  { slug: 'claude-system-prompt-builder', domain: 'Claude System Prompt Builder', cat: 'ai', icon: 'Sparkles' },
  { slug: 'midjourney-v6-prompt-helper', domain: 'Midjourney v6 Parameter Helper', cat: 'ai', icon: 'Sparkles' },
  { slug: 'ai-copywriting-frameworks', domain: 'AIDA & PAS AI Copywriter', cat: 'ai', icon: 'Sparkles' },
  { slug: 'instagram-bio-optimizer-pro', domain: 'Instagram Bio Font & Formatting Optimizer', cat: 'social', icon: 'Sparkles' },
  { slug: 'tiktok-hook-generator-pro', domain: 'TikTok Viral Hook Generator Pro', cat: 'social', icon: 'Sparkles' },
  { slug: 'youtube-description-builder', domain: 'YouTube Video Description Builder', cat: 'social', icon: 'Sparkles' },
  { slug: 'pinterest-seo-pin-generator', domain: 'Pinterest SEO Pin Description Generator', cat: 'social', icon: 'Sparkles' },
  { slug: 'linkedin-carousel-pdf-maker', domain: 'LinkedIn PDF Carousel Generator', cat: 'social', icon: 'Sparkles' },
  { slug: 'social-media-post-scheduler-planner', domain: 'Social Media Content Calendar Planner', cat: 'social', icon: 'Sparkles' }
];

let counter = 0;
for (let p of prefixes) {
  for (let d of coreDomains) {
    if (counter >= 200) break;
    const slug = `${p.prefix}-${d.slug}`;
    const title = `${p.adjective} ${d.domain}`;
    extraToolsSpecs.push({
      slug,
      title,
      description: `${p.adjective} ${d.domain} for instant, privacy-first client-side web processing.`,
      category: d.cat === 'finance' || d.cat === 'business' || d.cat === 'office' ? 'Calculators' : d.cat === 'ai' || d.cat === 'developer' || d.cat === 'seo' ? 'Generators' : 'Utility',
      siloCategory: d.cat,
      icon: d.icon,
      faqs: [
        { q: `How does ${title} work?`, a: `${title} runs 100% inside your browser with sub-50ms speed and zero server logging.` },
        { q: `Is ${title} completely free?`, a: `Yes, ${title} is 100% free with no account required.` }
      ],
      steps: [
        { step: 1, title: 'Input Data', desc: `Enter or paste your details into ${title}.` },
        { step: 2, title: 'Process Data', desc: 'Select your preferred parameters and formatting.' },
        { step: 3, title: 'Export', desc: 'Copy output or download file.' }
      ],
      usecases: [`Professional ${d.domain} tasks`, 'Digital productivity', 'Browser-side workflows'],
      benefits: ['100% Client-Side Engine', 'Sub-50ms Processing', 'Zero Data Log', 'Free Unlimited Use'],
      deviceGuide: { mobile: 'Mobile responsive web interface.', desktop: 'Full keyboard shortcut support.' },
      comparison: { feature: 'Execution Privacy', cacto: 'Local Browser (Zero Server Log)', traditional: 'Transmitted to External Backend' }
    });
    counter++;
  }
}

const targetMarker = 'export const freeToolsList: ToolData[] = [';
const targetIndex = content.indexOf(targetMarker);

if (targetIndex !== -1) {
  const insertIndex = targetIndex + targetMarker.length;
  const newItemsString = '\n' + extraToolsSpecs.map(t => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ') + ',').join('\n');
  content = content.slice(0, insertIndex) + newItemsString + content.slice(insertIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Successfully added ${extraToolsSpecs.length} additional programmatic tools!`);
} else {
  console.error('Target marker not found in src/utils/toolsData.ts');
}

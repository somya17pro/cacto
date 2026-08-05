import fs from 'fs';
import path from 'path';
import { freeToolsList } from '../src/utils/toolsData';

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🚀 Generating 150 additional tools to reach 1,010 total tools...');

const prefixes = [
  { prefix: 'turbo', adjective: 'Turbo' },
  { prefix: 'apex', adjective: 'Apex' },
  { prefix: 'prime', adjective: 'Prime' },
];

const coreDomains = [
  { slug: 'image-optimizer-pro', domain: 'Image Optimizer Pro', cat: 'converters', icon: 'Image' },
  { slug: 'svg-path-editor', domain: 'SVG Path Editor', cat: 'converters', icon: 'Image' },
  { slug: 'color-palette-generator', domain: 'Color Palette Generator', cat: 'converters', icon: 'Sparkles' },
  { slug: 'code-beautifier-pro', domain: 'Code Beautifier Pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'regex-evaluator-pro', domain: 'Regex Evaluator Pro', cat: 'developer', icon: 'Shield' },
  { slug: 'rest-api-tester-helper', domain: 'REST API Tester Helper', cat: 'developer', icon: 'Sparkles' },
  { slug: 'mortgage-affordability-calc', domain: 'Mortgage Affordability Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'business-valuation-calc', domain: 'Business Valuation Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'dividend-reinvestment-calc', domain: 'Dividend Reinvestment (DRIP) Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'serp-meta-auditor', domain: 'SERP Meta Tag Auditor', cat: 'seo', icon: 'Sparkles' },
  { slug: 'backlink-anchor-analyzer', domain: 'Backlink Anchor Text Analyzer', cat: 'seo', icon: 'Sparkles' },
  { slug: 'keyword-grouping-tool', domain: 'Keyword Grouping & Clustering Tool', cat: 'seo', icon: 'Sparkles' },
  { slug: 'text-word-counter-pro', domain: 'Text & Word Counter Pro', cat: 'text', icon: 'Type' },
  { slug: 'html-encoder-pro', domain: 'HTML Encoder Pro', cat: 'text', icon: 'Type' },
  { slug: 'markdown-formatter-pro', domain: 'Markdown Formatter Pro', cat: 'text', icon: 'Type' },
  { slug: 'proposal-pdf-generator', domain: 'Client Proposal PDF Generator', cat: 'legal', icon: 'Sparkles' },
  { slug: 'invoice-pdf-maker-pro', domain: 'PDF Invoice Maker Pro', cat: 'legal', icon: 'Sparkles' },
  { slug: 'consulting-rate-calculator', domain: 'Consulting Hourly Rate Calculator', cat: 'business', icon: 'TrendingUp' },
  { slug: 'chatgpt-sales-prompt-gen', domain: 'ChatGPT Sales Copy Prompt Generator', cat: 'ai', icon: 'Sparkles' },
  { slug: 'midjourney-cinematic-prompt', domain: 'Midjourney Cinematic Prompt Generator', cat: 'ai', icon: 'Sparkles' },
  { slug: 'instagram-caption-writer-pro', domain: 'Instagram Caption Copywriter Pro', cat: 'social', icon: 'Sparkles' },
  { slug: 'tiktok-viral-script-builder', domain: 'TikTok Viral Script Builder', cat: 'social', icon: 'Sparkles' },
  { slug: 'youtube-title-optimizer-pro', domain: 'YouTube Title Optimizer Pro', cat: 'social', icon: 'Sparkles' },
  { slug: 'shopify-roi-booster-calc', domain: 'Shopify Store ROI Booster Calculator', cat: 'ecommerce', icon: 'TrendingUp' },
  { slug: 'amazon-fba-fee-calc-pro', domain: 'Amazon FBA Fee Calculator Pro', cat: 'ecommerce', icon: 'TrendingUp' }
];

const newTools = [];
let counter = 0;

for (let p of prefixes) {
  for (let d of coreDomains) {
    if (counter >= 150) break;
    const slug = `${p.prefix}-${d.slug}`;
    const title = `${p.adjective} ${d.domain}`;
    newTools.push({
      slug,
      title,
      description: `${p.adjective} ${d.domain} for instant, privacy-first client-side browser processing.`,
      category: d.cat === 'finance' || d.cat === 'business' || d.cat === 'office' || d.cat === 'ecommerce' ? 'Calculators' : d.cat === 'ai' || d.cat === 'developer' || d.cat === 'seo' || d.cat === 'social' ? 'Generators' : 'Utility',
      siloCategory: d.cat,
      icon: d.icon,
      faqs: [
        { q: `How does ${title} work?`, a: `${title} processes your data 100% locally inside your browser with sub-50ms speed and zero server logging.` },
        { q: `Is ${title} completely free to use?`, a: `Yes, ${title} is 100% free with unlimited usages and zero sign-up required.` }
      ],
      steps: [
        { step: 1, title: 'Input Data', desc: `Enter or paste your details into ${title}.` },
        { step: 2, title: 'Configure Parameters', desc: 'Select desired formatting options, calculation rules, or output parameters.' },
        { step: 3, title: 'Export Result', desc: 'Click Copy or Download to save your instant output.' }
      ],
      usecases: [`Automating ${d.domain} tasks`, 'Digital workflow optimization', 'Professional productivity'],
      benefits: ['100% Client-Side Engine', 'Sub-50ms Processing Speed', 'Zero Data Upload Risk', 'Free Unlimited Use'],
      deviceGuide: { mobile: 'Mobile responsive web interface.', desktop: 'Full keyboard shortcut support.' },
      comparison: { feature: 'Execution Privacy', cacto: 'Local Browser (Zero Server Log)', traditional: 'Transmitted to Remote Server' }
    });
    counter++;
  }
}

const updatedList = [...freeToolsList, ...newTools];

const headerMarker = 'export const freeToolsList: ToolData[] = [';
const headerIndex = content.indexOf(headerMarker);

if (headerIndex !== -1) {
  const fileHeader = content.slice(0, headerIndex + headerMarker.length);
  const formattedArray = '\n' + updatedList.map(t => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ') + ',').join('\n') + '\n];\n';
  
  const helperMarker = 'export function getToolSiloCategory';
  const helperIndex = content.indexOf(helperMarker);
  
  if (helperIndex !== -1) {
    const fileFooter = '\n' + content.slice(helperIndex);
    const finalContent = fileHeader + formattedArray + fileFooter;
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`✅ Successfully added ${newTools.length} new tools! Total tool count is now: ${updatedList.length}`);
  } else {
    console.error('Could not locate getToolSiloCategory function');
  }
} else {
  console.error('Could not locate freeToolsList array header');
}

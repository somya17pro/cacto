import fs from 'fs';
import path from 'path';
import { freeToolsList } from '../src/utils/toolsData';

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🚀 Generating final 75 tools to reach 1,010 total tools...');

const prefixes = [
  { prefix: 'omega', adjective: 'Omega' },
  { prefix: 'quantum', adjective: 'Quantum' },
  { prefix: 'matrix', adjective: 'Matrix' },
];

const coreDomains = [
  { slug: 'pdf-page-numberer', domain: 'PDF Page Numbering Utility', cat: 'pdf', icon: 'Layers' },
  { slug: 'pdf-page-extractor-pro', domain: 'PDF Page Extractor Pro', cat: 'pdf', icon: 'Layers' },
  { slug: 'pdf-metadata-editor', domain: 'PDF Title & Metadata Editor', cat: 'pdf', icon: 'Layers' },
  { slug: 'pdf-color-grayscale-converter', domain: 'PDF Color to Grayscale Converter', cat: 'pdf', icon: 'Layers' },
  { slug: 'pdf-image-extractor-pro', domain: 'PDF Image Extractor Pro', cat: 'pdf', icon: 'Layers' },
  { slug: 'json-path-finder', domain: 'JSON Path & Query Evaluator', cat: 'developer', icon: 'Sparkles' },
  { slug: 'regex-sub-replacer', domain: 'Regex String Substitution Replacer', cat: 'developer', icon: 'Sparkles' },
  { slug: 'html-entity-cleaner', domain: 'HTML Entity Cleaner Pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'sql-query-builder-pro', domain: 'SQL SELECT Query Builder Pro', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-shadow-palette-builder', domain: 'CSS Box Shadow Palette Builder', cat: 'developer', icon: 'Sparkles' },
  { slug: 'business-loan-amortization-calc', domain: 'Business Loan Amortization Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'equipment-lease-calc', domain: 'Equipment Lease vs Purchase Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'invoice-factoring-fee-calc', domain: 'Invoice Factoring Fee Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'payroll-tax-calc-pro', domain: 'Payroll Tax Withholding Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'stock-option-vesting-calc', domain: 'Stock Option Vesting Schedule Calculator', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'schema-faq-jsonld-maker', domain: 'Schema.org FAQPage JSON-LD Maker', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-howto-jsonld-maker', domain: 'Schema.org HowTo JSON-LD Maker', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-product-jsonld-maker', domain: 'Schema.org Product JSON-LD Maker', cat: 'seo', icon: 'Sparkles' },
  { slug: 'meta-og-image-previewer', domain: 'Open Graph Image Previewer', cat: 'seo', icon: 'Sparkles' },
  { slug: 'robots-txt-sitemap-linker', domain: 'Robots.txt Sitemap Linker Utility', cat: 'seo', icon: 'Shield' },
  { slug: 'resignation-letter-pdf-gen', domain: 'Resignation Letter PDF Generator', cat: 'office', icon: 'Sparkles' },
  { slug: 'offer-letter-pdf-builder', domain: 'Employment Offer Letter PDF Builder', cat: 'office', icon: 'Sparkles' },
  { slug: 'nda-contract-pdf-maker', domain: 'Mutual NDA Contract PDF Maker', cat: 'legal', icon: 'Shield' },
  { slug: 'chatgpt-marketing-prompt-pro', domain: 'ChatGPT Marketing Copy Prompt Pro', cat: 'ai', icon: 'Sparkles' },
  { slug: 'instagram-dm-funnel-roi-calc', domain: 'Instagram DM Funnel ROI Calculator', cat: 'social', icon: 'TrendingUp' }
];

const newTools = [];
let counter = 0;

for (let p of prefixes) {
  for (let d of coreDomains) {
    if (counter >= 75) break;
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

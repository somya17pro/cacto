const fs = require('fs');
const path = require('path');

const { freeToolsList } = require('./src/utils/toolsData.ts');

console.log('Enriching Tools 58-100 with comprehensive text content & FAQs...');

// Update Tools 58-100 in memory
const updatedTools = freeToolsList.map((t, idx) => {
  if (idx < 57) return t; // Keep tools 1-57 unchanged

  // Expand FAQs to at least 4 detailed Q&As
  const expandedFaqs = [
    ...t.faqs,
    {
      q: `How does ${t.title} ensure 100% Meta Graph API compliance?`,
      a: `${t.title} complies strictly with Meta Graph API developer standards, utilizing official OAuth token authorization, dynamic comment reply rotators, and natural millisecond delay buffers to guarantee account safety.`
    },
    {
      q: `What is the fastest way to implement ${t.title} into my Instagram growth strategy?`,
      a: `Input your parameters into the calculator above, analyze your benchmark metrics, and export the recommended trigger rules directly into Cacto's automated Instagram DM engine.`
    },
    {
      q: `Can I use ${t.title} for clients if I run a social media marketing agency?`,
      a: `Yes! ${t.title} is 100% free for agencies, creators, and brands to audit client accounts, forecast monthly ROI, and pitch high-converting DM automation services.`
    }
  ];

  // Expand steps
  const expandedSteps = [
    { step: 1, title: "Input Profile & Campaign Parameters", desc: `Enter your specific account metrics, Reel views, or target keywords into ${t.title}.` },
    { step: 2, title: "Analyze Real-Time Benchmarks", desc: "Instantly view calculated metrics, algorithmic risk ratings, and revenue projections against 2026 creator averages." },
    { step: 3, title: "Export & Automate in Cacto", desc: "Copy recommended trigger copy or connect Cacto's real-time Webhook engine for zero-friction automated lead delivery." }
  ];

  // Expand use cases & benefits
  const expandedUsecases = [
    ...t.usecases,
    "Creator Sponsorship Rate Pitching",
    "Monthly Funnel Bottleneck Auditing",
    "Agency Client Proposal Benchmarking",
    "Automated Lead Magnet Delivery"
  ];

  const expandedBenefits = [
    ...t.benefits,
    "100% Meta Graph API Safe & Approved",
    "Eliminate 70% Link-in-Bio Traffic Leakage",
    "Unlimited Contacts with Zero Monthly Penalties",
    "Instant 1-Second Inbox Lead Delivery"
  ];

  return {
    ...t,
    faqs: expandedFaqs,
    steps: expandedSteps,
    usecases: expandedUsecases,
    benefits: expandedBenefits
  };
});

const toolsDataPath = path.join(__dirname, 'src', 'utils', 'toolsData.ts');
const newFileContent = `export interface ToolData {
  slug: string
  title: string
  description: string
  category: "Calculators" | "Generators" | "Utility"
  icon: string
  faqs: Array<{ q: string; a: string }>
  steps: Array<{ step: number; title: string; desc: string }>
  usecases: string[]
  benefits: string[]
  deviceGuide: { mobile: string; desktop: string }
  comparison: { feature: string; cacto: string; traditional: string }
  seoKeywords?: string[]
}

export const freeToolsList: ToolData[] = ${JSON.stringify(updatedTools, null, 2)}
`;

fs.writeFileSync(toolsDataPath, newFileContent, 'utf8');
console.log('✅ Successfully enriched all 100 tools in toolsData.ts!');

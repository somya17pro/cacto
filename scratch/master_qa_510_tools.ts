import { freeToolsList, getToolSiloCategory } from '../src/utils/toolsData';

console.log('🔍 RUNNING MASTER QA AUDIT FOR 510 TOOLS...\n');

let passCount = 0;
let failCount = 0;
const errors: string[] = [];

// 1. Audit Tool Data Integrity
freeToolsList.forEach((tool, index) => {
  const missing: string[] = [];
  if (!tool.slug) missing.push('slug');
  if (!tool.title) missing.push('title');
  if (!tool.description) missing.push('description');
  if (!tool.category) missing.push('category');
  if (!tool.siloCategory) missing.push('siloCategory');
  if (!tool.icon) missing.push('icon');
  if (!tool.faqs || tool.faqs.length < 2) missing.push('faqs (<2)');
  if (!tool.steps || tool.steps.length < 3) missing.push('steps (<3)');
  if (!tool.usecases || tool.usecases.length < 2) missing.push('usecases (<2)');
  if (!tool.benefits || tool.benefits.length < 2) missing.push('benefits (<2)');
  if (!tool.deviceGuide || !tool.deviceGuide.mobile || !tool.deviceGuide.desktop) missing.push('deviceGuide');
  if (!tool.comparison || !tool.comparison.feature || !tool.comparison.cacto || !tool.comparison.traditional) missing.push('comparison');

  if (missing.length > 0) {
    failCount++;
    errors.push(`Tool #${index + 1} (${tool.slug || 'UNKNOWN'}): Missing ${missing.join(', ')}`);
  } else {
    passCount++;
  }
});

// 2. Audit Duplicate Slugs
const slugs = freeToolsList.map(t => t.slug);
const uniqueSlugs = new Set(slugs);
if (slugs.length !== uniqueSlugs.size) {
  errors.push(`Duplicate slugs found! Total: ${slugs.length}, Unique: ${uniqueSlugs.size}`);
}

console.log(`📊 MASTER DATA AUDIT RESULTS:`);
console.log(`✅ Passed: ${passCount} / ${freeToolsList.length}`);
console.log(`❌ Failed: ${failCount} / ${freeToolsList.length}`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS DETECTED:');
  errors.forEach(e => console.log(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n🎉 ALL 510 TOOLS PASSED DATA & SCHEMA INTEGRITY AUDIT PERFECTLY!');
}

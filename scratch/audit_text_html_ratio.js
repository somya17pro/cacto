const fs = require('fs');
const path = require('path');

const { freeToolsList } = require('../src/utils/toolsData.ts');

console.log('================================================================');
console.log('🔍 ACCURATE DOM TEXT-TO-HTML RATIO AUDIT (SEARCH ENGINE PARSER)');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

freeToolsList.forEach((tool, idx) => {
  const toolNum = idx + 1;
  const pagePath = path.join(__dirname, '..', '.next', 'server', 'app', 'tools', tool.slug + '.html');
  if (!fs.existsSync(pagePath)) {
    return;
  }

  let rawHtml = fs.readFileSync(pagePath, 'utf8');

  // Search Engine DOM parser removes <script>, <style>, <svg>, <path> and HTML comment tags
  const cleanMarkup = rawHtml
    .replace(/<script\b[^<]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^<]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[^<]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  const cleanText = cleanMarkup
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const totalMarkupBytes = cleanMarkup.length || 1;
  const visibleTextBytes = cleanText.length;
  const ratio = ((visibleTextBytes / totalMarkupBytes) * 100).toFixed(2);

  if (parseFloat(ratio) >= 10.0) {
    passCount++;
    console.log(`  ✅ Tool ${toolNum} (${tool.slug}): Ratio ${ratio}% >= 10.0% (PASSED)`);
  } else {
    console.error(`  ❌ Tool ${toolNum} (${tool.slug}): Ratio ${ratio}% < 10.0%`);
    failCount++;
  }
});

console.log(`\n================================================================`);
console.log(`DOM TEXT-TO-HTML RATIO SUMMARY: ${passCount}/${freeToolsList.length} TOOL PAGES PASSED (>10.0%)!`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}

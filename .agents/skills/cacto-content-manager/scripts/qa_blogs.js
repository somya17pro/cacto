// Automated Text Parser QA Validator for Cacto SEO/AEO blogs TS file
const fs = require('fs');
const path = require('path');

console.log('🌵 Starting text-based Cacto blogs AEO/SEO QA audit on blogData.ts...');

const filePath = 'C:/Users/Somya/Desktop/Cacto/src/utils/blogData.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Count slug matches
const slugMatches = content.match(/slug:\s*"([^"]+)"/g) || [];
const slugs = slugMatches.map(m => m.match(/"([^"]+)"/)[1]);

console.log(`📋 Total blog posts detected in TS file: ${slugs.length}/50`);

if (slugs.length !== 50) {
  console.error(`❌ FAIL: Expected 50 blogs but detected ${slugs.length}.`);
  process.exit(1);
}

// Split the file by the blog object boundaries
const postsBlocks = content.split(/slug:\s*"/g).slice(1);
let failed = false;

postsBlocks.forEach((block, index) => {
  const currentSlug = slugs[index];
  console.log(`\nDocument [${index + 1}/50]: Slug: ${currentSlug}`);

  // 1. Check title
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  if (!titleMatch) {
    console.error('❌ FAIL: Title declaration is missing.');
    failed = true;
  } else {
    console.log(`✅ Title: "${titleMatch[1]}"`);
  }

  // 2. Check preview image
  const imageMatch = block.match(/image:\s*"([^"]+)"/);
  if (!imageMatch || !imageMatch[1].endsWith('.jpg')) {
    console.error('❌ FAIL: Preview banner image .jpg path is missing or invalid.');
    failed = true;
  } else {
    console.log(`✅ Preview image: ${imageMatch[1]}`);
  }

  // 3. Check TL;DR bullet points array
  const tldrStart = block.indexOf('tldr: [');
  if (tldrStart === -1) {
    console.error('❌ FAIL: TL;DR bullets array is missing.');
    failed = true;
  } else {
    const tldrEnd = block.indexOf(']', tldrStart);
    const tldrBlock = block.substring(tldrStart, tldrEnd + 1);
    const bulletsCount = (tldrBlock.match(/"([^"]+)"/g) || []).length;
    if (bulletsCount < 3) {
      console.error(`❌ FAIL: TL;DR must contain at least 3 bullet points. Found: ${bulletsCount}`);
      failed = true;
    } else {
      console.log(`✅ TL;DR bullet count: ${bulletsCount}`);
    }
  }

  // 4. Check H2 elements and AEO Question headings
  const h2Matches = block.match(/<h2>(.*?)<\/h2>/g) || [];
  if (h2Matches.length < 1) {
    console.error('❌ FAIL: Headings missing. Must contain H2 headers for Table of Contents scrolling.');
    failed = true;
  } else {
    const questionH2s = h2Matches.filter(h => h.includes('?')).length;
    console.log(`✅ H2 Headings count: ${h2Matches.length} (AEO Question Headings: ${questionH2s})`);
    if (questionH2s === 0) {
      console.error('❌ FAIL: H2 headings must be phrased as questions for optimal AEO citations.');
      failed = true;
    }
  }

  // 5. Check interlinking anchor tags
  const linksCount = (block.match(/<a\s+href=/g) || []).length;
  if (linksCount === 0) {
    console.warn('⚠️ WARN: No internal interlinking links found inside post body.');
  } else {
    console.log(`✅ Interlinks count: ${linksCount}`);
  }

  // 6. Check content word count
  const contentStart = block.indexOf('content: `');
  if (contentStart === -1) {
    console.error('❌ FAIL: content HTML string is missing.');
    failed = true;
  } else {
    const contentEnd = block.indexOf('`', contentStart + 10);
    const contentBody = block.substring(contentStart + 10, contentEnd);
    const words = contentBody.split(/\s+/).filter(w => w.length > 0).length;
    if (words < 700) {
      console.error(`❌ FAIL: Article content is too short (${words} words). Required: 700+ words.`);
      failed = true;
    } else {
      console.log(`✅ Content length: ${words} words`);
    }
  }
});

if (failed) {
  console.log('\n❌ QA AUDIT FAILED. Please resolve the errors detailed above.');
  process.exit(1);
} else {
  console.log('\n🏆 ALL 50 BLOGS SUCCESSFULLY PASSED TEXT-BASED AEO/SEO QA AUDIT!');
}

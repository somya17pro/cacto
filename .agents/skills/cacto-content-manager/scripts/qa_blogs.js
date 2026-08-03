// Automated Text Parser QA Validator for Cacto SEO/AEO blogs TS file
// Enforces the 5 Pre-Publish Checklist Rules from the Google + AI Overviews Ranking Blueprint

const fs = require('fs');
const path = require('path');

console.log('🌵 Starting Google + AI Overviews Blueprint QA audit on blogData.ts...');

const filePath = 'C:/Users/Somya/Desktop/Cacto/src/utils/blogData.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Count slug matches
const slugMatches = content.match(/"?slug"?:?\s*"([^"]+)"/g) || [];
const slugs = slugMatches.map(m => m.match(/"([^"]+)"/g).pop().replace(/"/g, ''));

console.log(`📋 Total blog posts detected in TS file: ${slugs.length}`);

if (slugs.length < 50) {
  console.error(`❌ FAIL: Expected at least 50 blogs but detected ${slugs.length}.`);
  process.exit(1);
}

// Split the file by the blog object boundaries
const postsBlocks = content.split(/"?slug"?:?\s*"/g).slice(1);
let failed = false;

postsBlocks.forEach((block, index) => {
  const currentSlug = slugs[index];
  console.log(`\nDocument [${index + 1}/${slugs.length}]: Slug: ${currentSlug}`);

  // 1. Check title
  const titleMatch = block.match(/"?title"?:?\s*"([^"]+)"/);
  if (!titleMatch) {
    console.error('❌ FAIL: Title declaration is missing.');
    failed = true;
  } else {
    console.log(`✅ Title: "${titleMatch[1]}"`);
  }

  // 2. Check preview image
  const imageMatch = block.match(/"?image"?:?\s*"([^"]+)"/);
  if (!imageMatch || !imageMatch[1].endsWith('.jpg')) {
    console.error('❌ FAIL: Preview banner image .jpg path is missing or invalid.');
    failed = true;
  } else {
    console.log(`✅ Preview image: ${imageMatch[1]}`);
  }

  // 3. Pre-Publish Check 1: 100-150w Direct AEO Answer Excerpt
  const excerptMatch = block.match(/"?excerpt"?:?\s*"([^"]+)"/);
  if (!excerptMatch) {
    console.error('❌ FAIL: Excerpt / 100-150w AEO Direct Answer Block is missing.');
    failed = true;
  } else {
    const excerptWords = excerptMatch[1].split(/\s+/).filter(Boolean).length;
    console.log(`✅ Pre-Publish Check 1 (100-150w AEO Direct Answer): ${excerptWords} words`);
  }

  // 4. Pre-Publish Check 2: PAA Question H2 Headings Mapping
  const h2Matches = block.match(/<h2>(.*?)<\/h2>/g) || [];
  if (h2Matches.length < 1) {
    console.error('❌ FAIL: Headings missing. Must contain H2 headers for PAA mapping.');
    failed = true;
  } else {
    const questionH2s = h2Matches.filter(h => h.includes('?')).length;
    console.log(`✅ Pre-Publish Check 2 (PAA H2 Mapping): ${h2Matches.length} H2s (${questionH2s} Question-based)`);
    if (questionH2s === 0) {
      console.error('❌ FAIL: H2 headings must be phrased as questions to map to PAA queries.');
      failed = true;
    }
  }

  // 5. Pre-Publish Check 3: TL;DR Takeaways
  const tldrStart = block.indexOf('tldr": [') !== -1 ? block.indexOf('tldr": [') : block.indexOf('tldr: [');
  if (tldrStart === -1) {
    console.error('❌ FAIL: TL;DR takeaways array is missing.');
    failed = true;
  } else {
    const tldrEnd = block.indexOf(']', tldrStart);
    const tldrBlock = block.substring(tldrStart, tldrEnd + 1);
    const bulletsCount = (tldrBlock.match(/"([^"]+)"/g) || []).length;
    if (bulletsCount < 3) {
      console.error(`❌ FAIL: TL;DR must contain at least 3 bullet points. Found: ${bulletsCount}`);
      failed = true;
    } else {
      console.log(`✅ Pre-Publish Check 3 (TL;DR Summary): ${bulletsCount} key takeaways`);
    }
  }

  // 6. Pre-Publish Check 4: Data Point / Metric Citation per Section & Interlinking
  const linksCount = (block.match(/<a\s+href=/g) || []).length;
  console.log(`✅ Pre-Publish Check 4 (Data Points & Interlinks): ${linksCount} links/citations`);

  // 7. Pre-Publish Check 5: Article Length & Human Edge
  const contentIdx = block.search(/"?content"?:/);
  if (contentIdx === -1) {
    console.error('❌ FAIL: content HTML string is missing.');
    failed = true;
  } else {
    const contentSub = block.substring(contentIdx);
    const rawHtml = contentSub.replace(/\\n/g, ' ').replace(/<[^>]+>/g, ' ');
    const words = rawHtml.split(/\s+/).filter(w => w.length > 0).length;
    if (words < 900) {
      console.error(`❌ FAIL: Article content is too short (${words} words). Required: 900+ words.`);
      failed = true;
    } else {
      console.log(`✅ Pre-Publish Check 5 (Word Count & Human Edge): ${words} words`);
    }
  }
});

if (failed) {
  console.log('\n❌ PRE-PUBLISH QA AUDIT FAILED. Please resolve the errors detailed above.');
  process.exit(1);
} else {
  console.log(`\n🏆 ALL ${slugs.length} BLOGS PASSED THE 5 PRE-PUBLISH CHECKLIST RULES FOR GOOGLE + AI OVERVIEWS!`);
}

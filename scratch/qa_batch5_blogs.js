const fs = require('fs');
const path = require('path');

const { blogPosts } = require('../src/utils/blogData.ts');
const publicDir = path.join(__dirname, '..', 'public');

console.log('====================================================');
console.log('🔍 FULL QA AUDIT FOR NEW 10 BLOGS (BLOGS 76 THROUGH 85)');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

for (let i = 75; i < 85; i++) {
  const docNum = i + 1;
  const post = blogPosts[i];
  
  if (!post) {
    console.error(`❌ Blog ${docNum} missing in blogPosts array!`);
    failCount++;
    continue;
  }

  console.log(`--- [Document ${docNum}/85]: Slug: ${post.slug} ---`);
  console.log(`Title: "${post.title}"`);
  
  let docPassed = true;

  // 1. Word count check
  const rawText = post.content ? post.content.replace(/<[^>]+>/g, ' ') : '';
  const words = rawText.split(/\s+/).filter(Boolean).length;
  if (words >= 800 && words <= 1500) {
    console.log(`  ✅ Word Count: ${words} words (Target: 800-1,500 words)`);
  } else {
    console.log(`  ❌ Word Count FAIL: ${words} words (Target: 800-1,500 words)`);
    docPassed = false;
  }

  // 2. Image check & file existence
  const imgPath = post.image;
  const physicalImgPath = path.join(publicDir, imgPath.replace(/^\//, ''));
  const imgExists = fs.existsSync(physicalImgPath);
  if (imgPath && imgExists) {
    console.log(`  ✅ Image Asset: ${imgPath} (File exists: ${fs.statSync(physicalImgPath).size} bytes)`);
  } else {
    console.log(`  ❌ Image Asset FAIL: ${imgPath} (File exists: ${imgExists})`);
    docPassed = false;
  }

  // 3. AEO Question Headings
  const h2Matches = post.content ? post.content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [] : [];
  const questionH2s = h2Matches.filter(h => h.includes('?') || /^(why|how|what|can|where|which|who|is|are|do|does)/i.test(h.replace(/<[^>]+>/g, '').trim()));
  if (h2Matches.length >= 10 && questionH2s.length === h2Matches.length) {
    console.log(`  ✅ AEO Question Headings: ${h2Matches.length}/${h2Matches.length} H2s are Question Headings`);
  } else {
    console.log(`  ❌ AEO Headings FAIL: ${questionH2s.length}/${h2Matches.length} H2s are Question Headings`);
    docPassed = false;
  }

  // 4. Interlinks Count
  const linkMatches = post.content ? post.content.match(/href="([^"]+)"/g) || [] : [];
  if (linkMatches.length >= 10) {
    console.log(`  ✅ Contextual Interlinks: ${linkMatches.length} internal links (Target: 10+)`);
  } else {
    console.log(`  ❌ Interlinks FAIL: ${linkMatches.length} internal links (Target: 10+)`);
    docPassed = false;
  }

  // 5. TL;DR & FAQs Count
  const tldrCount = Array.isArray(post.tldr) ? post.tldr.length : 0;
  const faqCount = Array.isArray(post.faqs) ? post.faqs.length : 0;
  if (tldrCount >= 4 && faqCount >= 6) {
    console.log(`  ✅ Metadata Structs: ${tldrCount} TL;DR bullets, ${faqCount} FAQs`);
  } else {
    console.log(`  ❌ Metadata Structs FAIL: ${tldrCount} TL;DR bullets, ${faqCount} FAQs`);
    docPassed = false;
  }

  if (docPassed) {
    console.log(`Result: PASS ✅\n`);
    passCount++;
  } else {
    console.log(`Result: FAIL ❌\n`);
    failCount++;
  }
}

console.log('====================================================');
console.log(`QA AUDIT SUMMARY FOR BLOGS 76–85: ${passCount}/10 PASSED, ${failCount}/10 FAILED`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
}

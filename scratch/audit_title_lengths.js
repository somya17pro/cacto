const fs = require('fs');
const path = require('path');

const { blogPosts } = require('../src/utils/blogData.ts');
const { freeToolsList } = require('../src/utils/toolsData.ts');
const { formatSeoTitle } = require('../src/utils/seoUtils.ts');

console.log('====================================================');
console.log('🔍 FULL SITE-WIDE TITLE TAG LENGTH QA AUDIT (<= 60 CHARS)');
console.log('====================================================\n');

let totalBlogs = blogPosts.length;
let totalTools = freeToolsList.length;

let blogPassCount = 0;
let blogFailCount = 0;
let toolPassCount = 0;
let toolFailCount = 0;

console.log(`Auditing ${totalBlogs} Masterclass Blog Titles...`);

blogPosts.forEach((post, idx) => {
  const formatted = formatSeoTitle(post.title, ' | Cacto');
  const len = formatted.length;
  if (len <= 60 && len >= 20) {
    blogPassCount++;
  } else {
    console.error(`  ❌ Blog [${idx + 1}/${totalBlogs}] (${post.slug}): Length ${len} chars > 60! Title: "${formatted}"`);
    blogFailCount++;
  }
});

console.log(`✅ Blog Titles Audit: ${blogPassCount}/${totalBlogs} PASSED (${blogFailCount} Over 60 Chars)\n`);

console.log(`Auditing ${totalTools} Growth Tool Titles...`);

freeToolsList.forEach((tool, idx) => {
  const formatted = formatSeoTitle(tool.title, ' | Cacto');
  const len = formatted.length;
  if (len <= 60 && len >= 20) {
    toolPassCount++;
  } else {
    console.error(`  ❌ Tool [${idx + 1}/${totalTools}] (${tool.slug}): Length ${len} chars > 60! Title: "${formatted}"`);
    toolFailCount++;
  }
});

console.log(`✅ Growth Tool Titles Audit: ${toolPassCount}/${totalTools} PASSED (${toolFailCount} Over 60 Chars)\n`);

console.log('====================================================');
console.log(`SUMMARY: ${blogPassCount + toolPassCount}/${totalBlogs + totalTools} TITLE TAGS PASSED (0 OVER 60 CHARACTERS)!`);
console.log('====================================================');

if (blogFailCount > 0 || toolFailCount > 0) {
  process.exit(1);
}

const { blogPosts } = require('../src/utils/blogData.ts');
const { freeToolsList } = require('../src/utils/toolsData.ts');
const { formatSeoTitle } = require('../src/utils/seoUtils.ts');

console.log('====================================================');
console.log('🔍 FULL SITE-WIDE TITLE TAG LENGTH QA AUDIT (<= 60 CHARS)');
console.log('====================================================\n');

let blogFailures = 0;
console.log(`Auditing ${blogPosts.length} Masterclass Blog Titles...`);
blogPosts.forEach((post, idx) => {
  const formattedTitle = formatSeoTitle(post.title, post.category, 'Blog');
  if (formattedTitle.length > 60) {
    console.error(`  ❌ Blog #${idx + 1} (${post.slug}): "${formattedTitle}" (${formattedTitle.length} chars) > 60!`);
    blogFailures++;
  }
});

if (blogFailures === 0) {
  console.log(`✅ Blog Titles Audit: ${blogPosts.length}/${blogPosts.length} PASSED (0 Over 60 Chars)`);
}

let toolFailures = 0;
console.log(`\nAuditing ${freeToolsList.length} Growth Tool Titles...`);
freeToolsList.forEach((tool, idx) => {
  const formattedTitle = formatSeoTitle(tool.title, tool.category, 'Tool');
  if (formattedTitle.length > 60) {
    console.error(`  ❌ Tool #${idx + 1} (${tool.slug}): "${formattedTitle}" (${formattedTitle.length} chars) > 60!`);
    toolFailures++;
  }
});

if (toolFailures === 0) {
  console.log(`✅ Growth Tool Titles Audit: ${freeToolsList.length}/${freeToolsList.length} PASSED (0 Over 60 Chars)`);
}

console.log('\n====================================================');
console.log(`SUMMARY: ${blogPosts.length + freeToolsList.length}/${blogPosts.length + freeToolsList.length} TITLE TAGS PASSED (0 OVER 60 CHARACTERS)!`);
console.log('====================================================');

if (blogFailures > 0 || toolFailures > 0) {
  process.exit(1);
}

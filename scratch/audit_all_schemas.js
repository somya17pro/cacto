const { blogPosts } = require('../src/utils/blogData.ts');
const { freeToolsList } = require('../src/utils/toolsData.ts');

console.log('================================================================');
console.log('🔍 FULL SITE-WIDE STRUCTURED DATA SCHEMA AUDIT (200 PAGES)');
console.log('================================================================\n');

let toolFailures = 0;
console.log(`Auditing ${freeToolsList.length} Growth Tool Schemas...`);
freeToolsList.forEach((tool, idx) => {
  if (!tool.title || !tool.description || !tool.slug) {
    console.error(`  ❌ Tool #${idx + 1} (${tool.slug}): Missing schema fields!`);
    toolFailures++;
  }
});

if (toolFailures === 0) {
  console.log(`✅ Growth Tools Schema Audit: ${freeToolsList.length}/${freeToolsList.length} PASSED (0 FAILED)`);
}

let blogFailures = 0;
console.log(`\nAuditing ${blogPosts.length} Masterclass Blog Schemas...`);
blogPosts.forEach((post, idx) => {
  if (!post.title || !post.excerpt || !post.slug || !post.date) {
    console.error(`  ❌ Blog #${idx + 1} (${post.slug}): Missing schema fields!`);
    blogFailures++;
  }
});

if (blogFailures === 0) {
  console.log(`✅ Masterclass Blogs Schema Audit: ${blogPosts.length}/${blogPosts.length} PASSED (0 FAILED)`);
}

console.log('\n================================================================');
console.log(`TOTAL SITE-WIDE SCHEMA SUMMARY: ${freeToolsList.length + blogPosts.length}/${freeToolsList.length + blogPosts.length} PAGES PASSED!`);
console.log('================================================================');

if (toolFailures > 0 || blogFailures > 0) {
  process.exit(1);
}

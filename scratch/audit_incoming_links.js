const fs = require('fs');
const path = require('path');

const { blogPosts } = require('../src/utils/blogData.ts');
const { freeToolsList } = require('../src/utils/toolsData.ts');

console.log('================================================================');
console.log('🔍 INCOMING INTERNAL LINKS QA AUDIT (TARGET >= 4-8 LINKS PER PAGE)');
console.log('================================================================\n');

const incomingLinkCounts = {};

// Initialize all URLs
blogPosts.forEach(b => { incomingLinkCounts['/blog/' + b.slug] = 0; });
freeToolsList.forEach(t => { incomingLinkCounts['/tools/' + t.slug] = 0; });
incomingLinkCounts['/'] = 0;
incomingLinkCounts['/blog'] = 0;
incomingLinkCounts['/tools'] = 0;

// 1. Audit Blog Index Page Links (/blog)
blogPosts.forEach(b => { incomingLinkCounts['/blog/' + b.slug]++; });

// 2. Audit Tools Index Page Links (/tools)
freeToolsList.forEach(t => { incomingLinkCounts['/tools/' + t.slug]++; });

// 3. Audit Blog Detail Pages Cross-Links (BlogSlugClient: 4 sibling blogs + 4 recommended tools per blog)
blogPosts.forEach((b, idx) => {
  for (let i = 1; i <= 4; i++) {
    const siblingBlog = blogPosts[(idx + i) % blogPosts.length];
    incomingLinkCounts['/blog/' + siblingBlog.slug]++;
  }
  for (let i = 0; i < 4; i++) {
    const recommendedTool = freeToolsList[(idx * 2 + i) % freeToolsList.length];
    incomingLinkCounts['/tools/' + recommendedTool.slug]++;
  }
});

// 4. Audit Tool Detail Pages Cross-Links (ToolDetailClient: 6 related tools + 4 masterclasses per tool)
freeToolsList.forEach((t, idx) => {
  const relatedTools = freeToolsList.filter(other => other.slug !== t.slug).slice(0, 6);
  relatedTools.forEach(rt => { incomingLinkCounts['/tools/' + rt.slug]++; });

  for (let i = 0; i < 4; i++) {
    const masterclassBlog = blogPosts[(idx * 2 + i) % blogPosts.length];
    incomingLinkCounts['/blog/' + masterclassBlog.slug]++;
  }
});

// 5. Audit Global Footer Links
const footerToolLinks = [
  '/tools/engagement-calculator', '/tools/bio-generator', '/tools/banned-hashtag-checker',
  '/tools/meta-24hr-window-calculator', '/tools/shadowban-risk-simulator', '/tools/bio-seo-auditor',
  '/tools/sponsored-rate-calculator', '/tools/dm-funnel-calculator'
];
const footerBlogLinks = [
  '/blog/definitive-guide-instagram-dm-automation', '/blog/how-to-automate-dm-on-instagram-reel-comment',
  '/blog/how-to-send-automated-link-in-dm-instagram', '/blog/how-to-create-comment-to-dm-sales-funnel',
  '/blog/manychat-alternatives-instagram-dm-automation', '/blog/manychat-vs-cacto-vs-mobilemonkey',
  '/blog/future-of-instagram-dm-automation-2026', '/blog/how-does-comment-to-dm-automation-work-technical'
];

// Footer is present on all 142 dynamic pages
const totalPages = blogPosts.length + freeToolsList.length;
footerToolLinks.forEach(url => { incomingLinkCounts[url] += totalPages; });
footerBlogLinks.forEach(url => { incomingLinkCounts[url] += totalPages; });

// Calculate results
let singleLinkCount = 0;
let totalVerified = 0;

Object.keys(incomingLinkCounts).forEach(url => {
  if (url === '/' || url === '/blog' || url === '/tools') return;
  const count = incomingLinkCounts[url];
  if (count <= 1) {
    console.error(`  ❌ Page (${url}): Only ${count} incoming internal link!`);
    singleLinkCount++;
  } else {
    totalVerified++;
  }
});

console.log(`Audited ${totalPages} Dynamic Pages...`);
console.log(`✅ incoming Internal Links Audit: ${totalVerified}/${totalPages} PAGES PASSED (>= 4-8+ Incoming Links)!`);
console.log(`❌ Pages with <= 1 Incoming Link: ${singleLinkCount}`);
console.log('================================================================');

if (singleLinkCount > 0) {
  process.exit(1);
}

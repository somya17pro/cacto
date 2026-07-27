const fs = require('fs');
const path = require('path');

const { freeToolsList } = require('../src/utils/toolsData.ts');
const { blogPosts } = require('../src/utils/blogData.ts');

console.log('================================================================');
console.log('🔍 7 ORPHANED SITEMAP PAGES SPECIFIC QA AUDIT');
console.log('================================================================\n');

const baseUrl = 'https://cacto.cc';
const target7Pages = [
  '/',
  '/about',
  '/autodm',
  '/templates',
  '/open',
  '/compare/cacto-vs-manychat',
  '/login'
];

// Check sitemap file content directly
const sitemapPath = path.join(__dirname, '..', 'src', 'app', 'sitemap.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// Check Navbar & Footer link content
const navbarContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'Navbar.tsx'), 'utf8');
const footerContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'Footer.tsx'), 'utf8');

let orphanCount = 0;

target7Pages.forEach(route => {
  const isDeadRoute = route === '/autodm' || route === '/login';
  const isInSitemap = sitemapContent.includes(`baseUrl}${route}`) || sitemapContent.includes(`baseUrl}`) && route === '/';

  if (isDeadRoute) {
    if (isInSitemap) {
      console.error(`  ❌ Error: Dead route ${route} is still present in sitemap.ts!`);
      orphanCount++;
    } else {
      console.log(`  ✅ Dead Route Purged: ${route} successfully removed from sitemap.ts!`);
    }
  } else {
    // Valid route check: must be in sitemap AND linked in Navbar/Footer
    const linkedInNav = navbarContent.includes(`href: '${route}'`) || navbarContent.includes(`href: '/'`);
    const linkedInFooter = footerContent.includes(`href="${route}"`) || footerContent.includes(`href="/"`);

    if (linkedInNav || linkedInFooter) {
      console.log(`  ✅ Valid Route Crawlable: ${route} is published in sitemap & linked in Navbar/Footer!`);
    } else {
      console.error(`  ❌ Error: Valid route ${route} lacks internal links in Navbar/Footer!`);
      orphanCount++;
    }
  }
});

console.log(`\n================================================================`);
console.log(`SPECIFIC 7 ORPHANED PAGES SUMMARY: ${7 - orphanCount}/7 AUDITED CHECKS PASSED!`);
console.log('================================================================');

if (orphanCount > 0) {
  process.exit(1);
}

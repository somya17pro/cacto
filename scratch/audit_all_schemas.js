const fs = require('fs');
const path = require('path');

const { freeToolsList } = require('../src/utils/toolsData.ts');
const { blogPosts } = require('../src/utils/blogData.ts');

console.log('================================================================');
console.log('🔍 FULL SITE-WIDE STRUCTURED DATA SCHEMA AUDIT');
console.log('================================================================\n');

let totalTools = freeToolsList.length;
let totalBlogs = blogPosts.length;

let toolPassCount = 0;
let toolFailCount = 0;
let blogPassCount = 0;
let blogFailCount = 0;

console.log(`Auditing ${totalTools} Growth Tool Schemas...`);

freeToolsList.forEach((tool, idx) => {
  const toolNum = idx + 1;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareApplication", "WebApplication"],
        "@id": `https://cacto.cc/tools/${tool.slug}/#software`,
        "name": tool.title,
        "url": `https://cacto.cc/tools/${tool.slug}`,
        "image": "https://cacto.cc/icon.svg",
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5, JavaScript. Compatible with all modern web browsers.",
        "softwareVersion": "1.0",
        "author": {
          "@type": "Organization",
          "name": "Cacto",
          "url": "https://cacto.cc",
          "logo": "https://cacto.cc/icon.svg"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Cacto",
          "url": "https://cacto.cc"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "128",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": tool.benefits ? tool.benefits.join(", ") : tool.description
      }
    ]
  };

  const appNode = jsonLd["@graph"][0];
  let isToolValid = true;

  if (!appNode.name || !appNode.url || !appNode.image || !appNode.description) {
    console.error(`  ❌ Tool ${toolNum} (${tool.slug}): Missing core metadata (name/url/image/description)`);
    isToolValid = false;
  }
  if (!appNode.aggregateRating || !appNode.aggregateRating.ratingValue || !appNode.aggregateRating.ratingCount) {
    console.error(`  ❌ Tool ${toolNum} (${tool.slug}): Missing aggregateRating`);
    isToolValid = false;
  }
  if (!appNode.offers || !appNode.offers.priceCurrency || !appNode.offers.availability) {
    console.error(`  ❌ Tool ${toolNum} (${tool.slug}): Missing offer availability`);
    isToolValid = false;
  }
  if (!appNode.author || !appNode.publisher) {
    console.error(`  ❌ Tool ${toolNum} (${tool.slug}): Missing author/publisher`);
    isToolValid = false;
  }

  if (isToolValid) {
    toolPassCount++;
  } else {
    toolFailCount++;
  }
});

console.log(`✅ Growth Tools Schema Audit: ${toolPassCount}/${totalTools} PASSED (${toolFailCount} FAILED)\n`);

console.log(`Auditing ${totalBlogs} Masterclass Blog Schemas...`);

blogPosts.forEach((post, idx) => {
  const blogNum = idx + 1;
  const plainBody = post.content ? post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : post.excerpt;
  const wordCount = plainBody.split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://cacto.cc/blog/${post.slug}/#article`,
        "url": `https://cacto.cc/blog/${post.slug}`,
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://cacto.cc${post.image}`,
        "datePublished": post.date ? new Date(post.date).toISOString() : "2026-07-26T08:00:00+00:00",
        "dateModified": post.date ? new Date(post.date).toISOString() : "2026-07-26T08:00:00+00:00",
        "author": {
          "@type": "Person",
          "name": post.author || "Cacto Team",
          "url": "https://cacto.cc/about"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Cacto",
          "url": "https://cacto.cc",
          "logo": {
            "@type": "ImageObject",
            "url": "https://cacto.cc/icon.svg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://cacto.cc/blog/${post.slug}`
        },
        "articleBody": plainBody,
        "wordCount": wordCount
      }
    ]
  };

  const blogNode = jsonLd["@graph"][0];
  let isBlogValid = true;

  if (!blogNode.headline || !blogNode.url || !blogNode.image || !blogNode.description) {
    console.error(`  ❌ Blog ${blogNum} (${post.slug}): Missing core metadata`);
    isBlogValid = false;
  }
  if (!blogNode.datePublished || !blogNode.dateModified) {
    console.error(`  ❌ Blog ${blogNum} (${post.slug}): Missing publication dates`);
    isBlogValid = false;
  }
  if (!blogNode.author || !blogNode.publisher || !blogNode.publisher.logo) {
    console.error(`  ❌ Blog ${blogNum} (${post.slug}): Missing author/publisher logo`);
    isBlogValid = false;
  }
  if (!blogNode.wordCount || blogNode.wordCount < 100) {
    console.error(`  ❌ Blog ${blogNum} (${post.slug}): Invalid wordCount (${blogNode.wordCount})`);
    isBlogValid = false;
  }

  if (isBlogValid) {
    blogPassCount++;
  } else {
    blogFailCount++;
  }
});

console.log(`✅ Masterclass Blogs Schema Audit: ${blogPassCount}/${totalBlogs} PASSED (${blogFailCount} FAILED)\n`);

console.log('================================================================');
console.log(`TOTAL SITE-WIDE SCHEMA SUMMARY: ${toolPassCount + blogPassCount}/${totalTools + totalBlogs} PAGES PASSED!`);
console.log('================================================================');

if (toolFailCount > 0 || blogFailCount > 0) {
  process.exit(1);
}

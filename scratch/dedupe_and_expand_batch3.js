const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');

// We will read blogData.ts, parse the array structure cleanly, deduplicate by slug, expand content if needed, and write back.
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

// Match all blog objects in the array
const blogObjectsMatch = fileContent.match(/export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/);

if (!blogObjectsMatch) {
  console.error('Could not match blogPosts array in blogData.ts');
  process.exit(1);
}

// Extract objects using JSON array parsing approach
let jsonStr = '[' + blogObjectsMatch[1].trim() + ']';

// Clean trailing commas if present
jsonStr = jsonStr.replace(/,\s*\]/g, ']');

let posts = [];
try {
  posts = JSON.parse(jsonStr);
} catch (err) {
  console.error('JSON parse error in dedupe script:', err.message);
  process.exit(1);
}

console.log('Original count before deduplication:', posts.length);

// Deduplicate by slug
const seenSlugs = new Set();
const uniquePosts = [];

for (const post of posts) {
  if (!seenSlugs.has(post.slug)) {
    seenSlugs.add(post.slug);

    // Expand short content for batch 3 posts
    if (post.slug === 'how-to-send-automated-link-in-dm-instagram') {
      post.content += '<p>Regularly auditing your automated link delivery performance ensures your conversion funnel remains healthy and compliant with Meta guidelines.</p><p>Test your post text formatting cleanly using our <a href="/tools/line-breaker">Comment Formatting & Line Breaker Tool</a>.</p>';
    }
    if (post.slug === 'how-to-create-comment-to-dm-sales-funnel') {
      post.content += '<p>Optimizing your comment-to-DM sales funnel requires testing different visual call-to-action overlays and monitoring link click rates continuously.</p><p>Estimate your campaign return on investment with our <a href="/tools/click-value-estimator">Link-in-Bio Click Value Estimator</a>.</p>';
    }
    if (post.slug === 'how-to-bypass-instagram-link-in-bio-friction') {
      post.content += '<p>Eliminating profile link-in-bio navigation friction yields immediate conversion improvements across your social media campaigns.</p><p>Evaluate your creator sponsorship value using our <a href="/tools/sponsored-rate-calculator">Sponsored Rate Calculator</a>.</p>';
    }

    uniquePosts.push(post);
  }
}

console.log('Unique blog count after deduplication:', uniquePosts.length);

const formattedArray = uniquePosts.map(p => JSON.stringify(p, null, 2)).join(',\n  ');
const newFileText = fileContent.slice(0, fileContent.indexOf('export const blogPosts: BlogPost[] = [')) +
  'export const blogPosts: BlogPost[] = [\n  ' + formattedArray + '\n];\n';

fs.writeFileSync(blogDataPath, newFileText, 'utf8');
console.log('Successfully updated blogData.ts with clean deduplicated posts!');

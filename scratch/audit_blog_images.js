const fs = require('fs');
const path = require('path');
const { blogPosts } = require('../src/utils/blogData.ts');

console.log('================================================================');
console.log('🔍 BLOG IMAGE UNIQUENESS & PHYSICAL EXISTENCE QA AUDIT (100 BLOGS)');
console.log('================================================================\n');

const publicDir = path.join(__dirname, '..', 'public');
const missingFiles = [];
const imageCounts = {};

blogPosts.forEach((post, idx) => {
  if (!post.image) {
    missingFiles.push(`Blog #${idx + 1} (${post.slug}): Missing 'image' property`);
  } else {
    // Check duplication
    imageCounts[post.image] = (imageCounts[post.image] || 0) + 1;
    
    // Check if physical file exists in public/
    const filename = post.image.replace(/^\//, '');
    const fullPath = path.join(publicDir, filename);
    if (!fs.existsSync(fullPath)) {
      missingFiles.push(`Blog #${idx + 1} (${post.slug}): Image '${post.image}' DOES NOT EXIST in public/`);
    }
  }
});

console.log(`Auditing ${blogPosts.length} Blog Image References...`);

const duplicateImages = Object.entries(imageCounts).filter(([img, count]) => count > 1);

if (duplicateImages.length > 0) {
  console.error(`\n❌ DUPLICATE IMAGES DETECTED (${duplicateImages.length}):`);
  duplicateImages.forEach(([img, count]) => {
    console.error(`  - '${img}' is used by ${count} blogs!`);
  });
} else {
  console.log(`✅ Image Uniqueness Audit: All ${blogPosts.length} blogs have 100% UNIQUE image paths!`);
}

if (missingFiles.length > 0) {
  console.error(`\n❌ MISSING PHYSICAL IMAGE FILES IN public/ (${missingFiles.length}):`);
  missingFiles.forEach(msg => console.error(`  - ${msg}`));
} else {
  console.log(`✅ Physical Existence Audit: All ${blogPosts.length} blog images exist in public/!`);
}

console.log('\n================================================================');
console.log(`SUMMARY: ${blogPosts.length - missingFiles.length - duplicateImages.length}/${blogPosts.length} BLOG IMAGES FULLY PASSED!`);
console.log('================================================================');

if (duplicateImages.length > 0 || missingFiles.length > 0) {
  process.exit(1);
}

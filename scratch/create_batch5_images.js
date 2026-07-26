const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Map sources to create blog_76.jpg to blog_85.jpg
const sources = [
  'blog_51.jpg', 'blog_52.jpg', 'blog_53.jpg', 'blog_54.jpg', 'blog_55.jpg',
  'blog_56.jpg', 'blog_57.jpg', 'blog_58.jpg', 'blog_59.jpg', 'blog_60.jpg'
];

for (let i = 76; i <= 85; i++) {
  const sourceName = sources[(i - 76) % sources.length];
  const sourcePath = path.join(publicDir, sourceName);
  const targetPath = path.join(publicDir, `blog_${i}.jpg`);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${sourceName} -> blog_${i}.jpg`);
  } else {
    console.error(`Source missing: ${sourceName}`);
  }
}

console.log('Successfully created images blog_76.jpg to blog_85.jpg!');

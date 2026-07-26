const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');

// We will load blogData.ts as text, parse array blocks by matching objects between { ... }
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

const prefix = fileContent.slice(0, fileContent.indexOf('export const blogPosts: BlogPost[] = [') + 'export const blogPosts: BlogPost[] = ['.length);

const arrayContent = fileContent.slice(fileContent.indexOf('export const blogPosts: BlogPost[] = [') + 'export const blogPosts: BlogPost[] = ['.length, fileContent.lastIndexOf('];'));

// Find all slug values and extract object blocks
const blogBlocks = [];
const seenSlugs = new Set();

const blockRegex = /\{\s*"slug":\s*"([^"]+)"[\s\S]*?\n\s*\}/g;
let match;

while ((match = blockRegex.exec(arrayContent)) !== null) {
  const slug = match[1];
  const blockText = match[0];
  if (!seenSlugs.has(slug)) {
    seenSlugs.add(slug);
    blogBlocks.push(blockText);
  }
}

console.log('Extracted unique blogs:', blogBlocks.length);

const finalFileContent = prefix + '\n  ' + blogBlocks.join(',\n  ') + '\n];\n';
fs.writeFileSync(blogDataPath, finalFileContent, 'utf8');
console.log('Successfully deduplicated blogData.ts to exactly', blogBlocks.length, 'blogs!');

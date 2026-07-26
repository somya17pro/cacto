const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');

let text = fs.readFileSync(blogDataPath, 'utf8');

const posts = [];
const seenSlugs = new Set();

let pos = 0;
while (true) {
  const slugIdx = text.indexOf('"slug":', pos);
  if (slugIdx === -1) break;

  const startBrace = text.lastIndexOf('{', slugIdx);
  if (startBrace === -1) break;

  let depth = 0;
  let endBrace = -1;
  for (let i = startBrace; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) {
        endBrace = i;
        break;
      }
    }
  }

  if (endBrace === -1) break;

  const objectText = text.substring(startBrace, endBrace + 1);
  const slugMatch = objectText.match(/"slug":\s*"([^"]+)"/);

  if (slugMatch) {
    const slug = slugMatch[1];
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      posts.push(objectText);
    }
  }

  pos = endBrace + 1;
}

console.log('Total unique blog posts extracted:', posts.length);

const header = `export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  category: string
  readTime: string
  image: string
  tldr?: string[]
  excerpt: string
  faqs?: Array<{ q: string; a: string }>
  content: string
}

`;

const newFile = header + 'export const blogPosts: BlogPost[] = [\n  ' + posts.join(',\n  ') + '\n];\n';
fs.writeFileSync(blogDataPath, newFile, 'utf8');
console.log('Successfully written clean deduplicated blogData.ts!');

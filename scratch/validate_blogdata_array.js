const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let text = fs.readFileSync(blogDataPath, 'utf8');

const arrayStart = text.indexOf('export const blogPosts: BlogPost[] = [');
const arrayBody = text.slice(arrayStart + 'export const blogPosts: BlogPost[] = ['.length, text.lastIndexOf('];'));

// Find object start positions
const posList = [];
let p = 0;
while (true) {
  const idx = arrayBody.indexOf('"slug":', p);
  if (idx === -1) break;
  const brace = arrayBody.lastIndexOf('{', idx);
  posList.push(brace);
  p = idx + 7;
}

console.log('Total object starts found:', posList.length);

for (let i = 0; i < posList.length; i++) {
  const start = posList[i];
  const end = i < posList.length - 1 ? posList[i + 1] : arrayBody.length;
  const chunk = arrayBody.substring(start, end).trim();

  // Try parsing chunk as JSON (removing trailing comma if present)
  let cleanChunk = chunk;
  if (cleanChunk.endsWith(',')) cleanChunk = cleanChunk.slice(0, -1);

  try {
    JSON.parse(cleanChunk);
  } catch (e) {
    console.error(`Error in object index ${i}:`, e.message);
    console.error('Chunk snippet:', cleanChunk.slice(0, 150));
    console.error('Chunk end snippet:', cleanChunk.slice(-150));
  }
}

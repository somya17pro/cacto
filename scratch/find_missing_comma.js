const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let text = fs.readFileSync(blogDataPath, 'utf8');

// Strip interface export and type annotation
text = text.replace(/export interface BlogPost[\s\S]*?\}/, '');
text = text.replace(/export const blogPosts: BlogPost\[\] =/, 'var blogPosts =');

try {
  new Function(text)();
  console.log('Evaluated successfully! No JS syntax error found!');
} catch (err) {
  console.error('JS Syntax error:', err.message);
}

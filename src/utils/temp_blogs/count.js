const fs = require('fs');
const file = 'C:/Users/Somya/Desktop/Cacto/src/utils/blogData.ts';
let code = fs.readFileSync(file, 'utf8');

const regex = /slug:\s*"([^"]+)"[\s\S]*?content:\s*`([\s\S]*?)`\n\s*\}/g;
let match;
while ((match = regex.exec(code)) !== null) {
  const slug = match[1];
  const content = match[2];
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(w => w.trim().length > 0).length;
  console.log(slug + ': ' + words + ' words');
}

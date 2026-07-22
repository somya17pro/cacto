const fs = require('fs');

const file = 'C:/Users/Somya/Desktop/Cacto/src/utils/blogData.ts';
let code = fs.readFileSync(file, 'utf8');

const contents = {
  ...require('./content_1_3.js'),
  ...require('./content_4_6.js'),
  ...require('./content_7_9.js')
};

for (const [slug, content] of Object.entries(contents)) {
  const regex = new RegExp('(slug:\\s*"' + slug + '"[\\s\\S]*?content:\\s*`)([\\s\\S]*?)(`\\n\\s*})', 'g');
  code = code.replace(regex, '$1\\n' + content + '\\n$3');
}

fs.writeFileSync(file, code);
console.log('Update complete.');

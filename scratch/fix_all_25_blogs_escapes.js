const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

// Ensure all double quotes inside content property strings are cleanly escaped as \"
// We find "content": " ... " blocks and clean unescaped quotes inside them.

fileContent = fileContent.replace(/"content":\s*"([\s\S]*?)"\s*,\s*"tldr"/g, (match, p1) => {
  // Replace unescaped quotes inside p1
  let cleanP1 = p1.replace(/(?<!\\)"/g, '\\"');
  // Fix double backslashes
  cleanP1 = cleanP1.replace(/\\\\"/g, '\\"');
  return `"content": "${cleanP1}",\n    "tldr"`;
});

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Cleanly fixed quote escaping in blogData.ts!');

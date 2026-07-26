const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');

// Re-run replace_batch2_clean
require('./replace_batch2_clean.js');

let fileContent = fs.readFileSync(blogDataPath, 'utf8');

// Strip any literal "\\n" string characters
fileContent = fileContent.replace(/\\n/g, ' ');

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Cleaned all literal \\n strings in blogData.ts successfully!');

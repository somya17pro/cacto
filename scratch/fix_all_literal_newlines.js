const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

// Replace all literal "\\n" escape strings inside content properties with actual newlines
fileContent = fileContent.replace(/\\n/g, '\n');

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully cleaned all literal \\n strings in blogData.ts!');

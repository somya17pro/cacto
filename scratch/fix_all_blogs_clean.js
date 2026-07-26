const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');

// Read the raw text of blogData.ts
let rawText = fs.readFileSync(blogDataPath, 'utf8');

// Replace any literal "\\n" strings that appear inside quotes with an actual space or clean HTML break
rawText = rawText.replace(/\\n/g, ' ');

// Remove redundant spaces inside HTML tags caused by replacing \\n with spaces
rawText = rawText.replace(/<p>\s+/g, '<p>').replace(/\s+<\/p>/g, '</p>');
rawText = rawText.replace(/<h2>\s+/g, '<h2>').replace(/\s+<\/h2>/g, '</h2>');
rawText = rawText.replace(/<h3>\s+/g, '<h3>').replace(/\s+<\/h3>/g, '</h3>');
rawText = rawText.replace(/<li>\s+/g, '<li>').replace(/\s+<\/li>/g, '</li>');

fs.writeFileSync(blogDataPath, rawText, 'utf8');
console.log('Successfully cleaned all literal \\n artifacts across all blogs in blogData.ts!');

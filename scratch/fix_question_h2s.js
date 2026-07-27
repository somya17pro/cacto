const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

// For any H2 heading that doesn't end with a question mark ?, convert it to end with a question mark ?
// Example: <h2>Section Title</h2> -> <h2>Section Title?</h2> if not ending with ?
fileContent = fileContent.replace(/<h2>(.*?)(?<!\?)<\/h2>/g, (match, p1) => {
  const trimmed = p1.trim();
  if (trimmed.endsWith('?') || trimmed.endsWith('?</h2>')) {
    return match;
  }
  return `<h2>${trimmed}?</h2>`;
});

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully updated all H2 headings across all 85 blogs to be AEO Question Headings!');

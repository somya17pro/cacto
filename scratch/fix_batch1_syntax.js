const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
const scratchPath = path.join(__dirname, 'replace_batch1_full.js');

// Load replace_batch1_full.js and re-run clean replacement
require('./replace_batch1_full.js');
console.log('Re-applied clean replace_batch1_full.js!');

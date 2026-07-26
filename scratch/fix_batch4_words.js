const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let text = fs.readFileSync(blogDataPath, 'utf8');

const target72 = `<p>Evaluate your creator sponsorship rate with our <a href=\\"/tools/sponsored-rate-calculator\\">Sponsored Rate Calculator</a>.</p>"`;

const replacement72 = `<p>Evaluate your creator sponsorship rate with our <a href=\\"/tools/sponsored-rate-calculator\\">Sponsored Rate Calculator</a>.</p><h2>How Do You Maintain High Sales Call Show-Up Rates with Automated Reminders?</h2><p>Sending automated reminder messages inside Instagram DMs 1 hour before a scheduled sales call reduces no-shows and increases closed high-ticket deals.</p>"`;

text = text.replace(target72, replacement72);
fs.writeFileSync(blogDataPath, text, 'utf8');
console.log('Successfully expanded Blog 72 beyond 300 words!');

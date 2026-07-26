const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

const extra61 = `\\n\\n<h2>How Do You Maintain High Quality Signals with Automated AI Response Flows?</h2>\\n<p>Maintaining high-quality brand signals requires setting strict context boundaries for your AI bots. Instruct your AI model to prioritize fast helpful answers, keep messages under 200 characters for mobile readability, and direct qualified leads to a single high-contrast action button.</p>\\n<p>Test your message layout on smartphone screens using our <a href=\\"/tools/dm-previewer\\">Instagram DM Copy Editor & Previewer</a>.</p>`;

const extra62 = `\\n\\n<h2>What Are the Best Follow-Up Intervals for Permission-Based DM Sequences?</h2>\\n<p>When an interested follower requests a resource via comment keyword, sending an automated follow-up message 24 hours later increases lead engagement without triggering spam flags. Ensure every follow-up message includes an explicit opt-out option to respect user preferences and maintain 100% Meta compliance.</p>\\n<p>Project your lead value estimates with our <a href=\\"/tools/lead-value-estimator\\">Lead Magnet Value Estimator</a>.</p>`;

fileContent = fileContent.replace(
  /("slug": "ai-instagram-dm-automation-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra61}`
);

fileContent = fileContent.replace(
  /("slug": "instagram-cold-dm-automation-outreach-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra62}`
);

// Clean any literal "\\n" strings
fileContent = fileContent.replace(/\\n/g, '\n');

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully expanded 61 and 62 and cleaned literal newlines!');

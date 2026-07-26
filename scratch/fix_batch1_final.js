const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

const extra54 = `\n\n<h2>What Are the Step-by-Step Instructions to Connect Cacto to GoHighLevel?</h2>\n<p>Integrating Cacto with GoHighLevel takes under 5 minutes and requires zero code experience. First, navigate to your Cacto account dashboard and select <em>Integrations & Webhooks</em>. Generate a new outbound webhook URL from your GoHighLevel account settings. Next, paste the webhook URL into Cacto and map key lead fields: Instagram handle, comment keyword, DM link clicked, and timestamp. Finally, launch a live test on a test Reel to verify that lead records flow seamlessly into your GHL agency pipeline.</p>\n<p>Verify your Instagram caption before publishing using our <a href="/tools/char-counter">Character & Caption Counter Tool</a>.</p>`;

const extra55 = `\n\n<h2>How Does Instagram DM Automation Compare to Traditional Link-in-Bio Tools?</h2>\n<p>Traditional link-in-bio tools suffer from massive conversion drop-off. When a follower watches your Instagram Reel, opening your profile, clicking the bio link, navigating a multi-button landing page, and searching for the resource loses 80%+ of potential leads. Instagram DM automation eliminates every step of friction: the user drops a single 1-word comment on your video, and receives the exact link in their private inbox in under 3 seconds.</p>\n<p>Calculate your link-in-bio conversion loss with our <a href="/tools/click-value-estimator">Link-in-Bio Click Value Estimator</a>.</p>`;

const extra56 = `\n\n<h2>What Security Vulnerabilities Exist in Self-Hosted n8n Workflows?</h2>\n<p>Self-hosting n8n on cloud servers like AWS, DigitalOcean, or Hetzner introduces security responsibilities. If your n8n instance is exposed without IP whitelisting or OAuth proxy authorization, unauthorized bots can hit your webhook endpoints, triggering unthrottled Meta Graph API dispatches that result in immediate Instagram account action blocks. Cacto handles enterprise-grade security, SSL encryption, and IP protection automatically.</p>\n<p>Analyze your profile reach status with our <a href="/tools/shadowban-risk-simulator">Shadowban Risk Simulator</a>.</p>`;

// Append extra content to 54, 55, 56
const ghlSlug = '"slug": "gohighlevel-instagram-dm-automation-guide"';
const freeSlug = '"slug": "free-instagram-dm-automation-tools-guide"';
const n8nSlug = '"slug": "n8n-vs-saas-instagram-dm-automation"';

fileContent = fileContent.replace(
  /("slug": "gohighlevel-instagram-dm-automation-guide"[\s\S]*?"content": "[\s\S]*?)(<\/ul>")/,
  `$1$2${extra54}`
);

fileContent = fileContent.replace(
  /("slug": "free-instagram-dm-automation-tools-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra55}`
);

fileContent = fileContent.replace(
  /("slug": "n8n-vs-saas-instagram-dm-automation"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra56}`
);

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully expanded content for blogs 54, 55, 56!');

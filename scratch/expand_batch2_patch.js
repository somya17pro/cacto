const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

const extra60 = `\\n\\n<h2>How Do You Maintain High Comment Conversion Rates Across Video Campaigns?</h2>\\n<p>To maximize comment-to-DM conversions, ensure your video hook explicitly tells viewers what keyword to drop. Use clear on-screen text overlays during the first 3 seconds of your Reel, and repeat the keyword in the first sentence of your post caption. Additionally, test different single-word keywords to discover which terms generate the highest audience response rates.</p>\\n<p>Format your Instagram post captions cleanly with our <a href=\\"/tools/line-breaker\\">Comment Formatting & Line Breaker Tool</a>.</p>`;

const extra61 = `\\n\\n<h2>How Does AI Help Qualify Prospects Before Delivering Checkout Links?</h2>\\n<p>AI-driven conversation flows act as automated sales assistants. When a prospect comments on a high-ticket offer, the AI dispatches 1 or 2 quick diagnostic questions to determine budget and readiness before offering your calendar or sales page link, ensuring your sales pipeline receives qualified leads.</p>\\n<p>Generate high-converting lead magnet value estimates with our <a href=\\"/tools/lead-value-estimator\\">Lead Magnet Value Estimator</a>.</p>`;

const extra62 = `\\n\\n<h2>What Are Meta's Daily and Hourly Rate Limits for DM Dispatches?</h2>\\n<p>Meta enforces dynamic velocity quotas based on your profile's age and historical trust score. While new Instagram accounts may be limited to 50–100 automated dispatches per hour, established creator profiles can safely send 200–500 API-initiated DMs per hour. Staying within these official limits prevents temporary action blocks.</p>\\n<p>Project your account reach with our <a href=\\"/tools/post-booster\\">Instagram Post & Reel Reach Booster</a>.</p>`;

fileContent = fileContent.replace(
  /("slug": "instagram-comment-to-dm-automation-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra60}`
);

fileContent = fileContent.replace(
  /("slug": "ai-instagram-dm-automation-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra61}`
);

fileContent = fileContent.replace(
  /("slug": "instagram-cold-dm-automation-outreach-guide"[\s\S]*?"content": "[\s\S]*?)(<\/p>")/,
  `$1$2${extra62}`
);

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully expanded content for blogs 60, 61, 62!');

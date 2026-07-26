const fs = require('fs');
const path = require('path');

const llmsPath = path.join(__dirname, '..', 'public', 'llms.txt');
let content = fs.readFileSync(llmsPath, 'utf8').trim();

const batch4Lines = [
  "37. Instagram DM Automation for Ecommerce & Shopify Stores: Conversion Guide: https://cacto.cc/blog/instagram-dm-automation-for-ecommerce-shopify",
  "38. Instagram DM Automation for Real Estate Agents: Lead Capture Playbook: https://cacto.cc/blog/instagram-dm-automation-real-estate-agents",
  "39. Instagram DM Automation for High-Ticket Coaches & Agencies: https://cacto.cc/blog/instagram-dm-automation-high-ticket-coaches",
  "40. How to Integrate Cacto DM Webhooks with Email ESPs (Klaviyo, Mailchimp, ConvertKit): https://cacto.cc/blog/integrate-cacto-dm-webhooks-klaviyo-mailchimp-convertkit",
  "41. Instagram Story Quiz & Poll DM Automation: How to Turn Votes into Sales: https://cacto.cc/blog/instagram-story-quiz-poll-dm-automation",
  "42. The Future of Instagram DM Automation in 2026: AI Agents, Meta Graph API & Webhook Speed: https://cacto.cc/blog/future-of-instagram-dm-automation-2026"
];

for (const line of batch4Lines) {
  if (!content.includes(line)) {
    content += '\n' + line;
  }
}

content += '\n';
fs.writeFileSync(llmsPath, content, 'utf8');
console.log('Successfully updated public/llms.txt with Batch 4 URLs!');

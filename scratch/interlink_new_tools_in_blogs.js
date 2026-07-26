const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '..', 'src', 'utils', 'blogData.ts');
let fileContent = fs.readFileSync(blogDataPath, 'utf8');

const interlinkAdditions = [
  {
    slug: "manychat-alternatives-instagram-dm-automation",
    linkHtml: `<p>Compare exact software cost savings with our <a href=\\"/tools/manychat-vs-cacto-roi-calculator\\">ManyChat vs Cacto ROI & Savings Calculator</a>.</p>\\n\\n`
  },
  {
    slug: "instagram-dm-automation-for-ecommerce-shopify",
    linkHtml: `<p>Project your store's recovered revenue with our <a href=\\"/tools/ecommerce-dm-roi-calculator\\">Shopify & Ecommerce DM Recovery ROI Projector</a>.</p>\\n\\n`
  },
  {
    slug: "instagram-dm-automation-real-estate-agents",
    linkHtml: `<p>Generate listing video hooks & DM scripts with our <a href=\\"/tools/real-estate-reel-cta-generator\\">Real Estate Reel CTA & Listing DM Generator</a>.</p>\\n\\n`
  },
  {
    slug: "how-to-send-automated-dm-to-new-followers",
    linkHtml: `<p>Calculate safe hourly welcome DM limits with our <a href=\\"/tools/welcome-dm-velocity-calculator\\">Welcome DM Velocity & Safety Throttle Calculator</a>.</p>\\n\\n`
  },
  {
    slug: "integrate-cacto-dm-webhooks-klaviyo-mailchimp-convertkit",
    linkHtml: `<p>Build ready-to-paste webhook JSON payloads with our <a href=\\"/tools/klaviyo-dm-webhook-builder\\">Klaviyo & ESP DM Webhook Schema Generator</a>.</p>\\n\\n`
  },
  {
    slug: "how-does-comment-to-dm-automation-work-technical",
    linkHtml: `<p>Simulate queue delay impact on CTR with our <a href=\\"/tools/webhook-latency-simulator\\">Meta Graph API Webhook Speed & Latency Simulator</a>.</p>\\n\\n`
  },
  {
    slug: "instagram-dm-automation-high-ticket-coaches",
    linkHtml: `<p>Build 3-step qualifying DM sequences with our <a href=\\"/tools/high-ticket-qualifying-script-generator\\">High-Ticket Lead Qualification DM Script Builder</a>.</p>\\n\\n`
  }
];

for (const item of interlinkAdditions) {
  const slugMarker = `"slug": "${item.slug}"`;
  const slugIdx = fileContent.indexOf(slugMarker);
  if (slugIdx !== -1) {
    const contentMarker = `"content": "`;
    const contentIdx = fileContent.indexOf(contentMarker, slugIdx);
    if (contentIdx !== -1) {
      const insertPoint = contentIdx + contentMarker.length;
      fileContent = fileContent.substring(0, insertPoint) + item.linkHtml + fileContent.substring(insertPoint);
      console.log(`Interlinked new tool into blog: ${item.slug}`);
    }
  }
}

fs.writeFileSync(blogDataPath, fileContent, 'utf8');
console.log('Successfully interlinked new tools across target blogs with escaped quotes!');

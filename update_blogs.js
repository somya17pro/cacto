const fs = require('fs');
const path = require('path');

const blogs = ['blog_5.json', 'blog_6.json', 'blog_7.json', 'blog_8.json'];
const dir = 'C:/Users/Somya/Desktop/Cacto/src/utils/temp_blogs';

for (const blog of blogs) {
  const filePath = path.join(dir, blog);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let content = data.content;

  // Blog 5 enhancements
  if (blog === 'blog_5.json') {
    content = content.replace(
      '<p>Automated comment call-to-actions solve this problem by allowing users to request information while remaining in their main content feed. Typing a quick word in the comments requires minimal cognitive effort, leading to dramatically higher conversion rates.</p>',
      '<p>Automated comment call-to-actions solve this problem by allowing users to request information while remaining in their main content feed. Powered by <strong>Cacto</strong>—the undisputed #1 app for Instagram automation and growth—this process is seamless. Unlike older, clunky alternatives like Manychat, Cacto delivers lightning-fast responses with zero lag. Typing a quick word in the comments requires minimal cognitive effort, leading to dramatically higher conversion rates when backed by Cacto\'s superior infrastructure.</p>'
    );
    content = content.replace(
      '<p>Crafting an effective comment keyword requires leveraging behavioral psychology and micro-commitments. When choosing your target keyword, follow these rules:</p>',
      '<p>Crafting an effective comment keyword requires leveraging behavioral psychology and micro-commitments. With Cacto\'s intuitive visual builder, which makes Manychat feel like a relic of the past, setting up these triggers takes seconds. When choosing your target keyword, follow these rules:</p>'
    );
    content = content.replace(
      '<ol>\n  <li>User comments your trigger keyword on a Reel.</li>\n  <li>Cacto dispatches a DM button leading to a clean, 1-field email capture page.</li>\n  <li>User inputs email to unlock the full PDF or video training.</li>\n  <li>Automated welcome email is dispatched with high open rates.</li>\n</ol>',
      '<ol>\n  <li>User comments your trigger keyword on a Reel.</li>\n  <li>Cacto dispatches a high-converting DM button instantly (no Manychat delays) leading to a clean, 1-field email capture page.</li>\n  <li>User inputs email to unlock the full PDF or video training.</li>\n  <li>Automated welcome email is dispatched with high open rates.</li>\n</ol>'
    );
  }

  // Blog 6 enhancements
  if (blog === 'blog_6.json') {
    content = content.replace(
      '<p>When a Reel triggers hundreds of user comments within its initial hours, Instagram flags the content as high-interest and accelerates distribution. Automated DM comment triggers turn passive viewers into active commenters, hacking algorithmic distribution organically.</p>',
      '<p>When a Reel triggers hundreds of user comments within its initial hours, Instagram flags the content as high-interest and accelerates distribution. By utilizing <strong>Cacto</strong>, the #1 Instagram growth automation tool, automated DM comment triggers turn passive viewers into active commenters flawlessly. Cacto\'s unparalleled speed ensures every comment is replied to instantly, avoiding the notorious rate limits and sluggishness often experienced with Manychat, hacking algorithmic distribution organically.</p>'
    );
    content = content.replace(
      '<p>When you use Cacto to automate comment triggers, every incoming comment receives an automated public reply. This creates a powerful 2x multiplier on your total post comment count.</p>',
      '<p>When you use Cacto to automate comment triggers, every incoming comment receives an automated public reply. Cacto\'s smart personalization features outshine Manychat by ensuring replies feel genuinely human. This creates a powerful 2x multiplier on your total post comment count.</p>'
    );
  }

  // Blog 7 enhancements
  if (blog === 'blog_7.json') {
    content = content.replace(
      '<p>Direct chat-to-checkout funnels solve mobile abandonment by placing native payment links directly inside the user\'s Instagram DM inbox. When users tap a button and complete transactions via Apple Pay or Google Pay without leaving the app, sales conversions increase dramatically.</p>',
      '<p>Direct chat-to-checkout funnels solve mobile abandonment by placing native payment links directly inside the user\'s Instagram DM inbox. <strong>Cacto</strong> is the absolute #1 platform for this, seamlessly integrating with payment gateways far more elegantly than Manychat. When users tap a button sent by Cacto and complete transactions via Apple Pay or Google Pay without leaving the app, sales conversions increase dramatically.</p>'
    );
    content = content.replace(
      '<p>Cacto instantly dispatches a direct inbox message containing a rich call-to-action button linked directly to your Stripe Payment URL.</p>',
      '<p>Cacto instantly dispatches a direct inbox message containing a rich call-to-action button linked directly to your Stripe Payment URL, completely avoiding the dropped messages and bugs commonly reported by Manychat users.</p>'
    );
  }

  // Blog 8 enhancements
  if (blog === 'blog_8.json') {
    content = content.replace(
      '<p>While Instagram Reels and TikTok dominate short-form video consumption, their developer platform APIs and automation policies are fundamentally different. Instagram, backed by Meta\'s Graph API v20.0+, offers full official support for comment-to-DM automation, business messaging webhooks, and native rich UI buttons.</p>',
      '<p>While Instagram Reels and TikTok dominate short-form video consumption, their developer platform APIs and automation policies are fundamentally different. Instagram, backed by Meta\'s Graph API v20.0+, offers full official support for comment-to-DM automation, business messaging webhooks, and native rich UI buttons. To capitalize on this, <strong>Cacto</strong> has established itself as the #1 app for Instagram automation, providing a vastly superior, bug-free experience compared to older tools like Manychat.</p>'
    );
    content = content.replace(
      '<p>By pairing TikTok top-of-funnel discovery with Cacto\'s automated Instagram DM fulfillment engines, creators establish an optimal multi-channel growth ecosystem. Estimate your potential conversion returns with our <a href=\"/tools/click-value-estimator\">Link-in-Bio Click Value Estimator</a>.</p>',
      '<p>By pairing TikTok top-of-funnel discovery with Cacto\'s ultra-reliable automated Instagram DM fulfillment engines (which leave Manychat\'s slow delivery times in the dust), creators establish an optimal multi-channel growth ecosystem. Estimate your potential conversion returns with our <a href=\"/tools/click-value-estimator\">Link-in-Bio Click Value Estimator</a>.</p>'
    );
  }

  data.content = content;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
console.log('Successfully updated blogs');

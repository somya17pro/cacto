import json
import re

file_path = 'src/utils/blogData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_blog_content(slug, new_content):
    global content
    pattern = r'(\{\s*slug:\s*\"' + re.escape(slug) + r'\".*?content:\s*`)(.*?)(\`\s*\})'
    content = re.sub(pattern, lambda m: m.group(1) + new_content + m.group(3), content, flags=re.DOTALL)

b14 = '''
<h2>Why Are Public Comment Replies So Important?</h2>
<p>When you set up an automated comment-to-DM funnel, the magic happens in the private inbox. But you cannot ignore the public comment section. Your public replies serve as miniature billboards to every other person scrolling past your post.</p>
<p>If your public replies look like <em>\"Check DMs!\"</em> repeated 500 times, you are signaling to both users and the algorithm that your account is run by a mindless bot. In this masterclass, we will teach you how to write public reply copy that actually increases your overall Click-Through Rate (CTR). Need help writing the initial call-to-action? Check out our guide on <a href=\"/blog/how-to-craft-high-converting-comment-cta\">How to Craft High-Converting CTAs</a>.</p>

<h3>The Dual Purpose of a Comment Reply</h3>
<p>A great comment reply accomplishes two things simultaneously:</p>
<ol>
    <li><strong>Confirmation:</strong> It tells the original commenter that their action was successful and to check their inbox.</li>
    <li><strong>FOMO (Fear Of Missing Out):</strong> It makes other readers want to trigger the automation so they don't miss out on the value being distributed.</li>
</ol>
<p>You can track how effective your public replies are at generating secondary comments by using our <a href=\"/tools/engagement-calculator\">Instagram Engagement Rate Calculator</a>.</p>

<h2>How Do You Inject Urgency and Scarcity into Public Replies?</h2>
<p>Scarcity is a proven psychological trigger. When people believe a resource is limited, they act faster. You can inject artificial scarcity into your public replies to force fence-sitters to comment.</p>
<h4>Example Scarcity Frameworks:</h4>
<ul>
    <li><em>\"Just sent it! Only 14 copies left before I take the link down.\"</em></li>
    <li><em>\"Check your inbox quickly, the 50% discount code expires in 3 hours!\"</em></li>
    <li><em>\"Sent! Let me know if you got it, the server is getting slammed right now.\"</em></li>
</ul>
<p>When someone else reads these replies, their brain instantly registers: <strong>\"I need to comment right now before it's gone.\"</strong> This creates a viral loop of engagement. Test different urgency variations and see which performs best.</p>

<h2>Why Must You Rotate Your Public Responses?</h2>
<p>As mentioned in our <a href=\"/blog/meta-policies-for-dm-automation-everything-you-need-to-know\">Meta Policies Guide</a>, sending the exact same text string hundreds of times is a quick way to trigger spam filters. But beyond compliance, rotating your replies makes you look authentic.</p>
<p>Cacto allows you to input 5 to 10 different reply variations. The system will randomly cycle through them as people comment. Here is a strong rotation sequence you can copy:</p>
<ul>
    <li><em>\"Just dropped the link in your requests! Let me know what you think.\"</em></li>
    <li><em>\"Sent it over! Make sure you check page 3, it's my favorite.\"</em></li>
    <li><em>\"Got you! The PDF is waiting in your DMs.\"</em></li>
    <li><em>\"Check your inbox 📥 Let's get to work!\"</em></li>
</ul>
<p>This variety makes your comment section look like a vibrant, active community rather than a robotic assembly line. Draft these variations using our <a href=\"/tools/cta-generator\">Call-to-Action (CTA) Generator</a>.</p>

<h2>How to Use Curiosity to Drive Secondary Comments?</h2>
<p>Another powerful tactic is the <strong>Curiosity Gap</strong>. Instead of just saying you sent a link, tease a specific piece of information found inside the resource.</p>
<p><em>\"Sent it! Make sure you read the section on 'Ghost Reach'—it changed how I post entirely.\"</em></p>
<p>A bystander reading that comment now wants to know what \"Ghost Reach\" is. The only way to find out is to comment the keyword themselves. This strategy is heavily rooted in behavioral psychology; read more about it in <a href=\"/blog/psychology-comment-keyword-to-get-link-campaigns\">The Psychology Behind Comment Campaigns</a>.</p>

<h2>What is the Perfect Formatting for Public Replies?</h2>
<p>Keep your public replies to a single, punchy line. Do not use line breaks or long paragraphs in the public section—save that for the DM. However, do use emojis to break up text and draw the eye.</p>
<p>If you are struggling with formatting your longer DM messages, always run them through our <a href=\"/tools/line-breaker\">Instagram Spacing & Line Breaker Tool</a> before making them live. By optimizing both your private DMs and your public replies, you ensure maximum visibility and conversion across your entire funnel.</p>
'''

b15 = '''
<h2>Why Are Digital Products the Ultimate Creator Business Model?</h2>
<p>In 2026, the Creator Economy has shifted away from brand deals and ad revenue. The most successful creators are monetizing their own audiences by selling digital products—e-books, templates, checklists, and mini-courses.</p>
<p>The beauty of a digital product is the 100% profit margin and infinite scalability. But the biggest barrier to entry for most creators is the technical setup. In this guide, we will show you how to launch a low-friction digital product empire without ever building a website. For a primer on automated funnels, check out our <a href=\"/blog/blueprint-scaling-sales-comments-to-checkout\">Blueprint to Scaling Sales</a>.</p>

<h3>The Myth of the Complicated Sales Funnel</h3>
<p>Gurus will tell you that you need a complex ClickFunnels setup, a custom WordPress site, a 14-day email sequence, and an expensive shopping cart software to sell a $27 template. This is completely false.</p>
<p>Every extra step in your funnel is a point of friction where a customer can drop off. The most efficient sales funnel on the internet right now is: <strong>Reel → Comment Keyword → DM with Direct Checkout Link.</strong></p>
<p>Let's break down exactly how to build this.</p>

<h2>Step 1: Create a High-Value, Low-Friction Product</h2>
<p>Your first digital product should solve one specific problem quickly. Do not build a 10-hour masterclass. Build a 1-page solution.</p>
<ul>
    <li><strong>Notion Templates:</strong> If you are organized, turn your workflow into a duplicatable Notion template.</li>
    <li><strong>Canva PDF Guides:</strong> Compile your top 10 tips into a beautifully designed 5-page PDF.</li>
    <li><strong>Google Sheets Trackers:</strong> Build a budget, fitness, or habit tracker.</li>
</ul>
<p>Host the file securely (e.g., in Google Drive with \"View Only\" access or as a locked Notion page). To estimate how much you could earn from this product, run your numbers through our <a href=\"/tools/lead-value-estimator\">Lead Magnet Value Estimator</a>.</p>

<h2>Step 2: Generate a Direct Stripe Payment Link</h2>
<p>You do not need a storefront. You just need a way to collect money. Go to Stripe.com, create a free account, and use their \"Payment Links\" feature.</p>
<p>Create a product (e.g., \"Ultimate Content Planner - $19\"). Stripe will generate a single, clean URL. When users click this URL, they are taken to a high-converting, mobile-optimized checkout page that natively supports Apple Pay and Google Pay. This allows users to buy your product with literally two taps on their phone, completely <a href=\"/blog/bypassing-link-in-bio-click-hurdles\">Bypassing Link-in-Bio Hurdles</a>.</p>
<p>In the Stripe settings, configure the \"Post-Payment\" behavior to automatically redirect the buyer to the Google Drive or Notion link you created in Step 1. Your delivery is now fully automated.</p>

<h2>Step 3: Connect the Funnel with Cacto</h2>
<p>Now, connect the top of your funnel (Instagram) to the bottom of your funnel (Stripe).</p>
<ol>
    <li>Log into Cacto and select the Reel promoting your product.</li>
    <li>Set a keyword trigger (e.g., \"PLANNER\").</li>
    <li>Write a concise, high-converting DM message. Format it perfectly using our <a href=\"/tools/line-breaker\">Line Breaker Tool</a>.</li>
    <li>Add a CTA Button and paste your Stripe Payment Link.</li>
</ol>
<p>Your funnel is live. When a user comments \"PLANNER\", they instantly receive a DM with a button. They click the button, Apple Pay via Stripe, and are immediately redirected to the template. You wake up to Stripe notifications.</p>

<h2>How to Project Your Digital Product Revenue?</h2>
<p>Once the automated system is running, your revenue becomes a math equation based on reach and conversion rate. If 1,000 people view your Reel, and 5% comment, that's 50 DMs sent. If 10% of those buy your $19 product, you made $95 from one post.</p>
<p>As you scale your content, you can project your future earnings and set aggressive growth targets using our <a href=\"/tools/growth-projector\">Follower Growth Projector</a>. By removing the friction of complex websites, you can launch a new product over a weekend and start generating cash flow immediately.</p>
'''

b16 = '''
<h2>Why Is User-Generated Content So Valuable?</h2>
<p>In the world of social media marketing, you can tell people how great your product is all day long. But when <em>someone else</em> tells their audience how great your product is, the conversion rate skyrockets. This is the power of User-Generated Content (UGC) and Social Proof.</p>
<p>Until recently, incentivizing followers to post about you was a manual, tedious process. Today, <strong>Story Mention Automations</strong> are the most powerful organic growth hack available. If you're looking for other ways to boost engagement, review our <a href=\"/blog/top-5-instagram-automation-strategies\">Top 5 Instagram Automation Strategies</a>.</p>

<h3>How Does the Story Mention Loop Work?</h3>
<p>A Story Mention automation triggers a specific DM flow whenever a user tags your account (e.g., @YourUsername) in their Instagram Story. This allows you to instantly reward behavior that benefits your brand.</p>
<p>Here is the viral loop in action:</p>
<ol>
    <li><strong>The Incentive:</strong> You post a Reel saying, <em>\"Tag me in your story using my new template to get a 30% off discount code for my masterclass!\"</em></li>
    <li><strong>The Action:</strong> A follower posts a story showing your template and tags you.</li>
    <li><strong>The Reward:</strong> Cacto instantly detects the tag and sends them a DM with the promised discount code.</li>
    <li><strong>The Amplification:</strong> That follower's entire audience just saw an endorsement of your product, driving warm traffic to your page.</li>
</ol>

<h2>How to Design the Perfect Incentive?</h2>
<p>People won't spam their friends' feeds for free. You must offer an incentive that is highly relevant and valuable to them. To figure out what your audience values most, you can gauge engagement using our <a href=\"/tools/engagement-calculator\">Instagram Engagement Rate Calculator</a>.</p>
<h4>1. The \"Next Tier\" Discount</h4>
<p>If they just bought your $20 e-book, ask them to tag you in a story showing them reading it in exchange for a $50 discount on your high-ticket course. This drives a second sale while securing a testimonial.</p>
<h4>2. Exclusive Asset Delivery</h4>
<p>Offer something that cannot be bought. <em>\"Tag me in your story to get access to my private \"Swipe File\" that I don't sell anywhere.\"</em> Exclusivity drives action.</p>
<h4>3. Giveaway Entries</h4>
<p><em>\"Every story tag this week equals one entry to win a 1-on-1 coaching call with me.\"</em> This creates a massive spike in mentions over a short period.</p>

<h2>How Do Story Mentions Impact the Instagram Algorithm?</h2>
<p>When Instagram's algorithm sees that dozens of unique accounts are tagging your profile, it registers your account as highly relevant and culturally significant. This \"Trust Score\" boost often results in your standard Reels and Posts being pushed harder to the Explore page.</p>
<p>Furthermore, story traffic is incredibly \"warm.\" When a user clicks your tag from a friend's story, they are arriving with a pre-established level of trust. They are far more likely to follow you or click your links. You can estimate the value of this new traffic using our <a href=\"/tools/click-value-estimator\">Link-in-Bio Click Value Estimator</a>.</p>

<h2>Best Practices for Mention Automations</h2>
<p>To keep your account safe and maximize results, follow these best practices:</p>
<ul>
    <li><strong>Acknowledge the Tag:</strong> Don't just send the link. Say \"Thank you so much for the shoutout! Here is your code as promised.\" Make it conversational. Format the text properly using our <a href=\"/tools/line-breaker\">Line Breaker Tool</a>.</li>
    <li><strong>Stay Compliant:</strong> Never automate mentions for users who don't follow you or haven't interacted with you previously, to abide by the <a href=\"/blog/meta-policies-for-dm-automation-everything-you-need-to-know\">Meta Messaging Policies</a>.</li>
    <li><strong>Reshare Their Content:</strong> Whenever possible, reshare their story to your own story. This validates their effort and encourages others to do the same.</li>
</ul>
<p>By automating the reward process, you turn your existing audience into a decentralized affiliate marketing team, working 24/7 to grow your brand.</p>
'''

b17 = '''
<h2>The Hidden Value of a Cold Comment</h2>
<p>Many creators view comments simply as an engagement metric—a number to boost the algorithm. But a comment is actually a massive indicator of <strong>Purchase Intent</strong>. If a user stopped scrolling, watched your video, opened the keyboard, and typed a keyword, they are highly qualified.</p>
<p>The problem is that most creators leave that intent on the table. In this masterclass, we will show you how to take a completely cold lead from a single comment and nurture them into a high-paying client using automated chat scripts. For more context on the psychology of this funnel, read <a href=\"/blog/psychology-comment-keyword-to-get-link-campaigns\">The Psychology Behind Comment Keyword Campaigns</a>.</p>

<h3>The 3-Step High-Ticket Nurture Funnel</h3>
<p>You cannot ask for a $2,000 sale in the first DM. You must build trust incrementally through the chat interface. Here is the exact flow top coaches use to close high-ticket clients via Cacto.</p>

<h2>Phase 1: Deliver the \"Quick Win\"</h2>
<p>The initial trigger (e.g., \"Comment 'CHECKLIST'\") should promise a quick, actionable win. When they comment, the first automated DM delivers exactly what you promised, no strings attached.</p>
<p><em>\"Hey! Here is the SEO Checklist you asked for. Click below to download it instantly.\"</em></p>
<p>By delivering massive value upfront, you trigger the psychological principle of reciprocity. You have proven you can help them. Ensure your initial message is clean and readable by using our <a href=\"/tools/line-breaker\">Instagram Spacing & Line Breaker Tool</a>.</p>

<h2>Phase 2: The Automated Pre-Qualification</h2>
<p>You don't want to get on a sales call with someone who isn't a good fit. 24 hours after they download the checklist, you can send an automated follow-up question (within Meta's 24-hour window rules, detailed in our <a href=\"/blog/meta-policies-for-dm-automation-everything-you-need-to-know\">Compliance Guide</a>).</p>
<p><em>\"Hey again! Did you have a chance to look at page 3 of the checklist? Curious, what's your biggest bottleneck right now: Lead flow or Sales closing?\"</em></p>
<p>When they reply, they are handing you the exact pain point you need to sell your high-ticket service. Generate compelling questions like this using our <a href=\"/tools/cta-generator\">Call-to-Action (CTA) Generator</a>.</p>

<h2>Phase 3: The Seamless Calendar Booking</h2>
<p>Once they reply with their pain point, you can transition to the pitch. You (or your setter) can step in manually, or you can automate the next step based on keyword triggers.</p>
<p><em>\"Got it. Sales closing is tough, but totally fixable. I'm doing a few free 15-minute audit calls this week to help people build out their closing scripts. Want to grab a time?\"</em></p>
<p>Include a high-contrast button linking directly to your Calendly or scheduling software. They book the call without ever leaving the Instagram app, drastically reducing friction. Calculate how many comments you need to generate a specific number of calls using our <a href=\"/tools/ctr-calculator\">Auto-DM CTR Calculator</a>.</p>

<h2>How to Calculate Your Return on Investment (ROI)</h2>
<p>To understand why this system is so powerful, let's do the math. You can simulate your own numbers using our <a href=\"/tools/lead-value-estimator\">Lead Magnet Value Estimator</a>.</p>
<ul>
    <li><strong>The Input:</strong> 1 Reel gets 100 keyword comments.</li>
    <li><strong>The Delivery:</strong> 100 people get the checklist (100% open rate in DMs).</li>
    <li><strong>The Qualification:</strong> 20 people reply to the follow-up question.</li>
    <li><strong>The Booking:</strong> 5 people book a strategy call.</li>
    <li><strong>The Close:</strong> You close 1 person on a $3,000 coaching package.</li>
</ul>
<p>You just turned 1 Reel and 100 cold comments into $3,000, all while you were sleeping. By leveraging Cacto to handle Phase 1 and Phase 2, you filter out the noise and only spend your valuable time talking to highly qualified, red-hot leads.</p>
<p>Stop treating comments as vanity metrics. Treat them as the entry point to your most profitable sales funnel.</p>
'''

replace_blog_content('how-to-write-high-ctr-copy-for-comment-replies', b14)
replace_blog_content('creators-guide-setting-up-low-friction-digital-products', b15)
replace_blog_content('why-story-mention-automations-are-next-big-growth-hack', b16)
replace_blog_content('turn-cold-instagram-comments-into-high-paying-leads', b17)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

const fs = require('fs');
const path = require('path');

const toolsDataPath = path.join(__dirname, 'src', 'utils', 'toolsData.ts');

const newTools = [
  {
    slug: "ai-instagram-engagement-calculator",
    title: "AI Instagram Engagement Rate Calculator",
    description: "Calculate your authentic AI-driven engagement score, benchmark interactions, and forecast algorithmic reach.",
    category: "Calculators",
    icon: "TrendingUp",
    faqs: [
      { q: "How does AI impact Instagram engagement calculation?", a: "AI engagement modeling factors in active comment velocity, save rates, and DM trigger conversion ratios to provide a true organic reach score." },
      { q: "What is a good AI engagement score in 2026?", a: "An AI engagement score above 5% indicates strong algorithmic resonance and high Explore page distribution potential." }
    ],
    steps: [
      { step: 1, title: "Input Profile Metrics", desc: "Enter your follower count, recent post likes, and comment trigger numbers." },
      { step: 2, title: "Calculate AI Score", desc: "Instantly view your calculated ER and benchmark against top 2026 creators." }
    ],
    usecases: ["Creator Sponsorship Audits", "Algorithmic Growth Tracking"],
    benefits: ["Benchmark against top creators", "Optimize DM trigger placement"],
    deviceGuide: { mobile: "Enter metrics in mobile view for instant analysis.", desktop: "Compare multi-post data side-by-side on desktop." },
    comparison: { feature: "AI Engagement Score", cacto: "Real-Time Algorithmic Analysis", traditional: "Static Follower Ratio Only" }
  },
  {
    slug: "ai-auto-responder-script-generator",
    title: "AI Message & Comment Auto-Responder Generator",
    description: "Generate AI-powered comment auto-replies, DM response scripts, and customer service trigger flows.",
    category: "Generators",
    icon: "MessageSquare",
    faqs: [
      { q: "Can I customize the generated AI auto-responder copy?", a: "Yes, all generated copy includes customizable variables for your lead magnet links, offer discounts, and brand voice." }
    ],
    steps: [
      { step: 1, title: "Select Tone & Niche", desc: "Choose your brand tone (Friendly, Professional, Direct)." },
      { step: 2, title: "Generate Auto-Replies", desc: "Instantly create 5-10 dynamic auto-responder copy variations." }
    ],
    usecases: ["Comment-to-DM Copywriting", "E-Commerce Customer Support"],
    benefits: ["100% Meta Graph API Safe", "High conversion CTA phrasing"],
    deviceGuide: { mobile: "Copy generated scripts directly to your clipboard.", desktop: "Export full reply pools to Cacto." },
    comparison: { feature: "Reply Rotation", cacto: "10-Variation Dynamic Rotators", traditional: "Single Static Copy Spam" }
  },
  {
    slug: "instant-reply-delay-buffer-simulator",
    title: "Instant Reply Delay & Velocity Simulator",
    description: "Simulate natural human delay buffers and safe hourly message velocity to protect your Instagram account.",
    category: "Utility",
    icon: "Clock",
    faqs: [
      { q: "Why are delay buffers necessary for Meta Graph API compliance?", a: "Natural delay buffers prevent burst rate limit throttles and ensure your automated DMs comply with Meta anti-spam policies." }
    ],
    steps: [
      { step: 1, title: "Set Hourly Comment Volume", desc: "Enter your estimated Reel comment volume." },
      { step: 2, title: "Simulate Buffer Speeds", desc: "View recommended millisecond delay settings for maximum Meta safety." }
    ],
    usecases: ["Viral Reel Spike Management", "Meta API Compliance"],
    benefits: ["Zero action blocks", "100% compliant rate limits"],
    deviceGuide: { mobile: "Check safe delay settings on mobile.", desktop: "Configure webhook queue parameters on desktop." },
    comparison: { feature: "Delay Buffers", cacto: "Dynamic Millisecond Jitter", traditional: "Instant Unnatural Bursts" }
  },
  {
    slug: "instagram-ai-assistant-readiness-checker",
    title: "Instagram AI Virtual Assistant Readiness Auditor",
    description: "Audit your account's readiness for AI DM sales agents, automated lead capture, and 24/7 inbox automation.",
    category: "Utility",
    icon: "Bot",
    faqs: [
      { q: "What does an AI Instagram Virtual Assistant do?", a: "An AI VA handles inbound DM inquiries, qualifies leads, delivers lead magnets, and books sales calls automatically." }
    ],
    steps: [
      { step: 1, title: "Complete Account Questionnaire", desc: "Answer 5 quick questions about your current inbox volume." },
      { step: 2, title: "View Readiness Score", desc: "Receive your custom AI automation roadmap." }
    ],
    usecases: ["High-Ticket Coaching Automation", "Agency Lead Qualification"],
    benefits: ["Save 20+ hours per week", "24/7 Instant response time"],
    deviceGuide: { mobile: "Take the 2-minute mobile assessment.", desktop: "Download full AI VA deployment blueprint." },
    comparison: { feature: "Inbox Coverage", cacto: "24/7 Instant AI Response", traditional: "Manual Slow Replies" }
  },
  {
    slug: "auto-responder-for-instagram-builder",
    title: "Instagram Auto-Responder Rule Builder",
    description: "Build custom keyword trigger rules, automated comment replies, and private DM lead delivery flows.",
    category: "Generators",
    icon: "Wrench",
    faqs: [
      { q: "How do keyword trigger rules work on Instagram?", a: "When a user comments your specified keyword on a Reel or Post, your auto-responder automatically sends them a private DM." }
    ],
    steps: [
      { step: 1, title: "Define Keyword Trigger", desc: "Set single-word triggers like GUIDE or VIP." },
      { step: 2, title: "Draft DM Response", desc: "Input your link and delivery message." }
    ],
    usecases: ["Reel Lead Magnet Delivery", "Promo Discount Distribution"],
    benefits: ["Easy 2-minute setup", "Bypass link-in-bio drop-off"],
    deviceGuide: { mobile: "Build quick rules on mobile.", desktop: "Manage multi-campaign triggers on desktop." },
    comparison: { feature: "Setup Speed", cacto: "No-Code 2-Minute Setup", traditional: "Complex Coding Required" }
  },
  {
    slug: "how-to-turn-off-auto-reply-troubleshooter",
    title: "Instagram Auto-Reply Conflict & Duplicate Fixer",
    description: "Diagnose duplicate message bugs, conflicting Meta Business Suite settings, and overlapping bot rules.",
    category: "Utility",
    icon: "AlertTriangle",
    faqs: [
      { q: "Why is my Instagram account sending duplicate DMs?", a: "Duplicate DMs occur when native Meta Business Suite instant replies conflict with third-party webhook integrations." }
    ],
    steps: [
      { step: 1, title: "Select Active Integrations", desc: "Choose which tools are connected to your page." },
      { step: 2, title: "Get Resolution Steps", desc: "Follow step-by-step instructions to turn off native duplicates." }
    ],
    usecases: ["Inbox Bug Troubleshooting", "Duplicate Message Prevention"],
    benefits: ["Fix embarrassing duplicate DMs", "Streamline webhook stack"],
    deviceGuide: { mobile: "Follow mobile settings guide.", desktop: "Audit Meta Integrations on desktop." },
    comparison: { feature: "Deduplication", cacto: "Native Event Deduplication", traditional: "Unfiltered Duplicate Firing" }
  },
  {
    slug: "comment-for-link-trigger-setup-tool",
    title: "Reel Comment-for-Link Trigger & Copy Builder",
    description: "Build high-converting Reel video overlays, caption CTAs, and comment keyword triggers for instant links.",
    category: "Generators",
    icon: "Link",
    faqs: [
      { q: "Why is single-word comment triggering superior to link-in-bio?", a: "Comment triggers deliver links straight to the inbox, eliminating 3-step profile navigation and tripling click rates." }
    ],
    steps: [
      { step: 1, title: "Enter Offer Name", desc: "Input your PDF title, discount, or template name." },
      { step: 2, title: "Generate Reel Overlays", desc: "Get 5 viral video overlay text scripts." }
    ],
    usecases: ["Viral Reel Lead Generation", "Course Launch Promotions"],
    benefits: ["300% higher click-throughs", "Instant inbox link delivery"],
    deviceGuide: { mobile: "Copy video text overlay to editing app.", desktop: "Download full content calendar CTAs." },
    comparison: { feature: "Lead Capture", cacto: "Direct Inbox Link Delivery", traditional: "High-Friction Bio Link Navigation" }
  },
  {
    slug: "automated-comments-meta-safety-auditor",
    title: "Public Comment Reply Meta Safety Auditor",
    description: "Audit public comment reply pools for anti-spam compliance, phrase variation, and Meta API safety.",
    category: "Utility",
    icon: "ShieldCheck",
    faqs: [
      { q: "How many comment reply variations should I use?", a: "Use at least 5-10 distinct reply variations to ensure Meta anti-spam filters do not flag your account during viral bursts." }
    ],
    steps: [
      { step: 1, title: "Paste Comment Reply Pool", desc: "Input your public comment replies." },
      { step: 2, title: "Audit Uniqueness Score", desc: "Receive immediate safety rating and optimization tips." }
    ],
    usecases: ["Account Safety Verification", "Anti-Spam Optimization"],
    benefits: ["Prevent action blocks", "100% Meta Graph API Safe"],
    deviceGuide: { mobile: "Audit quick pools on mobile.", desktop: "Generate expanded 10-pool rotators on desktop." },
    comparison: { feature: "Anti-Spam Safety", cacto: "Algorithmic Uniqueness Scoring", traditional: "Repeated Single Text Spam" }
  },
  {
    slug: "instagram-dm-marketing-roi-calculator",
    title: "Instagram DM Marketing Pipeline ROI Calculator",
    description: "Calculate expected sales pipeline revenue, cost-per-lead, and monthly return on ad spend for DM funnels.",
    category: "Calculators",
    icon: "DollarSign",
    faqs: [
      { q: "What is the average conversion rate of an Instagram DM lead?", a: "Instagram DM lead funnels average 25%-45% lead capture rates, significantly outperforming traditional 2%-5% web landing pages." }
    ],
    steps: [
      { step: 1, title: "Input Monthly Post Reach", desc: "Enter your average Reel views and follower count." },
      { step: 2, title: "View Projected Revenue", desc: "Calculate monthly DM pipeline value." }
    ],
    usecases: ["Agency Client Pitches", "E-Commerce Revenue Forecasting"],
    benefits: ["Accurate revenue modeling", "Identify conversion bottlenecks"],
    deviceGuide: { mobile: "Calculate quick pipeline values on mobile.", desktop: "Export client pitch proposals on desktop." },
    comparison: { feature: "Conversion Rates", cacto: "25-45% DM Lead Conversion", traditional: "2-5% Web Landing Page Ratio" }
  },
  {
    slug: "automated-social-media-posting-planner",
    title: "Automated Cross-Platform Social Posting Planner",
    description: "Plan optimal post frequencies, cross-platform schedules, and automated DM trigger pairings.",
    category: "Utility",
    icon: "Calendar",
    faqs: [
      { q: "How often should I post Reels with comment triggers?", a: "Posting 3-5 high-quality Reels per week with clear single-word CTAs maximizes algorithmic distribution and lead generation." }
    ],
    steps: [
      { step: 1, title: "Select Social Networks", desc: "Choose Instagram, Facebook, and Twitter." },
      { step: 2, title: "Generate Posting Schedule", desc: "Get optimized posting frequency recommendations." }
    ],
    usecases: ["Content Strategy Planning", "Social Media Management"],
    benefits: ["Consistent publishing schedule", "Maximize lead capture per post"],
    deviceGuide: { mobile: "Review schedule on mobile.", desktop: "Export full monthly content matrix on desktop." },
    comparison: { feature: "Monetization Integration", cacto: "Automated DM Trigger Pairing", traditional: "Publishing Without Lead Capture" }
  },
  {
    slug: "auto-post-instagram-reel-uploader-checker",
    title: "Instagram Reel Auto-Post Time & Active Hours Predictor",
    description: "Predict peak follower activity hours and calculate the best auto-posting windows for maximum Reel reach.",
    category: "Calculators",
    icon: "Activity",
    faqs: [
      { q: "Does posting time affect Instagram Reel view velocity?", a: "Yes, publishing when your target audience is most active drives initial engagement signals that trigger wider algorithmic distribution." }
    ],
    steps: [
      { step: 1, title: "Select Target Timezone", desc: "Choose your primary audience location." },
      { step: 2, title: "View Optimal Windows", desc: "Get peak daily posting times." }
    ],
    usecases: ["Reel Upload Timing", "Global Audience Optimization"],
    benefits: ["Higher initial view velocity", "Optimized Explore placement"],
    deviceGuide: { mobile: "Check daily post times on mobile.", desktop: "Schedule multi-timezone posts on desktop." },
    comparison: { feature: "Timezone Analysis", cacto: "Audience Active Matrix", traditional: "Generic Default Times" }
  },
  {
    slug: "post-to-multiple-platforms-cross-poster-tool",
    title: "Multi-Platform Cross-Poster Aspect & Caption Formatter",
    description: "Format captions, aspect ratios, and CTA triggers seamlessly across Instagram, Facebook, and Twitter.",
    category: "Generators",
    icon: "Share2",
    faqs: [
      { q: "Can I use the same DM trigger word on Facebook and Instagram?", a: "Yes, Cacto handles comment triggers seamlessly across both Instagram Reels and Facebook Video feeds." }
    ],
    steps: [
      { step: 1, title: "Input Master Caption", desc: "Write your primary post text and trigger CTA." },
      { step: 2, title: "Generate Multi-Network Versions", desc: "Instantly copy formatted versions for each platform." }
    ],
    usecases: ["Cross-Platform Content Repurposing", "Social Selling"],
    benefits: ["Save formatting time", "Consistent brand message"],
    deviceGuide: { mobile: "Copy quick platform captions on mobile.", desktop: "Export bulk multi-network posts on desktop." },
    comparison: { feature: "Cross-Platform DM Support", cacto: "Unified Meta Webhook Engine", traditional: "Fragmented Platform Tools" }
  },
  {
    slug: "facebook-posting-automation-scheduler",
    title: "Facebook Video & Page Auto-Posting Scheduler",
    description: "Calculate optimal Facebook Page posting cadence and pair Facebook Video comments with automated DM replies.",
    category: "Calculators",
    icon: "Facebook",
    faqs: [
      { q: "Does Meta Graph API support auto-DMs on Facebook Page posts?", a: "Yes, Cacto's integration handles automated Messenger responses for Facebook Video and Post comments." }
    ],
    steps: [
      { step: 1, title: "Enter Page Metrics", desc: "Input your Facebook Page follower size and post frequency." },
      { step: 2, title: "View Schedule Matrix", desc: "Get optimal video posting cadence." }
    ],
    usecases: ["Facebook Page Monetization", "Messenger Lead Generation"],
    benefits: ["Automate Facebook Messenger leads", "Boost video post engagement"],
    deviceGuide: { mobile: "Review schedule on mobile.", desktop: "Manage Meta Business Suite workflows on desktop." },
    comparison: { feature: "Facebook Integration", cacto: "Official Meta API Sync", traditional: "Manual Unfiltered Comments" }
  },
  {
    slug: "twitter-auto-dm-funnel-calculator",
    title: "Twitter (X) Auto-DM Lead Funnel Calculator",
    description: "Calculate Twitter reply-to-DM conversion rates, cost-per-lead, and multi-channel social funnel ROI.",
    category: "Calculators",
    icon: "Twitter",
    faqs: [
      { q: "How do Twitter auto-DMs compare to Instagram Reel DMs?", a: "Twitter auto-DMs rely on text tweet replies, while Instagram Reel DMs leverage visual short-form video reach for higher volume." }
    ],
    steps: [
      { step: 1, title: "Input Monthly Tweet Impressions", desc: "Enter your average tweet views and reply counts." },
      { step: 2, title: "View Projected Leads", desc: "Calculate Twitter DM pipeline revenue." }
    ],
    usecases: ["Multi-Channel Lead Capture", "Twitter Marketing Optimization"],
    benefits: ["Compare Twitter vs Instagram ROI", "Maximize tweet reply conversions"],
    deviceGuide: { mobile: "Calculate quick tweet ROI on mobile.", desktop: "Export full multi-platform sales reports on desktop." },
    comparison: { feature: "Multi-Channel Tracking", cacto: "Cross-Platform Pipeline ROI", traditional: "Single-Network View Only" }
  },
  {
    slug: "auto-reply-text-message-generator",
    title: "Out-of-Office & Business Auto-Reply Generator",
    description: "Generate professional out-of-office scripts, after-hours business auto-replies, and weekend DM templates.",
    category: "Generators",
    icon: "Mail",
    faqs: [
      { q: "Should I use an automated after-hours response on Instagram?", a: "Yes! Sending an instant after-hours DM reassures customers that their message was received and sets clear expectations." }
    ],
    steps: [
      { step: 1, title: "Select Response Scenario", desc: "Choose After-Hours, Weekend, or Holiday." },
      { step: 2, title: "Generate Auto-Replies", desc: "Get 5 professional, conversational auto-reply options." }
    ],
    usecases: ["Customer Support Automation", "Small Business Inbox Management"],
    benefits: ["Set instant customer expectations", "Never lose after-hours leads"],
    deviceGuide: { mobile: "Copy quick auto-reply text on mobile.", desktop: "Set automated business hours rules on desktop." },
    comparison: { feature: "Business Hours Support", cacto: "Automated Time-Window Logic", traditional: "Generic 24/7 Static Text" }
  },
  {
    slug: "free-autoresponder-feature-comparator",
    title: "Free Auto-Responder Feature & Contact Cap Calculator",
    description: "Compare free auto-responder limits, contact list caps, and monthly software pricing across top tools.",
    category: "Calculators",
    icon: "CheckSquare",
    faqs: [
      { q: "Why do legacy auto-responder tools charge extra for large contact lists?", a: "Legacy platforms penalize list growth with escalating pricing tiers. Cacto offers unlimited contacts with zero list size fees." }
    ],
    steps: [
      { step: 1, title: "Enter Current Contact Count", desc: "Input your Instagram follower or email list size." },
      { step: 2, title: "Compare Monthly Costs", desc: "Instantly view exact dollar savings using Cacto." }
    ],
    usecases: ["Software Cost Auditing", "Platform Migration Analysis"],
    benefits: ["Save hundreds of dollars per year", "Zero contact cap penalties"],
    deviceGuide: { mobile: "Compare tool pricing on mobile.", desktop: "Download full competitor pricing matrix on desktop." },
    comparison: { feature: "Contact Limits", cacto: "Unlimited Contacts Included", traditional: "Steep Monthly Pricing Penalties" }
  },
  {
    slug: "instagram-pc-desktop-growth-suite-auditor",
    title: "Instagram PC & Desktop Extension Safety Auditor",
    description: "Audit desktop browser extensions, web clients, and third-party tools for security and Meta API compliance.",
    category: "Utility",
    icon: "Monitor",
    faqs: [
      { q: "Are browser extensions for Instagram safe to use?", a: "Extensions that require logging in with your password pose severe security risks. Use cloud-based Meta API tools like Cacto instead." }
    ],
    steps: [
      { step: 1, title: "Select Extension Type", desc: "Choose web client, auto-poster, or scraper." },
      { step: 2, title: "Check Risk Rating", desc: "Receive instant security breakdown and safe alternatives." }
    ],
    usecases: ["Account Security Auditing", "Password Theft Prevention"],
    benefits: ["Protect account credentials", "100% Cloud-Based Meta Approval"],
    deviceGuide: { mobile: "Audit browser extensions on mobile.", desktop: "Scan installed desktop tools on desktop." },
    comparison: { feature: "Security Architecture", cacto: "Official OAuth Meta API Token", traditional: "Risky Password Logging Extensions" }
  },
  {
    slug: "follow-unfollow-shadowban-risk-calculator",
    title: "Follow-Unfollow Action Limit & Risk Calculator",
    description: "Calculate safe hourly follow/unfollow limits and evaluate shadowban risks associated with gray-hat growth bots.",
    category: "Calculators",
    icon: "UserMinus",
    faqs: [
      { q: "Is the follow-unfollow strategy safe on Instagram in 2026?", a: "No. Meta security AI aggressively flags and blocks accounts using mass follow-unfollow scripts. Comment-to-DM triggers are 100% safe." }
    ],
    steps: [
      { step: 1, title: "Enter Daily Action Count", desc: "Input your current manual or automated follow actions." },
      { step: 2, title: "Calculate Shadowban Risk", desc: "View your risk score and safe transition plan to Cacto." }
    ],
    usecases: ["Gray-Hat Bot Risk Evaluation", "Account Health Recovery"],
    benefits: ["Avoid account termination", "Transition to safe organic DM growth"],
    deviceGuide: { mobile: "Calculate action risk on mobile.", desktop: "Download complete profile recovery guide on desktop." },
    comparison: { feature: "Growth Method", cacto: "Organic Comment-to-DM Triggers", traditional: "Spammy Gray-Hat Follow Bots" }
  },
  {
    slug: "shopify-abandoned-cart-dm-recovery-calculator",
    title: "Shopify Cart Abandonment Instagram DM Recovery ROI Calculator",
    description: "Project recovered monthly revenue and conversion rates from sending automated Instagram DMs to Shopify cart abandoners.",
    category: "Calculators",
    icon: "ShoppingCart",
    faqs: [
      { q: "What is the open rate of Instagram DM cart recovery messages?", a: "Instagram DM recovery messages achieve 80%+ open rates, compared to 15%-20% for standard cart recovery emails." }
    ],
    steps: [
      { step: 1, title: "Enter Monthly Store Sessions", desc: "Input your Shopify traffic and average order value." },
      { step: 2, title: "Calculate Recovered Revenue", desc: "View projected monthly cart recovery dollars." }
    ],
    usecases: ["E-Commerce Revenue Optimization", "Shopify Store Scaling"],
    benefits: ["Recover 25%+ lost checkouts", "Bypass crowded email inboxes"],
    deviceGuide: { mobile: "Calculate store ROI on mobile.", desktop: "Connect Cacto Shopify webhook on desktop." },
    comparison: { feature: "Open Rates", cacto: "80%+ Instant Push DM Open Rate", traditional: "15-20% Cluttered Email Open Rate" }
  },
  {
    slug: "klaviyo-dm-webhook-payload-builder-tool",
    title: "Klaviyo & ESP DM Webhook JSON Payload Generator",
    description: "Build custom JSON webhook payloads to stream Instagram DM lead captures directly into Klaviyo, ConvertKit, and Mailchimp.",
    category: "Generators",
    icon: "Code",
    faqs: [
      { q: "Do I need coding experience to connect Cacto to Klaviyo?", a: "No! Cacto's visual webhook generator builds the exact JSON payload for you in one click." }
    ],
    steps: [
      { step: 1, title: "Select ESP Platform", desc: "Choose Klaviyo, ConvertKit, or Mailchimp." },
      { step: 2, title: "Generate Payload", desc: "Instantly copy formatted webhook JSON." }
    ],
    usecases: ["Email List Automation", "Real-Time Lead Syncing"],
    benefits: ["Instant 1-second list sync", "Zero data entry errors"],
    deviceGuide: { mobile: "Copy webhook payload on mobile.", desktop: "Test live API webhooks on desktop." },
    comparison: { feature: "Data Sync Speed", cacto: "Real-Time Webhook Stream", traditional: "Manual CSV Upload Exporting" }
  },
  {
    slug: "high-ticket-coaching-dm-qualifier-builder",
    title: "4-Step High-Ticket Coaching DM Qualifier Script Builder",
    description: "Build automated 4-question qualification sequences to filter tire-kickers and book $5k+ coaching clients in DMs.",
    category: "Generators",
    icon: "Target",
    faqs: [
      { q: "How many questions should be in a DM qualification flow?", a: "Keep qualification flows to 2-3 high-impact questions to maintain conversation momentum before delivering your booking link." }
    ],
    steps: [
      { step: 1, title: "Enter High-Ticket Offer", desc: "Input your program name and price point." },
      { step: 2, title: "Generate Qualifying Script", desc: "Get 4 automated DM qualifying questions." }
    ],
    usecases: ["High-Ticket Sales Automation", "Discovery Call Filtering"],
    benefits: ["Filter unqualified leads", "Increase discovery call closing rates"],
    deviceGuide: { mobile: "Copy qualifying scripts on mobile.", desktop: "Deploy complete automated qualifying flow on desktop." },
    comparison: { feature: "Lead Quality", cacto: "Automated 4-Question Filtering", traditional: "Unfiltered Unqualified Calls" }
  },
  {
    slug: "course-creator-reel-to-course-sale-calculator",
    title: "Course Creator Reel-to-DM Sales & Earnings Projector",
    description: "Calculate expected course sales, student enrollment numbers, and revenue generated from automated DM triggers.",
    category: "Calculators",
    icon: "GraduationCap",
    faqs: [
      { q: "How do course creators sell $997 courses on Instagram Reels?", a: "Course creators use short case study Reels with comment triggers like COURSE, sending interested viewers a 5-minute video and direct checkout link in DMs." }
    ],
    steps: [
      { step: 1, title: "Enter Course Price", desc: "Input your course price ($97 to $997+)." },
      { step: 2, title: "Project Launch Revenue", desc: "Calculate total projected student sales." }
    ],
    usecases: ["Digital Course Launches", "Creator Funnel Forecasting"],
    benefits: ["Forecast launch revenue", "Optimize Reel CTA conversion"],
    deviceGuide: { mobile: "Project launch earnings on mobile.", desktop: "Export launch funnel model on desktop." },
    comparison: { feature: "Course Sales Friction", cacto: "Direct Inbox Video & Checkout", traditional: "Multi-Step Bio Link Navigation" }
  },
  {
    slug: "click-to-dm-ad-roas-calculator-tool",
    title: "Instagram Click-to-DM Paid Ad CPL & ROAS Calculator",
    description: "Calculate cost-per-lead, conversion rates, and return on ad spend for Meta Click-to-Instagram DM ad campaigns.",
    category: "Calculators",
    icon: "PieChart",
    faqs: [
      { q: "Are Click-to-DM ads cheaper than web lead generation ads?", a: "Yes, Click-to-DM ads typically achieve 30%-50% lower cost-per-lead because users remain inside the native Instagram app." }
    ],
    steps: [
      { step: 1, title: "Enter Monthly Ad Spend", desc: "Input your Meta ad budget and target CPC." },
      { step: 2, title: "Calculate ROAS", desc: "View your projected cost-per-lead and return on investment." }
    ],
    usecases: ["Paid Ad Campaign Planning", "Meta Ads Optimization"],
    benefits: ["Lower cost per acquired lead", "Maximize return on ad spend"],
    deviceGuide: { mobile: "Calculate ad ROAS on mobile.", desktop: "Download ad copy & CTA templates on desktop." },
    comparison: { feature: "Cost Per Lead", cacto: "30-50% Lower CPL In-App", traditional: "High-Cost External Landing Pages" }
  },
  {
    slug: "story-poll-vote-auto-dm-script-generator",
    title: "Instagram Story Poll Vote & Quiz Auto-DM Script Builder",
    description: "Create automated DM response scripts triggered when followers vote on your Instagram Story polls or quizzes.",
    category: "Generators",
    icon: "HelpCircle",
    faqs: [
      { q: "Can I send different DMs based on which option a follower votes?", a: "Yes! Cacto allows you to set custom response rules depending on whether a follower votes Option A or Option B." }
    ],
    steps: [
      { step: 1, title: "Enter Story Poll Question", desc: "Input your poll topic and vote choices." },
      { step: 2, title: "Generate Segmented DMs", desc: "Get custom follow-up DM copy for each option." }
    ],
    usecases: ["Story Audience Segmentation", "Interactive Lead Capture"],
    benefits: ["Segment audience by interest", "High-conversion 1-on-1 DMs"],
    deviceGuide: { mobile: "Copy story scripts on mobile.", desktop: "Set multi-option story triggers on desktop." },
    comparison: { feature: "Story Monetization", cacto: "Segmented Vote Auto-DMs", traditional: "Unmonetized Story Votes" }
  },
  {
    slug: "re-engagement-dm-script-writer-tool",
    title: "Cold Prospect Re-Engagement DM Script Writer",
    description: "Write empathetic follow-up DM scripts to re-engage cold prospects, unread leads, and abandoned conversations.",
    category: "Generators",
    icon: "RefreshCw",
    faqs: [
      { q: "When should I send a follow-up DM to a prospect?", a: "Send your first follow-up 24 hours after initial contact if the prospect hasn't clicked your link or responded." }
    ],
    steps: [
      { step: 1, title: "Select Re-Engagement Goal", desc: "Choose Check-In, Special Offer, or Resource." },
      { step: 2, title: "Generate Follow-Up Scripts", desc: "Get 5 non-pushy, high-converting re-engagement DMs." }
    ],
    usecases: ["Sales Prospect Follow-Up", "Unread DM Recovery"],
    benefits: ["Revive cold conversations", "Increase final conversion rates"],
    deviceGuide: { mobile: "Copy follow-up text on mobile.", desktop: "Automate 24-hour follow-up sequences on desktop." },
    comparison: { feature: "Follow-Up Efficiency", cacto: "Automated Non-Pushy Re-Engagement", traditional: "Forgotten Unread Leads" }
  },
  {
    slug: "curiosity-gap-reel-hook-creator-tool",
    title: "3-Second Curiosity Gap Reel Hook Generator",
    description: "Generate 25 viral curiosity gap text overlay hooks designed to maximize 3-second view retention and Reel comments.",
    category: "Generators",
    icon: "Eye",
    faqs: [
      { q: "What makes a video hook curiosity gap driven?", a: "Curiosity gap hooks tease a compelling transformation or secret without revealing the answer until the caption or DM." }
    ],
    steps: [
      { step: 1, title: "Input Your Niche & Topic", desc: "Type your topic (e.g. Real Estate, Fitness, SaaS)." },
      { step: 2, title: "Generate 25 Hooks", desc: "Instantly view 25 scroll-stopping text overlay scripts." }
    ],
    usecases: ["Reel Script Writing", "Short-Form Video Production"],
    benefits: ["Double 3-second retention", "Drive explosive comment velocity"],
    deviceGuide: { mobile: "Copy overlay hooks on mobile.", desktop: "Export 30-day video hook vault on desktop." },
    comparison: { feature: "View Retention", cacto: "25 Proven Curiosity Gap Formulas", traditional: "Boring Generic Intros" }
  },
  {
    slug: "instagram-bio-link-leakage-simulator-tool",
    title: "Link-in-Bio vs. Auto-DM Revenue Leakage Simulator",
    description: "Simulate audience drop-off and calculate lost monthly sales revenue caused by traditional link-in-bio pages.",
    category: "Calculators",
    icon: "TrendingDown",
    faqs: [
      { q: "How much traffic do link-in-bio pages lose?", a: "Link-in-bio pages lose 60%-70% of potential leads due to multi-step navigation friction." }
    ],
    steps: [
      { step: 1, title: "Input Monthly Profile Clicks", desc: "Enter your bio link traffic and product price." },
      { step: 2, title: "View Lost Revenue", desc: "Calculate exact dollars lost to bio link friction." }
    ],
    usecases: ["Bio Link Conversion Auditing", "Funnel Optimization"],
    benefits: ["Identify hidden sales leaks", "Upgrade to zero-friction DMs"],
    deviceGuide: { mobile: "Simulate leakage on mobile.", desktop: "Export full conversion audit on desktop." },
    comparison: { feature: "Lead Retention", cacto: "Zero Navigation Drop-Off", traditional: "70% Bio Link Traffic Leakage" }
  },
  {
    slug: "manychat-pricing-contact-cap-calculator",
    title: "ManyChat vs. Cacto Contact Cap Savings Calculator",
    description: "Calculate your exact monthly dollar savings by switching from ManyChat's contact-tier pricing to Cacto.",
    category: "Calculators",
    icon: "DollarSign",
    faqs: [
      { q: "How does ManyChat's pricing compare to Cacto?", a: "ManyChat increases monthly fees as your contact list grows, whereas Cacto includes unlimited contacts on core plans." }
    ],
    steps: [
      { step: 1, title: "Enter ManyChat Subscriber Count", desc: "Input your active subscriber count." },
      { step: 2, title: "Calculate Yearly Savings", desc: "View your total cost savings using Cacto." }
    ],
    usecases: ["Software Budget Optimization", "Platform Migration"],
    benefits: ["Save up to $1,000+ per year", "Unlimited contact growth"],
    deviceGuide: { mobile: "Calculate savings on mobile.", desktop: "Export platform comparison breakdown on desktop." },
    comparison: { feature: "Contact Tier Fees", cacto: "Unlimited Free Contacts", traditional: "Escalating Monthly Penalties" }
  },
  {
    slug: "meta-24hr-window-policy-auditor-tool",
    title: "Meta 24-Hour Messaging Policy & Tag Auditor",
    description: "Audit your DM templates for compliance with Meta's 24-hour messaging window and approved Message Tags.",
    category: "Utility",
    icon: "Shield",
    faqs: [
      { q: "What is the Meta 24-hour messaging rule?", a: "Businesses can send automated DMs within 24 hours of a user's interaction. Outside 24 hours, specific Message Tags or human agent tags are required." }
    ],
    steps: [
      { step: 1, title: "Paste DM Script", desc: "Input your automated DM text." },
      { step: 2, title: "Verify Tag Compliance", desc: "Receive instant policy breakdown." }
    ],
    usecases: ["Meta Compliance Verification", "Message Tag Auditing"],
    benefits: ["Protect account from policy flags", "Ensure 100% API compliance"],
    deviceGuide: { mobile: "Audit DM text on mobile.", desktop: "Manage 24-hour window rules on desktop." },
    comparison: { feature: "Policy Verification", cacto: "Automated 24-Hour Window Logic", traditional: "Risky Policy-Violating Messages" }
  },
  {
    slug: "comment-reply-rotator-pool-creator-tool",
    title: "10-Variation Comment Reply Rotator Pool Generator",
    description: "Generate 10 unique, natural public comment reply variations to maintain 100% Meta Graph API anti-spam safety.",
    category: "Generators",
    icon: "Repeat",
    faqs: [
      { q: "Why should I rotate public comment replies?", a: "Posting the exact same public comment hundreds of times triggers Meta spam algorithms. Rotation ensures 100% safety." }
    ],
    steps: [
      { step: 1, title: "Enter Base Message", desc: "Input your primary response (e.g. Sent to DMs!)." },
      { step: 2, title: "Generate 10 Rotations", desc: "Get 10 distinct, natural comment variations." }
    ],
    usecases: ["Anti-Spam Safety", "Comment Rotator Pool Setup"],
    benefits: ["100% Anti-Spam Safe", "Natural conversational variation"],
    deviceGuide: { mobile: "Copy reply variations on mobile.", desktop: "Import 10-pool rotator into Cacto on desktop." },
    comparison: { feature: "Reply Variation", cacto: "10 Distinct AI Rotations", traditional: "Single Static Text Spam" }
  },
  {
    slug: "meta-graph-api-call-rate-calculator-tool",
    title: "Meta Graph API App Call Rate & Usage Calculator",
    description: "Calculate your app's Meta Graph API call rate percentage and model high-traffic webhook performance.",
    category: "Calculators",
    icon: "Cpu",
    faqs: [
      { q: "What is Meta's Graph API call rate limit?", a: "Meta limits app calls to 200 calls per user per hour. Cacto handles rate limiting automatically behind the scenes." }
    ],
    steps: [
      { step: 1, title: "Enter Peak Hourly Comments", desc: "Input your expected viral traffic." },
      { step: 2, title: "Calculate Call Rate %", desc: "View your projected API usage." }
    ],
    usecases: ["Developer API Sizing", "High-Traffic Webhook Auditing"],
    benefits: ["Prevent API throttling", "Ensure 100% uptime"],
    deviceGuide: { mobile: "Check API usage on mobile.", desktop: "Configure webhook worker queues on desktop." },
    comparison: { feature: "Rate Limit Management", cacto: "Automated Webhook Throttling", traditional: "Unthrottled API Crashes" }
  },
  {
    slug: "banned-hashtag-realtime-checker-tool",
    title: "Real-Time Banned Instagram Hashtag & Flagged Keyword Scanner",
    description: "Scan your hashtag sets in real time for banned, restricted, or shadowbanned Instagram keywords.",
    category: "Utility",
    icon: "Search",
    faqs: [
      { q: "What happens if I use a banned hashtag on Instagram?", a: "Using even a single banned hashtag can hide your post from non-followers and cause account-wide reach penalties." }
    ],
    steps: [
      { step: 1, title: "Paste Hashtag Block", desc: "Input up to 30 hashtags." },
      { step: 2, title: "Scan for Flags", desc: "Instantly highlight safe vs. banned keywords." }
    ],
    usecases: ["Hashtag Set Auditing", "Shadowban Prevention"],
    benefits: ["Keep reach 100% clean", "Avoid hidden keyword bans"],
    deviceGuide: { mobile: "Scan hashtags on mobile before posting.", desktop: "Clean bulk hashtag vaults on desktop." },
    comparison: { feature: "Hashtag Safety", cacto: "Real-Time Flagged Database", traditional: "Unverified Guesswork" }
  },
  {
    slug: "welcome-dm-velocity-throttle-calculator-tool",
    title: "Welcome DM Speed & Safe Hourly Throttle Calculator",
    description: "Calculate safe hourly Welcome DM limits for new followers and optimize automated onboarding speeds.",
    category: "Calculators",
    icon: "Zap",
    faqs: [
      { q: "How many Welcome DMs can I send per hour safely?", a: "Sending 20-40 Welcome DMs per hour with randomized delay buffers maintains complete Meta safety." }
    ],
    steps: [
      { step: 1, title: "Input Daily New Followers", desc: "Enter your average daily follower growth." },
      { step: 2, title: "Calculate Safe Throttle", desc: "View recommended hourly delivery caps." }
    ],
    usecases: ["New Follower Onboarding", "Welcome DM Automation"],
    benefits: ["Safely onboard new followers", "Zero action blocks"],
    deviceGuide: { mobile: "Calculate DM speed on mobile.", desktop: "Set Welcome DM triggers on desktop." },
    comparison: { feature: "Delivery Throttling", cacto: "Randomized Speed Throttling", traditional: "Instant Unnatural Spikes" }
  },
  {
    slug: "agency-discovery-call-dm-booking-tool",
    title: "Agency Client Discovery Call DM Booking Calculator",
    description: "Project monthly agency client bookings, pipeline revenue, and call conversion rates from automated DMs.",
    category: "Calculators",
    icon: "Briefcase",
    faqs: [
      { q: "How do agencies use Instagram DMs to book retainer clients?", a: "Agencies publish Reel breakdowns of client results, prompting viewers to comment AUDIT to receive a custom review and calendar link in DMs." }
    ],
    steps: [
      { step: 1, title: "Enter Retainer Price", desc: "Input your monthly client retainer ($2k to $10k+)." },
      { step: 2, title: "Project Retainer Revenue", desc: "Calculate new monthly recurring revenue." }
    ],
    usecases: ["Agency Client Acquisition", "Retainer Revenue Forecasting"],
    benefits: ["Book qualified client calls", "Automate agency outreach"],
    deviceGuide: { mobile: "Calculate agency revenue on mobile.", desktop: "Export client acquisition model on desktop." },
    comparison: { feature: "Agency Lead Capture", cacto: "Automated DM Audit Delivery", traditional: "Cold Unwanted Email Pitching" }
  },
  {
    slug: "sponsored-reel-brand-deal-rate-calculator-tool",
    title: "Sponsored Reel & Creator Brand Deal Rate Sheet Calculator",
    description: "Calculate your commercial value for sponsored Reels, Story mentions, and DM trigger add-ons based on reach.",
    category: "Calculators",
    icon: "Award",
    faqs: [
      { q: "How do I charge brands for DM automation triggers?", a: "Offer brands an add-on fee ($200-$500+) to include a dedicated comment trigger keyword that delivers their promo code directly to your followers' DMs." }
    ],
    steps: [
      { step: 1, title: "Enter Average Reel Views", desc: "Input your 30-day average video views." },
      { step: 2, title: "Calculate Sponsored Rates", desc: "View baseline and premium DM add-on pricing." }
    ],
    usecases: ["Brand Deal Negotiations", "Media Kit Rate Setting"],
    benefits: ["Charge premium brand deal rates", "Monetize DM trigger add-ons"],
    deviceGuide: { mobile: "Calculate rates on mobile.", desktop: "Export formal brand rate card on desktop." },
    comparison: { feature: "Monetization Add-Ons", cacto: "Dedicated DM Trigger Bundles", traditional: "Standard Video Only" }
  },
  {
    slug: "creator-monthly-mrr-forecast-calculator-tool",
    title: "Instagram Creator Monthly Recurring Revenue Forecast Tool",
    description: "Forecast monthly recurring revenue from Instagram subscriptions, digital products, and DM sales funnels.",
    category: "Calculators",
    icon: "DollarSign",
    faqs: [
      { q: "How do creators build recurring MRR on Instagram?", a: "Creators combine Instagram Subscriptions with automated DM digital product upsells to generate stable monthly income." }
    ],
    steps: [
      { step: 1, title: "Enter Subscription Price", desc: "Input your monthly fee ($4.99 to $49.99)." },
      { step: 2, title: "Project Annual MRR", desc: "Calculate total recurring monthly revenue." }
    ],
    usecases: ["Creator Business Planning", "MRR Forecasting"],
    benefits: ["Build predictable revenue", "Track subscriber lifetime value"],
    deviceGuide: { mobile: "Forecast MRR on mobile.", desktop: "Export full financial model on desktop." },
    comparison: { feature: "Revenue Stability", cacto: "Predictable Subscription & DM Sales", traditional: "Unpredictable Ad Revenue" }
  },
  {
    slug: "reels-monetization-bonus-rpm-estimator-tool",
    title: "Meta Reels Play Bonus Payout & RPM Estimator",
    description: "Estimate monthly payouts from the Meta Reels Play Bonus program based on view counts and RPM tiers.",
    category: "Calculators",
    icon: "Play",
    faqs: [
      { q: "How much does Meta pay per 100,000 Reel views?", a: "Reels Play Bonus RPMs range from $0.20 to $0.80+ per 1,000 views, depending on niche and audience country." }
    ],
    steps: [
      { step: 1, title: "Enter Monthly Reel Views", desc: "Input your total 30-day views." },
      { step: 2, title: "View Estimated Payout", desc: "Calculate projected bonus earnings." }
    ],
    usecases: ["Reels Bonus Optimization", "Creator Income Tracking"],
    benefits: ["Estimate bonus earnings", "Identify highest RPM content"],
    deviceGuide: { mobile: "Check bonus earnings on mobile.", desktop: "Export view performance data on desktop." },
    comparison: { feature: "Payout Tracking", cacto: "Accurate RPM Tier Modeling", traditional: "Opaque Uncalculated Estimates" }
  },
  {
    slug: "story-retention-dropoff-calculator-tool",
    title: "Instagram Story Series Retention & View Drop-Off Calculator",
    description: "Calculate audience retention across multi-part Story series and optimize posting sequences for maximum views.",
    category: "Calculators",
    icon: "Layers",
    faqs: [
      { q: "How many Stories should I post in a sequence?", a: "A 3-5 Story sequence maintains highest viewer retention while providing ample opportunity to introduce DM triggers." }
    ],
    steps: [
      { step: 1, title: "Enter Story 1 Views", desc: "Input views for your initial Story." },
      { step: 2, title: "Enter Final Story Views", desc: "Calculate retention % and drop-off points." }
    ],
    usecases: ["Story Sequence Planning", "Audience Retention Auditing"],
    benefits: ["Identify story drop-off", "Keep 80%+ viewer retention"],
    deviceGuide: { mobile: "Calculate retention on mobile.", desktop: "Analyze multi-story performance on desktop." },
    comparison: { feature: "Retention Analysis", cacto: "Multi-Part Story Drop-Off Calculator", traditional: "Single View Count Only" }
  },
  {
    slug: "broadcast-channel-open-rate-estimator-tool",
    title: "Broadcast Channel DM Open & Click Rate Estimator",
    description: "Estimate audience reach, open rates, and link click-throughs for Instagram Broadcast Channel announcements.",
    category: "Calculators",
    icon: "Radio",
    faqs: [
      { q: "What is the average open rate of an Instagram Broadcast Channel?", a: "Broadcast Channels achieve 40%-60% open rates because notifications land directly in subscribers' DM feeds." }
    ],
    steps: [
      { step: 1, title: "Enter Channel Members", desc: "Input your total broadcast subscribers." },
      { step: 2, title: "View Projected Clicks", desc: "Calculate expected traffic and offer conversions." }
    ],
    usecases: ["Broadcast Channel Monetization", "VIP Audience Outreach"],
    benefits: ["Monetize broadcast members", "Drive instant click spikes"],
    deviceGuide: { mobile: "Check broadcast reach on mobile.", desktop: "Combine Broadcast Channels with Cacto DMs on desktop." },
    comparison: { feature: "Broadcast Reach", cacto: "Direct DM Push Notification", traditional: "Low-Reach Organic Feed Posts" }
  },
  {
    slug: "creator-lead-magnet-title-generator-tool",
    title: "10-Niche Creator PDF Lead Magnet Idea Generator",
    description: "Generate 10 high-converting lead magnet title ideas and PDF frameworks tailored to your specific creator niche.",
    category: "Generators",
    icon: "BookOpen",
    faqs: [
      { q: "What type of lead magnet converts best on Instagram Reels?", a: "Short, actionable 1-page cheat sheets, resource lists, or template vaults convert best when paired with single-word comment triggers." }
    ],
    steps: [
      { step: 1, title: "Select Creator Niche", desc: "Choose Business, Fitness, Tech, Lifestyle, etc." },
      { step: 2, title: "Generate 10 Lead Magnets", desc: "Get 10 viral lead magnet titles and outlines." }
    ],
    usecases: ["Lead Magnet Creation", "Email List Building"],
    benefits: ["High-converting freebie ideas", "Pair perfectly with Cacto DMs"],
    deviceGuide: { mobile: "Copy lead magnet ideas on mobile.", desktop: "Export full PDF creation guide on desktop." },
    comparison: { feature: "Lead Magnet Value", cacto: "Single-Page Actionable Cheat Sheets", traditional: "Bloated Unread 50-Page Ebooks" }
  },
  {
    slug: "collab-post-reach-multiplier-tool",
    title: "Collab Post Reach & Dual-Audience Follower Gain Projector",
    description: "Calculate expected view multiplication, dual-audience reach, and follower growth from Instagram Collab posts.",
    category: "Calculators",
    icon: "Users",
    faqs: [
      { q: "How do Collab posts increase Reel view reach?", a: "Collab posts publish the Reel simultaneously to both creators' profile feeds, combining audience engagement signals." }
    ],
    steps: [
      { step: 1, title: "Enter Partner Follower Count", desc: "Input collaborator's audience size." },
      { step: 2, title: "Project Combined Reach", desc: "Calculate estimated total Reel views." }
    ],
    usecases: ["Creator Collaboration Planning", "Cross-Audience Growth"],
    benefits: ["Double organic Reel reach", "Cross-pollinate engaged followers"],
    deviceGuide: { mobile: "Calculate collab reach on mobile.", desktop: "Plan joint DM trigger campaigns on desktop." },
    comparison: { feature: "Audience Distribution", cacto: "Combined Dual-Profile Distribution", traditional: "Single Profile Reach" }
  },
  {
    slug: "instagram-bio-seo-searchability-auditor-tool",
    title: "Instagram Profile Bio SEO & Searchability Auditor",
    description: "Audit your Instagram bio name, keywords, and category tags for maximum searchability in Meta search engines.",
    category: "Utility",
    icon: "Search",
    faqs: [
      { q: "How do I optimize my Instagram profile for search?", a: "Include your primary keyword (e.g. 'Fitness Coach' or 'DM Automation') in your Instagram Name field, as Meta indexes this field for search queries." }
    ],
    steps: [
      { step: 1, title: "Enter Current Bio Name & Text", desc: "Input your profile handle and bio." },
      { step: 2, title: "View SEO Score", desc: "Receive instant keyword density recommendations." }
    ],
    usecases: ["Profile Search Optimization", "Organic Search Discovery"],
    benefits: ["Rank higher in Meta search", "Convert profile visitors"],
    deviceGuide: { mobile: "Audit bio SEO on mobile.", desktop: "Download complete profile optimization guide on desktop." },
    comparison: { feature: "Search Indexing", cacto: "Indexed Keyword Name Optimization", traditional: "Unsearchable Profile Handles" }
  },
  {
    slug: "cacto-master-growth-suite-roi-calculator",
    title: "Cacto Total Creator Suite ROI & Conversion Master Calculator",
    description: "Calculate total monthly revenue, email list growth, and complete ROI generated by Cacto's growth tools.",
    category: "Calculators",
    icon: "Zap",
    faqs: [
      { q: "What total ROI can I expect using Cacto?", a: "Creators using Cacto typically see a 3x–10x increase in monthly leads and automated sales within 30 days of setup." }
    ],
    steps: [
      { step: 1, title: "Enter Total Social Reach", desc: "Input your monthly views across all posts." },
      { step: 2, title: "Calculate Master ROI", desc: "View your total projected monthly business growth." }
    ],
    usecases: ["Complete Business Growth Analysis", "Platform Value Verification"],
    benefits: ["Track full social business ROI", "Optimize every funnel step"],
    deviceGuide: { mobile: "Calculate master ROI on mobile.", desktop: "Export full executive growth report on desktop." },
    comparison: { feature: "Total Suite Value", cacto: "57 Free Tools + 100% Meta Safe Engine", traditional: "Fragmented Expensive Utilities" }
  }
];

let content = fs.readFileSync(toolsDataPath, 'utf8');

// Append new tools to freeToolsList array before the closing bracket
const lastIndex = content.lastIndexOf(']');
if (lastIndex !== -1) {
  const formattedNewTools = newTools.map(t => JSON.stringify(t, null, 2)).join(',\n');
  const updatedContent = content.slice(0, lastIndex) + ',\n' + formattedNewTools + '\n' + content.slice(lastIndex);
  fs.writeFileSync(toolsDataPath, updatedContent, 'utf8');
  console.log(`✅ Successfully appended 43 new growth tools (Tools 58-100) to toolsData.ts! Total tools is now 100.`);
} else {
  console.error(`❌ Could not find closing bracket in toolsData.ts`);
  process.exit(1);
}

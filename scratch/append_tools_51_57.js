const fs = require('fs');
const path = require('path');

const toolsDataPath = path.join(__dirname, '..', 'src', 'utils', 'toolsData.ts');
let fileContent = fs.readFileSync(toolsDataPath, 'utf8');

const newTools = [
  {
    slug: "manychat-vs-cacto-roi-calculator",
    title: "ManyChat vs. Cacto ROI & Cost Savings Calculator",
    description: "Calculate how much money you save on ManyChat's ascending contact database tiers compared to Cacto's flat creator pricing.",
    category: "Calculators",
    icon: "Calculator",
    faqs: [
      { q: "How does ManyChat's contact-based pricing work?", a: "ManyChat bills based on the total number of contacts stored in your account. As your follower list grows, your monthly bill automatically increases to higher pricing tiers." },
      { q: "Why is Cacto's flat pricing better for growing creators?", a: "Cacto provides flat creator pricing without contact limits, ensuring your software expenses stay predictable regardless of viral Reel growth." },
      { q: "How are annual cost savings calculated?", a: "We compare ManyChat's monthly contact tier rate against Cacto's flat monthly plan across a 12-month period." },
      { q: "Does Cacto limit the number of comments or DMs I can trigger?", a: "No, Cacto includes unlimited comment triggers and DM link dispatches on flat plans." }
    ],
    steps: [
      { step: 1, title: "Enter Current Contacts", desc: "Input your estimated total subscriber or contact list size." },
      { step: 2, title: "Set Monthly Growth Rate", desc: "Specify expected monthly follower and lead growth percentage." },
      { step: 3, title: "Compare Pricing Tiers", desc: "View side-by-side cost projections for ManyChat vs. Cacto." },
      { step: 4, title: "Calculate Net Savings", desc: "See your exact annual dollars saved and ROI multiplier." }
    ],
    usecases: [
      "Evaluating ManyChat Alternatives for 2026",
      "Calculating SaaS Budgeting for Creator Business",
      "Agency Client Software Cost Optimization",
      "Viral Reel Campaign Lead Cost Forecasting"
    ],
    benefits: [
      "Instant 12-Month Software Cost Projection",
      "Zero Contact Limit Penalty Modeling",
      "Clear Net Dollar Savings Breakdown",
      "100% Meta Graph API Compliant Comparison"
    ],
    deviceGuide: {
      mobile: "Interactive sliders for real-time contact adjustment.",
      desktop: "Full 12-month side-by-side cost projection table."
    },
    comparison: {
      feature: "Pricing Model",
      cacto: "Flat Creator Rate (No Contact Penalties)",
      traditional: "Escalating Contact Database Tiers"
    },
    seoKeywords: ["manychat pricing calculator", "manychat vs cacto cost", "instagram automation pricing", "manychat alternatives cost comparison"]
  },

  {
    slug: "klaviyo-dm-webhook-builder",
    title: "Klaviyo & ESP DM Webhook Schema Generator",
    description: "Build and validate custom JSON webhook schemas to sync Instagram DM leads directly into Klaviyo, ConvertKit, or Mailchimp.",
    category: "Utility",
    icon: "Code",
    faqs: [
      { q: "What is an outbound DM webhook payload?", a: "An HTTP POST JSON payload sent by Cacto whenever a user provides their email or triggers a DM lead magnet." },
      { q: "Which ESPs are supported by Cacto webhooks?", a: "Cacto webhooks connect with Klaviyo, ConvertKit, Mailchimp, HubSpot, ActiveCampaign, and GoHighLevel." },
      { q: "Can I map custom fields like Instagram handle?", a: "Yes, you can map email, first_name, ig_handle, trigger_keyword, and source Reel URL." },
      { q: "How do I test my webhook endpoint?", a: "Use our built-in cURL test generator or Webhook.site preview URL to verify payloads." }
    ],
    steps: [
      { step: 1, title: "Select ESP Platform", desc: "Choose Klaviyo, ConvertKit, Mailchimp, or Custom REST API." },
      { step: 2, title: "Input Target List ID", desc: "Enter your ESP subscriber list key or API endpoint." },
      { step: 3, title: "Select Data Fields", desc: "Check fields to include: email, name, handle, trigger." },
      { step: 4, title: "Generate JSON Payload", desc: "Copy the formatted JSON schema or cURL command in 1 click." }
    ],
    usecases: [
      "Integrating Instagram DMs with Klaviyo Flows",
      "Syncing Lead Magnets to ConvertKit Sequences",
      "Building Custom Webhook Endpoints in Zapier",
      "Automating Email Capture inside Instagram Chat"
    ],
    benefits: [
      "Valid JSON Schema Formatting",
      "1-Click Code Copy to Clipboard",
      "Supports All Major ESP Platforms",
      "Includes cURL Test Terminal Commands"
    ],
    deviceGuide: {
      mobile: "Simple field selector with copy payload button.",
      desktop: "Side-by-side JSON syntax editor and terminal cURL preview."
    },
    comparison: {
      feature: "ESP Webhook Sync",
      cacto: "Real-Time Direct JSON Webhooks",
      traditional: "Manual CSV Exports or Paid Zapier Middleware"
    },
    seoKeywords: ["klaviyo instagram dm webhook", "convertkit instagram webhook schema", "instagram dm lead capture klaviyo", "cacto webhook builder"]
  },

  {
    slug: "ecommerce-dm-roi-calculator",
    title: "Shopify & Ecommerce DM Recovery ROI Projector",
    description: "Project monthly revenue gained by replacing bio link trees with instant Reel comment coupon codes and automated DM checkout links.",
    category: "Calculators",
    icon: "DollarSign",
    faqs: [
      { q: "How does comment-to-DM automation increase ecommerce sales?", a: "By sending discount codes directly to customer inboxes in under 3 seconds upon receiving a comment." },
      { q: "What is the average click-through rate for auto-DMs vs. bio links?", a: "Auto-DMs yield a 35%-50% CTR compared to 2%-5% for profile bio link trees." },
      { q: "How is recovered revenue calculated?", a: "We calculate incremental checkout conversions generated by auto-DM links over traditional bio link drop-offs." },
      { q: "Can I deliver personalized Shopify discount codes?", a: "Yes, Cacto integrates with Shopify to generate dynamic discount links." }
    ],
    steps: [
      { step: 1, title: "Input Average Order Value", desc: "Enter your store's AOV in dollars ($)." },
      { step: 2, title: "Enter Monthly Reel Views", desc: "Specify total monthly impressions across product Reels." },
      { step: 3, title: "Set Comment Conversion %", desc: "Estimate percentage of viewers who comment your trigger keyword." },
      { step: 4, title: "View Revenue Uplift", desc: "See projected monthly sales lift and ROI multiplier." }
    ],
    usecases: [
      "Shopify Store Reel Monetization Planning",
      "Ecommerce Abandoned Cart DM Recovery",
      "Product Launch Comment Keyword Campaigns",
      "Link-in-Bio vs. Auto-DM Sales Conversion Audit"
    ],
    benefits: [
      "Accurate Revenue Recovery Modeling",
      "Side-by-Side Bio Link vs. Auto-DM Comparison",
      "Calculates Net Profit Lift & ROI",
      "Tailored for Shopify & WooCommerce Brands"
    ],
    deviceGuide: {
      mobile: "Quick input fields with visual ROI callout cards.",
      desktop: "Interactive revenue projection chart and conversion table."
    },
    comparison: {
      feature: "Checkout Flow",
      cacto: "Sub-3s DM Delivery Direct to Checkout",
      traditional: "Multi-Step Profile Bio Link Friction"
    },
    seoKeywords: ["shopify instagram dm roi calculator", "ecommerce dm automation revenue", "instagram reel comment checkout conversion", "auto dm sales projector"]
  },

  {
    slug: "real-estate-reel-cta-generator",
    title: "Real Estate Reel CTA & Listing DM Generator",
    description: "Generate property-specific video overlay hooks, spoken audio outros, comment keyword triggers, and qualifying DM scripts for realtors.",
    category: "Generators",
    icon: "Building",
    faqs: [
      { q: "Why use comment triggers on real estate Reels?", a: "Prompting viewers to comment 'TOUR' or 'PRICE' generates high-intent buyer leads directly in your inbox." },
      { q: "What qualifying questions should I ask in DMs?", a: "Ask about buying timeline, budget range, and mortgage pre-approval status before routing to a phone call." },
      { q: "How do overlay text hooks increase comments?", a: "Clear curiosity-gap overlay text tells viewers exactly what keyword to comment for listing details." },
      { q: "Can I export these scripts to my CRM?", a: "Yes, Cacto passes real estate buyer leads to your real estate CRM via webhooks." }
    ],
    steps: [
      { step: 1, title: "Select Property Type", desc: "Choose Luxury Single Family, Condo, or Commercial." },
      { step: 2, title: "Input City & Price", desc: "Enter listing location and price point." },
      { step: 3, title: "Choose Offer Asset", desc: "Select Floorplan PDF, Virtual Tour, or Open House RSVP." },
      { step: 4, title: "Generate Full Campaign", desc: "Get video text overlays, spoken script, & 3-step DM sequence." }
    ],
    usecases: [
      "Instagram Reel Lead Capture for Real Estate Agents",
      "Property Tour Video Caption & CTA Copywriting",
      "Automating Open House RSVP Confirmation DMs",
      "Qualifying Home Buyers Inside Instagram Chat"
    ],
    benefits: [
      "Property-Specific Reel Overlay Text",
      "Spoken Video Outro Audio Scripts",
      "3-Step Lead Qualifying DM Sequence",
      "1-Click Copy All Scripts to Clipboard"
    ],
    deviceGuide: {
      mobile: "Clean form input with tabbed script outputs.",
      desktop: "Side-by-side script generator and preview cards."
    },
    comparison: {
      feature: "Realtor Lead Capture",
      cacto: "Instant DM Listing Details & Auto-Qualifying",
      traditional: "Manual Inbox Replies or Static Bio Links"
    },
    seoKeywords: ["real estate reel cta generator", "instagram dm automation for real estate", "realtor reel overlay hooks", "property tour comment trigger"]
  },

  {
    slug: "welcome-dm-velocity-calculator",
    title: "Welcome DM Velocity & Safety Throttle Calculator",
    description: "Calculate safe hourly dispatch caps and randomized delay buffers for sending automated welcome DMs to new Instagram followers.",
    category: "Calculators",
    icon: "ShieldCheck",
    faqs: [
      { q: "Are automated welcome DMs to new followers safe?", a: "Yes, when connected via official Meta OAuth and respecting hourly velocity throttling guidelines." },
      { q: "What is Meta's hourly DM dispatch limit?", a: "Meta recommends keeping automated messaging velocity under 50-100 dispatches per hour depending on account age." },
      { q: "Why are randomized time delay buffers necessary?", a: "Randomized delays (e.g. 45s-180s) prevent automated signature flags from Meta security algorithms." },
      { q: "What should I write in a welcome DM?", a: "Greet the follower, offer a free value asset, and present a single clear action button." }
    ],
    steps: [
      { step: 1, title: "Select Account Age", desc: "Choose New (<6 mo) or Established (>1 yr)." },
      { step: 2, title: "Input Daily Follower Growth", desc: "Enter average new followers added per day." },
      { step: 3, title: "Assess Meta Trust Score", desc: "Select low, medium, or high account standing." },
      { step: 4, title: "View Throttling Plan", desc: "Get safe hourly dispatches, delay buffers, & welcome copy." }
    ],
    usecases: [
      "Planning Follower Welcome DM Automation",
      "Calculating Safe Dispatch Velocity for Growing Accounts",
      "Avoiding Instagram Action Blocks & Messaging Limits",
      "Structuring Non-Spammy Welcome Sequences"
    ],
    benefits: [
      "Meta API Velocity Throttling Calculation",
      "Recommended Delay Buffer Ranges",
      "Risk Level Assessment (Safe / Caution / High)",
      "Includes 3 Warm Non-Spammy Welcome Templates"
    ],
    deviceGuide: {
      mobile: "Simple inputs with visual safety badge status.",
      desktop: "Interactive dispatch timeline and template copy cards."
    },
    comparison: {
      feature: "Follower Outreach Safety",
      cacto: "Meta OAuth + Throttled Velocity Queues",
      traditional: "Password Scrapers with High Ban Risk"
    },
    seoKeywords: ["welcome dm velocity calculator", "instagram welcome dm safety limits", "how to send automated dm to new followers", "cacto velocity throttler"]
  },

  {
    slug: "webhook-latency-simulator",
    title: "Meta Graph API Webhook Speed & Latency Simulator",
    description: "Simulate how message queue delays (3s vs. 45s) cause prospect drop-off and collapse DM link click-through rates.",
    category: "Utility",
    icon: "Zap",
    faqs: [
      { q: "Why does webhook speed matter for Instagram DMs?", a: "When a user comments, their buying intent peaks in the first 10 seconds. Delays beyond 30 seconds cause 50%+ drop-offs." },
      { q: "Why do legacy flowchart tools experience queue delays?", a: "Legacy visual flowchart platforms process multiple middleware logic nodes, causing 15-45s delays during peak hours." },
      { q: "How fast does Cacto deliver DM payloads?", a: "Cacto microservices process webhooks and dispatch DM link payloads in under 3 seconds." },
      { q: "How is attention decay calculated in the simulator?", a: "We use an empirical decay formula: CTR = BaseCTR * e^(-0.04 * DelaySeconds)." }
    ],
    steps: [
      { step: 1, title: "Set Delay Latency", desc: "Slide response delay from 1 second to 60 seconds." },
      { step: 2, title: "Input Monthly Comments", desc: "Specify total monthly comment triggers on Reels." },
      { step: 3, title: "View Attention Decay Curve", desc: "See projected CTR drop-off and lost link clicks." },
      { step: 4, title: "Compare Execution Speed", desc: "View Cacto (3s) vs. Legacy Visual Builders (45s)." }
    ],
    usecases: [
      "Benchmarking DM Automation Execution Speeds",
      "Auditing Webhook Delay Impact on Sales Conversions",
      "Understanding Meta Graph API Infrastructure Performance",
      "Optimizing Reel Comment Campaign Conversion Rates"
    ],
    benefits: [
      "Real-Time Attention Decay Curve Simulation",
      "Projects Lost Clicks & Revenue per Delay Second",
      "Visual Speed Comparison Chart",
      "Based on Empirical Conversion Benchmarks"
    ],
    deviceGuide: {
      mobile: "Interactive latency slider with instant CTR badge updates.",
      desktop: "Interactive decay graph and side-by-side latency comparison."
    },
    comparison: {
      feature: "Webhook Speed",
      cacto: "Sub-3-Second Microservice Execution",
      traditional: "15s–45s Middleware Flowchart Delays"
    },
    seoKeywords: ["webhook latency simulator", "instagram auto dm speed impact", "comment to dm latency conversion", "cacto sub 3s webhook speed"]
  },

  {
    slug: "high-ticket-qualifying-script-generator",
    title: "High-Ticket Lead Qualification DM Script Builder",
    description: "Generate 3-step interactive qualifying DM scripts (revenue, timeline, goals) that filter cold leads before serving booking call links.",
    category: "Generators",
    icon: "Send",
    faqs: [
      { q: "Why qualify leads in Instagram DMs before sending booking links?", a: "Qualifying prospects prevents low-budget lead clutter on your discovery call calendar." },
      { q: "What questions should I ask in high-ticket qualifying DMs?", a: "Ask about current business revenue, main scaling bottleneck, and readiness to invest." },
      { q: "How do interactive quick-reply buttons work?", a: "Cacto displays 1-tap quick reply options in the DM so prospects can select options without typing." },
      { q: "What happens if a prospect does not qualify?", a: "The script routes non-qualified leads to a free resource or lower-ticket self-study program." }
    ],
    steps: [
      { step: 1, title: "Select Coaching Niche", desc: "Choose Business, Fitness, High-Ticket Agency, or Consulting." },
      { step: 2, title: "Set Min Qualification Target", desc: "Enter minimum client revenue or investment readiness." },
      { step: 3, title: "Input Booking Link", desc: "Provide your Calendly or SavvyCal calendar URL." },
      { step: 4, title: "Generate 3-Step Script", desc: "Get value delivery, qualifying question, & booking branch." }
    ],
    usecases: [
      "High-Ticket Coaching & Agency Lead Qualification",
      "Filtering Discovery Call Calendars via Instagram DMs",
      "Automating 1-on-1 Consultation Inquiries",
      "Building 3-Step Lead Qualification Workflows"
    ],
    benefits: [
      "3-Step Qualifying Script Output",
      "Includes Qualified & Unqualified Branching Copy",
      "Optimized for High-Ticket Services ($3k+)",
      "1-Click Copy Scripts to Cacto Campaign Builder"
    ],
    deviceGuide: {
      mobile: "Simple inputs with tabbed script copy outputs.",
      desktop: "Side-by-side qualification flow preview and copy cards."
    },
    comparison: {
      feature: "Lead Qualification",
      cacto: "Automated Interactive 3-Step DM Screening",
      traditional: "Unfiltered Calendar Link Drops or Manual DMing"
    },
    seoKeywords: ["high ticket lead qualification dm script", "coaching dm sales script generator", "instagram qualifying dm builder", "high ticket agency dm funnel"]
  }
];

const lastBracketIdx = fileContent.lastIndexOf(']');

if (lastBracketIdx === -1) {
  console.error('Closing bracket ] not found in toolsData.ts');
  process.exit(1);
}

let newEntriesCode = '';

for (const tool of newTools) {
  newEntriesCode += `,\n  {\n`;
  newEntriesCode += `    slug: ${JSON.stringify(tool.slug)},\n`;
  newEntriesCode += `    title: ${JSON.stringify(tool.title)},\n`;
  newEntriesCode += `    description: ${JSON.stringify(tool.description)},\n`;
  newEntriesCode += `    category: ${JSON.stringify(tool.category)},\n`;
  newEntriesCode += `    icon: ${JSON.stringify(tool.icon)},\n`;
  newEntriesCode += `    faqs: ${JSON.stringify(tool.faqs, null, 6)},\n`;
  newEntriesCode += `    steps: ${JSON.stringify(tool.steps, null, 6)},\n`;
  newEntriesCode += `    usecases: ${JSON.stringify(tool.usecases, null, 6)},\n`;
  newEntriesCode += `    benefits: ${JSON.stringify(tool.benefits, null, 6)},\n`;
  newEntriesCode += `    deviceGuide: ${JSON.stringify(tool.deviceGuide, null, 6)},\n`;
  newEntriesCode += `    comparison: ${JSON.stringify(tool.comparison, null, 6)},\n`;
  newEntriesCode += `    seoKeywords: ${JSON.stringify(tool.seoKeywords, null, 6)}\n`;
  newEntriesCode += `  }`;
}

const updatedFileContent = fileContent.substring(0, lastBracketIdx) + newEntriesCode + '\n]\n';

fs.writeFileSync(toolsDataPath, updatedFileContent, 'utf8');
console.log('Successfully appended 7 new interactive tools (Tools 51-57) to toolsData.ts!');

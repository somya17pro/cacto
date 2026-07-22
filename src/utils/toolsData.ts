export interface ToolData {
  slug: string
  title: string
  description: string
  category: "Calculators" | "Generators" | "Utility"
  icon: string
  faqs: Array<{ q: string; a: string }>
  steps: Array<{ step: number; title: string; desc: string }>
  usecases: string[]
  benefits: string[]
  deviceGuide: { mobile: string; desktop: string }
  comparison: { feature: string; cacto: string; traditional: string }
  seoKeywords?: string[]
}

export const freeToolsList: ToolData[] = [
  {
    slug: "engagement-calculator",
    title: "Instagram Engagement Rate Calculator",
    description: "Calculate your authentic engagement percentage based on followers, likes, comments, and views.",
    category: "Calculators",
    icon: "TrendingUp",
    faqs: [
      {
        q: "How is Instagram engagement rate calculated?",
        a: "Instagram engagement rate is calculated by adding total post interactions (likes, comments, saves, and shares), dividing by your total follower count (or post impressions), and multiplying by 100 to get a percentage."
      },
      {
        q: "What is a good engagement rate on Instagram in 2026?",
        a: "In 2026, an engagement rate between 3% and 5% is considered average, while anything above 6% is excellent. Micro-influencers (1k-10k followers) often see higher engagement rates (6%-10%) compared to macro accounts."
      },
      {
        q: "Does Instagram engagement rate include Reel views and video plays?",
        a: "Reach-based engagement calculations factor in Reel views as impressions. However, standard follower-based engagement rates focus on explicit user actions: likes, comments, saves, and direct shares."
      },
      {
        q: "Why is my Instagram engagement rate dropping despite getting views?",
        a: "Engagement drops occur when content attracts casual scrollers who don't take action. Low saves/comments usually indicate passive consumption; adding clear comment triggers or save-worthy takeaways boosts active engagement."
      },
      {
        q: "How often should I calculate my Instagram engagement rate?",
        a: "Calculate your engagement rate weekly or per content batch (last 10 posts) to track performance trends, algorithm updates, and audience resonance without reacting to single-post anomalies."
      },
      {
        q: "What is the average Instagram engagement rate by follower count?",
        a: "Accounts under 10k followers average 4.8% ER, accounts with 10k-50k average 3.2% ER, accounts with 50k-100k average 2.1% ER, and accounts over 100k average 1.5%-2.0% ER."
      }
    ],
    steps: [
      { step: 1, title: "Enter Account Metrics", desc: "Input your total follower count, post likes, comments, saves, and shares." },
      { step: 2, title: "Analyze Benchmark ER", desc: "Instantly view calculated engagement percentage against 2026 industry averages." },
      { step: 3, title: "Optimize Strategy", desc: "Use high-performing comment trigger CTAs to boost low engagement rates." }
    ],
    usecases: [
      "Creator Sponsorship Pitching",
      "Monthly Content Performance Auditing",
      "Competitor Engagement Benchmarking",
      "DM Automation Opportunity Analysis"
    ],
    benefits: [
      "Precise Interaction Formula",
      "Instant Benchmarking Metrics",
      "Zero Form Input Friction",
      "Free Unlimited Calculations"
    ],
    deviceGuide: {
      mobile: "Works seamlessly inside iOS Safari & Android Chrome mobile webviews.",
      desktop: "Supports fast keyboard tab navigation for bulk post calculations."
    },
    comparison: {
      feature: "Engagement Calculation Accuracy",
      cacto: "Includes Saves, Shares, & DM Velocity",
      traditional: "Basic Likes + Comments Only"
    }
  },
  {
    slug: "caption-generator",
    title: "Instagram Caption Generator",
    description: "Generate highly engaging captions with customized tones and formatting instantly.",
    category: "Generators",
    icon: "Sparkles",
    faqs: [
      {
        q: "How long should an Instagram caption be for maximum engagement?",
        a: "Optimal Instagram caption length depends on format. For Reels, micro-captions (50-150 words) with clear keyword triggers convert best. For educational carousels, longer captions (200-400 words) increase dwell time."
      },
      {
        q: "How do you format Instagram captions with clean line breaks?",
        a: "To prevent Instagram from collapsing blank lines, avoid ending paragraphs with spaces before pressing Enter, or use invisible zero-width spaces (or formatting tools like Cacto) to keep clean line breaks."
      },
      {
        q: "What are the best call-to-actions (CTAs) for Instagram Reel captions?",
        a: "The highest-converting CTAs ask scrollers to comment a specific keyword (e.g. 'Comment AUDIT to get the breakdown in your DMs'). Keyword triggers outperform 'Link in bio' CTAs by up to 5x."
      },
      {
        q: "Can AI Instagram caption generators improve organic reach?",
        a: "Yes. AI generators optimize caption hook structure, incorporate search keywords for Instagram SEO, and format CTAs effectively, leading to higher dwell times and comment velocity."
      },
      {
        q: "How many hashtags should you put in an Instagram caption in 2026?",
        a: "Instagram official guidance recommends 3 to 5 highly relevant, niche-specific hashtags per caption rather than maxing out 30 generic tags."
      },
      {
        q: "How do comment-trigger words in captions work?",
        a: "When a follower comments your designated keyword on your post, automated DM tools (like Cacto) detect the comment instantly and send your lead magnet or link straight to their inbox."
      }
    ],
    steps: [
      { step: 1, title: "Choose Tone & Topic", desc: "Select desired tonality and input your primary post keyword or offer." },
      { step: 2, title: "Generate Caption Copy", desc: "Receive formatted caption copy featuring scroll-stopping hooks and CTAs." },
      { step: 3, title: "Copy & Publish", desc: "Copy clean text with zero-width line breaks directly into Instagram." }
    ],
    usecases: [
      "Reels Keyword Trigger Copy",
      "Carousel Educational Storytelling",
      "Product Launch Announcements",
      "Lead Magnet DM Delivery Prompts"
    ],
    benefits: [
      "Clean Line Break Formatting",
      "High-Converting Hook Templates",
      "Built-In Keyword CTAs",
      "Multiple Tone Options"
    ],
    deviceGuide: {
      mobile: "One-tap copy button for fast mobile posting.",
      desktop: "Expanded text area for reviewing multiple caption variations."
    },
    comparison: {
      feature: "Caption CTA Conversion",
      cacto: "Automated Keyword Comment Triggers",
      traditional: "Generic 'Link in Bio' Copy"
    }
  },
  {
    slug: "bio-generator",
    title: "Instagram Bio Generator",
    description: "Create a conversion-focused bio matching your niche to turn visitors into followers.",
    category: "Generators",
    icon: "User",
    faqs: [
      {
        q: "How do I write a professional Instagram bio for business?",
        a: "A high-converting Instagram bio includes: 1) Who you help & main benefit, 2) Social proof or credibility metric, 3) Clear call-to-action (CTA), and 4) A keyword-optimized handle/name field."
      },
      {
        q: "What is the character limit for an Instagram bio?",
        a: "The Instagram bio text limit is 150 characters. Your bio name field allows up to 64 characters, which should be used for searchable keywords (e.g. 'Jane | Social Media Coach')."
      },
      {
        q: "Should I include a call-to-action (CTA) in my Instagram bio?",
        a: "Yes. Without a clear CTA, visitors leave without taking action. Direct them to comment a keyword on your latest Reel or click your primary lead magnet link."
      },
      {
        q: "How do I add spacing and line breaks in my Instagram bio?",
        a: "Write your bio line by line in a notes app or formatting tool, avoiding trailing spaces at the end of lines, then copy and paste it into the Instagram profile editor."
      },
      {
        q: "Is it better to link to a website or a DM automation trigger in your bio?",
        a: "Directing profile visitors to comment a keyword on a featured post or sending them directly into an automated DM checkout sequence yields significantly higher conversion rates than multi-link directories."
      },
      {
        q: "How do I optimize my Instagram bio for Instagram SEO and search?",
        a: "Include your primary industry keywords in both your Name field and bio copy. Instagram's search engine indexes the Name field and bio text when matching user search queries."
      }
    ],
    steps: [
      { step: 1, title: "Select Niche & Audience", desc: "Define who you help and your primary value proposition." },
      { step: 2, title: "Add Offer & CTA", desc: "Specify your lead magnet or Auto-DM keyword trigger." },
      { step: 3, title: "Copy 150-Char Bio", desc: "Copy formatted bio text fitting Instagram's strict 150-character limit." }
    ],
    usecases: [
      "Creator Profile Optimization",
      "Agency & Freelancer Lead Capture",
      "E-commerce Brand Positioning",
      "Coaching & Course Sales Funnels"
    ],
    benefits: [
      "150-Character Limit Enforced",
      "Built-In SEO Keyword Placement",
      "High-Intent Call-to-Action",
      "Clean Vertical Spacing"
    ],
    deviceGuide: {
      mobile: "Designed for immediate mobile profile editing.",
      desktop: "Live character counter prevents Instagram clipping."
    },
    comparison: {
      feature: "Profile Conversion Focus",
      cacto: "Direct Keyword Trigger Bio",
      traditional: "Vague Personal Bio Statement"
    }
  },
  {
    slug: "ctr-calculator",
    title: "Auto-DM CTR Calculator",
    description: "Track and project conversion rates from comment responses to DMs to checkout success.",
    category: "Calculators",
    icon: "Percent",
    faqs: [
      {
        q: "What is a good click-through rate (CTR) for Instagram DM automation?",
        a: "For Instagram Auto-DM automation, a good comment-to-DM delivery rate is 85%-95%, and a strong link click-through rate inside the DM is 30% to 50%."
      },
      {
        q: "How is Instagram Auto-DM conversion rate calculated?",
        a: "Auto-DM conversion rate is calculated by dividing total completed conversions (e.g. email signups or purchases) by total automated DMs delivered, multiplied by 100."
      },
      {
        q: "Why is comment-to-DM automation CTR higher than traditional link-in-bio clicks?",
        a: "Comment-to-DM automation reaches scrollers when their intent is highest, delivering links directly to their inbox without requiring them to leave their feed or open third-party directories."
      },
      {
        q: "How do I improve DM link click-through rates on Instagram?",
        a: "To boost DM CTRs: 1) Keep initial DM copy under 3 lines, 2) State the exact value of the link button, 3) Use direct CTA buttons, and 4) Deliver the message instantly upon comment."
      },
      {
        q: "What metric tracks Instagram comment keyword responses?",
        a: "Comment response CTR measures what percentage of post viewers or reach leave the designated trigger keyword in the comments section."
      },
      {
        q: "How does Auto-DM CTR impact sales funnel conversions?",
        a: "Higher DM CTRs mean more prospects land on your offer pages with high intent, drastically lowering customer acquisition costs (CAC) compared to paid traffic."
      }
    ],
    steps: [
      { step: 1, title: "Input Funnel Numbers", desc: "Enter post views, comments, DMs delivered, and link clicks." },
      { step: 2, title: "Calculate Drop-Off Rates", desc: "Review step-by-step conversion rates between comments and sales." },
      { step: 3, title: "Refine Copy & Triggers", desc: "Identify drop-off bottlenecks to increase total funnel conversion." }
    ],
    usecases: [
      "Auto-DM Funnel Auditing",
      "Lead Capture Bottleneck Identification",
      "Campaign Conversion Forecasting",
      "A/B Testing Keyword Triggers"
    ],
    benefits: [
      "Multi-Stage Funnel Breakdown",
      "Instant Drop-off Percentage",
      "Revenue Growth Modeling",
      "No Spreadsheet Required"
    ],
    deviceGuide: {
      mobile: "Touch-friendly sliders for rapid metric adjustments.",
      desktop: "Full screen breakdown table for detailed auditing."
    },
    comparison: {
      feature: "Funnel Analytics Scope",
      cacto: "Full Comment-to-Sale Conversion Matrix",
      traditional: "Single URL Click Metric"
    }
  },
  {
    slug: "hook-generator",
    title: "Hook Idea Generator",
    description: "Get 5 scroll-stopping hooks tailored to your video topic and target audience.",
    category: "Generators",
    icon: "Compass",
    faqs: [
      {
        q: "What makes a scroll-stopping hook for Instagram Reels?",
        a: "A scroll-stopping hook combines visual movement in the first 1.5 seconds, a curiosity-inducing text overlay on screen, and an intriguing spoken opening statement."
      },
      {
        q: "How long should a video hook be on Instagram Reels and TikTok?",
        a: "Video hooks should deliver their core premise within 1.5 to 3 seconds. Any delay in establishing value causes viewers to swipe away."
      },
      {
        q: "What are the 3 main types of high-converting visual and text hooks?",
        a: "The 3 primary hook styles are: 1) FOMO/Urgency ('If you aren't doing X, you're losing Y'), 2) Clear Benefit ('How I automated X in 5 minutes'), and 3) Contrarian/Controversy ('Stop using X')."
      },
      {
        q: "Why are first 3 seconds crucial for Reel algorithm retention?",
        a: "Instagram's recommendation algorithm evaluates initial drop-off rates within the first 3 seconds to determine whether to push your video to Explore and short-form feeds."
      },
      {
        q: "How do text overlays in hooks increase Instagram video watch time?",
        a: "Over 60% of social media users scroll videos with audio muted. Bold, concise text overlays ensure non-silent viewers immediately understand the topic."
      },
      {
        q: "Should you state the main benefit immediately in a video hook?",
        a: "Yes. Stating the clear outcome or solution within the first 3 seconds promises immediate value and increases full video completion rates."
      }
    ],
    steps: [
      { step: 1, title: "Specify Topic & Angle", desc: "Input your core topic and select psychological angle (FOMO, Curiosity, Value)." },
      { step: 2, title: "Generate 5 Hooks", desc: "Get 5 customized text-overlay and spoken audio hooks." },
      { step: 3, title: "Apply to Video Script", desc: "Place chosen hook in the first 1.5 seconds of your Reel script." }
    ],
    usecases: [
      "Reel Visual Text Overlays",
      "Short-Form Video Spoken Openings",
      "TikTok Curiosity Gaps",
      "Carousel Cover Slide Titles"
    ],
    benefits: [
      "Proven Psychological Angles",
      "First 3-Second Retention Boost",
      "Instant Multi-Option Output",
      "Tailored to Niche Audience"
    ],
    deviceGuide: {
      mobile: "Copy hooks directly to video editing apps (CapCut, InShot).",
      desktop: "Batch generate hooks for weekly recording sessions."
    },
    comparison: {
      feature: "Hook Retention Focus",
      cacto: "1.5-Second Visual + Audio Hook Patterns",
      traditional: "Generic Video Title Suggestions"
    }
  },
  {
    slug: "username-checker",
    title: "Instagram Username Checker",
    description: "Simulate and review available brand handle structures and format rules.",
    category: "Utility",
    icon: "CheckCircle",
    faqs: [
      {
        q: "How do I check if an Instagram handle or username is available?",
        a: "Enter your desired handle into our Username Checker or search directly on Instagram. If an account with that exact handle exists, it is unavailable."
      },
      {
        q: "What are the rules and character limits for Instagram usernames?",
        a: "Instagram usernames can be up to 30 characters long and can contain letters, numbers, periods (.), and underscores (_). No spaces or special symbols allowed."
      },
      {
        q: "Can you use underscores or dots in an Instagram username?",
        a: "Yes, periods and underscores are permitted. However, avoid consecutive symbols (e.g. user__name or user..name) as they lower searchability and brand memorability."
      },
      {
        q: "How do I choose a search-friendly Instagram handle for SEO?",
        a: "Incorporate your main business niche or keyword into your handle if possible (e.g. @alex_coaching or @cacto_growth), making it easier for users to find you in search results."
      },
      {
        q: "What should I do if my desired Instagram username is taken?",
        a: "Try appending clean modifiers like official, hq, get, use, app, or your location/niche (e.g. @cacto_hq or @getcacto)."
      },
      {
        q: "Does changing your Instagram handle affect your algorithm ranking or verification?",
        a: "Changing your handle temporary resets search index indexing for your profile name, and verified accounts may lose their verified badge upon handle modification."
      }
    ],
    steps: [
      { step: 1, title: "Enter Desired Handle", desc: "Type your target handle name and preferred suffix modifier." },
      { step: 2, title: "Run Format Validation", desc: "Verify length, forbidden characters, and consecutive symbol rules." },
      { step: 3, title: "Select Clean Variation", desc: "Choose high-memorability handle suggestions for your brand." }
    ],
    usecases: [
      "New Business Brand Naming",
      "SEO Keyword Handle Optimization",
      "Multi-Platform Username Standardization",
      "Rebranding & Handle Modification"
    ],
    benefits: [
      "Instant Rule Compliance Check",
      "High-Converting Suffix Suggestions",
      "SEO Keyword Integration",
      "Prevents Special Character Errors"
    ],
    deviceGuide: {
      mobile: "Quick availability simulation on mobile.",
      desktop: "Displays 10+ clean handle prefix/suffix combinations."
    },
    comparison: {
      feature: "Handle Optimization",
      cacto: "SEO Keyword + Suffix Suggester",
      traditional: "Basic Binary Availability Check"
    }
  },
  {
    slug: "hashtag-generator",
    title: "Hashtag Generator",
    description: "Generate structured sets of popular, niche, and brand hashtags based on key phrases.",
    category: "Generators",
    icon: "Tag",
    faqs: [
      {
        q: "How many hashtags should I use on Instagram in 2026?",
        a: "Current best practices recommend using 3 to 5 hyper-targeted hashtags per post rather than 30 broad tags, allowing the algorithm to categorize your content precisely."
      },
      {
        q: "Do hashtags still work for Instagram growth and discoverability?",
        a: "Yes, but their role has shifted from main reach driver to contextual indexing. Hashtags help Instagram SEO categorize your content for Explore and topic feeds."
      },
      {
        q: "Should hashtags go in the Instagram caption or comment section?",
        a: "Placing hashtags in the main caption ensures immediate indexing by Instagram's algorithm. Placing them in comments works for aesthetics but may delay search indexing slightly."
      },
      {
        q: "What is the difference between niche, broad, and branded hashtags?",
        a: "Niche tags target specific sub-topics (10k-500k posts), broad tags cover general industries (1M+ posts), and branded tags are unique to your company or campaign."
      },
      {
        q: "How do I find banned or shadowbanned Instagram hashtags?",
        a: "Search for the hashtag on Instagram's search tab. If the recent posts tab is hidden or missing with a community guideline notice, the hashtag is restricted."
      },
      {
        q: "Can relevant hashtags help rank my posts on Instagram Search and Explore?",
        a: "Yes. Matching relevant keywords in your hashtags, text overlays, and caption copy boosts post rank on Instagram search results for related topics."
      }
    ],
    steps: [
      { step: 1, title: "Input Seed Keyword", desc: "Type your topic or niche keyword into the search bar." },
      { step: 2, title: "Generate Tiered Sets", desc: "Receive categorized broad, niche, and targeted hashtags." },
      { step: 3, title: "Copy 3-5 Optimal Tags", desc: "Copy recommended tags formatted cleanly for Instagram SEO." }
    ],
    usecases: [
      "Instagram SEO Categorization",
      "Reel Topic Context Indexing",
      "Niche Audience Targeting",
      "Brand Campaign Tagging"
    ],
    benefits: [
      "Filter Space Stripping",
      "3-5 Recommended Tag Focus",
      "Categorized Niche Tiers",
      "Instant Copy Button"
    ],
    deviceGuide: {
      mobile: "Fast one-tap copy formatted for caption insertion.",
      desktop: "Filter and sort tags across volume categories."
    },
    comparison: {
      feature: "Hashtag Strategy",
      cacto: "3-5 SEO Niche Indexing Tags",
      traditional: "30 Generic Spam Hashtags"
    }
  },
  {
    slug: "char-counter",
    title: "Character & Caption Length Counter",
    description: "Verify your captions, hashtags, and links fit within Instagram's 2,200 character limits.",
    category: "Utility",
    icon: "FileText",
    faqs: [
      {
        q: "What is the maximum character limit for an Instagram caption?",
        a: "The maximum character limit for an Instagram caption is 2,200 characters, including spaces, emojis, and hashtags."
      },
      {
        q: "How many characters appear before the 'More' truncation button on Instagram?",
        a: "Instagram truncates captions after approximately 125 characters (or 2-3 lines) in the mobile feed. Your hook statement must fit before this fold."
      },
      {
        q: "Does character length affect Instagram Reel reach and dwell time?",
        a: "Captions that provide genuine value encourage scrollers to pause and read while the Reel loops in the background, signaling high dwell time to the algorithm."
      },
      {
        q: "What is the character limit for Instagram comments, bios, and direct messages?",
        a: "Bio limits are 150 characters, Instagram comments allow up to 2,200 characters, and Instagram DMs allow up to 1,000 characters per message block."
      },
      {
        q: "How many hashtags count towards the Instagram 2,200 character limit?",
        a: "You can include up to 30 hashtags per post, and their character counts contribute directly to the total 2,200 character allowance."
      },
      {
        q: "Why should you keep key hook statements in the first 125 characters?",
        a: "Placing the core benefit in the first 125 characters ensures scrollers see the value immediately on feed cards without having to tap 'more'."
      }
    ],
    steps: [
      { step: 1, title: "Paste Caption Text", desc: "Insert draft copy into the live editor window." },
      { step: 2, title: "Check Truncation Fold", desc: "Verify hook text lands within the first 125 characters before 'more'." },
      { step: 3, title: "Audit Limits & Tags", desc: "Ensure total length is under 2,200 chars and hashtags under 30." }
    ],
    usecases: [
      "Mobile Feed Truncation Audit",
      "Bio 150-Char Limit Check",
      "DM 1,000-Char Block Formatting",
      "Hashtag Count Verification"
    ],
    benefits: [
      "Live 125-Char Fold Preview",
      "Emoji & Symbol Real-Time Count",
      "URL & Hashtag Counter",
      "Prevents Instagram Copy Clipping"
    ],
    deviceGuide: {
      mobile: "Simulates mobile feed fold line accurately.",
      desktop: "Provides side-by-side metric analytics."
    },
    comparison: {
      feature: "Truncation Analysis",
      cacto: "Visual First 125-Char Fold Indicator",
      traditional: "Generic Character Count Number"
    }
  },
  {
    slug: "cta-generator",
    title: "Call-to-Action (CTA) Generator",
    description: "Generate comment triggers asking scrollers to comment a keyword for DM delivery.",
    category: "Generators",
    icon: "MessageSquare",
    faqs: [
      {
        q: "What is the best call-to-action (CTA) for Instagram Reels?",
        a: "The most effective CTA for Reels asks scrollers to comment a single trigger keyword (e.g. 'Comment AUDIT to get the free template sent to your DMs')."
      },
      {
        q: "How do comment-to-DM call-to-actions increase post engagement?",
        a: "Comment-to-DM CTAs spark high comment velocity immediately after posting, triggering Instagram's algorithm to promote your post to a broader audience."
      },
      {
        q: "What is the difference between direct CTAs and engagement CTAs?",
        a: "Direct CTAs drive specific conversion actions (e.g. 'Comment GROW for the link'), while engagement CTAs ask for opinions or shares (e.g. 'Tag a friend who needs this')."
      },
      {
        q: "Why do single keyword comment triggers outperform multi-word triggers?",
        a: "Single-word keyword triggers (e.g. 'PLAN') have minimal friction for scrollers to type on mobile, resulting in higher comment response rates."
      },
      {
        q: "Where should you place the call-to-action in a video script or caption?",
        a: "Include a subtle verbal or visual CTA midway through the video and a strong primary CTA both at the very end of the Reel and in the last lines of the caption."
      },
      {
        q: "How many call-to-actions should you include per Instagram post?",
        a: "Focus on exactly ONE primary CTA per post. Giving users multiple conflicting options (like 'Like, share, click bio, and comment') lowers overall conversions."
      }
    ],
    steps: [
      { step: 1, title: "Input Offer & Keyword", desc: "Specify your lead magnet or product name and target keyword." },
      { step: 2, title: "Generate Trigger Copy", desc: "Get high-velocity comment-to-DM CTAs for Reels & captions." },
      { step: 3, title: "Connect to Cacto Rules", desc: "Set up matching keyword rules in Cacto Auto-DM engine." }
    ],
    usecases: [
      "Reel Spoken End-Card CTAs",
      "Caption Last-Line Comment Triggers",
      "Carousel Slide 10 Final Offers",
      "Story Keyword Reply Prompts"
    ],
    benefits: [
      "Single-Keyword High-Velocity Copy",
      "High Conversion Intent Framing",
      "Instant DM Delivery Mechanics",
      "Proven Direct-Response Formulas"
    ],
    deviceGuide: {
      mobile: "Copy keyword CTAs into Instagram mobile composer.",
      desktop: "Save CTA templates to content planning software."
    },
    comparison: {
      feature: "Call-to-Action Mechanics",
      cacto: "High-Intent Keyword DM Trigger",
      traditional: "Passive 'Link in Bio' Request"
    }
  },
  {
    slug: "click-value-estimator",
    title: "Link-in-Bio Click Value Estimator",
    description: "Project potential monthly revenue based on bio traffic clicks and conversion values.",
    category: "Calculators",
    icon: "DollarSign",
    faqs: [
      {
        q: "How do you calculate the financial value of a link-in-bio click?",
        a: "Multiply your bio link click volume by your landing page conversion rate and average customer order value (e.g. 1,000 clicks x 3% conversion rate x $50 product = $1,500 total value, or $1.50 per click)."
      },
      {
        q: "What is the average click-through rate for Instagram bio links?",
        a: "Average Instagram bio link CTR ranges between 1% and 3% of profile visits, as scrollers rarely leave the main feed to visit profile headers."
      },
      {
        q: "Why do creators lose up to 70% of lead magnet sales using link trees?",
        a: "Link tree directories force visitors to navigate multiple options without clear guidance, causing choice paralysis and high bounce rates."
      },
      {
        q: "How does automated DM delivery increase link value compared to bio links?",
        a: "DM delivery sends links directly into the user's private inbox with zero navigation friction, increasing click rates by 3x-5x over profile link trees."
      },
      {
        q: "How do you optimize traffic conversion rates from social media to sales pages?",
        a: "Align your post offer precisely with your landing page header, use single-purpose opt-in pages, and send automated instant follow-ups in DMs."
      },
      {
        q: "What metrics determine return on investment (ROI) for social traffic?",
        a: "Key ROI metrics include Cost Per Lead (CPL), Direct DM Click-Through Rate (CTR), Customer Lifetime Value (LTV), and Conversion Rate Per Traffic Channel."
      }
    ],
    steps: [
      { step: 1, title: "Input Profile Traffic", desc: "Enter monthly followers, estimated CTR, and offer price point." },
      { step: 2, title: "Project Earnings", desc: "View calculated monthly revenue potential from social traffic." },
      { step: 3, title: "Compare DM vs Bio", desc: "See potential revenue gains from switching to Auto-DM triggers." }
    ],
    usecases: [
      "Digital Product Revenue Modeling",
      "Course & Coaching Sales Projections",
      "Bio Link vs DM Funnel ROI Audits",
      "Sponsorship Pricing Justification"
    ],
    benefits: [
      "Per-Click Revenue Valuation",
      "Direct Comparison with DM Funnels",
      "Real-Time Slider Calculations",
      "Actionable ROI Forecasts"
    ],
    deviceGuide: {
      mobile: "Interactive sliders optimized for smartphone touch.",
      desktop: "Side-by-side monthly vs annual revenue table."
    },
    comparison: {
      feature: "Traffic Conversion Rate",
      cacto: "Automated DM Delivery (30-50% CTR)",
      traditional: "Bio Link Directory (1-3% CTR)"
    }
  },
  {
    slug: "line-breaker",
    title: "Comment Formatting & Line Breaker",
    description: "Format clean captions with line breaks without visual dots or trailing spaces.",
    category: "Utility",
    icon: "AlignLeft",
    faqs: [
      {
        q: "Why does Instagram remove line breaks and blank lines in captions?",
        a: "Instagram's default text parser strips out consecutive trailing spaces and empty line returns, collapsing paragraphs into dense blocks of text."
      },
      {
        q: "How do you add clean line breaks to Instagram captions without symbols?",
        a: "Use Cacto's Line Breaker tool to insert invisible zero-width unicode characters (\\u2800) between paragraphs, creating clean spaces without dots or dashes."
      },
      {
        q: "Does properly formatted text increase caption reading time and engagement?",
        a: "Yes. Clean paragraph formatting improves readability on mobile screens, increasing user dwell time and post engagement rates."
      },
      {
        q: "Will invisible line breaks work on both iOS and Android Instagram apps?",
        a: "Yes. Zero-width space formatting is fully supported across iOS, Android, and desktop versions of Instagram."
      },
      {
        q: "Can formatted captions improve accessibility and readability for followers?",
        a: "Structured captions with clear line spacing make content easier to digest for screen readers and scrollers with visual impairments."
      },
      {
        q: "How do you copy and paste formatted captions into Instagram without formatting bugs?",
        a: "Paste your raw caption into our Line Breaker, click 'Copy Formatted Caption', and paste it directly into Instagram without adding extra spaces at paragraph ends."
      }
    ],
    steps: [
      { step: 1, title: "Paste Raw Text", desc: "Paste draft caption with empty lines into the formatter." },
      { step: 2, title: "Insert Zero-Width Spaces", desc: "Automated engine converts line breaks to invisible unicode symbols." },
      { step: 3, title: "Copy Clean Caption", desc: "Copy clean formatted text directly to Instagram." }
    ],
    usecases: [
      "Instagram Caption Spacing",
      "Bio Paragraph Formatting",
      "Comment Section Break Alignment",
      "DM Message Block Formatting"
    ],
    benefits: [
      "No Visual Bullets or Dots",
      "Cross-Platform iOS & Android Safe",
      "Preserves Paragraph Spacing",
      "Instant One-Click Copy"
    ],
    deviceGuide: {
      mobile: "Prevents automatic mobile line collapsing.",
      desktop: "Clean text area converts spaces instantly on typing."
    },
    comparison: {
      feature: "Paragraph Line Spacing",
      cacto: "Invisible Zero-Width Unicode Spaces",
      traditional: "Clunky Visual Dots & Dashes"
    }
  },
  {
    slug: "script-outline",
    title: "Reels Script Outline Creator",
    description: "Draft structured outlines (Hook, Value, CTA) for Reels to scale retention.",
    category: "Generators",
    icon: "Play",
    faqs: [
      {
        q: "How do you structure a 30-second Instagram Reel script for high retention?",
        a: "Structure a 30s script as: 0-3s Visual/Text Hook, 3-10s Problem Cognition, 10-22s Value Walkthrough, and 22-30s Clear Comment Trigger CTA."
      },
      {
        q: "What is the ideal script format for viral video shorts?",
        a: "Viral shorts follow the Hook-Value-CTA framework, focusing on one single idea per video with fast-paced visual transitions every 2-4 seconds."
      },
      {
        q: "How many words should be in a 60-second video script?",
        a: "A 60-second video script should contain between 130 and 150 words spoken at a natural, engaging pace."
      },
      {
        q: "Where in a Reel script should you place the comment trigger CTA?",
        a: "Tease the resource midway through the script, and state the exact keyword trigger in the final 5 seconds while displaying text overlay instructions."
      },
      {
        q: "How do script outlines help maintain pacing and lower drop-off rates?",
        a: "Script outlines prevent rambling, ensure tight transitions between points, and keep viewer attention focused through logical progression."
      },
      {
        q: "Can AI Reel scripts help creators post consistently?",
        a: "Yes. Standardizing your video script outlines allows creators to plan, record, and batch content in half the time."
      }
    ],
    steps: [
      { step: 1, title: "Select Reel Duration", desc: "Choose 15s, 30s, or 60s target video length." },
      { step: 2, title: "Fill Core Value Points", desc: "Enter problem premise and 3 key educational takeaways." },
      { step: 3, title: "Export Timestamps", desc: "Receive timestamped script sections with spoken audio and visual cues." }
    ],
    usecases: [
      "Instagram Reels Content Batching",
      "YouTube Shorts Script Planning",
      "TikTok Educational Video Outlines",
      "DM Lead Magnet Reel Scripts"
    ],
    benefits: [
      "Timestamped Section Pacing",
      "Hook-Value-CTA Framework",
      "Spoken Word Count Calculation",
      "Visual Cue Directions Included"
    ],
    deviceGuide: {
      mobile: "Easy teleprompter view for filming on phone.",
      desktop: "Batch script generation for weekly shoots."
    },
    comparison: {
      feature: "Script Pacing Structure",
      cacto: "Timestamped Retention Framework",
      traditional: "Unstructured Un-Timed Notes"
    }
  },
  {
    slug: "audit-checklist",
    title: "Social Media Audit Checklist Generator",
    description: "Generate custom auditing steps matching your niche focus.",
    category: "Utility",
    icon: "ClipboardList",
    faqs: [
      {
        q: "What is a social media audit and how often should you perform one?",
        a: "A social media audit is a comprehensive review of your profile setup, content performance, bio conversion paths, and follower engagement, ideally conducted monthly."
      },
      {
        q: "What key metrics should be analyzed during an Instagram account audit?",
        a: "Audit engagement rate, save-to-like ratios, comment-to-DM conversion rates, bio link CTRs, net follower growth, and top-performing post formats."
      },
      {
        q: "How do you evaluate whether your Instagram bio and pinned posts convert?",
        a: "Check whether your pinned posts clearly answer what you offer and feature an active keyword CTA that triggers an automated lead funnel."
      },
      {
        q: "How do you spot inactive followers and drop-offs in engagement during an audit?",
        a: "Compare reach trends against total follower counts. Low reach relative to follower count indicates ghost followers or content fatigue."
      },
      {
        q: "What setup elements are essential for automated Instagram funnel audits?",
        a: "Ensure your business account is connected to an automated DM engine (like Cacto), keyword trigger rules are active, and lead magnet links work reliably."
      },
      {
        q: "How do you create an actionable social media growth plan after an audit?",
        a: "Identify your top 2 converting content themes, eliminate underperforming formats, and optimize your comment-to-DM automation for peak lead capture."
      }
    ],
    steps: [
      { step: 1, title: "Select Focus Area", desc: "Choose Creator, Business, E-commerce, or Agency audit vector." },
      { step: 2, title: "Generate Checklist", desc: "Receive customized 10-point audit action list." },
      { step: 3, title: "Execute & Remediate", desc: "Check off items to optimize bio, CTAs, and Auto-DM setup." }
    ],
    usecases: [
      "Monthly Instagram Account Auditing",
      "Client Onboarding Profile Review",
      "DM Automation Safety Verification",
      "Content Conversion Optimization"
    ],
    benefits: [
      "Niche-Specific Audit Vectors",
      "Actionable Step-by-Step Checks",
      "Exportable Audit Reports",
      "100% Meta Rule Compliant"
    ],
    deviceGuide: {
      mobile: "Interactive checkboxes for audit on the go.",
      desktop: "Printable PDF/text audit checklist output."
    },
    comparison: {
      feature: "Audit Precision",
      cacto: "Conversion & DM Funnel Focused",
      traditional: "Generic Vanity Metric Checklist"
    }
  },
  {
    slug: "growth-projector",
    title: "Follower Growth Projector",
    description: "Project your follower milestones over 30, 90, and 365 days based on daily velocity.",
    category: "Calculators",
    icon: "ArrowUpRight",
    faqs: [
      {
        q: "How do you project Instagram follower growth over 30, 90, and 365 days?",
        a: "Multiply your net daily follower velocity (new followers minus lost followers) by the target number of days, adjusting for monthly subscriber churn percentage."
      },
      {
        q: "What is a realistic daily follower growth rate for Instagram creators?",
        a: "Consistent accounts adding 15-50 net new followers daily experience healthy organic growth, while viral Reel campaigns can spike daily velocity to 500+."
      },
      {
        q: "How does follower churn rate impact long-term account growth projections?",
        a: "Follower churn (typically 1%-3% monthly) reduces net gain. High churn rates signal content irrelevance or outdated profile targeting."
      },
      {
        q: "What strategies accelerate daily follower velocity organically?",
        a: "Posting high-retention Reels, placing keyword CTAs in every post, engaging in niche comment section discussions, and delivering instant lead magnets via DMs."
      },
      {
        q: "How do viral Reels affect long-term growth projection baseline averages?",
        a: "Viral Reels cause temporary traffic spikes; model your baseline projections using 60-day median growth rates rather than single-day viral anomalies."
      },
      {
        q: "How do you measure net follower acquisition versus total lost followers?",
        a: "Use Instagram Professional Dashboard insights to track total new follows minus unfollows during a specific timeframe to find true net growth."
      }
    ],
    steps: [
      { step: 1, title: "Input Current Followers", desc: "Enter starting count, daily gains, and monthly churn rate." },
      { step: 2, title: "Calculate Milestones", desc: "View projected totals for 30, 90, and 365 days." },
      { step: 3, title: "Adjust Velocity Drivers", desc: "Test how comment automation accelerates daily net growth." }
    ],
    usecases: [
      "Annual Growth Goal Setting",
      "Sponsorship Pitch Forecasting",
      "Churn Impact Analysis",
      "Reel Velocity Scenario Planning"
    ],
    benefits: [
      "Factors Monthly Churn Percentage",
      "30/90/365-Day Compound Projections",
      "Interactive Sensitivity Sliders",
      "Realistic Baseline Forecasting"
    ],
    deviceGuide: {
      mobile: "Fast scenario testing on phone screens.",
      desktop: "Detailed growth trajectory breakdown chart."
    },
    comparison: {
      feature: "Growth Projection Model",
      cacto: "Net Growth + Churn Rate Compound Formula",
      traditional: "Linear Addition Without Churn"
    }
  },
  {
    slug: "lead-value-estimator",
    title: "Lead Magnet Value Estimator",
    description: "Estimate monthly list growth value based on traffic volume and opt-in CTRs.",
    category: "Calculators",
    icon: "PlusCircle",
    faqs: [
      {
        q: "How do you calculate the financial value of an Instagram lead magnet?",
        a: "Divide total revenue generated from email/DM subscribers by total lead magnet downloads (e.g. $5,000 revenue from 500 subscribers = $10 per lead value)."
      },
      {
        q: "What is a good opt-in conversion rate for social media lead magnets?",
        a: "A strong opt-in rate for Instagram DM lead magnet triggers is 40% to 65%, compared to 10% to 20% on traditional landing page bio links."
      },
      {
        q: "Why is email list growth critical for Instagram creators and coaches?",
        a: "Social media algorithms fluctuate, but owning an email list allows creators to communicate directly with prospective buyers without algorithm suppression."
      },
      {
        q: "How does automated DM lead magnet delivery compare to bio link opt-in pages?",
        a: "Automated DM delivery collects subscriber emails directly inside Instagram chat with 1-tap responses, cutting drop-offs by up to 50%."
      },
      {
        q: "What factors increase earnings per lead from Instagram traffic?",
        a: "Sending targeted automated welcome emails immediately, offering high-value tripwire products, and nurturing leads via automated DM chat sequences."
      },
      {
        q: "How do you set up an automated lead capture sequence on Instagram?",
        a: "Connect Cacto to your Instagram account, set up a keyword trigger rule, capture user emails inside DM chat, and sync leads to your CRM automatically."
      }
    ],
    steps: [
      { step: 1, title: "Input Lead Magnet Metrics", desc: "Enter monthly Reel views, opt-in CTR, and estimated value per lead." },
      { step: 2, title: "Calculate Monthly List Value", desc: "See projected subscribers captured and total monthly revenue value." },
      { step: 3, title: "Optimize Delivery Channel", desc: "Switch from bio link forms to DM chat capture to double opt-in rate." }
    ],
    usecases: [
      "Email List Growth Valuation",
      "Lead Magnet Conversion Auditing",
      "Coaching Lead Capture Forecasting",
      "DM Chat Opt-In ROI Calculation"
    ],
    benefits: [
      "Direct Valuation Per Subscriber",
      "DM Chat Opt-In Boost Multiplier",
      "Real-Time Revenue Calculation",
      "Zero Spreadsheet Setup Required"
    ],
    deviceGuide: {
      mobile: "Touch sliders for quick value estimation.",
      desktop: "Full lead capture conversion matrix view."
    },
    comparison: {
      feature: "Opt-In Conversion Rate",
      cacto: "Instant DM Chat Capture (40-65% Opt-in)",
      traditional: "External Landing Page (10-20% Opt-in)"
    }
  },
  {
    slug: "subject-line-optimizer",
    title: "Email Subject Line Optimizer",
    description: "Optimize delivery subject lines to get 50%+ open rates for lead magnets.",
    category: "Generators",
    icon: "Mail",
    faqs: [
      {
        q: "How do you write email subject lines that achieve 50%+ open rates?",
        a: "Use short, personalized subject lines that reference the exact resource requested on Instagram (e.g. '[Locked] Your Cacto strategy guide inside')."
      },
      {
        q: "What is the ideal character length for mobile email subject lines?",
        a: "Keep subject lines under 40 characters (or 4-7 words) so they display completely without truncation on mobile email clients like iOS Mail and Gmail."
      },
      {
        q: "Which words trigger spam filters in email subject lines?",
        a: "Avoid spam trigger words like 'FREE money', '100% Guaranteed', 'ACT NOW!!!', excessive exclamation points, and ALL CAPS text."
      },
      {
        q: "How do curiosity and urgency improve lead magnet delivery email opens?",
        a: "Curiosity gaps (e.g. 'Quick question about your DM request...') prompt immediate opens because recipients recognize their recent Instagram interaction."
      },
      {
        q: "Should you use emojis in email subject lines for DM lead magnet delivery?",
        a: "Using 1 relevant emoji (e.g. 🔒 or 📩) can increase visual visibility in crowded inboxes, but avoid overusing multiple emojis."
      },
      {
        q: "How do subject lines impact click-through rates on automated follow-up emails?",
        a: "High-converting subject lines set clear expectations for the email content, leading to higher open rates and consistent click-through rates."
      }
    ],
    steps: [
      { step: 1, title: "Input Lead Resource Name", desc: "Type the name of your PDF, guide, or template." },
      { step: 2, title: "Generate 5 Variations", desc: "Get high-open subject lines utilizing curiosity and DM context." },
      { step: 3, title: "Check Spam Score", desc: "Verify line length is under 40 characters without spam triggers." }
    ],
    usecases: [
      "Lead Magnet Email Delivery",
      "Welcome Sequence Open Optimization",
      "Auto-DM Follow-Up Emails",
      "Newsletter Launch Bulletins"
    ],
    benefits: [
      "Mobile Truncation Proof (<40 Chars)",
      "Curiosity-Gap Frameworks",
      "Built-In Spam Filter Checker",
      "Proven 50%+ Open Rate Patterns"
    ],
    deviceGuide: {
      mobile: "Simulates mobile inbox preview line.",
      desktop: "Batch generate subject lines for email sequences."
    },
    comparison: {
      feature: "Subject Line Performance",
      cacto: "DM-Contextual Curiosity Subject Lines",
      traditional: "Generic Newsletter Headers"
    }
  },
  {
    slug: "dm-previewer",
    title: "DM Copy Editor & Previewer",
    description: "Type and preview exactly how your automated DMs will render in the customer's phone inbox.",
    category: "Utility",
    icon: "Heart",
    faqs: [
      {
        q: "How do automated Instagram DMs display on mobile screens?",
        a: "Automated DMs render inside the standard Instagram Direct inbox as rich text bubbles accompanied by clickable CTA buttons."
      },
      {
        q: "What is the character limit for automated Instagram direct messages?",
        a: "Each Instagram DM text block allows up to 1,000 characters. Keeping initial automated messages under 250 characters maximizes response rates."
      },
      {
        q: "How do interactive call-to-action buttons work inside Instagram DMs?",
        a: "Official Instagram API buttons allow users to click directly to an external website, launch a checkout, or trigger the next message in a conversation flow."
      },
      {
        q: "What is the recommended message length to prevent user drop-off in DMs?",
        a: "Short 2-3 sentence messages accompanied by a clear action button yield the highest click-through rates in chat funnels."
      },
      {
        q: "Is automated DM messaging safe and compliant with Instagram API policies?",
        a: "Yes, provided you use Meta-approved API platforms like Cacto that respond only when users initiate interaction by commenting or messaging."
      },
      {
        q: "How do personalized variables (like first name) improve DM reply rates?",
        a: "Personalizing DM messages with the user's Instagram handle or first name makes automated interactions feel conversational, raising engagement by 25%."
      }
    ],
    steps: [
      { step: 1, title: "Type Message Copy", desc: "Draft message text and specify CTA button URL." },
      { step: 2, title: "Preview Smartphone Bubble", desc: "View real-time rendering in iOS/Android DM simulator." },
      { step: 3, title: "Export to Cacto", desc: "Copy verified copy directly into Cacto Auto-DM workflow builder." }
    ],
    usecases: [
      "Auto-DM Button CTA Testing",
      "Lead Magnet DM Delivery Preview",
      "Direct Checkout DM Formatting",
      "Personalized Handle Variable Testing"
    ],
    benefits: [
      "Realistic Smartphone Inbox Simulator",
      "Interactive Button Click Preview",
      "Character Limit Warning Guard",
      "Meta API Format Compliant"
    ],
    deviceGuide: {
      mobile: "Simulates exact iPhone & Android chat bubble dimensions.",
      desktop: "Live side-by-side editor and mobile mock container."
    },
    comparison: {
      feature: "DM Copy Verification",
      cacto: "Live Smartphone Inbox Previewer",
      traditional: "Plain Unformatted Text Box"
    }
  },
  {
    slug: "reel-downloader",
    title: "Instagram Reel Downloader",
    description: "Download Instagram Reels, video clips, and IGTV posts in HD MP4 quality instantly without watermarks.",
    category: "Utility",
    icon: "Download",
    faqs: [
      {
        q: "How do you download Instagram Reels in HD MP4 quality legally?",
        a: "Paste the public Instagram Reel URL into Cacto's Reel Downloader to extract HD MP4 video streams without compression for personal analysis."
      },
      {
        q: "Can you download Instagram Reels without watermarks for audio and video research?",
        a: "Yes. Cacto extracts original MP4 video files directly from Instagram CDN servers without adding third-party watermarks or branding."
      },
      {
        q: "What is the maximum resolution for downloaded Instagram Reels?",
        a: "Reels are extracted at their maximum original uploaded resolution (typically 1080x1920 HD at 30 or 60 frames per second)."
      },
      {
        q: "Is it legal to download Instagram Reels for personal reference and content auditing?",
        a: "Downloading public Reels for personal research, educational analysis, or offline backup is permissible under fair use; re-uploading copyrighted content without permission is prohibited."
      },
      {
        q: "Why do some Instagram Reel download tools fail on private accounts?",
        a: "Instagram API and CDN access policies restrict media downloading from private profiles to protect user privacy."
      },
      {
        q: "How do you save Instagram Reel thumbnails and audio clips?",
        a: "Cacto extracts both the full MP4 video file and high-resolution video thumbnail image (JPG) for complete media auditing."
      }
    ],
    steps: [
      { step: 1, title: "Paste Reel URL", desc: "Insert public Instagram Reel or video URL into extraction box." },
      { step: 2, title: "Extract Media Streams", desc: "Server retrieves original HD MP4 video and cover thumbnail." },
      { step: 3, title: "Download File", desc: "Save high-definition MP4 or JPG cover image with one click." }
    ],
    usecases: [
      "Competitor Video Audit & Analysis",
      "Content Repurposing & Archiving",
      "Offline Audio & Visual Research",
      "Creative Board Moodboarding"
    ],
    benefits: [
      "Original HD 1080p Resolution",
      "No Watermarks or Branding Added",
      "Extracts MP4 Video & JPG Cover",
      "Fast Direct CDN Downloads"
    ],
    deviceGuide: {
      mobile: "Downloads directly to iOS Files or Android Downloads.",
      desktop: "High-speed batch media download capabilities."
    },
    comparison: {
      feature: "Media Extraction Quality",
      cacto: "Original HD MP4 Without Watermarks",
      traditional: "Compressed Low-Res Watermarked Video"
    }
  },
  {
    slug: "reel-transcript",
    title: "Instagram Transcript Generator",
    description: "Extract, generate, and copy timestamped text transcripts from any Instagram Reel or video instantly.",
    category: "Generators",
    icon: "FileText",
    faqs: [
      {
        q: "How do you extract and copy text transcripts from Instagram Reels automatically?",
        a: "Paste any public Reel URL into Cacto's Transcript Generator to process the audio stream and receive a timestamped text transcript instantly."
      },
      {
        q: "Why are transcripts useful for repurposing Instagram video content into blog posts?",
        a: "Transcripts convert spoken video content into structured text, making it easy to create blog articles, newsletter issues, and carousel captions in seconds."
      },
      {
        q: "Can you generate timestamped transcripts from Instagram video clips?",
        a: "Yes, Cacto's transcription engine segments audio into time-coded blocks (e.g. [0:00 - 0:05]) for easy video editing reference."
      },
      {
        q: "How do video transcripts improve SEO and content indexing for creators?",
        a: "Transcribing video audio provides crawlable text for search engines and AI assistants, improving overall search discoverability."
      },
      {
        q: "Does transcribing Reels help write better captions and video hooks?",
        a: "Analyzing successful Reel transcripts helps creators identify winning hook structures, pacing patterns, and high-converting speech triggers."
      },
      {
        q: "What audio quality is needed for accurate speech-to-text video extraction?",
        a: "Clear spoken voice audio with minimal background noise yields up to 98% transcription accuracy."
      }
    ],
    steps: [
      { step: 1, title: "Paste Reel URL", desc: "Paste public Instagram Reel link into the transcription engine." },
      { step: 2, title: "Process Audio Stream", desc: "Speech-to-text algorithm generates timestamped script blocks." },
      { step: 3, title: "Export Transcript", desc: "Copy full text or download structured .TXT file with timestamps." }
    ],
    usecases: [
      "Reel Spoken Content Repurposing",
      "Converting Shorts to Blog Articles",
      "SEO Transcript Indexing",
      "Speech Pattern & Hook Auditing"
    ],
    benefits: [
      "Timestamped Segment Blocks",
      "Calculated Reading Time & Word Count",
      "Export as .TXT or Clipboard",
      "98%+ Speech Accuracy"
    ],
    deviceGuide: {
      mobile: "One-tap text copy directly into notes apps.",
      desktop: "Side-by-side transcript and video reference."
    },
    comparison: {
      feature: "Transcription Precision",
      cacto: "Timestamped & Repurposing-Ready Text",
      traditional: "Manual Typing from Video Audio"
    }
  },
  {
    slug: "carousel-generator",
    title: "Instagram Carousel Generator",
    description: "Generate structured multi-slide Instagram carousel outlines with hooks, value slides, visual themes, and conversion CTAs.",
    category: "Generators",
    icon: "Layers",
    faqs: [
      {
        q: "How do you export 1080x1350 HD carousel slides?",
        a: "Select your preferred design theme in Cacto Carousel Generator and click 'Download Active Slide PNG' or 'Batch Export Deck' to save 1080x1350 300 DPI images."
      },
      {
        q: "How do you convert carousel readers into DM leads?",
        a: "Include a clear call-to-action on the final slide instructing scrollers to comment a keyword (e.g. 'SCALE'), then use Cacto Auto-DM to deliver your lead magnet."
      },
      {
        q: "What is the ideal slide count for Instagram carousel posts in 2026?",
        a: "Carousels with 7 to 10 slides achieve the highest save rates and dwell times by breaking complex topics into digestible steps."
      },
      {
        q: "Why do Instagram carousels get higher re-feed impressions than single images?",
        a: "If a follower skips a carousel on their first feed pass, Instagram often re-serves the post displaying slide 2, effectively doubling impression opportunities."
      },
      {
        q: "How do you write continuous visual and narrative flow across carousel slides?",
        a: "Use seamless visual elements (like arrows or continuing background shapes) and end each slide with open loop questions prompting the user to swipe."
      },
      {
        q: "What fonts and design themes work best for readable Instagram carousels?",
        a: "Use high-contrast themes (e.g., bold dark mode or crisp emerald light mode) paired with clean sans-serif typography (like Inter or Outfit) sized for mobile screens."
      }
    ],
    steps: [
      { step: 1, title: "Input Carousel Topic", desc: "Type topic, select slide count (2-10), and pick visual theme." },
      { step: 2, title: "Generate Slide Deck", desc: "Engine creates slide-by-slide copy with hooks, value, and CTAs." },
      { step: 3, title: "Export Slide Images", desc: "Download high-resolution 1080x1350 slide graphics for posting." }
    ],
    usecases: [
      "Educational Step-by-Step Decks",
      "Lead Magnet Showcase Carousels",
      "Product Feature Highlights",
      "High-Save Infographic Posts"
    ],
    benefits: [
      "1080x1350 HD Canvas Output",
      "Multiple Color & Typography Themes",
      "Slide 1 Hook & Final Slide CTA Framework",
      "Batch Export Capabilities"
    ],
    deviceGuide: {
      mobile: "Preview carousel swipe gestures directly on phone.",
      desktop: "Full multi-slide grid view for rapid deck editing."
    },
    comparison: {
      feature: "Carousel Output Format",
      cacto: "HD 1080x1350 Ready-to-Post Slide Decks",
      traditional: "Unformatted Plain Text Bullet Points"
    }
  },
  {
    slug: "text-formatter",
    title: "Instagram Bold & Fancy Text Formatter",
    description: "Convert standard text into 8 bold, italic, script, fraktur, and monospace Unicode font styles for Instagram bios & captions.",
    category: "Utility",
    icon: "AlignLeft",
    faqs: [
      {
        q: "How do Unicode font generators work on Instagram?",
        a: "Unicode text formatters convert standard ASCII characters into mathematical and styled Unicode symbols supported across Instagram bios, captions, and comments."
      },
      {
        q: "Will styled Unicode fonts affect search accessibility or screen readers?",
        a: "Using bold or italic Unicode fonts sparingly highlights key phrases. Avoid converting entire paragraphs so screen readers can parse your text smoothly."
      },
      {
        q: "Which Unicode font styles are supported in Instagram bios and captions?",
        a: "Instagram supports Bold Sans, Bold Serif, Italic Sans, Italic Serif, Script, Fraktur, Monospace, and Strikethrough Unicode styles."
      },
      {
        q: "Can styled Unicode text increase Instagram caption engagement?",
        a: "Yes. Formatting hooks and call-to-action triggers with bold or monospace text creates visual contrast that grabs scrollers' attention in mobile feeds."
      },
      {
        q: "How do you add clean line breaks along with styled text on Instagram?",
        a: "Cacto's Text Formatter automatically combines character styling with zero-width space characters (\\u2800) between paragraph breaks to preserve clean line spacing."
      },
      {
        q: "Does using bold Unicode fonts lower Instagram SEO search indexing?",
        a: "Primary SEO keywords should remain in standard text for full search indexing. Use bold or italic Unicode fonts on hooks, headers, and call-to-action emphasis words."
      }
    ],
    steps: [
      { step: 1, title: "Input Standard Text", desc: "Type or paste words into the live conversion box." },
      { step: 2, title: "Select Unicode Style", desc: "Choose Bold, Italic, Script, Monospace, or Fraktur font styles." },
      { step: 3, title: "Copy Styled Output", desc: "Copy styled text with clean line breaks into Instagram." }
    ],
    usecases: [
      "Caption Hook Emphasizing",
      "Bio Sub-Header Styling",
      "Keyword CTA Highlighting",
      "Comment Section Attention Grabbing"
    ],
    benefits: [
      "8 Unique Unicode Font Styles",
      "Integrated Zero-Width Line Breaker",
      "Screen Reader Safe Formatting",
      "One-Tap Style Copying"
    ],
    deviceGuide: {
      mobile: "Supports fast copy-paste on mobile keyboards.",
      desktop: "Live preview across 8 font variations simultaneously."
    },
    comparison: {
      feature: "Font Transformation Scope",
      cacto: "8 Unicode Styles + Invisible Line Breaker",
      traditional: "Basic Single-Style Font Converter"
    }
  },
  {
    slug: "profile-feedback",
    title: "Instagram Profile Audit & Feedback Tool",
    description: "Get real-time multi-vector bio scores, handle analysis, CTA friction checks, and AI copy recommendations.",
    category: "Utility",
    icon: "ClipboardList",
    faqs: [
      {
        q: "How does the profile audit scoring algorithm evaluate Instagram accounts?",
        a: "Our multi-vector algorithm evaluates Handle Readability (20 pts), Bio Hook Clarity (30 pts), CTA Link Friction (25 pts), and Niche Keyword Density (25 pts) for a total score out of 100."
      },
      {
        q: "What is a good Instagram profile conversion score?",
        a: "A score of 80+ indicates a high-converting profile optimized for follower growth and DM lead capture. Scores below 60 have friction in bio hooks or CTAs."
      },
      {
        q: "Why is CTA link friction important for social media profiles?",
        a: "Complex bio links or multi-choice link trees confuse profile visitors. Direct DM trigger keywords or single-destination links yield up to 5x higher conversion rates."
      },
      {
        q: "How do niche keywords in bios improve Instagram search ranking?",
        a: "Instagram search indexes bio text and name fields. Including targeted niche terms helps your profile rank higher when users search for your services."
      },
      {
        q: "How often should creators perform an Instagram profile feedback audit?",
        a: "Perform a profile audit monthly or whenever launching a new offer, digital product, or lead magnet campaign to maintain high bio-to-follower conversion rates."
      },
      {
        q: "What is the most common reason Instagram bios fail to convert profile traffic?",
        a: "Vague personal statements without a clear target audience value proposition or call-to-action cause visitors to bounce without following or requesting links."
      }
    ],
    steps: [
      { step: 1, title: "Input Handle & Bio", desc: "Enter your Instagram handle and current profile bio text." },
      { step: 2, title: "Run Multi-Vector Audit", desc: "Algorithm analyzes hook clarity, keyword density, and CTA friction." },
      { step: 3, title: "Apply Optimization Plan", desc: "Implement recommendations to increase bio conversion score to 80+." }
    ],
    usecases: [
      "Profile Conversion Rate Optimization",
      "Instagram SEO Keyword Auditing",
      "Bio Hook Clarity Assessment",
      "Link Friction Reduction"
    ],
    benefits: [
      "100-Point Multi-Vector Scoring",
      "Specific Actionable Copy Improvements",
      "Instant SEO Keyword Check",
      "Reduces Profile Bounce Rates"
    ],
    deviceGuide: {
      mobile: "Fast audit check directly on smartphone.",
      desktop: "Detailed breakdown of sub-scores and recommendations."
    },
    comparison: {
      feature: "Audit Scoring Depth",
      cacto: "Multi-Vector Conversion & SEO Audit",
      traditional: "Generic Aesthetic Profile Tips"
    }
  },
  {
    slug: "claude-skills",
    title: "Claude Skills & Prompt Generator for Social Media",
    description: "Generate structured Claude system prompts, custom skill instructions, and AI agent templates for Instagram content creation and DM funnels.",
    category: "Generators",
    icon: "Sparkles",
    faqs: [
      {
        q: "What are Claude Skills and how do they automate social media workflows?",
        a: "Claude Skills are structured instruction sets (using SKILL.md format and YAML frontmatter) that equip Anthropic's Claude AI agents with context and templates for writing social content."
      },
      {
        q: "How do you write effective Claude system prompts for Instagram content creation?",
        a: "Specify persona tone, brand positioning, hook frameworks (FOMO, curiosity, benefit), character limits, and explicit output formatting with comment-trigger CTAs."
      },
      {
        q: "Can Claude generated prompts help maintain consistent brand voice across Reel scripts?",
        a: "Yes. By defining target audience rules and sentence length in custom Claude skill templates, the AI produces consistent Reel scripts aligned with brand guidelines."
      },
      {
        q: "What is the difference between standard ChatGPT prompts and structured Claude Skills?",
        a: "Structured Claude Skills combine system prompts, behavioral boundaries, step-by-step verification checklists, and reusable templates for multi-step AI automation workflows."
      },
      {
        q: "How do AI prompt templates optimize Instagram comment-to-DM conversion copy?",
        a: "Prompt templates instruct Claude to craft short 2-line DM response messages, high-intent single keyword triggers, and follow-up sequences that maximize link CTRs."
      },
      {
        q: "How can solo creators scale content production using Claude prompt generators?",
        a: "Generators allow creators to quickly generate tailored prompts for Reel script outlines, carousel slide decks, email lead magnet follow-ups, and post captions in seconds."
      }
    ],
    steps: [
      { step: 1, title: "Define AI Skill Role", desc: "Select skill type (Caption Writer, Reel Scriptwriter, DM Copywriter)." },
      { step: 2, title: "Specify Guidelines", desc: "Input brand voice rules, target audience, and comment trigger CTAs." },
      { step: 3, title: "Export SKILL.md", desc: "Copy structured markdown instruction block with YAML frontmatter." }
    ],
    usecases: [
      "AI Agent System Prompt Engineering",
      "Automated Social Content Generation",
      "Standardizing Team Brand Tone",
      "Claude Custom Skill Creation"
    ],
    benefits: [
      "Valid YAML Frontmatter Formatting",
      "Structured Step-by-Step Prompts",
      "Tailored Social Media Frameworks",
      "Compatible with Claude 3.5 Sonnet"
    ],
    deviceGuide: {
      mobile: "Copy prompts directly to Claude app on mobile.",
      desktop: "Save SKILL.md files into project repositories."
    },
    comparison: {
      feature: "Prompt Structure Quality",
      cacto: "Structured SKILL.md with Frontmatter Rules",
      traditional: "Basic Single-Sentence Prompt"
    }
  },
  {
    slug: "post-booster",
    title: "Instagram Post & Reel Reach Booster",
    description: "Calculate post reach potential, optimal posting time windows, and engagement velocity scores for Reels and posts.",
    category: "Calculators",
    icon: "TrendingUp",
    faqs: [
      {
        q: "What is an Instagram engagement velocity score and why does it matter?",
        a: "Engagement velocity measures how quickly a post receives likes, comments, saves, and shares within the first 30 to 60 minutes of publishing, triggering algorithm reach."
      },
      {
        q: "How do saves and shares impact Instagram Reel algorithm distribution compared to likes?",
        a: "Instagram's recommendation algorithm heavily weights shares (direct messaging to friends) and saves over simple likes, indicating high peer virality and value."
      },
      {
        q: "How does comment automation boost post reach and velocity?",
        a: "Comment automation prompts scrollers to leave keyword comments and sends immediate automated public replies, doubling post comment counts and accelerating velocity."
      },
      {
        q: "What are the best times to post Instagram Reels for maximum initial reach?",
        a: "Optimal posting windows depend on audience active hours shown in Instagram Professional Insights, typically between 8-10 AM and 6-9 PM in your target audience's timezone."
      },
      {
        q: "How many hours after posting does the Instagram Reel recommendation algorithm test content?",
        a: "Instagram tests Reels in small audience buckets over the first 24 to 72 hours, expanding distribution to Explore feeds whenever retention and interaction velocity cross benchmarks."
      },
      {
        q: "How do you recalculate reach projections when trying different caption hooks?",
        a: "Use Cacto's Reach Booster to compare reach multipliers across hook categories, comment trigger CTAs, and posting time slots to forecast total 7-day impressions."
      }
    ],
    steps: [
      { step: 1, title: "Input Early Interactions", desc: "Enter 30-minute views, comments, saves, and shares." },
      { step: 2, title: "Calculate Velocity Score", desc: "View calculated reach velocity multiplier and algorithm score." },
      { step: 3, title: "Boost Comment Velocity", desc: "Trigger automated instant replies to multiply post interaction signals." }
    ],
    usecases: [
      "Post Initial 60-Min Velocity Audit",
      "Reel Algorithm Multiplier Forecasting",
      "Optimal Posting Window Calculation",
      "Comment Automation Reach Acceleration"
    ],
    benefits: [
      "Calculates Share & Save Weighted Velocity",
      "Identifies Algorithm Test Window Success",
      "Actionable Reach Improvement Tips",
      "Free Unlimited Velocity Audits"
    ],
    deviceGuide: {
      mobile: "Check post velocity status 30 mins after posting.",
      desktop: "Compare velocity curves across multiple posts."
    },
    comparison: {
      feature: "Reach Velocity Metrics",
      cacto: "Weighted Share + Save Velocity Score",
      traditional: "Static View Count Baseline"
    }
  },
  {
    slug: "photo-downloader",
    title: "Instagram Photo Downloader",
    description: "Download full-size HD photos, carousel slides, and profile pictures from any Instagram post or profile URL. No watermark, no login, no app install.",
    category: "Utility",
    icon: "Image",
    seoKeywords: [
      "instagram photo downloader",
      "download instagram photos",
      "instagram image saver",
      "save instagram pictures",
      "instagram carousel downloader",
      "instagram dp downloader",
      "download instagram profile picture",
      "instagram photo download online",
      "save instagram photos hd",
      "instagram picture downloader free"
    ],
    faqs: [
      {
        q: "How do you download Instagram photos in full HD quality without losing resolution?",
        a: "Paste the public Instagram post URL into Cacto's Photo Downloader. The tool extracts the original high-resolution image directly from Instagram's CDN servers, preserving the full upload quality without any compression or watermarks."
      },
      {
        q: "Can you download all slides from an Instagram carousel post at once?",
        a: "Yes. Cacto's Photo Downloader detects carousel posts automatically and extracts every slide image individually. Use the navigation arrows to preview each slide and download them one by one in full HD JPG format."
      },
      {
        q: "How do you download an Instagram profile picture in full size without cropping?",
        a: "Paste the Instagram profile URL (e.g. instagram.com/username) into the tool. It detects profile links and extracts the full-resolution display picture, bypassing Instagram's default circular crop and thumbnail compression."
      },
      {
        q: "Is it legal to download photos from Instagram for personal use?",
        a: "Downloading publicly posted photos for personal reference, mood boards, or offline archiving falls under fair use. Re-uploading, selling, or claiming ownership of copyrighted images without the creator's permission is prohibited."
      },
      {
        q: "Why do some Instagram photo download tools fail on private accounts?",
        a: "Instagram's API and CDN access policies restrict media access from private profiles to protect user privacy. Only photos from public accounts can be extracted by third-party download tools."
      },
      {
        q: "What image dimensions and quality does the Instagram Photo Downloader support?",
        a: "The tool extracts photos at their original uploaded resolution, typically 1080x1080 for square posts, 1080x1350 for portrait posts, and up to 1440x1800 for high-resolution uploads. No quality loss occurs during download."
      }
    ],
    steps: [
      { step: 1, title: "Paste Instagram URL", desc: "Insert any public Instagram post, carousel, or profile URL into the extraction field." },
      { step: 2, title: "Extract HD Photos", desc: "Server retrieves original full-resolution images, carousel slides, or profile picture." },
      { step: 3, title: "Download Images", desc: "Save individual HD JPG photos or profile pictures with one click." }
    ],
    usecases: [
      "Competitor Visual Content Auditing",
      "Mood Board & Creative Inspiration Archiving",
      "Carousel Slide Research & Analysis",
      "Profile Picture Full-Size Extraction",
      "Offline Content Backup & Portfolio Review",
      "Brand Asset Collection & Reference"
    ],
    benefits: [
      "Original HD Resolution Preserved",
      "No Watermarks or Branding Added",
      "Carousel Multi-Slide Support",
      "Profile Picture Full-Size Download",
      "Zero Login or App Install Required"
    ],
    deviceGuide: {
      mobile: "Downloads directly to iOS Photos or Android Gallery with one tap.",
      desktop: "High-speed batch carousel slide downloads with full preview."
    },
    comparison: {
      feature: "Photo Extraction Quality",
      cacto: "Original HD JPG Without Watermarks or Compression",
      traditional: "Low-Res Screenshot or Watermarked Thumbnail"
    }
  }
]

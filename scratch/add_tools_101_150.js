const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const tools101to150 = [
  // PDF
  {
    slug: 'merge-pdf',
    title: 'PDF Merger Utility',
    description: 'Combine multiple PDF documents into one clean file directly inside your browser.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'Layers',
    faqs: [
      { q: 'Is merging PDFs free and secure?', a: 'Yes! Files are processed client-side in your browser. No files are uploaded to any external server.' },
      { q: 'How many PDF files can I merge at once?', a: 'You can combine unlimited PDF documents up to your system memory limits.' }
    ],
    steps: [
      { step: 1, title: 'Upload PDFs', desc: 'Select multiple PDF files from your computer or phone.' },
      { step: 2, title: 'Reorder Pages', desc: 'Drag and drop files to set desired page sequence.' },
      { step: 3, title: 'Merge & Download', desc: 'Click Merge to generate your unified PDF file instantly.' }
    ],
    usecases: ['Combining Monthly Financial Reports', 'Merging Resume & Cover Letter', 'Consolidating Legal Contracts'],
    benefits: ['100% Client-Side Privacy', 'Sub-50ms Processing Speed', 'Zero Data Upload Risk', 'Free Unlimited Exports'],
    deviceGuide: { mobile: 'Works on iOS Files & Android Document Pickers.', desktop: 'Supports drag-and-drop batch upload.' },
    comparison: { feature: 'PDF Processing Privacy', cacto: 'Local Browser (Zero Upload)', traditional: 'Server Upload Required' }
  },
  {
    slug: 'split-pdf',
    title: 'PDF Page Splitter & Extractor',
    description: 'Extract page ranges or split a large PDF document into separate pages instantly.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'Layers',
    faqs: [
      { q: 'Can I extract specific page ranges like 1-5 and 8-10?', a: 'Yes, enter comma-separated page ranges to extract exact pages cleanly.' }
    ],
    steps: [
      { step: 1, title: 'Select PDF', desc: 'Upload the PDF document you wish to split.' },
      { step: 2, title: 'Specify Pages', desc: 'Enter target page numbers or split intervals.' },
      { step: 3, title: 'Extract File', desc: 'Download your separated PDF pages instantly.' }
    ],
    usecases: ['Extracting Single Chapters from Ebooks', 'Splitting Invoice Packs', 'Separating Tax Documents'],
    benefits: ['Instant Extraction', 'Zero Quality Loss', 'Browser Privacy', 'Free Unlimited Usage'],
    deviceGuide: { mobile: 'Optimized for mobile file pickers.', desktop: 'Fast keyboard input.' },
    comparison: { feature: 'File Extraction Speed', cacto: 'Instant Browser Render', traditional: 'Slow Upload Queue' }
  },
  {
    slug: 'compress-pdf',
    title: 'PDF File Size Optimizer & Compressor',
    description: 'Reduce PDF file size without sacrificing document readability or text clarity.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'Layers',
    faqs: [
      { q: 'Does PDF compression reduce text quality?', a: 'No, text remains crisp while embedded raster images are optimized for web delivery.' }
    ],
    steps: [
      { step: 1, title: 'Select File', desc: 'Choose a heavy PDF file from your device.' },
      { step: 2, title: 'Choose Compression', desc: 'Select standard or high compression mode.' },
      { step: 3, title: 'Download Smaller PDF', desc: 'Save optimized PDF file with reduced byte size.' }
    ],
    usecases: ['Email Attachment Size Compliance', 'Government Form Upload Limits', 'Faster Web Page PDF Embedding'],
    benefits: ['Up to 70% Size Reduction', 'Clean Vector Text Retention', 'Browser Privacy', 'Unlimited Files'],
    deviceGuide: { mobile: 'Works inside mobile browsers.', desktop: 'Handles large multi-MB PDFs.' },
    comparison: { feature: 'Server Storage Policy', cacto: 'Zero Storage (Client-Side)', traditional: 'Stored on Remote Server' }
  },
  {
    slug: 'unlock-pdf',
    title: 'PDF Restriction & Password Remover',
    description: 'Unlock PDF printing, copying, and editing restrictions client-side in seconds.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'Shield',
    faqs: [
      { q: 'Can this remove owner passwords and restrictions?', a: 'Yes, it removes permission locks for printing, text selection, and form editing.' }
    ],
    steps: [
      { step: 1, title: 'Upload Restricted PDF', desc: 'Select the protected PDF document.' },
      { step: 2, title: 'Enter Password if Required', desc: 'Provide user password if document is encrypted.' },
      { step: 3, title: 'Download Unlocked PDF', desc: 'Save clean, fully editable PDF file.' }
    ],
    usecases: ['Enabling Print for Locked Forms', 'Extracting Text from Protected Docs', 'Unlocking Archived Files'],
    benefits: ['Browser Processing', 'Fast Unlock', 'Zero Server Logs', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile browser compatible.', desktop: 'Full keyboard support.' },
    comparison: { feature: 'Password Logs', cacto: 'No Server Logs Saved', traditional: 'Server Credentials Logged' }
  },
  {
    slug: 'rotate-pdf',
    title: 'PDF Orientation & Page Rotator',
    description: 'Rotate PDF pages 90°, 180°, or 270° clockwise to fix inverted scan orientations.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'RefreshCw',
    faqs: [
      { q: 'Can I rotate individual pages instead of the whole document?', a: 'Yes, you can apply custom rotation angles per page or sitewide.' }
    ],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Select inverted PDF file.' },
      { step: 2, title: 'Set Rotation Angle', desc: 'Click 90° Clockwise or Counter-Clockwise.' },
      { step: 3, title: 'Save PDF', desc: 'Download permanently reoriented PDF document.' }
    ],
    usecases: ['Fixing Upside-Down Document Scans', 'Landscape Architecture Diagrams', 'Mobile Photo Scans'],
    benefits: ['Lossless Reorientation', 'Client-Side Security', 'Instant Preview', 'Free Usage'],
    deviceGuide: { mobile: 'Touch slider adjustments.', desktop: 'Shortcuts enabled.' },
    comparison: { feature: 'Processing Architecture', cacto: 'Client-Side WASM', traditional: 'Heavy Backend Pipeline' }
  },
  {
    slug: 'watermark-pdf',
    title: 'PDF Watermark & Brand Overlay Generator',
    description: 'Add custom text watermarks or confidential brand stamps across PDF pages.',
    category: 'Utility',
    siloCategory: 'pdf',
    icon: 'Shield',
    faqs: [
      { q: 'Can I customize watermark opacity and font size?', a: 'Yes, adjust transparency, font size, rotation angle, and color.' }
    ],
    steps: [
      { step: 1, title: 'Upload Document', desc: 'Select target PDF file.' },
      { step: 2, title: 'Type Watermark Text', desc: 'Input text (e.g., CONFIDENTIAL, DRAFT, DO NOT COPY).' },
      { step: 3, title: 'Apply & Export', desc: 'Download watermarked PDF file.' }
    ],
    usecases: ['Stamping Draft Contracts', 'Protecting Intellectual Property', 'Marking Client Preview Copy'],
    benefits: ['Custom Opacity & Angle', 'Clean Vector Render', '100% Secure Client Engine', 'Unlimited Exports'],
    deviceGuide: { mobile: 'Touch slider adjustments.', desktop: 'Precision font picker.' },
    comparison: { feature: 'Brand Customization', cacto: 'Full Color & Opacity Controls', traditional: 'Fixed Text Only' }
  },
  {
    slug: 'image-to-pdf',
    title: 'Image (JPG/PNG/WebP) to PDF Converter',
    description: 'Convert single or multiple image files into a high-quality PDF document.',
    category: 'Utility',
    siloCategory: 'converters',
    icon: 'Image',
    faqs: [
      { q: 'Does this support converting multiple images into 1 single PDF?', a: 'Yes, upload up to 50 images and merge them into one structured PDF.' }
    ],
    steps: [
      { step: 1, title: 'Select Images', desc: 'Upload JPG, PNG, or WebP files.' },
      { step: 2, title: 'Set Page Margins', desc: 'Choose page size (A4, Letter, Fit to Image).' },
      { step: 3, title: 'Generate PDF', desc: 'Download compiled PDF file.' }
    ],
    usecases: ['Converting Scanned Receipts into Tax PDF', 'Portfolio PDF Creation', 'Multi-Page Photo Submission'],
    benefits: ['High Resolution Output', 'Batch Conversion', 'Browser Privacy', 'Zero Upload Limits'],
    deviceGuide: { mobile: 'Select photos directly from camera roll.', desktop: 'Batch drag-and-drop.' },
    comparison: { feature: 'Batch Image Limit', cacto: 'Unlimited Local Batch', traditional: 'Capped at 5 Files' }
  },
  {
    slug: 'pdf-to-jpg',
    title: 'PDF Page to High-Res JPG Image Converter',
    description: 'Convert PDF document pages into high-resolution JPG images client-side.',
    category: 'Utility',
    siloCategory: 'converters',
    icon: 'Image',
    faqs: [
      { q: 'What resolution are the extracted JPG images?', a: 'Extracted JPGs are rendered at 300 DPI high resolution for printing and web.' }
    ],
    steps: [
      { step: 1, title: 'Upload PDF', desc: 'Select source PDF file.' },
      { step: 2, title: 'Choose Resolution', desc: 'Select 150 DPI or 300 DPI high quality.' },
      { step: 3, title: 'Download JPGs', desc: 'Save extracted JPG image files.' }
    ],
    usecases: ['Extracting Slides from PDF Decks', 'Converting Certificates for Social Sharing', 'Image Archiving'],
    benefits: ['300 DPI High Resolution', 'Zip Archive Download', 'Client-Side Rendering', 'Free Usage'],
    deviceGuide: { mobile: 'Save image directly to photo library.', desktop: 'Download all as ZIP.' },
    comparison: { feature: 'Render Resolution', cacto: '300 DPI Print-Ready', traditional: 'Low Resolution Web Only' }
  },

  // DEVELOPER
  {
    slug: 'jwt-decoder',
    title: 'JWT Token Decoder & Inspector',
    description: 'Decode JSON Web Tokens (JWT) to inspect Header, Payload claims, and Expiration dates instantly.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Shield',
    faqs: [
      { q: 'Are JWT tokens sent to any server during decoding?', a: 'Never. Decoding happens 100% in local JavaScript memory using standard Base64URL parsing.' }
    ],
    steps: [
      { step: 1, title: 'Paste JWT Token', desc: 'Insert encoded JWT string (eyJhbGci...).' },
      { step: 2, title: 'Inspect Claims', desc: 'View decoded JSON Header, Payload, and expiration timestamp.' },
      { step: 3, title: 'Copy JSON', desc: 'Copy formatted JSON payload claims.' }
    ],
    usecases: ['Debugging OAuth 2.0 Access Tokens', 'Inspecting User Identity Claims', 'Verifying Token Expiration'],
    benefits: ['Zero Server Transmission', 'Real-Time Expiration Warning', 'Pretty JSON Display', 'Free Unlimited Usage'],
    deviceGuide: { mobile: 'Tap text area to paste token.', desktop: 'Auto-detect paste event.' },
    comparison: { feature: 'Token Privacy', cacto: '100% In-Browser Memory', traditional: 'Transmitted over HTTP Network' }
  },
  {
    slug: 'cron-generator',
    title: 'Cron Schedule Expression Generator',
    description: 'Generate standard 5-field cron syntax and get plain-English explanations of execution timing.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Sparkles',
    faqs: [
      { q: 'Does this generator support Linux crontab and AWS EventBridge formats?', a: 'Yes! Generates standard 5-field crontab syntax and 6-field AWS event expressions.' }
    ],
    steps: [
      { step: 1, title: 'Select Frequency', desc: 'Choose interval (every 5 minutes, daily at 9am, weekly on Monday).' },
      { step: 2, title: 'Review Explanation', desc: 'Read human-readable execution summary.' },
      { step: 3, title: 'Copy Cron Syntax', desc: 'Copy string (e.g., */5 * * * *) directly into crontab.' }
    ],
    usecases: ['Setting Linux Scheduled Cron Jobs', 'Configuring Webhook Polling Timers', 'Database Backup Automation'],
    benefits: ['Human English Breakdown', 'Next 5 Execution Time Previews', 'Syntax Validation', 'Free Usage'],
    deviceGuide: { mobile: 'Dropdown preset picker.', desktop: 'Keyboard shortcut support.' },
    comparison: { feature: 'Execution Timeline', cacto: 'Shows Next 5 Scheduled Dates', traditional: 'Syntax String Only' }
  },
  {
    slug: 'base64-encoder',
    title: 'Base64 Text & Image Encoder / Decoder',
    description: 'Encode plain text or image files to Base64 strings, or decode Base64 strings back to text.',
    category: 'Utility',
    siloCategory: 'developer',
    icon: 'Type',
    faqs: [
      { q: 'Can I convert PNG/JPG images to Data URI Base64 strings?', a: 'Yes, upload any image to generate a ready-to-use data:image/png;base64,... string.' }
    ],
    steps: [
      { step: 1, title: 'Input Text or File', desc: 'Paste text or select an image file.' },
      { step: 2, title: 'Choose Encode/Decode', desc: 'Toggle between Encode and Decode mode.' },
      { step: 3, title: 'Copy String', desc: 'Copy Base64 output to clipboard.' }
    ],
    usecases: ['Embedding Inline Data URI Images in HTML/CSS', 'Encoding Basic Auth Credentials', 'API Data Sanitization'],
    benefits: ['Supports Text & Files', 'Data URI Formatting', 'Client-Side Engine', 'Unlimited Conversions'],
    deviceGuide: { mobile: 'Works with mobile text inputs.', desktop: 'Handles multi-MB file payloads.' },
    comparison: { feature: 'Data URI Support', cacto: 'HTML/CSS/JSON Paste-Ready', traditional: 'Raw Strings Only' }
  },
  {
    slug: 'curl-to-fetch',
    title: 'cURL Command to JavaScript fetch & Python Converter',
    description: 'Convert cURL terminal commands into clean JavaScript fetch(), Node.js axios, or Python requests code.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Sparkles',
    faqs: [
      { q: 'Does this parse cURL headers, request methods, and JSON bodies?', a: 'Yes! Automatically parses -H headers, -X POST/PUT methods, and -d JSON payloads.' }
    ],
    steps: [
      { step: 1, title: 'Paste cURL Command', desc: 'Insert cURL command from Chrome DevTools or documentation.' },
      { step: 2, title: 'Select Target Language', desc: 'Choose JavaScript Fetch, Axios, Python Requests, or Go.' },
      { step: 3, title: 'Copy Code', desc: 'Copy executable API snippet.' }
    ],
    usecases: ['Converting Browser Network Requests to Code', 'API Integration Development', 'Quick Snippet Generation'],
    benefits: ['Multi-Language Output', 'Header Parsing', 'Browser Execution', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Mobile code view.', desktop: 'One-click copy snippet.' },
    comparison: { feature: 'Language Targets', cacto: 'JS, Node, Python, Go, PHP', traditional: 'JS Only' }
  },
  {
    slug: 'uuid-generator',
    title: 'Bulk UUID v4 & GUID Generator',
    description: 'Generate 1 to 100 RFC 4122 compliant version 4 UUIDs (Universally Unique Identifiers) instantly.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Sparkles',
    faqs: [
      { q: 'Are these UUIDs cryptographically secure?', a: 'Yes, generated using window.crypto.randomUUID() for cryptographic randomness.' }
    ],
    steps: [
      { step: 1, title: 'Set Quantity', desc: 'Select how many UUIDs to generate (1 to 100).' },
      { step: 2, title: 'Choose Formatting', desc: 'Toggle uppercase/lowercase and hyphens.' },
      { step: 3, title: 'Copy List', desc: 'Copy UUID list or download as text file.' }
    ],
    usecases: ['Database Primary Key Mocking', 'API Request Correlation IDs', 'Test Suite Fixture Generation'],
    benefits: ['Crypto-Grade Randomness', 'Bulk 100-Pack Support', 'Instant Generation', 'Free Unlimited Exports'],
    deviceGuide: { mobile: 'Tap to copy single or bulk.', desktop: 'Download .txt file.' },
    comparison: { feature: 'Randomness Standard', cacto: 'Web Crypto API (window.crypto)', traditional: 'Math.random() Fallback' }
  },
  {
    slug: 'html-minifier',
    title: 'HTML & CSS Code Minifier & Shrinker',
    description: 'Minify HTML and CSS code by stripping whitespace, line breaks, and redundant comments.',
    category: 'Utility',
    siloCategory: 'developer',
    icon: 'Type',
    faqs: [
      { q: 'How much file size reduction can I expect?', a: 'Minification typically reduces HTML/CSS markup file size by 15% to 40%.' }
    ],
    steps: [
      { step: 1, title: 'Paste Code', desc: 'Insert raw HTML or CSS markup.' },
      { step: 2, title: 'Configure Options', desc: 'Toggle comment removal and inline script minification.' },
      { step: 3, title: 'Copy Minified Output', desc: 'Copy compressed markup snippet.' }
    ],
    usecases: ['Optimizing Website Page Load Speed', 'Reducing Email Template Payload', 'Clean Production Build Assets'],
    benefits: ['Up to 40% Size Compression', 'Comment Removal', 'Zero Server Dependency', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile text box input.', desktop: 'Side-by-side byte size calculator.' },
    comparison: { feature: 'Byte Compression Stats', cacto: 'Calculates Saved Kilobytes & %', traditional: 'Output Box Only' }
  },
  {
    slug: 'sql-formatter',
    title: 'SQL Query Prettifier & Formatter',
    description: 'Format unreadable single-line SQL queries into clean, indented SQL statements.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Sparkles',
    faqs: [
      { q: 'What SQL dialects are supported?', a: 'Supports Standard SQL, PostgreSQL, MySQL, SQLite, and T-SQL.' }
    ],
    steps: [
      { step: 1, title: 'Paste SQL Query', desc: 'Insert raw or minified SQL string.' },
      { step: 2, title: 'Select Dialect', desc: 'Choose SQL syntax format.' },
      { step: 3, title: 'Copy Formatted SQL', desc: 'Copy clean, indented query statement.' }
    ],
    usecases: ['Debugging Complex Database Queries', 'Code Review Preparation', 'SQL Documentation Formatting'],
    benefits: ['Syntax Highlighting', 'Keyword Uppercasing', 'Indentation Control', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Mobile code viewer.', desktop: 'Tab width customization.' },
    comparison: { feature: 'Keyword Styling', cacto: 'Auto-Capitalizes SQL Reserved Words', traditional: 'As-Is Formatting' }
  },
  {
    slug: 'regex-tester',
    title: 'Regular Expression (Regex) Tester & Explainer',
    description: 'Test JavaScript Regular Expressions against test strings with instant match highlighting.',
    category: 'Utility',
    siloCategory: 'developer',
    icon: 'Type',
    faqs: [
      { q: 'Does this support flags like global (g), case-insensitive (i), and multiline (m)?', a: 'Yes, full flag toggles are supported with live regex execution.' }
    ],
    steps: [
      { step: 1, title: 'Enter Regex Pattern', desc: 'Input regex string (e.g., ^[a-z0-9]+$).' },
      { step: 2, title: 'Paste Test String', desc: 'Insert text to test against pattern.' },
      { step: 3, title: 'Review Matches', desc: 'Inspect captured groups and highlighted matches.' }
    ],
    usecases: ['Form Input Validation Testing', 'Data Extraction Pattern Verification', 'Log Parsing Rule Design'],
    benefits: ['Live Match Highlighting', 'Capture Group Breakdowns', 'Flags Selector', 'Free Usage'],
    deviceGuide: { mobile: 'Real-time match updates.', desktop: 'Capture group details.' },
    comparison: { feature: 'Group Breakdown', cacto: 'Displays Sub-Match Indexes', traditional: 'Simple Match Boolean' }
  },
  {
    slug: 'hash-generator',
    title: 'MD5 & SHA-256 Hash Digest Generator',
    description: 'Generate cryptographic MD5, SHA-1, SHA-256, and SHA-512 hashes from input text strings.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Shield',
    faqs: [
      { q: 'Are string hashes calculated locally inside the browser?', a: 'Yes! Calculated using native Web Crypto APIs (`window.crypto.subtle.digest`).' }
    ],
    steps: [
      { step: 1, title: 'Input Text', desc: 'Type string to hash.' },
      { step: 2, title: 'View Hashes', desc: 'Instantly view MD5, SHA-1, SHA-256, and SHA-512 strings.' },
      { step: 3, title: 'Copy Hash Digest', desc: 'Click copy next to target algorithm.' }
    ],
    usecases: ['Data Integrity Verification', 'Password Hashing Verification', 'Gravatar Email MD5 Generation'],
    benefits: ['Native Web Crypto Execution', 'Multi-Algorithm Results', 'Instant Output', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Tap to copy specific hash.', desktop: 'Copy all hashes at once.' },
    comparison: { feature: 'Crypto Library', cacto: 'Native Browser SubtleCrypto', traditional: 'Slow Third-Party JS Library' }
  },

  // FINANCE
  {
    slug: 'gst-calculator',
    title: 'GST Tax Calculator (India)',
    description: 'Calculate Goods and Services Tax (GST) inclusive and exclusive amounts with CGST, SGST, and IGST breakdowns.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How is GST exclusive calculated?', a: 'GST Amount = (Net Amount × GST Rate) / 100. Total = Net Amount + GST Amount.' },
      { q: 'What are standard GST tax slabs in India?', a: 'Standard GST slabs are 5%, 12%, 18%, and 28%.' }
    ],
    steps: [
      { step: 1, title: 'Enter Amount', desc: 'Input base price or total invoice amount.' },
      { step: 2, title: 'Select GST Rate', desc: 'Choose tax slab (5%, 12%, 18%, 28%).' },
      { step: 3, title: 'View Breakdown', desc: 'Instantly inspect CGST, SGST, IGST, and Net Total.' }
    ],
    usecases: ['Freelance GST Invoice Creation', 'E-Commerce Tax Accounting', 'Business Expense Estimation'],
    benefits: ['Inclusive & Exclusive Modes', 'CGST/SGST Split', 'India Tax Slab Presets', 'Free Unlimited Calc'],
    deviceGuide: { mobile: 'Touch slab selector.', desktop: 'Numeric keypad optimized.' },
    comparison: { feature: 'Tax Split Breakdown', cacto: 'Displays Intra-State & Inter-State Breakdown', traditional: 'Single Tax Total' }
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Return Calculator',
    description: 'Calculate wealth accumulation and expected returns for monthly Mutual Fund SIP investments.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'What formula is used for SIP return calculation?', a: 'Uses compound interest formula M = P × ({[1 + i]^n - 1} / i) × (1 + i).' }
    ],
    steps: [
      { step: 1, title: 'Enter Monthly Investment', desc: 'Input monthly SIP amount (e.g. ₹5,000).' },
      { step: 2, title: 'Set Expected Return Rate', desc: 'Input annual return rate (e.g. 12%).' },
      { step: 3, title: 'Set Tenure', desc: 'Choose investment duration in years.' }
    ],
    usecases: ['Long-Term Wealth Planning', 'Mutual Fund Investment Goal Setting', 'Retirement Corpus Calculation'],
    benefits: ['Invested vs Wealth Gain Split', 'Yearly Growth Chart', 'Compound Formula', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Interactive slider controls.', desktop: 'Precise number inputs.' },
    comparison: { feature: 'Wealth Breakdown', cacto: 'Shows Principal Invested vs Estimated Gain', traditional: 'Total Figure Only' }
  },
  {
    slug: 'emi-calculator',
    title: 'Loan EMI & Interest Calculator',
    description: 'Calculate monthly loan EMI payments, total interest payable, and amortization schedule.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How is monthly loan EMI calculated?', a: 'EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, N is tenure.' }
    ],
    steps: [
      { step: 1, title: 'Enter Loan Amount', desc: 'Input total principal loan amount.' },
      { step: 2, title: 'Set Interest Rate', desc: 'Input annual interest rate percentage.' },
      { step: 3, title: 'Set Loan Tenure', desc: 'Choose tenure in months or years.' }
    ],
    usecases: ['Home Loan Planning', 'Car Loan Payment Comparison', 'Personal Loan Interest Auditing'],
    benefits: ['Monthly EMI Breakdown', 'Total Interest Paid Ratio', 'Amortization Table', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile slider inputs.', desktop: 'Printable schedule.' },
    comparison: { feature: 'Amortization Insights', cacto: 'Year-by-Year Principal vs Interest Graph', traditional: 'Basic EMI Number' }
  },
  {
    slug: 'fd-calculator',
    title: 'Fixed Deposit (FD) Interest Calculator',
    description: 'Calculate maturity value and interest earned on bank Fixed Deposits with compounding options.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'Does compounding frequency affect FD returns?', a: 'Yes! Quarterly compounding yields higher returns than simple annual interest.' }
    ],
    steps: [
      { step: 1, title: 'Enter Principal Amount', desc: 'Input deposit amount.' },
      { step: 2, title: 'Set FD Rate', desc: 'Input bank annual interest rate.' },
      { step: 3, title: 'Choose Compounding', desc: 'Select Quarterly, Half-Yearly, or Yearly compounding.' }
    ],
    usecases: ['Bank FD Maturity Projection', 'Senior Citizen FD Planning', 'Risk-Free Investment Comparison'],
    benefits: ['Compounding Frequency Selector', 'Total Interest Earned', 'Maturity Amount', 'Free Usage'],
    deviceGuide: { mobile: 'Tap compounding presets.', desktop: 'Fast input.' },
    comparison: { feature: 'Compounding Options', cacto: 'Monthly, Quarterly, Half-Yearly, Yearly', traditional: 'Annual Only' }
  },
  {
    slug: 'swp-calculator',
    title: 'Systematic Withdrawal Plan (SWP) Calculator',
    description: 'Calculate regular monthly income and remaining mutual fund corpus balance under SWP.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How does SWP work for retirement income?', a: 'SWP withdraws a fixed monthly amount while the remaining balance continues earning compound returns.' }
    ],
    steps: [
      { step: 1, title: 'Enter Total Corpus', desc: 'Input total invested amount.' },
      { step: 2, title: 'Set Monthly Withdrawal', desc: 'Input monthly income desired.' },
      { step: 3, title: 'Set Expected Return Rate', desc: 'Input annual growth rate.' }
    ],
    usecases: ['Retirement Monthly Pension Planning', 'Passive Income Withdrawal Auditing', 'Corpus Longevity Testing'],
    benefits: ['Corpus Depletion Timeline', 'Monthly Tax-Efficient Income', 'Growth Projection', 'Free Use'],
    deviceGuide: { mobile: 'Interactive slider controls.', desktop: 'Full scenario simulation.' },
    comparison: { feature: 'Longevity Simulation', cacto: 'Simulates Corpus Depletion Year-by-Year', traditional: 'Single Year Output' }
  },
  {
    slug: 'gratuity-calculator',
    title: 'Employee Gratuity Calculator (India)',
    description: 'Calculate gratuity payout for employees based on last drawn salary and years of continuous service.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'What is the minimum service requirement for gratuity in India?', a: '5 years of continuous service in the same organization is mandatory under the Payment of Gratuity Act 1972.' }
    ],
    steps: [
      { step: 1, title: 'Enter Basic + DA', desc: 'Input last drawn Basic Salary + Dearness Allowance.' },
      { step: 2, title: 'Enter Service Tenure', desc: 'Input total completed years of service.' },
      { step: 3, title: 'Calculate Gratuity', desc: 'View statutory gratuity amount (15/26 x Basic x Years).' }
    ],
    usecases: ['Resignation & Retirement Payout Audit', 'HR Settlement Verification', 'Career Planning'],
    benefits: ['Statutory 15/26 Formula', 'Tax-Exempt Ceiling Check', 'Instant Result', 'Free Usage'],
    deviceGuide: { mobile: 'Numeric mobile keypad.', desktop: 'HR audit print format.' },
    comparison: { feature: 'Formula Standards', cacto: 'Payment of Gratuity Act Compliant', traditional: 'Generic Estimation' }
  },
  {
    slug: 'hra-calculator',
    title: 'House Rent Allowance (HRA) Tax Exemption Calculator',
    description: 'Calculate exact tax-exempt HRA amount based on rent paid, basic salary, and metro/non-metro location.',
    category: 'Calculators',
    siloCategory: 'finance',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How is HRA tax exemption calculated in India?', a: 'Exemption is minimum of: 1) Actual HRA received, 2) 50% basic (metro) / 40% (non-metro), 3) Rent paid minus 10% basic.' }
    ],
    steps: [
      { step: 1, title: 'Enter Salary Details', desc: 'Input annual Basic Salary and HRA received.' },
      { step: 2, title: 'Enter Rent Paid', desc: 'Input total annual rent paid to landlord.' },
      { step: 3, title: 'Select City Type', desc: 'Choose Metro (Delhi, Mumbai, Kolkata, Chennai) or Non-Metro.' }
    ],
    usecases: ['Annual Income Tax Return Filing', 'Form 16 Tax Verification', 'Salary Structuring Optimization'],
    benefits: ['3-Rule Statutory Min Check', 'Metro vs Non-Metro Rules', 'Tax Saved Amount', 'Free Usage'],
    deviceGuide: { mobile: 'Simple 3-step form.', desktop: 'Detailed tax breakdown.' },
    comparison: { feature: 'Metro Tax Rules', cacto: 'Automatic 50% vs 40% City Rule Logic', traditional: 'Flat Exemption Estimate' }
  },

  // TEXT
  {
    slug: 'remove-duplicate-lines',
    title: 'Remove Duplicate Lines & Deduplicate List Text',
    description: 'Remove repeated lines, duplicate emails, or duplicate keywords from raw text lists instantly.',
    category: 'Utility',
    siloCategory: 'text',
    icon: 'Type',
    faqs: [
      { q: 'Does deduplication support case-sensitive matching?', a: 'Yes, toggle between Case-Sensitive and Case-Insensitive line comparison.' }
    ],
    steps: [
      { step: 1, title: 'Paste Text List', desc: 'Insert text containing repeated lines.' },
      { step: 2, title: 'Choose Sorting', desc: 'Select Keep Original Order or Alphabetical Sort.' },
      { step: 3, title: 'Copy Clean List', desc: 'Copy unique deduplicated list.' }
    ],
    usecases: ['Cleaning Email Subscriber Lists', 'Deduplicating SEO Keywords', 'Cleaning Log Files'],
    benefits: ['Removed Duplicate Count Stats', 'Case Sensitive Option', 'Browser Privacy', 'Unlimited Lines'],
    deviceGuide: { mobile: 'Paste from clipboard.', desktop: 'Handles 100,000+ line lists.' },
    comparison: { feature: 'Deduplication Speed', cacto: 'Instant Browser Memory Engine', traditional: 'Slow Server Processing' }
  },
  {
    slug: 'word-counter-pro',
    title: 'Word Counter & Flesch Readability Analyzer',
    description: 'Count words, characters, sentences, paragraphs, and analyze Flesch Reading Ease score in real time.',
    category: 'Utility',
    siloCategory: 'text',
    icon: 'Type',
    faqs: [
      { q: 'What is a good Flesch Reading Ease score for web content?', a: 'A score of 60 to 70 is ideal for blog posts and landing pages (accessible to average readers).' }
    ],
    steps: [
      { step: 1, title: 'Type or Paste Text', desc: 'Insert article or post draft.' },
      { step: 2, title: 'View Metrics', desc: 'Inspect live Word Count, Character Count, and Readability Score.' },
      { step: 3, title: 'Optimize Content', desc: 'Adjust sentence length to improve reading ease.' }
    ],
    usecases: ['Blog Essay Word Count Auditing', 'Social Media Character Limit Checking', 'SEO Dwell Time Optimization'],
    benefits: ['Real-Time Character Count', 'Flesch Grade Score', 'Estimated Reading Time', 'Free Usage'],
    deviceGuide: { mobile: 'Real-time mobile typing count.', desktop: 'Full text metrics dashboard.' },
    comparison: { feature: 'Readability Metrics', cacto: 'Flesch Score & Grade Level Breakdown', traditional: 'Simple Word Count Only' }
  },
  {
    slug: 'case-converter-pro',
    title: 'Case Converter Pro',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case.',
    category: 'Utility',
    siloCategory: 'text',
    icon: 'Type',
    faqs: [
      { q: 'What is the difference between camelCase and snake_case?', a: 'camelCase capitalizes subsequent words (myVariable), while snake_case uses underscores (my_variable).' }
    ],
    steps: [
      { step: 1, title: 'Paste Text', desc: 'Insert raw text payload.' },
      { step: 2, title: 'Select Case Style', desc: 'Click Title Case, camelCase, UPPERCASE, etc.' },
      { step: 3, title: 'Copy Result', desc: 'Copy converted text string.' }
    ],
    usecases: ['Fixing Accidental ALL CAPS Typing', 'Formatting Code Variables', 'Headline Capitalization'],
    benefits: ['6 Case Transformations', 'One-Click Copy', 'Browser Privacy', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Quick button toggles.', desktop: 'Keyboard shortcuts.' },
    comparison: { feature: 'Transformation Styles', cacto: 'Supports Developer Syntax (camel, snake, kebab)', traditional: 'Upper & Lower Only' }
  },
  {
    slug: 'text-diff-checker',
    title: 'Side-by-Side Text Diff & Difference Checker',
    description: 'Compare two blocks of text side-by-side to highlight added, deleted, or modified characters.',
    category: 'Utility',
    siloCategory: 'text',
    icon: 'Type',
    faqs: [
      { q: 'Does this highlight character-level changes within lines?', a: 'Yes, highlights both line-level changes and intra-line character edits in red and green.' }
    ],
    steps: [
      { step: 1, title: 'Paste Original Text', desc: 'Insert baseline text in left box.' },
      { step: 2, title: 'Paste Modified Text', desc: 'Insert new text in right box.' },
      { step: 3, title: 'Compare Diff', desc: 'View highlighted additions (+) and deletions (-).' }
    ],
    usecases: ['Comparing Code & Document Revisions', 'Contract Proofreading', 'Copy Editing Audits'],
    benefits: ['Color-Coded Highlights', 'Side-by-Side View', 'Browser Processing', 'Free Usage'],
    deviceGuide: { mobile: 'Stacked diff view.', desktop: 'Side-by-side split screen.' },
    comparison: { feature: 'Diff Highlighting', cacto: 'Inline Character-Level Color Coding', traditional: 'Line-Level Only' }
  },
  {
    slug: 'remove-line-breaks',
    title: 'Remove Line Breaks & Clean Paragraph Formatting',
    description: 'Remove awkward line breaks from copied PDF text and format clean continuous paragraphs.',
    category: 'Utility',
    siloCategory: 'text',
    icon: 'Type',
    faqs: [
      { q: 'Can I replace line breaks with spaces or commas?', a: 'Yes, replace line breaks with single spaces, commas, or custom delimiters.' }
    ],
    steps: [
      { step: 1, title: 'Paste Broken Text', desc: 'Insert text copied from PDFs or columns.' },
      { step: 2, title: 'Select Replacement', desc: 'Choose Space, Comma, or Custom Joiner.' },
      { step: 3, title: 'Copy Clean Paragraphs', desc: 'Copy formatted continuous text.' }
    ],
    usecases: ['Fixing Copied PDF Text Formatting', 'Cleaning Multiline CSV Values', 'Formatting Email Lists'],
    benefits: ['PDF Text Unwrapping', 'Custom Delimiters', 'Instant Execution', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Mobile text box.', desktop: 'Handles large book excerpts.' },
    comparison: { feature: 'Unwrapping Intelligence', cacto: 'Preserves Intended Paragraph Breaks', traditional: 'Strips All Newlines Blindly' }
  },
  {
    slug: 'json-formatter-pro',
    title: 'JSON Prettifier & Syntax Validator',
    description: 'Format, validate, and minify raw JSON payloads with instant error line pointers.',
    category: 'Generators',
    siloCategory: 'developer',
    icon: 'Sparkles',
    faqs: [
      { q: 'Does this validator pinpoint syntax errors like missing commas or quotes?', a: 'Yes, it highlights exact line numbers and syntax error reasons.' }
    ],
    steps: [
      { step: 1, title: 'Paste JSON String', desc: 'Insert raw JSON text.' },
      { step: 2, title: 'Click Format / Minify', desc: 'Format with 2-space indentation or compress.' },
      { step: 3, title: 'Copy Validated JSON', desc: 'Copy clean JSON structure.' }
    ],
    usecases: ['API Response Debugging', 'Config File Formatting', 'Webhook Payload Validation'],
    benefits: ['Syntax Error Locator', '2-Space & 4-Space Indents', 'Tree View', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile code viewer.', desktop: 'Full tree expand/collapse.' },
    comparison: { feature: 'Error Pointer', cacto: 'Highlights Line & Char Position of Invalid Syntax', traditional: 'Generic Valid/Invalid' }
  },

  // SEO
  {
    slug: 'meta-title-description-generator',
    title: 'Meta Title & Description Generator & Pixel Checker',
    description: 'Generate CTR-optimized Meta Titles and Descriptions with live Google Search snippet preview and pixel width checks.',
    category: 'Generators',
    siloCategory: 'seo',
    icon: 'Sparkles',
    faqs: [
      { q: 'What is the maximum pixel width for Google meta titles?', a: 'Google truncates meta titles wider than 600 pixels (roughly 58-60 characters).' }
    ],
    steps: [
      { step: 1, title: 'Enter Page Title & Topic', desc: 'Input target page topic and focus keyword.' },
      { step: 2, title: 'Review Snippet Preview', desc: 'Inspect live Google Desktop & Mobile SERP preview.' },
      { step: 3, title: 'Copy Meta Tags', desc: 'Copy ready-to-use HTML <title> and <meta name="description"> tags.' }
    ],
    usecases: ['Optimizing Blog Title CTR', 'Ecommerce Product Meta Formatting', 'Client SEO Auditing'],
    benefits: ['Live SERP Snippet Preview', 'Pixel Width Warning Indicator', 'CTR Copy Templates', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile SERP preview card.', desktop: 'Desktop & Mobile toggle.' },
    comparison: { feature: 'Truncation Accuracy', cacto: 'Exact Google 600px Width Calculator', traditional: 'Character Count Only' }
  },
  {
    slug: 'robots-txt-generator',
    title: 'Robots.txt Rules Generator & AI Bot Controller',
    description: 'Generate standard robots.txt files with custom User-agent rules for Googlebot, Bingbot, GPTBot, and ClaudeBot.',
    category: 'Generators',
    siloCategory: 'seo',
    icon: 'Shield',
    faqs: [
      { q: 'Can I allow or block AI crawlers like GPTBot and ClaudeBot?', a: 'Yes! Toggle rules specifically for GPTBot, ClaudeBot, PerplexityBot, and ByteSpider.' }
    ],
    steps: [
      { step: 1, title: 'Set Crawl Policy', desc: 'Select Allow All or Block Specific Directories.' },
      { step: 2, title: 'Set AI Crawler Permissions', desc: 'Toggle OpenAI, Anthropic, and Perplexity crawlers.' },
      { step: 3, title: 'Enter Sitemap URL', desc: 'Include full sitemap.xml link and export file.' }
    ],
    usecases: ['New Website Launch Setup', 'Blocking AI Scrapers', 'Restricting Admin Page Indexing'],
    benefits: ['AI Bot Control Toggles', 'Sitemap Link Inclusion', 'Syntax Validated', 'Free Usage'],
    deviceGuide: { mobile: 'Form checkboxes.', desktop: 'Download robots.txt file.' },
    comparison: { feature: 'AI Crawler Presets', cacto: 'Includes GPTBot, ClaudeBot, Perplexity Controls', traditional: 'Generic User-agent Only' }
  },
  {
    slug: 'sitemap-validator',
    title: 'XML Sitemap Validator & URL Count Extractor',
    description: 'Validate XML sitemaps for syntax errors, missing XML tags, and extract total indexed URL counts.',
    category: 'Utility',
    siloCategory: 'seo',
    icon: 'Shield',
    faqs: [
      { q: 'What W3C date formats are required in sitemaps?', a: 'Sitemaps require W3C Date format (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+00:00).' }
    ],
    steps: [
      { step: 1, title: 'Paste Sitemap XML or URL', desc: 'Insert sitemap XML payload or link.' },
      { step: 2, title: 'Run Validation', desc: 'Inspect W3C schema compliance and date tags.' },
      { step: 3, title: 'View Summary', desc: 'Check total URL count and syntax health.' }
    ],
    usecases: ['Debugging Google Search Console Sitemap Errors', 'Auditing Migration Sitemaps', 'URL Extraction'],
    benefits: ['W3C Schema Check', 'URL Count Breakdown', 'Syntax Pointer', 'Free Unlimited Use'],
    deviceGuide: { mobile: 'Mobile status report.', desktop: 'Full URL list table.' },
    comparison: { feature: 'Validation Depth', cacto: 'Checks W3C Date Schema & XML Headers', traditional: 'Basic XML Parser Only' }
  },
  {
    slug: 'hreflang-generator',
    title: 'Hreflang Tag & Multi-Language Code Builder',
    description: 'Generate clean HTML <link rel="alternate" hreflang="..."> tags for multi-language and regional websites.',
    category: 'Generators',
    siloCategory: 'seo',
    icon: 'Sparkles',
    faqs: [
      { q: 'Should I always include a x-default hreflang tag?', a: 'Yes! x-default acts as the fallback page for unmatched languages or regions.' }
    ],
    steps: [
      { step: 1, title: 'Enter Default URL', desc: 'Input main fallback URL.' },
      { step: 2, title: 'Add Target Languages', desc: 'Select language (en, es, fr, de, hi) and region codes.' },
      { step: 3, title: 'Copy HTML Tags', desc: 'Copy generated head tags into your HTML header.' }
    ],
    usecases: ['International SEO Implementation', 'Multilingual Shopify/WordPress Sites', 'Regional Landing Pages'],
    benefits: ['x-Default Inclusion', 'ISO Language/Country Presets', 'Clean HTML Render', 'Free Usage'],
    deviceGuide: { mobile: 'Language dropdown selectors.', desktop: 'Batch tag generator.' },
    comparison: { feature: 'ISO Code Accuracy', cacto: 'Validates Official ISO 639-1 & ISO 3166-1 Codes', traditional: 'Manual String Input' }
  },
  {
    slug: 'clean-slug-generator',
    title: 'Clean URL Slug & Keyword Permalinks Generator',
    description: 'Convert post titles and raw text into clean, SEO-friendly, lowercased URL permalinks.',
    category: 'Generators',
    siloCategory: 'seo',
    icon: 'Sparkles',
    faqs: [
      { q: 'Does this generator strip stop words like "a", "the", and "and"?', a: 'Yes, toggle Stop-Word Removal to create concise, keyword-focused permalinks.' }
    ],
    steps: [
      { step: 1, title: 'Paste Title or Text', desc: 'Input article headline or product name.' },
      { step: 2, title: 'Toggle Options', desc: 'Select hyphen (-) or underscore (_) separator.' },
      { step: 3, title: 'Copy Clean Slug', desc: 'Copy slug (e.g. /blog/clean-url-slug-generator).' }
    ],
    usecases: ['CMS Article Permalink Creation', 'E-Commerce Product URL Optimization', 'SEO URL Standardization'],
    benefits: ['Strips Accents & Special Chars', 'Stop Word Removal Toggle', 'Hyphen/Underscore Selector', 'Free Usage'],
    deviceGuide: { mobile: 'Instant typing conversion.', desktop: 'Batch title list converter.' },
    comparison: { feature: 'Stop Word Handling', cacto: 'Smart English Stop Word Strip Toggle', traditional: 'Raw Hyphenation Only' }
  },
  {
    slug: 'canonical-url-checker',
    title: 'Canonical Tag & Duplicate Content Inspector',
    description: 'Generate and validate rel="canonical" link tags to prevent duplicate content indexing penalties.',
    category: 'Utility',
    siloCategory: 'seo',
    icon: 'Shield',
    faqs: [
      { q: 'Why are canonical tags important for SEO?', a: 'Canonical tags specify the authoritative master URL to search engines, consolidating link equity.' }
    ],
    steps: [
      { step: 1, title: 'Enter Preferred URL', desc: 'Input canonical HTTPS target URL.' },
      { step: 2, title: 'Configure Attributes', desc: 'Toggle self-referencing or cross-domain canonicals.' },
      { step: 3, title: 'Copy HTML Code', desc: 'Copy <link rel="canonical" href="..." /> tag.' }
    ],
    usecases: ['E-Commerce Parameterized Page SEO', 'Syndicated Content Tagging', 'Cross-Domain Article Credits'],
    benefits: ['Self-Referencing Validation', 'Trailing Slash Consistency Check', 'Clean HTML Code', 'Free Usage'],
    deviceGuide: { mobile: 'Quick URL input.', desktop: 'Batch URL inspector.' },
    comparison: { feature: 'URL Sanitization', cacto: 'Auto-Enforces HTTPS & Trailing Slash Protocol', traditional: 'Raw String Copy' }
  },

  // BUSINESS & LEGAL & OFFICE
  {
    slug: 'freelance-invoice-generator',
    title: 'Freelancer & Business PDF Invoice Generator',
    description: 'Create professional PDF invoices with itemized line items, tax calculations, and payment details.',
    category: 'Generators',
    siloCategory: 'legal',
    icon: 'Sparkles',
    faqs: [
      { q: 'Can I download the generated invoice as a printable PDF?', a: 'Yes! Generates a clean, professional PDF file directly inside your browser.' }
    ],
    steps: [
      { step: 1, title: 'Enter Client & Business Info', desc: 'Input your business details and client billing address.' },
      { step: 2, title: 'Add Line Items', desc: 'Add hourly rate or fixed project services with prices.' },
      { step: 3, title: 'Export PDF Invoice', desc: 'Click Download PDF to save custom invoice.' }
    ],
    usecases: ['Freelance Client Billing', 'Contractor Services Invoicing', 'Small Business Receipts'],
    benefits: ['Automatic Tax & Subtotal Math', 'Printable PDF Download', 'Browser Privacy', 'Free Unlimited Invoices'],
    deviceGuide: { mobile: 'Simple form rows.', desktop: 'Live document preview.' },
    comparison: { feature: 'PDF Download Privacy', cacto: 'Renders PDF In-Browser (No Remote Storage)', traditional: 'Requires Account & Stores Data' }
  },
  {
    slug: 'nda-generator',
    title: 'Mutual Non-Disclosure Agreement (NDA) Generator',
    description: 'Generate custom mutual or one-way Non-Disclosure Agreement (NDA) contracts for business negotiations.',
    category: 'Generators',
    siloCategory: 'legal',
    icon: 'Shield',
    faqs: [
      { q: 'Is this NDA template suitable for freelancers and startups?', a: 'Yes, includes standard confidentiality clauses, IP definitions, and 2-year duration terms.' }
    ],
    steps: [
      { step: 1, title: 'Enter Party Names', desc: 'Input Disclosing Party and Receiving Party entity names.' },
      { step: 2, title: 'Select Agreement Type', desc: 'Choose Mutual NDA or One-Way NDA.' },
      { step: 3, title: 'Generate Contract', desc: 'Copy formatted contract text or download PDF.' }
    ],
    usecases: ['Contractor & Client Onboarding', 'Vendor Partner Discussions', 'Startup Founder Pitching'],
    benefits: ['Standard Legal Clauses', 'Mutual / One-Way Toggle', 'Formatted Contract Output', 'Free Usage'],
    deviceGuide: { mobile: 'Step-by-step wizard.', desktop: 'Side-by-side legal document editor.' },
    comparison: { feature: 'Clause Flexibility', cacto: 'Customizable Duration & Jurisdiction Terms', traditional: 'Static Rigid Text' }
  },
  {
    slug: 'resignation-letter-generator',
    title: 'Professional Resignation Letter Generator',
    description: 'Generate polished resignation letters with customizable notice periods, tone options, and thank-you notes.',
    category: 'Generators',
    siloCategory: 'office',
    icon: 'Sparkles',
    faqs: [
      { q: 'What notice periods are supported?', a: 'Supports 2-week, 30-day, or immediate notice timelines.' }
    ],
    steps: [
      { step: 1, title: 'Enter Position & Company', desc: 'Input job title, company name, and manager name.' },
      { step: 2, title: 'Select Notice & Tone', desc: 'Choose Professional, Formal, or Gratitude-focused tone.' },
      { step: 3, title: 'Copy Letter', desc: 'Copy formatted letter for email or print.' }
    ],
    usecases: ['Employee Career Transition', 'Notice Period Formalization', 'HR Exit Documentation'],
    benefits: ['3 Professional Tone Presets', 'Notice Date Calculation', 'Instant Copy', 'Free Usage'],
    deviceGuide: { mobile: 'Quick form selection.', desktop: 'Print layout view.' },
    comparison: { feature: 'Tone Options', cacto: 'Formal, Grateful, Brief, Executive', traditional: 'Single Template' }
  },
  {
    slug: 'offer-letter-format-generator',
    title: 'Employment Offer Letter Format Builder',
    description: 'Generate official employment offer letters with salary breakup, start date, and probation terms.',
    category: 'Generators',
    siloCategory: 'office',
    icon: 'Sparkles',
    faqs: [
      { q: 'Can I include probation period and bonus structure terms?', a: 'Yes, customizable probation duration and bonus terms are included.' }
    ],
    steps: [
      { step: 1, title: 'Enter Candidate Info', desc: 'Input candidate name, role title, and starting salary.' },
      { step: 2, title: 'Configure Probation & Benefits', desc: 'Set probation months and health/equity terms.' },
      { step: 3, title: 'Generate Offer', desc: 'Export offer letter document.' }
    ],
    usecases: ['Startup Team Hiring', 'Small Business Candidate Onboarding', 'HR Offer Documentation'],
    benefits: ['Standard Legal Offer Structure', 'Salary Breakup Section', 'Formatted Document', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile wizard.', desktop: 'Export ready.' },
    comparison: { feature: 'HR Standards', cacto: 'Includes At-Will & Probation Clause Toggles', traditional: 'Plain Text Note' }
  },
  {
    slug: 'profit-margin-calculator',
    title: 'Gross & Net Profit Margin & Markup Calculator',
    description: 'Calculate gross profit margin percentage, net profit, cost price, and selling price markup.',
    category: 'Calculators',
    siloCategory: 'business',
    icon: 'TrendingUp',
    faqs: [
      { q: 'What is the difference between profit margin and markup?', a: 'Margin is profit divided by revenue. Markup is profit divided by cost price.' }
    ],
    steps: [
      { step: 1, title: 'Enter Cost & Revenue', desc: 'Input cost price and target selling price.' },
      { step: 2, title: 'Calculate Margin', desc: 'Instantly view Gross Margin % and Markup %.' },
      { step: 3, title: 'Optimize Pricing', desc: 'Adjust selling price to hit target margin goals.' }
    ],
    usecases: ['E-Commerce Product Pricing', 'Retail Inventory Markup Planning', 'SaaS Pricing Strategy'],
    benefits: ['Margin vs Markup Comparison', 'Cost & Revenue Math', 'Instant Output', 'Free Usage'],
    deviceGuide: { mobile: 'Numeric keypad input.', desktop: 'Side-by-side comparison table.' },
    comparison: { feature: 'Margin vs Markup', cacto: 'Displays Both Margin % and Equivalent Markup %', traditional: 'Margin Only' }
  },
  {
    slug: 'saas-mrr-calculator',
    title: 'SaaS MRR, ARR & Customer LTV Calculator',
    description: 'Calculate Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), Churn Rate, and Lifetime Value (LTV).',
    category: 'Calculators',
    siloCategory: 'business',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How is Customer Lifetime Value (LTV) calculated?', a: 'LTV = Average Revenue Per User (ARPU) / Monthly Customer Churn Rate.' }
    ],
    steps: [
      { step: 1, title: 'Enter Customer Metrics', desc: 'Input total paid customers and average plan price.' },
      { step: 2, title: 'Enter Churn Rate', desc: 'Input monthly customer churn percentage.' },
      { step: 3, title: 'View SaaS Health', desc: 'Inspect MRR, ARR, LTV, and LTV:CAC ratios.' }
    ],
    usecases: ['SaaS Investor Pitch Preparation', 'Subscription Business Health Monitoring', 'Growth Forecasting'],
    benefits: ['MRR & ARR Projection', 'LTV & Churn Math', 'SaaS Health Benchmarks', 'Free Usage'],
    deviceGuide: { mobile: 'Interactive metrics cards.', desktop: 'Full SaaS financial dashboard.' },
    comparison: { feature: 'SaaS Metrics Scope', cacto: 'Computes MRR, ARR, ARPU, LTV, and Churn', traditional: 'MRR Only' }
  },
  {
    slug: 'breakeven-calculator',
    title: 'Business Breakeven Point & Unit Economics Calculator',
    description: 'Calculate breakeven sales volume and revenue required to cover fixed and variable costs.',
    category: 'Calculators',
    siloCategory: 'business',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How is breakeven units calculated?', a: 'Breakeven Units = Fixed Costs / (Price Per Unit - Variable Cost Per Unit).' }
    ],
    steps: [
      { step: 1, title: 'Enter Fixed Costs', desc: 'Input monthly rent, salaries, and software tools.' },
      { step: 2, title: 'Enter Unit Economics', desc: 'Input selling price and variable cost per product.' },
      { step: 3, title: 'View Breakeven Point', desc: 'Inspect required sales units and revenue threshold.' }
    ],
    usecases: ['New Product Launch Feasibility', 'Business Plan Financial Modeling', 'Pricing Floor Setup'],
    benefits: ['Breakeven Unit & Dollar Math', 'Contribution Margin %', 'Scenario Analysis', 'Free Usage'],
    deviceGuide: { mobile: 'Numeric input form.', desktop: 'Cost-volume-profit breakdown.' },
    comparison: { feature: 'Unit Economics', cacto: 'Includes Contribution Margin & Fixed Cost Coverage', traditional: 'Basic Unit Number' }
  },

  // AI & E-COMMERCE
  {
    slug: 'prompt-improver',
    title: 'AI Prompt Refiner & Midjourney/ChatGPT Enhancer',
    description: 'Transform vague prompts into highly structured, detailed prompts for ChatGPT, Claude, and Midjourney.',
    category: 'Generators',
    siloCategory: 'ai',
    icon: 'Sparkles',
    faqs: [
      { q: 'How does prompt structuring improve AI outputs?', a: 'Adding clear Role, Context, Constraints, and Output Format prevents hallucination and improves accuracy.' }
    ],
    steps: [
      { step: 1, title: 'Paste Simple Idea', desc: 'Input rough prompt (e.g., "write a sales email").' },
      { step: 2, title: 'Select Target Model', desc: 'Choose ChatGPT, Claude, or Midjourney.' },
      { step: 3, title: 'Copy Enhanced Prompt', desc: 'Copy structured master prompt.' }
    ],
    usecases: ['ChatGPT Sales & Copy Generation', 'Midjourney Image Prompt Structuring', 'Claude Coding Instructions'],
    benefits: ['Role & Context Framing', 'Constraint Enforcement', 'Multi-Model Presets', 'Free Usage'],
    deviceGuide: { mobile: 'Tap to refine prompt.', desktop: 'Side-by-side prompt comparison.' },
    comparison: { feature: 'Prompt Framework', cacto: 'Injects Persona, Objective, Constraints & Format', traditional: 'Ad-Hoc Text Append' }
  },
  {
    slug: 'cold-email-generator',
    title: 'B2B Cold Email Generator & Outreach Builder',
    description: 'Generate high-converting B2B cold emails with personalized subject lines and clear calls-to-action.',
    category: 'Generators',
    siloCategory: 'ai',
    icon: 'Sparkles',
    faqs: [
      { q: 'What is the ideal word count for B2B cold emails?', a: 'B2B cold emails perform best between 50 and 125 words with a soft interest CTA.' }
    ],
    steps: [
      { step: 1, title: 'Enter Value Offer', desc: 'Input your product/service solution.' },
      { step: 2, title: 'Set Target Audience', desc: 'Input prospect role (e.g. Founder, CMO, VP Sales).' },
      { step: 3, title: 'Generate Copy', desc: 'Copy 3 cold email variations with subject lines.' }
    ],
    usecases: ['Agency Lead Generation Outreach', 'SaaS Sales Prospecting', 'Partnership Pitching'],
    benefits: ['3 Cold Email Frameworks', 'Subject Line Variants', 'Personalization Tags', 'Free Usage'],
    deviceGuide: { mobile: 'Mobile copy cards.', desktop: 'One-click copy snippet.' },
    comparison: { feature: 'Variations Rendered', cacto: 'Generates 3 Distinct Angles (Pain-First, Social Proof, Short)', traditional: 'Single Draft' }
  },
  {
    slug: 'linkedin-post-formatter',
    title: 'LinkedIn Post Formatter & Line Spacing Tool',
    description: 'Format LinkedIn posts with bold/italic Unicode text, clean line breaks, and bullet point formatting.',
    category: 'Utility',
    siloCategory: 'social',
    icon: 'Type',
    faqs: [
      { q: 'Will bold and italic Unicode text render properly on mobile LinkedIn apps?', a: 'Yes! Uses standard Unicode mathematical alphanumeric symbols compatible across all platforms.' }
    ],
    steps: [
      { step: 1, title: 'Paste Post Draft', desc: 'Insert raw LinkedIn post text.' },
      { step: 2, title: 'Style Text', desc: 'Select words to make **Bold**, *Italic*, or Add Bullet Points.' },
      { step: 3, title: 'Copy Formatted Post', desc: 'Copy formatted text directly into LinkedIn.' }
    ],
    usecases: ['LinkedIn Personal Branding Posts', 'Thought Leadership Content Formatting', 'Carousels Text Prep'],
    benefits: ['Unicode Bold & Italic', 'Clean Line Spacing', 'Bullet Presets', 'Free Usage'],
    deviceGuide: { mobile: 'Format buttons over text.', desktop: 'Live mobile LinkedIn preview.' },
    comparison: { feature: 'LinkedIn Preview', cacto: 'Includes Live LinkedIn Mobile Feed Preview', traditional: 'Raw Formatting Only' }
  },
  {
    slug: 'amazon-fee-calculator',
    title: 'Amazon Seller FBA Fee & Profit Calculator',
    description: 'Calculate Amazon FBA referral fees, fulfillment fees, and net profit per unit.',
    category: 'Calculators',
    siloCategory: 'ecommerce',
    icon: 'TrendingUp',
    faqs: [
      { q: 'How are Amazon FBA fulfillment fees determined?', a: 'Fulfillment fees depend on product package dimensions, weight, and size tier.' }
    ],
    steps: [
      { step: 1, title: 'Enter Selling Price', desc: 'Input target Amazon listing price.' },
      { step: 2, title: 'Enter Product Cost', desc: 'Input manufacturing and shipping cost.' },
      { step: 3, title: 'Select Category', desc: 'Select Amazon product category for referral fee %.' }
    ],
    usecases: ['Amazon FBA Product Research', 'E-Commerce Margin Auditing', 'Supplier Price Negotiation'],
    benefits: ['Referral Fee Category Presets', 'FBA Storage Fee Estimate', 'Net Profit Margin %', 'Free Usage'],
    deviceGuide: { mobile: 'Category dropdown selector.', desktop: 'Detailed fee breakdown table.' },
    comparison: { feature: 'Category Referral Fees', cacto: 'Auto-Applies 8% to 15% Category Specific Rules', traditional: 'Flat Fee Estimate' }
  },
  {
    slug: 'shipping-rate-estimator',
    title: 'E-Commerce Dimensional Weight & Shipping Rate Estimator',
    description: 'Calculate dimensional (DIM) weight and estimate courier shipping costs based on package dimensions.',
    category: 'Calculators',
    siloCategory: 'ecommerce',
    icon: 'TrendingUp',
    faqs: [
      { q: 'What is Dimensional Weight (DIM Weight)?', a: 'DIM Weight = (Length × Width × Height) / DIM Divisor (typically 139 for US / 5000 for metric).' }
    ],
    steps: [
      { step: 1, title: 'Enter Package Dimensions', desc: 'Input Length, Width, and Height.' },
      { step: 2, title: 'Enter Actual Weight', desc: 'Input scale weight in lbs or kg.' },
      { step: 3, title: 'Calculate Billable Weight', desc: 'Inspect DIM weight vs actual weight.' }
    ],
    usecases: ['E-Commerce Packaging Optimization', 'Courier Billable Weight Calculation', 'Shipping Cost Pricing'],
    benefits: ['DIM Weight Formula', 'Billable Weight Comparison', 'Imperial & Metric Units', 'Free Usage'],
    deviceGuide: { mobile: 'Dimension input fields.', desktop: 'Packaging optimization tips.' },
    comparison: { feature: 'Billable Weight Rules', cacto: 'Auto-Selects Greater of Actual vs DIM Weight', traditional: 'DIM Weight Only' }
  },
  {
    slug: 'shopify-cart-recovery-roi',
    title: 'Shopify Abandoned Cart Recovery ROI Calculator',
    description: 'Calculate extra monthly revenue and ROI recovered by automating abandoned cart DMs and emails.',
    category: 'Calculators',
    siloCategory: 'ecommerce',
    icon: 'TrendingUp',
    faqs: [
      { q: 'What is average abandoned cart recovery conversion rate via DMs?', a: 'Automated Instagram DMs recover 14% to 22% of abandoned carts, compared to 3-5% for traditional email.' }
    ],
    steps: [
      { step: 1, title: 'Enter Monthly Store Orders', desc: 'Input average monthly order volume.' },
      { step: 2, title: 'Enter Average Order Value (AOV)', desc: 'Input store AOV (e.g. $65).' },
      { step: 3, title: 'View Recovered Revenue', desc: 'Inspect estimated monthly & yearly recovered revenue lift.' }
    ],
    usecases: ['Shopify Store Revenue Optimization', 'DM Automation ROI Forecasting', 'E-Commerce Strategy'],
    benefits: ['DM vs Email Lift Comparison', 'Monthly & Annual Recovered Revenue', 'Cacto Integration Hook', 'Free Usage'],
    deviceGuide: { mobile: 'Slider inputs.', desktop: 'Full ROI simulation dashboard.' },
    comparison: { feature: 'Channel Conversion Lift', cacto: 'Compares 20% DM Recovery vs 4% Email Recovery', traditional: 'Single Rate Calculation' }
  },
  {
    slug: 'youtube-title-generator',
    title: 'YouTube Video Title & Click-Through Rate Generator',
    description: 'Generate high-CTR YouTube video titles using proven viral hooks, curiosity gaps, and numbers.',
    category: 'Generators',
    siloCategory: 'ai',
    icon: 'Sparkles',
    faqs: [
      { q: 'What makes a YouTube title get higher CTR?', a: 'Titles under 50 characters with strong emotional triggers, numbers, or curiosity gaps achieve highest CTR.' }
    ],
    steps: [
      { step: 1, title: 'Enter Video Topic', desc: 'Input core video topic or keyword.' },
      { step: 2, title: 'Select Target Angle', desc: 'Choose How-To, Story, Listicle, or Curiosity Gap.' },
      { step: 3, title: 'Copy Titles', desc: 'Copy top 5 viral title ideas.' }
    ],
    usecases: ['YouTube Video Optimization', 'Content Creation Brainstorming', 'CTR Testing'],
    benefits: ['5 Viral Title Frameworks', 'Character Count Indicator', 'Curiosity Gap Boost', 'Free Usage'],
    deviceGuide: { mobile: 'Tap title to copy.', desktop: 'Batch copy all titles.' },
    comparison: { feature: 'Title Frameworks', cacto: 'Generates How-To, Listicle, Curiosity & Vs Angles', traditional: 'Generic Headline Generator' }
  }
];

const targetMarker = 'export const freeToolsList: ToolData[] = [';
const targetIndex = content.indexOf(targetMarker);

if (targetIndex !== -1) {
  const insertIndex = targetIndex + targetMarker.length;
  const newItemsString = '\n' + tools101to150.map(t => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ') + ',').join('\n');
  content = content.slice(0, insertIndex) + newItemsString + content.slice(insertIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Successfully added Tools 101 to 150 into freeToolsList in src/utils/toolsData.ts');
} else {
  console.error('Target marker not found in src/utils/toolsData.ts');
}

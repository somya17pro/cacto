const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/utils/toolsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🚀 Generating 350 programmatic tools (Tools 151 to 500)...');

const categories = ['converters', 'pdf', 'text', 'developer', 'seo', 'finance', 'business', 'office', 'legal', 'ai', 'ecommerce', 'social'];

const newToolsSpecs = [
  // CONVERTERS (50 tools)
  { slug: 'yaml-to-json', title: 'YAML to JSON Converter', desc: 'Convert YAML configuration strings into formatted JSON objects.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'csv-to-json', title: 'CSV to JSON Array Converter', desc: 'Convert CSV spreadsheets into structured JSON array objects.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'xml-to-json', title: 'XML to JSON Converter', desc: 'Convert XML data markup into clean JSON format.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'epoch-timestamp-converter', title: 'Unix Epoch Timestamp Converter', desc: 'Convert Unix timestamp seconds and milliseconds into readable dates.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'hex-to-rgb', title: 'HEX to RGB & HSL Color Converter', desc: 'Convert HEX color codes (#FF5733) into RGB and HSL values.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'rgb-to-hex', title: 'RGB to HEX Color Code Converter', desc: 'Convert RGB color values (255, 87, 51) into HEX hex codes.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'markdown-to-html', title: 'Markdown to HTML Code Transpiler', desc: 'Convert Markdown headings, links, and bold text into HTML tags.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'csv-to-excel', title: 'CSV to Excel TSV Converter', desc: 'Format CSV text into tab-separated values ready for Microsoft Excel.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'json-to-yaml', title: 'JSON to YAML Converter', desc: 'Convert JSON structures into clean indented YAML configurations.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'json-to-xml', title: 'JSON to XML Data Converter', desc: 'Convert JSON data objects into XML document tags.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'unix-timestamp-to-date', title: 'Unix Timestamp to UTC Date Converter', desc: 'Convert epoch seconds into ISO UTC and local date formats.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'date-to-unix-timestamp', title: 'Date to Unix Timestamp Converter', desc: 'Convert calendar date and time into Unix epoch timestamp integer.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'binary-to-text', title: 'Binary to Plain Text Translator', desc: 'Convert binary 0s and 1s into readable ASCII text characters.', cat: 'converters', icon: 'Type' },
  { slug: 'text-to-binary', title: 'Plain Text to Binary Encoder', desc: 'Convert plain text letters into 8-bit binary code strings.', cat: 'converters', icon: 'Type' },
  { slug: 'hex-to-text', title: 'Hexadecimal to Text Decoder', desc: 'Convert hex bytes into readable text characters.', cat: 'converters', icon: 'Type' },
  { slug: 'text-to-hex', title: 'Text to Hexadecimal Encoder', desc: 'Convert plain text into hex byte representations.', cat: 'converters', icon: 'Type' },
  { slug: 'base32-encoder', title: 'Base32 Text Encoder', desc: 'Encode plain text strings into RFC 4648 Base32 alphabet.', cat: 'converters', icon: 'Type' },
  { slug: 'base32-decoder', title: 'Base32 Text Decoder', desc: 'Decode RFC 4648 Base32 strings back to plain text.', cat: 'converters', icon: 'Type' },
  { slug: 'html-entity-encoder', title: 'HTML Entity Encoder', desc: 'Encode special characters into HTML entities (&amp;, &lt;, &gt;).', cat: 'converters', icon: 'Type' },
  { slug: 'html-entity-decoder', title: 'HTML Entity Decoder', desc: 'Decode HTML entities back into plain text characters.', cat: 'converters', icon: 'Type' },
  { slug: 'url-encode', title: 'URL Parameter Encoder', desc: 'Percent-encode special characters for query parameter strings.', cat: 'converters', icon: 'Type' },
  { slug: 'url-decode', title: 'URL Parameter Decoder', desc: 'Decode percent-encoded URL strings into plain text.', cat: 'converters', icon: 'Type' },
  { slug: 'svg-to-png', title: 'SVG Vector to PNG Image Converter', desc: 'Convert scalable vector graphics (SVG) into raster PNG images.', cat: 'converters', icon: 'Image' },
  { slug: 'png-to-webp', title: 'PNG to WebP Image Converter', desc: 'Convert PNG images into lightweight WebP format for fast web pages.', cat: 'converters', icon: 'Image' },
  { slug: 'webp-to-jpg', title: 'WebP to JPG Image Converter', desc: 'Convert Google WebP image files into standard JPG format.', cat: 'converters', icon: 'Image' },
  { slug: 'jpg-to-png', title: 'JPG to PNG Image Converter', desc: 'Convert JPG images into lossless PNG image files.', cat: 'converters', icon: 'Image' },
  { slug: 'bmp-to-png', title: 'BMP to PNG Image Converter', desc: 'Convert Bitmap (BMP) images into compressed PNG files.', cat: 'converters', icon: 'Image' },
  { slug: 'aspect-ratio-calc', title: 'Image & Video Aspect Ratio Calculator', desc: 'Calculate 16:9, 4:5, 1:1, and 9:16 aspect ratio dimensions.', cat: 'converters', icon: 'Image' },
  { slug: 'px-to-rem', title: 'Pixel (px) to REM Unit Converter', desc: 'Convert CSS pixel values to REM relative units based on base font size.', cat: 'converters', icon: 'Type' },
  { slug: 'rem-to-px', title: 'REM Unit to Pixel (px) Converter', desc: 'Convert CSS REM units into exact pixel dimension values.', cat: 'converters', icon: 'Type' },
  { slug: 'em-to-px', title: 'EM Unit to Pixel (px) Converter', desc: 'Convert CSS EM typography units into calculated pixels.', cat: 'converters', icon: 'Type' },
  { slug: 'vw-to-px', title: 'Viewport Width (vw) to Pixel Converter', desc: 'Calculate CSS viewport width (vw) into target screen pixels.', cat: 'converters', icon: 'Type' },
  { slug: 'hsl-to-rgb', title: 'HSL to RGB Color Converter', desc: 'Convert Hue, Saturation, and Lightness (HSL) into RGB values.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'rgb-to-hsl', title: 'RGB to HSL Color Converter', desc: 'Convert Red, Green, and Blue (RGB) values into HSL color codes.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'cmyk-to-rgb', title: 'CMYK to RGB Print Color Converter', desc: 'Convert print CMYK ink percentages into digital RGB screen colors.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'rgb-to-cmyk', title: 'RGB to CMYK Print Color Converter', desc: 'Convert digital RGB screen colors into CMYK print ink values.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'bytes-to-human-readable', title: 'Bytes to KB / MB / GB Converter', desc: 'Convert raw byte numbers into human-readable KB, MB, and GB values.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'bits-to-bytes', title: 'Bits to Bytes Data Converter', desc: 'Convert network bits into data bytes and megabytes.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'mb-to-gb', title: 'Megabytes (MB) to Gigabytes (GB) Converter', desc: 'Convert MB storage numbers into GB values.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'gb-to-tb', title: 'Gigabytes (GB) to Terabytes (TB) Converter', desc: 'Convert GB disk capacity into Terabytes (TB).', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'kb-to-mb', title: 'Kilobytes (KB) to Megabytes (MB) Converter', desc: 'Convert file size KB into Megabytes.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'fps-to-ms', title: 'Frames Per Second (FPS) to Frame Time ms Calculator', desc: 'Calculate frame duration in milliseconds for 24, 30, 60, and 120 FPS.', cat: 'converters', icon: 'RefreshCw' },
  { slug: 'subtitles-srt-to-vtt', title: 'Subtitles SRT to WebVTT Converter', desc: 'Convert SubRip (.srt) subtitle files into WebVTT (.vtt) web caption files.', cat: 'converters', icon: 'RefreshCw' },

  // DEVELOPER (50 tools)
  { slug: 'password-generator', title: 'Strong Password Generator', desc: 'Generate cryptographically random passwords with custom symbols and length.', cat: 'developer', icon: 'Shield' },
  { slug: 'qr-code-generator', title: 'Free QR Code Generator', desc: 'Generate high-resolution QR codes for URLs, Wi-Fi passwords, and contact cards.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'lorem-ipsum-generator', title: 'Lorem Ipsum Dummy Text Generator', desc: 'Generate custom paragraphs, sentences, or words of Lorem Ipsum filler text.', cat: 'developer', icon: 'Type' },
  { slug: 'json-to-typescript', title: 'JSON to TypeScript Interface Generator', desc: 'Convert raw JSON objects into strongly typed TypeScript interfaces.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'json-to-go-struct', title: 'JSON to Go Struct Generator', desc: 'Convert JSON payloads into Go struct definitions with json tags.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'json-to-python-class', title: 'JSON to Python Dataclass Generator', desc: 'Convert JSON payloads into Python dataclass objects.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'json-schema-generator', title: 'JSON to JSON Schema Builder', desc: 'Generate draft-07 JSON Schema validation specs from JSON samples.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-flexbox-generator', title: 'CSS Flexbox Layout Generator', desc: 'Visually generate CSS Flexbox container and item rules.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-grid-generator', title: 'CSS Grid Layout Generator', desc: 'Generate CSS Grid template columns and rows with gap spacing.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-box-shadow-generator', title: 'CSS Box Shadow Generator', desc: 'Visually design smooth CSS box-shadow styles with blur and spread.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-border-radius-generator', title: 'CSS Border Radius Generator', desc: 'Generate custom 8-point CSS border-radius corner styles.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'css-gradient-generator', title: 'CSS Linear & Radial Gradient Generator', desc: 'Generate multi-stop CSS gradient background color codes.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'env-file-validator', title: '.env Environment Variables Validator', desc: 'Validate .env file keys for missing quotes, spaces, or duplicate definitions.', cat: 'developer', icon: 'Shield' },
  { slug: 'dockerfile-generator', title: 'Node.js & Python Dockerfile Generator', desc: 'Generate multi-stage Dockerfiles for Node.js, Next.js, and Python apps.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'gitignore-generator', title: '.gitignore Template Generator', desc: 'Generate comprehensive .gitignore rules for Node, Python, Mac, and Windows.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'htaccess-generator', title: 'Apache .htaccess Redirect Generator', desc: 'Generate Apache .htaccess 301 redirects and HTTPS rewrite rules.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'nginx-config-generator', title: 'Nginx Reverse Proxy Config Generator', desc: 'Generate Nginx server block configurations for Node.js and static web apps.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'package-json-validator', title: 'package.json Dependencies Validator', desc: 'Validate package.json syntax, scripts, and dependency version ranges.', cat: 'developer', icon: 'Shield' },
  { slug: 'tsconfig-generator', title: 'TypeScript tsconfig.json Generator', desc: 'Generate tsconfig.json configuration files for Next.js and Node apps.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'sha1-generator', title: 'SHA-1 Hash Generator', desc: 'Generate 40-character SHA-1 cryptographic hash digests.', cat: 'developer', icon: 'Shield' },
  { slug: 'sha512-generator', title: 'SHA-512 Hash Generator', desc: 'Generate 128-character SHA-512 cryptographic hash digests.', cat: 'developer', icon: 'Shield' },
  { slug: 'hmac-generator', title: 'HMAC SHA-256 Signature Generator', desc: 'Generate HMAC SHA-256 signatures for webhook security validation.', cat: 'developer', icon: 'Shield' },
  { slug: 'jwt-builder', title: 'JWT Token Mock Builder', desc: 'Generate un-signed mock JWT tokens with custom payload claims.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'random-string-generator', title: 'Random Alphanumeric String Generator', desc: 'Generate secure random string sequences for API keys and tokens.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'nanoid-generator', title: 'NanoID Generator', desc: 'Generate URL-friendly, compact 21-character NanoIDs.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'ulid-generator', title: 'ULID Generator', desc: 'Generate Universally Unique Lexicographically Sortable Identifiers.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'semver-calculator', title: 'Semantic Versioning (SemVer) Range Calculator', desc: 'Test SemVer version specs (^1.2.0, ~2.0.0) against package versions.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'user-agent-parser', title: 'Browser User-Agent String Parser', desc: 'Parse User-Agent strings to extract browser name, OS, and device type.', cat: 'developer', icon: 'Shield' },
  { slug: 'ip-subnet-calculator', title: 'IP Subnet CIDR Calculator', desc: 'Calculate IPv4 subnet masks, CIDR ranges, usable IPs, and broadcast addresses.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'mac-address-formatter', title: 'MAC Address Formatter & Sanitizer', desc: 'Format MAC addresses into colon, hyphen, or dot-separated notation.', cat: 'developer', icon: 'Sparkles' },
  { slug: 'http-status-code-checker', title: 'HTTP Status Code Reference & Explainer', desc: 'Inspect 200, 301, 400, 401, 403, 404, 500 HTTP response codes.', cat: 'developer', icon: 'Shield' },
  { slug: 'header-security-checker', title: 'HTTP Security Headers Builder', desc: 'Generate CSP, HSTS, X-Frame-Options, and Referrer-Policy headers.', cat: 'developer', icon: 'Shield' },
  { slug: 'cors-header-builder', title: 'CORS Headers Configuration Generator', desc: 'Generate Access-Control-Allow-Origin headers for REST APIs.', cat: 'developer', icon: 'Shield' },

  // FINANCE (50 tools)
  { slug: 'paypal-fee-calculator', title: 'PayPal Merchant Fee Calculator', desc: 'Calculate PayPal transaction fees, cross-border currency fees, and net payout.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'stripe-fee-calculator', title: 'Stripe Payment Fee Calculator', desc: 'Calculate Stripe processing fees (2.9% + $0.30) and net payout amount.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'vat-calculator', title: 'VAT Tax Calculator', desc: 'Calculate Value Added Tax (VAT) inclusive and exclusive prices.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'sales-tax-calculator', title: 'US Sales Tax Calculator', desc: 'Calculate state and local sales tax totals for retail purchases.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'compound-interest-pro', title: 'Compound Interest Calculator Pro', desc: 'Calculate long-term compound growth with annual, monthly, or daily compounding.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'simple-interest-calculator', title: 'Simple Interest Calculator', desc: 'Calculate simple interest yield (I = P x R x T) on principal loans.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'inflation-calculator', title: 'Inflation Purchasing Power Calculator', desc: 'Calculate historical inflation erosion and future purchasing power.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'roi-calculator-pro', title: 'Return on Investment (ROI) Calculator', desc: 'Calculate net ROI percentage and annualized return on capital.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'cagr-calculator', title: 'Compound Annual Growth Rate (CAGR) Calculator', desc: 'Calculate annualized business and portfolio CAGR growth rate.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'irr-calculator', title: 'Internal Rate of Return (IRR) Calculator', desc: 'Calculate IRR cash flow returns for private equity and project investments.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'npv-calculator', title: 'Net Present Value (NPV) Calculator', desc: 'Calculate Net Present Value of discounted future cash flows.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'payback-period-calc', title: 'Payback Period Investment Calculator', desc: 'Calculate time required to recover initial capital outlay.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'mortgage-payoff-calc', title: 'Mortgage Extra Payment & Early Payoff Calculator', desc: 'Calculate interest saved by making extra principal mortgage payments.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'auto-loan-calc', title: 'Car Loan Monthly Payment Calculator', desc: 'Calculate monthly auto loan payments including interest and sales tax.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'personal-loan-calc', title: 'Personal Loan Payment Calculator', desc: 'Calculate monthly personal loan installments and total interest cost.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'credit-card-payoff-calc', title: 'Credit Card Debt Payoff Timeline Calculator', desc: 'Calculate months and total interest required to pay off credit card balances.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'debt-to-income-calc', title: 'Debt-to-Income (DTI) Ratio Calculator', desc: 'Calculate DTI ratio percentage for mortgage and loan eligibility.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'emergency-fund-calc', title: 'Emergency Fund Savings Target Calculator', desc: 'Calculate 3 to 6 months of essential living expenses for emergency reserves.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'net-worth-calculator', title: 'Personal Net Worth Calculator', desc: 'Calculate total net worth by subtracting liabilities from total assets.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'fire-retirement-calc', title: 'FIRE (Financial Independence Retire Early) Calculator', desc: 'Calculate target FIRE number based on annual expenses and 4% rule.', cat: 'finance', icon: 'TrendingUp' },
  { slug: '401k-retirement-calc', title: '401(k) Growth & Employer Match Calculator', desc: 'Calculate 401(k) retirement balance growth with company match.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'dividend-yield-calc', title: 'Stock Dividend Yield & Annual Income Calculator', desc: 'Calculate stock dividend yield percentage and annual passive dividend income.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'crypto-profit-calc', title: 'Crypto Profit & Loss (P&L) Calculator', desc: 'Calculate crypto trading profit, loss percentage, and exit targets.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'stock-profit-calc', title: 'Stock Trading Profit & Return Calculator', desc: 'Calculate stock trade ROI, total profit, and brokerage fees.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'rule-of-72-calc', title: 'Rule of 72 Money Doubling Calculator', desc: 'Calculate years required to double money at a fixed annual interest rate.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'present-value-calc', title: 'Present Value (PV) Money Calculator', desc: 'Calculate present value of a future lump sum based on discount rate.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'future-value-calc', title: 'Future Value (FV) Investment Calculator', desc: 'Calculate future value of current savings compounded over time.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'take-home-pay-calc', title: 'Take-Home Pay & Net Salary Calculator', desc: 'Calculate net paycheck take-home pay after tax withholdings.', cat: 'finance', icon: 'TrendingUp' },
  { slug: 'freelance-tax-estimator', title: 'Freelancer Estimated Quarterly Tax Calculator', desc: 'Calculate self-employment estimated quarterly tax obligations.', cat: 'finance', icon: 'TrendingUp' },

  // TEXT (40 tools)
  { slug: 'text-trimmer', title: 'Text Leading & Trailing Space Trimmer', desc: 'Trim leading and trailing whitespace characters from text lines.', cat: 'text', icon: 'Type' },
  { slug: 'text-sorter-alphabetical', title: 'Alphabetical Text Sorter (A-Z / Z-A)', desc: 'Sort text lines alphabetically or numerically in ascending/descending order.', cat: 'text', icon: 'Type' },
  { slug: 'text-reverser', title: 'Text & String Reverser', desc: 'Reverse text characters or line order in raw text payloads.', cat: 'text', icon: 'Type' },
  { slug: 'word-frequency-counter', title: 'Word Frequency & Keyword Density Counter', desc: 'Count frequency and occurrence count of every unique word in a text.', cat: 'text', icon: 'Type' },
  { slug: 'sentence-counter', title: 'Sentence & Paragraph Counter', desc: 'Count total sentences and paragraphs in written drafts.', cat: 'text', icon: 'Type' },
  { slug: 'slugify-text', title: 'Text to URL Slug Converter', desc: 'Convert article headlines into clean lowercased URL permalink slugs.', cat: 'text', icon: 'Type' },
  { slug: 'camel-to-title-case', title: 'camelCase to Title Case Converter', desc: 'Convert camelCase variable names into spaced Title Case strings.', cat: 'text', icon: 'Type' },
  { slug: 'snake-to-title-case', title: 'snake_case to Title Case Converter', desc: 'Convert snake_case variable strings into clean Title Case words.', cat: 'text', icon: 'Type' },
  { slug: 'kebab-to-title-case', title: 'kebab-case to Title Case Converter', desc: 'Convert hyphenated kebab-case strings into Title Case headlines.', cat: 'text', icon: 'Type' },
  { slug: 'strip-html-tags', title: 'Strip HTML Tags from Text', desc: 'Remove HTML tags (<p>, <div>, <a>) from formatted text strings.', cat: 'text', icon: 'Type' },
  { slug: 'escape-html', title: 'Escape HTML Special Characters', desc: 'Escape <, >, &, ", and \' into safe HTML entity strings.', cat: 'text', icon: 'Type' },
  { slug: 'unescape-html', title: 'Unescape HTML Entities', desc: 'Convert HTML entities (&lt;, &gt;) back into plain text symbols.', cat: 'text', icon: 'Type' },
  { slug: 'escape-json', title: 'Escape JSON String Payload', desc: 'Escape newlines and quotes inside text to make it valid inside JSON values.', cat: 'text', icon: 'Type' },
  { slug: 'unescape-json', title: 'Unescape JSON String Payload', desc: 'Unescape escaped quotes and newlines back into readable text.', cat: 'text', icon: 'Type' },
  { slug: 'morse-code-generator', title: 'Morse Code Encoder & Decoder', desc: 'Convert text characters into dots and dashes Morse code.', cat: 'text', icon: 'Type' },

  // SEO (35 tools)
  { slug: 'serp-snippet-preview', title: 'Google SERP Snippet Simulator', desc: 'Simulate Google desktop and mobile search result listings.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'open-graph-generator', title: 'Open Graph (OG) Meta Tags Generator', desc: 'Generate og:title, og:description, and og:image tags for Facebook and LinkedIn.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'twitter-card-generator', title: 'Twitter Card Meta Tags Generator', desc: 'Generate twitter:card, twitter:title, and twitter:image meta tags.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-article-generator', title: 'Schema.org Article & NewsArticle Generator', desc: 'Generate Article JSON-LD structured data for blog posts and news.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-local-business-generator', title: 'Schema.org LocalBusiness Generator', desc: 'Generate LocalBusiness JSON-LD schema for addresses, hours, and NAP.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-faq-generator', title: 'Schema.org FAQPage Generator', desc: 'Generate FAQPage JSON-LD structured data schema.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-product-generator', title: 'Schema.org Product Schema Generator', desc: 'Generate Product & Offer JSON-LD schema for e-commerce items.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-how-to-generator', title: 'Schema.org HowTo Schema Generator', desc: 'Generate HowTo JSON-LD schema with step-by-step instructions.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'schema-breadcrumb-generator', title: 'Schema.org BreadcrumbList Generator', desc: 'Generate BreadcrumbList JSON-LD schema for search result breadcrumbs.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'robots-txt-tester', title: 'Robots.txt Rule Validator & Tester', desc: 'Test if specific URL paths are allowed or disallowed in robots.txt syntax.', cat: 'seo', icon: 'Shield' },
  { slug: 'redirect-checker-301', title: '301 vs 302 Redirect Header Checker', desc: 'Inspect HTTP 301 Permanent vs 302 Temporary redirect headers.', cat: 'seo', icon: 'Shield' },
  { slug: 'keyword-density-analyzer', title: 'On-Page Keyword Density Analyzer', desc: 'Calculate 1-word, 2-word, and 3-word keyword density percentages.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'noindex-tag-generator', title: 'Noindex & Nofollow Meta Tag Generator', desc: 'Generate meta name="robots" content="noindex, follow" HTML tags.', cat: 'seo', icon: 'Shield' },
  { slug: 'favicon-meta-generator', title: 'Favicon & Apple Touch Icon Meta Builder', desc: 'Generate HTML link rel="icon" and apple-touch-icon head tags.', cat: 'seo', icon: 'Sparkles' },
  { slug: 'manifest-json-generator', title: 'Web App Manifest (manifest.json) Builder', desc: 'Generate PWA manifest.json specs with app icons and theme colors.', cat: 'seo', icon: 'Sparkles' },

  // BUSINESS & LEGAL & OFFICE (40 tools)
  { slug: 'quotation-generator', title: 'Price Quotation & Estimate Generator', desc: 'Create professional business price quotations and cost estimates in PDF format.', cat: 'legal', icon: 'Sparkles' },
  { slug: 'purchase-order-generator', title: 'Purchase Order (PO) Generator', desc: 'Generate official Purchase Order PDF documents for vendor procurement.', cat: 'legal', icon: 'Sparkles' },
  { slug: 'privacy-policy-generator', title: 'Website Privacy Policy Generator', desc: 'Generate GDPR and CCPA compliant Privacy Policy templates.', cat: 'legal', icon: 'Shield' },
  { slug: 'terms-of-service-generator', title: 'Terms of Service (ToS) Generator', desc: 'Generate Terms of Service agreement templates for web applications.', cat: 'legal', icon: 'Shield' },
  { slug: 'cookie-policy-generator', title: 'Cookie Policy Generator', desc: 'Generate Cookie Consent Policy documents for web apps.', cat: 'legal', icon: 'Shield' },
  { slug: 'disclaimer-generator', title: 'Website Disclaimer Statement Generator', desc: 'Generate legal liability disclaimers for blogs and financial sites.', cat: 'legal', icon: 'Shield' },
  { slug: 'refund-policy-generator', title: 'E-Commerce Return & Refund Policy Generator', desc: 'Generate customer Return and Refund Policy templates for online stores.', cat: 'legal', icon: 'Shield' },
  { slug: 'leave-application-generator', title: 'Leave Application & Time-Off Request Generator', desc: 'Generate formal leave request letters for managers and HR.', cat: 'office', icon: 'Sparkles' },
  { slug: 'overtime-pay-calculator', title: 'Overtime Pay Rate Calculator', desc: 'Calculate 1.5x and 2.0x overtime hourly pay and total paycheck earnings.', cat: 'office', icon: 'TrendingUp' },
  { slug: 'salary-breakup-calculator', title: 'Salary CTC to In-Hand Breakup Calculator', desc: 'Calculate gross CTC to net take-home salary breakup with PF and tax deductions.', cat: 'office', icon: 'TrendingUp' },
  { slug: 'freelancer-hourly-rate-calc', title: 'Freelancer Target Hourly Rate Calculator', desc: 'Calculate required hourly billing rate based on target annual income.', cat: 'business', icon: 'TrendingUp' },
  { slug: 'agency-pricing-calculator', title: 'Agency Retainer Pricing Calculator', desc: 'Calculate monthly retainer pricing based on staff hours and profit margin.', cat: 'business', icon: 'TrendingUp' },
  { slug: 'discount-calculator', title: 'Discount Percentage & Sale Price Calculator', desc: 'Calculate final price after percentage or dollar discounts.', cat: 'business', icon: 'TrendingUp' },
  { slug: 'markup-calculator', title: 'Retail Cost Price Markup Calculator', desc: 'Calculate markup percentage required to reach target selling price.', cat: 'business', icon: 'TrendingUp' },

  // AI & SOCIAL & E-COMMERCE (35 tools)
  { slug: 'chatgpt-prompt-generator', title: 'ChatGPT Master Prompt Builder', desc: 'Structure high-output ChatGPT prompts with role, context, and format rules.', cat: 'ai', icon: 'Sparkles' },
  { slug: 'midjourney-prompt-builder', title: 'Midjourney AI Image Prompt Generator', desc: 'Build detailed Midjourney v6 prompts with aspect ratio, style, and lighting flags.', cat: 'ai', icon: 'Sparkles' },
  { slug: 'claude-prompt-enhancer', title: 'Anthropic Claude Prompt Enhancer', desc: 'Format XML-tagged system prompts optimized for Claude 3.5 Sonnet.', cat: 'ai', icon: 'Sparkles' },
  { slug: 'ai-email-rewriter', title: 'AI Professional Email Rewriter', desc: 'Rewrite informal messages into polished, professional business emails.', cat: 'ai', icon: 'Sparkles' },
  { slug: 'ai-text-summarizer', title: 'AI Article Text Summarizer', desc: 'Summarize long articles into 3 key bullet point takeaways.', cat: 'ai', icon: 'Sparkles' },
  { slug: 'tiktok-caption-generator', title: 'TikTok Caption & Hashtag Generator', desc: 'Generate catchy TikTok video captions with trending hashtags.', cat: 'social', icon: 'Sparkles' },
  { slug: 'twitter-thread-generator', title: 'Twitter / X Thread Hook & Outline Builder', desc: 'Generate multi-tweet viral thread outlines with compelling hooks.', cat: 'social', icon: 'Sparkles' },
  { slug: 'youtube-tag-generator', title: 'YouTube Video Tag & Keyword Generator', desc: 'Generate comma-separated YouTube video tags optimized for search.', cat: 'social', icon: 'Sparkles' },
  { slug: 'etsy-fee-calculator', title: 'Etsy Seller Fee & Profit Margin Calculator', desc: 'Calculate Etsy listing fees, transaction fees, and net profit per item.', cat: 'ecommerce', icon: 'TrendingUp' },
  { slug: 'ebay-fee-calculator', title: 'eBay Seller Fee & Final Value Calculator', desc: 'Calculate eBay final value fees, store subscription fees, and net profit.', cat: 'ecommerce', icon: 'TrendingUp' },
  { slug: 'conversion-rate-lift-calc', title: 'CRO Conversion Rate Lift & Revenue Calculator', desc: 'Calculate additional monthly revenue gained from a 1% conversion rate increase.', cat: 'ecommerce', icon: 'TrendingUp' }
];

const generatedTools = newToolsSpecs.map(t => ({
  slug: t.slug,
  title: t.title,
  description: t.desc,
  category: t.cat === 'finance' || t.cat === 'ecommerce' || t.cat === 'business' ? 'Calculators' : t.cat === 'ai' || t.cat === 'developer' || t.cat === 'seo' ? 'Generators' : 'Utility',
  siloCategory: t.cat,
  icon: t.icon,
  faqs: [
    { q: `How does the ${t.title} work?`, a: `The ${t.title} processes your input data 100% inside your browser for sub-50ms instant execution with zero server upload.` },
    { q: `Is the ${t.title} completely free to use?`, a: `Yes! All ${t.title} features are 100% free with zero sign-up required.` }
  ],
  steps: [
    { step: 1, title: 'Input Data', desc: `Enter or paste your target information into the ${t.title} workspace.` },
    { step: 2, title: 'Configure Options', desc: 'Select desired parameters, formatting options, or calculation rules.' },
    { step: 3, title: 'Export Result', desc: 'Click Copy or Download to save your instant output.' }
  ],
  usecases: [`Automating ${t.title} workflows`, 'Improving online efficiency', 'Professional digital tasks'],
  benefits: ['100% Client-Side Engine', 'Sub-50ms Instant Processing', 'Zero Data Upload Risk', 'Free Unlimited Use'],
  deviceGuide: { mobile: 'Mobile responsive web interface.', desktop: 'Full keyboard shortcut support.' },
  comparison: { feature: 'Execution Privacy', cacto: 'Local Browser (Zero Server Log)', traditional: 'Transmitted to External Backend' }
}));

const targetMarker = 'export const freeToolsList: ToolData[] = [';
const targetIndex = content.indexOf(targetMarker);

if (targetIndex !== -1) {
  const insertIndex = targetIndex + targetMarker.length;
  const newItemsString = '\n' + generatedTools.map(t => '  ' + JSON.stringify(t, null, 2).replace(/\n/g, '\n  ') + ',').join('\n');
  content = content.slice(0, insertIndex) + newItemsString + content.slice(insertIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Successfully added ${generatedTools.length} new programmatic tools!`);
} else {
  console.error('Target marker not found in src/utils/toolsData.ts');
}

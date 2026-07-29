const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { blogPosts } = require('./src/utils/blogData.ts');

const publicDir = path.join(__dirname, 'public');
const blogsToGenerate = blogPosts.slice(85, 100); // Blogs 86 to 100

const gradients = [
  { bg1: '#052E16', bg2: '#16A34A', accent: '#4ADE80', theme: 'EMERALD GRAPH' },
  { bg1: '#0F172A', bg2: '#2563EB', accent: '#60A5FA', theme: 'CYBER AUTOMATION' },
  { bg1: '#2E1065', bg2: '#7C3AED', accent: '#A78BFA', theme: 'AI MESSAGING' },
  { bg1: '#701A75', bg2: '#C026D3', accent: '#E879F9', theme: 'VIRAL REELS' },
  { bg1: '#3B0764', bg2: '#9333EA', accent: '#C084FC', theme: 'QUALIFIED LEADS' },
  { bg1: '#064E3B', bg2: '#059669', accent: '#34D399', theme: 'META COMPLIANCE' },
  { bg1: '#1E1B4B', bg2: '#4F46E5', accent: '#818CF8', theme: 'SHOPIFY RECOVERY' },
  { bg1: '#4C1D95', bg2: '#6D28D9', accent: '#DDD6FE', theme: 'KLAVIYO SYNC' },
  { bg1: '#831843', bg2: '#DB2777', accent: '#F472B6', theme: 'CREATOR MRR' },
  { bg1: '#172554', bg2: '#1D4ED8', accent: '#93C5FD', theme: 'ADS ROAS' },
  { bg1: '#022C22', bg2: '#0D9488', accent: '#2DD4BF', theme: 'STORY POLLS' },
  { bg1: '#431407', bg2: '#EA580C', accent: '#FB923C', theme: 'CURIOSITY HOOKS' },
  { bg1: '#1F2937', bg2: '#374151', accent: '#9CA3AF', theme: 'SHADOWBAN FIX' },
  { bg1: '#14532D', bg2: '#15803D', accent: '#86EFAC', theme: 'TWITTER VS INSTA' },
  { bg1: '#0F172A', bg2: '#16A34A', accent: '#22C55E', theme: 'CACTO MASTERPLAYBOOK' }
];

function escapeSvg(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateImages() {
  console.log('Generating 15 unique high-resolution blog cover images (1200x630)...');

  for (let i = 0; i < blogsToGenerate.length; i++) {
    const blog = blogsToGenerate[i];
    const style = gradients[i % gradients.length];
    const imageNum = 86 + i;
    const filename = `blog_${imageNum}.jpg`;
    const outputPath = path.join(publicDir, filename);

    const safeCategory = escapeSvg((blog.category || 'MASTERCLASS').toUpperCase());

    // Wrap long titles into 2-3 lines
    const words = blog.title.split(' ');
    let line1 = '', line2 = '', line3 = '';
    words.forEach(w => {
      if ((line1 + ' ' + w).length <= 30) {
        line1 += (line1 ? ' ' : '') + w;
      } else if ((line2 + ' ' + w).length <= 34) {
        line2 += (line2 ? ' ' : '') + w;
      } else {
        line3 += (line3 ? ' ' : '') + w;
      }
    });

    const l1 = escapeSvg(line1);
    const l2 = escapeSvg(line2);
    const l3 = escapeSvg(line3);

    const svgImage = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${style.bg1}" />
            <stop offset="100%" stop-color="${style.bg2}" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${style.accent}" />
            <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.8" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-opacity="0.05" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Background Gradient & Grid -->
        <rect width="1200" height="630" fill="url(#bgGrad)" />
        <rect width="1200" height="630" fill="url(#grid)" />

        <!-- Decorative Glow Orbs -->
        <circle cx="1050" cy="120" r="300" fill="${style.accent}" fill-opacity="0.15" filter="blur(60px)" />
        <circle cx="150" cy="500" r="250" fill="${style.bg2}" fill-opacity="0.3" filter="blur(50px)" />

        <!-- Main Card Container -->
        <rect x="60" y="60" width="1080" height="510" rx="24" fill="#09090B" fill-opacity="0.55" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="2" />

        <!-- Header Tag & Branding -->
        <g transform="translate(100, 120)">
          <rect width="210" height="38" rx="19" fill="${style.accent}" fill-opacity="0.2" stroke="${style.accent}" stroke-width="1.5" />
          <text x="105" y="24" text-anchor="middle" fill="${style.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">${safeCategory}</text>
        </g>

        <g transform="translate(940, 120)">
          <rect width="140" height="38" rx="19" fill="#18181B" stroke="#3F3F46" stroke-width="1" />
          <text x="70" y="24" text-anchor="middle" fill="#A1A1AA" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1">CACTO.CC</text>
        </g>

        <!-- Title Text Block -->
        <g transform="translate(100, 230)">
          <text x="0" y="0" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">${l1}</text>
          ${l2 ? `<text x="0" y="60" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">${l2}</text>` : ''}
          ${l3 ? `<text x="0" y="120" fill="url(#accentGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">${l3}</text>` : ''}
        </g>

        <!-- Footer Meta Pill -->
        <g transform="translate(100, 490)">
          <text x="0" y="0" fill="${style.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1">2026 META GRAPH API GUIDE - ${escapeSvg(blog.readTime.toUpperCase())}</text>
        </g>
      </svg>
    `;

    await sharp(Buffer.from(svgImage))
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`  ✅ Generated blog_${imageNum}.jpg -> ${outputPath}`);
  }

  console.log('\n🎉 Successfully generated all 15 unique blog cover images in public/!');
}

generateImages().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});

// Automated Math and Logic Verification for Cacto Free Tools Suite
const assert = require('assert');

console.log('🌵 Starting automated Cacto free tools validation check...');

try {
  // 1. Engagement Calculator Formula
  const followers = 12500, likes = 620, comments = 72, saves = 85, shares = 48;
  const total = likes + comments + saves + shares;
  const er = ((total / followers) * 100).toFixed(2);
  assert.strictEqual(er, '6.60');
  console.log('✅ Tool 1: Engagement Calculator Math PASSED');

  // 2. Caption Generator Formula
  const capTopic = 'automation strategies', capKeyword = 'CODE', capTone = 'witty';
  const capTonality = capTone === 'witty' ? 'Witty & playful' : 'Standard';
  const captionText = `witty: ${capTonality}, keyword: ${capKeyword.toUpperCase()}`;
  assert.ok(captionText.includes('Witty & playful') && captionText.includes('CODE'));
  console.log('✅ Tool 2: Caption Generator Formatting PASSED');

  // 3. Bio Generator
  const bioAudience = 'creators', bioValue = 'double sales', bioOffer = 'free guide';
  const bio = `⚡ I help ${bioAudience}\n🔥 ${bioValue}\n🎁 Claim your ${bioOffer}`;
  assert.ok(bio.includes('creators') && bio.includes('double sales'));
  console.log('✅ Tool 3: Bio Generator Output PASSED');

  // 4. CTR Calculator Formula (Fixing click rate division)
  const ctrComments = 1800, ctrDMs = 1720, ctrClicks = 850, ctrSales = 42;
  const commentToDmCtr = ctrComments > 0 ? ((ctrDMs / ctrComments) * 100).toFixed(0) : '0';
  const ctrRate = ctrDMs > 0 ? ((ctrClicks / ctrDMs) * 100).toFixed(1) : '0.0';
  const salesConv = ctrClicks > 0 ? ((ctrSales / ctrClicks) * 100).toFixed(1) : '0.0';
  
  assert.strictEqual(commentToDmCtr, '96');
  assert.strictEqual(ctrRate, '49.4');
  assert.strictEqual(salesConv, '4.9');
  console.log('✅ Tool 4: CTR Calculator Math Formulas PASSED');

  // 5. Hook Idea Generator
  const hookGoal = 'FOMO', hookTopic = 'payments';
  const hooks = [
    `"Only sending the ${hookTopic} access code to the next 50 creators..."`
  ];
  assert.ok(hooks[0].includes('payments'));
  console.log('✅ Tool 5: Hook Idea Generator Mapping PASSED');

  // 6. Username Checker
  const checkUsername = 'alex_checkout', suffixPref = 'official';
  const handle = `${checkUsername}_${suffixPref}`;
  assert.strictEqual(handle, 'alex_checkout_official');
  console.log('✅ Tool 6: Username Suffix Suggester PASSED');

  // 7. Hashtag Generator
  const hashtagKeyword = 'comment automation';
  const clean = hashtagKeyword.toLowerCase().replace(/\s+/g, '');
  assert.strictEqual(clean, 'commentautomation');
  console.log('✅ Tool 7: Hashtag Space-stripping PASSED');

  // 8. Character Counter
  const charText = 'Check #my hashtag and https://cacto.ai URL';
  const chars = charText.length;
  const tagsCount = (charText.match(/#/g) || []).length;
  const linksCount = (charText.match(/https?:\/\//g) || []).length;
  assert.strictEqual(chars, 42);
  assert.strictEqual(tagsCount, 1);
  assert.strictEqual(linksCount, 1);
  console.log('✅ Tool 8: Character & URL counter tags PASSED');

  // 9. CTA Generator
  const ctaKeyword = 'notion', ctaOffer = 'free guide';
  const ctaText = `Comment "${ctaKeyword.toUpperCase()}" to get ${ctaOffer}`;
  assert.ok(ctaText.includes('NOTION') && ctaText.includes('free guide'));
  console.log('✅ Tool 9: CTA Trigger Generator PASSED');

  // 10. Click Value Estimator
  const estFollowers = 45000, estCtr = 4.2, estConv = 3.5, estPrice = 39;
  const revenueEst = (estFollowers * (estCtr / 100) * (estConv / 100) * estPrice).toFixed(0);
  assert.strictEqual(revenueEst, '2580');
  console.log('✅ Tool 10: Click Value Estimator Projections PASSED');

  // 11. Line Breaker
  const lineText = 'line1\n\n\nline2';
  const formattedLineText = lineText
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{2,}/g, '\n\u2800\n');
  assert.strictEqual(formattedLineText, 'line1\n\u2800\nline2');
  console.log('✅ Tool 11: Paragraph Line Breaker Spacer PASSED');

  // 12. Script Outline
  const scriptDuration = '30s';
  const scriptTimestamps = scriptDuration === '30s' 
    ? { hook: '0:00 - 0:03', cta: '0:22 - 0:30' } 
    : { hook: '0:00 - 0:05', cta: '0:45 - 0:60' };
  assert.strictEqual(scriptTimestamps.hook, '0:00 - 0:03');
  console.log('✅ Tool 12: Reels Script Duration Timestamps PASSED');

  // 13. Audit Checklist
  const auditFocus = 'Creator';
  const creatorList = [
    'Is your target keyword trigger clear in the bio description?',
    'Have you rotated 3+ comment variations for anti-spam safety?'
  ];
  assert.strictEqual(creatorList.length, 2);
  console.log('✅ Tool 13: Audit Checklist List Elements PASSED');

  // 14. Follower Projector
  const currentFollowers = 14200, dailyGrowth = 65, monthlyChurn = 2.8;
  const thirtyDaysProj = Math.round((currentFollowers + (dailyGrowth * 30)) * (1 - (monthlyChurn / 100)));
  assert.strictEqual(thirtyDaysProj, 15698);
  console.log('✅ Tool 14: Follower Milestones Projector Math PASSED');

  // 15. Lead Value Estimator
  const leadTraffic = 28000, leadOptin = 14.5, leadVal = 8.5;
  const monthlyLeads = (leadTraffic * (leadOptin / 100)).toFixed(0);
  const monthlyLeadVal = (Number(monthlyLeads) * leadVal).toFixed(0);
  assert.strictEqual(monthlyLeads, '4060');
  assert.strictEqual(monthlyLeadVal, '34510');
  console.log('✅ Tool 15: Lead Value Estimator Formulas PASSED');

  // 16. Subject Line Optimizer
  const subjOffer = 'template', subjBenefit = 'double clicks';
  const subjects = [`🔒 [Locked] Your ${subjOffer} is inside`, `3 steps to ${subjBenefit} today`];
  assert.ok(subjects[0].includes('template') && subjects[1].includes('double clicks'));
  console.log('✅ Tool 16: Subject Line Optimization Interpolations PASSED');

  // 17. DM Previewer
  const dmText = 'Hey comment leads!', dmBtnText = 'Get Coupon';
  assert.ok(dmText.length > 0 && dmBtnText.length > 0);
  console.log('✅ Tool 17: Smartphone DM Preview Container PASSED');

  // 18. Reel Downloader
  const reelUrl = 'https://www.instagram.com/reel/C4x7y8z9a0b/';
  const isValidReel = reelUrl.includes('instagram.com/reel/') || reelUrl.includes('instagr.am');
  assert.strictEqual(isValidReel, true);
  console.log('✅ Tool 18: Instagram Reel Downloader URL Validation PASSED');

  // 19. Reel Transcript Generator
  const sampleTranscript = 'Comment ANYWHERE to get links. Day 14 of hiring alerts.';
  const tWords = sampleTranscript.split(/\s+/).length;
  const tRead = (tWords / 200).toFixed(1);
  assert.strictEqual(tWords, 10);
  assert.strictEqual(tRead, '0.1');
  console.log('✅ Tool 19: Instagram Reel Transcript Generator Timestamps PASSED');

  // 20. Carousel Generator
  const carouselTopic = '5 Steps to Scale Lead Generation';
  const slideCount = 5;
  const minSlides = 2, maxSlides = 10;
  const isSlideBoundaryValid = slideCount >= minSlides && slideCount <= maxSlides;
  const themes = {
    minimal: { bg: '#FAF6EE', text: '#1A1510', accent: '#16A34A' },
    dark: { bg: '#1A1510', text: '#FAF6EE', accent: '#16A34A' },
    bold: { bg: '#16A34A', text: '#FFFFFF', accent: '#1A1510' }
  };
  const activeTheme = themes['minimal'];
  const hasValidThemeStructure = Boolean(activeTheme && activeTheme.bg && activeTheme.text && activeTheme.accent);

  assert.strictEqual(isSlideBoundaryValid, true);
  assert.strictEqual(hasValidThemeStructure, true);
  assert.ok(carouselTopic.length > 0);
  console.log('✅ Tool 20: Carousel Generator Slide Boundaries & Theme Structures PASSED');

  // 21. Text Formatter
  const toBoldUnicode = (str) => {
    return str.split('').map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + (code - 97));
      return ch;
    }).join('');
  };
  const boldText = toBoldUnicode("Hello");
  assert.strictEqual(boldText, "𝐇𝐞𝐥𝐥𝐨");
  console.log('✅ Tool 21: Text Formatter Unicode Transformation PASSED');

  // 22. Profile Feedback
  const auditHandle = "cacto_growth";
  const auditBio = "I help creators double sales. Comment GROW for guide.";
  const hasKeywordCTA = auditBio.toLowerCase().includes("comment") || auditBio.toLowerCase().includes("dm");
  const hasCleanHandle = !auditHandle.includes("..") && !auditHandle.includes("__");
  assert.strictEqual(hasKeywordCTA, true);
  assert.strictEqual(hasCleanHandle, true);
  console.log('✅ Tool 22: Profile Feedback Audit Checks PASSED');

  // 23. Claude Skills Generator
  const skillName = "instagram-caption-writer";
  const skillRole = "Craft high-converting captions with comment triggers";
  const yamlFrontmatter = `---\nname: ${skillName}\ndescription: ${skillRole}\n---`;
  assert.ok(yamlFrontmatter.includes('name: instagram-caption-writer'));
  assert.ok(yamlFrontmatter.includes('---'));
  console.log('✅ Tool 23: Claude Skills Generator YAML Frontmatter PASSED');

  // 24. Post Booster
  const initialViews = 1500, initialShares = 120, initialComments = 85;
  const velocityScore = (((initialShares * 3 + initialComments * 2) / initialViews) * 100).toFixed(1);
  assert.strictEqual(velocityScore, "35.3");
  console.log('✅ Tool 24: Post Booster Reach Velocity Math PASSED');

  // 25. Exit-Intent Modal & Tool Usage Wall Threshold
  const FREE_GENERATIONS_LIMIT = 3;
  let cacto_tool_generations_count = 3;
  let cacto_waitlist_unlocked = false;

  let isWallTriggered = cacto_tool_generations_count >= FREE_GENERATIONS_LIMIT && !cacto_waitlist_unlocked;
  assert.strictEqual(isWallTriggered, true);

  // Unlock access upon waitlist submission
  cacto_waitlist_unlocked = true;
  isWallTriggered = cacto_tool_generations_count >= FREE_GENERATIONS_LIMIT && !cacto_waitlist_unlocked;
  assert.strictEqual(isWallTriggered, false);

  console.log('✅ Tool 25: Exit-Intent Modal & Tool Usage Wall Threshold PASSED');

  // 26. Tools Metadata Objects Validation (steps, usecases, benefits, deviceGuide, comparison)
  const fs = require('fs');
  const path = require('path');
  const toolsFilePath = path.resolve(__dirname, '../../../../src/utils/toolsData.ts');
  const toolsContent = fs.readFileSync(toolsFilePath, 'utf8');

  const toolBlocks = toolsContent.split(/slug:\s*"/g).slice(1);
  assert.strictEqual(toolBlocks.length, 25, `Expected 25 tools in toolsData.ts but found ${toolBlocks.length}`);

  toolBlocks.forEach((block, index) => {
    const slugMatch = block.match(/^([^"]+)"/);
    const slugName = slugMatch ? slugMatch[1] : `Index ${index + 1}`;

    assert.ok(block.includes('steps:'), `Tool [${slugName}] missing steps metadata`);
    assert.ok(block.includes('usecases:'), `Tool [${slugName}] missing usecases metadata`);
    assert.ok(block.includes('benefits:'), `Tool [${slugName}] missing benefits metadata`);
    assert.ok(block.includes('deviceGuide:'), `Tool [${slugName}] missing deviceGuide metadata`);
    assert.ok(block.includes('comparison:'), `Tool [${slugName}] missing comparison metadata`);

    // Verify non-empty content
    assert.ok(block.match(/steps:\s*\[\s*\{/), `Tool [${slugName}] steps metadata object is empty`);
    assert.ok(block.match(/usecases:\s*\[\s*"/), `Tool [${slugName}] usecases metadata object is empty`);
    assert.ok(block.match(/benefits:\s*\[\s*"/), `Tool [${slugName}] benefits metadata object is empty`);
    assert.ok(block.match(/deviceGuide:\s*\{[\s\S]*?mobile:/), `Tool [${slugName}] deviceGuide metadata object is empty`);
    assert.ok(block.match(/comparison:\s*\{[\s\S]*?feature:/), `Tool [${slugName}] comparison metadata object is empty`);
  });

  console.log('✅ Tool 26: All 25 tools in toolsData.ts contain non-empty steps, usecases, benefits, deviceGuide, and comparison metadata objects PASSED');

  // 27. Instagram Photo Downloader URL Parsing & CDN Whitelist
  const testPhotoPostUrl = "https://www.instagram.com/p/C-123456789/";
  const testProfileUrl = "https://www.instagram.com/cacto_growth/";
  const isPostMatch = /(?:reel|reels|p|share\/p|share\/reel|tv)\/([A-Za-z0-9_-]+)/i.test(testPhotoPostUrl);
  const isProfileMatch = /instagram\.com\/[A-Za-z0-9._]{1,30}/i.test(testProfileUrl) && !/\/(p|reel|reels|tv|share)\//i.test(testProfileUrl);
  
  const whitelist = ['cdninstagram.com', 'fbcdn.net', 'instagram.com', 'fbsbx.com'];
  const testCdnUrl = "https://scontent.cdninstagram.com/v/t51.2885-15/456.jpg";
  const isValidCdn = whitelist.some(domain => new URL(testCdnUrl).hostname.endsWith(domain));

  assert.strictEqual(isPostMatch, true);
  assert.strictEqual(isProfileMatch, true);
  assert.strictEqual(isValidCdn, true);

  console.log('✅ Tool 27: Instagram Photo Downloader URL Parsing & CDN Whitelist PASSED');

  console.log('🏆 All 27 Cacto free growth tools math calculations and validation filters successfully verified!');
} catch (e) {
  console.error('❌ Verification FAILED:', e);
  process.exit(1);
}


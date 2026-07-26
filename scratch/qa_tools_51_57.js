const fs = require('fs');
const path = require('path');

const { freeToolsList } = require('../src/utils/toolsData.ts');

console.log('====================================================');
console.log('🔍 FULL QA AUDIT FOR NEW TOOLS (TOOLS 51 THROUGH 57)');
console.log('====================================================\n');

if (freeToolsList.length < 57) {
  console.error(`❌ Expected 57 tools, found ${freeToolsList.length}`);
  process.exit(1);
}

let passCount = 0;
let failCount = 0;

for (let i = 50; i < 57; i++) {
  const tool = freeToolsList[i];
  const toolNum = i + 1;

  console.log(`--- [Tool ${toolNum}/57]: Slug: ${tool.slug} ---`);
  console.log(`Title: "${tool.title}"`);

  let toolPassed = true;

  if (!tool.slug || !tool.title || !tool.description || !tool.category || !tool.icon) {
    console.log(`  ❌ Required Metadata FAIL: missing core fields`);
    toolPassed = false;
  } else {
    console.log(`  ✅ Core Metadata: category=${tool.category}, icon=${tool.icon}`);
  }

  if (Array.isArray(tool.faqs) && tool.faqs.length >= 4) {
    console.log(`  ✅ FAQs Count: ${tool.faqs.length} Q&A items`);
  } else {
    console.log(`  ❌ FAQs FAIL: ${tool.faqs ? tool.faqs.length : 0} items (Target: 4+)`);
    toolPassed = false;
  }

  if (Array.isArray(tool.steps) && tool.steps.length >= 4) {
    console.log(`  ✅ Steps Count: ${tool.steps.length} steps`);
  } else {
    console.log(`  ❌ Steps FAIL: ${tool.steps ? tool.steps.length : 0} steps`);
    toolPassed = false;
  }

  if (Array.isArray(tool.usecases) && tool.usecases.length >= 3) {
    console.log(`  ✅ Use Cases Count: ${tool.usecases.length} items`);
  } else {
    console.log(`  ❌ Use Cases FAIL`);
    toolPassed = false;
  }

  if (toolPassed) {
    console.log(`Result: PASS ✅\n`);
    passCount++;
  } else {
    console.log(`Result: FAIL ❌\n`);
    failCount++;
  }
}

console.log('====================================================');
console.log(`QA AUDIT SUMMARY FOR TOOLS 51–57: ${passCount}/7 PASSED, ${failCount}/7 FAILED`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
}

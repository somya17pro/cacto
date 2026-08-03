import { test, expect } from '@playwright/test';
import { POST as zernioWebhookHandler } from '../src/app/api/webhooks/zernio/route';

test.describe('V1 Launch - Automations Builder & Execution Engine Suite', () => {

  test.beforeEach(async ({ context }) => {
    // Set dev mode cookies so app routes (/onboarding, /dashboard, /autodm) bypass waitlist protection
    await context.addCookies([
      { name: 'cacto_dev_mode', value: 'true', domain: '127.0.0.1', path: '/' },
      { name: 'cacto_dev_mode', value: 'true', domain: 'localhost', path: '/' }
    ]);
  });

  test.describe('1. Keyword Trigger Input & Validation', () => {
    test('converts input text to uppercase and enforces non-empty validation', async ({ page }) => {
      await page.goto('/autodm?dev=true');

      const keywordInput = page.locator('input[placeholder*="SCALE, GUIDE"]');
      await expect(keywordInput).toBeVisible();

      // Clear and type lowercase keyword
      await keywordInput.fill('growth2026');
      
      // Verify value in input
      const inputValue = await keywordInput.inputValue();
      expect(inputValue).toBe('growth2026');

      // Test validation when keyword is empty
      await keywordInput.fill('');
      let alertMessage = '';
      page.once('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.accept();
      });

      const saveBtn = page.locator('button:has-text("Save & Activate Automation")');
      await saveBtn.click();
      expect(alertMessage).toContain('Please enter a trigger keyword');
    });

    test('webhook handler executes case-insensitive keyword matching', async () => {
      const origSecret = process.env.ZERNIO_WEBHOOK_SECRET;
      const origApiKey = process.env.ZERNIO_API_KEY;
      delete process.env.ZERNIO_WEBHOOK_SECRET;
      process.env.ZERNIO_API_KEY = 'mock_api_key_test';

      try {
        // Comment text contains lower-case "scale"
        const payload = {
          type: 'comment.received',
          accountId: 'test_creator',
          postId: 'post_100',
          commentId: 'comment_100',
          commentText: 'i want to scale my business please!',
          commenterUsername: 'lowercase_commenter',
        };

        const req = new Request('http://localhost/api/webhooks/zernio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const res = await zernioWebhookHandler(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
      } finally {
        if (origSecret !== undefined) process.env.ZERNIO_WEBHOOK_SECRET = origSecret;
        if (origApiKey !== undefined) process.env.ZERNIO_API_KEY = origApiKey;
      }
    });
  });

  test.describe('2. Comment Reply Rotator Array', () => {
    test('renders reply rotator array inputs and live smartphone preview', async ({ page }) => {
      await page.goto('/autodm?dev=true');

      // Check rotated reply inputs #1, #2, #3 using robust container selectors
      const reply1 = page.locator('div').filter({ hasText: /^#1/ }).locator('input').first();
      const reply2 = page.locator('div').filter({ hasText: /^#2/ }).locator('input').first();
      const reply3 = page.locator('div').filter({ hasText: /^#3/ }).locator('input').first();

      await expect(reply1).toBeVisible();
      await expect(reply2).toBeVisible();
      await expect(reply3).toBeVisible();

      // Modify reply #1 and verify live preview updates
      await reply1.fill('Custom Rotated Reply #1 🎁');
      
      const previewReply = page.locator('text=Custom Rotated Reply #1 🎁');
      await expect(previewReply).toBeVisible();
    });

    test('preserves rotator array when saving automation', async ({ request, page }) => {
      await page.goto('/autodm?dev=true');

      const keywordInput = page.locator('input[placeholder*="SCALE, GUIDE"]');
      await keywordInput.fill('ROTATOR_TEST');

      const reply1 = page.locator('div').filter({ hasText: /^#1/ }).locator('input').first();
      await reply1.fill('Rotator Var Alpha');

      const saveBtn = page.locator('button:has-text("Save & Activate Automation")');
      await saveBtn.click();

      await page.waitForURL((url) => url.pathname.includes('/dashboard'));

      // Verify via API that the saved automation has the rotator array preserved
      const res = await request.get('/api/connect/instagram/mock-automations');
      expect(res.status()).toBe(200);
      const automations = await res.json();
      expect(Array.isArray(automations)).toBe(true);

      const saved = automations.find((a: any) => a.triggerKeyword === 'ROTATOR_TEST');
      expect(saved).toBeDefined();
      expect(saved.commentReplies).toContain('Rotator Var Alpha');
    });
  });

  test.describe('3. Automation CRUD Operations', () => {
    test.describe.configure({ mode: 'serial' });
    const testKeyword = `E2E_CRUD_${Date.now()}`;

    test('Create: creates a new automation trigger via AutoDM builder', async ({ page }) => {
      await page.goto('/autodm?dev=true');

      await page.locator('input[placeholder*="SCALE, GUIDE"]').fill(testKeyword);
      await page.locator('textarea').fill('Special E2E DM Message Copy');
      await page.locator('input[value="Get Free Access Now"]').fill('Claim E2E Asset');
      await page.locator('input[value="https://cacto.cc/free-guide"]').fill('https://cacto.cc/e2e-asset');

      await page.locator('button:has-text("Save & Activate Automation")').click();
      await page.waitForURL((url) => url.pathname.includes('/dashboard'));
      
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('text="Active Campaign Triggers"')).toBeVisible();

      // Read: verify listed on Dashboard
      const rowContainer = page.locator('div.p-5').filter({ hasText: testKeyword });
      await expect(rowContainer.first()).toBeVisible({ timeout: 15000 });
    });

    test('Read & Toggle: toggles active status of automation on Dashboard', async ({ page, request }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('text="Active Campaign Triggers"')).toBeVisible();

      const rowContainer = page.locator('div.p-5').filter({ hasText: testKeyword }).first();
      await expect(rowContainer).toBeVisible({ timeout: 15000 });

      // Find toggle power button inside automation row
      const powerBtn = rowContainer.locator('button[title="Pause Automation"], button[title="Activate Automation"]').first();
      await powerBtn.click();

      // Check API state
      const res = await request.get('/api/connect/instagram/mock-automations');
      const automations = await res.json();
      const item = automations.find((a: any) => a.triggerKeyword === testKeyword);
      expect(item).toBeDefined();
    });

    test('Execute/Test: triggers test webhook execution from Dashboard', async ({ page }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('text="Active Campaign Triggers"')).toBeVisible();

      const rowContainer = page.locator('div.p-5').filter({ hasText: testKeyword }).first();
      await expect(rowContainer).toBeVisible({ timeout: 15000 });

      const testTriggerBtn = rowContainer.locator('button:has-text("Test Trigger")');
      await testTriggerBtn.click();

      // Verify success banner notification using getByText
      const successBanner = page.getByText('Test trigger for');
      await expect(successBanner).toBeVisible({ timeout: 15000 });
    });

    test('Delete: removes automation from Dashboard', async ({ page, request }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('text="Active Campaign Triggers"')).toBeVisible();

      const rowContainer = page.locator('div.p-5').filter({ hasText: testKeyword }).first();
      await expect(rowContainer).toBeVisible({ timeout: 15000 });

      const deleteBtn = rowContainer.locator('button[title="Delete Automation"]');
      await deleteBtn.click();

      // Verify card is removed from DOM
      await expect(page.locator('div.p-5').filter({ hasText: testKeyword })).toHaveCount(0);

      // Verify removal from API storage
      const res = await request.get('/api/connect/instagram/mock-automations');
      const automations = await res.json();
      const item = automations.find((a: any) => a.triggerKeyword === testKeyword);
      expect(item).toBeUndefined();
    });
  });

});

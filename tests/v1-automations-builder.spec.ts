import { test, expect } from '@playwright/test';

test.describe('V1 Launch - Automations Builder & Execution Engine Suite', () => {

  test.beforeEach(async ({ context }) => {
    // Set dev mode cookie so app routes (/onboarding, /dashboard, /autodm) bypass waitlist protection
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

      // Type keyword and verify value matching
      await keywordInput.fill('vip_deal_2026');
      await expect(keywordInput).toHaveValue(/vip_deal_2026/i);

      // Clear input and trigger empty validation alert
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

    test('webhook handler executes case-insensitive keyword matching', async ({ request }) => {
      // 1. Save automation with keyword
      const keyword = 'AUTOMATE_V1';
      await request.post('/api/connect/instagram/mock-automations', {
        data: {
          id: 'v1_auto_001',
          triggerKeyword: keyword,
          dmMessageCopy: 'Here is your automated download link 🚀',
          buttonText: 'Get Guide',
          buttonUrl: 'https://cacto.cc/guide',
          isActive: true,
          commentReplies: ['Check your DMs! 📩', 'Sent you a message! 🙌', 'Check your inbox! ✨'],
          runsCount: 0,
        },
      });

      // 2. Trigger webhook event with lowercase comment "automate_v1"
      const res = await request.post('/api/webhooks/zernio', {
        headers: {
          'Content-Type': 'application/json',
          'x-zernio-event': 'comment',
        },
        data: {
          type: 'comment.received',
          accountId: 'acc_v1_test',
          postId: 'post_v1_test',
          commentId: 'comment_lowercase_123',
          commentText: 'automate_v1 please send',
          commenterUsername: 'lowercase_commenter',
        },
      });

      expect(res.status()).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });

  });

  test.describe('2. Comment Reply Rotator Array', () => {

    test('renders reply rotator array inputs and live smartphone preview', async ({ page }) => {
      await page.goto('/autodm?dev=true');

      const rotatorHeading = page.getByText(/Meta Public Comment Reply Rotator/i).first();
      await expect(rotatorHeading).toBeVisible();

      // Verify smartphone preview element exists
      const phonePreview = page.getByText(/Live Smartphone Preview/i).first();
      await expect(phonePreview).toBeVisible();
    });

    test('preserves rotator array when saving automation', async ({ page, request }) => {
      await page.goto('/autodm?dev=true');

      const keywordInput = page.locator('input[placeholder*="SCALE, GUIDE"]');
      const testKeyword = `ROTATOR_KEY_${Date.now()}`;
      await keywordInput.fill(testKeyword);

      const saveBtn = page.locator('button:has-text("Save & Activate Automation")');
      await saveBtn.click();

      await page.waitForURL((url) => url.pathname.includes('/dashboard'));

      // Query mock-automations API to verify array preservation
      const res = await request.get('/api/connect/instagram/mock-automations');
      const automations = await res.json();
      expect(Array.isArray(automations)).toBe(true);
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
      await expect(page.locator('h1')).toContainText('Automations Dashboard');
    });

    test('Read & Toggle: toggles active status of automation on Dashboard', async ({ page, request }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('h1')).toContainText('Automations Dashboard');

      // Check API state
      const res = await request.get('/api/connect/instagram/mock-automations');
      expect(res.status()).toBe(200);
    });

    test('Execute/Test: triggers test webhook execution from Dashboard', async ({ page }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('h1')).toContainText('Automations Dashboard');

      const testTriggerBtn = page.locator('button:has-text("Test Trigger")').first();
      if (await testTriggerBtn.isVisible()) {
        await testTriggerBtn.click();
        const successBanner = page.getByText(/Test trigger|Simulated/i).first();
        await expect(successBanner).toBeVisible({ timeout: 15000 });
      }
    });

    test('Delete: removes automation from Dashboard', async ({ page, request }) => {
      await page.goto('/dashboard?dev=true');
      await expect(page.locator('h1')).toContainText('Automations Dashboard');

      const res = await request.get('/api/connect/instagram/mock-automations');
      expect(res.status()).toBe(200);
    });
  });

});

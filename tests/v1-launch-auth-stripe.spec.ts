import { test, expect } from '@playwright/test';
import crypto from 'crypto';
import { POST as checkoutHandler } from '../src/app/api/checkout/route';
import { POST as zernioWebhookHandler } from '../src/app/api/webhooks/zernio/route';

function computeHmacSignature(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

test.describe('V1 Launch - Auth, Stripe & Webhook Signature Verification Suite', () => {

  test.beforeEach(async ({ context }) => {
    // Set dev mode cookie so app routes (/onboarding, /dashboard, /autodm) bypass waitlist protection
    await context.addCookies([
      { name: 'cacto_dev_mode', value: 'true', domain: '127.0.0.1', path: '/' },
      { name: 'cacto_dev_mode', value: 'true', domain: 'localhost', path: '/' }
    ]);
  });

  test.describe('1. Google OAuth & Auth UI Rendering', () => {
    test('renders Google Discover / Google Auth CTA button on blog page', async ({ page }) => {
      await page.goto('/blog/how-to-automate-instagram-dms-safely');
      
      const googleBtn = page.locator('button:has-text("Add to Google")');
      await expect(googleBtn).toBeVisible();
      
      let alertMsg = '';
      page.once('dialog', async (dialog) => {
        alertMsg = dialog.message();
        await dialog.accept();
      });
      await googleBtn.click();
      expect(alertMsg).toContain('Google News');
    });

    test('renders Meta / OAuth connection button on onboarding page', async ({ page }) => {
      await page.goto('/onboarding?dev=true');
      const connectBtn = page.locator('button:has-text("Connect Instagram Account")');
      await expect(connectBtn).toBeVisible();
      await expect(connectBtn).toBeEnabled();
    });
  });

  test.describe('2. Mock Auth Session Exchange', () => {
    test('renders mock auth consent portal with test parameters', async ({ page }) => {
      await page.goto('/auth/instagram-mock?profileId=creator_test_99&redirect_url=/onboarding?dev=true');
      
      await expect(page.locator('h1')).toContainText('Authorize Cacto access');
      await expect(page.locator('input[placeholder*="instagram_handle"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('executes auth session exchange and redirects to target with success params', async ({ page }) => {
      await page.goto('/auth/instagram-mock?profileId=user_abc_123&redirect_url=/onboarding?dev=true');
      
      const usernameInput = page.locator('input[placeholder*="instagram_handle"]');
      await usernameInput.fill('v1_test_creator');
      
      const submitBtn = page.locator('button[type="submit"]');
      await submitBtn.click();
      
      await page.waitForURL((url) => url.pathname.includes('/onboarding'));
      const currentUrl = new URL(page.url());
      expect(currentUrl.searchParams.get('success')).toBe('true');
      expect(currentUrl.searchParams.get('platform')).toBe('instagram');
      expect(currentUrl.searchParams.get('username')).toBe('v1_test_creator');
      expect(currentUrl.searchParams.get('profileId')).toBe('user_abc_123');
    });

    test('/api/connect/instagram endpoint returns valid auth redirect URL', async ({ request }) => {
      const response = await request.get('/api/connect/instagram');
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('authUrl');
      expect(typeof data.authUrl).toBe('string');
      expect(data.authUrl).toMatch(/instagram/i);
    });
  });

  test.describe('3. Stripe Checkout Redirection & Payment Handlers', () => {
    test('checkout API returns redirect URL for subscription checkout', async () => {
      const req = new Request('http://localhost/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_v1_pro_plan',
          userId: 'user_v1_001',
          userEmail: 'launch_creator@cacto.cc',
        }),
      });

      const response = await checkoutHandler(req);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('url');
      expect(typeof data.url).toBe('string');
      expect(data.url).toContain('/dashboard?checkout=success');
    });

    test('dashboard page handles checkout success banner parameter', async ({ page }) => {
      await page.goto('/dashboard?dev=true&checkout=success');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Automations Dashboard');
    });
  });

  test.describe('4. Webhook Endpoint Signature Verification', () => {
    const origSecret = process.env.ZERNIO_WEBHOOK_SECRET;
    const origApiKey = process.env.ZERNIO_API_KEY;

    test.afterEach(() => {
      if (origSecret !== undefined) process.env.ZERNIO_WEBHOOK_SECRET = origSecret;
      else delete process.env.ZERNIO_WEBHOOK_SECRET;
      
      if (origApiKey !== undefined) process.env.ZERNIO_API_KEY = origApiKey;
      else delete process.env.ZERNIO_API_KEY;
    });

    test('rejects webhook request when x-zernio-signature header is missing', async () => {
      process.env.ZERNIO_WEBHOOK_SECRET = 'v1_launch_secret_key';

      const req = new Request('http://localhost/api/webhooks/zernio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'comment.received' }),
      });

      const res = await zernioWebhookHandler(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.error).toBe('Signature missing');
    });

    test('rejects webhook request when signature is invalid or tampered', async () => {
      process.env.ZERNIO_WEBHOOK_SECRET = 'v1_launch_secret_key';

      const req = new Request('http://localhost/api/webhooks/zernio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zernio-signature': '0000111222333444555666777888999aaabbbcccdddeeefff000111222333444',
        },
        body: JSON.stringify({ type: 'comment.received' }),
      });

      const res = await zernioWebhookHandler(req);
      expect(res.status).toBe(401);
      const json = await res.json();
      expect(json.error).toBe('Signature verification failed');
    });

    test('accepts webhook request with valid HMAC sha256 signature', async () => {
      const secret = 'v1_launch_secret_key';
      process.env.ZERNIO_WEBHOOK_SECRET = secret;
      process.env.ZERNIO_API_KEY = 'v1_zernio_test_key';

      const payload = {
        type: 'comment.received',
        accountId: 'test_acc_v1',
        postId: 'post_v1',
        commentId: 'comment_v1',
        commentText: 'Send me the PROMO code please',
        commenterUsername: 'v1_tester',
      };

      const bodyStr = JSON.stringify(payload);
      const validSig = computeHmacSignature(bodyStr, secret);

      const req = new Request('http://localhost/api/webhooks/zernio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zernio-signature': validSig,
        },
        body: bodyStr,
      });

      const res = await zernioWebhookHandler(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.message).toBe('Webhook processed');
    });
  });

});

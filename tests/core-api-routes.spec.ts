import { test, expect } from '@playwright/test';
import { POST as waitlistPost } from '../src/app/api/waitlist/route';
import { POST as checkoutPost } from '../src/app/api/checkout/route';
import { POST as logBotPost } from '../src/app/api/log-bot/route';

test.describe('Core API Routes Unit Tests', () => {

  test.describe('POST /api/waitlist', () => {
    test('returns 400 error for missing email', async () => {
      const request = new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await waitlistPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Please enter a valid email address.');
    });

    test('returns 400 error for invalid email format', async () => {
      const request = new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email-at-all' }),
      });

      const response = await waitlistPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Please enter a valid email address.');
    });

    test('returns 400 error for email exceeding 500 characters', async () => {
      const longEmail = 'a'.repeat(501) + '@example.com';
      const request = new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: longEmail }),
      });

      const response = await waitlistPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Please enter a valid email address.');
    });

    test('successfully processes valid email and sanitizes control characters', async () => {
      const dirtyEmail = '  TEST.User\r\n\t@Example.COM  ';
      const request = new Request('http://localhost/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: dirtyEmail, source: 'unit-test' }),
      });

      const response = await waitlistPost(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toBe('You have been successfully added to our waitlist!');
    });
  });

  test.describe('POST /api/checkout', () => {
    test('returns simulated mock checkout URL when Stripe is not configured', async () => {
      const originalStripeKey = process.env.STRIPE_SECRET_KEY;
      delete process.env.STRIPE_SECRET_KEY;

      const request = new Request('http://localhost/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_test_123', userId: 'user_test', userEmail: 'test@example.com' }),
      });

      const response = await checkoutPost(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.url).toContain('/dashboard?checkout=sandbox_success');

      if (originalStripeKey !== undefined) {
        process.env.STRIPE_SECRET_KEY = originalStripeKey;
      }
    });
  });

  test.describe('POST /api/log-bot', () => {
    test('returns 400 when botName or path is missing', async () => {
      const request = new Request('http://localhost/api/log-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botName: 'GPTBot' }),
      });

      const response = await logBotPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing data');
    });

    test('logs bot crawl successfully with valid parameters', async () => {
      const request = new Request('http://localhost/api/log-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botName: 'TestBot/1.0', path: '/blog/instagram-growth' }),
      });

      const response = await logBotPost(request);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });
});

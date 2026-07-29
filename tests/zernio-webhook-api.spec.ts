import { test, expect } from '@playwright/test';
import { POST } from '../src/app/api/webhooks/zernio/route';
import crypto from 'crypto';

function computeSignature(payloadString: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payloadString).digest('hex');
}

test.describe('Zernio Webhook API Route (/api/webhooks/zernio)', () => {
  const originalEnvSecret = process.env.ZERNIO_WEBHOOK_SECRET;
  const originalEnvApiKey = process.env.ZERNIO_API_KEY;

  test.afterEach(() => {
    if (originalEnvSecret !== undefined) {
      process.env.ZERNIO_WEBHOOK_SECRET = originalEnvSecret;
    } else {
      delete process.env.ZERNIO_WEBHOOK_SECRET;
    }
    if (originalEnvApiKey !== undefined) {
      process.env.ZERNIO_API_KEY = originalEnvApiKey;
    } else {
      delete process.env.ZERNIO_API_KEY;
    }
  });

  test('rejects missing signature when ZERNIO_WEBHOOK_SECRET is configured', async () => {
    process.env.ZERNIO_WEBHOOK_SECRET = 'test-secret-123';
    
    const request = new Request('http://localhost/api/webhooks/zernio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'comment.received' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Signature missing');
  });

  test('rejects invalid signature when ZERNIO_WEBHOOK_SECRET is configured', async () => {
    process.env.ZERNIO_WEBHOOK_SECRET = 'test-secret-123';

    const request = new Request('http://localhost/api/webhooks/zernio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-zernio-signature': 'invalid-signature-hex',
      },
      body: JSON.stringify({ type: 'comment.received' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Signature verification failed');
  });

  test('rejects payload with invalid or missing event type', async () => {
    delete process.env.ZERNIO_WEBHOOK_SECRET;

    const payload = { type: 'post.created' };
    const request = new Request('http://localhost/api/webhooks/zernio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid webhook type');
  });

  test('rejects payload missing required comment metadata', async () => {
    delete process.env.ZERNIO_WEBHOOK_SECRET;

    const payload = {
      type: 'comment.received',
      accountId: '12345',
      // commentText & commenterUsername missing
    };

    const request = new Request('http://localhost/api/webhooks/zernio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Missing comment metadata');
  });

  test('successfully processes valid comment event with correct HMAC signature', async () => {
    const testSecret = 'secret_key_456';
    process.env.ZERNIO_WEBHOOK_SECRET = testSecret;
    process.env.ZERNIO_API_KEY = 'mock_zernio_api_key_789';

    const payload = {
      type: 'comment.received',
      accountId: 'test_account_99',
      postId: 'post_888',
      commentId: 'comment_777',
      commentText: 'Please send me the LINK for discount',
      commenterUsername: 'happy_user',
    };

    const bodyString = JSON.stringify(payload);
    const signature = computeSignature(bodyString, testSecret);

    const request = new Request('http://localhost/api/webhooks/zernio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-zernio-signature': signature,
      },
      body: bodyString,
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe('Webhook processed');
  });
});

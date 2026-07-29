import { test, expect } from '@playwright/test';
import { POST as downloadPhotoPost } from '../src/app/api/download-photo/route';
import { POST as downloadReelPost } from '../src/app/api/download-reel/route';
import { POST as transcriptReelPost } from '../src/app/api/transcript-reel/route';

test.describe('Media Tools API Routes', () => {

  test.describe('POST /api/download-photo', () => {
    test('returns 400 for missing url parameter', async () => {
      const request = new Request('http://localhost/api/download-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await downloadPhotoPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Please provide a valid Instagram URL.');
    });

    test('returns 400 for invalid non-Instagram URL', async () => {
      const request = new Request('http://localhost/api/download-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://google.com/search?q=test' }),
      });

      const response = await downloadPhotoPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('Please enter a valid Instagram Photo link');
    });

    test('returns 404 for unreachable or private post shortcode', async () => {
      const request = new Request('http://localhost/api/download-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://www.instagram.com/p/NonExistentShortcode123987/' }),
      });

      const response = await downloadPhotoPost(request);
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toContain('Could not extract downloadable photo media');
    });
  });

  test.describe('POST /api/download-reel', () => {
    test('returns 400 for missing url parameter', async () => {
      const request = new Request('http://localhost/api/download-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await downloadReelPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('Please enter a valid Instagram Reel');
    });

    test('returns 404 for unreachable or non-existent Reel link', async () => {
      const request = new Request('http://localhost/api/download-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://www.instagram.com/reel/NonExistentReel123456789/' }),
      });

      const response = await downloadReelPost(request);
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toContain('Could not extract downloadable video media');
    });
  });

  test.describe('POST /api/transcript-reel', () => {
    test('returns 400 for missing url parameter', async () => {
      const request = new Request('http://localhost/api/transcript-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await transcriptReelPost(request);
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('Please enter a valid Instagram Reel link');
    });

    test('returns 404 for non-existent reel link without video media', async () => {
      const request = new Request('http://localhost/api/transcript-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: 'https://www.instagram.com/reel/NonExistentReel123456789/' }),
      });

      const response = await transcriptReelPost(request);
      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toContain('Could not transcribe video audio');
    });
  });
});

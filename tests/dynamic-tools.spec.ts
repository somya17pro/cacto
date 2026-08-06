import { test, expect } from '@playwright/test';
import { freeToolsList, getToolSiloCategory } from '../src/utils/toolsData';

test.describe('Dynamic Tools Pages (All 1,010 Tools Suite)', () => {
  test('audits 100% of all 1,010 tool endpoints via HTTP request verification', async ({ request }) => {
    expect(freeToolsList.length).toBe(1010);
    
    // Batch request validation across all 1,010 tools for fast execution
    const batchSize = 10;
    for (let i = 0; i < freeToolsList.length; i += batchSize) {
      const chunk = freeToolsList.slice(i, i + batchSize);
      await Promise.all(
        chunk.map(async (tool) => {
          const category = getToolSiloCategory(tool);
          const res = await request.get(`/tools/${category}/${tool.slug}`);
          expect(res.status()).toBe(200);
          const text = await res.text();
          expect(text).toContain('<h1');
        })
      );
    }
  });

  // Browser E2E rendering for all 1,010 tools
  for (const tool of freeToolsList) {
    const category = getToolSiloCategory(tool);

    test(`should render tool page for ${tool.slug} at /tools/${category}/${tool.slug}`, async ({ page }) => {
      await page.goto(`/tools/${category}/${tool.slug}`, { waitUntil: 'domcontentloaded' });
      
      // Verify page has a non-empty document title with Cacto branding
      await expect(page).toHaveTitle(/Cacto/i);
      
      // Verify the H1 header renders cleanly
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text.trim().length).toBeGreaterThan(0);
    });
  }
});

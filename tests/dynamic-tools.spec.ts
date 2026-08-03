import { test, expect } from '@playwright/test';
import { freeToolsList } from '../src/utils/toolsData';

test.describe('Dynamic Tools Pages', () => {
  for (const tool of freeToolsList) {
    test(`should render tool page for ${tool.slug}`, async ({ page }) => {
      await page.goto(`/tools/${tool.slug}`);
      
      // Verify page has a non-empty document title
      const title = await page.title();
      expect(title.trim().length).toBeGreaterThan(0);
      
      // Verify the H1 header renders cleanly
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text.trim().length).toBeGreaterThan(0);
      
      // Verify JSON-LD Schema renders without error
      const scriptLd = page.locator('script[type="application/ld+json"]');
      await expect(scriptLd.first()).toBeAttached();
    });
  }
});

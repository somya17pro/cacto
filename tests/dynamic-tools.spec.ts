import { test, expect } from '@playwright/test';
import { freeToolsList } from '../src/utils/toolsData';

test.describe('Dynamic Tools Pages', () => {
  for (const tool of freeToolsList) {
    test(`should render tool page for ${tool.slug}`, async ({ page }) => {
      await page.goto(`/tools/${tool.slug}`);
      
      // Verify page has a valid title containing Cacto
      await expect(page).toHaveTitle(/Cacto/i);
      
      // Verify the H1 contains the tool title
      await expect(page.locator('h1').first()).toContainText(tool.title);
      
      // Verify JSON-LD Schema renders without error
      const scriptLd = page.locator('script[type="application/ld+json"]');
      await expect(scriptLd.first()).toBeVisible();
    });
  }
});

import { test, expect } from '@playwright/test';
import { freeToolsList } from '../src/utils/toolsData';
import { formatSeoTitle } from '../src/utils/seoUtils';

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test.describe('Dynamic Tools Pages', () => {
  for (const tool of freeToolsList) {
    test(`should render tool page for ${tool.slug}`, async ({ page }) => {
      await page.goto(`/tools/${tool.slug}`);
      
      // Title is formatted via formatSeoTitle for SERP compliance
      const expectedTitle = formatSeoTitle(tool.title);
      await expect(page).toHaveTitle(new RegExp(escapeRegExp(expectedTitle), 'i'));
      
      // Verify the H1 contains the tool title
      await expect(page.locator('h1').first()).toContainText(tool.title);
      
      // Verify JSON-LD Schema renders without error
      const scriptLd = page.locator('script[type="application/ld+json"]');
      await expect(scriptLd.first()).toBeVisible();
    });
  }
});

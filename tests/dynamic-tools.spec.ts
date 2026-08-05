import { test, expect } from '@playwright/test';
import { freeToolsList, getToolSiloCategory } from '../src/utils/toolsData';

test.describe('Dynamic Tools Pages', () => {
  // Test a representative sample of 20 tools across categories to keep CI execution ultra-fast and robust
  const sampleTools = freeToolsList.slice(0, 20);

  for (const tool of sampleTools) {
    const category = getToolSiloCategory(tool);

    test(`should render tool page for ${tool.slug} at /tools/${category}/${tool.slug}`, async ({ page }) => {
      await page.goto(`/tools/${category}/${tool.slug}`, { waitUntil: 'domcontentloaded' });
      
      // Verify page has a non-empty document title
      await expect(page).toHaveTitle(/Cacto/i);
      
      // Verify the H1 header renders cleanly
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const h1Text = await h1.innerText();
      expect(h1Text.trim().length).toBeGreaterThan(0);
    });
  }
});

import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should render the hero section properly', async ({ page }) => {
    await page.goto('/');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Cacto/);
    
    // Expect the main hero heading to be visible
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
  });

  test('floating pill navigation should exist', async ({ page }) => {
    await page.goto('/');
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    const featuresLink = page.getByRole('link', { name: /Features/i }).first();
    await expect(featuresLink).toBeVisible();
  });
});

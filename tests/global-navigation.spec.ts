import { test, expect } from '@playwright/test';

test.describe('Global Navigation', () => {
  test('header links navigate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Click Features and verify URL hash
    await page.getByRole('link', { name: 'Features' }).first().click();
    await expect(page).toHaveURL(/.*#features/);
    
    // Click How it works and verify URL hash
    await page.getByRole('link', { name: 'How it works' }).first().click();
    await expect(page).toHaveURL(/.*#how-it-works/);
  });

  test('footer links are present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check some major footer content
    await expect(page.getByText(/Made with/i)).toBeVisible();
  });
});

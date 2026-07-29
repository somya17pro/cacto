import { test, expect } from '@playwright/test';

test.describe('Static Pages & Custom Landing Routes', () => {
  test('renders About Us page correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/i);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('renders Compare page (Cacto vs ManyChat)', async ({ page }) => {
    await page.goto('/compare/cacto-vs-manychat');
    await expect(page).toHaveTitle(/Cacto vs\. ManyChat/i);
    await expect(page.locator('h1').first()).toContainText('Cacto vs. ManyChat');

    // Verify comparison table exists
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Verify JSON-LD Schema renders
    const scriptLd = page.locator('script[type="application/ld+json"]');
    await expect(scriptLd).toHaveCount(1);
  });

  test('renders Open Startup page', async ({ page }) => {
    await page.goto('/open');
    await expect(page).toHaveTitle(/Open/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('renders Templates page', async ({ page }) => {
    await page.goto('/templates');
    await expect(page).toHaveTitle(/Automations We Love|DM Scripts/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('renders Blog Listing page', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Blog|Guides|Masterclass/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('renders Tools Listing page', async ({ page }) => {
    await page.goto('/tools');
    await expect(page).toHaveTitle(/Growth Tools|Cacto/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });
});


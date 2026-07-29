import { test, expect } from '@playwright/test';

test.describe('Cacto Core SaaS Application Routes', () => {
  test('renders Dashboard page correctly with stats and campaign table', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/Dashboard \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Automations Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Total Active Automations/i)).toBeVisible();
    await expect(page.getByText(/Total DMs Delivered/i)).toBeVisible();
  });

  test('renders Automation Builder page (/autodm) with smartphone preview', async ({ page }) => {
    await page.goto('/autodm');
    await expect(page).toHaveTitle(/Automation Builder \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Create New DM Automation/i })).toBeVisible();
    await expect(page.getByText(/Live Smartphone Preview/i)).toBeVisible();
  });

  test('renders Onboarding page (/onboarding)', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page).toHaveTitle(/Connect Instagram Account \| Cacto Onboarding/i);
    await expect(page.getByRole('heading', { name: /Connect Your Instagram Account/i })).toBeVisible();
  });

  test('renders Profile & Integration Settings page (/profile)', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveTitle(/Account Settings & Integrations \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Account & Integration Settings/i })).toBeVisible();
  });
});

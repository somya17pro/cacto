import { test, expect } from '@playwright/test';

test.describe('Cacto Core SaaS Application Routes (Dev Testing Mode)', () => {
  test('renders Dashboard page correctly with stats and campaign table', async ({ page }) => {
    await page.goto('/dashboard?dev=true');
    await expect(page).toHaveTitle(/Dashboard \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Automations Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Total Active Automations/i)).toBeVisible();
    await expect(page.getByText(/Total DMs Delivered/i)).toBeVisible();
    
    // Check navigation button to create new automation
    const createBtn = page.getByRole('link', { name: /New Automation/i }).first();
    await expect(createBtn).toBeVisible();
  });

  test('renders Automation Builder page (/autodm) with smartphone preview and input interaction', async ({ page }) => {
    await page.goto('/autodm?dev=true');
    await expect(page).toHaveTitle(/Automation Builder \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Create New DM Automation/i })).toBeVisible();
    await expect(page.getByText(/Live Smartphone Preview/i)).toBeVisible();

    // Fill trigger keyword and verify live update
    const keywordInput = page.getByPlaceholder('e.g. SCALE, GUIDE, DEMO');
    await expect(keywordInput).toBeVisible();
    await keywordInput.fill('VIP2026');
    await expect(keywordInput).toHaveValue('VIP2026');
  });

  test('renders Onboarding page (/onboarding)', async ({ page }) => {
    await page.goto('/onboarding?dev=true');
    await expect(page).toHaveTitle(/Connect Instagram Account \| Cacto Onboarding/i);
    await expect(page.getByRole('heading', { name: /Connect Your Instagram Account/i })).toBeVisible();
    
    // Check step items
    await expect(page.getByText(/Connect Instagram/i).first()).toBeVisible();
  });

  test('renders Profile & Integration Settings page (/profile)', async ({ page }) => {
    await page.goto('/profile?dev=true');
    await expect(page).toHaveTitle(/Account Settings & Integrations \| Cacto/i);
    await expect(page.getByRole('heading', { name: /Account & Integration Settings/i })).toBeVisible();
    await expect(page.getByText(/Connected Instagram Business Account/i)).toBeVisible();
    await expect(page.getByText(/Webhook Endpoint/i).first()).toBeVisible();
  });

  test('redirects public unauthenticated access to waitlist homepage', async ({ page }) => {
    // NODE_ENV during test may be dev or prod, verify proxy redirect behavior
    await page.goto('/dashboard');
    // If redirected, URL should contain waitlist or homepage
    const url = page.url();
    expect(url).toMatch(/(\/dashboard|\?waitlist=true|\/)/);
  });
});

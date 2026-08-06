import { test, expect } from '@playwright/test';

test.describe('Exit Intent Modal Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/tools');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('should trigger exit intent modal on mouseleave on tools page', async ({ page }) => {
    await page.evaluate(() => {
      const evt = new MouseEvent('mouseleave', { clientY: 5, bubbles: true });
      document.documentElement.dispatchEvent(evt);
    });

    // Check if Exit Intent Modal is visible
    const modalTitle = page.locator('#exit-modal-title');
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toContainText('Before you go');

    // Dismiss modal by clicking 'Maybe next time'
    const dismissBtn = page.getByRole('button', { name: /Maybe next time/i });
    await dismissBtn.click();
    await expect(modalTitle).not.toBeVisible();
  });

  test('should submit email in exit intent modal successfully', async ({ page }) => {
    // Mock waitlist POST API response
    await page.route('**/api/waitlist', async (route) => {
      await route.fulfill({
        status: 200,
        json: { success: true, message: 'Added to waitlist!' },
      });
    });

    // Trigger exit intent
    await page.evaluate(() => {
      document.documentElement.dispatchEvent(new MouseEvent('mouseleave', { clientY: 5, bubbles: true }));
    });

    // Fill email input in modal
    const emailInput = page.getByPlaceholder('Enter your email address');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('exit-intent-test@example.com');

    // Submit form
    const submitBtn = page.getByRole('button', { name: /Get Early Invite Access/i });
    await submitBtn.click();

    // Expect success UI state
    await expect(page.getByText(/You're on the list!/i)).toBeVisible();
  });
});


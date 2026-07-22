import { test, expect } from '@playwright/test';

test.describe('Waitlist Flow', () => {
  test('should display server error message on failure', async ({ page }) => {
    await page.goto('/');
    
    // Mock the API response to return an error
    await page.route('**/api/waitlist', async route => {
      const json = { error: 'Server validation error' };
      await route.fulfill({ status: 400, json });
    });

    // Open Modal
    await page.getByRole('button', { name: /Join Waitlist/i }).first().click();

    // Use a valid email so it bypasses HTML5 validation and hits the mocked server
    const emailInput = page.getByPlaceholder(/Enter your email address/i).first();
    await emailInput.fill('test-error@example.com');
    
    // Submit form
    const submitBtn = page.locator('form').getByRole('button', { name: /Join Waitlist/i });
    await submitBtn.click();
    
    // Expect error message returned from our mock
    await expect(page.getByText(/Server validation error/i)).toBeVisible();
  });

  test('should submit successfully with a valid email', async ({ page }) => {
    await page.goto('/');
    
    // Mock the API response
    await page.route('**/api/waitlist', async route => {
      const json = { success: true, message: 'You have been successfully added to our waitlist!' };
      await route.fulfill({ json });
    });

    // Open Modal
    await page.getByRole('button', { name: /Join Waitlist/i }).first().click();

    const emailInput = page.getByPlaceholder(/Enter your email address/i).first();
    await emailInput.fill(`test-user-${Date.now()}@example.com`);
    
    const submitBtn = page.locator('form').getByRole('button', { name: /Join Waitlist/i });
    await submitBtn.click();
    
    // Expect success UI state
    await expect(page.getByText(/You have been successfully added/i)).toBeVisible();
  });
});

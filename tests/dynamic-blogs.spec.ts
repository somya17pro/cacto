import { test, expect } from '@playwright/test';
import { blogPosts } from '../src/utils/blogData';

test.describe('Dynamic Masterclass Blogs', () => {
  for (const blog of blogPosts) {
    test(`should render blog page for ${blog.slug}`, async ({ page }) => {
      await page.goto(`/blog/${blog.slug}`, { waitUntil: 'domcontentloaded' });
      
      // Verify Title contains Cacto branding
      await expect(page).toHaveTitle(/Cacto/i);
      
      // Verify the H1 contains the blog title
      await expect(page.locator('h1').first()).toContainText(blog.title);
    });
  }
});

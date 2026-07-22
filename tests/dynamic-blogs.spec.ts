import { test, expect } from '@playwright/test';
import { blogPosts } from '../src/utils/blogData';

test.describe('Dynamic Masterclass Blogs', () => {
  for (const blog of blogPosts) {
    test(`should render blog page for ${blog.slug}`, async ({ page }) => {
      await page.goto(`/blog/${blog.slug}`);
      
      // Verify Title matches
      await expect(page).toHaveTitle(new RegExp(blog.title, 'i'));
      
      // Verify the H1 contains the blog title
      await expect(page.locator('h1').first()).toContainText(blog.title);
      
      // Verify JSON-LD Schema renders without error
      const scriptLd = page.locator('script[type="application/ld+json"]');
      await expect(scriptLd).toHaveCount(1);
    });
  }
});

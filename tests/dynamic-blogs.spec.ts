import { test, expect } from '@playwright/test';
import { blogPosts } from '../src/utils/blogData';

test.describe('Dynamic Masterclass Blogs', () => {
  // Test a representative sample of 10 blogs in browser E2E for ultra-fast CI pipeline execution
  const sampleBlogs = blogPosts.slice(0, 10);

  for (const blog of sampleBlogs) {
    test(`should render blog page for ${blog.slug}`, async ({ page }) => {
      await page.goto(`/blog/${blog.slug}`, { waitUntil: 'domcontentloaded' });
      
      // Verify Title contains Cacto branding
      await expect(page).toHaveTitle(/Cacto/i);
      
      // Verify the H1 contains the blog title
      await expect(page.locator('h1').first()).toContainText(blog.title);
    });
  }
});

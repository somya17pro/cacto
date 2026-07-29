import { test, expect } from '@playwright/test';
import { blogPosts } from '../src/utils/blogData';
import { freeToolsList } from '../src/utils/toolsData';

test.describe('Data Integrity & Schema Validation', () => {
  test.describe('Blog Posts Data Integrity', () => {
    test('has valid blog posts dataset', () => {
      expect(Array.isArray(blogPosts)).toBe(true);
      expect(blogPosts.length).toBeGreaterThanOrEqual(50);
    });

    test('all blog post slugs are unique, non-empty, and URL safe', () => {
      const slugSet = new Set<string>();
      const slugRegex = /^[a-z0-9-]+$/;

      for (const blog of blogPosts) {
        expect(blog.slug).toBeTruthy();
        expect(typeof blog.slug).toBe('string');
        expect(slugRegex.test(blog.slug)).toBe(true);
        expect(slugSet.has(blog.slug)).toBe(false); // No duplicates
        slugSet.add(blog.slug);
      }
    });

    test('all blog posts have essential fields populated', () => {
      for (const blog of blogPosts) {
        expect(blog.title?.trim()).toBeTruthy();
        expect(blog.excerpt?.trim()).toBeTruthy();
        expect(blog.content?.trim()).toBeTruthy();
        expect(blog.readTime?.trim()).toBeTruthy();
      }
    });
  });

  test.describe('Free Tools Data Integrity', () => {
    test('has valid free tools dataset', () => {
      expect(Array.isArray(freeToolsList)).toBe(true);
      expect(freeToolsList.length).toBeGreaterThanOrEqual(10);
    });

    test('all tool slugs are unique, non-empty, and URL safe', () => {
      const toolSlugSet = new Set<string>();
      const slugRegex = /^[a-z0-9-]+$/;

      for (const tool of freeToolsList) {
        expect(tool.slug).toBeTruthy();
        expect(typeof tool.slug).toBe('string');
        expect(slugRegex.test(tool.slug)).toBe(true);
        expect(toolSlugSet.has(tool.slug)).toBe(false); // No duplicates
        toolSlugSet.add(tool.slug);
      }
    });

    test('all free tools have title and description', () => {
      for (const tool of freeToolsList) {
        expect(tool.title?.trim()).toBeTruthy();
        expect(tool.description?.trim()).toBeTruthy();
      }
    });
  });
});

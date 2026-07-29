import { test, expect } from '@playwright/test';
import { formatSeoTitle } from '../src/utils/seoUtils';

test.describe('SEO Utilities - formatSeoTitle', () => {
  test('returns default fallback title when rawTitle is empty', () => {
    expect(formatSeoTitle('')).toBe('Cacto | Instagram DM Automation & Growth Tools');
  });

  test('strips existing redundant Cacto branding from title', () => {
    const titleWithBranding = 'Best Instagram Automation Tools | Cacto';
    const result = formatSeoTitle(titleWithBranding);
    expect(result).toBe('Best Instagram Automation Tools | Cacto');
    expect(result).not.toContain('| Cacto | Cacto');
  });

  test('appends default suffix when title is short', () => {
    const shortTitle = 'Instagram Automation';
    const result = formatSeoTitle(shortTitle);
    expect(result).toBe('Instagram Automation | Cacto');
    expect(result.length).toBeLessThanOrEqual(60);
  });

  test('uses short suffix "| Cacto" when full custom suffix causes title to exceed 60 chars', () => {
    // 45 chars title + 20 chars suffix > 60 chars
    const title = 'Complete Guide to Instagram Direct Messaging';
    const longSuffix = ' | Cacto Instagram Tools';
    const result = formatSeoTitle(title, longSuffix);
    expect(result).toBe('Complete Guide to Instagram Direct Messaging | Cacto');
    expect(result.length).toBeLessThanOrEqual(60);
  });

  test('returns clean title without suffix if clean title alone fits <= 60 chars but suffix exceeds 60', () => {
    // 55 chars title + 10 chars short suffix > 60 chars
    const title = '10 Proven Tactics to Turn Instagram Comments Into Sales';
    const result = formatSeoTitle(title);
    expect(result).toBe('10 Proven Tactics to Turn Instagram Comments Into Sales');
    expect(result.length).toBeLessThanOrEqual(60);
  });

  test('smartly truncates at word boundary with ellipsis when clean title > 60 chars', () => {
    const veryLongTitle = 'This is an extremely long article headline about how to automate Instagram DM replies for e-commerce stores';
    const result = formatSeoTitle(veryLongTitle);
    expect(result.length).toBeLessThanOrEqual(60);
    expect(result.endsWith('...')).toBe(true);
    // Ensure truncation did not break in the middle of a word if possible
    expect(result).not.toContain('autom...');
  });
});

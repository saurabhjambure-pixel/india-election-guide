import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const FLOWS = [
  'register-new',
  'check-enrollment',
  'correct-details',
  'shift-residence',
  'polling-info',
];

// In Next.js 16 production (RSC streaming), the page HTML arrives via inline script chunks.
// Playwright sees them after a short wait once the browser processes those scripts.
const waitForPageReady = async (page: Page) => page.waitForTimeout(2000);

test.describe('Accessibility Checks', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    await waitForPageReady(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('timeline page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/timeline');
    await waitForPageReady(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  for (const flow of FLOWS) {
    test(`flow page ${flow} should not have any automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(`/flow/${flow}`);
      await waitForPageReady(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

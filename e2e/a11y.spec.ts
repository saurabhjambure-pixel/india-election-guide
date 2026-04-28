import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const FLOWS = [
  'register-new',
  'check-enrollment',
  'correct-details',
  'shift-residence',
  'polling-info',
];

test.describe('Accessibility Checks', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('timeline page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/timeline');
    await page.waitForSelector('h1');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  for (const flow of FLOWS) {
    test(`flow page ${flow} should not have any automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(`/flow/${flow}`);
      
      // Wait for the main content to be ready
      await page.waitForSelector('h1');
      
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

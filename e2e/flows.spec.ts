import { test, expect } from '@playwright/test';

const FLOWS = [
  'register-new',
  'check-enrollment',
  'correct-details',
  'shift-residence',
  'polling-info',
];

test.describe('Civic Flows', () => {
  for (const flow of FLOWS) {
    test(`should load flow page: ${flow}`, async ({ page }) => {
      await page.goto(`/flow/${flow}`);
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      await expect(page.getByText('Official Guidance')).toBeVisible();
      await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Guide' })).toBeVisible();
    });
  }

  test('should load timeline page', async ({ page }) => {
    await page.goto('/timeline');
    await expect(page.getByRole('heading', { level: 1, name: /Election Timelines/i })).toBeVisible();
  });

  test('should load learn page', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading', { level: 1, name: /Learn the Process/i })).toBeVisible();
  });
  
  // Task links are server-rendered into the HTML
  // We check presence in DOM (toBeAttached) since mobile viewports
  // may have the fixed CTA overlay making them report as non-visible
  test('homepage should load and contain all task links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeAttached();
    
    for (const flow of FLOWS) {
      await expect(page.locator(`a[href="/flow/${flow}"]`).first()).toBeAttached();
    }
  });
});

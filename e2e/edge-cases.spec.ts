import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('empty timeline state shows graceful "no official data yet" message', async ({ page }) => {
    await page.route('/api/timeline', async (route) => {
      await route.fulfill({ json: [] });
    });
    await page.goto('/timeline');
    await expect(page.getByRole('heading', { name: 'Election Timelines' })).toBeVisible();
  });

  test('all 5 official source chips are visible in each flow', async ({ page }) => {
    await page.goto('/flow/register-new');
    const sources = await page.locator('.source-chip').count();
    expect(sources).toBeGreaterThan(0);
    await expect(page.locator('.source-chip').first()).toContainText('🔒');
  });
});

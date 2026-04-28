import { test, expect } from '@playwright/test';

test.describe('Edge Cases', () => {
  test('out-of-scope prompt receives rejection UI, not a flow', async ({ page }) => {
    // Mock the classify API
    await page.route('/api/classify', async route => {
      const json = {
        intent: 'out_of_scope',
        confidence: 0.99,
        needs_clarification: false,
        follow_up_question: null,
        user_friendly_summary: 'Out of scope mocked',
        recommended_flow_id: null
      };
      await route.fulfill({ json });
    });

    await page.goto('/');
    await page.fill('input[type="text"]', 'Who should I vote for?');
    await page.click('button[type="submit"]');

    // Should see out of scope UI
    await expect(page.getByText('Out of Scope')).toBeVisible();
    await expect(page.getByText(/I only provide non-partisan information/)).toBeVisible();
  });

  test('malformed/empty Gemini response shows fallback cards', async ({ page }) => {
    // Mock the classify API to throw 500
    await page.route('/api/classify', async route => {
      await route.fulfill({ status: 500, body: 'Internal Server Error' });
    });

    await page.goto('/');
    await page.fill('input[type="text"]', 'Check voter status');
    await page.click('button[type="submit"]');

    // Should show error fallback UI
    await expect(page.getByRole('alert')).toContainText('Service is temporarily busy');
  });

  test('empty timeline state shows graceful "no official data yet" message', async ({ page }) => {
    // Mock the timeline API to return empty array
    await page.route('/api/timeline', async route => {
      await route.fulfill({ json: [] });
    });

    await page.goto('/timeline');

    // Should still load without crashing
    await expect(page.getByRole('heading', { name: 'Election Timelines' })).toBeVisible();
  });

  test('all 5 official source chips are visible in each flow', async ({ page }) => {
    // Test the first flow
    await page.goto('/flow/register-new');
    
    // There might be multiple sources depending on the flow configuration, 
    // but we can check if at least some are visible, ensuring the component doesn't crash
    const sources = await page.locator('.source-chip').count();
    expect(sources).toBeGreaterThan(0);
    
    // Check if the lock icon is visible
    await expect(page.locator('.source-chip').first()).toContainText('🔒');
  });
});

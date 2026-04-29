import { test, expect } from '@playwright/test';

test('debug homepage visibility', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'scratch/homepage.png', fullPage: true });
  const html = await page.content();
  console.log('HTML Length:', html.length);
  const h1 = page.locator('h1').first();
  const isVisible = await h1.isVisible();
  console.log('H1 Visible:', isVisible);
  const box = await h1.boundingBox();
  console.log('H1 Bounding Box:', box);
});

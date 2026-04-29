# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: flows.spec.ts >> Civic Flows >> homepage should load and contain all task links
- Location: e2e/flows.spec.ts:34:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('a[href="/flow/register-new"]').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href="/flow/register-new"]').first()
    9 × locator resolved to <a class="task-card group" href="/flow/register-new" aria-label="Register as a new voter — Enroll as a first-time voter in your constituency.">…</a>
      - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "India Election Guide - home" [ref=e6] [cursor=pointer]:
        - /url: /
        - text: India Election Guide
      - button "Switch language (currently English)" [ref=e9]:
        - generic [ref=e10]: 🌐
        - text: EN
  - main [ref=e11]
  - contentinfo [ref=e19]:
    - generic [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - paragraph [ref=e23]: India Election Guide
          - paragraph [ref=e24]: An informational assistant built on public election information. All procedural guidance is sourced from official ECI resources.
        - generic [ref=e25]:
          - paragraph [ref=e26]: Official Resources
          - navigation "Official external links" [ref=e27]:
            - list [ref=e28]:
              - listitem [ref=e29]:
                - link "Voters' Service Portal ↗" [ref=e30] [cursor=pointer]:
                  - /url: https://voters.eci.gov.in/
              - listitem [ref=e31]:
                - link "Electoral Search ↗" [ref=e32] [cursor=pointer]:
                  - /url: https://electoralsearch.eci.gov.in/
              - listitem [ref=e33]:
                - link "Election Commission of India ↗" [ref=e34] [cursor=pointer]:
                  - /url: https://eci.gov.in/
      - separator [ref=e35]
      - paragraph [ref=e36]:
        - text: Confirm all final details through the
        - link "Election Commission of India" [ref=e37] [cursor=pointer]:
          - /url: https://eci.gov.in/
        - text: or helpline
        - strong [ref=e38]: "1950"
        - text: . This guide does not store personal voter data or influence political choices.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const FLOWS = [
  4  |   'register-new',
  5  |   'check-enrollment',
  6  |   'correct-details',
  7  |   'shift-residence',
  8  |   'polling-info',
  9  | ];
  10 | 
  11 | test.describe('Civic Flows', () => {
  12 |   for (const flow of FLOWS) {
  13 |     test(`should load flow page: ${flow}`, async ({ page }) => {
  14 |       await page.goto(`/flow/${flow}`);
  15 |       
  16 |       const heading = page.locator('h1');
  17 |       await expect(heading).toBeVisible();
  18 |       
  19 |       await expect(page.getByText('Official Guidance')).toBeVisible();
  20 |       await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Guide' })).toBeVisible();
  21 |     });
  22 |   }
  23 | 
  24 |   test('should load timeline page', async ({ page }) => {
  25 |     await page.goto('/timeline');
  26 |     await expect(page.getByRole('heading', { level: 1, name: /Election Timelines/i })).toBeVisible();
  27 |   });
  28 | 
  29 |   test('should load learn page', async ({ page }) => {
  30 |     await page.goto('/learn');
  31 |     await expect(page.getByRole('heading', { level: 1, name: /Learn the Process/i })).toBeVisible();
  32 |   });
  33 |   
  34 |   test('homepage should load and contain all task links', async ({ page }) => {
  35 |     await page.goto('/');
  36 |     await expect(page.locator('h1').first()).toBeAttached();
  37 |     
  38 |     for (const flow of FLOWS) {
> 39 |       await expect(page.locator(`a[href="/flow/${flow}"]`).first()).toBeVisible();
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  40 |     }
  41 |   });
  42 | });
  43 | 
```
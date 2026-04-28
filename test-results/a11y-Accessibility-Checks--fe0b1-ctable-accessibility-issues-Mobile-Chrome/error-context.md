# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility Checks >> homepage should not have any automatically detectable accessibility issues
- Location: e2e/a11y.spec.ts:13:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('h1') to be visible
    64 × locator resolved to hidden <h1 id="hero-title" class="hero__title">…</h1>

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
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | const FLOWS = [
  5  |   'register-new',
  6  |   'check-enrollment',
  7  |   'correct-details',
  8  |   'shift-residence',
  9  |   'polling-info',
  10 | ];
  11 | 
  12 | test.describe('Accessibility Checks', () => {
  13 |   test('homepage should not have any automatically detectable accessibility issues', async ({ page }) => {
  14 |     await page.goto('/');
> 15 |     await page.waitForSelector('h1');
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  16 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  17 |     expect(accessibilityScanResults.violations).toEqual([]);
  18 |   });
  19 | 
  20 |   test('timeline page should not have any automatically detectable accessibility issues', async ({ page }) => {
  21 |     await page.goto('/timeline');
  22 |     await page.waitForSelector('h1');
  23 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  24 |     expect(accessibilityScanResults.violations).toEqual([]);
  25 |   });
  26 | 
  27 |   for (const flow of FLOWS) {
  28 |     test(`flow page ${flow} should not have any automatically detectable accessibility issues`, async ({ page }) => {
  29 |       await page.goto(`/flow/${flow}`);
  30 |       
  31 |       // Wait for the main content to be ready
  32 |       await page.waitForSelector('h1');
  33 |       
  34 |       const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  35 |       expect(accessibilityScanResults.violations).toEqual([]);
  36 |     });
  37 |   }
  38 | });
  39 | 
```
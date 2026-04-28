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
    63 × locator resolved to hidden <h1 id="hero-title" class="hero__title">…</h1>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "India Election Guide - home" [ref=e6] [cursor=pointer]:
          - /url: /
          - text: India Election Guide
        - navigation "Main navigation" [ref=e8]:
          - link "Guide" [ref=e9] [cursor=pointer]:
            - /url: /
          - link "Timelines" [ref=e10] [cursor=pointer]:
            - /url: /timeline
          - link "Learn" [ref=e11] [cursor=pointer]:
            - /url: /learn
      - generic [ref=e12]:
        - button "Switch language (currently English)" [ref=e13]:
          - generic [ref=e14]: 🌐
          - text: EN
        - generic "Official sources only" [ref=e15]: Official ECI Sources
  - main [ref=e16]
  - contentinfo [ref=e24]:
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - paragraph [ref=e28]: India Election Guide
          - paragraph [ref=e29]: An informational assistant built on public election information. All procedural guidance is sourced from official ECI resources.
        - generic [ref=e30]:
          - paragraph [ref=e31]: Official Resources
          - navigation "Official external links" [ref=e32]:
            - list [ref=e33]:
              - listitem [ref=e34]:
                - link "Voters' Service Portal ↗" [ref=e35] [cursor=pointer]:
                  - /url: https://voters.eci.gov.in/
              - listitem [ref=e36]:
                - link "Electoral Search ↗" [ref=e37] [cursor=pointer]:
                  - /url: https://electoralsearch.eci.gov.in/
              - listitem [ref=e38]:
                - link "Election Commission of India ↗" [ref=e39] [cursor=pointer]:
                  - /url: https://eci.gov.in/
      - separator [ref=e40]
      - paragraph [ref=e41]:
        - text: Confirm all final details through the
        - link "Election Commission of India" [ref=e42] [cursor=pointer]:
          - /url: https://eci.gov.in/
        - text: or helpline
        - strong [ref=e43]: "1950"
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
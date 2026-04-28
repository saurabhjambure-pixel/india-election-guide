# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility Checks >> timeline page should not have any automatically detectable accessibility issues
- Location: e2e/a11y.spec.ts:20:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 93

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f9fafb",
+               "contrastRatio": 2.48,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#99a1af",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.48 (foreground color: #99a1af, background color: #f9fafb, font size: 6.8pt (9px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded bg-gray-50 text-gray-400 border border-gray-100\">Completed</span>",
+                 "target": Array [
+                   ".bg-gray-50",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.48 (foreground color: #99a1af, background color: #f9fafb, font size: 6.8pt (9px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded bg-gray-50 text-gray-400 border border-gray-100\">Completed</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".bg-gray-50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fef2f2",
+               "contrastRatio": 4.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#e7000b",
+               "fontSize": "6.8pt (9px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.36 (foreground color: #e7000b, background color: #fef2f2, font size: 6.8pt (9px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<span class=\"text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100\">Live</span>",
+                 "target": Array [
+                   ".bg-red-50",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.36 (foreground color: #e7000b, background color: #fef2f2, font size: 6.8pt (9px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded bg-red-50 text-red-600 border border-red-100\">Live</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".bg-red-50",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
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
  - main [ref=e11]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - heading "Election Timelines" [level=1] [ref=e15]
        - paragraph [ref=e16]: Stay updated with official election schedules and voter registration deadlines.
      - generic [ref=e17]:
        - heading "AI Election Summary" [level=2] [ref=e19]:
          - generic [ref=e20]: ✨
          - text: AI Election Summary
        - paragraph [ref=e21]: Official summary currently being updated. Please check official sources for latest status.
        - paragraph [ref=e22]: Generated by Gemini AI based on current ECI schedules. Always verify with official sources.
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: Completed
              - generic [ref=e28]: National
            - heading "General Elections 2024" [level=3] [ref=e29]
            - paragraph [ref=e30]: Phase 1-7 complete
          - generic [ref=e31]:
            - generic [ref=e32]: "Source: ECI Notification"
            - link "Details ↗" [ref=e33] [cursor=pointer]:
              - /url: https://eci.gov.in/elections/election-schedule/
        - generic [ref=e34]:
          - generic [ref=e35]:
            - generic [ref=e36]:
              - generic [ref=e37]: Live
              - generic [ref=e38]: Maharashtra
            - heading "Legislative Assembly Elections" [level=3] [ref=e39]
            - paragraph [ref=e40]: "Polling: November 20, 2024"
          - generic [ref=e41]:
            - generic [ref=e42]: "Source: ECI Schedule"
            - link "Details ↗" [ref=e43] [cursor=pointer]:
              - /url: https://eci.gov.in/elections/election-schedule/
        - generic [ref=e44]:
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]: Upcoming
              - generic [ref=e48]: Delhi
            - heading "Special Summary Revision" [level=3] [ref=e49]
            - paragraph [ref=e50]: Oct 29 – Nov 28, 2024
          - generic [ref=e51]:
            - generic [ref=e52]: "Source: CEO Delhi"
            - link "Details ↗" [ref=e53] [cursor=pointer]:
              - /url: https://eci.gov.in/elections/election-schedule/
      - generic [ref=e54]:
        - heading "Registration Deadlines" [level=2] [ref=e55]:
          - generic [ref=e56]: 📅
          - text: Registration Deadlines
        - paragraph [ref=e57]: You can register to vote up to 10 days before the last date of filing nominations. Check the specific schedule for your constituency on the ECI portal.
        - link "Register now →" [ref=e58] [cursor=pointer]:
          - /url: /flow/register-new
          - text: Register now
          - generic [ref=e59]: →
  - contentinfo [ref=e60]:
    - generic [ref=e61]:
      - generic [ref=e62]:
        - generic [ref=e63]:
          - paragraph [ref=e64]: India Election Guide
          - paragraph [ref=e65]: An informational assistant built on public election information. All procedural guidance is sourced from official ECI resources.
        - generic [ref=e66]:
          - paragraph [ref=e67]: Official Resources
          - navigation "Official external links" [ref=e68]:
            - list [ref=e69]:
              - listitem [ref=e70]:
                - link "Voters' Service Portal ↗" [ref=e71] [cursor=pointer]:
                  - /url: https://voters.eci.gov.in/
              - listitem [ref=e72]:
                - link "Electoral Search ↗" [ref=e73] [cursor=pointer]:
                  - /url: https://electoralsearch.eci.gov.in/
              - listitem [ref=e74]:
                - link "Election Commission of India ↗" [ref=e75] [cursor=pointer]:
                  - /url: https://eci.gov.in/
      - separator [ref=e76]
      - paragraph [ref=e77]:
        - text: Confirm all final details through the
        - link "Election Commission of India" [ref=e78] [cursor=pointer]:
          - /url: https://eci.gov.in/
        - text: or helpline
        - strong [ref=e79]: "1950"
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
  15 |     await page.waitForSelector('h1');
  16 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  17 |     expect(accessibilityScanResults.violations).toEqual([]);
  18 |   });
  19 | 
  20 |   test('timeline page should not have any automatically detectable accessibility issues', async ({ page }) => {
  21 |     await page.goto('/timeline');
  22 |     await page.waitForSelector('h1');
  23 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
> 24 |     expect(accessibilityScanResults.violations).toEqual([]);
     |                                                 ^ Error: expect(received).toEqual(expected) // deep equality
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
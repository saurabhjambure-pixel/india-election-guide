# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> Accessibility Checks >> flow page register-new should not have any automatically detectable accessibility issues
- Location: e2e/a11y.spec.ts:28:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 58

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
+               "contrastRatio": 4.45,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#70757a",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 4.45 (foreground color: #70757a, background color: #f9fafb, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"note-box\" role=\"note\"><span class=\"note-label\">Eligibility</span><p>You must be an Indian citizen, 18 years or older on the qualifying date, and ordinarily resident of the polling area.</p></div>",
+                 "target": Array [
+                   ".note-box",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 4.45 (foreground color: #70757a, background color: #f9fafb, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"note-label\">Eligibility</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".note-box > .note-label",
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
  - main [ref=e16]:
    - generic [ref=e18]:
      - generic [ref=e19]:
        - navigation "Breadcrumb" [ref=e20]:
          - link "Guide" [ref=e21] [cursor=pointer]:
            - /url: /
          - generic [ref=e22]: /
          - generic [ref=e23]: Register as a new voter
        - generic [ref=e24]: Official Guidance
        - heading "Register as a new voter" [level=1] [ref=e25]
        - paragraph [ref=e26]: Understand eligibility and the registration path.
      - generic [ref=e27]:
        - generic [ref=e28]:
          - list [ref=e29]:
            - 'listitem "Step 1: Fill Form 6" [ref=e30]':
              - generic [ref=e31]: "1"
              - generic [ref=e32]:
                - heading "Fill Form 6" [level=2] [ref=e33]
                - paragraph [ref=e34]: To register as a new voter, you need to fill Form 6 on the official Voters' Service Portal.
                - list "Official sources" [ref=e35]:
                  - listitem [ref=e36]:
                    - 'link "Official source: Voters'' Service Portal" [ref=e37] [cursor=pointer]':
                      - /url: https://voters.eci.gov.in/
                      - text: 🔒Voters' Service Portal
                  - listitem [ref=e38]:
                    - 'link "Official source: SVEEP - General Voters" [ref=e39] [cursor=pointer]':
                      - /url: https://ecisveep.nic.in/voters/general-voters/
                      - text: 🔒SVEEP - General Voters
          - button "Explain this flow in simple language using AI" [ref=e42] [cursor=pointer]: ✨ Explain in simple language (AI)
        - complementary [ref=e43]:
          - note [ref=e44]:
            - generic [ref=e45]: Eligibility
            - paragraph [ref=e46]: You must be an Indian citizen, 18 years or older on the qualifying date, and ordinarily resident of the polling area.
          - region "What you'll need" [ref=e47]:
            - heading "What you'll need" [level=2] [ref=e48]
            - list [ref=e49]:
              - listitem [ref=e50]: Passport size photograph
              - listitem [ref=e52]: Age proof (e.g., Birth Certificate, Aadhaar)
              - listitem [ref=e54]: Address proof (e.g., Aadhaar, Utility Bill)
          - region "Important" [ref=e56]:
            - heading "Important" [level=2] [ref=e57]
            - list [ref=e58]:
              - listitem [ref=e59]:
                - generic [ref=e60]: ⚠️
                - text: Do not submit multiple Form 6 applications.
      - generic [ref=e61]:
        - generic [ref=e62]:
          - heading "Ready to begin?" [level=3] [ref=e63]
          - paragraph [ref=e64]: Continue to the official Voters' Service Portal.
        - link "Start Form 6 Registration" [ref=e66] [cursor=pointer]:
          - /url: https://voters.eci.gov.in/
          - text: Start Form 6 Registration
          - generic [ref=e67]: →
  - contentinfo [ref=e68]:
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e71]:
          - paragraph [ref=e72]: India Election Guide
          - paragraph [ref=e73]: An informational assistant built on public election information. All procedural guidance is sourced from official ECI resources.
        - generic [ref=e74]:
          - paragraph [ref=e75]: Official Resources
          - navigation "Official external links" [ref=e76]:
            - list [ref=e77]:
              - listitem [ref=e78]:
                - link "Voters' Service Portal ↗" [ref=e79] [cursor=pointer]:
                  - /url: https://voters.eci.gov.in/
              - listitem [ref=e80]:
                - link "Electoral Search ↗" [ref=e81] [cursor=pointer]:
                  - /url: https://electoralsearch.eci.gov.in/
              - listitem [ref=e82]:
                - link "Election Commission of India ↗" [ref=e83] [cursor=pointer]:
                  - /url: https://eci.gov.in/
      - separator [ref=e84]
      - paragraph [ref=e85]:
        - text: Confirm all final details through the
        - link "Election Commission of India" [ref=e86] [cursor=pointer]:
          - /url: https://eci.gov.in/
        - text: or helpline
        - strong [ref=e87]: "1950"
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
> 35 |       expect(accessibilityScanResults.violations).toEqual([]);
     |                                                   ^ Error: expect(received).toEqual(expected) // deep equality
  36 |     });
  37 |   }
  38 | });
  39 | 
```
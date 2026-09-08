# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: open-special-offers-page-from-navigation.spec.ts >> Navigation >> Open Special Offers Page From Navigation
- Location: tests/open-special-offers-page-from-navigation.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Navigation', () => {
  4  |   test('Open Special Offers Page From Navigation', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Click the "Special Hot" link in the header navigation
  9  |     await page.getByRole('link', { name: 'Special Hot', exact: true }).click();
  10 | 
  11 |     // 3. Verify the Special Offers page heading is visible
  12 |     await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
  13 |   });
  14 | });
  15 | 
```
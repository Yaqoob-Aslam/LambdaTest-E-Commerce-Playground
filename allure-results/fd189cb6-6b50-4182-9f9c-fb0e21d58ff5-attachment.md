# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search-with-special-characters-shows-no-results.spec.ts >> Search >> Search With Special Characters Shows No Results
- Location: tests/search-with-special-characters-shows-no-results.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.press: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'Search For Products' })
    - locator resolved to <input value="" type="text" name="search" data-autocomplete="5" aria-label="Search For Products" placeholder="Search For Products" data-autocomplete_route="extension/maza/product/product/autocomplete"/>
  - elementHandle.press("Enter")

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Search', () => {
  4  |   test('Search With Special Characters Shows No Results', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
  6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
  7  | 
  8  |     // 2. Type "!!!@@@###" into the search input and submit
  9  |     await page.getByRole('textbox', { name: 'Search For Products' }).fill('!!!@@@###');
> 10 |     await page.getByRole('textbox', { name: 'Search For Products' }).press('Enter');
     |                                                                      ^ Error: locator.press: Test timeout of 30000ms exceeded.
  11 | 
  12 |     // 3. Verify the no-results message is displayed
  13 |     await expect(page.getByText('There is no product that')).toBeVisible();
  14 |   });
  15 | });
  16 | 
```
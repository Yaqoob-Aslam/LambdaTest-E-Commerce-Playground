# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigate-to-page-two-of-category-listing.spec.ts >> Products >> Navigate To Page Two Of Category Listing
- Location: tests/navigate-to-page-two-of-category-listing.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=2", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Products', () => {
  4  |   test('Navigate To Page Two Of Category Listing', async ({ page }) => {
  5  |     // 1. Navigate to the second page of the Laptops & Notebooks category listing
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=2');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Verify page 2 is active
  9  |     await expect(page).toHaveURL(/page=2/);
  10 |     await expect(page.getByText('Showing 16 to 30 of 75 (5')).toBeVisible();
  11 |   });
  12 | });
  13 | 
```
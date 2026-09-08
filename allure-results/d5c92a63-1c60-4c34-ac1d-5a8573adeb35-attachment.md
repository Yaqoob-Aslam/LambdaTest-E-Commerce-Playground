# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: browse-laptops-notebooks-category.spec.ts >> Categories >> Browse Laptops And Notebooks Category
- Location: tests/browse-laptops-notebooks-category.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Categories', () => {
  4  |   test('Browse Laptops And Notebooks Category', async ({ page }) => {
  5  |     // 1. Navigate to the Laptops & Notebooks category page
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Verify the category page heading "Laptops" is visible
  9  |     await expect(page.getByRole('heading', { name: 'Laptops' })).toBeVisible();
  10 | 
  11 |     // 3. Verify a product card name "HTC Touch HD" is displayed
  12 |     await expect(page.getByRole('link', { name: 'HTC Touch HD', exact: true })).toBeVisible();
  13 | 
  14 |     // 4. Verify a product price "$146.00" is displayed on the listing
  15 |     await expect(page.getByText('$146.00')).toBeVisible();
  16 |   });
  17 | });
  18 | 
```
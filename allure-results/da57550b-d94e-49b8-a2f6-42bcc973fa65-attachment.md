# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sort-laptops-by-price-low-to-high.spec.ts >> Products >> Sort Laptops By Price Low To High
- Location: tests/sort-laptops-by-price-low-to-high.spec.ts:4:7

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
  3  | test.describe('Products', () => {
  4  |   test('Sort Laptops By Price Low To High', async ({ page }) => {
  5  |     // 1. Navigate to the Laptops & Notebooks category page
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Select "Price (Low > High)" in the Sort By combobox
  9  |     await page.getByRole('combobox', { name: 'Sort By:' }).selectOption('Price (Low > High)');
  10 | 
  11 |     // 3. Verify the first product card displays the lowest price "$98.00"
  12 |     const firstProductCard = page.locator('.product-layout').first();
  13 |     await expect(firstProductCard.getByRole('heading')).toHaveText('Nikon D300');
  14 |     await expect(firstProductCard.locator('.price')).toHaveText('$98.00');
  15 |   });
  16 | });
  17 | 
```
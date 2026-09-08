# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sort-laptops-by-name-z-to-a-and-price-high-to-low.spec.ts >> Products >> Sort Laptops By Name Z To A
- Location: tests/sort-laptops-by-name-z-to-a-and-price-high-to-low.spec.ts:6:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const CATEGORY_URL = 'https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18';
  4  | 
  5  | test.describe('Products', () => {
  6  |   test('Sort Laptops By Name Z To A', async ({ page }) => {
  7  |     // 1. Navigate to the Laptops & Notebooks category page
> 8  |     await page.goto(CATEGORY_URL);
     |                ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  9  | 
  10 |     // 2. Select "Name (Z - A)" in the Sort By combobox
  11 |     await page.getByRole('combobox', { name: 'Sort By:' }).selectOption('Name (Z - A)');
  12 | 
  13 |     // 3. Verify the first product is the reverse-alphabetical first
  14 |     await expect(page.getByRole('heading', { name: 'Sony VAIO' }).first()).toBeVisible();
  15 |   });
  16 | 
  17 |   test('Sort Laptops By Price High To Low', async ({ page }) => {
  18 |     // 1. Navigate to the Laptops & Notebooks category page
  19 |     await page.goto(CATEGORY_URL);
  20 | 
  21 |     // 2. Select "Price (High > Low)" in the Sort By combobox
  22 |     await page.getByRole('combobox', { name: 'Sort By:' }).selectOption('Price (High > Low)');
  23 | 
  24 |     // 3. Verify the first product card displays the highest price "$2,000.00"
  25 |     const firstProductCard = page.locator('.product-layout').first();
  26 |     await expect(firstProductCard.getByRole('heading')).toHaveText('MacBook Pro');
  27 |     await expect(firstProductCard.locator('.price')).toHaveText('$2,000.00');
  28 |   });
  29 | });
  30 | 
```
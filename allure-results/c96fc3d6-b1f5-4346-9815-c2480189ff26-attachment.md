# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: add-product-to-cart.spec.ts >> Cart >> Add Product To Cart
- Location: tests/add-product-to-cart.spec.ts:4:7

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
  3  | test.describe('Cart', () => {
  4  |   test('Add Product To Cart', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Search for "iMac" using the search box
  9  |     await page.getByPlaceholder('Search For Products').first().fill('iMac');
  10 |     await page.getByPlaceholder('Search For Products').first().press('Enter');
  11 | 
  12 |     // 3. Click the first "iMac" product link in the results
  13 |     await page.getByRole('link', { name: 'iMac' }).first().click();
  14 | 
  15 |     // 4. Click the "Add to Cart" button
  16 |     await page.getByRole('button', { name: 'Add to Cart' }).first().click();
  17 | 
  18 |     // 5. Verify the cart badge count updates to "1"
  19 |     await expect(page.locator('.cart-item-total').first()).toHaveText('1');
  20 | 
  21 |     // 6. Verify the cart drawer opened with a Checkout action
  22 |     await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  23 |   });
  24 | });
  25 | 
```
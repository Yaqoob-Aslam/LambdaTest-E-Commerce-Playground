# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: remove-product-from-cart.spec.ts >> Cart >> Remove Product From Cart
- Location: tests/remove-product-from-cart.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: locator.click: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'iMac' }).first()

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cart', () => {
  4  |   test('Remove Product From Cart', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
  6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
  7  | 
  8  |     // 2. Search for "iMac" and open the product
  9  |     await page.getByRole('textbox', { name: 'Search For Products' }).first().fill('iMac');
  10 |     await page.getByRole('textbox', { name: 'Search For Products' }).first().press('Enter');
> 11 |     await page.getByRole('link', { name: 'iMac' }).first().click();
     |                                                            ^ TimeoutError: locator.click: Timeout 30000ms exceeded.
  12 | 
  13 |     // 3. Click "Add to Cart"
  14 |     await page.locator('button.button-cart:visible').click();
  15 | 
  16 |     // 4. Navigate to the cart page
  17 |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
  18 | 
  19 |     // 5. Click the remove button for the product
  20 |     await page.getByTitle('Remove').click();
  21 | 
  22 |     // 6. Verify the cart is empty
  23 |     await expect(page.getByText('Your shopping cart is empty!').first()).toBeVisible();
  24 |   });
  25 | });
  26 | 
```
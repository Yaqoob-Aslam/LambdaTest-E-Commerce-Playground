# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: update-cart-quantity-to-two.spec.ts >> Cart >> Update Cart Quantity To Two
- Location: tests/update-cart-quantity-to-two.spec.ts:4:7

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
  4  |   test('Update Cart Quantity To Two', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Search for "iMac" and open the product
  9  |     await page.getByRole('textbox', { name: 'Search For Products' }).first().fill('iMac');
  10 |     await page.getByRole('textbox', { name: 'Search For Products' }).first().press('Enter');
  11 |     await page.getByRole('link', { name: 'iMac' }).first().click();
  12 | 
  13 |     // 3. Click "Add to Cart"
  14 |     await page.locator('button.button-cart:visible').click();
  15 | 
  16 |     // 4. Navigate to the cart page
  17 |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
  18 | 
  19 |     // 5. Update the quantity to 2 and apply
  20 |     const quantityInput = page.locator('input[name^="quantity"]');
  21 |     await quantityInput.fill('2');
  22 |     await page.getByTitle('Update').click();
  23 | 
  24 |     // 6. Verify the quantity is 2 and the total is doubled
  25 |     await expect(page.getByText('Success: You have modified')).toBeVisible();
  26 |     await expect(quantityInput).toHaveValue('2');
  27 |     await expect(page.getByRole('cell', { name: '$340.00' }).first()).toBeVisible();
  28 |   });
  29 | });
  30 | 
```
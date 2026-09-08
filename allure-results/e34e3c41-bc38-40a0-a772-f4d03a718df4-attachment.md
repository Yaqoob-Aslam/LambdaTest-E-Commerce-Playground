# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-with-empty-cart-redirects-to-cart.spec.ts >> Checkout >> Checkout With Empty Cart Redirects To Cart
- Location: tests/checkout-with-empty-cart-redirects-to-cart.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Checkout', () => {
  4  |   test('Checkout With Empty Cart Redirects To Cart', async ({ page }) => {
  5  |     // 1. Navigate to the checkout page with an empty cart
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Verify the user is redirected to the cart page
  9  |     await expect(page).toHaveURL(/route=checkout\/cart/);
  10 | 
  11 |     // 3. Verify the empty cart message is displayed
  12 |     await expect(page.getByText('Your shopping cart is empty!').first()).toBeVisible();
  13 |   });
  14 | });
  15 | 
```
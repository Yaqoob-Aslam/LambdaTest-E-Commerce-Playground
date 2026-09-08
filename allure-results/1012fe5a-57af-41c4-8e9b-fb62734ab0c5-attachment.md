# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/purchase-journey.spec.ts >> End-to-End >> TC_E2E_001_Search_To_Checkout_Journey
- Location: tests/e2e/purchase-journey.spec.ts:11:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Search - iMac' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Search - iMac' })

```

# Test source

```ts
  1  | import { URL_PATTERNS } from '../../constants/URLs';
  2  | import { TAGS } from '../../constants/Tags';
  3  | import { expect, test } from '../../fixtures/testFixtures';
  4  | 
  5  | /**
  6  |  * End-to-end journey: discover → add to cart → cart → checkout.
  7  |  * Stops before order placement by design (that is the opt-in guest checkout
  8  |  * test), keeping the journey deterministic and side-effect free.
  9  |  */
  10 | test.describe('End-to-End', () => {
  11 |   test(
  12 |     'TC_E2E_001_Search_To_Checkout_Journey',
  13 |     { tag: [TAGS.e2e, TAGS.regression, TAGS.search, TAGS.cart, TAGS.checkout] },
  14 |     async ({ homePage, searchPage, productDetailsPage, cartPage, checkoutPage, page, data }) => {
  15 |       const product = data.product('iMac');
  16 | 
  17 |       // 1. Search for the product from the home page
  18 |       await homePage.open();
  19 |       await homePage.searchFor(product.name);
> 20 |       await expect(searchPage.resultsHeading(product.name)).toBeVisible();
     |                                                             ^ Error: expect(locator).toBeVisible() failed
  21 | 
  22 |       // 2. Open the product from the results
  23 |       await searchPage.openProduct(product.name);
  24 |       await expect(productDetailsPage.nameHeading).toHaveText(product.name);
  25 | 
  26 |       // 3. Add it to the cart
  27 |       await productDetailsPage.addToCart();
  28 | 
  29 |       // 4. Verify it is in the cart
  30 |       await cartPage.open();
  31 |       await expect(cartPage.product(product.name)).toBeVisible();
  32 | 
  33 |       // 5. Continue to checkout
  34 |       await cartPage.proceedToCheckout();
  35 |       await expect(page).toHaveURL(URL_PATTERNS.checkout);
  36 |       await expect(checkoutPage.firstNameInput).toBeVisible();
  37 |     },
  38 |   );
  39 | });
  40 | 
```
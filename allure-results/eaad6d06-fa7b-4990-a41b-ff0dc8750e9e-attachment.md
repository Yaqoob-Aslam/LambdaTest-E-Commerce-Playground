# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart/cart.spec.ts >> Cart >> TC_CART_001_Add_Product_To_Cart
- Location: tests/cart/cart.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('link', { name: 'iMac', exact: true }).first()
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'iMac', exact: true }).first()
  - Protocol error (Runtime.callFunctionOn): Page crashed.

```

# Test source

```ts
  1   | import { MESSAGES } from '../../constants/Messages';
  2   | import { URL_PATTERNS } from '../../constants/URLs';
  3   | import { TAGS } from '../../constants/Tags';
  4   | import { expect, test } from '../../fixtures/testFixtures';
  5   | 
  6   | test.describe('Cart', () => {
  7   |   test(
  8   |     'TC_CART_001_Add_Product_To_Cart',
  9   |     { tag: [TAGS.cart, TAGS.functional, TAGS.smoke, TAGS.regression] },
  10  |     async ({ productDetailsPage, cartPage, data }) => {
  11  |       const product = data.product('iMac');
  12  | 
  13  |       // 1. Add the product to the cart
  14  |       await productDetailsPage.open(product.id);
  15  |       await productDetailsPage.addToCart();
  16  | 
  17  |       // 2. Verify it appears in the cart
  18  |       await cartPage.open();
> 19  |       await expect(cartPage.product(product.name)).toBeVisible();
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  20  |     },
  21  |   );
  22  | 
  23  |   test(
  24  |     'TC_CART_002_Add_Multiple_Products_To_Cart',
  25  |     { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
  26  |     async ({ productDetailsPage, cartPage, data }) => {
  27  |       const first = data.product('iMac');
  28  |       const second = data.product('htcTouchHd');
  29  | 
  30  |       // 1. Add two different products
  31  |       await productDetailsPage.open(first.id);
  32  |       await productDetailsPage.addToCart();
  33  |       await productDetailsPage.open(second.id);
  34  |       await productDetailsPage.addToCart();
  35  | 
  36  |       // 2. Verify both products are in the cart
  37  |       await cartPage.open();
  38  |       await expect(cartPage.product(first.name)).toBeVisible();
  39  |       await expect(cartPage.product(second.name)).toBeVisible();
  40  |     },
  41  |   );
  42  | 
  43  |   test(
  44  |     'TC_CART_003_Update_Product_Quantity',
  45  |     { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
  46  |     async ({ productDetailsPage, cartPage, data }) => {
  47  |       const product = data.product('iMac');
  48  | 
  49  |       // 1. Add the product and open the cart
  50  |       await productDetailsPage.open(product.id);
  51  |       await productDetailsPage.addToCart();
  52  |       await cartPage.open();
  53  | 
  54  |       // 2. Increase the quantity to 2
  55  |       await cartPage.updateQuantity(2);
  56  | 
  57  |       // 3. Verify the quantity and the recalculated line total
  58  |       await expect(cartPage.alertSuccess).toContainText(MESSAGES.cart.modified);
  59  |       await expect(cartPage.quantityInput).toHaveValue('2');
  60  |       await expect(cartPage.cell('$340.00')).toBeVisible();
  61  |     },
  62  |   );
  63  | 
  64  |   test(
  65  |     'TC_CART_004_Remove_Product_From_Cart',
  66  |     { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
  67  |     async ({ productDetailsPage, cartPage, data }) => {
  68  |       const product = data.product('iMac');
  69  | 
  70  |       // 1. Add the product and open the cart
  71  |       await productDetailsPage.open(product.id);
  72  |       await productDetailsPage.addToCart();
  73  |       await cartPage.open();
  74  | 
  75  |       // 2. Remove the product
  76  |       await cartPage.removeFirstProduct();
  77  | 
  78  |       // 3. Verify the cart is empty
  79  |       await expect(cartPage.emptyMessage).toBeVisible();
  80  |     },
  81  |   );
  82  | 
  83  |   test(
  84  |     'TC_CART_005_Empty_Cart_State',
  85  |     { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
  86  |     async ({ cartPage }) => {
  87  |       // 1. Open the cart without adding anything
  88  |       await cartPage.open();
  89  | 
  90  |       // 2. Verify the empty-cart message
  91  |       await expect(cartPage.emptyMessage).toContainText(MESSAGES.cart.empty);
  92  |     },
  93  |   );
  94  | 
  95  |   test(
  96  |     'TC_CART_006_Proceed_To_Checkout_From_Cart',
  97  |     { tag: [TAGS.cart, TAGS.checkout, TAGS.functional] },
  98  |     async ({ productDetailsPage, cartPage, page, data }) => {
  99  |       const product = data.product('iMac');
  100 | 
  101 |       // 1. Seed the cart and open it
  102 |       await productDetailsPage.open(product.id);
  103 |       await productDetailsPage.addToCart();
  104 |       await cartPage.open();
  105 | 
  106 |       // 2. Proceed to checkout
  107 |       await cartPage.proceedToCheckout();
  108 | 
  109 |       // 3. Verify checkout is displayed
  110 |       await expect(page).toHaveURL(URL_PATTERNS.checkout);
  111 |     },
  112 |   );
  113 | });
  114 | 
```
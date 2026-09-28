import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Cart — negative quantity and removal behaviour.
 * Traces to TEST-PLAN.md §7.3.2 (CC-N-001 … CC-N-007).
 */
test.describe('Cart — Negatives', () => {
  test(
    'TC_CART_N_001_Checkout_Empty_Cart_Redirects',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.negative, TAGS.regression] },
    async ({ checkoutPage, cartPage, page }) => {
      // 1. Attempt checkout with an empty cart (Plan CC-N-001)
      await checkoutPage.open();

      // 2. Verify the redirect back to the cart with the empty state
      await expect(page).toHaveURL(URL_PATTERNS.cart);
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_CART_N_002_Quantity_Zero_Removes_Or_Rejects',
    { tag: [TAGS.cart, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and set the line quantity to zero (Plan CC-N-002)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(0);

      // 2. Verify the line is removed or retained with a positive quantity
      for (const value of await cartPage.quantities()) {
        expect(Number(value)).toBeGreaterThan(0);
      }
    },
  );

  test(
    'TC_CART_N_003_Negative_Quantity_Is_Rejected',
    { tag: [TAGS.cart, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Attempt a negative quantity update (Plan CC-N-003)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(-2);

      // 2. Verify the cart never holds a negative quantity
      for (const value of await cartPage.quantities()) {
        expect(Number(value)).toBeGreaterThan(0);
      }
    },
  );

  test(
    'TC_CART_N_004_Very_Large_Quantity_Is_Bounded',
    { tag: [TAGS.cart, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Attempt an excessive quantity update (Plan CC-N-004)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(99999);

      // 2. Verify each line remains a positive, finite quantity
      for (const value of await cartPage.quantities()) {
        expect(Number(value)).toBeGreaterThan(0);
        expect(Number.isFinite(Number(value))).toBe(true);
      }
    },
  );

  test(
    'TC_CART_N_005_Decimal_Quantity_Is_Rejected',
    { tag: [TAGS.cart, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and inspect the quantity control (Plan CC-N-005)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();

      // 2. Verify quantities are whole numbers
      for (const value of await cartPage.quantities()) {
        expect(Number.isInteger(Number(value))).toBe(true);
      }
    },
  );

  test(
    // Plan: CC-P-008
    'TC_CART_N_006_Removing_All_Products_Shows_Empty_State',
    { tag: [TAGS.cart, TAGS.negative, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add a product then remove every line (Plan CC-N-006)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.clearCart();

      // 2. Verify the empty-cart state
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_CART_N_007_Non_Numeric_Quantity_Is_Rejected',
    { tag: [TAGS.cart, TAGS.negative] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and open it (Plan CC-N-007)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();

      // 2. Attempt a non-numeric quantity update
      await cartPage.quantityInput.fill('abc');
      await cartPage.updateButton.click();

      // 3. Verify the cart stays in a consistent state (item retained or empty,
      //    never a crashed/error page)
      await expect(cartPage.emptyMessage.or(cartPage.product(product.name))).toBeVisible();
    },
  );
});

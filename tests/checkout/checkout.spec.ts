import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Checkout', () => {
  test(
    'TC_CHECKOUT_001_Empty_Cart_Redirects_To_Cart',
    { tag: [TAGS.checkout, TAGS.negative, TAGS.cart, TAGS.regression] },
    async ({ checkoutPage, cartPage, page }) => {
      // 1. Attempt to open checkout with an empty cart
      await checkoutPage.open();

      // 2. Verify the redirect to the cart page and the empty-cart message
      await expect(page).toHaveURL(URL_PATTERNS.cart);
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-011
    'TC_CHECKOUT_002_Checkout_Shows_Billing_With_Items_In_Cart',
    { tag: [TAGS.checkout, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, checkoutPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart with a product
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Open checkout
      await checkoutPage.open();

      // 3. Verify checkout is displayed with billing fields
      //    (the Confirm Order button only renders after shipping/payment selection)
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
      await expect(checkoutPage.firstNameInput).toBeVisible();
    },
  );
});

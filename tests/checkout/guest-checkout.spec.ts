import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Guest checkout places a REAL order on the shared public demo store, so it is
 * opt-in via ALLOW_ORDER_PLACEMENT=1 and uses dynamically generated data.
 */
test.describe('Checkout — Guest Order', () => {
  test(
    // Plan: CC-P-012, CC-P-013, CC-P-014, CC-P-015, CC-P-016
    'TC_CHECKOUT_010_Guest_Checkout_Places_Order',
    { tag: [TAGS.checkout, TAGS.e2e, TAGS.regression] },
    async ({ productDetailsPage, checkoutPage, orderSuccessPage, page, data }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place real orders on the shared demo store',
      );

      const product = data.product('iMac');
      const guest = generateUser();

      // 1. Seed the cart with a product
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Open checkout and choose guest checkout
      await checkoutPage.open();
      await checkoutPage.selectGuestCheckout();

      // 3. Fill personal details and billing address
      await checkoutPage.fillPersonalDetails(guest);
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));

      // 4. Accept terms and confirm the order
      await checkoutPage.acceptTerms();
      await checkoutPage.confirmOrder();

      // 5. Verify the order confirmation
      await expect(orderSuccessPage.placedMessage).toBeVisible();
      await expect(page).toHaveURL(/route=checkout\/success/);
    },
  );
});

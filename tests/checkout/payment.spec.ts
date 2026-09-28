import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { URLS } from '../../constants/URLs';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Checkout — payment method behaviour and order placement.
 * Traces to TEST-PLAN.md §7.8 (PAY-P-001 … PAY-N-002).
 */
test.describe('Checkout — Payment', () => {
  test.beforeEach(async ({ productDetailsPage, checkoutPage, data }) => {
    await productDetailsPage.open(data.product('iMac').id);
    await productDetailsPage.addToCart();
    await checkoutPage.open();
    await checkoutPage.selectGuestCheckout();
    await checkoutPage.fillPersonalDetails(generateUser());
    await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
  });

  test(
    'TC_PAYMENT_P_001_Cash_On_Delivery_Places_The_Order',
    { tag: [TAGS.payment, TAGS.checkout, TAGS.order, TAGS.e2e] },
    async ({ checkoutPage, orderSuccessPage, page }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place real orders on the shared demo store',
      );

      // 1. Choose Cash On Delivery and accept the terms (Plan PAY-P-001)
      await page.locator('#input-payment-method-cod').check({ force: true });
      await checkoutPage.acceptTerms();

      // 2. Confirm the order
      await checkoutPage.confirmOrder();

      // 3. Verify the order was placed
      await expect(orderSuccessPage.placedMessage).toBeVisible();
      await expect(page).toHaveURL(/route=checkout\/success/);
    },
  );

  test(
    'TC_PAYMENT_P_002_Flat_Rate_Shipping_Is_Selectable',
    { tag: [TAGS.payment, TAGS.checkout, TAGS.functional] },
    async ({ checkoutPage, page, data }) => {
      // 1. Verify a flat-rate shipping option is offered (Plan PAY-P-002)
      await expect(page.getByText(/Flat Shipping Rate/i).first()).toBeVisible();

      // 2. Select it and verify the selection is retained
      await checkoutPage.shippingMethodRadios.first().check({ force: true });
      await expect(checkoutPage.shippingMethodRadios.first()).toBeChecked();
      await expect(page.getByText(data.product('iMac').name, { exact: false }).first()).toBeVisible();
    },
  );

  test(
    'TC_PAYMENT_P_003_Payment_Method_Is_Pre_Selected',
    { tag: [TAGS.payment, TAGS.checkout, TAGS.functional] },
    async ({ checkoutPage, page }) => {
      // 1. Open checkout and inspect the payment step (Plan PAY-P-003)
      await expect(page.getByRole('heading', { name: /preferred payment method/i })).toBeVisible();

      // 2. Verify a payment method is available and pre-selected
      await expect(checkoutPage.paymentMethodRadios.first()).toBeVisible();
      await expect(checkoutPage.paymentMethodRadios.first()).toBeChecked();
    },
  );

  test(
    'TC_PAYMENT_N_001_Missing_Payment_Method_Is_Unreachable',
    { tag: [TAGS.payment, TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page }) => {
      // 1. Verify the payment step always offers at least one method (Plan PAY-N-001)
      await expect(page.getByRole('heading', { name: /preferred payment method/i })).toBeVisible();
      expect(await checkoutPage.paymentMethodRadios.count()).toBeGreaterThan(0);

      // 2. Observation: the single available method (Cash On Delivery) is always
      //    pre-selected, so the "no payment method" state cannot be reached via the UI.
      await expect(checkoutPage.paymentMethodRadios.first()).toBeChecked();
    },
  );

  test(
    'TC_PAYMENT_N_002_Invalid_Payment_Details_Are_Rejected',
    { tag: [TAGS.payment, TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page }) => {
      // Cash On Delivery exposes no card/credential fields, so there is no
      // invalid-detail path to exercise for the available method (Plan PAY-N-002).
      test.skip(true, 'Cash On Delivery is the only method; it exposes no payment-detail fields');

      await checkoutPage.acceptTerms();
      await checkoutPage.confirmOrder();
      await expect(page).not.toHaveURL(URLS.orderSuccess);
    },
  );
});

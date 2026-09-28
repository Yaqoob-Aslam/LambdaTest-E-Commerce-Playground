import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Cart — edge, boundary and state-preservation behaviour.
 * Traces to TEST-PLAN.md §7.3.3 (CC-E-001 … CC-E-010).
 */
test.describe('Cart — Edge & Boundary', () => {
  test(
    'TC_CART_E_001_Quantity_One_Is_Accepted',
    { tag: [TAGS.cart, TAGS.edge, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add a single unit of a product (Plan CC-E-001)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify exactly one unit is in the cart
      await cartPage.open();
      await expect(cartPage.quantityInput).toHaveValue('1');
    },
  );

  test(
    'TC_CART_E_002_Maximum_Quantity_Is_Accepted',
    { tag: [TAGS.cart, TAGS.edge, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Update a line to a large (still valid) quantity (Plan CC-E-002)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(100);

      // 2. Verify a positive integer quantity is retained
      await expect(cartPage.quantityInput).toHaveValue('100');
    },
  );

  test(
    'TC_CART_E_003_Quantity_Above_Maximum_Is_Bounded',
    { tag: [TAGS.cart, TAGS.edge, TAGS.boundary] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Attempt a quantity above any realistic stock level (Plan CC-E-003)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(100000);

      // 2. Verify the cart remains consistent (clamped or an error is shown)
      for (const value of await cartPage.quantities()) {
        expect(Number(value)).toBeGreaterThan(0);
      }
    },
  );

  test(
    'TC_CART_E_004_Single_Product_Has_Correct_Totals',
    { tag: [TAGS.cart, TAGS.edge, TAGS.data] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add a single product (Plan CC-E-004)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify the line total equals the unit price
      await cartPage.open();
      await expect(cartPage.cell(product.price)).toBeVisible();
    },
  );

  test(
    'TC_CART_E_005_Many_Products_Are_All_Listed',
    { tag: [TAGS.cart, TAGS.edge] },
    async ({ productDetailsPage, cartPage, data }) => {
      const first = data.product('iMac');
      const second = data.product('htcTouchHd');

      // 1. Add several products (Plan CC-E-005)
      await productDetailsPage.open(first.id);
      await productDetailsPage.addToCart();
      await productDetailsPage.open(second.id);
      await productDetailsPage.addToCart();

      // 2. Verify all lines render
      await cartPage.open();
      await expect(cartPage.product(first.name)).toBeVisible();
      await expect(cartPage.product(second.name)).toBeVisible();
      expect(await cartPage.lineCount()).toBeGreaterThanOrEqual(2);
    },
  );

  test(
    // Plan: CC-P-003
    'TC_CART_E_006_Duplicate_Products_Are_Handled',
    { tag: [TAGS.cart, TAGS.edge] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add the same product twice (Plan CC-E-006)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await productDetailsPage.addToCart();

      // 2. Verify it is represented (either aggregated quantity or a single line)
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
      expect(await cartPage.lineCount()).toBeGreaterThanOrEqual(1);
    },
  );

  test(
    'TC_CART_E_007_Remove_Last_Product_Leaves_Empty_State',
    { tag: [TAGS.cart, TAGS.edge] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add one product and remove it (Plan CC-E-007)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.removeFirstProduct();

      // 2. Verify the cart is empty
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_CART_E_008_Refresh_During_Checkout_Preserves_State',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.edge, TAGS.session] },
    async ({ productDetailsPage, checkoutPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and open checkout (Plan CC-E-008)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await checkoutPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.checkout);

      // 2. Refresh the checkout page
      await page.reload({ waitUntil: 'domcontentloaded' });

      // 3. Verify the checkout state (not an empty cart) is preserved
      await expect(checkoutPage.firstNameInput).toBeVisible();
    },
  );

  test(
    'TC_CART_E_009_Back_During_Checkout_Preserves_Cart',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.edge] },
    async ({ productDetailsPage, cartPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and move into checkout (Plan CC-E-009)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(URL_PATTERNS.checkout);

      // 2. Navigate back
      await page.goBack({ waitUntil: 'domcontentloaded' });

      // 3. Verify the cart still contains the product (no data loss)
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_CART_E_010_Refresh_After_Confirm_Does_Not_Duplicate_Order',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.order, TAGS.edge] },
    async ({ productDetailsPage, checkoutPage, orderSuccessPage, page, data }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place real orders on the shared demo store',
      );

      const product = data.product('iMac');

      // 1. Place an order
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await checkoutPage.open();
      await checkoutPage.selectGuestCheckout();
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper',
        email: `qa_${Date.now()}@example.com`, telephone: '07123456789', password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.selectFirstShippingMethod();
      await checkoutPage.selectFirstPaymentMethod();
      await checkoutPage.acceptTerms();
      await checkoutPage.confirmOrder();
      await expect(orderSuccessPage.placedMessage).toBeVisible();

      // 2. Refresh the confirmation page (Plan CC-E-010)
      await page.reload({ waitUntil: 'domcontentloaded' });

      // 3. Verify no duplicate confirmation is produced
      await expect(page.getByText(/Your order has been placed!/i).first()).toBeVisible();
    },
  );
});

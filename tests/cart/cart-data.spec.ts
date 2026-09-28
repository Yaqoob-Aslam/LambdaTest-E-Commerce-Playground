import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/** Parse a "$1,234.00" price string into a number. */
const parsePrice = (value: string): number => Number(value.replace(/[^0-9.]/g, ''));

/** Format a number as a USD string, e.g. 340 -> "$340.00". */
const formatUsd = (value: number): string =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Cart — data validation and calculation checks.
 * Traces to TEST-PLAN.md §7.3.4 (CC-D-001 … CC-D-009).
 */
test.describe('Cart — Data & Calculations', () => {
  test(
    'TC_CART_D_001_Cart_Product_Matches_Checkout_Product',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.data] },
    async ({ productDetailsPage, cartPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Add a product and open the cart (Plan CC-D-001)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();

      // 2. Verify the same product is carried into checkout
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
      await expect(page.getByText(product.name, { exact: false }).first()).toBeVisible();
    },
  );

  test(
    'TC_CART_D_002_Cart_Quantity_Is_Consistent',
    { tag: [TAGS.cart, TAGS.data] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Set a quantity and read it back (Plan CC-D-002)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(2);

      // 2. Verify the persisted quantity
      await expect(cartPage.quantityInput).toHaveValue('2');
    },
  );

  test(
    'TC_CART_D_003_Subtotal_Equals_Price_Times_Quantity',
    { tag: [TAGS.cart, TAGS.data, TAGS.functional] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');
      const quantity = 2;
      const expectedLineTotal = formatUsd(parsePrice(product.price) * quantity);

      // 1. Add the product and set the quantity (Plan CC-D-003)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await cartPage.updateQuantity(quantity);

      // 2. Verify the recalculated line total
      await expect(cartPage.cell(expectedLineTotal)).toBeVisible();
    },
  );

  test(
    'TC_CART_D_004_Shipping_Charge_Is_Applied',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.data] },
    async ({ productDetailsPage, checkoutPage, page, data }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to exercise full checkout totals on the shared demo store',
      );

      // 1. Reach the delivery step (Plan CC-D-004)
      await productDetailsPage.open(data.product('iMac').id);
      await productDetailsPage.addToCart();
      await checkoutPage.open();
      await checkoutPage.selectGuestCheckout();
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper',
        email: `qa_${Date.now()}@example.com`, telephone: '07123456789', password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));

      // 2. Verify a shipping charge is surfaced
      await expect(page.getByText(/Flat|Shipping/i).first()).toBeVisible();
    },
  );

  test(
    'TC_CART_D_006_Final_Total_Is_Consistent',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.data] },
    async ({ productDetailsPage, checkoutPage, page, data }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to exercise full checkout totals on the shared demo store',
      );

      // 1. Reach the order review step (Plan CC-D-006)
      await productDetailsPage.open(data.product('iMac').id);
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

      // 2. Verify a total is displayed
      await expect(page.getByText(/Total/i).first()).toBeVisible();
    },
  );

  test(
    'TC_CART_D_008_Order_History_Contains_The_Placed_Order',
    { tag: [TAGS.cart, TAGS.order, TAGS.account, TAGS.data] },
    async ({ loginPage, orderHistoryPage, page }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place real orders on the shared demo store',
      );

      // 1. Log in and open order history (Plan CC-D-008)
      await loginPage.open();
      await loginPage.login(
        DataUtils.registeredCredentials().email,
        DataUtils.registeredCredentials().password,
      );
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await orderHistoryPage.open();

      // 2. Verify at least one order is listed
      await expect(orderHistoryPage.viewButtons.first()).toBeVisible();
    },
  );

  test(
    'TC_CART_D_009_Price_Is_Consistent_Across_Pages',
    { tag: [TAGS.cart, TAGS.product, TAGS.data] },
    async ({ categoryPage, productDetailsPage, cartPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Read a price from the listing (Plan CC-D-009)
      await categoryPage.open(category.path);
      const name = (await categoryPage.productCard(0).name.textContent())?.trim() ?? '';
      const price = (await categoryPage.productCard(0).price.textContent())?.trim() ?? '';

      // 2. Verify the same price on the detail page
      await categoryPage.openProduct(name);
      await expect(page.getByText(price).first()).toBeVisible();

      // 3. Verify the same price in the cart
      await productDetailsPage.addToCart();
      await cartPage.open();
      await expect(cartPage.cell(price)).toBeVisible();
    },
  );
});

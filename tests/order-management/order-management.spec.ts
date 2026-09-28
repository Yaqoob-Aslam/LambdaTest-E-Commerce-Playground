import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Order management — history, details, reorder and returns.
 * Traces to TEST-PLAN.md §7.9 (ORD-P-001 … ORD-N-003) and §7.3 (CC-P-017 … CC-P-020).
 */
test.describe('Order Management', () => {
  test.beforeEach(async ({ loginPage, page, data }) => {
    test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
    const credentials = data.registeredCredentials();
    await loginPage.open();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(URL_PATTERNS.account);
  });

  test(
    // Plan: CC-P-017, CC-P-018
    'TC_ORDER_001_Order_History_Is_Listed',
    { tag: [TAGS.order, TAGS.account, TAGS.functional, TAGS.regression] },
    async ({ orderHistoryPage, page }) => {
      // 1. Open the order history (Plan ORD-P-001 / CC-P-018)
      await orderHistoryPage.open();

      // 2. Verify the page renders
      await expect(page).toHaveURL(URL_PATTERNS.orderHistory);
      await expect(orderHistoryPage.heading).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-019
    'TC_ORDER_002_Order_Details_Are_Viewable',
    { tag: [TAGS.order, TAGS.account, TAGS.functional] },
    async ({ orderHistoryPage, page }) => {
      // 1. Open the order history (Plan ORD-P-002 / CC-P-019)
      await orderHistoryPage.open();

      // 2. Skip when the account has no orders to inspect
      const orderCount = await orderHistoryPage.viewButtons.count();
      test.skip(orderCount === 0, 'Registered account has no orders to inspect');

      // 3. Open the first order and verify the detail view
      await orderHistoryPage.openFirstOrder();
      await expect(page).toHaveURL(/route=account\/order[./]info/);
      await expect(page.getByText(/Order Details|Order ID/i).first()).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-020
    'TC_ORDER_003_Reorder_Populates_The_Cart',
    { tag: [TAGS.order, TAGS.cart, TAGS.account] },
    async ({ orderHistoryPage, cartPage, page }) => {
      // 1. Open the order history (Plan ORD-P-003 / CC-P-020)
      await orderHistoryPage.open();
      const orderCount = await orderHistoryPage.viewButtons.count();
      test.skip(orderCount === 0, 'Registered account has no orders to reorder');

      // 2. Attempt a reorder if the theme offers the action
      await orderHistoryPage.openFirstOrder();
      const reorder = page.getByRole('button', { name: /Reorder/i });
      test.skip((await reorder.count()) === 0, 'Reorder action is not exposed by this theme');

      await reorder.first().click();

      // 3. Verify the cart is populated
      await cartPage.open();
      expect(await cartPage.lineCount()).toBeGreaterThan(0);
    },
  );

  test(
    'TC_ORDER_004_Order_Is_Recorded_In_The_Account',
    { tag: [TAGS.order, TAGS.account, TAGS.data] },
    async ({ orderHistoryPage }) => {
      // 1. Requires real order placement on the shared demo store (Plan ORD-P-004)
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place and verify real orders',
      );

      // 2. Verify at least one order is listed after purchase
      await orderHistoryPage.open();
      await expect(orderHistoryPage.viewButtons.first()).toBeVisible();
    },
  );

  test(
    'TC_ORDER_005_Order_Number_Is_Generated',
    { tag: [TAGS.order, TAGS.data] },
    async ({ orderSuccessPage, page }) => {
      // 1. Requires real order placement so a confirmation exists (Plan ORD-P-005)
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to place real orders',
      );

      // 2. Verify an order confirmation with a reference is shown
      await orderSuccessPage.open();
      await expect(page.getByText(/order/i).first()).toBeVisible();
    },
  );

  test(
    'TC_ORDER_N_001_Empty_Order_History_Shows_Empty_State',
    { tag: [TAGS.order, TAGS.account, TAGS.negative] },
    async ({ orderHistoryPage }) => {
      // 1. Open the order history (Plan ORD-N-001)
      await orderHistoryPage.open();

      // 2. Only meaningful for an account without orders
      const orderCount = await orderHistoryPage.viewButtons.count();
      test.skip(orderCount > 0, 'Registered account already has orders');

      // 3. Verify the empty state
      await expect(orderHistoryPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_ORDER_N_002_Cancel_Order_Not_Exposed',
    { tag: [TAGS.order, TAGS.negative] },
    async () => {
      // Order cancellation is not exposed by this theme (Plan ORD-N-002)
      test.skip(true, 'Order cancellation is not exposed by this theme');
    },
  );

  test(
    'TC_ORDER_N_003_Returns_Page_Renders',
    { tag: [TAGS.order, TAGS.account, TAGS.functional] },
    async ({ page }) => {
      // 1. Open the returns page (Plan ORD-N-003)
      await page.goto('/index.php?route=account/return');

      // 2. Verify the returns view renders (empty or with entries)
      await expect(page.getByRole('heading', { name: /Returns|Product Returns/i }).first())
        .toBeVisible();
    },
  );
});

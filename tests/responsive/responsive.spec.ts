import { testConfig } from '../../config/testConfig';
import { TAGS } from '../../constants/Tags';
import { VIEWPORTS } from '../../constants/TestConstants';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Responsive layout and cross-browser smoke coverage.
 * Traces to TEST-PLAN.md §7.14 (RSP-001 … XB-004).
 */
test.describe('Responsive Layout', () => {
  test(
    'TC_RESP_001_Desktop_Layout',
    { tag: [TAGS.responsive, TAGS.home] },
    async ({ homePage, page }) => {
      // 1. Render at a desktop viewport (Plan RSP-001)
      await page.setViewportSize(VIEWPORTS.desktop);
      await homePage.open();

      // 2. Verify the core chrome is visible
      await expect(homePage.header.logo).toBeVisible();
      await expect(homePage.header.searchInput).toBeVisible();
    },
  );

  test(
    'TC_RESP_002_Tablet_Layout',
    { tag: [TAGS.responsive, TAGS.home] },
    async ({ homePage, page }) => {
      // 1. Render at a tablet viewport (Plan RSP-002)
      await page.setViewportSize(VIEWPORTS.tablet);
      await homePage.open();

      // 2. Verify the core chrome remains visible
      await expect(homePage.header.logo).toBeVisible();
    },
  );

  test(
    'TC_RESP_003_Mobile_Layout',
    { tag: [TAGS.responsive, TAGS.home] },
    async ({ homePage, page }) => {
      // 1. Render at a mobile viewport (Plan RSP-003)
      await page.setViewportSize(VIEWPORTS.mobile);
      await homePage.open();

      // 2. Verify the storefront renders and remains horizontally usable.
      //    The full logo is removed on mobile, so a mobile navigation control is
      //    asserted instead.
      await expect(page.getByRole('button', { name: /Shop by Category/i }).first()).toBeAttached();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(50);
    },
  );

  test(
    'TC_RESP_004_Navigation_Is_Usable_On_Mobile',
    { tag: [TAGS.responsive, TAGS.navigation] },
    async ({ homePage, page }) => {
      // 1. Render at a mobile viewport (Plan RSP-004)
      await page.setViewportSize(VIEWPORTS.mobile);
      await homePage.open();

      // 2. Verify the category/navigation control is available
      await expect(page.getByRole('button', { name: /Shop by Category/i }).first())
        .toBeAttached();
    },
  );

  test(
    'TC_RESP_005_Listing_And_Cart_Are_Usable_On_Mobile',
    { tag: [TAGS.responsive, TAGS.listing, TAGS.cart] },
    async ({ categoryPage, cartPage, page, data }) => {
      // 1. Render a category listing on a mobile viewport (Plan RSP-005)
      await page.setViewportSize(VIEWPORTS.mobile);
      await categoryPage.open(data.category('laptops').path);
      await expect(categoryPage.productCards.first()).toBeVisible();

      // 2. Verify the cart page renders on mobile
      await cartPage.open();
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );
});

test.describe('Cross-Browser Smoke', () => {
  test(
    'XB_001_Home_Renders_Across_Browsers',
    { tag: [TAGS.smoke, TAGS.regression, TAGS.responsive] },
    async ({ homePage }) => {
      // 1. Verify the storefront renders in the current browser engine (Plan XB-001..003)
      await homePage.open();
      await expect(homePage.header.logo).toBeVisible();
      await expect(homePage.footer.copyright).toBeVisible();
    },
  );

  test(
    'XB_004_Checkout_Regression_Across_Browsers',
    { tag: [TAGS.checkout, TAGS.regression] },
    async ({ productDetailsPage, checkoutPage, page, data }) => {
      test.skip(
        !testConfig.flags.allowOrderPlacement,
        'Set ALLOW_ORDER_PLACEMENT=1 to exercise the cross-browser checkout flow',
      );

      // 1. Reach checkout in the current browser engine (Plan XB-004)
      await productDetailsPage.open(data.product('iMac').id);
      await productDetailsPage.addToCart();
      await checkoutPage.open();
      await checkoutPage.selectGuestCheckout();

      // 2. Verify the checkout form renders
      await expect(page).toHaveURL(/route=checkout\/checkout/);
      await expect(checkoutPage.firstNameInput).toBeVisible();
    },
  );
});

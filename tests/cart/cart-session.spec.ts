import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Cart & session — persistence of cart and login state.
 * Traces to TEST-PLAN.md §7.3.5 (CC-S-001 … CC-S-005) and §7.11 (SES-P-003 … SES-P-007).
 */
test.describe('Cart — Session & Persistence', () => {
  test(
    'TC_CART_S_001_Cart_Persists_Across_Navigation',
    { tag: [TAGS.cart, TAGS.session, TAGS.regression] },
    async ({ productDetailsPage, cartPage, homePage, data }) => {
      const product = data.product('iMac');

      // 1. Add a product then browse away (Plan CC-S-001 / SES-P-003)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await homePage.open();

      // 2. Verify the cart is intact after navigation
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_CART_S_002_Cart_Persists_After_Refresh',
    { tag: [TAGS.cart, TAGS.session, TAGS.regression] },
    async ({ productDetailsPage, cartPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Add a product and open the cart (Plan CC-S-002 / SES-P-004)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();

      // 2. Refresh the page
      await page.reload({ waitUntil: 'domcontentloaded' });

      // 3. Verify the cart survives the refresh
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_CART_S_003_Cart_Survives_A_New_Tab_Session',
    { tag: [TAGS.cart, TAGS.session, TAGS.edge] },
    async ({ productDetailsPage, context, data }) => {
      const product = data.product('iMac');

      // 1. Add a product (Plan CC-S-003 / SES-P-005)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Open the storefront in a second tab that shares the same cookie jar
      const secondTab = await context.newPage();
      await secondTab.goto('/index.php?route=checkout/cart', { waitUntil: 'domcontentloaded' });

      // 3. Verify the cart is shared across tabs
      await expect(
        secondTab.getByRole('link', { name: product.name, exact: true }).first(),
      ).toBeVisible();
      await secondTab.close();
    },
  );

  test(
    'TC_CART_S_004_Checkout_Interruption_Preserves_Cart',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.session] },
    async ({ productDetailsPage, cartPage, checkoutPage, homePage, page, data }) => {
      const product = data.product('iMac');

      // 1. Enter checkout then navigate away (Plan CC-S-004 / SES-P-006)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await checkoutPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
      await homePage.open();

      // 2. Resume the cart — the item must still be there
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_CART_S_005_Guest_Cart_Is_Preserved_After_Login',
    { tag: [TAGS.cart, TAGS.session, TAGS.authentication] },
    async ({ productDetailsPage, cartPage, loginPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const product = data.product('iMac');
      const credentials = data.registeredCredentials();

      // 1. Add a product as a guest (Plan CC-S-005 / SES-P-007)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Log in
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 3. Verify the guest cart is preserved (or merged) after login
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );
});

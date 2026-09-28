import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Error handling — validation, empty/no-result states and recovery.
 * Traces to TEST-PLAN.md §7.16 (ERR-001 … ERR-007).
 */
test.describe('Error Handling', () => {
  test(
    'TC_ERROR_001_Validation_Errors_Are_Displayed',
    { tag: [TAGS.error, TAGS.negative, TAGS.regression] },
    async ({ loginPage }) => {
      // 1. Submit an empty login form (Plan ERR-001)
      await loginPage.open();
      await loginPage.submit();

      // 2. Verify a validation message is displayed
      await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
    },
  );

  test(
    'TC_ERROR_002_Empty_States_Are_Understandable',
    { tag: [TAGS.error, TAGS.cart] },
    async ({ cartPage }) => {
      // 1. Open an empty cart (Plan ERR-002)
      await cartPage.open();

      // 2. Verify a clear empty-state message
      await expect(cartPage.emptyMessage).toContainText(MESSAGES.cart.empty);
    },
  );

  test(
    'TC_ERROR_003_No_Result_States_Are_Understandable',
    { tag: [TAGS.error, TAGS.search] },
    async ({ searchPage, data }) => {
      // 1. Search for a term with no matches (Plan ERR-003)
      await searchPage.open(data.searchTerms().nonExistent);

      // 2. Verify the no-results message
      await expect(searchPage.noResultsMessage).toBeVisible();
    },
  );

  test(
    'TC_ERROR_004_Invalid_URL_Is_Handled_Gracefully',
    { tag: [TAGS.error, TAGS.navigation, TAGS.negative] },
    async ({ page }) => {
      // 1. Open a non-existent route (Plan ERR-004)
      await page.goto('/index.php?route=this/does/not/exist', { waitUntil: 'domcontentloaded' });

      // 2. Verify a graceful not-found response (no crash, no stack trace)
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Fatal error/i);
    },
  );

  test(
    'TC_ERROR_005_Failed_Operations_Are_Recoverable',
    { tag: [TAGS.error, TAGS.checkout] },
    async ({ checkoutPage, cartPage, page }) => {
      // 1. Attempt checkout with nothing in the cart (Plan ERR-005)
      await checkoutPage.open();

      // 2. Verify the app recovers by routing back to the cart
      await expect(page).toHaveURL(URL_PATTERNS.cart);
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_ERROR_006_Interrupted_Workflows_Preserve_Data',
    { tag: [TAGS.error, TAGS.cart, TAGS.session] },
    async ({ productDetailsPage, cartPage, homePage, data }) => {
      const product = data.product('iMac');

      // 1. Begin a workflow with an item in the cart (Plan ERR-006)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Interrupt by navigating away
      await homePage.open();

      // 3. Verify no data was lost
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_ERROR_007_App_Remains_Consistent_After_An_Error',
    { tag: [TAGS.error, TAGS.authentication] },
    async ({ loginPage, page }) => {
      // 1. Trigger a login error (Plan ERR-007)
      await loginPage.open();
      await loginPage.submit();
      await expect(loginPage.alerts.danger).toBeVisible();

      // 2. Verify the app is still usable (retry from a consistent state)
      await loginPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
      await expect(loginPage.emailInput).toBeVisible();
    },
  );
});

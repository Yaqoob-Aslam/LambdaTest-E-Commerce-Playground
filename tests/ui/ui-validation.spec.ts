import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * UI & functional validation — titles, URLs, controls, messages and breadcrumbs.
 * Traces to TEST-PLAN.md §7.12 (UI-P-001 … UI-P-011).
 */
test.describe('UI & Functional Validation', () => {
  test(
    'TC_UI_001_Page_Titles_Are_Correct',
    { tag: [TAGS.ui, TAGS.functional] },
    async ({ homePage, loginPage, productDetailsPage, page, data }) => {
      // 1. Home page title (Plan UI-P-001)
      await homePage.open();
      await expect(page).toHaveTitle(/Poco|Store/i);

      // 2. Login page title
      await loginPage.open();
      await expect(page).toHaveTitle(/Login|Account/i);

      // 3. Product page title matches the product name
      const product = data.product('iMac');
      await productDetailsPage.open(product.id);
      await expect(page).toHaveTitle(new RegExp(product.name));
    },
  );

  test(
    'TC_UI_002_URLs_Are_Correct',
    { tag: [TAGS.ui, TAGS.functional] },
    async ({ loginPage, cartPage, page }) => {
      // 1. Verify the login route (Plan UI-P-002)
      await loginPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);

      // 2. Verify the cart route
      await cartPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.cart);
    },
  );

  test(
    'TC_UI_003_Headings_Labels_And_Buttons_Are_Present',
    { tag: [TAGS.ui, TAGS.functional, TAGS.authentication] },
    async ({ loginPage, page }) => {
      // 1. Open the login page (Plan UI-P-003)
      await loginPage.open();

      // 2. Verify the labels and controls are exposed
      await expect(page.getByRole('heading', { name: /Returning Customer/i })).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    },
  );

  test(
    'TC_UI_004_Cart_Count_Is_Accurate',
    { tag: [TAGS.ui, TAGS.cart, TAGS.functional] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Add one product and verify the header count (Plan UI-P-004)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await expect(productDetailsPage.miniCart.itemCount).toHaveText('1');

      // 2. Add it again and verify the count increments
      await productDetailsPage.addToCart();
      await expect(productDetailsPage.miniCart.itemCount).toHaveText('2');
    },
  );

  test(
    'TC_UI_005_Wishlist_Control_Is_Available',
    { tag: [TAGS.ui, TAGS.wishlist, TAGS.account] },
    async ({ loginPage, homePage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const credentials = data.registeredCredentials();

      // 1. Log in and open the home page (Plan UI-P-005)
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await homePage.open();

      // 2. Verify the header wishlist control is available
      await expect(page.getByRole('link', { name: 'Wishlist' }).first()).toBeVisible();
    },
  );

  test(
    'TC_UI_006_Error_And_Success_Messages_Are_Shown',
    { tag: [TAGS.ui, TAGS.functional] },
    async ({ loginPage, productDetailsPage, page, data }) => {
      // 1. Trigger an error message (Plan UI-P-006)
      await loginPage.open();
      await loginPage.submit();
      await expect(loginPage.alerts.danger).toBeVisible();

      // 2. Trigger a success message via add-to-cart
      await productDetailsPage.open(data.product('iMac').id);
      await productDetailsPage.addToCart();
      await expect(page.getByText(/Success: You have added/i).first()).toBeVisible();
    },
  );

  test(
    'TC_UI_007_Breadcrumbs_Reflect_Navigation',
    { tag: [TAGS.ui, TAGS.navigation] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a category (Plan UI-P-007)
      await categoryPage.open(category.path);

      // 2. Verify the breadcrumb shows the path
      await expect(categoryPage.breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(categoryPage.breadcrumb.getByText(category.name)).toBeVisible();
    },
  );

  test(
    'TC_UI_008_Form_Controls_Are_Functional',
    { tag: [TAGS.ui, TAGS.functional] },
    async ({ registerPage, page }) => {
      // 1. Open registration and exercise radio/checkbox controls (Plan UI-P-008)
      await registerPage.open();
      await registerPage.setNewsletter(true);
      await expect(registerPage.newsletterYes).toBeChecked();
      await registerPage.setNewsletter(false);
      await expect(registerPage.newsletterNo).toBeChecked();
      await registerPage.acceptPrivacyPolicy();
      await expect(registerPage.agreeCheckbox).toBeChecked();
      await expect(page).toHaveURL(URL_PATTERNS.register);
    },
  );

  test(
    'TC_UI_009_Modal_And_Tooltip_Behaviour',
    { tag: [TAGS.ui] },
    async () => {
      // Modal/tooltip pixel behaviour is a manual visual check in this theme (Plan UI-P-009).
      test.skip(true, 'Modal/tooltip visual behaviour is verified manually');
    },
  );

  test(
    'TC_UI_010_Controls_Are_Correctly_Enabled',
    { tag: [TAGS.ui, TAGS.functional] },
    async ({ categoryPage, productDetailsPage, data }) => {
      const category = data.category('laptops');

      // 1. Listing controls are enabled (Plan UI-P-010)
      await categoryPage.open(category.path);
      await expect(categoryPage.sortSelect).toBeEnabled();
      await expect(categoryPage.limitSelect).toBeEnabled();

      // 2. Product purchase controls are enabled
      await productDetailsPage.open(data.product('iMac').id);
      await expect(productDetailsPage.addToCartButton).toBeEnabled();
      await expect(productDetailsPage.quantityInput).toBeEnabled();
    },
  );

  test(
    'TC_UI_011_Pagination_Controls_Are_Visible',
    { tag: [TAGS.ui, TAGS.category] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a paginated category (Plan UI-P-011)
      await categoryPage.open(category.path);

      // 2. Verify pagination controls are visible
      await expect(categoryPage.pagination).toBeVisible();
      await expect(
        categoryPage.pagination.getByRole('link', { name: '2', exact: true }).first(),
      ).toBeVisible();
    },
  );
});

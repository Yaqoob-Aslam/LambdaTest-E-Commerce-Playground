import { URL_PATTERNS } from '../../constants';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Smoke suite — the critical paths a release must satisfy.
 * Mapped from master test plan §5.
 * Run with: npx playwright test --grep @smoke
 */
test.describe('Smoke — Critical Paths', () => {
  test(
    'SMOKE-001_Application_Loads_And_Home_Renders',
    { tag: [TAGS.smoke, TAGS.regression, TAGS.navigation] },
    async ({ homePage }) => {
      // 1. Open the application
      await homePage.open();

      // 2. Verify the core chrome is present
      await expect(homePage.header.logo).toBeVisible();
      await expect(homePage.header.searchInput).toBeVisible();
      await expect(homePage.footer.copyright).toBeVisible();
    },
  );

  test(
    'SMOKE-002_User_Can_Search_For_A_Product',
    { tag: [TAGS.smoke, TAGS.search, TAGS.regression] },
    async ({ homePage, searchPage, data }) => {
      const { exact } = data.searchTerms();

      // 1. Search for a known product from the home page
      await homePage.open();
      await homePage.searchFor(exact);

      // 2. Verify the results heading names the search term
      await expect(searchPage.resultsHeading(exact)).toBeVisible();
    },
  );

  test(
    'SMOKE-003_User_Can_Open_A_Product_Detail_Page',
    { tag: [TAGS.smoke, TAGS.product, TAGS.regression] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open the product detail page directly
      await productDetailsPage.open(product.id);

      // 2. Verify product identity and purchase controls
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
      await expect(productDetailsPage.addToCartButton).toBeVisible();
      await expect(productDetailsPage.descriptionTab).toBeVisible();
    },
  );

  test(
    'SMOKE-004_User_Can_Add_A_Product_To_Cart',
    { tag: [TAGS.smoke, TAGS.cart, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add the product to the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify it appears in the cart
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'SMOKE-005_User_Can_Open_The_Cart',
    { tag: [TAGS.smoke, TAGS.cart, TAGS.regression] },
    async ({ cartPage }) => {
      // 1. Open the cart page with an empty session
      await cartPage.open();

      // 2. Verify the empty-cart state is rendered
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'SMOKE-006_User_Can_Reach_Checkout',
    { tag: [TAGS.smoke, TAGS.checkout, TAGS.regression] },
    async ({ productDetailsPage, checkoutPage, data, page }) => {
      const product = data.product('iMac');

      // 1. Seed the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Open checkout
      await checkoutPage.open();

      // 3. Verify checkout (not the cart) is displayed with billing fields
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
      await expect(checkoutPage.firstNameInput).toBeVisible();
    },
  );

  test(
    'SMOKE-007_Guest_Is_Asked_To_Login_For_Protected_Page',
    { tag: [TAGS.smoke, TAGS.authentication, TAGS.regression] },
    async ({ accountPage, page }) => {
      // 1. Request a protected page while logged out
      await accountPage.open();

      // 2. Verify the user is redirected to login
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'SMOKE-008_Special_Offers_Page_Opens_From_Navigation',
    { tag: [TAGS.smoke, TAGS.navigation, TAGS.regression] },
    async ({ homePage, page }) => {
      // 1. Open the home page and click the Special Offers link
      await homePage.open();
      await homePage.navigation.openSpecialOffers();

      // 2. Verify the Special Offers heading is displayed
      await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
    },
  );
});

import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Navigation', () => {
  test(
    'TC_NAV_001_Category_Page_Shows_Breadcrumbs',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.product, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open the laptops category
      await categoryPage.open(category.path);

      // 2. Verify the breadcrumb reflects the path
      await expect(categoryPage.breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(categoryPage.breadcrumb.getByText('Laptops')).toBeVisible();
    },
  );

  test(
    // Plan: PRD-P-003
    'TC_NAV_002_Manufacturer_Page_Lists_Brand_Products',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.product] },
    async ({ page, data }) => {
      const manufacturer = data.manufacturer('apple');

      // 1. Open the Apple manufacturer page
      await page.goto(`/index.php?route=product/manufacturer/info&manufacturer_id=${manufacturer.id}`);

      // 2. Verify the brand heading is displayed
      await expect(page.getByRole('heading', { name: manufacturer.name, exact: true })).toBeVisible();
    },
  );

  test(
    'TC_NAV_003_Static_Information_Page_Renders',
    { tag: [TAGS.functional, TAGS.navigation] },
    async ({ page }) => {
      // 1. Open the About Us information page
      await page.goto('/index.php?route=information/information&information_id=4');

      // 2. Verify the page title and heading
      await expect(page).toHaveTitle(/About Us/);
      await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
    },
  );

  test(
    'TC_NAV_004_Blog_Home_Page_Renders',
    { tag: [TAGS.functional, TAGS.navigation] },
    async ({ page }) => {
      // 1. Open the blog home page
      await page.goto('/index.php?route=extension/maza/blog/home');

      // 2. Verify the blog page title
      await expect(page).toHaveTitle(/Blog/);
    },
  );

  test(
    // Plan: PRD-P-004
    'TC_NAV_005_Special_Offers_Open_From_Header',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.regression] },
    async ({ homePage, page }) => {
      // 1. Click the Special Hot link from the home page
      await homePage.open();
      await homePage.navigation.openSpecialOffers();

      // 2. Verify the Special Offers page is displayed
      await expect(page).toHaveURL(/route=product\/special/);
      await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
    },
  );

  test(
    // Plan: AUTH-P-005
    'TC_NAV_006_My_Account_Opens_Login_When_Logged_Out',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.authentication] },
    async ({ homePage, page }) => {
      // 1. Click the header "My account" control while logged out
      await homePage.open();
      await homePage.header.openMyAccount();

      // 2. Verify the login page is shown
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_NAV_007_Unknown_Route_Shows_Page_Not_Found',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.negative] },
    async ({ page }) => {
      // 1. Open a non-existent route
      await page.goto('/index.php?route=information/tracking&order_id=999999&email=x@y.com');

      // 2. Verify the not-found page is displayed
      await expect(
        page.getByRole('heading', { name: 'The page you requested cannot be found!' }),
      ).toBeVisible();
    },
  );
});

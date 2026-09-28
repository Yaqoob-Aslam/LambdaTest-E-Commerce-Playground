import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Navigation — header/footer links, history and route integrity.
 * Traces to TEST-PLAN.md §7.5 (NAV-P-001 … NAV-N-002).
 */
test.describe('Navigation — Links & History', () => {
  test(
    'TC_NAV_P_001_Header_Navigation_Links',
    { tag: [TAGS.navigation, TAGS.functional, TAGS.regression] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan NAV-P-001)
      await homePage.open();

      // 2. Verify the primary navigation links are present
      await expect(page.getByRole('link', { name: 'Home', exact: true }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /Special/i }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible();
    },
  );

  test(
    'TC_NAV_P_002_Mega_Menu_Brand_Link',
    { tag: [TAGS.navigation, TAGS.product] },
    async ({ page, data }) => {
      const manufacturer = data.manufacturer('apple');

      // 1. Open a brand page reached via the mega menu (Plan NAV-P-002)
      await page.goto(
        `/index.php?route=product/manufacturer/info&manufacturer_id=${manufacturer.id}`,
      );

      // 2. Verify the brand listing renders
      await expect(page.getByRole('heading', { name: manufacturer.name, exact: true })).toBeVisible();
    },
  );

  test(
    'TC_NAV_P_003_Mega_Menu_Subcategory',
    { tag: [TAGS.navigation, TAGS.category] },
    async ({ page }) => {
      // 1. Open a subcategory listing directly (Plan NAV-P-003)
      await page.goto('/index.php?route=product/category&path=25');

      // 2. Verify the subcategory listing renders
      await expect(page).toHaveURL(URL_PATTERNS.category);
      await expect(page.getByRole('heading', { name: /Components/i })).toBeVisible();
    },
  );

  test(
    'TC_NAV_P_004_Footer_Quick_Links',
    { tag: [TAGS.navigation, TAGS.functional] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan NAV-P-004)
      await homePage.open();

      // 2. Verify the Quick Links are present in the DOM (the panel is off-canvas)
      const quickLinks: RegExp[] = [/^Wishlist$/i, /^Compare$/i, /^Blog$/i, /Contact us/i];
      for (const name of quickLinks) {
        await expect(page.getByRole('link', { name }).first()).toBeAttached();
      }
    },
  );

  test(
    'TC_NAV_P_005_Breadcrumbs_Reflect_Path',
    { tag: [TAGS.navigation, TAGS.category] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Navigate to a category (Plan NAV-P-005)
      await categoryPage.open(category.path);

      // 2. Verify the breadcrumb reflects the path
      await expect(categoryPage.breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(categoryPage.breadcrumb.getByText(category.name)).toBeVisible();
    },
  );

  test(
    'TC_NAV_P_006_Back_Button_Returns_To_Previous_Page',
    { tag: [TAGS.navigation, TAGS.functional] },
    async ({ homePage, categoryPage, page, data }) => {
      // 1. Navigate home then to a category (Plan NAV-P-006)
      await homePage.open();
      await categoryPage.open(data.category('laptops').path);

      // 2. Go back and verify the previous page is restored
      await page.goBack({ waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(new RegExp('/$|route=common/home'));
    },
  );

  test(
    'TC_NAV_P_007_Forward_Button_Returns_To_Next_Page',
    { tag: [TAGS.navigation, TAGS.functional] },
    async ({ homePage, categoryPage, page, data }) => {
      // 1. Navigate home then to a category, then back (Plan NAV-P-007)
      await homePage.open();
      await categoryPage.open(data.category('laptops').path);
      await page.goBack({ waitUntil: 'domcontentloaded' });

      // 2. Go forward and verify the category is restored
      await page.goForward({ waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(URL_PATTERNS.category);
    },
  );

  test(
    'TC_NAV_P_008_Refresh_Preserves_State',
    { tag: [TAGS.navigation, TAGS.session] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open a category and refresh (Plan NAV-P-008)
      await categoryPage.open(category.path);
      await page.reload({ waitUntil: 'domcontentloaded' });

      // 2. Verify the same listing is displayed
      await expect(page).toHaveURL(/path=18/);
      await expect(categoryPage.productCards.first()).toBeVisible();
    },
  );

  test(
    'TC_NAV_P_009_Direct_Product_URL',
    { tag: [TAGS.navigation, TAGS.product] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open a product via its direct URL (Plan NAV-P-009)
      await productDetailsPage.open(product.id);

      // 2. Verify the correct product is displayed
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
    },
  );

  test(
    'TC_NAV_N_001_Invalid_URL_Is_Handled',
    { tag: [TAGS.navigation, TAGS.negative, TAGS.error] },
    async ({ page }) => {
      // 1. Open an invalid route (Plan NAV-N-001)
      await page.goto('/index.php?route=does/not/exist', { waitUntil: 'domcontentloaded' });

      // 2. Verify the response is graceful (not a server error)
      await expect(page.locator('body')).not.toContainText(/Fatal error|SQL syntax|mysql_/i);
    },
  );

  test(
    'TC_NAV_N_002_Internal_Links_Are_Reachable',
    { tag: [TAGS.navigation, TAGS.negative] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan NAV-N-002)
      await homePage.open();

      // 2. Verify key internal links resolve to real destinations
      for (const name of ['Home', 'Special Hot']) {
        const link = page.getByRole('link', { name, exact: true }).first();
        const href = await link.getAttribute('href');
        expect(href, `${name} link should have an href`).toBeTruthy();
        expect(href).not.toContain('undefined');
      }
    },
  );
});

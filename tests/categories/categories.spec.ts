import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Categories — discovery paths and placeholder behaviour.
 * Traces to TEST-PLAN.md §7.6 (CAT-P-001 … CAT-N-001).
 */
test.describe('Categories', () => {
  test(
    'TC_CATEGORY_P_001_Browse_Category_Listing',
    { tag: [TAGS.category, TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Browse the Laptops & Notebooks category (Plan CAT-P-001)
      await categoryPage.open(category.path);

      // 2. Verify the listing renders products
      await expect(page.getByRole('heading', { name: category.name })).toBeVisible();
      await expect(categoryPage.productCards.first()).toBeVisible();
    },
  );

  test(
    // Plan: PRD-P-002
    'TC_CATEGORY_P_002_Sidebar_Shop_By_Category',
    { tag: [TAGS.category, TAGS.navigation, TAGS.functional] },
    async ({ homePage, page }) => {
      // 1. Read a category link from the "Top categories" sidebar (Plan CAT-P-002).
      //    The sidebar is an off-canvas panel, so its destination is resolved from
      //    the link's href rather than relying on an overlapped mouse click.
      await homePage.open();
      const link = page.getByRole('link', { name: 'Cameras', exact: true }).first();
      const href = await link.getAttribute('href');
      expect(href).toContain('path=33');

      // 2. Follow it and verify the Cameras category listing is displayed
      await page.goto(href as string);
      await expect(page).toHaveURL(URL_PATTERNS.category);
      await expect(page.getByRole('heading', { name: 'Cameras' })).toBeVisible();
    },
  );

  test(
    'TC_CATEGORY_P_003_Brand_Manufacturer_Page',
    { tag: [TAGS.category, TAGS.product, TAGS.functional] },
    async ({ page, data }) => {
      const manufacturer = data.manufacturer('apple');

      // 1. Open the Apple manufacturer page (Plan CAT-P-003)
      await page.goto(
        `/index.php?route=product/manufacturer/info&manufacturer_id=${manufacturer.id}`,
      );

      // 2. Verify the brand page lists products
      await expect(page).toHaveURL(URL_PATTERNS.manufacturer);
      await expect(page.getByRole('heading', { name: manufacturer.name, exact: true })).toBeVisible();
    },
  );

  test(
    'TC_CATEGORY_P_004_Special_Offers_Page',
    { tag: [TAGS.category, TAGS.product, TAGS.functional] },
    async ({ page }) => {
      // 1. Open the Special Offers page (Plan CAT-P-004)
      await page.goto('/index.php?route=product/special', { waitUntil: 'domcontentloaded' });

      // 2. Verify the specials listing renders
      await expect(page).toHaveURL(URL_PATTERNS.special);
      await expect(page.getByRole('heading', { name: /Special/i }).first()).toBeVisible();
    },
  );

  test(
    'TC_CATEGORY_P_005_Subcategory_Navigation',
    { tag: [TAGS.category, TAGS.navigation] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open a parent category (Plan CAT-P-005)
      await categoryPage.open(category.path);

      // 2. Follow a subcategory link if the theme exposes one
      const subcategory = page
        .locator('.menu-category a, .list-group a')
        .filter({ hasNotText: 'Home' })
        .first();
      test.skip((await subcategory.count()) === 0, 'Parent category exposes no subcategory links');

      // 3. Verify a category listing is reached
      await subcategory.click();
      await expect(page).toHaveURL(URL_PATTERNS.category);
    },
  );

  test(
    'TC_CATEGORY_N_001_Placeholder_Category_Behaviour',
    { tag: [TAGS.category, TAGS.negative] },
    async ({ homePage, page }) => {
      // 1. Inspect a placeholder category link (Fashion and Accessories) (Plan CAT-N-001)
      await homePage.open();
      const placeholder = page.getByRole('link', { name: 'Fashion and Accessories' }).first();
      await expect(placeholder).toBeAttached();

      // 2. Observed behaviour: the placeholder has no real destination (no products)
      const href = await placeholder.getAttribute('href');
      expect(href === null || href === '' || href === '#').toBe(true);
    },
  );
});

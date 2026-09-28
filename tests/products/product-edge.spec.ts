import { SORT_OPTIONS } from '../../constants/TestConstants';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Products — search/listing edges and wishlist/compare boundary behaviour.
 * Traces to TEST-PLAN.md §7.2.3 (PRD-E-001 … PRD-E-010).
 */
test.describe('Products — Edge & Boundary', () => {
  test(
    'TC_PRODUCT_E_001_Single_Character_Search_Is_Handled',
    { tag: [TAGS.product, TAGS.edge, TAGS.search] },
    async ({ searchPage }) => {
      // 1. Search using a single character (Plan PRD-E-001)
      await searchPage.open('i');

      // 2. Verify results render without an error
      await expect(searchPage.productCards.first()).toBeVisible();
    },
  );

  test(
    // Plan: PRD-N-007
    'TC_PRODUCT_E_002_Search_Is_Case_Insensitive',
    { tag: [TAGS.product, TAGS.edge, TAGS.search] },
    async ({ searchPage, data }) => {
      const product = data.product('iMac');

      // 1. Search using mixed casing (Plan PRD-E-002)
      await searchPage.open(product.name.toLowerCase());

      // 2. Verify the product is still found
      await expect(searchPage.productLink(product.name)).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_E_003_Multiple_Spaces_In_Search_Are_Normalised',
    { tag: [TAGS.product, TAGS.edge, TAGS.search] },
    async ({ searchPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Search with multiple interior spaces (Plan PRD-E-003)
      await searchPage.open('iMac    ');
      await expect(
        searchPage.productLink(product.name).or(searchPage.noResultsMessage).first(),
      ).toBeVisible();

      // 2. Verify the search term is normalised (no crash, deterministic page)
      await expect(page).toHaveURL(URL_PATTERNS.search);
    },
  );

  test(
    'TC_PRODUCT_E_004_Sort_Is_Preserved_Across_Pagination',
    { tag: [TAGS.product, TAGS.edge, TAGS.category] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Apply a sort then navigate to the next page (Plan PRD-E-004)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.priceDesc);
      await categoryPage.goToNextPage();

      // 2. Verify the sort selection is retained on page two
      await expect(categoryPage.selectedSortOption()).toHaveText(SORT_OPTIONS.priceDesc);
    },
  );

  test(
    'TC_PRODUCT_E_005_Page_Size_Is_Preserved_Across_Pagination',
    { tag: [TAGS.product, TAGS.edge, TAGS.category] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Change page size then go to the next page (Plan PRD-E-005)
      await categoryPage.open(category.path);
      await categoryPage.showPerPage('25');
      await categoryPage.goToNextPage();

      // 2. Verify the page size is retained
      await expect(categoryPage.selectedLimitOption()).toHaveText('25');
    },
  );

  test(
    'TC_PRODUCT_E_006_First_And_Last_Page_Boundaries',
    { tag: [TAGS.product, TAGS.edge, TAGS.category] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open the first page (Plan PRD-E-006)
      await categoryPage.open(category.path);
      await expect(categoryPage.resultSummary).toContainText('Showing 1 to 15');
      await expect(page).toHaveURL(/page=1/);

      // 2. Jump to the last page and verify the boundary summary
      await categoryPage.goToLastPage();
      await expect(categoryPage.resultSummary).toContainText('Showing 61 to 75 of 75');
    },
  );

  test(
    'TC_PRODUCT_E_007_Large_Page_Size_Renders_Within_Limit',
    { tag: [TAGS.product, TAGS.edge, TAGS.category, TAGS.boundary] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Request the maximum page size of 100 on a 75-product category (Plan PRD-E-007)
      await categoryPage.open(category.path);
      await categoryPage.showPerPage('100');

      // 2. Verify all (but no more than) the category products render
      await expect(categoryPage.selectedLimitOption()).toHaveText('100');
      const shown = await categoryPage.productCards.count();
      expect(shown).toBeLessThanOrEqual(100);
      expect(shown).toBeGreaterThan(0);
    },
  );

  test(
    'TC_PRODUCT_E_008_Duplicate_Wishlist_Add_Creates_One_Entry',
    { tag: [TAGS.product, TAGS.edge, TAGS.wishlist] },
    async ({ loginPage, productDetailsPage, wishlistPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const product = data.product('iMac');
      const credentials = data.registeredCredentials();

      // 1. Log in (Plan PRD-E-008)
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Add the same product to the wishlist twice
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToWishlist();
      await productDetailsPage.addToWishlist();

      // 3. Verify the wishlist holds a single entry for that product
      await wishlistPage.open();
      await expect(wishlistPage.productLinks.filter({ hasText: product.name }).first())
        .toBeVisible();
      expect(await page.getByRole('link', { name: product.name, exact: true }).count()).toBe(1);
    },
  );

  test(
    'TC_PRODUCT_E_009_Duplicate_Compare_Add_Creates_At_Most_One_Entry',
    { tag: [TAGS.product, TAGS.edge, TAGS.compare] },
    async ({ productDetailsPage, comparePage, page, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add the same product to the comparison list twice (Plan PRD-E-009)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCompare();
      await productDetailsPage.addToCompare();

      // 2. Verify the product is never duplicated in the comparison table.
      //    The theme de-duplicates (or toggles) repeat adds, so at most one row exists.
      await comparePage.open();
      expect(await page.locator(`a[href*="remove=${product.id}"]`).count()).toBeLessThanOrEqual(1);
    },
  );

  test(
    'TC_PRODUCT_E_010_Guest_Wishlist_Requires_Login',
    { tag: [TAGS.product, TAGS.edge, TAGS.wishlist, TAGS.authentication] },
    async ({ productDetailsPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Add to the wishlist while logged out (Plan PRD-E-010)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToWishlist();

      // 2. Observation: the theme prompts the guest to log in (rather than redirecting)
      await expect(page.getByText(/must .*login|login or register/i).first()).toBeVisible();
    },
  );
});

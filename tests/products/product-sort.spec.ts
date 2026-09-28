import { SORT_OPTIONS, SHOW_LIMITS } from '../../constants/TestConstants';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Products — sort, pagination and page-size controls.
 * Traces to TEST-PLAN.md §7.2.1 (PRD-P-020 … PRD-P-026).
 */
test.describe('Products — Sort & Pagination', () => {
  test(
    'TC_PRODUCT_020_Sort_By_Rating_Highest',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by rating, highest first (Plan PRD-P-020)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.ratingHighest);

      // 2. Verify the selection is applied and results render
      await expect(categoryPage.selectedSortOption()).toHaveText(SORT_OPTIONS.ratingHighest);
      await expect(categoryPage.productCards.first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_021_Sort_By_Model_A_To_Z',
    { tag: [TAGS.product, TAGS.functional] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by model (A - Z) (Plan PRD-P-021)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.modelAsc);

      // 2. Verify the selection is applied and results render
      await expect(categoryPage.selectedSortOption()).toHaveText(SORT_OPTIONS.modelAsc);
      await expect(categoryPage.productCards.first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_022_Sort_By_Newest',
    { tag: [TAGS.product, TAGS.functional] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by newest first (Plan PRD-P-022)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.newest);

      // 2. Verify the selection is applied and results render
      await expect(categoryPage.selectedSortOption()).toHaveText(SORT_OPTIONS.newest);
      await expect(categoryPage.productCards.first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_023_Next_Page_Control',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open the listing and advance to the next page (Plan PRD-P-023)
      await categoryPage.open(category.path);
      await categoryPage.goToNextPage();

      // 2. Verify page two is displayed
      await expect(page).toHaveURL(/page=2/);
      await expect(categoryPage.resultSummary).toContainText('Showing 16 to 30');
    },
  );

  test(
    'TC_PRODUCT_024_Last_Page_Control',
    { tag: [TAGS.product, TAGS.functional] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Jump straight to the last page (Plan PRD-P-024)
      await categoryPage.open(category.path);
      await categoryPage.goToLastPage();

      // 2. Verify the final page shows the remaining products
      await expect(page).toHaveURL(/page=5/);
      await expect(categoryPage.resultSummary).toContainText('Showing 61 to 75 of 75');
    },
  );

  test(
    'TC_PRODUCT_025_Numbered_Pagination',
    { tag: [TAGS.product, TAGS.functional] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Navigate directly to page three via its number (Plan PRD-P-025)
      await categoryPage.open(category.path);
      await categoryPage.goToPage(3);

      // 2. Verify page three is displayed
      await expect(page).toHaveURL(/page=3/);
    },
  );

  test(
    'TC_PRODUCT_026_Show_Per_Page_Limit',
    { tag: [TAGS.product, TAGS.functional, TAGS.boundary] },
    async ({ categoryPage, data }) => {
      test.setTimeout(90_000);
      const category = data.category('laptops');
      const limits = [
        SHOW_LIMITS.twentyFive,
        SHOW_LIMITS.fifty,
        SHOW_LIMITS.seventyFive,
        SHOW_LIMITS.hundred,
      ];

      // 1. Open the listing (Plan PRD-P-026)
      await categoryPage.open(category.path);

      // 2. For each page-size option, verify the rendered page respects the limit
      for (const limit of limits) {
        await categoryPage.showPerPage(limit);
        await expect(categoryPage.selectedLimitOption()).toHaveText(limit);
        const shown = await categoryPage.productCards.count();
        expect(shown, `limit ${limit} should render a positive, bounded count`).toBeGreaterThan(0);
        expect(shown).toBeLessThanOrEqual(Number(limit));
      }
    },
  );
});

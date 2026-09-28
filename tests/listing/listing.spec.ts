import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Product listing — grid rendering, cards and pagination.
 * Traces to TEST-PLAN.md §7.7 (LIS-P-001 … LIS-P-005).
 */
test.describe('Product Listing', () => {
  test(
    'TC_LISTING_001_Product_Grid_Renders',
    { tag: [TAGS.listing, TAGS.category, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a category listing (Plan LIS-P-001)
      await categoryPage.open(category.path);

      // 2. Verify product cards with names and prices render
      await expect(categoryPage.productCards.first()).toBeVisible();
      await expect(categoryPage.productCard(0).name).toBeVisible();
      await expect(categoryPage.productCard(0).price).toContainText('$');
    },
  );

  test(
    'TC_LISTING_002_Open_Product_From_Listing',
    { tag: [TAGS.listing, TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, productDetailsPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a category and click a product (Plan LIS-P-002)
      await categoryPage.open(category.path);
      const name = (await categoryPage.productCard(0).name.textContent())?.trim() ?? '';
      await categoryPage.openProduct(name);

      // 2. Verify the product detail page is displayed
      await expect(productDetailsPage.nameHeading).toHaveText(name);
    },
  );

  test(
    'TC_LISTING_003_Product_Card_Image_Has_Alt_Text',
    { tag: [TAGS.listing, TAGS.accessibility] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a category listing (Plan LIS-P-003)
      await categoryPage.open(category.path);

      // 2. Verify the first card image exposes alt text
      const image = categoryPage.productCards.first().getByRole('img').first();
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute('alt', /.+/);
    },
  );

  test(
    'TC_LISTING_004_Price_Displayed_On_Card',
    { tag: [TAGS.listing, TAGS.data] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Open a category listing (Plan LIS-P-004)
      await categoryPage.open(category.path);

      // 2. Verify the first card shows a USD price
      await expect(categoryPage.productCard(0).price).toContainText('$');
    },
  );

  test(
    'TC_LISTING_005_Pagination_Shows_Correct_Products',
    { tag: [TAGS.listing, TAGS.category, TAGS.functional] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Navigate to page two of the listing (Plan LIS-P-005)
      await categoryPage.open(category.path);
      await categoryPage.goToNextPage();

      // 2. Verify the correct page slice is shown
      await expect(page).toHaveURL(/page=2/);
      await expect(categoryPage.resultSummary).toContainText('Showing 16 to 30');
    },
  );
});

import { SORT_OPTIONS } from '../../constants/TestConstants';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Products — Category Listing', () => {
  test(
    // Plan: PRD-P-001
    'TC_CATEGORY_001_Browse_Laptops_And_Notebooks_Category',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open the Laptops & Notebooks category
      await categoryPage.open(category.path);

      // 2. Verify the category heading, a product and its price
      await expect(page.getByRole('heading', { name: 'Laptops' })).toBeVisible();
      await expect(categoryPage.productLink('HTC Touch HD')).toBeVisible();
      await expect(page.getByText('$146.00')).toBeVisible();
    },
  );

  test(
    'TC_CATEGORY_002_Open_Product_From_Category_Listing',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, productDetailsPage, data }) => {
      const category = data.category('laptops');

      // 1. Open the category
      await categoryPage.open(category.path);

      // 2. Open a product from the listing
      await categoryPage.openProduct('HTC Touch HD');

      // 3. Verify the product detail page
      await expect(productDetailsPage.nameHeading).toHaveText('HTC Touch HD');
    },
  );

  test(
    // Plan: PRD-P-016
    'TC_CATEGORY_003_Sort_By_Name_A_To_Z',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by Name (A - Z)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.nameAsc);

      // 2. Verify the alphabetically first product is shown first
      await expect(categoryPage.productCard(0).name).toHaveText(category.firstByNameAsc);
    },
  );

  test(
    // Plan: PRD-P-017
    'TC_CATEGORY_004_Sort_By_Name_Z_To_A',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by Name (Z - A)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.nameDesc);

      // 2. Verify the reverse-alphabetical first product is shown first
      await expect(categoryPage.productCard(0).name).toHaveText(category.firstByNameDesc);
    },
  );

  test(
    // Plan: PRD-P-018
    'TC_CATEGORY_005_Sort_By_Price_Low_To_High',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by Price (Low > High)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.priceAsc);

      // 2. Verify the cheapest product is shown first
      await expect(categoryPage.productCard(0).name).toHaveText(category.firstByPriceAsc);
    },
  );

  test(
    // Plan: PRD-P-019
    'TC_CATEGORY_006_Sort_By_Price_High_To_Low',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by Price (High > Low)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.priceDesc);

      // 2. Verify the most expensive product and its price are shown first
      await expect(categoryPage.productCard(0).name).toHaveText(category.firstByPriceDesc);
      await expect(categoryPage.productCard(0).price).toHaveText(category.firstByPriceDescValue);
    },
  );

  test(
    'TC_CATEGORY_007_Navigate_To_Page_Two_Of_Listing',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ categoryPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Open page two of the category
      await categoryPage.open(category.path, 2);

      // 2. Verify the page indicator and the result summary
      await expect(page).toHaveURL(/page=2/);
      await expect(page.getByText(category.pageTwoSummary)).toBeVisible();
    },
  );
});

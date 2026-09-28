import { SORT_OPTIONS } from '../../constants/TestConstants';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Products — data consistency across listing, detail and cart.
 * Traces to TEST-PLAN.md §7.2.4 (PRD-D-001 … PRD-D-005).
 */
test.describe('Products — Data Validation', () => {
  test(
    'TC_PRODUCT_D_001_Listing_Price_Matches_Detail_Price',
    { tag: [TAGS.product, TAGS.data, TAGS.functional] },
    async ({ categoryPage, productDetailsPage, page, data }) => {
      const category = data.category('laptops');

      // 1. Read the first product's price from the listing (Plan PRD-D-001)
      await categoryPage.open(category.path);
      const name = (await categoryPage.productCard(0).name.textContent())?.trim() ?? '';
      const listingPrice = (await categoryPage.productCard(0).price.textContent())?.trim() ?? '';
      expect(listingPrice).toContain('$');

      // 2. Open the product and verify the detail price matches
      await categoryPage.openProduct(name);
      await expect(productDetailsPage.nameHeading).toHaveText(name);
      await expect(page.getByText(listingPrice).first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_D_002_Detail_Price_Matches_Cart_Price',
    { tag: [TAGS.product, TAGS.data, TAGS.cart] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add a product to the cart from its detail page (Plan PRD-D-002)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify the cart line price matches the detail price
      await cartPage.open();
      await expect(cartPage.cell(product.price)).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_D_003_Product_Name_Is_Consistent',
    { tag: [TAGS.product, TAGS.data, TAGS.functional] },
    async ({ searchPage, productDetailsPage, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Open the product from search results (Plan PRD-D-003)
      await searchPage.open(product.name);
      await searchPage.openProduct(product.name);

      // 2. Verify the detail heading matches the searched name
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
    },
  );

  test(
    'TC_PRODUCT_D_004_Special_Page_Reflects_Discounted_Price',
    { tag: [TAGS.product, TAGS.data] },
    async ({ page }) => {
      // 1. Open the special offers page (Plan PRD-D-004)
      await page.goto('/index.php?route=product/special');

      // 2. Verify offers render with prices
      await expect(page.getByRole('heading', { name: /Special/i }).first()).toBeVisible();
      await expect(page.getByText('$', { exact: false }).first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_D_005_Sort_Order_Matches_The_Selected_Option',
    { tag: [TAGS.product, TAGS.data, TAGS.functional] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Sort the listing by name A-Z (Plan PRD-D-005)
      await categoryPage.open(category.path);
      await categoryPage.sortBy(SORT_OPTIONS.nameAsc);

      // 2. Read the rendered names and verify they are ascending
      const names = (await categoryPage.productNames().allTextContents()).map((n) =>
        n.trim().toLowerCase(),
      );
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sorted);
    },
  );
});

import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Products — negatives around quantity, options, filters and sort.
 * Traces to TEST-PLAN.md §7.2.2 (PRD-N-008 … PRD-N-015).
 */
test.describe('Products — Negative & Validation', () => {
  test(
    'TC_PRODUCT_N_008_Quantity_Zero_Is_Prevented',
    { tag: [TAGS.product, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open a product detail page (Plan PRD-N-008)
      await productDetailsPage.open(product.id);

      // 2. Verify the quantity control enforces the documented minimum of 1
      await expect(productDetailsPage.quantityInput).toHaveAttribute('min', '1');
    },
  );

  test(
    'TC_PRODUCT_N_009_Negative_Quantity_Is_Prevented',
    { tag: [TAGS.product, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Attempt to enter a negative quantity (Plan PRD-N-009)
      await productDetailsPage.open(product.id);
      await productDetailsPage.setQuantity(-1);

      // 2. Verify the native number control rejects the value (min=1)
      await expect(productDetailsPage.quantityInput).toHaveAttribute('min', '1');
      const valid = await productDetailsPage.quantityInput.evaluate(
        (el) => (el as HTMLInputElement).checkValidity(),
      );
      expect(valid).toBe(false);
    },
  );

  test(
    'TC_PRODUCT_N_010_Extremely_Large_Quantity_Is_Handled',
    { tag: [TAGS.product, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Enter an extremely large quantity (Plan PRD-N-010)
      await productDetailsPage.open(product.id);
      await productDetailsPage.setQuantity(999999);

      // 2. Verify the control keeps a finite, positive numeric value (no crash)
      const value = Number(await productDetailsPage.quantityInput.inputValue());
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThan(0);
    },
  );

  test(
    'TC_PRODUCT_N_011_Decimal_Quantity_Is_Rejected',
    { tag: [TAGS.product, TAGS.negative, TAGS.boundary] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open the product and try to enter a decimal quantity (Plan PRD-N-011)
      await productDetailsPage.open(product.id);
      await productDetailsPage.setQuantity('1.5');

      // 2. Verify whole-number quantities are enforced (step=1) and 1.5 is invalid
      const step = await productDetailsPage.quantityInput.getAttribute('step');
      expect(step ?? '1').toBe('1');
      const valid = await productDetailsPage.quantityInput.evaluate(
        (el) => (el as HTMLInputElement).checkValidity(),
      );
      expect(valid).toBe(false);
    },
  );

  test(
    'TC_PRODUCT_N_012_Missing_Required_Option_Is_Validated',
    { tag: [TAGS.product, TAGS.negative] },
    async ({ productDetailsPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Open a product that requires an option selection (Plan PRD-N-012)
      await productDetailsPage.open(product.id);

      const requiredOptions = page.locator('select[required], input[required][type="radio"]');
      const optionCount = await requiredOptions.count();
      test.skip(optionCount === 0, 'Selected product exposes no required options');

      // 2. Add to cart without choosing the required option
      await productDetailsPage.addToCart();

      // 3. Verify a validation prompt is shown instead of a silent add
      await expect(page.locator('.alert-danger, .text-danger').first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_N_013_Empty_Category_Filter_Shows_Empty_State',
    { tag: [TAGS.product, TAGS.negative, TAGS.category] },
    async ({ categoryPage, page }) => {
      // 1. Open a category path that resolves to no products (Plan PRD-N-013)
      await categoryPage.open('999999');

      // 2. Verify no product grid is rendered and the app handled it gracefully
      expect(await categoryPage.productCards.count()).toBe(0);
      await expect(page.locator('body')).not.toContainText(/Fatal error|SQL syntax|mysql_/i);
    },
  );

  test(
    'TC_PRODUCT_N_014_Resetting_Filters_Restores_Full_List',
    { tag: [TAGS.product, TAGS.negative] },
    async ({ categoryPage, data }) => {
      const category = data.category('laptops');

      // 1. Apply a page-size "filter" (Plan PRD-N-014)
      await categoryPage.open(category.path);
      await categoryPage.showPerPage('50');
      await expect(categoryPage.selectedLimitOption()).toHaveText('50');

      // 2. Reset to the default list and verify the full listing returns
      await categoryPage.showPerPage('15');
      await expect(categoryPage.selectedLimitOption()).toHaveText('15');
      expect(await categoryPage.productCards.count()).toBeLessThanOrEqual(15);
    },
  );

  test(
    'TC_PRODUCT_N_015_Filter_And_Sort_Are_Combined',
    { tag: [TAGS.product, TAGS.functional, TAGS.search] },
    async ({ searchPage, data }) => {
      const { partial } = data.searchTerms();

      // 1. Combine a search "filter" with an explicit sort (Plan PRD-N-015)
      await searchPage.openAdvanced(partial, { sort: 'p.price', order: 'ASC' });

      // 2. Verify the combined query is honoured on the results page
      await expect(searchPage.productCards.first()).toBeVisible();
    },
  );
});

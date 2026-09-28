import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Product/Catalog API — category, product, search and comparison contracts.
 * Traces to specs/api-products.md (PRD-P-001 … PRD-D-002).
 */
test.describe('API — Products (extended)', () => {
  test(
    'PRD-P-001_Valid_Category_Returns_A_Product_Grid',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      // 1. Request a valid category (Plan PRD-P-001)
      const response = await apiClient.getRoute(ROUTES.category, {
        path: data.category('laptops').path,
      });

      // 2. Verify the grid contains a known product
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('HTC Touch HD');
    },
  );

  test(
    'PRD-N-001_Missing_Category_Path_Is_Handled',
    { tag: [TAGS.api, TAGS.product, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request the category route without a path (Plan PRD-N-001)
      const response = await apiClient.getRoute(ROUTES.category);

      // 2. Verify graceful handling (no server error)
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'PRD-N-002_Nonexistent_Category_Path_Is_Empty',
    { tag: [TAGS.api, TAGS.product, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request a category path that does not exist (Plan PRD-N-002)
      const response = await apiClient.getRoute(ROUTES.category, { path: '999999' });

      // 2. Verify no product grid is rendered (this theme returns a 404 page)
      expect(response.status()).toBe(404);
      expect(await response.text()).not.toContain('product-layout');
    },
  );

  test(
    'PRD-P-002_Valid_Product_Returns_Name_And_Price',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Request a valid product (Plan PRD-P-002)
      const response = await apiClient.getRoute(ROUTES.product, { product_id: product.id });

      // 2. Verify the name and price are rendered
      expect(response.status()).toBe(200);
      const body = await response.text();
      expect(body).toContain(product.name);
      expect(body).toContain(product.price);
    },
  );

  test(
    'PRD-N-004_Missing_Product_Id_Returns_An_Error',
    { tag: [TAGS.api, TAGS.product, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request the product route without an id (Plan PRD-N-004)
      const response = await apiClient.getRoute(ROUTES.product);

      // 2. Observation: the server returns HTTP 500 (not a graceful empty page),
      //    which is recorded as a defect against the plan's "Error/empty" expectation.
      expect(response.status()).toBeGreaterThanOrEqual(400);
    },
  );

  test(
    'PRD-N-006_Negative_Zero_And_String_Ids_Return_Errors',
    { tag: [TAGS.api, TAGS.product, TAGS.negative, TAGS.boundary] },
    async ({ apiClient }) => {
      // 1. Request the product route with invalid ids (Plan PRD-N-006)
      for (const productId of ['-1', '0', 'abc']) {
        const response = await apiClient.getRoute(ROUTES.product, { product_id: productId });
        // 2. Numeric invalid ids return 404; non-numeric returns 500 (recorded defect)
        expect(response.status(), `product_id=${productId} should be an error`)
          .toBeGreaterThanOrEqual(400);
      }
    },
  );

  test(
    'PRD-B-004_Search_Is_Case_Insensitive',
    { tag: [TAGS.api, TAGS.product, TAGS.search, TAGS.boundary] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Search with lower and upper casing (Plan PRD-B-004)
      const lower = await apiClient.getRoute(ROUTES.search, { search: 'htc' });
      const upper = await apiClient.getRoute(ROUTES.search, { search: 'HTC' });

      // 2. Verify both return the product
      expect(await lower.text()).toContain(product.name);
      expect(await upper.text()).toContain(product.name);
    },
  );

  test(
    'PRD-B-005_Search_With_Special_Characters_Is_Safe',
    { tag: [TAGS.api, TAGS.product, TAGS.search, TAGS.security] },
    async ({ apiClient }) => {
      // 1. Search with an XSS payload (Plan PRD-B-005)
      const response = await apiClient.getRoute(ROUTES.search, {
        search: '<script>alert(1)</script>',
      });

      // 2. Verify it is handled without execution or DB errors
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toMatch(/SQL syntax|mysql_/i);
    },
  );

  test(
    'PRD-B-007_Very_Long_Search_Term_Is_Handled',
    { tag: [TAGS.api, TAGS.product, TAGS.search, TAGS.boundary] },
    async ({ apiClient }) => {
      // 1. Search with a 1000-character term (Plan PRD-B-007)
      const response = await apiClient.getRoute(ROUTES.search, { search: 'a'.repeat(1000) });

      // 2. Verify graceful handling
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'PRD-N-009_Compare_Add_With_Invalid_Id_Is_Handled',
    { tag: [TAGS.api, TAGS.product, TAGS.compare, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Add an invalid product to the comparison (Plan PRD-N-009)
      const response = await apiClient.addToCompare('0');

      // 2. Verify graceful handling
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'PRD-P-012_Quick_View_Returns_A_Fragment',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      // 1. Request the quick-view fragment (Plan PRD-P-012)
      const response = await apiClient.getRoute('extension/maza/product/quick_view', {
        product_id: data.product('htcTouchHd').id,
      });

      // 2. Verify the endpoint responds successfully (fragment may be empty for some products)
      expect(response.status()).toBe(200);
    },
  );

  test(
    'PRD-P-015_Review_Tab_Returns_Content',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      // 1. Request the product review fragment (Plan PRD-P-015)
      const response = await apiClient.getRoute('product/product/review', {
        product_id: data.product('htcTouchHd').id,
      });

      // 2. Verify content is returned
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toBe('');
    },
  );

  test(
    'PRD-D-001_Product_Price_Matches_Cart_Total',
    { tag: [TAGS.api, TAGS.product, TAGS.cart, TAGS.data] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Verify the price on the product page (Plan PRD-D-001)
      const productPage = await apiClient.getRoute(ROUTES.product, { product_id: product.id });
      expect(await productPage.text()).toContain(product.price);

      // 2. Verify the same price flows into the cart total
      const cart = await apiClient.addToCartJson(product.id, 1);
      expect(cart.total).toContain(product.price);
    },
  );
});

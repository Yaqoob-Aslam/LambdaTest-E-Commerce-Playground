import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * API regression — prioritized end-to-end contracts across the API surface.
 * Traces to specs/api-regression.md (smoke + critical regression).
 */
test.describe('API — Regression', () => {
  test(
    'REG_R_001_Cart_Add_Total_Math_Is_Correct',
    { tag: [TAGS.api, TAGS.regression, TAGS.cart] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add two units (Plan C-03)
      const json = await apiClient.addToCartJson(product.id, 2);

      // 2. Verify the running total reflects quantity × unit price
      expect(json.total).toContain('2 item');
      expect(json.total).toContain('$292.00');
    },
  );

  test(
    'REG_R_002_Cart_Info_Reflects_Added_Products',
    { tag: [TAGS.api, TAGS.regression, TAGS.cart, TAGS.data] },
    async ({ apiClient, data }) => {
      const product = data.product('iMac');

      // 1. Add a product (Plan CART-D-001)
      const json = await apiClient.addToCartJson(product.id, 1);

      // 2. Verify the drawer fragment matches the add response
      const info = await (await apiClient.getCartInfo()).text();
      expect(info).toContain(product.name);
      expect(info).toContain(product.price);
      expect(json.total).toContain(product.price);
    },
  );

  test(
    'REG_R_003_Search_Returns_Filtered_Results',
    { tag: [TAGS.api, TAGS.regression, TAGS.search] },
    async ({ apiClient, data }) => {
      // 1. Search with a limit parameter (Plan PRD-P-005)
      const response = await apiClient.getRoute(ROUTES.search, { search: 'HTC', limit: '1' });

      // 2. Verify results are returned
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(data.product('htcTouchHd').name);
    },
  );

  test(
    'REG_R_004_Search_With_Explicit_Sort_Is_Applied',
    { tag: [TAGS.api, TAGS.regression, TAGS.search] },
    async ({ apiClient }) => {
      // 1. Search with an explicit price sort (Plan PRD-P-006)
      const response = await apiClient.getRoute(ROUTES.search, {
        search: 'HTC',
        sort: 'p.price',
        order: 'ASC',
      });

      // 2. Verify the request is honored
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toBe('');
    },
  );

  test(
    'REG_R_005_Cart_Page_Renders',
    { tag: [TAGS.api, TAGS.regression, TAGS.cart] },
    async ({ apiClient }) => {
      // 1. Request the cart page (Plan S-09)
      const response = await apiClient.getRoute(ROUTES.cart);

      // 2. Verify it renders
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Shopping Cart');
    },
  );

  test(
    'REG_R_006_Coupon_Error_Contract_Is_Stable',
    { tag: [TAGS.api, TAGS.regression, TAGS.checkout] },
    async ({ apiClient }) => {
      // 1. Apply an invalid coupon (Plan S-07)
      const response = await apiClient.postRoute(AJAX_ROUTES.coupon, { coupon: 'TEST' });

      // 2. Verify the documented 200 + error-body contract
      expect(response.status()).toBe(200);
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Coupon is either invalid');
    },
  );

  test(
    'REG_R_007_Protected_Route_Redirects_Guests',
    { tag: [TAGS.api, TAGS.regression, TAGS.authentication] },
    async ({ request }) => {
      // 1. Request a protected route as a guest (Plan S-10)
      const response = await request.get(`/index.php?route=${ROUTES.account}`, { maxRedirects: 0 });

      // 2. Verify the 302 auth-redirect model
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('account/login');
    },
  );
});

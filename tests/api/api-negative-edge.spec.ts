import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Negative & Edge', () => {
  test(
    'NEG-007_Unknown_Product_Id_Returns_404',
    { tag: [TAGS.api, TAGS.negative, TAGS.product] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.product, { product_id: '999999' });
      expect(response.status()).toBe(404);
    },
  );

  test(
    'NEG-018_GET_On_POST_Endpoint_Returns_Empty_Array',
    { tag: [TAGS.api, TAGS.negative, TAGS.cart] },
    async ({ apiClient }) => {
      // Contract deviation: OpenCart does not enforce method (no 405).
      const response = await apiClient.getRoute(AJAX_ROUTES.cartAdd);
      expect(response.status()).toBe(200);
      expect(await response.text()).toBe('[]');
    },
  );

  test(
    'NEG-020_DELETE_PUT_PATCH_Return_Empty_Array',
    { tag: [TAGS.api, TAGS.negative, TAGS.cart] },
    async ({ request }) => {
      for (const method of ['DELETE', 'PUT', 'PATCH'] as const) {
        const response = await request.fetch('/index.php?route=checkout/cart/add', { method });
        expect(response.status(), `${method} should return 200`).toBe(200);
        expect(await response.text(), `${method} should return an empty array`).toBe('[]');
      }
    },
  );

  test(
    'EDGE-002_Search_Special_Characters_Returns_No_Result_State',
    { tag: [TAGS.api, TAGS.negative, TAGS.search] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.search, { search: '!!!@@@###' });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('There is no product that');
    },
  );

  test(
    'EDGE-006_Protected_Route_Redirects_To_Login_Without_Session',
    { tag: [TAGS.api, TAGS.negative, TAGS.authentication] },
    async ({ request }) => {
      const response = await request.get('/index.php?route=account/account', { maxRedirects: 0 });
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('account/login');
    },
  );
});

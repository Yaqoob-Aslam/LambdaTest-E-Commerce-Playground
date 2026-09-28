import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Smoke', () => {
  test(
    'API-SMOKE-001_Home_Route_Returns_Storefront_HTML',
    { tag: [TAGS.api, TAGS.smoke] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.home);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Poco Electro');
    },
  );

  test(
    'API-SMOKE-002_Category_Route_Lists_Products',
    { tag: [TAGS.api, TAGS.smoke, TAGS.product] },
    async ({ apiClient, data }) => {
      const category = data.category('laptops');
      const response = await apiClient.getRoute(ROUTES.category, { path: category.path });
      expect(response.status()).toBe(200);
      const body = await response.text();
      expect(body).toContain('HTC Touch HD');
      expect(body).toContain('$146.00');
    },
  );

  test(
    'API-SMOKE-003_Add_To_Cart_Returns_JSON',
    { tag: [TAGS.api, TAGS.smoke, TAGS.cart] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const response = await apiClient.addToCart(product.id, 1);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      const json = (await response.json()) as { success?: string; total?: string };
      expect(json.success).toContain(product.name);
      expect(json.total).toContain(product.price);
    },
  );

  test(
    'API-SMOKE-004_Login_Page_Contains_Credential_Fields',
    { tag: [TAGS.api, TAGS.smoke, TAGS.authentication] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.login);
      expect(response.status()).toBe(200);
      const body = await response.text();
      expect(body).toContain('input-email');
      expect(body).toContain('input-password');
    },
  );

  test(
    'API-SMOKE-005_Country_Lookup_Returns_United_Kingdom',
    { tag: [TAGS.api, TAGS.smoke, TAGS.checkout] },
    async ({ apiClient }) => {
      const json = await apiClient.countryLookupJson('222');
      expect(json.name).toBe('United Kingdom');
      expect(json.iso_code_2).toBe('GB');
      expect(json.zone.length).toBeGreaterThan(0);
    },
  );
});

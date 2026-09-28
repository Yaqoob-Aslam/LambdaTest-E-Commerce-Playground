import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Checkout & Orders', () => {
  test(
    'CO-P-002_Country_Lookup_Returns_JSON_With_Zones',
    { tag: [TAGS.api, TAGS.checkout, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.countryLookup('222');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      const json = (await response.json()) as {
        country_id: string;
        name: string;
        iso_code_2: string;
        zone: unknown[];
      };
      expect(json.country_id).toBe('222');
      expect(json.name).toBe('United Kingdom');
      expect(Array.isArray(json.zone)).toBeTruthy();
    },
  );

  test(
    'CO-N-009_Invalid_Coupon_Returns_Error_Body',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.applyCoupon('TEST');
      expect(response.status()).toBe(200);
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Coupon is either invalid');
    },
  );

  test(
    'CO-N-010_Empty_Coupon_Returns_Error_Body',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.applyCoupon('');
      expect(response.status()).toBe(200);
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Please enter a coupon code');
    },
  );

  test(
    'CO-N-012_Invalid_Voucher_Returns_Error_Body',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.applyVoucher('BAD');
      expect(response.status()).toBe(200);
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Gift Certificate is either invalid');
    },
  );

  test(
    'CO-N-001_Checkout_With_Empty_Cart_Redirects_To_Cart',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ request }) => {
      const response = await request.get('/index.php?route=checkout/checkout', { maxRedirects: 0 });
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('checkout/cart');
    },
  );

  test(
    'CO-P-003_Checkout_Route_Requires_Session_Items',
    { tag: [TAGS.api, TAGS.checkout, TAGS.functional] },
    async ({ apiClient }) => {
      // Contract: without a session, the checkout route redirects to the cart
      // rather than rendering the checkout form.
      const response = await apiClient.getRoute(ROUTES.checkout);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Shopping Cart');
    },
  );

  test(
    'CO-N-002_Country_Lookup_Without_Id_Still_Returns_Content',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      // Contract deviation: the endpoint returns 200 with a PHP notice rather
      // than a clean error body when `country_id` is omitted.
      const response = await apiClient.getRoute(AJAX_ROUTES.countryLookup);
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toBe('');
    },
  );
});

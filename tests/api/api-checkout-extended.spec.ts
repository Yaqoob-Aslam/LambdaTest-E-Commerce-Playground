import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Checkout/Order API — countries, totals, order save and authorization.
 * Traces to specs/api-checkout-orders.md (CO-P-002 … CO-N-020).
 */
test.describe('API — Checkout (extended)', () => {
  test(
    'CO-P-002_Country_Lookup_Returns_Name_And_Zones',
    { tag: [TAGS.api, TAGS.checkout, TAGS.functional] },
    async ({ apiClient }) => {
      // 1. Look up a valid country (Plan CO-P-002)
      const json = await apiClient.countryLookupJson('222');

      // 2. Verify the schema
      expect(json.name).toBe('United Kingdom');
      expect(json.iso_code_2).toBe('GB');
      expect(Array.isArray(json.zone)).toBe(true);
      expect(json.zone.length).toBeGreaterThan(0);
    },
  );

  test(
    'CO-N-003_Nonexistent_Country_Lookup_Is_Handled',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Look up a country id that does not exist (Plan CO-N-003)
      const response = await apiClient.countryLookup('999999');

      // 2. Verify graceful handling
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CO-P-003_Checkout_Custom_Fields_Are_Served',
    { tag: [TAGS.api, TAGS.checkout, TAGS.functional] },
    async ({ apiClient }) => {
      // 1. Request the checkout custom-field fragment (Plan CO-P-003)
      const response = await apiClient.getRoute('checkout/checkout/customfield', {
        customer_group_id: '1',
      });

      // 2. Verify the endpoint responds
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CO-N-013_Totals_Update_Without_Cart_Is_Handled',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request a totals recalculation with no cart session (Plan CO-N-013)
      const response = await apiClient.postRoute(AJAX_ROUTES.totalUpdate);

      // 2. Verify graceful handling
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CO-N-014_Order_Save_Without_Details_Is_Rejected',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Attempt to place an order with no data (Plan CO-N-014)
      const response = await apiClient.postRoute(AJAX_ROUTES.checkoutSave);

      // 2. Verify no order is created and no server error occurs
      expect(response.status()).toBeLessThan(500);
      expect(await response.text()).not.toMatch(/Order has been placed/i);
    },
  );

  test(
    'CO-N-018_Guest_Order_History_Redirects_To_Login',
    { tag: [TAGS.api, TAGS.checkout, TAGS.authentication, TAGS.negative] },
    async ({ request }) => {
      // 1. Request order history as a guest (Plan CO-N-018)
      const response = await request.get(`/index.php?route=${ROUTES.orderHistory}`, {
        maxRedirects: 0,
      });

      // 2. Verify the redirect to login
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('account/login');
    },
  );

  test(
    'CO-N-019_Nonexistent_Order_Info_Redirects_Guests',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ request }) => {
      // 1. Request order info with a bogus id as a guest (Plan CO-N-019)
      const response = await request.get(
        `/index.php?route=${ROUTES.orderInfo}&order_id=999999`,
        { maxRedirects: 0 },
      );

      // 2. Verify the guest is redirected to login (auth enforced)
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('account/login');
    },
  );

  test(
    'CO-N-020_Order_Tracking_With_Invalid_Details_Is_Handled',
    { tag: [TAGS.api, TAGS.checkout, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request tracking with details that cannot match (Plan CO-N-020)
      const response = await apiClient.getRoute(ROUTES.tracking, {
        order_id: '999999',
        email: 'nobody@example.com',
      });

      // 2. Verify a handled response (this theme resolves tracking to 404)
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CO-N-016_Coupon_Error_Contract_Is_Stable',
    { tag: [TAGS.api, TAGS.checkout, TAGS.data] },
    async ({ apiClient }) => {
      // 1. Apply an invalid coupon (Plan CO-N-016 / API §7 error contract)
      const response = await apiClient.applyCoupon('NOPE');

      // 2. Verify HTTP 200 + JSON error-body contract
      expect(response.status()).toBe(200);
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Coupon is either invalid');
    },
  );
});

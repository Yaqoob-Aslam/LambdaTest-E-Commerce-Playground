import type { ApiClient } from '../../api';
import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/** Extract the active cart line key from the rendered cart page. */
async function getCartKey(apiClient: ApiClient): Promise<string> {
  const response = await apiClient.getRoute(ROUTES.cart);
  const html = await response.text();
  const match = html.match(/name="quantity\[([^\]]+)\]/);
  if (!match) {
    throw new Error('Could not determine a cart line key');
  }
  return match[1];
}

/**
 * Cart API — add/edit/remove contracts and negatives.
 * Traces to specs/api-cart.md (CART-P-003 … CART-SEC-001).
 */
test.describe('API — Cart (extended)', () => {
  test(
    'CART-P-003_Adding_Multiple_Products_Sums_The_Total',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      const first = data.product('iMac');
      const second = data.product('htcTouchHd');

      // 1. Add two different products (Plan CART-P-003)
      await apiClient.addToCart(first.id, 1);
      const json = await apiClient.addToCartJson(second.id, 1);

      // 2. Verify the running total reflects both lines
      expect(json.total).toContain('2 item');
    },
  );

  test(
    'CART-N-002_Missing_Product_Id_Is_Rejected',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. POST a cart add with only a quantity (Plan CART-N-002)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartAdd, { quantity: '1' });

      // 2. Verify it is rejected without a server error
      expect(response.status()).toBe(200);
      expect(['[]', '']).toContain((await response.text()).trim());
    },
  );

  test(
    'CART-N-004_Zero_And_Negative_Quantities_Are_Handled',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative, TAGS.boundary] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Attempt zero then negative quantities (Plan CART-N-004)
      const zero = await apiClient.postRoute(AJAX_ROUTES.cartAdd, {
        product_id: product.id,
        quantity: '0',
      });
      const negative = await apiClient.postRoute(AJAX_ROUTES.cartAdd, {
        product_id: product.id,
        quantity: '-1',
      });

      // 2. Verify the app never returns a 5xx for these
      expect(zero.status()).toBeLessThan(500);
      expect(negative.status()).toBeLessThan(500);
    },
  );

  test(
    'CART-N-005_Non_Numeric_Quantity_Is_Handled',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient, data }) => {
      // 1. Send a non-numeric quantity (Plan CART-N-005)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartAdd, {
        product_id: data.product('htcTouchHd').id,
        quantity: 'abc',
      });

      // 2. Verify graceful handling (no 5xx)
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CART-N-006_Decimal_Quantity_Is_Handled',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient, data }) => {
      // 1. Send a decimal quantity (Plan CART-N-006)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartAdd, {
        product_id: data.product('htcTouchHd').id,
        quantity: '1.5',
      });

      // 2. Verify graceful handling
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CART-N-007_Malformed_JSON_Body_Is_Handled',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ request }) => {
      // 1. POST a malformed JSON body (Plan CART-N-007)
      const response = await request.post('/index.php?route=checkout/cart/add', {
        headers: { 'content-type': 'application/json' },
        data: '{ this is not valid json',
      });

      // 2. Verify no server error is produced
      expect(response.status()).toBeLessThan(500);
    },
  );

  test(
    'CART-SEC-001_Injection_In_Product_Id_Is_Ignored',
    { tag: [TAGS.api, TAGS.cart, TAGS.security] },
    async ({ apiClient }) => {
      // 1. Send a SQL-style product id (Plan CART-SEC-001)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartAdd, {
        product_id: '1 OR 1=1',
        quantity: '1',
      });

      // 2. Verify no bypass and no database error leakage
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toMatch(/SQL syntax|mysql_/i);
    },
  );

  test(
    'CART-P-004_Edit_Quantity_Updates_The_Total',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      // 1. Add a product and resolve its cart key (Plan CART-P-004)
      await apiClient.addToCart(data.product('htcTouchHd').id, 1);
      const key = await getCartKey(apiClient);

      // 2. Increase the quantity to three (the theme posts `quantity[<key>]`)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartEdit, {
        [`quantity[${key}]`]: '3',
      });
      expect(response.status()).toBe(200);

      // 3. Verify the cart total reflects three items
      const info = await (await apiClient.getCartInfo()).text();
      expect(info).toContain('3 item');
    },
  );

  test(
    'CART-P-006_Remove_Line_Updates_The_Total',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      // 1. Add a product and resolve its cart key (Plan CART-P-006)
      await apiClient.addToCart(data.product('htcTouchHd').id, 1);
      const key = await getCartKey(apiClient);

      // 2. Remove the line
      const response = await apiClient.postRoute(AJAX_ROUTES.cartRemove, { key });

      // 3. Verify the line is gone
      expect(response.status()).toBe(200);
      expect(await response.text()).not.toContain('1 item');
    },
  );

  test(
    'CART-N-009_Edit_Without_Key_Is_Rejected',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Attempt an edit without a cart key (Plan CART-N-009)
      const response = await apiClient.postRoute(AJAX_ROUTES.cartEdit, { quantity: '2' });

      // 2. Verify the operation does not succeed (no quantity change applied)
      expect(response.status()).toBeLessThan(500);
      const info = await (await apiClient.getCartInfo()).text();
      expect(info).toContain('0 item');
    },
  );

  test(
    'CART-I_001_Repeated_Add_Increments_Quantity',
    { tag: [TAGS.api, TAGS.cart, TAGS.data] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add the same product twice (Plan CART-I-001)
      await apiClient.addToCart(product.id, 1);
      const json = await apiClient.addToCartJson(product.id, 1);

      // 2. Verify the quantity increments (non-idempotent)
      expect(json.total).toContain('2 item');
    },
  );
});

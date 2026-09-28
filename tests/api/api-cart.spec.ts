import { AJAX_ROUTES, ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Cart', () => {
  test(
    'CART-P-001_Add_Valid_Product_Returns_JSON_Success',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const json = await apiClient.addToCartJson(product.id, 1);
      expect(json.success).toContain(product.name);
      expect(json.total).toContain(product.price);
    },
  );

  test(
    'CART-P-002_Quantity_Multiplies_The_Total',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const json = await apiClient.addToCartJson(product.id, 2);
      expect(json.total).toContain('2 item');
      expect(json.total).toContain('$292.00');
    },
  );

  test(
    'CART-N-001_Add_Without_Payload_Returns_Empty_Array',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.postRoute(AJAX_ROUTES.cartAdd);
      expect(response.status()).toBe(200);
      expect(await response.text()).toBe('[]');
    },
  );

  test(
    'CART-N-003_Unknown_Product_Returns_Empty_Array',
    { tag: [TAGS.api, TAGS.cart, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.addToCart('999999', 1);
      expect(response.status()).toBe(200);
      expect(await response.text()).toBe('[]');
    },
  );

  test(
    'CART-P-007_Cart_Info_Shows_Empty_State',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getCartInfo();
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Your shopping cart is empty!');
    },
  );

  test(
    'CART-P-008_Cart_Info_Reflects_Added_Product',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('iMac');
      await apiClient.addToCart(product.id, 1);
      const response = await apiClient.getCartInfo();
      const body = await response.text();
      expect(body).toContain(product.name);
      expect(body).toContain(product.price);
    },
  );

  test(
    'CART-P-009_Cart_Page_Renders',
    { tag: [TAGS.api, TAGS.cart, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.cart);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Shopping Cart');
    },
  );
});

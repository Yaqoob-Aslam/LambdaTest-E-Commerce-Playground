import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Products', () => {
  test(
    'PRD-P-009_Compare_Add_Returns_JSON_Success',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const response = await apiClient.addToCompare(product.id);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      const json = (await response.json()) as { success?: string };
      expect(json.success).toContain('Success');
    },
  );

  test(
    'PRD-P-010_Compare_Page_Renders',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.compare);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Product Comparison');
    },
  );

  test(
    'PRD-P-011_Product_Detail_Route_Returns_Product',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const response = await apiClient.getRoute(ROUTES.product, { product_id: product.id });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(product.name);
    },
  );

  test(
    'PRD-P-012_Special_Offers_Route_Renders',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.special);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Special');
    },
  );

  test(
    'PRD-P-003_Search_With_Exact_Name_Returns_The_Product',
    { tag: [TAGS.api, TAGS.product, TAGS.search, TAGS.functional] },
    async ({ apiClient, data }) => {
      const { exact } = data.searchTerms();
      const response = await apiClient.getRoute(ROUTES.search, { search: exact });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(exact);
    },
  );

  test(
    'PRD-P-004_Search_Partial_Match_Is_Case_Insensitive',
    { tag: [TAGS.api, TAGS.product, TAGS.search, TAGS.functional] },
    async ({ apiClient, data }) => {
      const product = data.product('htcTouchHd');
      const response = await apiClient.getRoute(ROUTES.search, { search: 'htc' });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(product.name);
    },
  );

  test(
    'PRD-P-008_Manufacturer_Route_Lists_Brand_Products',
    { tag: [TAGS.api, TAGS.product, TAGS.functional] },
    async ({ apiClient, data }) => {
      const manufacturer = data.manufacturer('apple');
      const response = await apiClient.getRoute(ROUTES.manufacturer, {
        manufacturer_id: manufacturer.id,
      });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(manufacturer.name);
    },
  );
});

import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Common & Content', () => {
  test(
    'AJX-014_Newsletter_Rejects_Invalid_Email',
    { tag: [TAGS.api, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.subscribeNewsletter('test@example.com');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('application/json');
      const json = (await response.json()) as { error?: string };
      expect(json.error).toContain('Invalid Email ID');
    },
  );

  test(
    'RTE-010_Information_Page_Returns_Content',
    { tag: [TAGS.api, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.information, { information_id: '4' });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('About Us');
    },
  );

  test(
    'RTE-033_Blog_Home_Renders',
    { tag: [TAGS.api, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.blogHome);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Blog');
    },
  );

  test(
    'RTE-002_Currency_Switch_Redirects',
    { tag: [TAGS.api, TAGS.functional] },
    async ({ request }) => {
      const response = await request.post('/index.php?route=common/currency/currency', {
        form: { code: 'USD', redirect: '/index.php?route=common/home' },
        maxRedirects: 0,
      });
      expect(response.status()).toBe(302);
    },
  );

  test(
    'INF-N-003_Order_Tracking_With_Invalid_Details_Returns_404',
    { tag: [TAGS.api, TAGS.negative] },
    async ({ apiClient }) => {
      // Observation: information/tracking resolves to the 404 "page not found"
      // response in this theme (the footer Tracking link is broken).
      const response = await apiClient.getRoute('information/tracking', {
        order_id: '999999',
        email: 'x@y.com',
      });
      expect(response.status()).toBe(404);
    },
  );
});

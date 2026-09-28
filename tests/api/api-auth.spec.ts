import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('API — Authentication', () => {
  test(
    'AUTH-P-002_Login_Page_Exposes_Credential_Fields',
    { tag: [TAGS.api, TAGS.authentication, TAGS.functional] },
    async ({ apiClient }) => {
      const response = await apiClient.getRoute(ROUTES.login);
      expect(response.status()).toBe(200);
      const body = await response.text();
      expect(body).toContain('input-email');
      expect(body).toContain('input-password');
    },
  );

  test(
    'AUTH-N-003_Login_With_Empty_Credentials_Returns_Warning',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.postRoute(ROUTES.login, { email: '', password: '' });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Warning:');
    },
  );

  test(
    'AUTH-N-004_Login_With_Invalid_Email_Format_Returns_Warning',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      const response = await apiClient.postRoute(ROUTES.login, {
        email: 'not-an-email',
        password: 'x',
      });
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain('Warning:');
    },
  );

  test(
    'AUTH-N-006_Login_With_Unknown_Email_Returns_Warning',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient, data }) => {
      const { email, password } = data.invalidCredentials().unregistered;
      const response = await apiClient.postRoute(ROUTES.login, { email, password });
      const body = await response.text();
      expect(body).toContain('Warning:');
    },
  );

  test(
    'AUTH-SEC-003_Protected_Account_Routes_Redirect_Guests_To_Login',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ request }) => {
      for (const route of [ROUTES.orderHistory, ROUTES.address, ROUTES.wishlist]) {
        const response = await request.get(`/index.php?route=${route}`, { maxRedirects: 0 });
        expect(response.status(), `${route} should redirect`).toBe(302);
        expect(response.headers()['location']).toContain('account/login');
      }
    },
  );
});

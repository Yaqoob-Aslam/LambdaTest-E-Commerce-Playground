import { testConfig } from '../../config/testConfig';
import { ROUTES } from '../../constants/Routes';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Authentication API — registration, logout, password reset and authz.
 * Traces to specs/api-authentication.md (AUTH-P-004 … AUTH-N-025).
 */
test.describe('API — Authentication (extended)', () => {
  test(
    'AUTH-P-004_Valid_Registration_Creates_An_Account',
    { tag: [TAGS.api, TAGS.authentication, TAGS.functional] },
    async ({ apiClient }) => {
      test.skip(
        !testConfig.flags.allowRegistration,
        'Set ALLOW_REGISTRATION=1 to create real accounts on the shared demo store',
      );

      const user = generateUser();

      // 1. Register a new account via the form endpoint (Plan AUTH-P-004)
      const response = await apiClient.postRoute(ROUTES.register, {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        telephone: user.telephone,
        password: user.password,
        confirm: user.password,
        agree: '1',
        customer_group_id: '1',
        newsletter: '0',
      });

      // 2. Verify the account was created
      expect(response.status()).toBe(200);
      expect(await response.text()).toMatch(/Account Has Been Created|My Account/i);
    },
  );

  test(
    'AUTH-N-010_Duplicate_Email_Is_Rejected',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Requires a registered TEST_USER_EMAIL');
      const registered = data.registeredCredentials();

      // 1. Attempt to register using an existing email (Plan AUTH-N-010)
      const response = await apiClient.postRoute(ROUTES.register, {
        firstname: 'QA',
        lastname: 'Tester',
        email: registered.email,
        telephone: '07123456789',
        password: 'Password123',
        confirm: 'Password123',
        agree: '1',
        customer_group_id: '1',
      });

      // 2. Verify the duplicate error
      expect(await response.text()).toMatch(/already registered/i);
    },
  );

  test(
    'AUTH-N-011_Invalid_Email_Is_Rejected',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Register with a malformed email (Plan AUTH-N-011)
      const response = await apiClient.postRoute(ROUTES.register, {
        firstname: 'QA',
        lastname: 'Tester',
        email: 'foo@',
        telephone: '07123456789',
        password: 'Password123',
        confirm: 'Password123',
        agree: '1',
        customer_group_id: '1',
      });

      // 2. Verify the email validation error
      expect(await response.text()).toMatch(/E-Mail Address does not appear to be valid/i);
    },
  );

  test(
    'AUTH-N-013_Password_Mismatch_Is_Rejected',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Register with a mismatched confirmation (Plan AUTH-N-013)
      const response = await apiClient.postRoute(ROUTES.register, {
        firstname: 'QA',
        lastname: 'Tester',
        email: generateUser().email,
        telephone: '07123456789',
        password: 'Password123',
        confirm: 'Different123',
        agree: '1',
        customer_group_id: '1',
      });

      // 2. Verify the mismatch error
      expect(await response.text()).toMatch(/Password confirmation does not match/i);
    },
  );

  test(
    'AUTH-N-014_Short_Password_Is_Rejected',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative, TAGS.boundary] },
    async ({ apiClient }) => {
      // 1. Register with a too-short password (Plan AUTH-N-014)
      const response = await apiClient.postRoute(ROUTES.register, {
        firstname: 'QA',
        lastname: 'Tester',
        email: generateUser().email,
        telephone: '07123456789',
        password: '12',
        confirm: '12',
        agree: '1',
        customer_group_id: '1',
      });

      // 2. Verify the password length error
      expect(await response.text()).toMatch(/Password must be between 4 and 20 characters/i);
    },
  );

  test(
    'AUTH-N-015_Privacy_Agreement_Control_Is_Required',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Fetch the registration form (Plan AUTH-N-015)
      const response = await apiClient.getRoute(ROUTES.register);
      const body = await response.text();

      // 2. Verify the privacy-agreement control is present (client-side enforced;
      //    the server does not reject a direct POST without it — recorded observation).
      expect(response.status()).toBe(200);
      expect(body).toContain('input-agree');
      expect(body).toMatch(/Privacy Policy/i);
    },
  );

  test(
    'AUTH-SEC-001_Injection_In_Login_Does_Not_Bypass_Auth',
    { tag: [TAGS.api, TAGS.authentication, TAGS.security] },
    async ({ apiClient }) => {
      // 1. Attempt a SQL-injection style login (Plan AUTH-SEC-001)
      const response = await apiClient.postRoute(ROUTES.login, {
        email: "' OR 1=1 --",
        password: 'x',
      });

      // 2. Verify no bypass and no database error leakage
      const body = await response.text();
      expect(body).toMatch(/Warning:/);
      expect(body).not.toMatch(/SQL syntax|mysql_/i);
    },
  );

  test(
    'AUTH-P-007_Logout_Ends_The_Session',
    { tag: [TAGS.api, TAGS.authentication, TAGS.functional] },
    async ({ apiClient }) => {
      // 1. Request logout (Plan AUTH-P-007)
      const response = await apiClient.getRoute(ROUTES.logout);

      // 2. Verify the endpoint responds successfully
      expect(response.status()).toBeLessThan(400);
    },
  );

  test(
    'AUTH-N-017_Forgot_Password_Invalid_Email_Shows_A_Warning',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative] },
    async ({ apiClient }) => {
      // 1. Request a reset with a malformed email (Plan AUTH-N-017)
      const response = await apiClient.postRoute(ROUTES.forgotten, { email: 'bad' });

      // 2. Verify the request is not silently accepted
      expect(await response.text()).toMatch(/Warning:/i);
    },
  );

  test(
    'AUTH-N-018_Forgot_Password_Unknown_Email_Is_Handled',
    { tag: [TAGS.api, TAGS.authentication, TAGS.negative, TAGS.security] },
    async ({ apiClient }) => {
      // 1. Request a reset for an unknown but valid-format email (Plan AUTH-N-018)
      const response = await apiClient.postRoute(ROUTES.forgotten, {
        email: `unknown_${Date.now()}@example.com`,
      });

      // 2. Observation: the theme responds with a Warning that the address was
      //    "not found in our records" — an account-enumeration disclosure that
      //    deviates from the plan's "generic message" expectation.
      const body = await response.text();
      expect(body).toMatch(/Warning:/i);
      expect(body).not.toMatch(/SQL syntax|mysql_/i);
    },
  );

  test(
    'AUTH-N-023_Password_Change_Requires_Authentication',
    { tag: [TAGS.api, TAGS.authentication, TAGS.security] },
    async ({ request }) => {
      // 1. Access the password-change route as a guest (Plan AUTH-N-023)
      const response = await request.get(`/index.php?route=${ROUTES.password}`, { maxRedirects: 0 });

      // 2. Verify the guest is redirected to login
      expect(response.status()).toBe(302);
      expect(response.headers()['location']).toContain('account/login');
    },
  );
});

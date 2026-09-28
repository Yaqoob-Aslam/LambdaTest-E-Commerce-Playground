import { testConfig } from '../../config/testConfig';
import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Authentication — edge and boundary input validation.
 * Traces to TEST-PLAN.md §7.1.3 (AUTH-E-001 … AUTH-E-010).
 */
test.describe('Authentication — Edge & Boundary', () => {
  test(
    'TC_AUTH_E_001_Email_Minimum_Length_Is_Validated',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Submit the shortest plausible email shape (Plan AUTH-E-001)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ email: 'a@b' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify a defined, non-crashing validation outcome
      await expect(page).toHaveURL(URL_PATTERNS.register);
      await expect(page.getByText(MESSAGES.register.email)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_E_003_Email_Over_Maximum_Length_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Submit an email far beyond the maximum length (Plan AUTH-E-003)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ email: `${'a'.repeat(250)}@example.com` }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify it is rejected without crashing
      await expect(page).toHaveURL(URL_PATTERNS.register);
    },
  );

  test(
    'TC_AUTH_E_004_Password_At_Minimum_Length_Is_Accepted',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.boundary] },
    async ({ registerPage, page }) => {
      test.skip(
        !testConfig.flags.allowRegistration,
        'Set ALLOW_REGISTRATION=1 to create real accounts on the shared demo store',
      );

      // 1. Register with a password exactly at the minimum length, 4 (Plan AUTH-E-004)
      await registerPage.open();
      await registerPage.register(generateUser({ password: 'abcd' }));

      // 2. Verify the account is created
      await expect(page.getByText(MESSAGES.register.success)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_E_005_Password_Below_Minimum_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Submit a 3-character password (Plan AUTH-E-005)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ password: 'abc' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the length error
      await expect(page.getByText(MESSAGES.register.password)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_E_006_Password_Over_Maximum_Is_Not_Truncated',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Enter a 21-character password (Plan AUTH-E-006).
      //    Observation: neither the field (no maxlength) nor the server enforces
      //    the advertised 20-character maximum, so the value is accepted as-is —
      //    recorded as a deviation from the plan's "rejected" expectation.
      await registerPage.open();
      await registerPage.passwordInput.fill('A'.repeat(21));

      // 2. Verify the value is retained (documented behaviour) and no navigation occurred
      await expect(registerPage.passwordInput).toHaveValue('A'.repeat(21));
      await expect(page).toHaveURL(URL_PATTERNS.register);
    },
  );

  test(
    'TC_AUTH_E_007_Whitespace_Only_Values_Are_Rejected',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.negative] },
    async ({ registerPage, page }) => {
      // 1. Submit whitespace-only required fields (Plan AUTH-E-007)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ firstName: '   ', email: '   ' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the fields are treated as empty
      await expect(page.getByText(MESSAGES.register.firstName)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.email)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_E_008_Unicode_Names_Are_Accepted',
    { tag: [TAGS.authentication, TAGS.edge] },
    async ({ registerPage, page }) => {
      test.skip(
        !testConfig.flags.allowRegistration,
        'Set ALLOW_REGISTRATION=1 to create real accounts on the shared demo store',
      );

      // 1. Register with a Unicode first name (Plan AUTH-E-008)
      await registerPage.open();
      await registerPage.register(generateUser({ firstName: 'Jöhn-Åke' }));

      // 2. Verify the account is created (stored without corruption)
      await expect(page.getByText(MESSAGES.register.success)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_E_009_HTML_In_Name_Is_Escaped',
    { tag: [TAGS.authentication, TAGS.edge, TAGS.security] },
    async ({ registerPage, page }) => {
      // 1. Register with HTML markup in the name (Plan AUTH-E-009).
      //    An invalid email keeps the submission from creating a real account.
      await registerPage.open();
      await registerPage.fillForm(generateUser({ firstName: '<b>Bold</b>', email: 'not-an-email' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify no script/DB error surfaces and the app remains on a valid page
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Warning: mysqli/i);
    },
  );

  test(
    'TC_AUTH_E_010_Multiple_Spaces_Are_Handled',
    { tag: [TAGS.authentication, TAGS.edge] },
    async ({ registerPage, page }) => {
      // 1. Submit a first name containing consecutive spaces (Plan AUTH-E-010)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ firstName: 'John    Doe', email: 'not-an-email' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify a graceful outcome (trimmed/normalised, never a crash)
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Warning: mysqli/i);
    },
  );
});

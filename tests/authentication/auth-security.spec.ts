import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Authentication — functional-security checks.
 * Traces to TEST-PLAN.md §7.1.5 (AUTH-SEC-001 … AUTH-SEC-005).
 */
test.describe('Authentication — Functional Security', () => {
  test(
    'TC_AUTH_SEC_001_Password_Field_Is_Masked',
    { tag: [TAGS.authentication, TAGS.security] },
    async ({ loginPage, page }) => {
      // 1. Open the login page (Plan AUTH-SEC-001)
      await loginPage.open();

      // 2. Verify the password input is a masked password field
      await expect(page.locator('#input-password')).toHaveAttribute('type', 'password');
    },
  );

  test(
    'TC_AUTH_SEC_002_Password_Is_Not_Exposed_In_The_URL',
    { tag: [TAGS.authentication, TAGS.security] },
    async ({ loginPage, page }) => {
      const secret = 'SuperSecret123';

      // 1. Submit credentials and inspect the resulting URL (Plan AUTH-SEC-002)
      await loginPage.open();
      await loginPage.login('nobody@example.com', secret);

      // 2. Verify the password never appears in the query string
      expect(page.url()).not.toContain(secret);
    },
  );

  test(
    'TC_AUTH_SEC_003_Forgot_Password_Is_Handled_Safely',
    { tag: [TAGS.authentication, TAGS.security, TAGS.negative] },
    async ({ forgottenPasswordPage, page }) => {
      // 1. Request a reset for an address that has no account (Plan AUTH-SEC-003)
      await forgottenPasswordPage.open();
      await forgottenPasswordPage.requestReset('definitely.not.a.user@example.com');

      // 2. Observation: the theme discloses non-existence ("was not found in our
      //    records"). Verify the request is handled without a server error.
      await expect(page).toHaveURL(URL_PATTERNS.forgotten);
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Fatal error/i);
    },
  );

  test(
    'TC_AUTH_SEC_004_Direct_Account_URL_Requires_Login',
    { tag: [TAGS.authentication, TAGS.security, TAGS.session] },
    async ({ page }) => {
      // 1. Access protected account routes directly while logged out (Plan AUTH-SEC-004)
      for (const route of ['account/edit', 'account/password', 'account/download', 'account/reward']) {
        await page.goto(`/index.php?route=${route}`);
        await expect(page, `${route} should redirect to login`).toHaveURL(URL_PATTERNS.login);
      }
    },
  );

  test(
    'TC_AUTH_SEC_005_Registration_Injection_Is_Not_Executed',
    { tag: [TAGS.authentication, TAGS.security, TAGS.negative] },
    async ({ registerPage, page }) => {
      let dialogOpened = false;
      page.on('dialog', async (dialog) => {
        dialogOpened = true;
        await dialog.dismiss();
      });

      // 1. Submit an XSS/SQL payload through the registration form (Plan AUTH-SEC-005).
      //    An invalid email prevents a real account from being created.
      await registerPage.open();
      await registerPage.fillForm(
        generateUser({
          firstName: '<script>alert(1)</script>',
          lastName: "' OR 1=1 --",
          email: 'not-an-email',
        }),
      );
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify nothing executed and no database error leaked
      expect(dialogOpened).toBe(false);
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Warning: mysqli/i);
    },
  );
});

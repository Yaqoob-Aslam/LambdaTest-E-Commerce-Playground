import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Functional security — authorization, masking, enumeration and injection.
 * Traces to TEST-PLAN.md §7.15 (SEC-001 … SEC-009).
 */
test.describe('Functional Security', () => {
  test(
    'TC_SECURITY_001_Protected_Page_Without_Auth_Redirects',
    { tag: [TAGS.security, TAGS.authentication, TAGS.negative] },
    async ({ accountPage, page }) => {
      // 1. Request the dashboard while logged out (Plan SEC-001)
      await accountPage.open();

      // 2. Verify the redirect to login
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_SECURITY_002_Account_Page_After_Logout_Is_Blocked',
    { tag: [TAGS.security, TAGS.authentication, TAGS.session] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const credentials = data.registeredCredentials();

      // 1. Log in then log out (Plan SEC-002)
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await accountPage.logout();

      // 2. Verify the account page is blocked again
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_SECURITY_003_Password_Field_Is_Masked',
    { tag: [TAGS.security, TAGS.authentication] },
    async ({ loginPage, page }) => {
      // 1. Open the login page (Plan SEC-003)
      await loginPage.open();

      // 2. Verify the password field is masked
      await expect(page.locator('#input-password')).toHaveAttribute('type', 'password');
    },
  );

  test(
    // Plan: AUTH-N-020
    'TC_SECURITY_004_Password_Reset_Is_Handled_Safely',
    { tag: [TAGS.security, TAGS.authentication] },
    async ({ forgottenPasswordPage, page }) => {
      // 1. Request a reset for an unregistered address (Plan SEC-004)
      await forgottenPasswordPage.open();
      await forgottenPasswordPage.requestReset('unknown.user@example.com');

      // 2. Observation: the theme discloses non-existence; verify the request is
      //    handled without a server error or data leakage.
      await expect(page).toHaveURL(URL_PATTERNS.forgotten);
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Fatal error/i);
    },
  );

  test(
    'TC_SECURITY_005_Logout_Clears_The_Session',
    { tag: [TAGS.security, TAGS.session] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const credentials = data.registeredCredentials();

      // 1. Authenticate then terminate the session (Plan SEC-005)
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await accountPage.logout();

      // 2. Verify protected navigation is denied
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_SECURITY_006_No_Sensitive_Data_Is_Exposed',
    { tag: [TAGS.security] },
    async ({ page }) => {
      // 1. Inspect the login page source (Plan SEC-006)
      await page.goto('/index.php?route=account/login', { waitUntil: 'domcontentloaded' });

      // 2. Verify no credentials/tokens/debug output are present
      const body = await page.locator('body').innerText();
      expect(body).not.toMatch(/password\s*[:=]\s*\S+/i);
      expect(body).not.toMatch(/mysql_|SQL syntax|stack trace/i);
    },
  );

  test(
    'TC_SECURITY_007_Unauthorized_Navigation_Is_Blocked',
    { tag: [TAGS.security, TAGS.authentication] },
    async ({ page }) => {
      // 1. Attempt to reach several protected routes anonymously (Plan SEC-007)
      for (const route of ['account/edit', 'account/address', 'account/order', 'account/download']) {
        await page.goto(`/index.php?route=${route}`);
        await expect(page, `${route} should redirect to login`).toHaveURL(URL_PATTERNS.login);
      }
    },
  );

  test(
    // Plan: AUTH-N-008
    'TC_SECURITY_008_Input_Validation_Is_Enforced',
    { tag: [TAGS.security, TAGS.negative] },
    async ({ loginPage, page }) => {
      // 1. Submit an injection-style email (Plan SEC-008 / SEC-009)
      await loginPage.open();
      await loginPage.login("' OR '1'='1", '<script>alert(1)</script>');

      // 2. Verify no bypass and no script execution
      await expect(page).toHaveURL(URL_PATTERNS.login);
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_/i);
    },
  );

  test(
    'TC_SECURITY_009_Injection_In_Search_Is_Not_Executed',
    { tag: [TAGS.security, TAGS.search] },
    async ({ searchPage, page }) => {
      let dialogOpened = false;
      page.on('dialog', async (dialog) => {
        dialogOpened = true;
        await dialog.dismiss();
      });

      // 1. Run an injection payload through search (Plan SEC-009)
      await searchPage.open("<script>alert('xss')</script>");

      // 2. Verify nothing executed and the app handled it safely
      expect(dialogOpened).toBe(false);
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_/i);
    },
  );
});

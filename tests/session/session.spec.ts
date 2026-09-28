import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Session & state — login persistence, logout and multi-tab consistency.
 * Traces to TEST-PLAN.md §7.1.4 (AUTH-S-001 … AUTH-S-006) and §7.11 (SES-*).
 */
test.describe('Session & State', () => {
  test.beforeEach(async ({ loginPage, page, data }) => {
    test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
    const credentials = data.registeredCredentials();
    await loginPage.open();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(URL_PATTERNS.account);
  });

  test(
    'TC_SESSION_001_Login_Persists_Across_Navigation',
    { tag: [TAGS.session, TAGS.authentication, TAGS.regression] },
    async ({ homePage, accountPage, page }) => {
      // 1. Navigate away from the account (Plan AUTH-S-001 / SES-P-001)
      await homePage.open();

      // 2. Verify the session is still active
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await expect(accountPage.heading).toBeVisible();
    },
  );

  test(
    'TC_SESSION_002_Login_Persists_After_Refresh',
    { tag: [TAGS.session, TAGS.authentication, TAGS.regression] },
    async ({ accountPage, page }) => {
      // 1. Refresh the dashboard (Plan AUTH-S-002)
      await page.reload({ waitUntil: 'domcontentloaded' });

      // 2. Verify the session survives the refresh
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await expect(accountPage.heading).toBeVisible();
    },
  );

  test(
    'TC_SESSION_003_Login_Is_Consistent_Across_Tabs',
    { tag: [TAGS.session, TAGS.authentication] },
    async ({ context }) => {
      // 1. Open a second tab sharing the cookie jar (Plan AUTH-S-003 / SES-P-008)
      const secondTab = await context.newPage();
      await secondTab.goto('/index.php?route=account/account', { waitUntil: 'domcontentloaded' });

      // 2. Verify the second tab is also authenticated
      await expect(secondTab).toHaveURL(URL_PATTERNS.account);
      await expect(secondTab.getByRole('heading', { name: 'My Account' })).toBeVisible();
      await secondTab.close();
    },
  );

  test(
    'TC_SESSION_004_Login_Persists_With_Restored_Cookies',
    { tag: [TAGS.session, TAGS.authentication, TAGS.edge] },
    async ({ context, browser }) => {
      // 1. Capture the authenticated cookie state (Plan AUTH-S-004)
      const storageState = await context.storageState();

      // 2. Restore it into a brand-new browser context
      const restored = await browser.newContext({ storageState });
      const restoredPage = await restored.newPage();
      await restoredPage.goto('/index.php?route=account/account', { waitUntil: 'domcontentloaded' });

      // 3. Verify the restored session is still logged in
      await expect(restoredPage).toHaveURL(URL_PATTERNS.account);
      await restored.close();
    },
  );

  test(
    // Plan: SES-P-002
    'TC_SESSION_005_Protected_Page_After_Logout_Is_Blocked',
    { tag: [TAGS.session, TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ accountPage, page }) => {
      // 1. Log out (Plan AUTH-S-005 / SES-N-001)
      await accountPage.logout();

      // 2. Verify protected routes are blocked
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    // Plan: AUTH-P-008
    'TC_SESSION_006_Back_Button_After_Logout_Does_Not_Restore_Session',
    { tag: [TAGS.session, TAGS.authentication, TAGS.edge] },
    async ({ accountPage, page }) => {
      // 1. Visit the dashboard, log out, then go back (Plan AUTH-S-006)
      await accountPage.open();
      await accountPage.logout();
      await page.goBack({ waitUntil: 'domcontentloaded' });

      // 2. Verify a protected page still requires login (no cached dashboard)
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_SESSION_N_002_Session_Expiry_Requires_Re_Login',
    { tag: [TAGS.session, TAGS.negative] },
    async () => {
      // Session expiry cannot be triggered deterministically on the shared demo
      // (Plan SES-N-002).
      test.skip(true, 'Session expiry is not deterministically reproducible on the shared demo');
    },
  );
});

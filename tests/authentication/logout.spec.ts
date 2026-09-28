import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Authentication — Logout & Session', () => {
  test(
    'TC_AUTH_007_Logout_Ends_The_Session',
    { tag: [TAGS.authentication, TAGS.regression] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Log in (Plan AUTH-P-007)
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Log out
      await accountPage.logout();

      // 3. Verify protected pages are blocked again
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_AUTH_009_Protected_Page_Redirects_To_Login',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ accountPage, page }) => {
      // 1. Request the dashboard while logged out (Plan AUTH-N-009)
      await accountPage.open();

      // 2. Verify the redirect to login
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_AUTH_010_Wishlist_Requires_Login',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.wishlist] },
    async ({ wishlistPage, page }) => {
      // 1. Request the wishlist while logged out
      await wishlistPage.open();

      // 2. Verify the user is redirected to login
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );
});

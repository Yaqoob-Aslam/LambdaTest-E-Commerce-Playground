import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Wishlist', () => {
  test(
    'TC_WISHLIST_001_Wishlist_Requires_Authentication',
    { tag: [TAGS.wishlist, TAGS.negative, TAGS.authentication] },
    async ({ wishlistPage, page }) => {
      // 1. Open the wishlist while logged out
      await wishlistPage.open();

      // 2. Verify the user is redirected to login
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_WISHLIST_002_Authenticated_User_Can_Open_Wishlist',
    { tag: [TAGS.wishlist, TAGS.functional, TAGS.account] },
    async ({ loginPage, wishlistPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Log in
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Open the wishlist
      await wishlistPage.open();

      // 3. Verify the wishlist page is displayed (empty or populated)
      await expect(page).toHaveURL(/route=account\/wishlist/);
      await expect(wishlistPage.heading).toBeVisible();
    },
  );
});

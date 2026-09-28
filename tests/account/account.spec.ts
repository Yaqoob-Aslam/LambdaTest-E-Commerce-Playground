import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Account', () => {
  test(
    'TC_ACCOUNT_001_Dashboard_Shows_Account_Links',
    { tag: [TAGS.account, TAGS.functional, TAGS.regression] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Log in
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Verify the dashboard exposes the account links
      await expect(accountPage.editAccountLink).toBeVisible();
      await expect(accountPage.passwordLink).toBeVisible();
      await expect(accountPage.addressBookLink).toBeVisible();
      await expect(accountPage.orderHistoryLink).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_002_Order_History_Page_Renders',
    { tag: [TAGS.account, TAGS.functional, TAGS.regression] },
    async ({ loginPage, orderHistoryPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Log in
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Open order history
      await orderHistoryPage.open();

      // 3. Verify the page is rendered
      await expect(page).toHaveURL(/route=account\/order/);
      await expect(orderHistoryPage.heading).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_003_Address_Book_Page_Renders',
    { tag: [TAGS.account, TAGS.functional] },
    async ({ loginPage, addressPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Log in
      await loginPage.open();
      await loginPage.login(email, password);
      await expect(page).toHaveURL(URL_PATTERNS.account);

      // 2. Open the address book
      await addressPage.open();

      // 3. Verify the page is rendered
      await expect(page).toHaveURL(/route=account\/address/);
      await expect(addressPage.heading).toBeVisible();
    },
  );
});

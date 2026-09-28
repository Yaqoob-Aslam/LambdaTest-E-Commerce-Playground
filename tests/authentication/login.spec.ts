import { MESSAGES } from '../../constants/Messages';
import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Authentication — Login', () => {
  test(
    'TC_LOGIN_001_Valid_User_Login',
    { tag: [TAGS.authentication, TAGS.smoke, TAGS.regression] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email, password } = data.registeredCredentials();

      // 1. Open the login page (Plan AUTH-P-004)
      await loginPage.open();

      // 2. Log in with valid credentials
      await loginPage.login(email, password);

      // 3. Verify the account dashboard is displayed
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await expect(accountPage.heading).toBeVisible();
    },
  );

  test(
    'TC_LOGIN_002_Empty_Credentials_Show_Warning',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ loginPage }) => {
      // 1. Open the login page and submit without entering anything (Plan AUTH-N-001, AUTH-N-002)
      await loginPage.open();
      await loginPage.submit();

      // 2. Verify a warning alert is displayed
      await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
    },
  );

  test(
    'TC_LOGIN_003_Unregistered_Email_Shows_Warning',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ loginPage, data }) => {
      const { email, password } = data.invalidCredentials().unregistered;

      // 1. Attempt login with an unregistered email (Plan AUTH-N-004)
      await loginPage.open();
      await loginPage.login(email, password);

      // 2. Verify the no-match warning and that we stay on login
      await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
      await expect(loginPage.loginButton).toBeVisible();
    },
  );

  test(
    'TC_LOGIN_004_Wrong_Password_Shows_Warning',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ loginPage, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const { email } = data.registeredCredentials();
      const { password } = data.invalidCredentials().wrongPassword;

      // 1. Attempt login with a valid email but wrong password (Plan AUTH-N-005)
      await loginPage.open();
      await loginPage.login(email, password);

      // 2. Verify the no-match warning is shown
      await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
    },
  );

  test(
    'TC_LOGIN_005_Forgotten_Password_Link_Is_Available',
    { tag: [TAGS.authentication, TAGS.functional] },
    async ({ loginPage, page }) => {
      // 1. Open the login page
      await loginPage.open();

      // 2. Follow the Forgotten Password link
      await loginPage.forgottenPasswordLink.click();

      // 3. Verify the password-reset request page is displayed
      await expect(page).toHaveURL(/route=account\/forgotten/);
    },
  );
});

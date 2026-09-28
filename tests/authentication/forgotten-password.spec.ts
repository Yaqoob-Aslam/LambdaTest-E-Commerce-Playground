import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Authentication — Password Recovery', () => {
  test(
    'TC_AUTH_019_Forgot_Password_Empty_Email_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative] },
    async ({ forgottenPasswordPage, page }) => {
      // 1. Open the reset page and submit with no email (Plan AUTH-N-019)
      await forgottenPasswordPage.open();
      await forgottenPasswordPage.submit();

      // 2. Verify the request is not accepted (user stays on the reset page)
      await expect(page).toHaveURL(/account\/forgotten/);
    },
  );

  test(
    'TC_AUTH_021_Forgot_Password_Invalid_Email_Format_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative] },
    async ({ forgottenPasswordPage, page, data }) => {
      // 1. Submit a malformed email (Plan AUTH-N-021)
      await forgottenPasswordPage.open();
      await forgottenPasswordPage.requestReset(data.invalidCredentials().malformedEmail.email);

      // 2. Verify the reset request does not proceed
      await expect(page).toHaveURL(/account\/forgotten/);
    },
  );
});

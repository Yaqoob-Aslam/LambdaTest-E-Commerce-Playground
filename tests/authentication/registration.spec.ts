import { testConfig } from '../../config/testConfig';
import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { DataUtils } from '../../utils/DataUtils';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Authentication — Registration', () => {
  test(
    'TC_REGISTER_001_Empty_Form_Shows_Field_Validation',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Open the registration page and submit an empty form
      await registerPage.open();
      await registerPage.submit();

      // 2. Verify field-level validation errors
      await expect(page.getByText(MESSAGES.register.privacyAgreement)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.firstName)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.lastName)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.email)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.telephone)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.password)).toBeVisible();
    },
  );

  test(
    'TC_REGISTER_002_Password_Mismatch_Shows_Error',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Fill valid details but a mismatched confirmation
      await registerPage.open();
      await registerPage.fillForm(generateUser({ confirmPassword: 'Different123' }));
      await registerPage.acceptPrivacyPolicy();

      // 2. Submit
      await registerPage.submit();

      // 3. Verify the confirmation error is displayed
      await expect(page.getByText(MESSAGES.register.passwordConfirm)).toBeVisible();
    },
  );

  test(
    'TC_REGISTER_003_Duplicate_Email_Shows_Error',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Requires a registered TEST_USER_EMAIL');
      const registered = data.registeredCredentials();

      // 1. Attempt to register with an email that already exists
      await registerPage.open();
      await registerPage.register(generateUser({ email: registered.email }));

      // 2. Verify the duplicate-email error is displayed
      await expect(page.locator('.alert-danger, .text-danger')).toContainText(/already registered/i);
    },
  );

  test(
    'TC_REGISTER_004_Valid_Registration_Creates_Account',
    { tag: [TAGS.authentication, TAGS.functional, TAGS.e2e] },
    async ({ registerPage, page }) => {
      test.skip(
        !DataUtils.hasRegisteredCredentials() && !testConfig.flags.allowRegistration,
        'Set ALLOW_REGISTRATION=1 to create real accounts on the shared demo store',
      );

      // 1. Register a brand-new unique account (Plan AUTH-P-001)
      await registerPage.open();
      await registerPage.register(generateUser());

      // 2. Verify the account-created confirmation
      await expect(page.getByText(MESSAGES.register.success)).toBeVisible();
    },
  );
});

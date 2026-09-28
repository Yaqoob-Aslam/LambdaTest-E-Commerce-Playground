import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { generateUser } from '../../utils/RandomDataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Authentication — registration negatives and input validation.
 * Traces to TEST-PLAN.md §7.1.2 (AUTH-N-010 … AUTH-N-018).
 */
test.describe('Authentication — Registration Negatives', () => {
  test(
    'TC_AUTH_N_010_Empty_Form_Shows_Field_Validation',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Submit the registration form with no data (Plan AUTH-N-010)
      await registerPage.open();
      await registerPage.submit();

      // 2. Verify every required field reports an error
      await expect(page.getByText(MESSAGES.register.firstName)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.lastName)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.email)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.telephone)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.password)).toBeVisible();
      await expect(page.getByText(MESSAGES.register.privacyAgreement)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_N_011_Invalid_Email_Format_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Enter a malformed email (Plan AUTH-N-011)
      await registerPage.open();
      await registerPage.emailInput.fill('foo@');

      // 2. Verify the email control reports the value as invalid and the user
      //    cannot leave the registration page (no account is created).
      const invalid = await registerPage.emailInput.evaluate(
        (el) => !(el as HTMLInputElement).checkValidity(),
      );
      expect(invalid).toBe(true);
      await expect(page).toHaveURL(URL_PATTERNS.register);
    },
  );

  test(
    'TC_AUTH_N_012_Duplicate_Email_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Requires a registered TEST_USER_EMAIL');
      const registered = data.registeredCredentials();

      // 1. Register using an email that already exists (Plan AUTH-N-012)
      await registerPage.open();
      await registerPage.register(generateUser({ email: registered.email }));

      // 2. Verify the duplicate-email error
      await expect(registerPage.alerts.danger).toContainText(/already registered/i);
    },
  );

  test(
    'TC_AUTH_N_013_Invalid_Telephone_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative] },
    async ({ registerPage, page }) => {
      // 1. Register with a too-short telephone (Plan AUTH-N-013)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ telephone: '1' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the telephone validation error
      await expect(page.getByText(MESSAGES.register.telephone)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_N_014_Short_Password_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Register with a password below the minimum length (Plan AUTH-N-014)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ password: '12' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the password length error
      await expect(page.getByText(MESSAGES.register.password)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_N_015_Password_Mismatch_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Register with a mismatched confirmation (Plan AUTH-N-015)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ confirmPassword: 'Mismatch123' }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the confirmation-mismatch error
      await expect(page.getByText(MESSAGES.register.passwordConfirm)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_N_016_Missing_Privacy_Agreement_Is_Rejected',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
    async ({ registerPage, page }) => {
      // 1. Fill valid details but do NOT accept the privacy policy (Plan AUTH-N-016)
      await registerPage.open();
      await registerPage.fillForm(generateUser());
      await registerPage.submit();

      // 2. Verify the agreement warning
      await expect(page.getByText(MESSAGES.register.privacyAgreement)).toBeVisible();
    },
  );

  test(
    'TC_AUTH_N_017_Special_Characters_In_Name_Are_Handled',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.security] },
    async ({ registerPage, page }) => {
      // 1. Register with special characters in the name (Plan AUTH-N-017).
      //    An invalid email keeps the submission from creating a real account.
      await registerPage.open();
      await registerPage.fillForm(
        generateUser({ firstName: '<script>alert(1)</script>', email: 'not-an-email' }),
      );
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the input is handled safely (no DB/script leak, no crash)
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Warning: mysqli/i);
    },
  );

  test(
    'TC_AUTH_N_018_Very_Long_Values_Are_Bounded',
    { tag: [TAGS.authentication, TAGS.negative, TAGS.boundary] },
    async ({ registerPage, page }) => {
      // 1. Register with an over-long first name (Plan AUTH-N-018)
      await registerPage.open();
      await registerPage.fillForm(generateUser({ firstName: 'A'.repeat(100) }));
      await registerPage.acceptPrivacyPolicy();
      await registerPage.submit();

      // 2. Verify the length validation error and that the page survives
      await expect(page.getByText(MESSAGES.register.firstName)).toBeVisible();
      await expect(page).toHaveURL(URL_PATTERNS.register);
    },
  );
});

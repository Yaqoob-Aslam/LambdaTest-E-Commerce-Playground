import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Information pages — contact, tracking, newsletter and static content.
 * Traces to TEST-PLAN.md §7.17 (INF-P-001 … INF-N-003).
 */
test.describe('Information Pages', () => {
  test(
    'TC_INFO_P_001_Contact_Form_Valid_Submit',
    { tag: [TAGS.information, TAGS.contact, TAGS.functional] },
    async ({ contactPage, page, data }) => {
      // Submitting the contact form sends a real enquiry to the store owner,
      // so it is gated behind an explicit opt-in.
      test.skip(
        process.env.ALLOW_CONTACT_SUBMIT !== '1',
        'Set ALLOW_CONTACT_SUBMIT=1 to send real contact enquiries',
      );

      const contact = data.contact();

      // 1. Submit a valid enquiry (Plan INF-P-001)
      await contactPage.open();
      await contactPage.nameInput.fill(contact.valid.name);
      await contactPage.emailInput.fill(contact.valid.email);
      await contactPage.enquiryInput.fill(contact.valid.enquiry);
      await contactPage.submit();

      // 2. Verify a confirmation is shown
      await expect(page.getByText(MESSAGES.contact.success)).toBeVisible();
    },
  );

  test(
    'TC_INFO_P_002_Order_Tracking_Page_Is_Handled',
    { tag: [TAGS.information, TAGS.functional] },
    async ({ informationPage, page }) => {
      // 1. Open the tracking page (Plan INF-P-002)
      await informationPage.openTracking();

      // 2. Verify the response is handled gracefully (form or not-found page)
      await expect(page.locator('body')).not.toContainText(/SQL syntax|mysql_|Fatal error/i);
    },
  );

  test(
    'TC_INFO_P_003_Newsletter_Preference_Renders',
    { tag: [TAGS.information, TAGS.account] },
    async ({ loginPage, accountPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const credentials = data.registeredCredentials();

      // 1. Log in and open the newsletter preference page (Plan INF-P-003)
      await loginPage.open();
      await loginPage.login(credentials.email, credentials.password);
      await expect(page).toHaveURL(URL_PATTERNS.account);
      await accountPage.openNewsletter();

      // 2. Verify the newsletter controls render
      await expect(page).toHaveURL(URL_PATTERNS.newsletter);
      await expect(page.getByText(/newsletter/i).first()).toBeVisible();
    },
  );

  test(
    'TC_INFO_P_004_Static_Information_Pages_Render',
    { tag: [TAGS.information, TAGS.navigation, TAGS.regression] },
    async ({ informationPage, page }) => {
      // 1. Open the About, Privacy and Terms pages (Plan INF-P-004)
      for (const informationId of ['4', '3', '5']) {
        await informationPage.open(informationId);
        await expect(page).toHaveURL(URL_PATTERNS.information);
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
      }
    },
  );

  test(
    'TC_INFO_N_001_Contact_Missing_Fields_Show_Errors',
    { tag: [TAGS.information, TAGS.contact, TAGS.negative] },
    async ({ contactPage, page }) => {
      // 1. Submit the contact form empty (Plan INF-N-001)
      await contactPage.open();
      await contactPage.submit();

      // 2. Verify field-level validation
      await expect(page.getByText(MESSAGES.contact.name)).toBeVisible();
      await expect(page.getByText(MESSAGES.contact.enquiry)).toBeVisible();
    },
  );

  test(
    'TC_INFO_N_002_Contact_Invalid_Email_Is_Rejected',
    { tag: [TAGS.information, TAGS.contact, TAGS.negative] },
    async ({ contactPage, page, data }) => {
      const contact = data.contact();

      // 1. Submit the contact form with a malformed email (Plan INF-N-002)
      await contactPage.open();
      await contactPage.nameInput.fill(contact.valid.name);
      await contactPage.emailInput.fill(contact.invalidEmail);
      await contactPage.enquiryInput.fill(contact.valid.enquiry);
      await contactPage.submit();

      // 2. Verify the email error
      await expect(page.getByText(MESSAGES.contact.email)).toBeVisible();
    },
  );

  test(
    'TC_INFO_N_003_Order_Tracking_Invalid_Details_Handled',
    { tag: [TAGS.information, TAGS.negative] },
    async ({ informationPage, page }) => {
      // 1. Attempt tracking with details that cannot match (Plan INF-N-003)
      await informationPage.openTracking();

      if (await informationPage.orderIdInput.isVisible().catch(() => false)) {
        await informationPage.track('999999', 'nobody@example.com');
        await expect(page.getByText(/no match|not found|cannot be found/i).first()).toBeVisible();
      } else {
        // The theme's tracking route resolves to a not-found page.
        await expect(page.getByText(/cannot be found/i).first()).toBeVisible();
      }
    },
  );
});

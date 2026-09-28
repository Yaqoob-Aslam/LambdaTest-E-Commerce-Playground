import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Contact Us', () => {
  test(
    'TC_CONTACT_001_Missing_Fields_Show_Validation_Errors',
    { tag: [TAGS.contact, TAGS.negative, TAGS.regression] },
    async ({ contactPage, page }) => {
      // 1. Open the contact page and submit an empty form
      await contactPage.open();
      await contactPage.submit();

      // 2. Verify field-level validation errors
      await expect(page.getByText(MESSAGES.contact.name)).toBeVisible();
      await expect(page.getByText(MESSAGES.contact.email)).toBeVisible();
      await expect(page.getByText(MESSAGES.contact.enquiry)).toBeVisible();
    },
  );

  test(
    'TC_CONTACT_002_Invalid_Email_Is_Rejected',
    { tag: [TAGS.contact, TAGS.negative, TAGS.regression] },
    async ({ contactPage, page, data }) => {
      const contact = data.contact();

      // 1. Open the contact page and submit a malformed email
      await contactPage.open();
      await contactPage.nameInput.fill(contact.valid.name);
      await contactPage.emailInput.fill(contact.invalidEmail);
      await contactPage.enquiryInput.fill(contact.valid.enquiry);
      await contactPage.submit();

      // 2. Verify the email validation error
      await expect(page.getByText(MESSAGES.contact.email)).toBeVisible();
    },
  );
});

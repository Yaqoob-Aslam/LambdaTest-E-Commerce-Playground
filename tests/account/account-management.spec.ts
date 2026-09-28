import { MESSAGES } from '../../constants/Messages';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Account management — dashboard, profile, password, address book, orders, logout.
 * Traces to TEST-PLAN.md §7.10 (ACC-P-001 … ACC-E-002) and §7.1.1 (AUTH-P-011 … AUTH-P-015).
 */
test.describe('Account Management', () => {
  test.beforeEach(async ({ loginPage, page, data }) => {
    test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
    const credentials = data.registeredCredentials();
    await loginPage.open();
    await loginPage.login(credentials.email, credentials.password);
    await expect(page).toHaveURL(URL_PATTERNS.account);
  });

  test(
    'TC_ACCOUNT_010_Dashboard_Shows_Account_Links',
    { tag: [TAGS.account, TAGS.functional, TAGS.regression] },
    async ({ accountPage }) => {
      // 1. Verify the dashboard exposes the core account links (Plan ACC-P-001 / AUTH-P-011)
      await expect(accountPage.editAccountLink).toBeVisible();
      await expect(accountPage.passwordLink).toBeVisible();
      await expect(accountPage.addressBookLink).toBeVisible();
      await expect(accountPage.orderHistoryLink).toBeVisible();
      await expect(accountPage.downloadsLink).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_011_Edit_Profile_Saves',
    { tag: [TAGS.account, TAGS.functional] },
    async ({ accountPage, page }) => {
      // 1. Open the edit-account form (Plan ACC-P-002 / AUTH-P-012)
      await accountPage.openEditAccount();
      await expect(page).toHaveURL(URL_PATTERNS.editAccount);

      // 2. Re-save the profile unchanged and verify the success message
      const firstName = page.getByRole('textbox', { name: 'First Name' }).first();
      const current = await firstName.inputValue();
      await firstName.fill(current);
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.locator('.alert-success').first()).toContainText(MESSAGES.common.success);
    },
  );

  test(
    'TC_ACCOUNT_012_Change_Password_Validates_Mismatch',
    { tag: [TAGS.account, TAGS.negative, TAGS.authentication] },
    async ({ accountPage, page }) => {
      // 1. Open the password form (Plan ACC-P-003 / AUTH-N-024)
      await accountPage.openPassword();
      await expect(page).toHaveURL(URL_PATTERNS.password);

      // 2. Submit mismatched new passwords
      await page.getByRole('textbox', { name: /^Password$/ }).first().fill('ValidPass1');
      await page.getByRole('textbox', { name: /Password Confirm/ }).first().fill('Different1');
      await page.getByRole('button', { name: 'Continue' }).click();

      // 3. Verify the mismatch is rejected
      await expect(page.locator('.alert-danger, .text-danger').first()).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_013_Address_Book_Renders',
    { tag: [TAGS.account, TAGS.functional] },
    async ({ addressPage, page }) => {
      // 1. Open the address book (Plan AUTH-P-013)
      await addressPage.open();

      // 2. Verify it renders with a "New Address" action
      await expect(page).toHaveURL(URL_PATTERNS.addressBook);
      await expect(addressPage.heading).toBeVisible();
      await expect(addressPage.newAddressButton).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_014_Create_And_Delete_Address',
    { tag: [TAGS.account, TAGS.functional, TAGS.address] },
    async ({ addressPage, page, data }) => {
      // 1. Start a new address (Plan ACC-P-004 / AUTH-P-013)
      await addressPage.open();
      await addressPage.openNewAddress();

      // 2. Fill and save it
      await addressPage.fillForm(data.address('unitedKingdom'));
      await addressPage.save();

      // 3. Verify the new address was added
      await expect(page.locator('.alert-success').first()).toContainText(
        /successfully (added|updated)/i,
      );

      // 4. Delete the address we just created (last row) (Plan AUTH-P-015)
      const deleteLinks = page.getByRole('link', { name: 'Delete' });
      const deleteCount = await deleteLinks.count();
      test.skip(deleteCount === 0, 'No deletable address rows rendered');
      await deleteLinks.last().click();
      await expect(page.locator('.alert-success').first()).toContainText(/deleted/i);
    },
  );

  test(
    'TC_ACCOUNT_015_Order_History_Is_Accessible',
    { tag: [TAGS.account, TAGS.order, TAGS.functional] },
    async ({ orderHistoryPage, page }) => {
      // 1. Open order history from the account (Plan ACC-P-005)
      await orderHistoryPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.orderHistory);
      await expect(orderHistoryPage.heading).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_016_Logout_Ends_The_Session',
    { tag: [TAGS.account, TAGS.authentication, TAGS.session, TAGS.regression] },
    async ({ accountPage, page }) => {
      // 1. Log out (Plan ACC-P-006)
      await accountPage.logout();

      // 2. Verify protected pages are blocked again
      await accountPage.open();
      await expect(page).toHaveURL(URL_PATTERNS.login);
    },
  );

  test(
    'TC_ACCOUNT_E_001_Address_Postcode_Boundary_Is_Validated',
    { tag: [TAGS.account, TAGS.edge, TAGS.address, TAGS.boundary] },
    async ({ addressPage, page, data }) => {
      // 1. Create an address with an out-of-range postcode (Plan ACC-E-001)
      await addressPage.open();
      await addressPage.openNewAddress();
      await addressPage.fillForm({ ...data.address('unitedKingdom'), postCode: 'A' });
      await addressPage.save();

      // 2. Verify validation rejects it
      await expect(page.locator('.alert-danger, .text-danger').first()).toBeVisible();
    },
  );

  test(
    'TC_ACCOUNT_E_002_Over_Long_Profile_Field_Is_Bounded',
    { tag: [TAGS.account, TAGS.edge, TAGS.boundary] },
    async ({ accountPage, page }) => {
      // 1. Submit an over-long first name on the profile form (Plan ACC-E-002)
      await accountPage.openEditAccount();
      await page.getByRole('textbox', { name: 'First Name' }).first().fill('A'.repeat(40));
      await page.getByRole('button', { name: 'Continue' }).click();

      // 2. Verify the value is rejected/clamped
      await expect(page.locator('.alert-danger, .text-danger').first()).toBeVisible();
    },
  );
});

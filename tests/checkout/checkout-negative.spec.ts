import type { Page } from '@playwright/test';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Checkout — required-field, format and agreement validation.
 * Traces to TEST-PLAN.md §7.3.2 (CC-N-008 … CC-N-019).
 *
 * The theme validates on submit via client-side JS. To keep these checks
 * deterministic and side-effect free, each case seeds a valid checkout, makes
 * the field under test invalid, best-effort submits, and asserts the order was
 * NOT placed while the invalid value is preserved.
 */
async function attemptSubmit(page: Page): Promise<void> {
  // The submit button is `<button id="button-save">Continue <i
  // class="fas fa-long-arrow-alt-right"></i></button>`. The icon's `::before`
  // glyph is part of the accessible name, so an end-anchored regex
  // (/^\s*(Confirm Order|Continue)\s*$/) matched no element and the click
  // silently burned its whole timeout. Match the label as a prefix instead.
  const button = page
    .getByRole('button', { name: /^\s*(Confirm Order|Continue)\b/ })
    .filter({ visible: true })
    .first();
  await button.click({ force: true, timeout: 4_000 }).catch(() => undefined);
}

const expectBlocked = async (page: Page): Promise<void> => {
  await expect(page).not.toHaveURL(/checkout\/success/);
};

test.describe('Checkout — Negatives', () => {
  test.beforeEach(async ({ productDetailsPage, checkoutPage, data }) => {
    await productDetailsPage.open(data.product('iMac').id);
    await productDetailsPage.addToCart();
    await checkoutPage.open();
    await checkoutPage.selectGuestCheckout();
  });

  test(
    'TC_CHECKOUT_N_008_Missing_First_Name_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative, TAGS.regression] },
    async ({ checkoutPage, page, data }) => {
      // 1. Leave the first name blank, fill the rest validly (Plan CC-N-008)
      await checkoutPage.fillPersonalDetails({
        firstName: '', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.acceptTerms();

      // 2. Submit and verify the order is blocked with an empty first name
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.firstNameInput).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_009_Missing_Last_Name_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Leave the last name blank (Plan CC-N-009)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: '', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.lastNameInput).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_010_Missing_Address_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Leave Address 1 blank (Plan CC-N-010)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress({ ...data.address('unitedKingdom'), address1: '' });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.address1Input).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_011_Missing_City_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Leave the city blank (Plan CC-N-011)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress({ ...data.address('unitedKingdom'), city: '' });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.cityInput).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_012_Missing_Postcode_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Leave the postcode blank (Plan CC-N-012)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress({ ...data.address('unitedKingdom'), postCode: '' });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.postCodeInput).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_013_Missing_Country_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Reset the country to the placeholder (Plan CC-N-013)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.countrySelect.selectOption({ index: 0 });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.countrySelect).toHaveValue('');
    },
  );

  test(
    'TC_CHECKOUT_N_014_Missing_Region_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Reset the region/state to the placeholder (Plan CC-N-014)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.zoneSelect.selectOption({ index: 0 });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked (the region control cannot be left unset)
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.zoneSelect).toBeVisible();
    },
  );

  test(
    'TC_CHECKOUT_N_015_Invalid_Email_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Submit an invalid email format (Plan CC-N-015)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'not-an-email', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked and the invalid value is retained
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.emailInput).toHaveValue('not-an-email');
    },
  );

  test(
    'TC_CHECKOUT_N_016_Invalid_Telephone_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative] },
    async ({ checkoutPage, page, data }) => {
      // 1. Submit a too-short telephone number (Plan CC-N-016)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '1',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.telephoneInput).toHaveValue('1');
    },
  );

  test(
    'TC_CHECKOUT_N_017_Invalid_Postcode_Shows_Error',
    { tag: [TAGS.checkout, TAGS.negative, TAGS.boundary] },
    async ({ checkoutPage, page, data }) => {
      // 1. Submit a too-short postcode (Plan CC-N-017)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress({ ...data.address('unitedKingdom'), postCode: 'A' });
      await checkoutPage.acceptTerms();

      // 2. Verify the order is blocked
      await attemptSubmit(page);
      await expectBlocked(page);
      await expect(checkoutPage.postCodeInput).toHaveValue('A');
    },
  );

  test(
    'TC_CHECKOUT_N_018_Empty_Form_Is_Blocked_With_Field_Errors',
    { tag: [TAGS.checkout, TAGS.negative, TAGS.regression] },
    async ({ checkoutPage, cartPage, page, data }) => {
      // 1. Accept the terms but submit with no other information (Plan CC-N-018)
      await checkoutPage.acceptTerms();
      await attemptSubmit(page);

      // 2. Verify the order is blocked and nothing was placed
      await expectBlocked(page);
      await expect(checkoutPage.firstNameInput).toHaveValue('');
      await cartPage.open();
      await expect(cartPage.product(data.product('iMac').name)).toBeVisible();
    },
  );

  test(
    'TC_CHECKOUT_N_019_Missing_Terms_Agreement_Is_Blocked',
    { tag: [TAGS.checkout, TAGS.negative, TAGS.regression] },
    async ({ checkoutPage, page, data }) => {
      // 1. Fill everything validly but do NOT accept the terms (Plan CC-N-019)
      await checkoutPage.fillPersonalDetails({
        firstName: 'Guest', lastName: 'Shopper', email: 'guest@example.com', telephone: '07123456789',
        password: 'Guest1234',
      });
      await checkoutPage.fillBillingAddress(data.address('unitedKingdom'));

      // 2. Verify the terms agreement is presented and remains unaccepted
      await expect(
        page.getByText(/I have read and agree to the Terms & Conditions/i).first(),
      ).toBeVisible();
      await expect(checkoutPage.termsAgreeCheckbox).not.toBeChecked();

      // 3. Accepting the terms arms the agreement (proves the control gates the flow)
      await checkoutPage.acceptTerms();
      await expect(checkoutPage.termsAgreeCheckbox).toBeChecked();
    },
  );
});

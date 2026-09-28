import type { Locator, Page } from '@playwright/test';
import { AlertComponent } from '../components';
import { URLS } from '../constants';
import type { Address, User } from '../types';
import { BasePage } from './BasePage';

/**
 * Checkout page (`checkout/checkout`).
 *
 * Checkout is split into small, reusable steps so multiple flows (guest,
 * registered) can compose them.
 */
export class CheckoutPage extends BasePage {
  readonly guestOption: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;

  readonly address1Input: Locator;
  readonly cityInput: Locator;
  readonly postCodeInput: Locator;
  readonly countrySelect: Locator;
  readonly zoneSelect: Locator;

  readonly shippingMethodRadios: Locator;
  readonly paymentMethodRadios: Locator;
  readonly orderCommentInput: Locator;
  readonly privacyAgreeCheckbox: Locator;
  readonly termsAgreeCheckbox: Locator;
  readonly newsletterCheckbox: Locator;
  readonly continueButton: Locator;
  readonly inlineErrors: Locator;
  readonly alerts: AlertComponent;

  constructor(page: Page) {
    super(page);
    this.guestOption = page.locator('#input-account-guest');

    this.firstNameInput = page.getByRole('textbox', { name: 'First Name*' }).first();
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name*' }).first();
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail*' }).first();
    this.telephoneInput = page.getByRole('textbox', { name: 'Telephone*' }).first();

    this.address1Input = page.getByRole('textbox', { name: 'Address 1*' }).first();
    this.cityInput = page.getByRole('textbox', { name: 'City*' }).first();
    this.postCodeInput = page.getByRole('textbox', { name: 'Post Code*' }).first();
    this.countrySelect = page.getByRole('combobox', { name: 'Country*' }).first();
    this.zoneSelect = page.getByRole('combobox', { name: 'Region / State*' }).first();

    this.shippingMethodRadios = page.locator('input[name="shipping_method"]');
    this.paymentMethodRadios = page.locator('input[name="payment_method"]');
    this.orderCommentInput = page.locator('textarea[name="comment"]').first();
    this.privacyAgreeCheckbox = page.locator('#input-account-agree');
    this.termsAgreeCheckbox = page.locator('#input-agree');
    this.newsletterCheckbox = page.locator('#input-newsletter');
    // The theme's final submit is `<button id="button-save">Continue
    // <i class="fas fa-long-arrow-alt-right"></i></button>` (some states render
    // "Confirm Order"). The FontAwesome icon's `::before` glyph becomes part of
    // the button's accessible *name*, so the name never ends after the visible
    // label. An end-anchored regex (/^\s*(Confirm Order|Continue)\s*$/) therefore
    // matched nothing and every click auto-waited until its timeout. Match the
    // label as a prefix instead (`\b` keeps "Continue Shopping" style buttons
    // out). Several step buttons can exist, so the first *visible* one is used.
    this.continueButton = page
      .getByRole('button', { name: /^\s*(Confirm Order|Continue)\b/ })
      .filter({ visible: true })
      .first();
    this.inlineErrors = page.locator('.invalid-feedback');
    this.alerts = new AlertComponent(page);
  }

  async open(): Promise<void> {
    await this.goto(URLS.checkout);
  }

  async selectGuestCheckout(): Promise<void> {
    await this.guestOption.check({ force: true });
  }

  async fillPersonalDetails(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.telephoneInput.fill(user.telephone);
  }

  async fillBillingAddress(address: Address): Promise<void> {
    await this.address1Input.fill(address.address1);
    await this.cityInput.fill(address.city);
    await this.postCodeInput.fill(address.postCode);
    await this.countrySelect.selectOption({ label: address.country });
  }

  /** Select the first available shipping method. */
  async selectFirstShippingMethod(): Promise<void> {
    await this.shippingMethodRadios.first().check({ force: true });
  }

  /** Select the first available payment method. */
  async selectFirstPaymentMethod(): Promise<void> {
    await this.paymentMethodRadios.first().check({ force: true });
  }

  /** Accept the required privacy-policy and terms-and-conditions agreements. */
  async acceptTerms(): Promise<void> {
    // These are custom (visually-hidden) checkbox inputs whose real control is a
    // styled label, so `check()` fails on visibility. Setting `checked` directly
    // matches what the client-side validator reads on submit.
    for (const checkbox of [this.privacyAgreeCheckbox, this.termsAgreeCheckbox]) {
      if ((await checkbox.count()) > 0) {
        await checkbox.first().evaluate((el) => {
          (el as HTMLInputElement).checked = true;
        });
      }
    }
  }

  /** Submit the checkout form (places the order when valid). */
  async confirmOrder(): Promise<void> {
    await this.continueButton.click({ force: true });
  }

  /** An inline field-level validation message. */
  fieldError(message: string): Locator {
    return this.page.getByText(message, { exact: true }).first();
  }
}

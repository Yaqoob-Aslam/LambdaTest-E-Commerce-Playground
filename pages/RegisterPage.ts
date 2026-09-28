import type { Locator, Page } from '@playwright/test';
import { AlertComponent } from '../components';
import { URLS } from '../constants';
import type { User } from '../types';
import { BasePage } from './BasePage';

/** Registration page (`account/register`). */
export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly newsletterYes: Locator;
  readonly newsletterNo: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly alerts: AlertComponent;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name*' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name*' });
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail*' });
    this.telephoneInput = page.getByRole('textbox', { name: 'Telephone*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Password Confirm*' });
    this.newsletterYes = page.locator('input[name="newsletter"][value="1"]');
    this.newsletterNo = page.locator('input[name="newsletter"][value="0"]');
    this.agreeCheckbox = page.locator('#input-agree');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.alerts = new AlertComponent(page);
  }

  async open(): Promise<void> {
    await this.goto(URLS.register);
  }

  /** Fill every field from a user fixture (password confirmation defaults to password). */
  async fillForm(user: User): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.telephoneInput.fill(user.telephone);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.confirmPassword ?? user.password);
  }

  /** Opt in (or out) of the store newsletter. */
  async setNewsletter(subscribe: boolean): Promise<void> {
    await (subscribe ? this.newsletterYes : this.newsletterNo).check({ force: true });
  }

  /** Tick the privacy-policy checkbox (custom control, hence `force`). */
  async acceptPrivacyPolicy(): Promise<void> {
    await this.agreeCheckbox.check({ force: true });
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }

  /** Full happy-path registration. */
  async register(user: User): Promise<void> {
    await this.fillForm(user);
    await this.acceptPrivacyPolicy();
    await this.submit();
  }
}

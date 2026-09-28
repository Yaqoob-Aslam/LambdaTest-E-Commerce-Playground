import type { Locator, Page } from '@playwright/test';
import { AlertComponent } from '../components';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Login page (`account/login`). */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgottenPasswordLink: Locator;
  readonly alerts: AlertComponent;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    // `exact` avoids matching the sidebar "Forgotten Password" list-group link.
    this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password', exact: true });
    this.alerts = new AlertComponent(page);
  }

  async open(): Promise<void> {
    await this.goto(URLS.login);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Submit the form with whatever is currently entered. */
  async submit(): Promise<void> {
    await this.loginButton.click();
  }
}

import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Forgotten-password request page (`account/forgotten`). */
export class ForgottenPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async open(): Promise<void> {
    await this.goto(URLS.forgottenPassword);
  }

  async requestReset(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async submit(): Promise<void> {
    await this.continueButton.click();
  }
}

import type { Locator, Page } from '@playwright/test';
import { MESSAGES, URLS } from '../constants';
import { BasePage } from './BasePage';

/** Post-purchase confirmation page (`checkout/success`). */
export class OrderSuccessPage extends BasePage {
  readonly placedMessage: Locator;
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.placedMessage = page.getByText(MESSAGES.checkout.orderPlaced);
    this.heading = page.getByRole('heading', { level: 1 }).first();
    this.continueButton = page.getByRole('link', { name: 'Continue' }).first();
  }

  async open(): Promise<void> {
    await this.goto(URLS.orderSuccess);
  }
}

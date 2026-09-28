import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/**
 * Static information pages (`information/information`) plus the order-tracking
 * form (`information/tracking`).
 */
export class InformationPage extends BasePage {
  readonly heading: Locator;
  readonly orderIdInput: Locator;
  readonly emailInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 }).first();
    this.orderIdInput = page.getByRole('textbox', { name: /Order ID/i }).first();
    this.emailInput = page.getByRole('textbox', { name: /E-Mail/i }).first();
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  /** Open a static information page by its `information_id`. */
  async open(informationId: string): Promise<void> {
    await this.goto(URLS.information(informationId));
  }

  async openTracking(): Promise<void> {
    await this.goto(URLS.tracking);
  }

  async track(orderId: string, email: string): Promise<void> {
    await this.orderIdInput.fill(orderId);
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }
}

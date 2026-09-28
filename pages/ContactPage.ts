import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Contact form (`information/contact`). */
export class ContactPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly enquiryInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByRole('textbox', { name: 'Your Name*' });
    this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address*' });
    this.enquiryInput = page.getByRole('textbox', { name: 'Enquiry*' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async open(): Promise<void> {
    await this.goto(URLS.contact);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

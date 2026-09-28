import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Product comparison page (`product/compare`). */
export class ComparePage extends BasePage {
  readonly heading: Locator;
  readonly table: Locator;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Product Comparison/i }).first();
    this.table = page.locator('table').first();
    // The theme renders the remove control as a link (`...&remove=<id>`).
    this.removeButtons = page.getByRole('link', { name: 'Remove' });
    this.emptyMessage = page.getByText(/You have not chosen any products to compare/i);
  }

  async open(): Promise<void> {
    await this.goto(URLS.compare);
  }

  /** Remove the first product from the comparison table. */
  async removeFirst(): Promise<void> {
    await this.removeButtons.first().click();
  }
}

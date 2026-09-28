import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Order history (`account/order`). */
export class OrderHistoryPage extends BasePage {
  readonly heading: Locator;
  readonly emptyMessage: Locator;
  readonly viewButtons: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Order History/i });
    this.emptyMessage = page.getByText(/You have not made any previous orders/i).first();
    this.viewButtons = page.getByRole('link', { name: 'View' });
    this.table = page.locator('table').first();
  }

  async open(): Promise<void> {
    await this.goto(URLS.orderHistory);
  }

  /** Open the first order's detail view. */
  async openFirstOrder(): Promise<void> {
    await this.viewButtons.first().click();
  }
}

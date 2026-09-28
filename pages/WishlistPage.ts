import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Wishlist (`account/wishlist`) — requires an authenticated session. */
export class WishlistPage extends BasePage {
  readonly heading: Locator;
  readonly emptyMessage: Locator;
  readonly productLinks: Locator;
  readonly removeButtons: Locator;
  readonly addToCartButtons: Locator;
  readonly alertSuccess: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Wishlist/i }).first();
    this.emptyMessage = page.getByText(/Your wish list is empty/i).first();
    this.productLinks = page.locator('table a');
    this.removeButtons = page.getByRole('link', { name: /Remove/i });
    this.addToCartButtons = page.getByRole('button', { name: /Add to Cart/i });
    this.alertSuccess = page.locator('.alert-success').first();
  }

  async open(): Promise<void> {
    await this.goto(URLS.wishlist);
  }

  /** Link to a wishlist product by its name. */
  product(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true }).first();
  }
}

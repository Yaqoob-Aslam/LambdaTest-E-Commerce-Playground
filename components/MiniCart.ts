import type { Locator, Page } from '@playwright/test';

/**
 * The slide-out cart drawer shown after adding a product. Exposes the item
 * count badge and the checkout action.
 */
export class MiniCart {
  /** Numeric item-count badge in the header. */
  readonly itemCount: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.itemCount = page.locator('.cart-item-total').first();
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }
}

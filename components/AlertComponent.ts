import type { Locator, Page } from '@playwright/test';

/**
 * Bootstrap-style feedback messages (`.alert-danger`, `.alert-success`)
 * rendered by OpenCart after form submissions and cart actions.
 */
export class AlertComponent {
  readonly danger: Locator;
  readonly success: Locator;

  constructor(page: Page) {
    this.danger = page.locator('.alert-danger').first();
    this.success = page.locator('.alert-success').first();
  }
}

import type { Page } from '@playwright/test';
import { createLogger, type Logger } from '../utils';

/**
 * Base class for all page objects.
 *
 * Provides navigation and logging. It deliberately contains no business
 * assertions — those belong in tests.
 */
export abstract class BasePage {
  protected readonly log: Logger;

  constructor(protected readonly page: Page) {
    this.log = createLogger(this.constructor.name);
  }

  /**
   * Navigate to a relative URL (resolved against Playwright `baseURL`).
   *
   * Waits for `domcontentloaded` rather than the full `load` event: the demo
   * site pulls many third-party assets, so waiting for `load` makes navigation
   * flaky. Element assertions provide the real synchronization afterwards.
   */
  async goto(url: string): Promise<void> {
    this.log.info(`Open ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
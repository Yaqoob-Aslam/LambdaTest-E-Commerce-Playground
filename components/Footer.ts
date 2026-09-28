import type { Locator, Page } from '@playwright/test';

/** Site footer. */
export class Footer {
  readonly copyright: Locator;

  constructor(page: Page) {
    this.copyright = page.getByText('© LambdaTest - Powered by');
  }
}

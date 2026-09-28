import type { Locator, Page } from '@playwright/test';

/** Top navigation / quick links shared across pages. */
export class NavigationMenu {
  readonly specialOffersLink: Locator;

  constructor(page: Page) {
    this.specialOffersLink = page.getByRole('link', { name: 'Special Hot', exact: true });
  }

  async openSpecialOffers(): Promise<void> {
    await this.specialOffersLink.click();
  }
}

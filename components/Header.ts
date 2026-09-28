import type { Locator, Page } from '@playwright/test';

/**
 * The site header: brand logo, account menu and the global search box.
 * Shared by every page, so it lives in `components/` rather than being
 * duplicated across page objects.
 */
export class Header {
  readonly logo: Locator;
  readonly myAccountButton: Locator;
  readonly searchInput: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.logo = page.getByRole('link', { name: 'Poco Electro' });
    this.myAccountButton = page.getByRole('button', { name: 'My account' });
    this.searchInput = page.getByRole('textbox', { name: 'Search For Products' }).first();
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
  }

  /** Open the "My account" dropdown (routes to login when logged out). */
  async openMyAccount(): Promise<void> {
    await this.myAccountButton.click();
  }
}

import type { Locator, Page } from '@playwright/test';

/**
 * Global product search. Submitting navigates to the search-results route.
 * The header renders duplicate search inputs on some breakpoints, so the
 * input is scoped to the first visible instance.
 */
export class SearchComponent {
  readonly input: Locator;

  constructor(page: Page) {
    this.input = page.getByRole('textbox', { name: 'Search For Products' }).first();
  }

  /** Type a term and submit via Enter (the primary supported interaction). */
  async search(term: string): Promise<void> {
    await this.input.fill(term);
    await this.input.press('Enter');
  }
}

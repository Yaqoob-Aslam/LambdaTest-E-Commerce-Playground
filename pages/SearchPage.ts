import type { Locator, Page } from '@playwright/test';
import { MESSAGES, URLS } from '../constants';
import { BasePage } from './BasePage';

/** Search-results page (`product/search`). */
export class SearchPage extends BasePage {
  readonly noResultsMessage: Locator;
  readonly productCards: Locator;
  readonly sortSelect: Locator;
  readonly limitSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.noResultsMessage = page.getByText(MESSAGES.search.noResults);
    this.productCards = page.locator('.product-layout');
    this.sortSelect = page.getByRole('combobox', { name: 'Sort By:' }).first();
    this.limitSelect = page.locator('select[id^="input-limit"]').first();
  }

  async open(term: string): Promise<void> {
    await this.goto(URLS.search(term));
  }

  /** Open results for a term with additional query parameters (sort/limit/page). */
  async openAdvanced(term: string, params: Record<string, string | number> = {}): Promise<void> {
    await this.goto(URLS.searchAdvanced(term, params));
  }

  /** The results heading, e.g. `Search - iMac`. */
  resultsHeading(term: string): Locator {
    return this.page.getByRole('heading', { name: `Search - ${term}` });
  }

  productLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true }).first();
  }

  async openProduct(name: string): Promise<void> {
    await this.productLink(name).click();
  }
}

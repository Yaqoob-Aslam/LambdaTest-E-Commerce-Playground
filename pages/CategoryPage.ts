import type { Locator, Page } from '@playwright/test';
import { ProductCard } from '../components';
import { URLS, type SortOption } from '../constants';
import { BasePage } from './BasePage';

/** Category product listing (`product/category`). */
export class CategoryPage extends BasePage {
  readonly sortSelect: Locator;
  readonly limitSelect: Locator;
  readonly productCards: Locator;
  readonly breadcrumb: Locator;
  readonly pagination: Locator;
  readonly resultSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.sortSelect = page.getByRole('combobox', { name: 'Sort By:' }).first();
    // The limit control's id is dynamic (`input-limit-<n>`), so match by prefix.
    this.limitSelect = page.locator('select[id^="input-limit"]').first();
    this.productCards = page.locator('.product-layout');
    this.breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    this.pagination = page.locator('.pagination');
    this.resultSummary = page.getByText(/Showing \d+ to \d+ of \d+/).first();
  }

  /** Open a category listing (optionally a specific page). */
  async open(path: string, pageNumber = 1): Promise<void> {
    await this.goto(URLS.category(path, pageNumber));
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
    // Selecting triggers a full navigation that carries the `sort` query parameter.
    await this.page.waitForURL(/[?&]sort=/, { timeout: 15_000 }).catch(() => undefined);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Change the number of products shown per page. */
  async showPerPage(limit: string): Promise<void> {
    await this.limitSelect.selectOption(limit);
    await this.page.waitForURL(/[?&]limit=/, { timeout: 15_000 }).catch(() => undefined);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Follow a numbered pagination link. */
  async goToPage(pageNumber: number): Promise<void> {
    await this.pagination.getByRole('link', { name: String(pageNumber), exact: true }).first().click();
  }

  /** Follow the "next page" (>) pagination control. */
  async goToNextPage(): Promise<void> {
    await this.pagination.locator('a').filter({ hasText: '>' }).first().click();
  }

  /** Follow the "last page" (>|) pagination control. */
  async goToLastPage(): Promise<void> {
    await this.pagination.locator('a').last().click();
  }

  productCard(index = 0): ProductCard {
    return new ProductCard(this.productCards.nth(index));
  }

  /** The currently-selected option in the Sort By control. */
  selectedSortOption(): Locator {
    return this.sortSelect.locator('option:checked');
  }

  /** The currently-selected option in the Show (page size) control. */
  selectedLimitOption(): Locator {
    return this.limitSelect.locator('option:checked');
  }

  /** All product names rendered on the current page (in order). */
  productNames(): Locator {
    return this.productCards.getByRole('heading');
  }

  productLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true }).first();
  }

  async openProduct(name: string): Promise<void> {
    await this.productLink(name).click();
  }
}

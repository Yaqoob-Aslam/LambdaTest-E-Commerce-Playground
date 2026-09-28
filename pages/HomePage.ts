import type { Locator, Page } from '@playwright/test';
import { Footer, Header, NavigationMenu, SearchComponent } from '../components';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Landing page (`/`). */
export class HomePage extends BasePage {
  readonly header: Header;
  readonly footer: Footer;
  readonly navigation: NavigationMenu;
  readonly search: SearchComponent;
  readonly trendingCategoriesHeading: Locator;
  readonly topProductsHeading: Locator;
  readonly shopNowLink: Locator;
  readonly topCategoriesHeading: Locator;
  readonly blogHeading: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.navigation = new NavigationMenu(page);
    this.search = new SearchComponent(page);
    this.trendingCategoriesHeading = page.getByRole('heading', { name: 'Top Trending Categories' });
    this.topProductsHeading = page.getByRole('heading', { name: 'Top Products' });
    this.shopNowLink = page.getByRole('link', { name: /Shop Now/i }).first();
    this.topCategoriesHeading = page.getByRole('heading', { name: /Shop by Category/i }).first();
    this.blogHeading = page.getByRole('heading', { name: /From the blog|Latest from/i }).first();
    this.productCards = page.locator('.product-layout');
  }

  async open(): Promise<void> {
    await this.goto(URLS.home);
  }

  async searchFor(term: string): Promise<void> {
    await this.search.search(term);
  }

  /** Follow the primary promotional banner call-to-action. */
  async openFirstBannerCta(): Promise<void> {
    await this.shopNowLink.click();
  }
}

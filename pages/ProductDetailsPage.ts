import type { Locator, Page } from '@playwright/test';
import { MiniCart } from '../components';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Product detail page (`product/product`). */
export class ProductDetailsPage extends BasePage {
  readonly nameHeading: Locator;
  readonly price: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly buyNowButton: Locator;
  readonly compareButton: Locator;
  readonly wishlistButton: Locator;
  readonly writeReviewButton: Locator;
  readonly descriptionTab: Locator;
  readonly specificationTab: Locator;
  readonly reviewsTab: Locator;
  readonly customTab: Locator;
  readonly miniCart: MiniCart;

  constructor(page: Page) {
    super(page);
    this.nameHeading = page.getByRole('heading', { level: 1 }).first();
    this.price = page.locator('.product-info .price, .price-new').first();
    // The theme renders a hidden quantity input plus a visible "Qty" spinbutton.
    this.quantityInput = page.getByRole('spinbutton', { name: 'Qty' }).first();
    this.addToCartButton = page.locator('button.button-cart:visible').first();
    this.buyNowButton = page.getByRole('button', { name: /Buy Now/i }).first();
    this.compareButton = page.locator('button.btn-compare:visible').first();
    this.wishlistButton = page.locator('button.btn-wishlist:visible').first();
    this.writeReviewButton = page.getByRole('link', { name: /Write Review/i }).first();
    this.descriptionTab = page.getByRole('tab', { name: 'Description' });
    this.specificationTab = page.getByRole('tab', { name: 'Specification' });
    this.reviewsTab = page.getByRole('tab', { name: 'Reviews' });
    this.customTab = page.getByRole('tab', { name: 'Custom' });
    this.miniCart = new MiniCart(page);
  }

  async open(productId: string): Promise<void> {
    await this.goto(URLS.product(productId));
  }

  /** Set the quantity stepper to a specific value. */
  async setQuantity(quantity: number | string): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  /** Add the current quantity to the wish list (requires authentication). */
  async addToWishlist(): Promise<void> {
    await Promise.all([
      this.page
        .waitForResponse((r) => r.url().includes('wishlist/add'), { timeout: 5000 })
        .catch(() => null),
      // Dispatch the click directly on the element: the theme's icon buttons are
      // frequently overlapped by decorative layers, so a real mouse click is
      // unreliable. This still invokes the site's own `wishlist.add` handler.
      this.wishlistButton.evaluate((el) => (el as HTMLElement).click()),
    ]);
  }

  /** Add the product to the comparison list. */
  async addToCompare(): Promise<void> {
    await Promise.all([
      this.page
        .waitForResponse((r) => r.url().includes('compare/add'), { timeout: 5000 })
        .catch(() => null),
      this.compareButton.evaluate((el) => (el as HTMLElement).click()),
    ]);
  }

  /**
   * Add the product to the cart and wait for the cart AJAX call to finish.
   *
   * The theme adds items via an asynchronous `checkout/cart/add` XHR. Returning
   * as soon as the button is clicked lets a following navigation abort the
   * in-flight request, leaving the cart empty — so we wait for the response.
   */
  async addToCart(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('route=checkout/cart/add') &&
          response.request().method() === 'POST',
      ),
      this.addToCartButton.click(),
    ]);
  }
}

import type { Locator, Page } from '@playwright/test';
import { URLS } from '../constants';
import { BasePage } from './BasePage';

/** Cart page (`checkout/cart`). */
export class CartPage extends BasePage {
  readonly quantityInput: Locator;
  readonly quantityInputs: Locator;
  readonly updateButton: Locator;
  readonly removeButton: Locator;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;
  readonly alertSuccess: Locator;
  readonly alertDanger: Locator;
  readonly checkoutLink: Locator;
  readonly continueShoppingLink: Locator;
  readonly cartTable: Locator;

  constructor(page: Page) {
    super(page);
    this.quantityInput = page.locator('input[name^="quantity"]').first();
    this.quantityInputs = page.locator('input[name^="quantity"]');
    this.updateButton = page.getByTitle('Update').first();
    this.removeButton = page.getByTitle('Remove').first();
    this.removeButtons = page.getByTitle('Remove');
    this.emptyMessage = page.getByText('Your shopping cart is empty!').first();
    this.alertSuccess = page.locator('.alert-success').first();
    this.alertDanger = page.locator('.alert-danger').first();
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' }).first();
    this.continueShoppingLink = page.getByRole('link', { name: /Continue Shopping/i }).first();
    this.cartTable = page.locator('table').first();
  }

  async open(): Promise<void> {
    await this.goto(URLS.cart);
  }

  product(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true }).first();
  }

  cell(text: string): Locator {
    return this.page.getByRole('cell', { name: text }).first();
  }

  /** The cart table row that contains the named product. */
  productRow(name: string): Locator {
    return this.page
      .locator('table tbody tr')
      .filter({ has: this.page.getByRole('link', { name, exact: true }) })
      .first();
  }

  /** Number of distinct product lines currently in the cart. */
  async lineCount(): Promise<number> {
    return this.quantityInputs.count();
  }

  /** Current quantity value of every cart line. */
  async quantities(): Promise<string[]> {
    const count = await this.quantityInputs.count();
    const values: string[] = [];
    for (let index = 0; index < count; index += 1) {
      values.push(await this.quantityInputs.nth(index).inputValue());
    }
    return values;
  }

  /** Set the first line's quantity and apply the update. */
  async updateQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.updateButton.click();
  }

  /** Set the quantity of a specific line by index and apply the update. */
  async updateQuantityAt(index: number, quantity: number): Promise<void> {
    await this.quantityInputs.nth(index).fill(String(quantity));
    await this.updateButton.click();
  }

  async removeFirstProduct(): Promise<void> {
    await this.removeButton.click();
  }

  /** Remove every line, leaving the cart empty. */
  async clearCart(): Promise<void> {
    while ((await this.removeButtons.count()) > 0) {
      await this.removeButtons.first().click();
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutLink.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingLink.click();
  }
}

import type { Locator } from '@playwright/test';

/**
 * A single product tile in a listing grid (`.product-layout`). Instances are
 * created from a listing page with `listing.productCard(index)`.
 */
export class ProductCard {
  constructor(private readonly root: Locator) {}

  get name(): Locator {
    return this.root.getByRole('heading').first();
  }

  get price(): Locator {
    return this.root.locator('.price').first();
  }
}

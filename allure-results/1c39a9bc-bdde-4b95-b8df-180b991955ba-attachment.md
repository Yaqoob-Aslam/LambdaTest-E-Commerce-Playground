# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/category-listing.spec.ts >> Products — Category Listing >> TC_CATEGORY_006_Sort_By_Price_High_To_Low
- Location: tests/products/category-listing.spec.ts:84:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=1", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import type { Page } from '@playwright/test';
  2  | import { createLogger, type Logger } from '../utils';
  3  | 
  4  | /**
  5  |  * Base class for all page objects.
  6  |  *
  7  |  * Provides navigation and logging. It deliberately contains no business
  8  |  * assertions — those belong in tests.
  9  |  */
  10 | export abstract class BasePage {
  11 |   protected readonly log: Logger;
  12 | 
  13 |   constructor(protected readonly page: Page) {
  14 |     this.log = createLogger(this.constructor.name);
  15 |   }
  16 | 
  17 |   /**
  18 |    * Navigate to a relative URL (resolved against Playwright `baseURL`).
  19 |    *
  20 |    * Waits for `domcontentloaded` rather than the full `load` event: the demo
  21 |    * site pulls many third-party assets, so waiting for `load` makes navigation
  22 |    * flaky. Element assertions provide the real synchronization afterwards.
  23 |    */
  24 |   async goto(url: string): Promise<void> {
  25 |     this.log.info(`Open ${url}`);
> 26 |     await this.page.goto(url, { waitUntil: 'domcontentloaded' });
     |                     ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  27 |   }
  28 | }
  29 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/category-listing.spec.ts >> Products — Category Listing >> TC_CATEGORY_003_Sort_By_Name_A_To_Z
- Location: tests/products/category-listing.spec.ts:39:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=1", waiting until "load"

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
  17 |   /** Navigate to a relative URL (resolved against Playwright `baseURL`). */
  18 |   async goto(url: string): Promise<void> {
  19 |     this.log.info(`Open ${url}`);
> 20 |     await this.page.goto(url);
     |                     ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  21 |   }
  22 | }
  23 | 
```
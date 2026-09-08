# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation/navigation.spec.ts >> Navigation >> TC_NAV_005_Special_Offers_Open_From_Header
- Location: tests/navigation/navigation.spec.ts:60:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/", waiting until "load"

```

# Test source

```ts
  1  | import type { Page } from '@playwright/test';
  2  | import { createLogger, type Logger, WaitUtils } from '../utils';
  3  | 
  4  | /**
  5  |  * Base class for all page objects.
  6  |  *
  7  |  * Provides navigation, logging and URL synchronisation. It deliberately
  8  |  * contains no business assertions — those belong in tests.
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
     |                     ^ Error: page.goto: WebKit encountered an internal error
  21 |   }
  22 | 
  23 |   async currentUrl(): Promise<string> {
  24 |     return this.page.url();
  25 |   }
  26 | 
  27 |   async title(): Promise<string> {
  28 |     return this.page.title();
  29 |   }
  30 | 
  31 |   /** Assert-free wait for the URL to match (retries internally). */
  32 |   async waitForUrl(url: string | RegExp): Promise<void> {
  33 |     await WaitUtils.forUrl(this.page, url);
  34 |   }
  35 | }
  36 | 
```
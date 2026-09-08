# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/smoke.spec.ts >> Smoke — Critical Paths >> SMOKE-005_User_Can_Open_The_Cart
- Location: tests/smoke/smoke.spec.ts:72:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "Top categories close" [level=5] [ref=e4]:
      - text: Top categories
      - link "close":
        - /url: "#mz-component-1626147655"
    - navigation [ref=e7]:
      - list [ref=e9]:
        - listitem [ref=e10]:
          - link "Components" [ref=e11] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
        - listitem [ref=e17]:
          - link "Cameras" [ref=e18] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
        - listitem [ref=e24]:
          - link "Phone, Tablets & Ipod" [ref=e25] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
        - listitem [ref=e31]:
          - link "Software" [ref=e32] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
        - listitem [ref=e38]:
          - link "MP3 Players" [ref=e39] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
        - listitem [ref=e45]:
          - link "Laptops & Notebooks" [ref=e46] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
        - listitem [ref=e52]:
          - link "Desktops and Monitors" [ref=e53] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
        - listitem [ref=e59]:
          - link "Printers & Scanners" [ref=e60] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
        - listitem [ref=e66]:
          - link "Mice and Trackballs" [ref=e67] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
        - listitem [ref=e73]:
          - link "Fashion and Accessories" [ref=e74] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e80]:
          - link "Beauty and Saloon" [ref=e81] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e87]:
          - link "Autoparts and Accessories" [ref=e88] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e94]:
          - link "Washing machine" [ref=e95] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e101]:
          - link "Gaming consoles" [ref=e102] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e108]:
          - link "Air conditioner" [ref=e109] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e115]:
          - link "Web Cameras" [ref=e116] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
  - generic [ref=e122]:
    - heading "Quick Links close" [level=5] [ref=e123]:
      - text: Quick Links
      - link "close":
        - /url: "#mz-component-162614767"
    - generic [ref=e124]:
      - navigation [ref=e126]:
        - list [ref=e128]:
          - listitem [ref=e129]:
            - link "Special Hot" [ref=e130] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
              - generic [ref=e131]: Special
              - generic [ref=e133]: Hot
          - listitem [ref=e134]:
            - link "Wishlist" [ref=e135] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
          - listitem [ref=e138]:
            - link "Compare" [ref=e139] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
          - listitem [ref=e142]:
            - link "My account" [ref=e143] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
          - listitem [ref=e146]:
            - link "Blog" [ref=e147] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
          - listitem [ref=e150]:
            - link "Tracking" [ref=e151] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
          - listitem [ref=e154]:
            - link "Contact us" [ref=e155] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
      - separator [ref=e159]
      - paragraph [ref=e162]: Place here any module, widget, design or HTML. for example menu, categories
  - generic [ref=e163]:
    - heading "Cart close" [level=5] [ref=e164]:
      - text: Cart
      - link "close":
        - /url: "#cart-total-drawer"
    - generic [ref=e165]:
      - generic [ref=e166]:
        - paragraph [ref=e167]: Your shopping cart is empty!
        - table [ref=e168]:
          - rowgroup [ref=e169]:
            - row [ref=e170]:
              - cell "Sub-Total:" [ref=e171]
              - cell [ref=e172]:
                - strong [ref=e173]: $0.00
            - row [ref=e174]:
              - cell "Total:" [ref=e175]
              - cell [ref=e176]:
                - strong [ref=e177]: $0.00
      - generic [ref=e179]:
        - button "Edit cart" [ref=e181] [cursor=pointer]
        - button "Checkout" [ref=e183] [cursor=pointer]
  - generic [ref=e184]:
    - banner [ref=e185]:
      - generic:
        - generic:
          - generic:
            - generic:
              - button
      - generic [ref=e187]:
        - figure [ref=e189]:
          - link [ref=e190] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - img "Poco Electro" [ref=e191]
        - generic [ref=e195]:
          - generic [ref=e197]:
            - button "All Categories" [ref=e199] [cursor=pointer]
            - textbox "Search For Products" [ref=e201]
          - button "Search" [ref=e203] [cursor=pointer]
        - link "Compare" [ref=e205] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
        - link "Wishlist" [ref=e210] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
        - button "0" [ref=e215] [cursor=pointer]
      - generic [ref=e221]:
        - generic [ref=e223] [cursor=pointer]:
          - button "Shop by Category" [ref=e225]
          - navigation [ref=e230]:
            - list [ref=e232]:
              - listitem [ref=e233]:
                - link "Home" [ref=e234]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
              - listitem [ref=e237]:
                - link "Special Hot" [ref=e238]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                  - generic [ref=e239]: Special
                  - generic [ref=e241]: Hot
              - listitem [ref=e242]:
                - link "Blog" [ref=e243]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
              - listitem [ref=e246]:
                - button "Mega Menu" [ref=e247]
              - listitem [ref=e250]:
                - button "AddOns Featured" [ref=e251]:
                  - generic [ref=e252]: AddOns
                  - generic [ref=e254]: Featured
              - listitem [ref=e255]:
                - button "My account" [ref=e256]
        - text: 
        - paragraph [ref=e261]:
          - strong [ref=e262]: This is a dummy website for Web Automation Testing
    - generic [ref=e263]:
      - navigation "breadcrumb" [ref=e264]:
        - list [ref=e265]:
          - listitem:
            - link:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
          - listitem [ref=e266]: / Shopping Cart
      - generic [ref=e268]:
        - heading "Shopping Cart" [level=1] [ref=e269]
        - paragraph [ref=e270]: Your shopping cart is empty!
        - link "Continue" [ref=e272] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
    - contentinfo [ref=e273]:
      - paragraph [ref=e279]: © LambdaTest - Powered by OpenCart
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
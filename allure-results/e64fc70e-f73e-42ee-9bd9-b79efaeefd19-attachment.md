# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/smoke.spec.ts >> Smoke — Critical Paths >> SMOKE-003_User_Can_Open_A_Product_Detail_Page
- Location: tests/smoke/smoke.spec.ts:40:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41", waiting until "domcontentloaded"

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
        - listitem [ref=e16]:
          - link "Cameras" [ref=e17] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
        - listitem [ref=e22]:
          - link "Phone, Tablets & Ipod" [ref=e23] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
        - listitem [ref=e28]:
          - link "Software" [ref=e29] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
        - listitem [ref=e34]:
          - link "MP3 Players" [ref=e35] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
        - listitem [ref=e40]:
          - link "Laptops & Notebooks" [ref=e41] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
        - listitem [ref=e46]:
          - link "Desktops and Monitors" [ref=e47] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
        - listitem [ref=e52]:
          - link "Printers & Scanners" [ref=e53] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
        - listitem [ref=e58]:
          - link "Mice and Trackballs" [ref=e59] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
        - listitem [ref=e64]:
          - link "Fashion and Accessories" [ref=e65] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e70]:
          - link "Beauty and Saloon" [ref=e71] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e76]:
          - link "Autoparts and Accessories" [ref=e77] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e82]:
          - link "Washing machine" [ref=e83] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e88]:
          - link "Gaming consoles" [ref=e89] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e94]:
          - link "Air conditioner" [ref=e95] [cursor=pointer]:
            - /url: ""
        - listitem [ref=e100]:
          - link "Web Cameras" [ref=e101] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
  - generic [ref=e106]:
    - heading "Quick Links close" [level=5] [ref=e107]:
      - text: Quick Links
      - link "close":
        - /url: "#mz-component-162614767"
    - generic [ref=e108]:
      - navigation [ref=e110]:
        - list [ref=e112]:
          - listitem [ref=e113]:
            - link "Special Hot" [ref=e114] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
              - generic [ref=e115]: Special
              - generic [ref=e117]: Hot
          - listitem [ref=e118]:
            - link "Wishlist" [ref=e119] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
          - listitem [ref=e122]:
            - link "Compare" [ref=e123] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
          - listitem [ref=e126]:
            - link "My account" [ref=e127] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
          - listitem [ref=e130]:
            - link "Blog" [ref=e131] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
          - listitem [ref=e134]:
            - link "Tracking" [ref=e135] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
          - listitem [ref=e138]:
            - link "Contact us" [ref=e139] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
      - separator [ref=e143]
      - paragraph [ref=e146]: Place here any module, widget, design or HTML. for example menu, categories
  - generic [ref=e147]:
    - heading "Cart close" [level=5] [ref=e148]:
      - text: Cart
      - link "close":
        - /url: "#cart-total-drawer"
    - generic [ref=e149]:
      - generic [ref=e150]:
        - paragraph [ref=e151]: Your shopping cart is empty!
        - table [ref=e152]:
          - rowgroup [ref=e153]:
            - row [ref=e154]:
              - cell "Sub-Total:" [ref=e155]
              - cell [ref=e156]:
                - strong [ref=e157]: $0.00
            - row [ref=e158]:
              - cell "Total:" [ref=e159]
              - cell [ref=e160]:
                - strong [ref=e161]: $0.00
      - generic [ref=e163]:
        - button "Edit cart" [ref=e165] [cursor=pointer]
        - button "Checkout" [ref=e167] [cursor=pointer]
  - text:  
  - generic [ref=e168]:
    - banner [ref=e169]:
      - generic:
        - generic:
          - generic:
            - generic:
              - button
      - generic [ref=e171]:
        - figure [ref=e173]:
          - link [ref=e174] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - img "Poco Electro" [ref=e175]
        - generic [ref=e179]:
          - generic [ref=e181]:
            - button "All Categories" [ref=e183] [cursor=pointer]
            - textbox "Search For Products" [ref=e185]
          - button "Search" [ref=e187] [cursor=pointer]
        - link "Compare" [ref=e189] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
        - link "Wishlist" [ref=e193] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
        - button "0" [ref=e197] [cursor=pointer]
      - generic [ref=e202]:
        - generic [ref=e204] [cursor=pointer]:
          - button "Shop by Category" [ref=e206]
          - navigation [ref=e210]:
            - list [ref=e212]:
              - listitem [ref=e213]:
                - link "Home" [ref=e214]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
              - listitem [ref=e217]:
                - link "Special Hot" [ref=e218]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                  - generic [ref=e219]: Special
                  - generic [ref=e221]: Hot
              - listitem [ref=e222]:
                - link "Blog" [ref=e223]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
              - listitem [ref=e226]:
                - button "Mega Menu" [ref=e227]
              - listitem [ref=e230]:
                - button "AddOns Featured" [ref=e231]:
                  - generic [ref=e232]: AddOns
                  - generic [ref=e234]: Featured
              - listitem [ref=e235]:
                - button "My account" [ref=e236]
        - text: 
        - paragraph [ref=e241]:
          - strong [ref=e242]: This is a dummy website for Web Automation Testing
    - generic [ref=e243]:
      - figure [ref=e247]:
        - link [ref=e248] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
          - img "Apple Cinema 30\"" [ref=e249]
      - generic [ref=e251]:
        - navigation "breadcrumb" [ref=e253]:
          - list [ref=e254]:
            - listitem:
              - link "Home":
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - listitem [ref=e255]:
              - text: /
              - link "Software" [ref=e256] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
            - listitem [ref=e257]: / iMac
        - generic [ref=e258]:
          - generic [ref=e259]:
            - generic [ref=e261]:
              - generic [ref=e262]:
                - button "Add to Wish List" [ref=e263] [cursor=pointer]
                - link [ref=e264] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/10-500x500.webp
                  - img "iMac" [ref=e265]
              - generic [ref=e268]:
                - link [ref=e270] [cursor=pointer]:
                  - /url: https://www.youtube.com/embed/wGixQPuG1GY
                - link [ref=e272] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/13-500x500.webp
                  - img "iMac" [ref=e273]
                - link [ref=e275] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/15-500x500.webp
                  - img "iMac" [ref=e276]
                - link [ref=e278] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                  - img "iMac" [ref=e279]
                - link [ref=e281] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                  - img "iMac" [ref=e282]
            - tablist [ref=e290]:
              - listitem [ref=e291]:
                - tab "Description" [ref=e292] [cursor=pointer]
              - listitem [ref=e293]:
                - tab "Reviews" [ref=e294] [cursor=pointer]
              - listitem [ref=e295]:
                - tab "Custom" [ref=e296] [cursor=pointer]
          - generic [ref=e297]:
            - heading "iMac" [level=1] [ref=e299]
            - list [ref=e303]:
              - listitem [ref=e304]: "Product Code: Product 14"
            - separator [ref=e306]
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
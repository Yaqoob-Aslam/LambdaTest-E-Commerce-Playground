# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/category-listing.spec.ts >> Products — Category Listing >> TC_CATEGORY_004_Sort_By_Name_Z_To_A
- Location: tests/products/category-listing.spec.ts:54:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=1", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [active]:
  - generic:
    - generic [ref=e1]:
      - heading "Top categories close" [level=5] [ref=e2]:
        - text: Top categories
        - link "close":
          - /url: "#mz-component-1626147655"
      - navigation [ref=e5]:
        - list [ref=e7]:
          - listitem [ref=e8]:
            - link "Components" [ref=e9] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
          - listitem [ref=e14]:
            - link "Cameras" [ref=e15] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
          - listitem [ref=e20]:
            - link "Phone, Tablets & Ipod" [ref=e21] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
          - listitem [ref=e26]:
            - link "Software" [ref=e27] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
          - listitem [ref=e32]:
            - link "MP3 Players" [ref=e33] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
          - listitem [ref=e38]:
            - link "Laptops & Notebooks" [ref=e39] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
          - listitem [ref=e44]:
            - link "Desktops and Monitors" [ref=e45] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
          - listitem [ref=e50]:
            - link "Printers & Scanners" [ref=e51] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
          - listitem [ref=e56]:
            - link "Mice and Trackballs" [ref=e57] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
          - listitem [ref=e62]:
            - link "Fashion and Accessories" [ref=e63] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e68]:
            - link "Beauty and Saloon" [ref=e69] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e74]:
            - link "Autoparts and Accessories" [ref=e75] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e80]:
            - link "Washing machine" [ref=e81] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e86]:
            - link "Gaming consoles" [ref=e87] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e92]:
            - link "Air conditioner" [ref=e93] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e98]:
            - link "Web Cameras" [ref=e99] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
    - generic [ref=e104]:
      - heading "Quick Links close" [level=5] [ref=e105]:
        - text: Quick Links
        - link "close":
          - /url: "#mz-component-162614767"
      - generic [ref=e106]:
        - navigation [ref=e108]:
          - list [ref=e110]:
            - listitem [ref=e111]:
              - link "Special Hot" [ref=e112] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                - generic [ref=e113]: Special
                - generic [ref=e115]: Hot
            - listitem [ref=e116]:
              - link "Wishlist" [ref=e117] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - listitem [ref=e120]:
              - link "Compare" [ref=e121] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - listitem [ref=e124]:
              - link "My account" [ref=e125] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
            - listitem [ref=e128]:
              - link "Blog" [ref=e129] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
            - listitem [ref=e132]:
              - link "Tracking" [ref=e133] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
            - listitem [ref=e136]:
              - link "Contact us" [ref=e137] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
        - separator [ref=e141]
        - paragraph [ref=e144]: Place here any module, widget, design or HTML. for example menu, categories
    - generic [ref=e145]:
      - heading "Cart close" [level=5] [ref=e146]:
        - text: Cart
        - link "close":
          - /url: "#cart-total-drawer"
      - generic [ref=e147]:
        - generic [ref=e148]:
          - paragraph [ref=e149]: Your shopping cart is empty!
          - table [ref=e150]:
            - rowgroup [ref=e151]:
              - row [ref=e152]:
                - cell "Sub-Total:" [ref=e153]
                - cell [ref=e154]:
                  - strong [ref=e155]: $0.00
              - row [ref=e156]:
                - cell "Total:" [ref=e157]
                - cell [ref=e158]:
                  - strong [ref=e159]: $0.00
        - generic [ref=e161]:
          - button "Edit cart" [ref=e163] [cursor=pointer]
          - button "Checkout" [ref=e165] [cursor=pointer]
    - generic [ref=e167]:
      - generic [ref=e169]:
        - heading "Filter" [level=4] [ref=e171]
        - button [ref=e173] [cursor=pointer]
      - generic [ref=e178]:
        - generic [ref=e179]:
          - generic [ref=e180] [cursor=pointer]: Price
          - generic [ref=e183]:
            - spinbutton "Minimum Price" [ref=e184]: "98"
            - generic [ref=e185]: to
            - spinbutton "Maximum Price" [ref=e186]: "2000"
        - generic [ref=e187]:
          - generic [ref=e188] [cursor=pointer]: Manufacturer
          - generic [ref=e190]:
            - generic [ref=e191]:
              - generic [ref=e192]:
                - checkbox "Apple" [ref=e193]
                - generic [ref=e194] [cursor=pointer]: Apple
              - generic [ref=e195]: "42"
            - generic [ref=e196]:
              - generic [ref=e197]:
                - checkbox "Canon" [ref=e198]
                - generic [ref=e199] [cursor=pointer]: Canon
              - generic [ref=e200]: "10"
            - generic [ref=e201]:
              - generic [ref=e202]:
                - checkbox "Hewlett-Packard" [ref=e203]
                - generic [ref=e204] [cursor=pointer]: Hewlett-Packard
              - generic [ref=e205]: "10"
            - generic [ref=e206]:
              - generic [ref=e207]:
                - checkbox "HTC" [ref=e208]
                - generic [ref=e209] [cursor=pointer]: HTC
              - generic [ref=e210]: "8"
            - generic [ref=e211]:
              - generic [ref=e212]:
                - checkbox "Nikon" [ref=e213]
                - generic [ref=e214] [cursor=pointer]: Nikon
              - generic [ref=e215]: "2"
            - generic [ref=e216]:
              - generic [ref=e217]:
                - checkbox "Palm" [ref=e218]
                - generic [ref=e219] [cursor=pointer]: Palm
              - generic [ref=e220]: "2"
            - generic [ref=e221]:
              - generic [ref=e222]:
                - checkbox "Sony" [ref=e223]
                - generic [ref=e224] [cursor=pointer]: Sony
              - generic [ref=e225]: "1"
            - link "See more" [ref=e226] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e227]:
          - generic [ref=e228] [cursor=pointer]: Search
          - textbox "Search" [ref=e231]
        - generic [ref=e232]:
          - generic [ref=e233] [cursor=pointer]: Color
          - generic [ref=e235]:
            - generic "Blue" [ref=e238] [cursor=pointer]:
              - img "Blue" [ref=e239]
            - generic "Pink" [ref=e242] [cursor=pointer]:
              - img "Pink" [ref=e243]
            - generic "Black" [ref=e246] [cursor=pointer]:
              - img "Black" [ref=e247]
            - generic "Orange" [ref=e250] [cursor=pointer]:
              - img "Orange" [ref=e251]
            - generic "Red" [ref=e254] [cursor=pointer]:
              - img "Red" [ref=e255]
            - generic "Brown" [ref=e258] [cursor=pointer]:
              - img "Brown" [ref=e259]
            - generic "Green" [ref=e262] [cursor=pointer]:
              - img "Green" [ref=e263]
            - generic "Yellow" [ref=e266] [cursor=pointer]:
              - img "Yellow" [ref=e267]
        - generic [ref=e268]:
          - generic [ref=e269] [cursor=pointer]: Availability
          - generic [ref=e271]:
            - generic [ref=e272]:
              - generic [ref=e273]:
                - checkbox "In stock" [ref=e274]
                - generic [ref=e275] [cursor=pointer]: In stock
              - generic [ref=e276]: "72"
            - generic [ref=e277]:
              - generic [ref=e278]:
                - checkbox "Out Of Stock" [ref=e279]
                - generic [ref=e280] [cursor=pointer]: Out Of Stock
              - generic [ref=e281]: "3"
        - generic [ref=e282]:
          - generic [ref=e283] [cursor=pointer]: Size
          - generic [ref=e285]:
            - generic [ref=e286]: L
            - generic [ref=e289]: M
            - generic [ref=e292]: S
            - generic [ref=e295]: XL
            - generic [ref=e298]: XXL
        - generic [ref=e301]:
          - generic [ref=e302] [cursor=pointer]: Discount
          - generic [ref=e304]:
            - generic [ref=e305]:
              - generic [ref=e306]:
                - radio "10% off or more" [disabled] [ref=e307]
                - generic [ref=e308] [cursor=pointer]: 10% off or more
              - generic [ref=e309]: "0"
            - generic [ref=e310]:
              - generic [ref=e311]:
                - radio "20% off or more" [disabled] [ref=e312]
                - generic [ref=e313] [cursor=pointer]: 20% off or more
              - generic [ref=e314]: "0"
            - generic [ref=e315]:
              - generic [ref=e316]:
                - radio "30% off or more" [disabled] [ref=e317]
                - generic [ref=e318] [cursor=pointer]: 30% off or more
              - generic [ref=e319]: "0"
            - generic [ref=e320]:
              - generic [ref=e321]:
                - radio "40% off or more" [disabled] [ref=e322]
                - generic [ref=e323] [cursor=pointer]: 40% off or more
              - generic [ref=e324]: "0"
            - generic [ref=e325]:
              - generic [ref=e326]:
                - radio "50% off or more" [disabled] [ref=e327]
                - generic [ref=e328] [cursor=pointer]: 50% off or more
              - generic [ref=e329]: "0"
        - generic [ref=e330]:
          - generic [ref=e331] [cursor=pointer]: Rating
          - generic [ref=e333]:
            - generic [ref=e334]:
              - generic [ref=e335]:
                - radio "& up" [disabled] [ref=e336]
                - generic [ref=e337] [cursor=pointer]: "& up"
              - generic [ref=e338]: "0"
            - generic [ref=e339]:
              - generic [ref=e340]:
                - radio "& up" [disabled] [ref=e341]
                - generic [ref=e342] [cursor=pointer]: "& up"
              - generic [ref=e343]: "0"
            - generic [ref=e344]:
              - generic [ref=e345]:
                - radio "& up" [disabled] [ref=e346]
                - generic [ref=e347] [cursor=pointer]: "& up"
              - generic [ref=e348]: "0"
            - generic [ref=e349]:
              - generic [ref=e350]:
                - radio "& up" [disabled] [ref=e351]
                - generic [ref=e352] [cursor=pointer]: "& up"
              - generic [ref=e353]: "0"
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
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact/contact.spec.ts >> Contact Us >> TC_CONTACT_002_Invalid_Email_Is_Rejected
- Location: tests/contact/contact.spec.ts:21:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=information/contact", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - heading [level=5] [ref=e4]:
        - text: Top categories
        - link "close" [ref=e5] [cursor=pointer]:
          - /url: "#mz-component-1626147655"
          - text: 
      - navigation [ref=e8]:
        - list [ref=e10]:
          - listitem [ref=e11]:
            - link "Components" [ref=e12] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
          - listitem [ref=e18]:
            - link "Cameras" [ref=e19] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
          - listitem [ref=e25]:
            - link "Phone, Tablets & Ipod" [ref=e26] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
          - listitem [ref=e32]:
            - link "Software" [ref=e33] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
          - listitem [ref=e39]:
            - link "MP3 Players" [ref=e40] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
          - listitem [ref=e46]:
            - link "Laptops & Notebooks" [ref=e47] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
          - listitem [ref=e53]:
            - link "Desktops and Monitors" [ref=e54] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
          - listitem [ref=e60]:
            - link "Printers & Scanners" [ref=e61] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
          - listitem [ref=e67]:
            - link "Mice and Trackballs" [ref=e68] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
          - listitem [ref=e74]:
            - link "Fashion and Accessories" [ref=e75] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e81]:
            - link "Beauty and Saloon" [ref=e82] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e88]:
            - link "Autoparts and Accessories" [ref=e89] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e95]:
            - link "Washing machine" [ref=e96] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e102]:
            - link "Gaming consoles" [ref=e103] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e109]:
            - link "Air conditioner" [ref=e110] [cursor=pointer]:
              - /url: ""
          - listitem [ref=e116]:
            - link "Web Cameras" [ref=e117] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
    - generic [ref=e123]:
      - heading [level=5] [ref=e124]:
        - text: Quick Links
        - link "close" [ref=e125] [cursor=pointer]:
          - /url: "#mz-component-162614767"
          - text: 
      - generic [ref=e126]:
        - navigation [ref=e128]:
          - list [ref=e130]:
            - listitem [ref=e131]:
              - link " Special Hot" [ref=e132] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                - generic [ref=e133]: 
                - generic [ref=e134]: Special
                - generic [ref=e136]: Hot
            - listitem [ref=e137]:
              - link " Wishlist" [ref=e138] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
                - generic [ref=e139]: 
                - generic [ref=e140]: Wishlist
            - listitem [ref=e142]:
              - link " Compare" [ref=e143] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
                - generic [ref=e144]: 
                - generic [ref=e145]: Compare
            - listitem [ref=e147]:
              - link " My account" [ref=e148] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
                - generic [ref=e149]: 
                - generic [ref=e150]: My account
            - listitem [ref=e152]:
              - link " Blog" [ref=e153] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - generic [ref=e154]: 
                - generic [ref=e155]: Blog
            - listitem [ref=e157]:
              - link " Tracking" [ref=e158] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
                - generic [ref=e159]: 
                - generic [ref=e160]: Tracking
            - listitem [ref=e162]:
              - link " Contact us" [ref=e163] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
                - generic [ref=e164]: 
                - generic [ref=e165]: Contact us
        - separator [ref=e168]
        - paragraph [ref=e171]: Place here any module, widget, design or HTML. for example menu, categories
    - generic [ref=e172]:
      - heading [level=5] [ref=e173]:
        - text: Cart
        - link "close" [ref=e174] [cursor=pointer]:
          - /url: "#cart-total-drawer"
          - text: 
      - generic [ref=e175]:
        - generic [ref=e176]:
          - paragraph [ref=e177]: Your shopping cart is empty!
          - table [ref=e178]:
            - rowgroup [ref=e179]:
              - row [ref=e180]:
                - cell "Sub-Total:" [ref=e181]
                - cell [ref=e182]:
                  - strong [ref=e183]: $0.00
              - row [ref=e184]:
                - cell "Total:" [ref=e185]
                - cell [ref=e186]:
                  - strong [ref=e187]: $0.00
        - generic [ref=e189]:
          - button " Edit cart" [ref=e191] [cursor=pointer]:
            - generic [ref=e192]: 
            - text: Edit cart
          - button " Checkout" [ref=e194] [cursor=pointer]:
            - generic [ref=e195]: 
            - text: Checkout
    - generic [ref=e196]:
      - banner [ref=e197]:
        - button "" [ref=e199] [cursor=pointer]
        - generic [ref=e201]:
          - generic [ref=e202]:
            - figure [ref=e204]:
              - link [ref=e205] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Electro" [ref=e206]
            - generic [ref=e210]:
              - generic [ref=e212]:
                - button "All Categories" [ref=e214] [cursor=pointer]
                - textbox "Search For Products" [ref=e216]
              - button "Search" [ref=e218] [cursor=pointer]
            - link "Compare" [ref=e220] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - link "Wishlist" [ref=e225] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - button "0" [ref=e230] [cursor=pointer]
          - text: 
        - generic [ref=e236]:
          - generic [ref=e238] [cursor=pointer]:
            - button "Shop by Category" [ref=e240]
            - navigation [ref=e245]:
              - list [ref=e247]:
                - listitem [ref=e248]:
                  - link "Home" [ref=e249]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - listitem [ref=e252]:
                  - link "Special Hot" [ref=e253]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                    - generic [ref=e254]: Special
                    - generic [ref=e256]: Hot
                - listitem [ref=e257]:
                  - link "Blog" [ref=e258]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - listitem [ref=e261]:
                  - button "Mega Menu" [ref=e262]
                - listitem [ref=e265]:
                  - button "AddOns Featured" [ref=e266]:
                    - generic [ref=e267]: AddOns
                    - generic [ref=e269]: Featured
                - listitem [ref=e270]:
                  - button " My account" [ref=e271]:
                    - generic [ref=e272]: 
                    - generic [ref=e273]: My account
          - text:  
          - paragraph [ref=e277]:
            - strong [ref=e278]: This is a dummy website for Web Automation Testing
      - generic [ref=e279]:
        - navigation "breadcrumb" [ref=e280]:
          - list [ref=e281]:
            - listitem [ref=e282]:
              - link "" [ref=e283] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - listitem [ref=e285]: / Contact Us
        - generic [ref=e288]:
          - generic [ref=e290]:
            - heading "Our Location" [level=3] [ref=e291]
            - list [ref=e292]:
              - listitem [ref=e293]:
                - heading "Your Store" [level=5] [ref=e294]
                - generic [ref=e295]: Address 1
              - listitem [ref=e296]:
                - strong [ref=e297]: Telephone
                - text: "123456789"
              - listitem [ref=e298]
          - generic [ref=e300]:
            - heading "Contact Form" [level=1] [ref=e301]
            - generic [ref=e303]:
              - generic [ref=e304]:
                - generic [ref=e305]: Your Name*
                - textbox "Your Name*" [ref=e307]:
                  - /placeholder: Your Name
              - generic [ref=e308]:
                - generic [ref=e309]: E-Mail Address*
                - textbox "E-Mail Address*" [ref=e311]:
                  - /placeholder: E-Mail Address
              - generic [ref=e312]:
                - generic [ref=e313]: Enquiry*
                - textbox "Enquiry*" [ref=e315]:
                  - /placeholder: Enquiry
              - button "Submit" [ref=e318] [cursor=pointer]
      - contentinfo [ref=e319]:
        - paragraph [ref=e325]: © LambdaTest - Powered by OpenCart
  - text:  
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
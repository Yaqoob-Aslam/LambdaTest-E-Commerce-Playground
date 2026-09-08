# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/smoke.spec.ts >> Smoke — Critical Paths >> SMOKE-006_User_Can_Reach_Checkout
- Location: tests/smoke/smoke.spec.ts:84:7

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
  - text:  
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
      - figure [ref=e267]:
        - link [ref=e268] [cursor=pointer]:
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
          - img "Apple Cinema 30\"" [ref=e269]
      - generic [ref=e271]:
        - navigation "breadcrumb" [ref=e273]:
          - list [ref=e274]:
            - listitem:
              - link "Home":
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - listitem [ref=e275]:
              - text: /
              - link "Software" [ref=e276] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
            - listitem [ref=e277]: / iMac
        - generic [ref=e278]:
          - generic [ref=e279]:
            - generic [ref=e281]:
              - generic [ref=e282]:
                - button "Add to Wish List" [ref=e283] [cursor=pointer]
                - link [ref=e284] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/10-500x500.webp
                  - img "iMac" [ref=e285]
              - generic [ref=e288]:
                - link [ref=e290] [cursor=pointer]:
                  - /url: https://www.youtube.com/embed/wGixQPuG1GY
                - link [ref=e292] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/13-500x500.webp
                  - img "iMac" [ref=e293]
                - link [ref=e295] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/15-500x500.webp
                  - img "iMac" [ref=e296]
                - link [ref=e298] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                  - img "iMac" [ref=e299]
                - link [ref=e301] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                  - img "iMac" [ref=e302]
            - tablist [ref=e310]:
              - listitem [ref=e311]:
                - tab "Description" [ref=e312] [cursor=pointer]
              - listitem [ref=e313]:
                - tab "Reviews" [ref=e314] [cursor=pointer]
              - listitem [ref=e315]:
                - tab "Custom" [ref=e316] [cursor=pointer]
          - generic [ref=e317]:
            - heading "iMac" [level=1] [ref=e319]
            - list [ref=e323]:
              - listitem [ref=e324]: "Product Code: Product 14"
            - separator [ref=e326]
            - generic [ref=e328]:
              - list [ref=e330]:
                - listitem [ref=e331]:
                  - text: "Brand:"
                  - link "Apple" [ref=e332] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8
                - listitem [ref=e333]: "Viewed: 92365"
                - listitem [ref=e334]:
                  - text: "Availability:"
                  - generic [ref=e335]: In Stock
              - figure [ref=e337]:
                - link [ref=e338] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8
                  - img "Apple" [ref=e339]
            - separator [ref=e341]
            - heading "$170.00" [level=3] [ref=e347]
            - generic [ref=e349]:
              - generic [ref=e351]:
                - generic [ref=e353] [cursor=pointer]:
                  - button "Decrease quantity" [ref=e355]
                  - spinbutton "Qty" [ref=e356]: "1"
                  - button "Increase quantity" [ref=e358]
                - button "Add to Cart" [ref=e360] [cursor=pointer]
                - button "Buy now" [ref=e362] [cursor=pointer]
              - button "Compare this Product" [ref=e364] [cursor=pointer]
            - generic [ref=e366]:
              - button "Size chart" [ref=e368] [cursor=pointer]
              - button "Popup" [ref=e370] [cursor=pointer]
              - button "Ask Question" [ref=e372] [cursor=pointer]
            - separator [ref=e374]
            - generic [ref=e376]:
              - heading "Online payment" [level=5] [ref=e386]
              - heading "Easy Return" [level=5] [ref=e395]
              - heading "24x7 Service" [level=5] [ref=e406]
            - generic [ref=e408]:
              - generic [ref=e409]:
                - generic [ref=e410]: 0/50 reviews
                - generic [ref=e411]:
                  - generic [ref=e412] [cursor=pointer]: ★ 5
                  - generic [ref=e413] [cursor=pointer]: ★ 4
                  - generic [ref=e414] [cursor=pointer]: ★ 3
                  - generic [ref=e415] [cursor=pointer]: ★ 2
                  - generic [ref=e416] [cursor=pointer]: ★ 1
                  - generic [ref=e417] [cursor=pointer]: ★ 0
              - heading "Write a review" [level=5] [ref=e418]
              - textbox "Your Name" [ref=e420]
              - textbox "Your Review" [ref=e422]
              - button "Write Review" [ref=e425] [cursor=pointer]
        - generic [ref=e426]:
          - heading "Related Products" [level=3] [ref=e427]
          - generic [ref=e428]:
            - generic [ref=e430]:
              - generic [ref=e431]:
                - link [ref=e433] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
                  - img "Apple Cinema 30&quot;" [ref=e436]
                  - list [ref=e437]:
                    - listitem [ref=e438]:
                      - img "Apple Cinema 30&quot;" [ref=e439]
                    - listitem [ref=e440]:
                      - img "Apple Cinema 30&quot;" [ref=e441]
                - generic [ref=e442]:
                  - button "Add to Cart" [ref=e443] [cursor=pointer]
                  - button "Add to Wish List" [ref=e444] [cursor=pointer]
                  - button "Quick view" [ref=e445] [cursor=pointer]
                  - button "Compare this Product" [ref=e446] [cursor=pointer]
              - generic [ref=e447]:
                - heading [level=4] [ref=e448]:
                  - link "Apple Cinema 30\"" [ref=e449] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
                - generic [ref=e450]: $122.00
            - generic [ref=e452]:
              - generic [ref=e453]:
                - link [ref=e455] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=50
                  - img "Apple Cinema 30&quot;" [ref=e458]
                  - list [ref=e459]:
                    - listitem [ref=e460]:
                      - img "Apple Cinema 30&quot;" [ref=e461]
                    - listitem [ref=e462]:
                      - img "Apple Cinema 30&quot;" [ref=e463]
                    - listitem [ref=e464]:
                      - img "Apple Cinema 30&quot;" [ref=e465]
                - generic [ref=e466]:
                  - button "Add to Cart" [ref=e467] [cursor=pointer]
                  - button "Add to Wish List" [ref=e468] [cursor=pointer]
                  - button "Quick view" [ref=e469] [cursor=pointer]
                  - button "Compare this Product" [ref=e470] [cursor=pointer]
              - generic [ref=e471]:
                - heading [level=4] [ref=e472]:
                  - link "Apple Cinema 30\"" [ref=e473] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=50
                - generic [ref=e474]: $122.00
            - generic [ref=e476]:
              - generic [ref=e477]:
                - link [ref=e479] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=68
                  - img "Apple Cinema 30&quot;" [ref=e482]
                  - list [ref=e483]:
                    - listitem [ref=e484]:
                      - img "Apple Cinema 30&quot;" [ref=e485]
                    - listitem [ref=e486]:
                      - img "Apple Cinema 30&quot;" [ref=e487]
                    - listitem [ref=e488]:
                      - img "Apple Cinema 30&quot;" [ref=e489]
                - generic [ref=e490]:
                  - button "Add to Cart" [ref=e491] [cursor=pointer]
                  - button "Add to Wish List" [ref=e492] [cursor=pointer]
                  - button "Quick view" [ref=e493] [cursor=pointer]
                  - button "Compare this Product" [ref=e494] [cursor=pointer]
              - generic [ref=e495]:
                - heading [level=4] [ref=e496]:
                  - link "Apple Cinema 30\"" [ref=e497] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=68
                - generic [ref=e498]: $122.00
            - generic [ref=e500]:
              - generic [ref=e501]:
                - link [ref=e503] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=69
                  - img "Apple Cinema 30&quot;" [ref=e506]
                  - list [ref=e507]:
                    - listitem [ref=e508]:
                      - img "Apple Cinema 30&quot;" [ref=e509]
                    - listitem [ref=e510]:
                      - img "Apple Cinema 30&quot;" [ref=e511]
                    - listitem [ref=e512]:
                      - img "Apple Cinema 30&quot;" [ref=e513]
                - generic [ref=e514]:
                  - button "Add to Cart" [ref=e515] [cursor=pointer]
                  - button "Add to Wish List" [ref=e516] [cursor=pointer]
                  - button "Quick view" [ref=e517] [cursor=pointer]
                  - button "Compare this Product" [ref=e518] [cursor=pointer]
              - generic [ref=e519]:
                - heading [level=4] [ref=e520]:
                  - link "Apple Cinema 30\"" [ref=e521] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=69
                - generic [ref=e522]: $122.00
            - generic [ref=e524]:
              - generic [ref=e525]:
                - link [ref=e527] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=88
                  - img "Apple Cinema 30&quot;" [ref=e530]
                  - list [ref=e531]:
                    - listitem [ref=e532]:
                      - img "Apple Cinema 30&quot;" [ref=e533]
                    - listitem [ref=e534]:
                      - img "Apple Cinema 30&quot;" [ref=e535]
                    - listitem [ref=e536]:
                      - img "Apple Cinema 30&quot;" [ref=e537]
                - generic [ref=e538]:
                  - button "Add to Cart" [ref=e539] [cursor=pointer]
                  - button "Add to Wish List" [ref=e540] [cursor=pointer]
                  - button "Quick view" [ref=e541] [cursor=pointer]
                  - button "Compare this Product" [ref=e542] [cursor=pointer]
              - generic [ref=e543]:
                - heading [level=4] [ref=e544]:
                  - link "Apple Cinema 30\"" [ref=e545] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=88
                - generic [ref=e546]: $122.00
            - generic [ref=e548]:
              - generic [ref=e549]:
                - link [ref=e551] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=89
                  - img "Apple Cinema 30&quot;" [ref=e554]
                  - list [ref=e555]:
                    - listitem [ref=e556]:
                      - img "Apple Cinema 30&quot;" [ref=e557]
                    - listitem [ref=e558]:
                      - img "Apple Cinema 30&quot;" [ref=e559]
                    - listitem [ref=e560]:
                      - img "Apple Cinema 30&quot;" [ref=e561]
                - generic [ref=e562]:
                  - button "Add to Cart" [ref=e563] [cursor=pointer]
                  - button "Add to Wish List" [ref=e564] [cursor=pointer]
                  - button "Quick view" [ref=e565] [cursor=pointer]
                  - button "Compare this Product" [ref=e566] [cursor=pointer]
              - generic [ref=e567]:
                - heading [level=4] [ref=e568]:
                  - link "Apple Cinema 30\"" [ref=e569] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=89
                - generic [ref=e570]: $122.00
            - generic [ref=e572]:
              - generic [ref=e573]:
                - link [ref=e575] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=90
                  - img "Apple Cinema 30&quot;" [ref=e578]
                  - list [ref=e579]:
                    - listitem [ref=e580]:
                      - img "Apple Cinema 30&quot;" [ref=e581]
                    - listitem [ref=e582]:
                      - img "Apple Cinema 30&quot;" [ref=e583]
                    - listitem [ref=e584]:
                      - img "Apple Cinema 30&quot;" [ref=e585]
                - generic [ref=e586]:
                  - button "Add to Cart" [ref=e587] [cursor=pointer]
                  - button "Add to Wish List" [ref=e588] [cursor=pointer]
                  - button "Quick view" [ref=e589] [cursor=pointer]
                  - button "Compare this Product" [ref=e590] [cursor=pointer]
              - generic [ref=e591]:
                - heading [level=4] [ref=e592]:
                  - link "Apple Cinema 30\"" [ref=e593] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=90
                - generic [ref=e594]: $122.00
            - generic [ref=e596]:
              - generic [ref=e597]:
                - link [ref=e599] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=91
                  - img "Apple Cinema 30&quot;" [ref=e602]
                  - list [ref=e603]:
                    - listitem [ref=e604]:
                      - img "Apple Cinema 30&quot;" [ref=e605]
                    - listitem [ref=e606]:
                      - img "Apple Cinema 30&quot;" [ref=e607]
                    - listitem [ref=e608]:
                      - img "Apple Cinema 30&quot;" [ref=e609]
                - generic [ref=e610]:
                  - button "Add to Cart" [ref=e611] [cursor=pointer]
                  - button "Add to Wish List" [ref=e612] [cursor=pointer]
                  - button "Quick view" [ref=e613] [cursor=pointer]
                  - button "Compare this Product" [ref=e614] [cursor=pointer]
              - generic [ref=e615]:
                - heading [level=4] [ref=e616]:
                  - link "Apple Cinema 30\"" [ref=e617] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=91
                - generic [ref=e618]: $122.00
      - generic [ref=e621]:
        - heading "FAQ (Frequently Asked Questions)" [level=3] [ref=e622]
        - generic [ref=e623]:
          - heading "How can I change my shipping address?" [level=5] [ref=e626] [cursor=pointer]
          - heading "How can I change my shipping address?" [level=5] [ref=e630] [cursor=pointer]
          - heading "How do I activate my account?" [level=5] [ref=e634] [cursor=pointer]
          - heading "What do you mean by points? How do I earn it?" [level=5] [ref=e638] [cursor=pointer]
          - heading "Why is there a checkout limit? / What are all the checkout limits?" [level=5] [ref=e642] [cursor=pointer]
          - heading "Why must I make payment immediately at checkout?" [level=5] [ref=e646] [cursor=pointer]
    - contentinfo [ref=e648]:
      - paragraph [ref=e654]: © LambdaTest - Powered by OpenCart
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
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/purchase-journey.spec.ts >> End-to-End >> TC_E2E_001_Search_To_Checkout_Journey
- Location: tests/e2e/purchase-journey.spec.ts:11:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /route=checkout\/checkout/
Received string:  ""

```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - generic [ref=f3e2]:
    - generic [ref=f3e3]:
      - heading [level=5] [ref=f3e4]:
        - text: Top categories
        - link "close" [ref=f3e5] [cursor=pointer]:
          - /url: "#mz-component-1626147655"
          - text: 
      - navigation [ref=f3e8]:
        - list [ref=f3e10]:
          - listitem [ref=f3e11]:
            - link "Components" [ref=f3e12] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
          - listitem [ref=f3e18]:
            - link "Cameras" [ref=f3e19] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
          - listitem [ref=f3e25]:
            - link "Phone, Tablets & Ipod" [ref=f3e26] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
          - listitem [ref=f3e32]:
            - link "Software" [ref=f3e33] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
          - listitem [ref=f3e39]:
            - link "MP3 Players" [ref=f3e40] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
          - listitem [ref=f3e46]:
            - link "Laptops & Notebooks" [ref=f3e47] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
          - listitem [ref=f3e53]:
            - link "Desktops and Monitors" [ref=f3e54] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
          - listitem [ref=f3e60]:
            - link "Printers & Scanners" [ref=f3e61] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
          - listitem [ref=f3e67]:
            - link "Mice and Trackballs" [ref=f3e68] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
          - listitem [ref=f3e74]:
            - link "Fashion and Accessories" [ref=f3e75] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e81]:
            - link "Beauty and Saloon" [ref=f3e82] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e88]:
            - link "Autoparts and Accessories" [ref=f3e89] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e95]:
            - link "Washing machine" [ref=f3e96] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e102]:
            - link "Gaming consoles" [ref=f3e103] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e109]:
            - link "Air conditioner" [ref=f3e110] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f3e116]:
            - link "Web Cameras" [ref=f3e117] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
    - generic [ref=f3e123]:
      - heading [level=5] [ref=f3e124]:
        - text: Quick Links
        - link "close" [ref=f3e125] [cursor=pointer]:
          - /url: "#mz-component-162614767"
          - text: 
      - generic [ref=f3e126]:
        - navigation [ref=f3e128]:
          - list [ref=f3e130]:
            - listitem [ref=f3e131]:
              - link " Special Hot" [ref=f3e132] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                - generic [ref=f3e133]: 
                - generic [ref=f3e134]: Special
                - generic [ref=f3e136]: Hot
            - listitem [ref=f3e137]:
              - link " Wishlist" [ref=f3e138] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
                - generic [ref=f3e139]: 
                - generic [ref=f3e140]: Wishlist
            - listitem [ref=f3e142]:
              - link " Compare" [ref=f3e143] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
                - generic [ref=f3e144]: 
                - generic [ref=f3e145]: Compare
            - listitem [ref=f3e147]:
              - link " My account" [ref=f3e148] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
                - generic [ref=f3e149]: 
                - generic [ref=f3e150]: My account
            - listitem [ref=f3e152]:
              - link " Blog" [ref=f3e153] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - generic [ref=f3e154]: 
                - generic [ref=f3e155]: Blog
            - listitem [ref=f3e157]:
              - link " Tracking" [ref=f3e158] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
                - generic [ref=f3e159]: 
                - generic [ref=f3e160]: Tracking
            - listitem [ref=f3e162]:
              - link " Contact us" [ref=f3e163] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
                - generic [ref=f3e164]: 
                - generic [ref=f3e165]: Contact us
        - separator [ref=f3e168]
        - paragraph [ref=f3e171]: Place here any module, widget, design or HTML. for example menu, categories
    - generic [ref=f3e172]:
      - heading [level=5] [ref=f3e173]:
        - text: Cart
        - link "close" [ref=f3e174] [cursor=pointer]:
          - /url: "#cart-total-drawer"
          - text: 
      - generic [ref=f3e175]:
        - generic [ref=f3e176]:
          - table [ref=f3e178]:
            - rowgroup [ref=f3e179]:
              - row [ref=f3e180]:
                - cell [ref=f3e181]:
                  - link [ref=f3e182] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                    - img "iMac" [ref=f3e183]
                - cell [ref=f3e184]:
                  - link "iMac" [ref=f3e185] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                  - text: "Model: Product 14"
                - cell "x1" [ref=f3e186]
                - cell "$170.00" [ref=f3e187]
          - table [ref=f3e188]:
            - rowgroup [ref=f3e189]:
              - row [ref=f3e190]:
                - cell "Sub-Total:" [ref=f3e191]
                - cell [ref=f3e192]:
                  - strong [ref=f3e193]: $140.00
              - row [ref=f3e194]:
                - cell "Eco Tax (-2.00):" [ref=f3e195]
                - cell [ref=f3e196]:
                  - strong [ref=f3e197]: $2.00
              - row [ref=f3e198]:
                - cell "VAT (20%):" [ref=f3e199]
                - cell [ref=f3e200]:
                  - strong [ref=f3e201]: $28.00
              - row [ref=f3e202]:
                - cell "Total:" [ref=f3e203]
                - cell [ref=f3e204]:
                  - strong [ref=f3e205]: $170.00
        - generic [ref=f3e207]:
          - button " Edit cart" [ref=f3e209] [cursor=pointer]:
            - generic [ref=f3e210]: 
            - text: Edit cart
          - button " Checkout" [ref=f3e212] [cursor=pointer]:
            - generic [ref=f3e213]: 
            - text: Checkout
    - generic [ref=f3e214]:
      - banner [ref=f3e215]:
        - button "" [ref=f3e217] [cursor=pointer]
        - generic [ref=f3e219]:
          - generic [ref=f3e220]:
            - figure [ref=f3e222]:
              - link [ref=f3e223] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Electro" [ref=f3e224]
            - generic [ref=f3e228]:
              - generic [ref=f3e230]:
                - button "All Categories" [ref=f3e232] [cursor=pointer]
                - textbox "Search For Products" [ref=f3e234]
              - button "Search" [ref=f3e236] [cursor=pointer]
            - link "Compare" [ref=f3e238] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - link "Wishlist" [ref=f3e243] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - button "1" [ref=f3e248] [cursor=pointer]
          - text: 
        - generic [ref=f3e254]:
          - generic [ref=f3e256] [cursor=pointer]:
            - button "Shop by Category" [ref=f3e258]
            - navigation [ref=f3e263]:
              - list [ref=f3e265]:
                - listitem [ref=f3e266]:
                  - link "Home" [ref=f3e267]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - listitem [ref=f3e270]:
                  - link "Special Hot" [ref=f3e271]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                    - generic [ref=f3e272]: Special
                    - generic [ref=f3e274]: Hot
                - listitem [ref=f3e275]:
                  - link "Blog" [ref=f3e276]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - listitem [ref=f3e279]:
                  - button "Mega Menu" [ref=f3e280]
                - listitem [ref=f3e283]:
                  - button "AddOns Featured" [ref=f3e284]:
                    - generic [ref=f3e285]: AddOns
                    - generic [ref=f3e287]: Featured
                - listitem [ref=f3e288]:
                  - button " My account" [ref=f3e289]:
                    - generic [ref=f3e290]: 
                    - generic [ref=f3e291]: My account
          - text:  
          - paragraph [ref=f3e295]:
            - strong [ref=f3e296]: This is a dummy website for Web Automation Testing
      - generic [ref=f3e297]:
        - navigation "breadcrumb" [ref=f3e298]:
          - list [ref=f3e299]:
            - listitem [ref=f3e300]:
              - link "" [ref=f3e301] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - listitem [ref=f3e303]: / Shopping Cart
        - generic [ref=f3e305]:
          - heading "Shopping Cart (5.00kg)" [level=1] [ref=f3e306]
          - table [ref=f3e309]:
            - rowgroup [ref=f3e310]:
              - row [ref=f3e311]:
                - columnheader "Image" [ref=f3e312]
                - columnheader "Product Name" [ref=f3e313]
                - columnheader "Model" [ref=f3e314]
                - columnheader "Quantity" [ref=f3e315]
                - columnheader "Unit Price" [ref=f3e316]
                - columnheader "Total" [ref=f3e317]
            - rowgroup [ref=f3e318]:
              - row [ref=f3e319]:
                - cell [ref=f3e320]:
                  - link [ref=f3e321] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                    - img "iMac" [ref=f3e322]
                - cell [ref=f3e323]:
                  - link "iMac" [ref=f3e324] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                - cell "Product 14" [ref=f3e325]
                - cell [ref=f3e326]:
                  - generic [ref=f3e327]:
                    - textbox [ref=f3e328]: "1"
                    - generic [ref=f3e329]:
                      - button "" [ref=f3e330] [cursor=pointer]
                      - button "" [ref=f3e332] [cursor=pointer]
                - cell "$170.00" [ref=f3e334]
                - cell "$170.00" [ref=f3e335]
          - generic [ref=f3e336]:
            - generic [ref=f3e337]:
              - heading "What would you like to do next?" [level=4] [ref=f3e338]
              - paragraph [ref=f3e339]: Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.
              - generic [ref=f3e340]:
                - heading "Use Coupon Code " [level=5] [ref=f3e342] [cursor=pointer]:
                  - text: Use Coupon Code
                  - generic [ref=f3e343]: 
                - generic [ref=f3e344]:
                  - heading "Estimate Shipping & Taxes " [level=5] [ref=f3e345] [cursor=pointer]:
                    - text: Estimate Shipping & Taxes
                    - generic [ref=f3e346]: 
                  - text: "* * *"
                - heading "Use Gift Certificate " [level=5] [ref=f3e348] [cursor=pointer]:
                  - text: Use Gift Certificate
                  - generic [ref=f3e349]: 
            - table [ref=f3e351]:
              - rowgroup [ref=f3e352]:
                - row [ref=f3e353]:
                  - cell "Sub-Total:" [ref=f3e354]
                  - cell [ref=f3e355]:
                    - strong [ref=f3e356]: $140.00
                - row [ref=f3e357]:
                  - cell "Eco Tax (-2.00):" [ref=f3e358]
                  - cell [ref=f3e359]:
                    - strong [ref=f3e360]: $2.00
                - row [ref=f3e361]:
                  - cell "VAT (20%):" [ref=f3e362]
                  - cell [ref=f3e363]:
                    - strong [ref=f3e364]: $28.00
                - row [ref=f3e365]:
                  - cell "Total:" [ref=f3e366]
                  - cell [ref=f3e367]:
                    - strong [ref=f3e368]: $170.00
          - generic [ref=f3e369]:
            - link "Continue Shopping" [ref=f3e370] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - link "Checkout" [ref=f3e371] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout
      - contentinfo [ref=f3e372]:
        - paragraph [ref=f3e378]: © LambdaTest - Powered by OpenCart
  - text:  
```

# Test source

```ts
  1  | import { URL_PATTERNS } from '../../constants/URLs';
  2  | import { TAGS } from '../../constants/Tags';
  3  | import { expect, test } from '../../fixtures/testFixtures';
  4  | 
  5  | /**
  6  |  * End-to-end journey: discover → add to cart → cart → checkout.
  7  |  * Stops before order placement by design (that is the opt-in guest checkout
  8  |  * test), keeping the journey deterministic and side-effect free.
  9  |  */
  10 | test.describe('End-to-End', () => {
  11 |   test(
  12 |     'TC_E2E_001_Search_To_Checkout_Journey',
  13 |     { tag: [TAGS.e2e, TAGS.regression, TAGS.search, TAGS.cart, TAGS.checkout] },
  14 |     async ({ homePage, searchPage, productDetailsPage, cartPage, checkoutPage, page, data }) => {
  15 |       const product = data.product('iMac');
  16 | 
  17 |       // 1. Search for the product from the home page
  18 |       await homePage.open();
  19 |       await homePage.searchFor(product.name);
  20 |       await expect(searchPage.resultsHeading(product.name)).toBeVisible();
  21 | 
  22 |       // 2. Open the product from the results
  23 |       await searchPage.openProduct(product.name);
  24 |       await expect(productDetailsPage.nameHeading).toHaveText(product.name);
  25 | 
  26 |       // 3. Add it to the cart
  27 |       await productDetailsPage.addToCart();
  28 | 
  29 |       // 4. Verify it is in the cart
  30 |       await cartPage.open();
  31 |       await expect(cartPage.product(product.name)).toBeVisible();
  32 | 
  33 |       // 5. Continue to checkout
  34 |       await cartPage.proceedToCheckout();
> 35 |       await expect(page).toHaveURL(URL_PATTERNS.checkout);
     |                          ^ Error: expect(page).toHaveURL(expected) failed
  36 |       await expect(checkoutPage.firstNameInput).toBeVisible();
  37 |     },
  38 |   );
  39 | });
  40 | 
```
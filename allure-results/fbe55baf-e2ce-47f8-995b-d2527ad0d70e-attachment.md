# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: add-multiple-products-to-cart.spec.ts >> Cart >> Add Multiple Products To Cart
- Location: tests/add-multiple-products-to-cart.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f4e1]:
  - generic [ref=f4e2]:
    - generic [ref=f4e3]:
      - heading [level=5] [ref=f4e4]:
        - text: Top categories
        - link "close" [ref=f4e5] [cursor=pointer]:
          - /url: "#mz-component-1626147655"
          - text: 
      - navigation [ref=f4e8]:
        - list [ref=f4e10]:
          - listitem [ref=f4e11]:
            - link "Components" [ref=f4e12] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
          - listitem [ref=f4e18]:
            - link "Cameras" [ref=f4e19] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
          - listitem [ref=f4e25]:
            - link "Phone, Tablets & Ipod" [ref=f4e26] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
          - listitem [ref=f4e32]:
            - link "Software" [ref=f4e33] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
          - listitem [ref=f4e39]:
            - link "MP3 Players" [ref=f4e40] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
          - listitem [ref=f4e46]:
            - link "Laptops & Notebooks" [ref=f4e47] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
          - listitem [ref=f4e53]:
            - link "Desktops and Monitors" [ref=f4e54] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
          - listitem [ref=f4e60]:
            - link "Printers & Scanners" [ref=f4e61] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
          - listitem [ref=f4e67]:
            - link "Mice and Trackballs" [ref=f4e68] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
          - listitem [ref=f4e74]:
            - link "Fashion and Accessories" [ref=f4e75] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e81]:
            - link "Beauty and Saloon" [ref=f4e82] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e88]:
            - link "Autoparts and Accessories" [ref=f4e89] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e95]:
            - link "Washing machine" [ref=f4e96] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e102]:
            - link "Gaming consoles" [ref=f4e103] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e109]:
            - link "Air conditioner" [ref=f4e110] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f4e116]:
            - link "Web Cameras" [ref=f4e117] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
    - generic [ref=f4e123]:
      - heading [level=5] [ref=f4e124]:
        - text: Quick Links
        - link "close" [ref=f4e125] [cursor=pointer]:
          - /url: "#mz-component-162614767"
          - text: 
      - generic [ref=f4e126]:
        - navigation [ref=f4e128]:
          - list [ref=f4e130]:
            - listitem [ref=f4e131]:
              - link " Special Hot" [ref=f4e132] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                - generic [ref=f4e133]: 
                - generic [ref=f4e134]: Special
                - generic [ref=f4e136]: Hot
            - listitem [ref=f4e137]:
              - link " Wishlist" [ref=f4e138] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
                - generic [ref=f4e139]: 
                - generic [ref=f4e140]: Wishlist
            - listitem [ref=f4e142]:
              - link " Compare" [ref=f4e143] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
                - generic [ref=f4e144]: 
                - generic [ref=f4e145]: Compare
            - listitem [ref=f4e147]:
              - link " My account" [ref=f4e148] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
                - generic [ref=f4e149]: 
                - generic [ref=f4e150]: My account
            - listitem [ref=f4e152]:
              - link " Blog" [ref=f4e153] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - generic [ref=f4e154]: 
                - generic [ref=f4e155]: Blog
            - listitem [ref=f4e157]:
              - link " Tracking" [ref=f4e158] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
                - generic [ref=f4e159]: 
                - generic [ref=f4e160]: Tracking
            - listitem [ref=f4e162]:
              - link " Contact us" [ref=f4e163] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
                - generic [ref=f4e164]: 
                - generic [ref=f4e165]: Contact us
        - separator [ref=f4e168]
        - paragraph [ref=f4e171]: Place here any module, widget, design or HTML. for example menu, categories
    - generic [ref=f4e172]:
      - heading [level=5] [ref=f4e173]:
        - text: Cart
        - link "close" [ref=f4e174] [cursor=pointer]:
          - /url: "#cart-total-drawer"
          - text: 
      - generic [ref=f4e175]:
        - generic [ref=f4e176]:
          - table [ref=f4e178]:
            - rowgroup [ref=f4e179]:
              - row [ref=f4e180]:
                - cell [ref=f4e181]:
                  - link [ref=f4e182] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                    - img "iMac" [ref=f4e183]
                - cell [ref=f4e184]:
                  - link "iMac" [ref=f4e185] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
                  - text: "Model: Product 14"
                - cell "x1" [ref=f4e186]
                - cell "$170.00" [ref=f4e187]
          - table [ref=f4e188]:
            - rowgroup [ref=f4e189]:
              - row [ref=f4e190]:
                - cell "Sub-Total:" [ref=f4e191]
                - cell [ref=f4e192]:
                  - strong [ref=f4e193]: $140.00
              - row [ref=f4e194]:
                - cell "Eco Tax (-2.00):" [ref=f4e195]
                - cell [ref=f4e196]:
                  - strong [ref=f4e197]: $2.00
              - row [ref=f4e198]:
                - cell "VAT (20%):" [ref=f4e199]
                - cell [ref=f4e200]:
                  - strong [ref=f4e201]: $28.00
              - row [ref=f4e202]:
                - cell "Total:" [ref=f4e203]
                - cell [ref=f4e204]:
                  - strong [ref=f4e205]: $170.00
        - generic [ref=f4e207]:
          - button " Edit cart" [ref=f4e209] [cursor=pointer]:
            - generic [ref=f4e210]: 
            - text: Edit cart
          - button " Checkout" [ref=f4e212] [cursor=pointer]:
            - generic [ref=f4e213]: 
            - text: Checkout
    - text: 
    - generic:    
    - text:  
    - generic [ref=f4e214]:
      - banner [ref=f4e215]:
        - button "" [ref=f4e217] [cursor=pointer]
        - generic [ref=f4e219]:
          - generic [ref=f4e220]:
            - figure [ref=f4e222]:
              - link [ref=f4e223] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Electro" [ref=f4e224]
            - generic [ref=f4e228]:
              - generic [ref=f4e230]:
                - button "All Categories" [ref=f4e232] [cursor=pointer]
                - textbox "Search For Products" [ref=f4e234]: HTC Touch HD
              - button "Search" [ref=f4e236] [cursor=pointer]
            - link "Compare" [ref=f4e238] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - link "Wishlist" [ref=f4e243] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - button "1" [ref=f4e248] [cursor=pointer]
          - text: 
        - generic [ref=f4e254]:
          - generic [ref=f4e256] [cursor=pointer]:
            - button "Shop by Category" [ref=f4e258]
            - navigation [ref=f4e263]:
              - list [ref=f4e265]:
                - listitem [ref=f4e266]:
                  - link "Home" [ref=f4e267]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - listitem [ref=f4e270]:
                  - link "Special Hot" [ref=f4e271]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                    - generic [ref=f4e272]: Special
                    - generic [ref=f4e274]: Hot
                - listitem [ref=f4e275]:
                  - link "Blog" [ref=f4e276]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - listitem [ref=f4e279]:
                  - button "Mega Menu" [ref=f4e280]
                - listitem [ref=f4e283]:
                  - button "AddOns Featured" [ref=f4e284]:
                    - generic [ref=f4e285]: AddOns
                    - generic [ref=f4e287]: Featured
                - listitem [ref=f4e288]:
                  - button " My account" [ref=f4e289]:
                    - generic [ref=f4e290]: 
                    - generic [ref=f4e291]: My account
          - text:  
          - paragraph [ref=f4e295]:
            - strong [ref=f4e296]: This is a dummy website for Web Automation Testing
      - generic [ref=f4e297]:
        - figure [ref=f4e301]:
          - link [ref=f4e302] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
            - img "Apple Cinema 30\"" [ref=f4e303]
        - generic [ref=f4e305]:
          - navigation "breadcrumb" [ref=f4e307]:
            - list [ref=f4e308]:
              - listitem [ref=f4e309]:
                - link "Home" [ref=f4e310] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                  - generic [ref=f4e311]: 
              - listitem [ref=f4e312]:
                - text: /
                - link "Software" [ref=f4e313] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
              - listitem [ref=f4e314]:
                - text: /
                - link "Search" [ref=f4e315] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search=HTC Touch HD
              - listitem [ref=f4e316]: / HTC Touch HD
          - generic [ref=f4e317]:
            - generic [ref=f4e318]:
              - generic [ref=f4e320]:
                - generic [ref=f4e321]:
                  - button "" [ref=f4e322] [cursor=pointer]
                  - link [ref=f4e324] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/1-500x500.webp
                    - img "HTC Touch HD" [ref=f4e325]
                - generic [ref=f4e327]:
                  - generic [ref=f4e328]:
                    - group "1 / 4" [ref=f4e329]:
                      - link [ref=f4e330] [cursor=pointer]:
                        - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/3-500x500.webp
                        - img "HTC Touch HD" [ref=f4e331]
                    - group "2 / 4" [ref=f4e332]:
                      - link [ref=f4e333] [cursor=pointer]:
                        - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/8-500x500.webp
                        - img "HTC Touch HD" [ref=f4e334]
                    - group "3 / 4" [ref=f4e335]:
                      - link [ref=f4e336] [cursor=pointer]:
                        - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/6-500x500.webp
                        - img "HTC Touch HD" [ref=f4e337]
                    - group "4 / 4" [ref=f4e338]:
                      - link [ref=f4e339] [cursor=pointer]:
                        - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                        - img "HTC Touch HD" [ref=f4e340]
                  - text:    
              - text:      
              - generic [ref=f4e341]:
                - tablist [ref=f4e344]:
                  - listitem [ref=f4e345]:
                    - tab "Description" [selected] [ref=f4e346] [cursor=pointer]
                  - listitem [ref=f4e347]:
                    - tab "Reviews" [ref=f4e348] [cursor=pointer]
                  - listitem [ref=f4e349]:
                    - tab "Custom" [ref=f4e350] [cursor=pointer]
                - generic [ref=f4e354]:
                  - paragraph [ref=f4e355]: HTC Touch - in High Definition. Watch music videos and streaming content in awe-inspiring high definition clarity for a mobile experience you never thought possible. Seductively sleek, the HTC Touch HD provides the next generation of mobile functionality, all at a simple touch. Fully integrated with Windows Mobile Professional 6.1, ultrafast 3.5G, GPS, 5MP camera, plus lots more - all delivered on a breathtakingly crisp 3.8" WVGA touchscreen - you can take control of your mobile world with the HTC Touch HD.
                  - paragraph [ref=f4e356]:
                    - strong [ref=f4e357]: Features
                  - list [ref=f4e358]:
                    - listitem [ref=f4e359]: Processor Qualcomm® MSM 7201A™ 528 MHz
                    - listitem [ref=f4e360]: Windows Mobile® 6.1 Professional Operating System
                    - listitem [ref=f4e361]: "Memory: 512 MB ROM, 288 MB RAM"
                    - listitem [ref=f4e362]: "Dimensions: 115 mm x 62.8 mm x 12 mm / 146.4 grams"
                    - listitem [ref=f4e363]: 3.8-inch TFT-LCD flat touch-sensitive screen with 480 x 800 WVGA resolution
                    - listitem [ref=f4e364]: "HSDPA/WCDMA: Europe/Asia: 900/2100 MHz; Up to 2 Mbps up-link and 7.2 Mbps down-link speeds"
                    - listitem [ref=f4e365]: "Quad-band GSM/GPRS/EDGE: Europe/Asia: 850/900/1800/1900 MHz (Band frequency, HSUPA availability, and data speed are operator dependent.)"
                    - listitem [ref=f4e366]: Device Control via HTC TouchFLO™ 3D & Touch-sensitive front panel buttons
                    - listitem [ref=f4e367]: GPS and A-GPS ready
                    - listitem [ref=f4e368]: Bluetooth® 2.0 with Enhanced Data Rate and A2DP for wireless stereo headsets
                    - listitem [ref=f4e369]: "Wi-Fi®: IEEE 802.11 b/g"
                    - listitem [ref=f4e370]: HTC ExtUSB™ (11-pin mini-USB 2.0)
                    - listitem [ref=f4e371]: 5 megapixel color camera with auto focus
                    - listitem [ref=f4e372]: VGA CMOS color camera
                    - listitem [ref=f4e373]: Built-in 3.5 mm audio jack, microphone, speaker, and FM radio
                    - listitem [ref=f4e374]: "Ring tone formats: AAC, AAC+, eAAC+, AMR-NB, AMR-WB, QCP, MP3, WMA, WAV"
                    - listitem [ref=f4e375]: 40 polyphonic and standard MIDI format 0 and 1 (SMF)/SP MIDI
                    - listitem [ref=f4e376]: Rechargeable Lithium-ion or Lithium-ion polymer 1350 mAh battery
                    - listitem [ref=f4e377]: "Expansion Slot: microSD™ memory card (SD 2.0 compatible)"
                    - listitem [ref=f4e378]: "AC Adapter Voltage range/frequency: 100 ~ 240V AC, 50/60 Hz DC output: 5V and 1A"
                    - listitem [ref=f4e379]: "Special Features: FM Radio, G-Sensor"
                  - link " Read more" [ref=f4e381] [cursor=pointer]:
                    - /url: "#"
                    - generic [ref=f4e382]: 
                    - text: Read more
            - generic [ref=f4e383]:
              - heading "HTC Touch HD" [level=1] [ref=f4e385]
              - list [ref=f4e389]:
                - listitem [ref=f4e390]: "Product Code: Product 1"
              - separator [ref=f4e392]
              - list [ref=f4e396]:
                - listitem [ref=f4e397]:
                  - text: "Brand:"
                  - link "HTC" [ref=f4e398] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=5
                - listitem [ref=f4e399]: "Viewed: 150924"
                - listitem [ref=f4e400]: "Reward Points: 400"
                - listitem [ref=f4e401]:
                  - text: "Availability:"
                  - generic [ref=f4e402]: In Stock
              - separator [ref=f4e404]
              - generic [ref=f4e409]:
                - heading "$146.00" [level=3] [ref=f4e410]
                - generic [ref=f4e411] [cursor=pointer]: 
              - generic [ref=f4e414]:
                - generic [ref=f4e416]:
                  - generic [ref=f4e418] [cursor=pointer]:
                    - button "Decrease quantity" [ref=f4e420]:
                      - generic [ref=f4e421]: 
                    - spinbutton "Qty" [ref=f4e422]: "1"
                    - button "Increase quantity" [ref=f4e424]:
                      - generic [ref=f4e425]: 
                  - button "Add to Cart" [active] [ref=f4e427] [cursor=pointer]:
                    - status [ref=f4e428]
                    - text: Add to Cart
                  - button "Buy now" [ref=f4e430] [cursor=pointer]
                - button " Compare this Product" [ref=f4e432] [cursor=pointer]:
                  - generic [ref=f4e433]:
                    - generic [ref=f4e434]: 
                    - text: 
                  - text: Compare this Product
              - generic [ref=f4e436]:
                - button "Size chart" [ref=f4e438] [cursor=pointer]:
                  - generic [ref=f4e439]: 
                  - text: Size chart
                - button "Popup" [ref=f4e441] [cursor=pointer]:
                  - generic [ref=f4e442]: 
                  - text: Popup
                - button "Ask Question" [ref=f4e444] [cursor=pointer]:
                  - generic [ref=f4e445]: 
                  - text: Ask Question
              - separator [ref=f4e447]
              - generic [ref=f4e449]:
                - heading "Online payment" [level=5] [ref=f4e459]
                - heading "Easy Return" [level=5] [ref=f4e468]
                - heading "24x7 Service" [level=5] [ref=f4e479]
              - generic [ref=f4e481]:
                - generic [ref=f4e482]:
                  - generic [ref=f4e483]: 0/50 reviews
                  - generic [ref=f4e484]:
                    - generic [ref=f4e485] [cursor=pointer]: ★ 5
                    - generic [ref=f4e486] [cursor=pointer]: ★ 4
                    - generic [ref=f4e487] [cursor=pointer]: ★ 3
                    - generic [ref=f4e488] [cursor=pointer]: ★ 2
                    - generic [ref=f4e489] [cursor=pointer]: ★ 1
                    - generic [ref=f4e490] [cursor=pointer]: ★ 0
                - heading "Write a review" [level=5] [ref=f4e491]
                - textbox "Your Name" [ref=f4e493]
                - textbox "Your Review" [ref=f4e495]
                - button "Write Review" [ref=f4e498] [cursor=pointer]
        - generic [ref=f4e501]:
          - heading "FAQ (Frequently Asked Questions)" [level=3] [ref=f4e502]
          - generic [ref=f4e503]:
            - heading "How can I change my shipping address? " [level=5] [ref=f4e506] [cursor=pointer]:
              - generic [ref=f4e507]: How can I change my shipping address?
              - generic [ref=f4e508]: 
            - heading "How can I change my shipping address? " [level=5] [ref=f4e511] [cursor=pointer]:
              - generic [ref=f4e512]: How can I change my shipping address?
              - generic [ref=f4e513]: 
            - heading "How do I activate my account? " [level=5] [ref=f4e516] [cursor=pointer]:
              - generic [ref=f4e517]: How do I activate my account?
              - generic [ref=f4e518]: 
            - heading "What do you mean by points? How do I earn it? " [level=5] [ref=f4e521] [cursor=pointer]:
              - generic [ref=f4e522]: What do you mean by points? How do I earn it?
              - generic [ref=f4e523]: 
            - heading "Why is there a checkout limit? / What are all the checkout limits? " [level=5] [ref=f4e526] [cursor=pointer]:
              - generic [ref=f4e527]: Why is there a checkout limit? / What are all the checkout limits?
              - generic [ref=f4e528]: 
            - heading "Why must I make payment immediately at checkout? " [level=5] [ref=f4e531] [cursor=pointer]:
              - generic [ref=f4e532]: Why must I make payment immediately at checkout?
              - generic [ref=f4e533]: 
      - contentinfo [ref=f4e534]:
        - paragraph [ref=f4e540]: © LambdaTest - Powered by OpenCart
  - text:  
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cart', () => {
  4  |   test('Add Multiple Products To Cart', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
  6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
  7  | 
  8  |     // 2. Search for "iMac", open it, and add it to cart
  9  |     await page.getByRole('textbox', { name: 'Search For Products' }).first().fill('iMac');
  10 |     await page.getByRole('textbox', { name: 'Search For Products' }).first().press('Enter');
  11 |     await page.getByRole('link', { name: 'iMac' }).first().click();
  12 |     await page.locator('button.button-cart:visible').click();
  13 | 
  14 |     // 3. Search for "HTC Touch HD", open it, and add it to cart
  15 |     await page.getByRole('textbox', { name: 'Search For Products' }).first().fill('HTC Touch HD');
  16 |     await page.getByRole('textbox', { name: 'Search For Products' }).first().press('Enter');
  17 |     await page.getByRole('link', { name: 'HTC Touch HD' }).first().click();
  18 |     await page.locator('button.button-cart:visible').click();
  19 | 
  20 |     // 4. Navigate to the cart page
> 21 |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  22 | 
  23 |     // 5. Verify both products appear in the cart
  24 |     await expect(page.getByRole('link', { name: 'HTC Touch HD' }).first()).toBeVisible();
  25 |     await expect(page.getByRole('link', { name: 'iMac' }).first()).toBeVisible();
  26 |   });
  27 | });
  28 | 
```
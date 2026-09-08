# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search/search.spec.ts >> Search >> TC_SEARCH_004_Special_Characters_Show_No_Results
- Location: tests/search/search.spec.ts:52:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('There is no product that')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('There is no product that')

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - generic [ref=f1e3]:
      - heading [level=5] [ref=f1e4]:
        - text: Top categories
        - link "close" [ref=f1e5] [cursor=pointer]:
          - /url: "#mz-component-1626147655"
          - text: 
      - navigation [ref=f1e8]:
        - list [ref=f1e10]:
          - listitem [ref=f1e11]:
            - link "Components" [ref=f1e12] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
          - listitem [ref=f1e18]:
            - link "Cameras" [ref=f1e19] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
          - listitem [ref=f1e25]:
            - link "Phone, Tablets & Ipod" [ref=f1e26] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
          - listitem [ref=f1e32]:
            - link "Software" [ref=f1e33] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
          - listitem [ref=f1e39]:
            - link "MP3 Players" [ref=f1e40] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
          - listitem [ref=f1e46]:
            - link "Laptops & Notebooks" [ref=f1e47] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
          - listitem [ref=f1e53]:
            - link "Desktops and Monitors" [ref=f1e54] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
          - listitem [ref=f1e60]:
            - link "Printers & Scanners" [ref=f1e61] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
          - listitem [ref=f1e67]:
            - link "Mice and Trackballs" [ref=f1e68] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
          - listitem [ref=f1e74]:
            - link "Fashion and Accessories" [ref=f1e75] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e81]:
            - link "Beauty and Saloon" [ref=f1e82] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e88]:
            - link "Autoparts and Accessories" [ref=f1e89] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e95]:
            - link "Washing machine" [ref=f1e96] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e102]:
            - link "Gaming consoles" [ref=f1e103] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e109]:
            - link "Air conditioner" [ref=f1e110] [cursor=pointer]:
              - /url: ""
          - listitem [ref=f1e116]:
            - link "Web Cameras" [ref=f1e117] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
    - generic [ref=f1e123]:
      - heading [level=5] [ref=f1e124]:
        - text: Quick Links
        - link "close" [ref=f1e125] [cursor=pointer]:
          - /url: "#mz-component-162614767"
          - text: 
      - generic [ref=f1e126]:
        - navigation [ref=f1e128]:
          - list [ref=f1e130]:
            - listitem [ref=f1e131]:
              - link " Special Hot" [ref=f1e132] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                - generic [ref=f1e133]: 
                - generic [ref=f1e134]: Special
                - generic [ref=f1e136]: Hot
            - listitem [ref=f1e137]:
              - link " Wishlist" [ref=f1e138] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
                - generic [ref=f1e139]: 
                - generic [ref=f1e140]: Wishlist
            - listitem [ref=f1e142]:
              - link " Compare" [ref=f1e143] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
                - generic [ref=f1e144]: 
                - generic [ref=f1e145]: Compare
            - listitem [ref=f1e147]:
              - link " My account" [ref=f1e148] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
                - generic [ref=f1e149]: 
                - generic [ref=f1e150]: My account
            - listitem [ref=f1e152]:
              - link " Blog" [ref=f1e153] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - generic [ref=f1e154]: 
                - generic [ref=f1e155]: Blog
            - listitem [ref=f1e157]:
              - link " Tracking" [ref=f1e158] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
                - generic [ref=f1e159]: 
                - generic [ref=f1e160]: Tracking
            - listitem [ref=f1e162]:
              - link " Contact us" [ref=f1e163] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
                - generic [ref=f1e164]: 
                - generic [ref=f1e165]: Contact us
        - separator [ref=f1e168]
        - paragraph [ref=f1e171]: Place here any module, widget, design or HTML. for example menu, categories
    - generic [ref=f1e172]:
      - heading [level=5] [ref=f1e173]:
        - text: Cart
        - link "close" [ref=f1e174] [cursor=pointer]:
          - /url: "#cart-total-drawer"
          - text: 
      - generic [ref=f1e175]:
        - generic [ref=f1e176]:
          - paragraph [ref=f1e177]: Your shopping cart is empty!
          - table [ref=f1e178]:
            - rowgroup [ref=f1e179]:
              - row [ref=f1e180]:
                - cell "Sub-Total:" [ref=f1e181]
                - cell [ref=f1e182]:
                  - strong [ref=f1e183]: $0.00
              - row [ref=f1e184]:
                - cell "Total:" [ref=f1e185]
                - cell [ref=f1e186]:
                  - strong [ref=f1e187]: $0.00
        - generic [ref=f1e189]:
          - button " Edit cart" [ref=f1e191] [cursor=pointer]:
            - generic [ref=f1e192]: 
            - text: Edit cart
          - button " Checkout" [ref=f1e194] [cursor=pointer]:
            - generic [ref=f1e195]: 
            - text: Checkout
    - generic [ref=f1e197]:
      - generic [ref=f1e199]:
        - heading "Filter" [level=4] [ref=f1e201]
        - button "" [ref=f1e203] [cursor=pointer]
      - generic [ref=f1e207]:
        - generic [ref=f1e208]:
          - generic [ref=f1e209] [cursor=pointer]:
            - text: Price 
            - generic [ref=f1e210]: 
          - generic [ref=f1e212]:
            - generic [ref=f1e213]:
              - generic [ref=f1e214] [cursor=pointer]
              - generic [ref=f1e215] [cursor=pointer]
            - generic [ref=f1e216]:
              - spinbutton "Minimum Price" [ref=f1e217]: "0"
              - generic [ref=f1e218]: to
              - spinbutton "Maximum Price" [ref=f1e219]: "0"
        - generic [ref=f1e220]:
          - generic [ref=f1e221] [cursor=pointer]:
            - text: Search 
            - generic [ref=f1e222]: 
          - textbox "Search" [ref=f1e225]
        - generic [ref=f1e226]:
          - generic [ref=f1e227] [cursor=pointer]:
            - text: Availability 
            - generic [ref=f1e228]: 
          - generic [ref=f1e231]:
            - generic [ref=f1e232]:
              - checkbox "In stock" [disabled] [ref=f1e233]
              - generic [ref=f1e234] [cursor=pointer]: In stock
            - generic [ref=f1e235]: "0"
        - generic [ref=f1e236]:
          - generic [ref=f1e237] [cursor=pointer]:
            - text: Discount 
            - generic [ref=f1e238]: 
          - generic [ref=f1e240]:
            - generic [ref=f1e241]:
              - generic [ref=f1e242]:
                - radio "10% off or more" [disabled] [ref=f1e243]
                - generic [ref=f1e244] [cursor=pointer]: 10% off or more
              - generic [ref=f1e245]: "0"
            - generic [ref=f1e246]:
              - generic [ref=f1e247]:
                - radio "20% off or more" [disabled] [ref=f1e248]
                - generic [ref=f1e249] [cursor=pointer]: 20% off or more
              - generic [ref=f1e250]: "0"
            - generic [ref=f1e251]:
              - generic [ref=f1e252]:
                - radio "30% off or more" [disabled] [ref=f1e253]
                - generic [ref=f1e254] [cursor=pointer]: 30% off or more
              - generic [ref=f1e255]: "0"
            - generic [ref=f1e256]:
              - generic [ref=f1e257]:
                - radio "40% off or more" [disabled] [ref=f1e258]
                - generic [ref=f1e259] [cursor=pointer]: 40% off or more
              - generic [ref=f1e260]: "0"
            - generic [ref=f1e261]:
              - generic [ref=f1e262]:
                - radio "50% off or more" [disabled] [ref=f1e263]
                - generic [ref=f1e264] [cursor=pointer]: 50% off or more
              - generic [ref=f1e265]: "0"
        - generic [ref=f1e266]:
          - generic [ref=f1e267] [cursor=pointer]:
            - text: Rating 
            - generic [ref=f1e268]: 
          - generic [ref=f1e270]:
            - generic [ref=f1e271]:
              - generic [ref=f1e272]:
                - radio "     & up" [disabled] [ref=f1e273]
                - generic [ref=f1e274] [cursor=pointer]:
                  - generic [ref=f1e275]:
                    - generic [ref=f1e276]: 
                    - generic [ref=f1e277]: 
                    - generic [ref=f1e278]: 
                    - generic [ref=f1e279]: 
                    - generic [ref=f1e280]: 
                  - text: "& up"
              - generic [ref=f1e281]: "0"
            - generic [ref=f1e282]:
              - generic [ref=f1e283]:
                - radio "     & up" [disabled] [ref=f1e284]
                - generic [ref=f1e285] [cursor=pointer]:
                  - generic [ref=f1e286]:
                    - generic [ref=f1e287]: 
                    - generic [ref=f1e288]: 
                    - generic [ref=f1e289]: 
                    - generic [ref=f1e290]: 
                    - generic [ref=f1e291]: 
                  - text: "& up"
              - generic [ref=f1e292]: "0"
            - generic [ref=f1e293]:
              - generic [ref=f1e294]:
                - radio "     & up" [disabled] [ref=f1e295]
                - generic [ref=f1e296] [cursor=pointer]:
                  - generic [ref=f1e297]:
                    - generic [ref=f1e298]: 
                    - generic [ref=f1e299]: 
                    - generic [ref=f1e300]: 
                    - generic [ref=f1e301]: 
                    - generic [ref=f1e302]: 
                  - text: "& up"
              - generic [ref=f1e303]: "0"
            - generic [ref=f1e304]:
              - generic [ref=f1e305]:
                - radio "     & up" [disabled] [ref=f1e306]
                - generic [ref=f1e307] [cursor=pointer]:
                  - generic [ref=f1e308]:
                    - generic [ref=f1e309]: 
                    - generic [ref=f1e310]: 
                    - generic [ref=f1e311]: 
                    - generic [ref=f1e312]: 
                    - generic [ref=f1e313]: 
                  - text: "& up"
              - generic [ref=f1e314]: "0"
    - generic [ref=f1e315]:
      - banner [ref=f1e316]:
        - button "" [ref=f1e318] [cursor=pointer]
        - generic [ref=f1e320]:
          - generic [ref=f1e321]:
            - figure [ref=f1e323]:
              - link [ref=f1e324] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Electro" [ref=f1e325]
            - generic [ref=f1e329]:
              - generic [ref=f1e331]:
                - button "All Categories" [ref=f1e333] [cursor=pointer]
                - textbox "Search For Products" [ref=f1e335]: "!!!@@@###"
              - button "Search" [ref=f1e337] [cursor=pointer]
            - link "Compare" [ref=f1e339] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - link "Wishlist" [ref=f1e344] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - button "0" [ref=f1e349] [cursor=pointer]
          - text: 
        - generic [ref=f1e355]:
          - generic [ref=f1e357] [cursor=pointer]:
            - button "Shop by Category" [ref=f1e359]
            - navigation [ref=f1e364]:
              - list [ref=f1e366]:
                - listitem [ref=f1e367]:
                  - link "Home" [ref=f1e368]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - listitem [ref=f1e371]:
                  - link "Special Hot" [ref=f1e372]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                    - generic [ref=f1e373]: Special
                    - generic [ref=f1e375]: Hot
                - listitem [ref=f1e376]:
                  - link "Blog" [ref=f1e377]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - listitem [ref=f1e380]:
                  - button "Mega Menu" [ref=f1e381]
                - listitem [ref=f1e384]:
                  - button "AddOns Featured" [ref=f1e385]:
                    - generic [ref=f1e386]: AddOns
                    - generic [ref=f1e388]: Featured
                - listitem [ref=f1e389]:
                  - button " My account" [ref=f1e390]:
                    - generic [ref=f1e391]: 
                    - generic [ref=f1e392]: My account
          - text:  
          - paragraph [ref=f1e396]:
            - strong [ref=f1e397]: This is a dummy website for Web Automation Testing
      - generic [ref=f1e398]:
        - navigation "breadcrumb" [ref=f1e401]:
          - list [ref=f1e402]:
            - listitem [ref=f1e403]:
              - link "Home" [ref=f1e404] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - generic [ref=f1e405]: 
            - listitem [ref=f1e406]: / Search
        - generic [ref=f1e408]:
          - generic [ref=f1e409]:
            - heading "Search - !!!@@@###" [level=1] [ref=f1e411]
            - generic [ref=f1e412]:
              - generic [ref=f1e413]: Search Criteria
              - generic [ref=f1e414]:
                - textbox "Search Criteria" [ref=f1e416]:
                  - /placeholder: Keywords
                  - text: "!!!@@@###"
                - combobox [ref=f1e418]:
                  - option "All Categories" [selected]
                  - option "Desktops"
                  - option "PC"
                  - option "Mac"
                  - option "Laptops"
                  - option "Macs"
                  - option "Windows"
                  - option "Components"
                  - option "Mice and Trackballs"
                  - option "Monitors"
                  - option "Printers"
                  - option "Scanners"
                  - option "Web Cameras"
                  - option "Tablets"
                  - option "Software"
                  - option "Phones & PDAs"
                  - option "Cameras"
                  - option "MP3 Players"
                - button "Search" [ref=f1e420] [cursor=pointer]
                - generic [ref=f1e421]:
                  - generic [ref=f1e422]:
                    - checkbox "Search in subcategories" [disabled] [ref=f1e423]
                    - generic [ref=f1e424]: Search in subcategories
                  - generic [ref=f1e425]:
                    - checkbox "Search in product descriptions" [ref=f1e426]
                    - generic [ref=f1e427]: Search in product descriptions
            - generic [ref=f1e429]:
              - generic [ref=f1e431]:
                - button "" [ref=f1e432] [cursor=pointer]
                - button "" [ref=f1e434] [cursor=pointer]
              - link "Product Compare (0)" [ref=f1e437] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
              - text: 
            - generic [ref=f1e438]:
              - paragraph [ref=f1e439]: There is no product that matches the search criteria.
              - link "Continue" [ref=f1e442] [cursor=pointer]:
                - /url: ""
          - generic [ref=f1e443]:
            - generic [ref=f1e445]:
              - generic [ref=f1e446] [cursor=pointer]:
                - heading "Filter" [level=3] [ref=f1e447]
                - text: 
                - generic [ref=f1e448]: 
              - generic [ref=f1e449]:
                - generic [ref=f1e450]:
                  - generic [ref=f1e451] [cursor=pointer]:
                    - text: Price 
                    - generic [ref=f1e452]: 
                  - generic [ref=f1e454]:
                    - generic [ref=f1e455]:
                      - generic [ref=f1e456] [cursor=pointer]
                      - generic [ref=f1e457] [cursor=pointer]
                    - generic [ref=f1e458]:
                      - spinbutton "Minimum Price" [ref=f1e459]: "0"
                      - generic [ref=f1e460]: to
                      - spinbutton "Maximum Price" [ref=f1e461]: "0"
                - generic [ref=f1e462]:
                  - generic [ref=f1e463] [cursor=pointer]:
                    - text: Search 
                    - generic [ref=f1e464]: 
                  - textbox "Search" [ref=f1e467]
                - generic [ref=f1e468]:
                  - generic [ref=f1e469] [cursor=pointer]:
                    - text: Availability 
                    - generic [ref=f1e470]: 
                  - generic [ref=f1e473]:
                    - generic [ref=f1e474]:
                      - checkbox "In stock" [disabled] [ref=f1e475]
                      - generic [ref=f1e476] [cursor=pointer]: In stock
                    - generic [ref=f1e477]: "0"
                - generic [ref=f1e478]:
                  - generic [ref=f1e479] [cursor=pointer]:
                    - text: Discount 
                    - generic [ref=f1e480]: 
                  - generic [ref=f1e482]:
                    - generic [ref=f1e483]:
                      - generic [ref=f1e484]:
                        - radio "10% off or more" [disabled] [ref=f1e485]
                        - generic [ref=f1e486] [cursor=pointer]: 10% off or more
                      - generic [ref=f1e487]: "0"
                    - generic [ref=f1e488]:
                      - generic [ref=f1e489]:
                        - radio "20% off or more" [disabled] [ref=f1e490]
                        - generic [ref=f1e491] [cursor=pointer]: 20% off or more
                      - generic [ref=f1e492]: "0"
                    - generic [ref=f1e493]:
                      - generic [ref=f1e494]:
                        - radio "30% off or more" [disabled] [ref=f1e495]
                        - generic [ref=f1e496] [cursor=pointer]: 30% off or more
                      - generic [ref=f1e497]: "0"
                    - generic [ref=f1e498]:
                      - generic [ref=f1e499]:
                        - radio "40% off or more" [disabled] [ref=f1e500]
                        - generic [ref=f1e501] [cursor=pointer]: 40% off or more
                      - generic [ref=f1e502]: "0"
                    - generic [ref=f1e503]:
                      - generic [ref=f1e504]:
                        - radio "50% off or more" [disabled] [ref=f1e505]
                        - generic [ref=f1e506] [cursor=pointer]: 50% off or more
                      - generic [ref=f1e507]: "0"
                - generic [ref=f1e508]:
                  - generic [ref=f1e509] [cursor=pointer]:
                    - text: Rating 
                    - generic [ref=f1e510]: 
                  - generic [ref=f1e512]:
                    - generic [ref=f1e513]:
                      - generic [ref=f1e514]:
                        - radio "     & up" [disabled] [ref=f1e515]
                        - generic [ref=f1e516] [cursor=pointer]:
                          - generic [ref=f1e517]:
                            - generic [ref=f1e518]: 
                            - generic [ref=f1e519]: 
                            - generic [ref=f1e520]: 
                            - generic [ref=f1e521]: 
                            - generic [ref=f1e522]: 
                          - text: "& up"
                      - generic [ref=f1e523]: "0"
                    - generic [ref=f1e524]:
                      - generic [ref=f1e525]:
                        - radio "     & up" [disabled] [ref=f1e526]
                        - generic [ref=f1e527] [cursor=pointer]:
                          - generic [ref=f1e528]:
                            - generic [ref=f1e529]: 
                            - generic [ref=f1e530]: 
                            - generic [ref=f1e531]: 
                            - generic [ref=f1e532]: 
                            - generic [ref=f1e533]: 
                          - text: "& up"
                      - generic [ref=f1e534]: "0"
                    - generic [ref=f1e535]:
                      - generic [ref=f1e536]:
                        - radio "     & up" [disabled] [ref=f1e537]
                        - generic [ref=f1e538] [cursor=pointer]:
                          - generic [ref=f1e539]:
                            - generic [ref=f1e540]: 
                            - generic [ref=f1e541]: 
                            - generic [ref=f1e542]: 
                            - generic [ref=f1e543]: 
                            - generic [ref=f1e544]: 
                          - text: "& up"
                      - generic [ref=f1e545]: "0"
                    - generic [ref=f1e546]:
                      - generic [ref=f1e547]:
                        - radio "     & up" [disabled] [ref=f1e548]
                        - generic [ref=f1e549] [cursor=pointer]:
                          - generic [ref=f1e550]:
                            - generic [ref=f1e551]: 
                            - generic [ref=f1e552]: 
                            - generic [ref=f1e553]: 
                            - generic [ref=f1e554]: 
                            - generic [ref=f1e555]: 
                          - text: "& up"
                      - generic [ref=f1e556]: "0"
            - generic [ref=f1e558]:
              - link "Desktops (75)" [ref=f1e559] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=20
              - link "Laptops (75)" [ref=f1e560] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
              - link "Components (75)" [ref=f1e561] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
              - link "Tablets (75)" [ref=f1e562] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
              - link "Software (75)" [ref=f1e563] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
              - link "Phones & PDAs (75)" [ref=f1e564] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=24
              - link "Cameras (75)" [ref=f1e565] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
              - link "MP3 Players (75)" [ref=f1e566] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
      - contentinfo [ref=f1e567]:
        - paragraph [ref=f1e573]: © LambdaTest - Powered by OpenCart
  - text:  
```

# Test source

```ts
  1  | import { TAGS } from '../../constants/Tags';
  2  | import { expect, test } from '../../fixtures/testFixtures';
  3  | 
  4  | test.describe('Search', () => {
  5  |   test(
  6  |     'TC_SEARCH_001_Search_Product_By_Name',
  7  |     { tag: [TAGS.search, TAGS.functional, TAGS.smoke, TAGS.regression] },
  8  |     async ({ homePage, searchPage, data }) => {
  9  |       const { exact } = data.searchTerms();
  10 | 
  11 |       // 1. Search for a product by its full name
  12 |       await homePage.open();
  13 |       await homePage.searchFor(exact);
  14 | 
  15 |       // 2. Verify the results heading and the product link
  16 |       await expect(searchPage.resultsHeading(exact)).toBeVisible();
  17 |       await expect(searchPage.productLink(exact)).toBeVisible();
  18 |     },
  19 |   );
  20 | 
  21 |   test(
  22 |     'TC_SEARCH_002_Search_Products_By_Partial_Name',
  23 |     { tag: [TAGS.search, TAGS.functional, TAGS.regression] },
  24 |     async ({ homePage, searchPage, data }) => {
  25 |       const { partial } = data.searchTerms();
  26 | 
  27 |       // 1. Search with a partial term
  28 |       await homePage.open();
  29 |       await homePage.searchFor(partial);
  30 | 
  31 |       // 2. Verify the results page renders at least one product
  32 |       await expect(searchPage.resultsHeading(partial)).toBeVisible();
  33 |       await expect(searchPage.productCards.first()).toBeVisible();
  34 |     },
  35 |   );
  36 | 
  37 |   test(
  38 |     'TC_SEARCH_003_Non_Existent_Product_Shows_No_Results',
  39 |     { tag: [TAGS.search, TAGS.negative, TAGS.regression] },
  40 |     async ({ homePage, searchPage, data }) => {
  41 |       const { nonExistent } = data.searchTerms();
  42 | 
  43 |       // 1. Search for a term with no matching products
  44 |       await homePage.open();
  45 |       await homePage.searchFor(nonExistent);
  46 | 
  47 |       // 2. Verify the no-results state
  48 |       await expect(searchPage.noResultsMessage).toBeVisible();
  49 |     },
  50 |   );
  51 | 
  52 |   test(
  53 |     'TC_SEARCH_004_Special_Characters_Show_No_Results',
  54 |     { tag: [TAGS.search, TAGS.negative] },
  55 |     async ({ homePage, searchPage, data }) => {
  56 |       const { specialCharacters } = data.searchTerms();
  57 | 
  58 |       // 1. Search using special characters
  59 |       await homePage.open();
  60 |       await homePage.searchFor(specialCharacters);
  61 | 
  62 |       // 2. Verify the no-results state rather than an error
> 63 |       await expect(searchPage.noResultsMessage).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  64 |     },
  65 |   );
  66 | 
  67 |   test(
  68 |     'TC_SEARCH_005_Open_Product_From_Search_Results',
  69 |     { tag: [TAGS.search, TAGS.product, TAGS.functional, TAGS.regression] },
  70 |     async ({ searchPage, productDetailsPage, data }) => {
  71 |       const product = data.product('iMac');
  72 | 
  73 |       // 1. Open the search results for a product
  74 |       await searchPage.open(product.name);
  75 | 
  76 |       // 2. Open the product from the results
  77 |       await searchPage.openProduct(product.name);
  78 | 
  79 |       // 3. Verify the product detail page is displayed
  80 |       await expect(productDetailsPage.nameHeading).toHaveText(product.name);
  81 |     },
  82 |   );
  83 | });
  84 | 
```
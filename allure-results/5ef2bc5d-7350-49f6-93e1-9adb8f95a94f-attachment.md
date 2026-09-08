# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart/cart.spec.ts >> Cart >> TC_CART_003_Update_Product_Quantity
- Location: tests/cart/cart.spec.ts:43:7

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
    - text: 
    - generic:    
    - text:  
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
        - figure [ref=e283]:
          - link [ref=e284] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
            - img "Apple Cinema 30\"" [ref=e285]
        - generic [ref=e287]:
          - navigation "breadcrumb" [ref=e289]:
            - list [ref=e290]:
              - listitem [ref=e291]:
                - link "Home" [ref=e292] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                  - generic [ref=e293]: 
              - listitem [ref=e294]:
                - text: /
                - link "Software" [ref=e295] [cursor=pointer]:
                  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
              - listitem [ref=e296]: / iMac
          - generic [ref=e297]:
            - generic [ref=e298]:
              - generic [ref=e300]:
                - generic [ref=e301]:
                  - button "" [ref=e302] [cursor=pointer]
                  - link [ref=e304] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/10-500x500.webp
                    - img "iMac" [ref=e305]
                - generic [ref=e307]:
                  - generic [ref=e308]:
                    - link "" [ref=e310] [cursor=pointer]:
                      - /url: https://www.youtube.com/embed/wGixQPuG1GY
                    - link [ref=e313] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/13-500x500.webp
                      - img "iMac" [ref=e314]
                    - link [ref=e316] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/15-500x500.webp
                      - img "iMac" [ref=e317]
                    - link [ref=e319] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                      - img "iMac" [ref=e320]
                    - link [ref=e322] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
                      - img "iMac" [ref=e323]
                  - generic [ref=e324]: 
                  - generic [ref=e326]: 
                  - generic [ref=e328]: 
                  - generic [ref=e330]: 
              - text:       
              - tablist [ref=e335]:
                - listitem [ref=e336]:
                  - tab "Description" [ref=e337] [cursor=pointer]
                - listitem [ref=e338]:
                  - tab "Reviews" [ref=e339] [cursor=pointer]
                - listitem [ref=e340]:
                  - tab "Custom" [ref=e341] [cursor=pointer]
            - generic [ref=e342]:
              - heading "iMac" [level=1] [ref=e344]
              - list [ref=e348]:
                - listitem [ref=e349]: "Product Code: Product 14"
              - separator [ref=e351]
              - generic [ref=e353]:
                - list [ref=e355]:
                  - listitem [ref=e356]:
                    - text: "Brand:"
                    - link "Apple" [ref=e357] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8
                  - listitem [ref=e358]: "Viewed: 92318"
                  - listitem [ref=e359]:
                    - text: "Availability:"
                    - generic [ref=e360]: In Stock
                - figure [ref=e362]:
                  - link [ref=e363] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8
                    - img "Apple" [ref=e364]
              - separator [ref=e366]
              - generic [ref=e371]:
                - heading "$170.00" [level=3] [ref=e372]
                - generic [ref=e373] [cursor=pointer]: 
              - generic [ref=e376]:
                - generic [ref=e378]:
                  - generic [ref=e380] [cursor=pointer]:
                    - button "Decrease quantity" [ref=e382]:
                      - generic [ref=e383]: 
                    - spinbutton "Qty" [ref=e384]: "1"
                    - button "Increase quantity" [ref=e386]:
                      - generic [ref=e387]: 
                  - button "Add to Cart" [ref=e389] [cursor=pointer]
                  - button "Buy now" [ref=e391] [cursor=pointer]
                - button " Compare this Product" [ref=e393] [cursor=pointer]:
                  - generic [ref=e394]:
                    - generic [ref=e395]: 
                    - text: 
                  - text: Compare this Product
              - generic [ref=e397]:
                - button "Size chart" [ref=e399] [cursor=pointer]:
                  - generic [ref=e400]: 
                  - text: Size chart
                - button "Popup" [ref=e402] [cursor=pointer]:
                  - generic [ref=e403]: 
                  - text: Popup
                - button "Ask Question" [ref=e405] [cursor=pointer]:
                  - generic [ref=e406]: 
                  - text: Ask Question
              - separator [ref=e408]
              - generic [ref=e410]:
                - heading "Online payment" [level=5] [ref=e420]
                - heading "Easy Return" [level=5] [ref=e429]
                - heading "24x7 Service" [level=5] [ref=e440]
              - generic [ref=e442]:
                - generic [ref=e443]:
                  - generic [ref=e444]: 0/50 reviews
                  - generic [ref=e445]:
                    - generic [ref=e446] [cursor=pointer]: ★ 5
                    - generic [ref=e447] [cursor=pointer]: ★ 4
                    - generic [ref=e448] [cursor=pointer]: ★ 3
                    - generic [ref=e449] [cursor=pointer]: ★ 2
                    - generic [ref=e450] [cursor=pointer]: ★ 1
                    - generic [ref=e451] [cursor=pointer]: ★ 0
                - heading "Write a review" [level=5] [ref=e452]
                - textbox "Your Name" [ref=e454]
                - textbox "Your Review" [ref=e456]
                - button "Write Review" [ref=e459] [cursor=pointer]
          - generic [ref=e460]:
            - heading "Related Products" [level=3] [ref=e461]
            - generic [ref=e462]:
              - generic [ref=e464]:
                - generic [ref=e465]:
                  - link [ref=e467] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
                    - img "Apple Cinema 30&quot;" [ref=e470]
                    - list [ref=e471]:
                      - listitem [ref=e472]:
                        - img "Apple Cinema 30&quot;" [ref=e473]
                      - listitem [ref=e474]:
                        - img "Apple Cinema 30&quot;" [ref=e475]
                  - generic [ref=e476]:
                    - button "" [ref=e477] [cursor=pointer]
                    - button "" [ref=e479] [cursor=pointer]
                    - button "" [ref=e481] [cursor=pointer]
                    - button "" [ref=e483] [cursor=pointer]
                - generic [ref=e485]:
                  - heading [level=4] [ref=e486]:
                    - link "Apple Cinema 30\"" [ref=e487] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
                  - generic [ref=e488]: $122.00
              - generic [ref=e490]:
                - generic [ref=e491]:
                  - link [ref=e493] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=50
                    - img "Apple Cinema 30&quot;" [ref=e496]
                    - list [ref=e497]:
                      - listitem [ref=e498]:
                        - img "Apple Cinema 30&quot;" [ref=e499]
                      - listitem [ref=e500]:
                        - img "Apple Cinema 30&quot;" [ref=e501]
                      - listitem [ref=e502]:
                        - img "Apple Cinema 30&quot;" [ref=e503]
                  - generic [ref=e504]:
                    - button "" [ref=e505] [cursor=pointer]
                    - button "" [ref=e507] [cursor=pointer]
                    - button "" [ref=e509] [cursor=pointer]
                    - button "" [ref=e511] [cursor=pointer]
                - generic [ref=e513]:
                  - heading [level=4] [ref=e514]:
                    - link "Apple Cinema 30\"" [ref=e515] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=50
                  - generic [ref=e516]: $122.00
              - generic [ref=e518]:
                - generic [ref=e519]:
                  - link [ref=e521] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=68
                    - img "Apple Cinema 30&quot;" [ref=e524]
                    - list [ref=e525]:
                      - listitem [ref=e526]:
                        - img "Apple Cinema 30&quot;" [ref=e527]
                      - listitem [ref=e528]:
                        - img "Apple Cinema 30&quot;" [ref=e529]
                      - listitem [ref=e530]:
                        - img "Apple Cinema 30&quot;" [ref=e531]
                  - generic [ref=e532]:
                    - button "" [ref=e533] [cursor=pointer]
                    - button "" [ref=e535] [cursor=pointer]
                    - button "" [ref=e537] [cursor=pointer]
                    - button "" [ref=e539] [cursor=pointer]
                - generic [ref=e541]:
                  - heading [level=4] [ref=e542]:
                    - link "Apple Cinema 30\"" [ref=e543] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=68
                  - generic [ref=e544]: $122.00
              - generic [ref=e546]:
                - generic [ref=e547]:
                  - link [ref=e549] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=69
                    - img "Apple Cinema 30&quot;" [ref=e552]
                    - list [ref=e553]:
                      - listitem [ref=e554]:
                        - img "Apple Cinema 30&quot;" [ref=e555]
                      - listitem [ref=e556]:
                        - img "Apple Cinema 30&quot;" [ref=e557]
                      - listitem [ref=e558]:
                        - img "Apple Cinema 30&quot;" [ref=e559]
                  - generic [ref=e560]:
                    - button "" [ref=e561] [cursor=pointer]
                    - button "" [ref=e563] [cursor=pointer]
                    - button "" [ref=e565] [cursor=pointer]
                    - button "" [ref=e567] [cursor=pointer]
                - generic [ref=e569]:
                  - heading [level=4] [ref=e570]:
                    - link "Apple Cinema 30\"" [ref=e571] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=69
                  - generic [ref=e572]: $122.00
              - generic [ref=e574]:
                - generic [ref=e575]:
                  - link [ref=e577] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=88
                    - img "Apple Cinema 30&quot;" [ref=e580]
                    - list [ref=e581]:
                      - listitem [ref=e582]:
                        - img "Apple Cinema 30&quot;" [ref=e583]
                      - listitem [ref=e584]:
                        - img "Apple Cinema 30&quot;" [ref=e585]
                      - listitem [ref=e586]:
                        - img "Apple Cinema 30&quot;" [ref=e587]
                  - generic [ref=e588]:
                    - button "" [ref=e589] [cursor=pointer]
                    - button "" [ref=e591] [cursor=pointer]
                    - button "" [ref=e593] [cursor=pointer]
                    - button "" [ref=e595] [cursor=pointer]
                - generic [ref=e597]:
                  - heading [level=4] [ref=e598]:
                    - link "Apple Cinema 30\"" [ref=e599] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=88
                  - generic [ref=e600]: $122.00
              - generic [ref=e602]:
                - generic [ref=e603]:
                  - link [ref=e605] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=89
                    - img "Apple Cinema 30&quot;" [ref=e608]
                    - list [ref=e609]:
                      - listitem [ref=e610]:
                        - img "Apple Cinema 30&quot;" [ref=e611]
                      - listitem [ref=e612]:
                        - img "Apple Cinema 30&quot;" [ref=e613]
                      - listitem [ref=e614]:
                        - img "Apple Cinema 30&quot;" [ref=e615]
                  - generic [ref=e616]:
                    - button "" [ref=e617] [cursor=pointer]
                    - button "" [ref=e619] [cursor=pointer]
                    - button "" [ref=e621] [cursor=pointer]
                    - button "" [ref=e623] [cursor=pointer]
                - generic [ref=e625]:
                  - heading [level=4] [ref=e626]:
                    - link "Apple Cinema 30\"" [ref=e627] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=89
                  - generic [ref=e628]: $122.00
              - generic [ref=e630]:
                - generic [ref=e631]:
                  - link [ref=e633] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=90
                    - img "Apple Cinema 30&quot;" [ref=e636]
                    - list [ref=e637]:
                      - listitem [ref=e638]:
                        - img "Apple Cinema 30&quot;" [ref=e639]
                      - listitem [ref=e640]:
                        - img "Apple Cinema 30&quot;" [ref=e641]
                      - listitem [ref=e642]:
                        - img "Apple Cinema 30&quot;" [ref=e643]
                  - generic [ref=e644]:
                    - button "" [ref=e645] [cursor=pointer]
                    - button "" [ref=e647] [cursor=pointer]
                    - button "" [ref=e649] [cursor=pointer]
                    - button "" [ref=e651] [cursor=pointer]
                - generic [ref=e653]:
                  - heading [level=4] [ref=e654]:
                    - link "Apple Cinema 30\"" [ref=e655] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=90
                  - generic [ref=e656]: $122.00
              - generic [ref=e658]:
                - generic [ref=e659]:
                  - link [ref=e661] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=91
                    - img "Apple Cinema 30&quot;" [ref=e664]
                    - list [ref=e665]:
                      - listitem [ref=e666]:
                        - img "Apple Cinema 30&quot;" [ref=e667]
                      - listitem [ref=e668]:
                        - img "Apple Cinema 30&quot;" [ref=e669]
                      - listitem [ref=e670]:
                        - img "Apple Cinema 30&quot;" [ref=e671]
                  - generic [ref=e672]:
                    - button "" [ref=e673] [cursor=pointer]
                    - button "" [ref=e675] [cursor=pointer]
                    - button "" [ref=e677] [cursor=pointer]
                    - button "" [ref=e679] [cursor=pointer]
                - generic [ref=e681]:
                  - heading [level=4] [ref=e682]:
                    - link "Apple Cinema 30\"" [ref=e683] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=91
                  - generic [ref=e684]: $122.00
        - generic [ref=e687]:
          - heading "FAQ (Frequently Asked Questions)" [level=3] [ref=e688]
          - generic [ref=e689]:
            - heading "How can I change my shipping address? " [level=5] [ref=e692] [cursor=pointer]:
              - generic [ref=e693]: How can I change my shipping address?
              - generic [ref=e694]: 
            - heading "How can I change my shipping address? " [level=5] [ref=e697] [cursor=pointer]:
              - generic [ref=e698]: How can I change my shipping address?
              - generic [ref=e699]: 
            - heading "How do I activate my account? " [level=5] [ref=e702] [cursor=pointer]:
              - generic [ref=e703]: How do I activate my account?
              - generic [ref=e704]: 
            - heading "What do you mean by points? How do I earn it? " [level=5] [ref=e707] [cursor=pointer]:
              - generic [ref=e708]: What do you mean by points? How do I earn it?
              - generic [ref=e709]: 
            - heading "Why is there a checkout limit? / What are all the checkout limits? " [level=5] [ref=e712] [cursor=pointer]:
              - generic [ref=e713]: Why is there a checkout limit? / What are all the checkout limits?
              - generic [ref=e714]: 
            - heading "Why must I make payment immediately at checkout? " [level=5] [ref=e717] [cursor=pointer]:
              - generic [ref=e718]: Why must I make payment immediately at checkout?
              - generic [ref=e719]: 
      - contentinfo [ref=e720]:
        - paragraph [ref=e726]: © LambdaTest - Powered by OpenCart
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
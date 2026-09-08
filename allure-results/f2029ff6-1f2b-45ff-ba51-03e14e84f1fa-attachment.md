# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation/navigation.spec.ts >> Navigation >> TC_NAV_002_Manufacturer_Page_Lists_Brand_Products
- Location: tests/navigation/navigation.spec.ts:21:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8", waiting until "load"

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
    - generic [ref=e197]:
      - generic [ref=e199]:
        - heading "Filter" [level=4] [ref=e201]
        - button "" [ref=e203] [cursor=pointer]
      - generic [ref=e207]:
        - generic [ref=e208]:
          - generic [ref=e209] [cursor=pointer]:
            - text: Price 
            - generic [ref=e210]: 
          - generic [ref=e213]:
            - spinbutton "Minimum Price" [ref=e214]: "122"
            - generic [ref=e215]: to
            - spinbutton "Maximum Price" [ref=e216]: "2000"
        - generic [ref=e217]:
          - generic [ref=e218] [cursor=pointer]:
            - text: Search 
            - generic [ref=e219]: 
          - textbox "Search" [ref=e222]
        - generic [ref=e223]:
          - generic [ref=e224] [cursor=pointer]:
            - text: Color 
            - generic [ref=e225]: 
          - generic [ref=e227]:
            - generic "Blue" [ref=e230] [cursor=pointer]:
              - img "Blue" [ref=e231]
            - generic "Green" [ref=e234] [cursor=pointer]:
              - img "Green" [ref=e235]
            - generic "Orange" [ref=e238] [cursor=pointer]:
              - img "Orange" [ref=e239]
            - generic "Pink" [ref=e242] [cursor=pointer]:
              - img "Pink" [ref=e243]
            - generic "Red" [ref=e246] [cursor=pointer]:
              - img "Red" [ref=e247]
        - generic [ref=e248]:
          - generic [ref=e249] [cursor=pointer]:
            - text: Availability 
            - generic [ref=e250]: 
          - generic [ref=e252]:
            - generic [ref=e253]:
              - generic [ref=e254]:
                - checkbox "In stock" [ref=e255]
                - generic [ref=e256] [cursor=pointer]: In stock
              - generic [ref=e257]: "39"
            - generic [ref=e258]:
              - generic [ref=e259]:
                - checkbox "Out Of Stock" [ref=e260]
                - generic [ref=e261] [cursor=pointer]: Out Of Stock
              - generic [ref=e262]: "3"
        - generic [ref=e263]:
          - generic [ref=e264] [cursor=pointer]:
            - text: Size 
            - generic [ref=e265]: 
          - generic [ref=e267]:
            - generic [ref=e268]: L
            - generic [ref=e271]: M
            - generic [ref=e274]: S
            - generic [ref=e277]: XL
            - generic [ref=e280]: XXL
        - generic [ref=e283]:
          - generic [ref=e284] [cursor=pointer]:
            - text: Discount 
            - generic [ref=e285]: 
          - generic [ref=e287]:
            - generic [ref=e288]:
              - generic [ref=e289]:
                - radio "10% off or more" [disabled] [ref=e290]
                - generic [ref=e291] [cursor=pointer]: 10% off or more
              - generic [ref=e292]: "0"
            - generic [ref=e293]:
              - generic [ref=e294]:
                - radio "20% off or more" [disabled] [ref=e295]
                - generic [ref=e296] [cursor=pointer]: 20% off or more
              - generic [ref=e297]: "0"
            - generic [ref=e298]:
              - generic [ref=e299]:
                - radio "30% off or more" [disabled] [ref=e300]
                - generic [ref=e301] [cursor=pointer]: 30% off or more
              - generic [ref=e302]: "0"
            - generic [ref=e303]:
              - generic [ref=e304]:
                - radio "40% off or more" [disabled] [ref=e305]
                - generic [ref=e306] [cursor=pointer]: 40% off or more
              - generic [ref=e307]: "0"
            - generic [ref=e308]:
              - generic [ref=e309]:
                - radio "50% off or more" [disabled] [ref=e310]
                - generic [ref=e311] [cursor=pointer]: 50% off or more
              - generic [ref=e312]: "0"
        - generic [ref=e313]:
          - generic [ref=e314] [cursor=pointer]:
            - text: Rating 
            - generic [ref=e315]: 
          - generic [ref=e317]:
            - generic [ref=e318]:
              - generic [ref=e319]:
                - radio "     & up" [disabled] [ref=e320]
                - generic [ref=e321] [cursor=pointer]:
                  - generic [ref=e322]:
                    - generic [ref=e323]: 
                    - generic [ref=e324]: 
                    - generic [ref=e325]: 
                    - generic [ref=e326]: 
                    - generic [ref=e327]: 
                  - text: "& up"
              - generic [ref=e328]: "0"
            - generic [ref=e329]:
              - generic [ref=e330]:
                - radio "     & up" [disabled] [ref=e331]
                - generic [ref=e332] [cursor=pointer]:
                  - generic [ref=e333]:
                    - generic [ref=e334]: 
                    - generic [ref=e335]: 
                    - generic [ref=e336]: 
                    - generic [ref=e337]: 
                    - generic [ref=e338]: 
                  - text: "& up"
              - generic [ref=e339]: "0"
            - generic [ref=e340]:
              - generic [ref=e341]:
                - radio "     & up" [disabled] [ref=e342]
                - generic [ref=e343] [cursor=pointer]:
                  - generic [ref=e344]:
                    - generic [ref=e345]: 
                    - generic [ref=e346]: 
                    - generic [ref=e347]: 
                    - generic [ref=e348]: 
                    - generic [ref=e349]: 
                  - text: "& up"
              - generic [ref=e350]: "0"
            - generic [ref=e351]:
              - generic [ref=e352]:
                - radio "     & up" [disabled] [ref=e353]
                - generic [ref=e354] [cursor=pointer]:
                  - generic [ref=e355]:
                    - generic [ref=e356]: 
                    - generic [ref=e357]: 
                    - generic [ref=e358]: 
                    - generic [ref=e359]: 
                    - generic [ref=e360]: 
                  - text: "& up"
              - generic [ref=e361]: "0"
    - generic [ref=e362]:
      - banner [ref=e363]:
        - button "" [ref=e365] [cursor=pointer]
        - generic [ref=e367]:
          - generic [ref=e368]:
            - figure [ref=e370]:
              - link [ref=e371] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Electro" [ref=e372]
            - generic [ref=e376]:
              - generic [ref=e378]:
                - button "All Categories" [ref=e380] [cursor=pointer]
                - textbox "Search For Products" [ref=e382]
              - button "Search" [ref=e384] [cursor=pointer]
            - link "Compare" [ref=e386] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
            - link "Wishlist" [ref=e391] [cursor=pointer]:
              - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
            - button "0" [ref=e396] [cursor=pointer]
          - text: 
        - generic [ref=e402]:
          - generic [ref=e404] [cursor=pointer]:
            - button "Shop by Category" [ref=e406]
            - navigation [ref=e411]:
              - list [ref=e413]:
                - listitem [ref=e414]:
                  - link "Home" [ref=e415]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - listitem [ref=e418]:
                  - link "Special Hot" [ref=e419]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
                    - generic [ref=e420]: Special
                    - generic [ref=e422]: Hot
                - listitem [ref=e423]:
                  - link "Blog" [ref=e424]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
                - listitem [ref=e427]:
                  - button "Mega Menu" [ref=e428]
                - listitem [ref=e431]:
                  - button "AddOns Featured" [ref=e432]:
                    - generic [ref=e433]: AddOns
                    - generic [ref=e435]: Featured
                - listitem [ref=e436]:
                  - button " My account" [ref=e437]:
                    - generic [ref=e438]: 
                    - generic [ref=e439]: My account
          - text:  
          - paragraph [ref=e443]:
            - strong [ref=e444]: This is a dummy website for Web Automation Testing
      - generic [ref=e445]:
        - figure [ref=e449]:
          - link [ref=e450] [cursor=pointer]:
            - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
            - img "Apple Cinema 30\"" [ref=e451]
        - navigation "breadcrumb" [ref=e454]:
          - list [ref=e455]:
            - listitem [ref=e456]:
              - link "Home" [ref=e457] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - generic [ref=e458]: 
            - listitem [ref=e459]:
              - text: /
              - link "Brand" [ref=e460] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer
            - listitem [ref=e461]: / Apple
        - generic [ref=e463]:
          - generic [ref=e464]:
            - heading "Apple" [level=1] [ref=e466]
            - generic [ref=e468]:
              - generic [ref=e470]:
                - button "" [ref=e471] [cursor=pointer]
                - button "" [ref=e473] [cursor=pointer]
              - link "Product Compare (0)" [ref=e476] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
              - text: 
              - generic [ref=e478]:
                - generic [ref=e479]: "Show:"
                - combobox "Show:" [ref=e481]:
                  - option "15" [selected]
                  - option "25"
                  - option "50"
                  - option "75"
                  - option "100"
              - generic [ref=e483]:
                - generic [ref=e484]: "Sort By:"
                - combobox "Sort By:" [ref=e486]:
                  - option "Default" [selected]
                  - option "Best sellers"
                  - option "Popular"
                  - option "Newest"
                  - option "Name (A - Z)"
                  - option "Name (Z - A)"
                  - option "Price (Low > High)"
                  - option "Price (High > Low)"
                  - option "Rating (Highest)"
                  - option "Rating (Lowest)"
                  - option "Model (A - Z)"
                  - option "Model (Z - A)"
            - generic [ref=e488]:
              - generic [ref=e490]:
                - generic [ref=e491]:
                  - link [ref=e493] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=32
                    - img "iPod Touch" [ref=e496]
                    - list [ref=e497]:
                      - listitem [ref=e498]:
                        - img "iPod Touch" [ref=e499]
                      - listitem [ref=e500]:
                        - img "iPod Touch" [ref=e501]
                      - listitem [ref=e502]:
                        - img "iPod Touch" [ref=e503]
                  - generic [ref=e504]:
                    - button "" [ref=e505] [cursor=pointer]
                    - button "" [ref=e507] [cursor=pointer]
                    - button "" [ref=e509] [cursor=pointer]
                    - button "" [ref=e511] [cursor=pointer]
                - generic [ref=e513]:
                  - heading [level=4] [ref=e514]:
                    - link "iPod Touch" [ref=e515] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=32
                  - generic [ref=e516]: $194.00
              - generic [ref=e518]:
                - generic [ref=e519]:
                  - link [ref=e521] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=34
                    - img "iPod Shuffle" [ref=e524]
                    - list [ref=e525]:
                      - listitem [ref=e526]:
                        - img "iPod Shuffle" [ref=e527]
                      - listitem [ref=e528]:
                        - img "iPod Shuffle" [ref=e529]
                      - listitem [ref=e530]:
                        - img "iPod Shuffle" [ref=e531]
                  - generic [ref=e532]:
                    - button "" [ref=e533] [cursor=pointer]
                    - button "" [ref=e535] [cursor=pointer]
                    - button "" [ref=e537] [cursor=pointer]
                    - button "" [ref=e539] [cursor=pointer]
                - generic [ref=e541]:
                  - heading [level=4] [ref=e542]:
                    - link "iPod Shuffle" [ref=e543] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=34
                  - generic [ref=e544]: $182.00
              - generic [ref=e546]:
                - generic [ref=e547]:
                  - link [ref=e549] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=36
                    - img "iPod Nano" [ref=e552]
                    - list [ref=e553]:
                      - listitem [ref=e554]:
                        - img "iPod Nano" [ref=e555]
                      - listitem [ref=e556]:
                        - img "iPod Nano" [ref=e557]
                      - listitem [ref=e558]:
                        - img "iPod Nano" [ref=e559]
                  - generic [ref=e560]:
                    - button "" [ref=e561] [cursor=pointer]
                    - button "" [ref=e563] [cursor=pointer]
                    - button "" [ref=e565] [cursor=pointer]
                    - button "" [ref=e567] [cursor=pointer]
                - generic [ref=e569]:
                  - heading [level=4] [ref=e570]:
                    - link "iPod Nano" [ref=e571] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=36
                  - generic [ref=e572]: $122.00
              - generic [ref=e574]:
                - generic [ref=e575]:
                  - link [ref=e577] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=40
                    - img "iPhone" [ref=e580]
                    - list [ref=e581]:
                      - listitem [ref=e582]:
                        - img "iPhone" [ref=e583]
                      - listitem [ref=e584]:
                        - img "iPhone" [ref=e585]
                      - listitem [ref=e586]:
                        - img "iPhone" [ref=e587]
                  - generic [ref=e588]:
                    - button "" [ref=e589] [cursor=pointer]
                    - button "" [ref=e591] [cursor=pointer]
                    - button "" [ref=e593] [cursor=pointer]
                    - button "" [ref=e595] [cursor=pointer]
                - generic [ref=e597]:
                  - heading [level=4] [ref=e598]:
                    - link "iPhone" [ref=e599] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=40
                  - generic [ref=e600]: $123.20
              - generic [ref=e602]:
                - generic [ref=e603]:
                  - link [ref=e605] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=41
                    - img "iMac" [ref=e608]
                    - list [ref=e609]:
                      - listitem [ref=e610]:
                        - img "iMac" [ref=e611]
                      - listitem [ref=e612]:
                        - img "iMac" [ref=e613]
                      - listitem [ref=e614]:
                        - img "iMac" [ref=e615]
                  - generic [ref=e616]:
                    - button "" [ref=e617] [cursor=pointer]
                    - button "" [ref=e619] [cursor=pointer]
                    - button "" [ref=e621] [cursor=pointer]
                    - button "" [ref=e623] [cursor=pointer]
                - generic [ref=e625]:
                  - heading [level=4] [ref=e626]:
                    - link "iMac" [ref=e627] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=41
                  - generic [ref=e628]: $170.00
              - generic [ref=e630]:
                - generic [ref=e631]:
                  - link [ref=e633] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=42
                    - img "Apple Cinema 30&quot;" [ref=e636]
                    - list [ref=e637]:
                      - listitem [ref=e638]:
                        - img "Apple Cinema 30&quot;" [ref=e639]
                      - listitem [ref=e640]:
                        - img "Apple Cinema 30&quot;" [ref=e641]
                  - generic [ref=e642]:
                    - button "" [ref=e643] [cursor=pointer]
                    - button "" [ref=e645] [cursor=pointer]
                    - button "" [ref=e647] [cursor=pointer]
                    - button "" [ref=e649] [cursor=pointer]
                - generic [ref=e651]:
                  - heading [level=4] [ref=e652]:
                    - link "Apple Cinema 30\"" [ref=e653] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=42
                  - generic [ref=e654]: $122.00
              - generic [ref=e656]:
                - generic [ref=e657]:
                  - link [ref=e659] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=43
                    - img "MacBook" [ref=e662]
                    - list [ref=e663]:
                      - listitem [ref=e664]:
                        - img "MacBook" [ref=e665]
                      - listitem [ref=e666]:
                        - img "MacBook" [ref=e667]
                      - listitem [ref=e668]:
                        - img "MacBook" [ref=e669]
                  - generic [ref=e670]:
                    - button "" [ref=e671] [cursor=pointer]
                    - button "" [ref=e673] [cursor=pointer]
                    - button "" [ref=e675] [cursor=pointer]
                    - button "" [ref=e677] [cursor=pointer]
                - generic [ref=e679]:
                  - heading [level=4] [ref=e680]:
                    - link "MacBook" [ref=e681] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=43
                  - generic [ref=e682]: $602.00
              - generic [ref=e684]:
                - generic [ref=e685]:
                  - link [ref=e687] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=44
                    - img "MacBook Air" [ref=e690]
                    - list [ref=e691]:
                      - listitem [ref=e692]:
                        - img "MacBook Air" [ref=e693]
                      - listitem [ref=e694]:
                        - img "MacBook Air" [ref=e695]
                      - listitem [ref=e696]:
                        - img "MacBook Air" [ref=e697]
                  - generic [ref=e698]:
                    - button "" [ref=e699] [cursor=pointer]
                    - button "" [ref=e701] [cursor=pointer]
                    - button "" [ref=e703] [cursor=pointer]
                    - button "" [ref=e705] [cursor=pointer]
                - generic [ref=e707]:
                  - heading [level=4] [ref=e708]:
                    - link "MacBook Air" [ref=e709] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=44
                  - generic [ref=e710]: $1,202.00
              - generic [ref=e712]:
                - generic [ref=e713]:
                  - link [ref=e715] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=45
                    - img "MacBook Pro" [ref=e718]
                    - list [ref=e719]:
                      - listitem [ref=e720]:
                        - img "MacBook Pro" [ref=e721]
                      - listitem [ref=e722]:
                        - img "MacBook Pro" [ref=e723]
                      - listitem [ref=e724]:
                        - img "MacBook Pro" [ref=e725]
                  - generic [ref=e726]:
                    - button "" [ref=e727] [cursor=pointer]
                    - button "" [ref=e729] [cursor=pointer]
                    - button "" [ref=e731] [cursor=pointer]
                    - button "" [ref=e733] [cursor=pointer]
                - generic [ref=e735]:
                  - heading [level=4] [ref=e736]:
                    - link "MacBook Pro" [ref=e737] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=45
                  - generic [ref=e738]: $2,000.00
              - generic [ref=e740]:
                - generic [ref=e741]:
                  - link [ref=e743] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=48
                    - img "iPod Classic" [ref=e746]
                    - list [ref=e747]:
                      - listitem [ref=e748]:
                        - img "iPod Classic" [ref=e749]
                      - listitem [ref=e750]:
                        - img "iPod Classic" [ref=e751]
                      - listitem [ref=e752]:
                        - img "iPod Classic" [ref=e753]
                  - generic [ref=e754]:
                    - button "" [ref=e755] [cursor=pointer]
                    - button "" [ref=e757] [cursor=pointer]
                    - button "" [ref=e759] [cursor=pointer]
                    - button "" [ref=e761] [cursor=pointer]
                - generic [ref=e763]:
                  - heading [level=4] [ref=e764]:
                    - link "iPod Classic" [ref=e765] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=48
                  - generic [ref=e766]: $122.00
              - generic [ref=e768]:
                - generic [ref=e769]:
                  - link [ref=e771] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=50
                    - img "Apple Cinema 30&quot;" [ref=e774]
                    - list [ref=e775]:
                      - listitem [ref=e776]:
                        - img "Apple Cinema 30&quot;" [ref=e777]
                      - listitem [ref=e778]:
                        - img "Apple Cinema 30&quot;" [ref=e779]
                      - listitem [ref=e780]:
                        - img "Apple Cinema 30&quot;" [ref=e781]
                  - generic [ref=e782]:
                    - button "" [ref=e783] [cursor=pointer]
                    - button "" [ref=e785] [cursor=pointer]
                    - button "" [ref=e787] [cursor=pointer]
                    - button "" [ref=e789] [cursor=pointer]
                - generic [ref=e791]:
                  - heading [level=4] [ref=e792]:
                    - link "Apple Cinema 30\"" [ref=e793] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=50
                  - generic [ref=e794]: $122.00
              - generic [ref=e796]:
                - generic [ref=e797]:
                  - link [ref=e799] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=54
                    - img "iMac" [ref=e802]
                    - list [ref=e803]:
                      - listitem [ref=e804]:
                        - img "iMac" [ref=e805]
                      - listitem [ref=e806]:
                        - img "iMac" [ref=e807]
                      - listitem [ref=e808]:
                        - img "iMac" [ref=e809]
                  - generic [ref=e810]:
                    - button "" [ref=e811] [cursor=pointer]
                    - button "" [ref=e813] [cursor=pointer]
                    - button "" [ref=e815] [cursor=pointer]
                    - button "" [ref=e817] [cursor=pointer]
                - generic [ref=e819]:
                  - heading [level=4] [ref=e820]:
                    - link "iMac" [ref=e821] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=54
                  - generic [ref=e822]: $170.00
              - generic [ref=e824]:
                - generic [ref=e825]:
                  - link [ref=e827] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=55
                    - img "iPhone" [ref=e830]
                    - list [ref=e831]:
                      - listitem [ref=e832]:
                        - img "iPhone" [ref=e833]
                      - listitem [ref=e834]:
                        - img "iPhone" [ref=e835]
                      - listitem [ref=e836]:
                        - img "iPhone" [ref=e837]
                  - generic [ref=e838]:
                    - button "" [ref=e839] [cursor=pointer]
                    - button "" [ref=e841] [cursor=pointer]
                    - button "" [ref=e843] [cursor=pointer]
                    - button "" [ref=e845] [cursor=pointer]
                - generic [ref=e847]:
                  - heading [level=4] [ref=e848]:
                    - link "iPhone" [ref=e849] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=55
                  - generic [ref=e850]: $123.20
              - generic [ref=e852]:
                - generic [ref=e853]:
                  - link [ref=e855] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=56
                    - img "iPod Classic" [ref=e858]
                    - list [ref=e859]:
                      - listitem [ref=e860]:
                        - img "iPod Classic" [ref=e861]
                      - listitem [ref=e862]:
                        - img "iPod Classic" [ref=e863]
                      - listitem [ref=e864]:
                        - img "iPod Classic" [ref=e865]
                  - generic [ref=e866]:
                    - button "" [ref=e867] [cursor=pointer]
                    - button "" [ref=e869] [cursor=pointer]
                    - button "" [ref=e871] [cursor=pointer]
                    - button "" [ref=e873] [cursor=pointer]
                - generic [ref=e875]:
                  - heading [level=4] [ref=e876]:
                    - link "iPod Classic" [ref=e877] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=56
                  - generic [ref=e878]: $122.00
              - generic [ref=e880]:
                - generic [ref=e881]:
                  - link [ref=e883] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=57
                    - img "iPod Nano" [ref=e886]
                    - list [ref=e887]:
                      - listitem [ref=e888]:
                        - img "iPod Nano" [ref=e889]
                      - listitem [ref=e890]:
                        - img "iPod Nano" [ref=e891]
                      - listitem [ref=e892]:
                        - img "iPod Nano" [ref=e893]
                  - generic [ref=e894]:
                    - button "" [ref=e895] [cursor=pointer]
                    - button "" [ref=e897] [cursor=pointer]
                    - button "" [ref=e899] [cursor=pointer]
                    - button "" [ref=e901] [cursor=pointer]
                - generic [ref=e903]:
                  - heading [level=4] [ref=e904]:
                    - link "iPod Nano" [ref=e905] [cursor=pointer]:
                      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&manufacturer_id=8&product_id=57
                  - generic [ref=e906]: $122.00
            - generic [ref=e908]:
              - list [ref=e910]:
                - listitem [ref=e911]:
                  - generic [ref=e912]: "1"
                - listitem [ref=e913]:
                  - link "2" [ref=e914] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8&page=2
                - listitem [ref=e915]:
                  - link "3" [ref=e916] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8&page=3
                - listitem [ref=e917]:
                  - link ">" [ref=e918] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8&page=2
                - listitem [ref=e919]:
                  - link ">|" [ref=e920] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8&page=3
              - generic [ref=e921]: Showing 1 to 15 of 42 (3 Pages)
          - generic [ref=e922]:
            - generic [ref=e924]:
              - generic [ref=e925] [cursor=pointer]:
                - heading "Filter" [level=3] [ref=e926]
                - text: 
                - generic [ref=e927]: 
              - generic [ref=e928]:
                - generic [ref=e929]:
                  - generic [ref=e930] [cursor=pointer]:
                    - text: Price 
                    - generic [ref=e931]: 
                  - generic [ref=e934]:
                    - spinbutton "Minimum Price" [ref=e935]: "122"
                    - generic [ref=e936]: to
                    - spinbutton "Maximum Price" [ref=e937]: "2000"
                - generic [ref=e938]:
                  - generic [ref=e939] [cursor=pointer]:
                    - text: Search 
                    - generic [ref=e940]: 
                  - textbox "Search" [ref=e943]
                - generic [ref=e944]:
                  - generic [ref=e945] [cursor=pointer]:
                    - text: Color 
                    - generic [ref=e946]: 
                  - generic [ref=e948]:
                    - generic "Blue" [ref=e951] [cursor=pointer]:
                      - img "Blue" [ref=e952]
                    - generic "Green" [ref=e955] [cursor=pointer]:
                      - img "Green" [ref=e956]
                    - generic "Orange" [ref=e959] [cursor=pointer]:
                      - img "Orange" [ref=e960]
                    - generic "Pink" [ref=e963] [cursor=pointer]:
                      - img "Pink" [ref=e964]
                    - generic "Red" [ref=e967] [cursor=pointer]:
                      - img "Red" [ref=e968]
                - generic [ref=e969]:
                  - generic [ref=e970] [cursor=pointer]:
                    - text: Availability 
                    - generic [ref=e971]: 
                  - generic [ref=e973]:
                    - generic [ref=e974]:
                      - generic [ref=e975]:
                        - checkbox "In stock" [ref=e976]
                        - generic [ref=e977] [cursor=pointer]: In stock
                      - generic [ref=e978]: "39"
                    - generic [ref=e979]:
                      - generic [ref=e980]:
                        - checkbox "Out Of Stock" [ref=e981]
                        - generic [ref=e982] [cursor=pointer]: Out Of Stock
                      - generic [ref=e983]: "3"
                - generic [ref=e984]:
                  - generic [ref=e985] [cursor=pointer]:
                    - text: Size 
                    - generic [ref=e986]: 
                  - generic [ref=e988]:
                    - generic [ref=e989]: L
                    - generic [ref=e992]: M
                    - generic [ref=e995]: S
                    - generic [ref=e998]: XL
                    - generic [ref=e1001]: XXL
                - generic [ref=e1004]:
                  - generic [ref=e1005] [cursor=pointer]:
                    - text: Discount 
                    - generic [ref=e1006]: 
                  - generic [ref=e1008]:
                    - generic [ref=e1009]:
                      - generic [ref=e1010]:
                        - radio "10% off or more" [disabled] [ref=e1011]
                        - generic [ref=e1012] [cursor=pointer]: 10% off or more
                      - generic [ref=e1013]: "0"
                    - generic [ref=e1014]:
                      - generic [ref=e1015]:
                        - radio "20% off or more" [disabled] [ref=e1016]
                        - generic [ref=e1017] [cursor=pointer]: 20% off or more
                      - generic [ref=e1018]: "0"
                    - generic [ref=e1019]:
                      - generic [ref=e1020]:
                        - radio "30% off or more" [disabled] [ref=e1021]
                        - generic [ref=e1022] [cursor=pointer]: 30% off or more
                      - generic [ref=e1023]: "0"
                    - generic [ref=e1024]:
                      - generic [ref=e1025]:
                        - radio "40% off or more" [disabled] [ref=e1026]
                        - generic [ref=e1027] [cursor=pointer]: 40% off or more
                      - generic [ref=e1028]: "0"
                    - generic [ref=e1029]:
                      - generic [ref=e1030]:
                        - radio "50% off or more" [disabled] [ref=e1031]
                        - generic [ref=e1032] [cursor=pointer]: 50% off or more
                      - generic [ref=e1033]: "0"
                - generic [ref=e1034]:
                  - generic [ref=e1035] [cursor=pointer]:
                    - text: Rating 
                    - generic [ref=e1036]: 
                  - generic [ref=e1038]:
                    - generic [ref=e1039]:
                      - generic [ref=e1040]:
                        - radio "     & up" [disabled] [ref=e1041]
                        - generic [ref=e1042] [cursor=pointer]:
                          - generic [ref=e1043]:
                            - generic [ref=e1044]: 
                            - generic [ref=e1045]: 
                            - generic [ref=e1046]: 
                            - generic [ref=e1047]: 
                            - generic [ref=e1048]: 
                          - text: "& up"
                      - generic [ref=e1049]: "0"
                    - generic [ref=e1050]:
                      - generic [ref=e1051]:
                        - radio "     & up" [disabled] [ref=e1052]
                        - generic [ref=e1053] [cursor=pointer]:
                          - generic [ref=e1054]:
                            - generic [ref=e1055]: 
                            - generic [ref=e1056]: 
                            - generic [ref=e1057]: 
                            - generic [ref=e1058]: 
                            - generic [ref=e1059]: 
                          - text: "& up"
                      - generic [ref=e1060]: "0"
                    - generic [ref=e1061]:
                      - generic [ref=e1062]:
                        - radio "     & up" [disabled] [ref=e1063]
                        - generic [ref=e1064] [cursor=pointer]:
                          - generic [ref=e1065]:
                            - generic [ref=e1066]: 
                            - generic [ref=e1067]: 
                            - generic [ref=e1068]: 
                            - generic [ref=e1069]: 
                            - generic [ref=e1070]: 
                          - text: "& up"
                      - generic [ref=e1071]: "0"
                    - generic [ref=e1072]:
                      - generic [ref=e1073]:
                        - radio "     & up" [disabled] [ref=e1074]
                        - generic [ref=e1075] [cursor=pointer]:
                          - generic [ref=e1076]:
                            - generic [ref=e1077]: 
                            - generic [ref=e1078]: 
                            - generic [ref=e1079]: 
                            - generic [ref=e1080]: 
                            - generic [ref=e1081]: 
                          - text: "& up"
                      - generic [ref=e1082]: "0"
            - generic [ref=e1084]:
              - link "Desktops (75)" [ref=e1085] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=20
              - link "Laptops (75)" [ref=e1086] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
              - link "Components (75)" [ref=e1087] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
              - link "Tablets (75)" [ref=e1088] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
              - link "Software (75)" [ref=e1089] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
              - link "Phones & PDAs (75)" [ref=e1090] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=24
              - link "Cameras (75)" [ref=e1091] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
              - link "MP3 Players (75)" [ref=e1092] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
      - contentinfo [ref=e1093]:
        - paragraph [ref=e1099]: © LambdaTest - Powered by OpenCart
  - text:  
```

# Test source

```ts
  1   | import { URL_PATTERNS } from '../../constants/URLs';
  2   | import { TAGS } from '../../constants/Tags';
  3   | import { expect, test } from '../../fixtures/testFixtures';
  4   | 
  5   | test.describe('Navigation', () => {
  6   |   test(
  7   |     'TC_NAV_001_Category_Page_Shows_Breadcrumbs',
  8   |     { tag: [TAGS.functional, TAGS.navigation, TAGS.product, TAGS.regression] },
  9   |     async ({ categoryPage, data }) => {
  10  |       const category = data.category('laptops');
  11  | 
  12  |       // 1. Open the laptops category
  13  |       await categoryPage.open(category.path);
  14  | 
  15  |       // 2. Verify the breadcrumb reflects the path
  16  |       await expect(categoryPage.breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
  17  |       await expect(categoryPage.breadcrumb.getByText('Laptops')).toBeVisible();
  18  |     },
  19  |   );
  20  | 
  21  |   test(
  22  |     'TC_NAV_002_Manufacturer_Page_Lists_Brand_Products',
  23  |     { tag: [TAGS.functional, TAGS.navigation, TAGS.product] },
  24  |     async ({ page, data }) => {
  25  |       const manufacturer = data.manufacturer('apple');
  26  | 
  27  |       // 1. Open the Apple manufacturer page
> 28  |       await page.goto(`/index.php?route=product/manufacturer/info&manufacturer_id=${manufacturer.id}`);
      |                  ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  29  | 
  30  |       // 2. Verify the brand heading is displayed
  31  |       await expect(page.getByRole('heading', { name: manufacturer.name, exact: true })).toBeVisible();
  32  |     },
  33  |   );
  34  | 
  35  |   test(
  36  |     'TC_NAV_003_Static_Information_Page_Renders',
  37  |     { tag: [TAGS.functional, TAGS.navigation] },
  38  |     async ({ page }) => {
  39  |       // 1. Open the About Us information page
  40  |       await page.goto('/index.php?route=information/information&information_id=4');
  41  | 
  42  |       // 2. Verify the page title and heading
  43  |       await expect(page).toHaveTitle(/About Us/);
  44  |       await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  45  |     },
  46  |   );
  47  | 
  48  |   test(
  49  |     'TC_NAV_004_Blog_Home_Page_Renders',
  50  |     { tag: [TAGS.functional, TAGS.navigation] },
  51  |     async ({ page }) => {
  52  |       // 1. Open the blog home page
  53  |       await page.goto('/index.php?route=extension/maza/blog/home');
  54  | 
  55  |       // 2. Verify the blog page title
  56  |       await expect(page).toHaveTitle(/Blog/);
  57  |     },
  58  |   );
  59  | 
  60  |   test(
  61  |     'TC_NAV_005_Special_Offers_Open_From_Header',
  62  |     { tag: [TAGS.functional, TAGS.navigation, TAGS.regression] },
  63  |     async ({ homePage, page }) => {
  64  |       // 1. Click the Special Hot link from the home page
  65  |       await homePage.open();
  66  |       await homePage.navigation.openSpecialOffers();
  67  | 
  68  |       // 2. Verify the Special Offers page is displayed
  69  |       await expect(page).toHaveURL(/route=product\/special/);
  70  |       await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
  71  |     },
  72  |   );
  73  | 
  74  |   test(
  75  |     'TC_NAV_006_My_Account_Opens_Login_When_Logged_Out',
  76  |     { tag: [TAGS.functional, TAGS.navigation, TAGS.authentication] },
  77  |     async ({ homePage, page }) => {
  78  |       // 1. Click the header "My account" control while logged out
  79  |       await homePage.open();
  80  |       await homePage.header.openMyAccount();
  81  | 
  82  |       // 2. Verify the login page is shown
  83  |       await expect(page).toHaveURL(URL_PATTERNS.login);
  84  |     },
  85  |   );
  86  | 
  87  |   test(
  88  |     'TC_NAV_007_Unknown_Route_Shows_Page_Not_Found',
  89  |     { tag: [TAGS.functional, TAGS.navigation, TAGS.negative] },
  90  |     async ({ page }) => {
  91  |       // 1. Open a non-existent route
  92  |       await page.goto('/index.php?route=information/tracking&order_id=999999&email=x@y.com');
  93  | 
  94  |       // 2. Verify the not-found page is displayed
  95  |       await expect(
  96  |         page.getByRole('heading', { name: 'The page you requested cannot be found!' }),
  97  |       ).toBeVisible();
  98  |     },
  99  |   );
  100 | });
  101 | 
```
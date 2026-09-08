# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: authentication/login.spec.ts >> Authentication — Login >> TC_LOGIN_005_Forgotten_Password_Link_Is_Available
- Location: tests/authentication/login.spec.ts:73:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Forgotten Password' }) resolved to 2 elements:
    1) <a href="https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten">Forgotten Password</a> aka getByRole('link', { name: 'Forgotten Password', exact: true })
    2) <a class="list-group-item" href="https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten">…</a> aka getByRole('link', { name: ' Forgotten Password' })

Call log:
  - waiting for getByRole('link', { name: 'Forgotten Password' })

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
        - generic: 
        - generic [ref=e198]:
          - text: 
          - generic [ref=e199] [cursor=pointer]:
            - button "Shop by Category" [ref=e201]
            - figure [ref=e206]:
              - link [ref=e207]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
                - img "Poco Theme" [ref=e208]
            - button "" [ref=e210]
            - button "0" [ref=e213]
        - generic [ref=e219]:
          - text: 
          - generic [ref=e224]:
            - generic [ref=e226]:
              - button "All Categories" [ref=e228] [cursor=pointer]
              - textbox "Search For Products" [ref=e230]
            - button "" [ref=e232] [cursor=pointer]
          - generic [ref=e236]:
            - strong [ref=e237]: Upto 60% Off
            - text: on Smartbuy Mobile Accessories, Small Appliances, Automotive Accessories & more
            - strong [ref=e238]: SAVE60
      - generic [ref=e239]:
        - navigation "breadcrumb" [ref=e240]:
          - list [ref=e241]:
            - listitem [ref=e242]:
              - link "" [ref=e243] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
            - listitem [ref=e245]:
              - text: /
              - link "Account" [ref=e246] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
            - listitem [ref=e247]: / Login
        - generic [ref=e248]:
          - generic [ref=e250]:
            - generic [ref=e253]:
              - heading "New Customer" [level=2] [ref=e254]
              - paragraph [ref=e255]:
                - strong [ref=e256]: Register Account
              - paragraph [ref=e257]: By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
              - link "Continue" [ref=e258] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/register
            - generic [ref=e261]:
              - heading "Returning Customer" [level=2] [ref=e262]
              - paragraph [ref=e263]:
                - strong [ref=e264]: I am a returning customer
              - generic [ref=e265]:
                - generic [ref=e266]:
                  - generic [ref=e267]: E-Mail Address
                  - textbox "E-Mail Address" [ref=e268]
                - generic [ref=e269]:
                  - generic [ref=e270]: Password
                  - textbox "Password" [ref=e271]
                  - link "Forgotten Password" [ref=e272] [cursor=pointer]:
                    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten
                - button "Login" [ref=e273] [cursor=pointer]
          - complementary [ref=e274]:
            - generic [ref=e275]:
              - link " Login" [ref=e276] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/login
                - generic [ref=e277]: 
                - text: Login
              - link " Register" [ref=e278] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/register
                - generic [ref=e279]: 
                - text: Register
              - link " Forgotten Password" [ref=e280] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten
                - generic [ref=e281]: 
                - text: Forgotten Password
              - link " My Account" [ref=e282] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
                - generic [ref=e283]: 
                - text: My Account
              - link " Address Book" [ref=e284] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/address
                - generic [ref=e285]: 
                - text: Address Book
              - link " Wish List" [ref=e286] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
                - generic [ref=e287]: 
                - text: Wish List
              - link " Order History" [ref=e288] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/order
                - generic [ref=e289]: 
                - text: Order History
              - link " Downloads" [ref=e290] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/download
                - generic [ref=e291]: 
                - text: Downloads
              - link " Recurring payments" [ref=e292] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/recurring
                - generic [ref=e293]: 
                - text: Recurring payments
              - link " Reward Points" [ref=e294] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/reward
                - generic [ref=e295]: 
                - text: Reward Points
              - link " Returns" [ref=e296] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/return
                - generic [ref=e297]: 
                - text: Returns
              - link " Transactions" [ref=e298] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/transaction
                - generic [ref=e299]: 
                - text: Transactions
              - link " Newsletter" [ref=e300] [cursor=pointer]:
                - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/newsletter
                - generic [ref=e301]: 
                - text: Newsletter
      - contentinfo [ref=e302]:
        - paragraph [ref=e308]: © LambdaTest - Powered by OpenCart
  - text:  
```

# Test source

```ts
  1  | import { MESSAGES } from '../../constants/Messages';
  2  | import { URL_PATTERNS } from '../../constants/URLs';
  3  | import { TAGS } from '../../constants/Tags';
  4  | import { DataUtils } from '../../utils/DataUtils';
  5  | import { expect, test } from '../../fixtures/testFixtures';
  6  | 
  7  | test.describe('Authentication — Login', () => {
  8  |   test(
  9  |     'TC_LOGIN_001_Valid_User_Login',
  10 |     { tag: [TAGS.authentication, TAGS.smoke, TAGS.regression] },
  11 |     async ({ loginPage, accountPage, page, data }) => {
  12 |       test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
  13 |       const { email, password } = data.registeredCredentials();
  14 | 
  15 |       // 1. Open the login page
  16 |       await loginPage.open();
  17 | 
  18 |       // 2. Log in with valid credentials
  19 |       await loginPage.login(email, password);
  20 | 
  21 |       // 3. Verify the account dashboard is displayed
  22 |       await expect(page).toHaveURL(URL_PATTERNS.account);
  23 |       await expect(accountPage.heading).toBeVisible();
  24 |     },
  25 |   );
  26 | 
  27 |   test(
  28 |     'TC_LOGIN_002_Empty_Credentials_Show_Warning',
  29 |     { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
  30 |     async ({ loginPage }) => {
  31 |       // 1. Open the login page and submit without entering anything
  32 |       await loginPage.open();
  33 |       await loginPage.submit();
  34 | 
  35 |       // 2. Verify a warning alert is displayed
  36 |       await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
  37 |     },
  38 |   );
  39 | 
  40 |   test(
  41 |     'TC_LOGIN_003_Unregistered_Email_Shows_Warning',
  42 |     { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
  43 |     async ({ loginPage, data }) => {
  44 |       const { email, password } = data.invalidCredentials().unregistered;
  45 | 
  46 |       // 1. Attempt login with an unregistered email
  47 |       await loginPage.open();
  48 |       await loginPage.login(email, password);
  49 | 
  50 |       // 2. Verify the no-match warning and that we stay on login
  51 |       await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
  52 |       await expect(loginPage.loginButton).toBeVisible();
  53 |     },
  54 |   );
  55 | 
  56 |   test(
  57 |     'TC_LOGIN_004_Wrong_Password_Shows_Warning',
  58 |     { tag: [TAGS.authentication, TAGS.negative, TAGS.regression] },
  59 |     async ({ loginPage, data }) => {
  60 |       test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
  61 |       const { email } = data.registeredCredentials();
  62 |       const { password } = data.invalidCredentials().wrongPassword;
  63 | 
  64 |       // 1. Attempt login with a valid email but wrong password
  65 |       await loginPage.open();
  66 |       await loginPage.login(email, password);
  67 | 
  68 |       // 2. Verify the no-match warning is shown
  69 |       await expect(loginPage.alerts.danger).toContainText(MESSAGES.login.genericWarning);
  70 |     },
  71 |   );
  72 | 
  73 |   test(
  74 |     'TC_LOGIN_005_Forgotten_Password_Link_Is_Available',
  75 |     { tag: [TAGS.authentication, TAGS.functional] },
  76 |     async ({ loginPage, page }) => {
  77 |       // 1. Open the login page
  78 |       await loginPage.open();
  79 | 
  80 |       // 2. Follow the Forgotten Password link
> 81 |       await loginPage.forgottenPasswordLink.click();
     |                                             ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Forgotten Password' }) resolved to 2 elements:
  82 | 
  83 |       // 3. Verify the password-reset request page is displayed
  84 |       await expect(page).toHaveURL(/route=account\/forgotten/);
  85 |     },
  86 |   );
  87 | });
  88 | 
```
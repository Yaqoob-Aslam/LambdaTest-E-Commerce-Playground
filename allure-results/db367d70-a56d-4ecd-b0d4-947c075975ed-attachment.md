# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/smoke.spec.ts >> Smoke — Critical Paths >> SMOKE-002_User_Can_Search_For_A_Product
- Location: tests/smoke/smoke.spec.ts:25:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Search - iMac' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Search - iMac' })
  - Test timeout of 30000ms exceeded.

```

# Test source

```ts
  1   | import { URL_PATTERNS } from '../../constants';
  2   | import { TAGS } from '../../constants/Tags';
  3   | import { expect, test } from '../../fixtures/testFixtures';
  4   | 
  5   | /**
  6   |  * Smoke suite — the critical paths a release must satisfy.
  7   |  * Mapped from master test plan §5.
  8   |  * Run with: npx playwright test --grep @smoke
  9   |  */
  10  | test.describe('Smoke — Critical Paths', () => {
  11  |   test(
  12  |     'SMOKE-001_Application_Loads_And_Home_Renders',
  13  |     { tag: [TAGS.smoke, TAGS.regression, TAGS.navigation] },
  14  |     async ({ homePage }) => {
  15  |       // 1. Open the application
  16  |       await homePage.open();
  17  | 
  18  |       // 2. Verify the core chrome is present
  19  |       await expect(homePage.header.logo).toBeVisible();
  20  |       await expect(homePage.header.searchInput).toBeVisible();
  21  |       await expect(homePage.footer.copyright).toBeVisible();
  22  |     },
  23  |   );
  24  | 
  25  |   test(
  26  |     'SMOKE-002_User_Can_Search_For_A_Product',
  27  |     { tag: [TAGS.smoke, TAGS.search, TAGS.regression] },
  28  |     async ({ homePage, searchPage, data }) => {
  29  |       const { exact } = data.searchTerms();
  30  | 
  31  |       // 1. Search for a known product from the home page
  32  |       await homePage.open();
  33  |       await homePage.searchFor(exact);
  34  | 
  35  |       // 2. Verify the results heading names the search term
> 36  |       await expect(searchPage.resultsHeading(exact)).toBeVisible();
      |                                                      ^ Error: expect(locator).toBeVisible() failed
  37  |     },
  38  |   );
  39  | 
  40  |   test(
  41  |     'SMOKE-003_User_Can_Open_A_Product_Detail_Page',
  42  |     { tag: [TAGS.smoke, TAGS.product, TAGS.regression] },
  43  |     async ({ productDetailsPage, data }) => {
  44  |       const product = data.product('iMac');
  45  | 
  46  |       // 1. Open the product detail page directly
  47  |       await productDetailsPage.open(product.id);
  48  | 
  49  |       // 2. Verify product identity and purchase controls
  50  |       await expect(productDetailsPage.nameHeading).toHaveText(product.name);
  51  |       await expect(productDetailsPage.addToCartButton).toBeVisible();
  52  |       await expect(productDetailsPage.descriptionTab).toBeVisible();
  53  |     },
  54  |   );
  55  | 
  56  |   test(
  57  |     'SMOKE-004_User_Can_Add_A_Product_To_Cart',
  58  |     { tag: [TAGS.smoke, TAGS.cart, TAGS.regression] },
  59  |     async ({ productDetailsPage, cartPage, data }) => {
  60  |       const product = data.product('iMac');
  61  | 
  62  |       // 1. Add the product to the cart
  63  |       await productDetailsPage.open(product.id);
  64  |       await productDetailsPage.addToCart();
  65  | 
  66  |       // 2. Verify it appears in the cart
  67  |       await cartPage.open();
  68  |       await expect(cartPage.product(product.name)).toBeVisible();
  69  |     },
  70  |   );
  71  | 
  72  |   test(
  73  |     'SMOKE-005_User_Can_Open_The_Cart',
  74  |     { tag: [TAGS.smoke, TAGS.cart, TAGS.regression] },
  75  |     async ({ cartPage }) => {
  76  |       // 1. Open the cart page with an empty session
  77  |       await cartPage.open();
  78  | 
  79  |       // 2. Verify the empty-cart state is rendered
  80  |       await expect(cartPage.emptyMessage).toBeVisible();
  81  |     },
  82  |   );
  83  | 
  84  |   test(
  85  |     'SMOKE-006_User_Can_Reach_Checkout',
  86  |     { tag: [TAGS.smoke, TAGS.checkout, TAGS.regression] },
  87  |     async ({ productDetailsPage, checkoutPage, data, page }) => {
  88  |       const product = data.product('iMac');
  89  | 
  90  |       // 1. Seed the cart
  91  |       await productDetailsPage.open(product.id);
  92  |       await productDetailsPage.addToCart();
  93  | 
  94  |       // 2. Open checkout
  95  |       await checkoutPage.open();
  96  | 
  97  |       // 3. Verify checkout (not the cart) is displayed with billing fields
  98  |       await expect(page).toHaveURL(URL_PATTERNS.checkout);
  99  |       await expect(checkoutPage.firstNameInput).toBeVisible();
  100 |     },
  101 |   );
  102 | 
  103 |   test(
  104 |     'SMOKE-007_Guest_Is_Asked_To_Login_For_Protected_Page',
  105 |     { tag: [TAGS.smoke, TAGS.authentication, TAGS.regression] },
  106 |     async ({ accountPage, page }) => {
  107 |       // 1. Request a protected page while logged out
  108 |       await accountPage.open();
  109 | 
  110 |       // 2. Verify the user is redirected to login
  111 |       await expect(page).toHaveURL(URL_PATTERNS.login);
  112 |     },
  113 |   );
  114 | 
  115 |   test(
  116 |     'SMOKE-008_Special_Offers_Page_Opens_From_Navigation',
  117 |     { tag: [TAGS.smoke, TAGS.navigation, TAGS.regression] },
  118 |     async ({ homePage, page }) => {
  119 |       // 1. Open the home page and click the Special Offers link
  120 |       await homePage.open();
  121 |       await homePage.navigation.openSpecialOffers();
  122 | 
  123 |       // 2. Verify the Special Offers heading is displayed
  124 |       await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
  125 |     },
  126 |   );
  127 | });
  128 | 
```
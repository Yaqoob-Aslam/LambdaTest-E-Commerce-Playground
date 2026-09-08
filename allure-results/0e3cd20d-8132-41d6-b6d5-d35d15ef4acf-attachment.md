# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation/navigation.spec.ts >> Navigation >> TC_NAV_003_Static_Information_Page_Renders
- Location: tests/navigation/navigation.spec.ts:35:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=information/information&information_id=4", waiting until "load"

```

# Test source

```ts
  1  | import { URL_PATTERNS } from '../../constants/URLs';
  2  | import { TAGS } from '../../constants/Tags';
  3  | import { expect, test } from '../../fixtures/testFixtures';
  4  | 
  5  | test.describe('Navigation', () => {
  6  |   test(
  7  |     'TC_NAV_001_Category_Page_Shows_Breadcrumbs',
  8  |     { tag: [TAGS.functional, TAGS.navigation, TAGS.product, TAGS.regression] },
  9  |     async ({ categoryPage, data }) => {
  10 |       const category = data.category('laptops');
  11 | 
  12 |       // 1. Open the laptops category
  13 |       await categoryPage.open(category.path);
  14 | 
  15 |       // 2. Verify the breadcrumb reflects the path
  16 |       await expect(categoryPage.breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
  17 |       await expect(categoryPage.breadcrumb.getByText('Laptops')).toBeVisible();
  18 |     },
  19 |   );
  20 | 
  21 |   test(
  22 |     'TC_NAV_002_Manufacturer_Page_Lists_Brand_Products',
  23 |     { tag: [TAGS.functional, TAGS.navigation, TAGS.product] },
  24 |     async ({ page, data }) => {
  25 |       const manufacturer = data.manufacturer('apple');
  26 | 
  27 |       // 1. Open the Apple manufacturer page
  28 |       await page.goto(`/index.php?route=product/manufacturer/info&manufacturer_id=${manufacturer.id}`);
  29 | 
  30 |       // 2. Verify the brand heading is displayed
  31 |       await expect(page.getByRole('heading', { name: manufacturer.name, exact: true })).toBeVisible();
  32 |     },
  33 |   );
  34 | 
  35 |   test(
  36 |     'TC_NAV_003_Static_Information_Page_Renders',
  37 |     { tag: [TAGS.functional, TAGS.navigation] },
  38 |     async ({ page }) => {
  39 |       // 1. Open the About Us information page
> 40 |       await page.goto('/index.php?route=information/information&information_id=4');
     |                  ^ Error: page.goto: WebKit encountered an internal error
  41 | 
  42 |       // 2. Verify the page title and heading
  43 |       await expect(page).toHaveTitle(/About Us/);
  44 |       await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  45 |     },
  46 |   );
  47 | 
  48 |   test(
  49 |     'TC_NAV_004_Blog_Home_Page_Renders',
  50 |     { tag: [TAGS.functional, TAGS.navigation] },
  51 |     async ({ page }) => {
  52 |       // 1. Open the blog home page
  53 |       await page.goto('/index.php?route=extension/maza/blog/home');
  54 | 
  55 |       // 2. Verify the blog page title
  56 |       await expect(page).toHaveTitle(/Blog/);
  57 |     },
  58 |   );
  59 | 
  60 |   test(
  61 |     'TC_NAV_005_Special_Offers_Open_From_Header',
  62 |     { tag: [TAGS.functional, TAGS.navigation, TAGS.regression] },
  63 |     async ({ homePage, page }) => {
  64 |       // 1. Click the Special Hot link from the home page
  65 |       await homePage.open();
  66 |       await homePage.navigation.openSpecialOffers();
  67 | 
  68 |       // 2. Verify the Special Offers page is displayed
  69 |       await expect(page).toHaveURL(/route=product\/special/);
  70 |       await expect(page.getByRole('heading', { name: 'Special Offers' })).toBeVisible();
  71 |     },
  72 |   );
  73 | 
  74 |   test(
  75 |     'TC_NAV_006_My_Account_Opens_Login_When_Logged_Out',
  76 |     { tag: [TAGS.functional, TAGS.navigation, TAGS.authentication] },
  77 |     async ({ homePage, page }) => {
  78 |       // 1. Open the header "My account" menu while logged out
  79 |       await homePage.open();
  80 |       await homePage.header.openMyAccount();
  81 |       await homePage.navigation.myAccountLink.click();
  82 | 
  83 |       // 2. Verify the login page is shown
  84 |       await expect(page).toHaveURL(URL_PATTERNS.login);
  85 |     },
  86 |   );
  87 | });
  88 | 
```
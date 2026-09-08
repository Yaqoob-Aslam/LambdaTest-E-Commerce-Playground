# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/category-listing.spec.ts >> Products — Category Listing >> TC_CATEGORY_002_Open_Product_From_Category_Listing
- Location: tests/products/category-listing.spec.ts:22:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('heading', { level: 1 }).first()
Expected: "HTC Touch HD"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByRole('heading', { level: 1 }).first()

```

# Test source

```ts
  1   | import { SORT_OPTIONS } from '../../constants/TestConstants';
  2   | import { TAGS } from '../../constants/Tags';
  3   | import { expect, test } from '../../fixtures/testFixtures';
  4   | 
  5   | test.describe('Products — Category Listing', () => {
  6   |   test(
  7   |     'TC_CATEGORY_001_Browse_Laptops_And_Notebooks_Category',
  8   |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  9   |     async ({ categoryPage, page, data }) => {
  10  |       const category = data.category('laptops');
  11  | 
  12  |       // 1. Open the Laptops & Notebooks category
  13  |       await categoryPage.open(category.path);
  14  | 
  15  |       // 2. Verify the category heading, a product and its price
  16  |       await expect(page.getByRole('heading', { name: 'Laptops' })).toBeVisible();
  17  |       await expect(categoryPage.productLink('HTC Touch HD')).toBeVisible();
  18  |       await expect(page.getByText('$146.00')).toBeVisible();
  19  |     },
  20  |   );
  21  | 
  22  |   test(
  23  |     'TC_CATEGORY_002_Open_Product_From_Category_Listing',
  24  |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  25  |     async ({ categoryPage, productDetailsPage, data }) => {
  26  |       const category = data.category('laptops');
  27  | 
  28  |       // 1. Open the category
  29  |       await categoryPage.open(category.path);
  30  | 
  31  |       // 2. Open a product from the listing
  32  |       await categoryPage.openProduct('HTC Touch HD');
  33  | 
  34  |       // 3. Verify the product detail page
> 35  |       await expect(productDetailsPage.nameHeading).toHaveText('HTC Touch HD');
      |                                                    ^ Error: expect(locator).toHaveText(expected) failed
  36  |     },
  37  |   );
  38  | 
  39  |   test(
  40  |     'TC_CATEGORY_003_Sort_By_Name_A_To_Z',
  41  |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  42  |     async ({ categoryPage, data }) => {
  43  |       const category = data.category('laptops');
  44  | 
  45  |       // 1. Sort the listing by Name (A - Z)
  46  |       await categoryPage.open(category.path);
  47  |       await categoryPage.sortBy(SORT_OPTIONS.nameAsc);
  48  | 
  49  |       // 2. Verify the alphabetically first product is shown first
  50  |       await expect(categoryPage.productCard(0).name).toHaveText(category.firstByNameAsc);
  51  |     },
  52  |   );
  53  | 
  54  |   test(
  55  |     'TC_CATEGORY_004_Sort_By_Name_Z_To_A',
  56  |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  57  |     async ({ categoryPage, data }) => {
  58  |       const category = data.category('laptops');
  59  | 
  60  |       // 1. Sort the listing by Name (Z - A)
  61  |       await categoryPage.open(category.path);
  62  |       await categoryPage.sortBy(SORT_OPTIONS.nameDesc);
  63  | 
  64  |       // 2. Verify the reverse-alphabetical first product is shown first
  65  |       await expect(categoryPage.productCard(0).name).toHaveText(category.firstByNameDesc);
  66  |     },
  67  |   );
  68  | 
  69  |   test(
  70  |     'TC_CATEGORY_005_Sort_By_Price_Low_To_High',
  71  |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  72  |     async ({ categoryPage, data }) => {
  73  |       const category = data.category('laptops');
  74  | 
  75  |       // 1. Sort the listing by Price (Low > High)
  76  |       await categoryPage.open(category.path);
  77  |       await categoryPage.sortBy(SORT_OPTIONS.priceAsc);
  78  | 
  79  |       // 2. Verify the cheapest product is shown first
  80  |       await expect(categoryPage.productCard(0).name).toHaveText(category.firstByPriceAsc);
  81  |     },
  82  |   );
  83  | 
  84  |   test(
  85  |     'TC_CATEGORY_006_Sort_By_Price_High_To_Low',
  86  |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  87  |     async ({ categoryPage, data }) => {
  88  |       const category = data.category('laptops');
  89  | 
  90  |       // 1. Sort the listing by Price (High > Low)
  91  |       await categoryPage.open(category.path);
  92  |       await categoryPage.sortBy(SORT_OPTIONS.priceDesc);
  93  | 
  94  |       // 2. Verify the most expensive product and its price are shown first
  95  |       await expect(categoryPage.productCard(0).name).toHaveText(category.firstByPriceDesc);
  96  |       await expect(categoryPage.productCard(0).price).toHaveText(category.firstByPriceDescValue);
  97  |     },
  98  |   );
  99  | 
  100 |   test(
  101 |     'TC_CATEGORY_007_Navigate_To_Page_Two_Of_Listing',
  102 |     { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
  103 |     async ({ categoryPage, page, data }) => {
  104 |       const category = data.category('laptops');
  105 | 
  106 |       // 1. Open page two of the category
  107 |       await categoryPage.open(category.path, 2);
  108 | 
  109 |       // 2. Verify the page indicator and the result summary
  110 |       await expect(page).toHaveURL(/page=2/);
  111 |       await expect(page.getByText(category.pageTwoSummary)).toBeVisible();
  112 |     },
  113 |   );
  114 | });
  115 | 
```
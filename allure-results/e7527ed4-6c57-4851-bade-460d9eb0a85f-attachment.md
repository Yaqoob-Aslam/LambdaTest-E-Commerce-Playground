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
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'HTC Touch HD' }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('link', { name: 'HTC Touch HD' }).first()

```

```yaml
- heading "Top categories close" [level=5]:
  - text: Top categories
  - link "close":
    - /url: "#mz-component-1626147655"
    - text: 
- navigation:
  - list:
    - listitem:
      - link "Components":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=25
        - img
        - text: Components
    - listitem:
      - link "Cameras":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33
        - img
        - text: Cameras
    - listitem:
      - link "Phone, Tablets & Ipod":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=57
        - img
        - text: Phone, Tablets & Ipod
    - listitem:
      - link "Software":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
        - img
        - text: Software
    - listitem:
      - link "MP3 Players":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=34
        - img
        - text: MP3 Players
    - listitem:
      - link "Laptops & Notebooks":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18
        - img
        - text: Laptops & Notebooks
    - listitem:
      - link "Desktops and Monitors":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=28
        - img
        - text: Desktops and Monitors
    - listitem:
      - link "Printers & Scanners":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=30
        - img
        - text: Printers & Scanners
    - listitem:
      - link "Mice and Trackballs":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=29
        - img
        - text: Mice and Trackballs
    - listitem:
      - link "Fashion and Accessories":
        - /url: ""
        - img
        - text: Fashion and Accessories
    - listitem:
      - link "Beauty and Saloon":
        - /url: ""
        - img
        - text: Beauty and Saloon
    - listitem:
      - link "Autoparts and Accessories":
        - /url: ""
        - img
        - text: Autoparts and Accessories
    - listitem:
      - link "Washing machine":
        - /url: ""
        - img
        - text: Washing machine
    - listitem:
      - link "Gaming consoles":
        - /url: ""
        - img
        - text: Gaming consoles
    - listitem:
      - link "Air conditioner":
        - /url: ""
        - img
        - text: Air conditioner
    - listitem:
      - link "Web Cameras":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=32
        - img
        - text: Web Cameras
- heading "Quick Links close" [level=5]:
  - text: Quick Links
  - link "close":
    - /url: "#mz-component-162614767"
    - text: 
- navigation:
  - list:
    - listitem:
      - link " Special Hot":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
    - listitem:
      - link " Wishlist":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
    - listitem:
      - link " Compare":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
    - listitem:
      - link " My account":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
    - listitem:
      - link " Blog":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
    - listitem:
      - link " Tracking":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
    - listitem:
      - link " Contact us":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
- separator
- paragraph: Place here any module, widget, design or HTML. for example menu, categories
- heading "Cart close" [level=5]:
  - text: Cart
  - link "close":
    - /url: "#cart-total-drawer"
    - text: 
- table:
  - rowgroup:
    - 'row "iMac iMac Model: Product 14 x1 $170.00"':
      - cell "iMac":
        - link "iMac":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
          - img "iMac"
      - 'cell "iMac Model: Product 14"':
        - link "iMac":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
        - text: "Model: Product 14"
      - cell "x1"
      - cell "$170.00"
- table:
  - rowgroup:
    - 'row "Sub-Total: $140.00"':
      - cell "Sub-Total:"
      - cell "$140.00":
        - strong: $140.00
    - 'row "Eco Tax (-2.00): $2.00"':
      - cell "Eco Tax (-2.00):"
      - cell "$2.00":
        - strong: $2.00
    - 'row "VAT (20%): $28.00"':
      - cell "VAT (20%):"
      - cell "$28.00":
        - strong: $28.00
    - 'row "Total: $170.00"':
      - cell "Total:"
      - cell "$170.00":
        - strong: $170.00
- button " Edit cart"
- button " Checkout"
- banner:
  - button "Shop by Category":
    - img
  - figure:
    - link "Poco Theme":
      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
      - img "Poco Theme"
  - button ""
  - button "1":
    - img
    - text: "1"
  - button "All Categories"
  - textbox "Search For Products"
  - button ""
  - strong: Upto 60% Off
  - text: on Smartbuy Mobile Accessories, Small Appliances, Automotive Accessories & more
  - strong: SAVE60
- navigation "breadcrumb":
  - list:
    - listitem:
      - link "":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
    - listitem: / Shopping Cart
- heading "Shopping Cart (5.00kg)" [level=1]
- table:
  - rowgroup:
    - row "Image Product Name Model Quantity Unit Price Total":
      - columnheader "Image"
      - columnheader "Product Name"
      - columnheader "Model"
      - columnheader "Quantity"
      - columnheader "Unit Price"
      - columnheader "Total"
  - rowgroup:
    - row "iMac iMac Product 14 1   $170.00 $170.00":
      - cell "iMac":
        - link "iMac":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
          - img "iMac"
      - cell "iMac":
        - link "iMac":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=41
      - cell "Product 14"
      - cell "1  ":
        - textbox: "1"
        - button ""
        - button ""
      - cell "$170.00"
      - cell "$170.00"
- heading "What would you like to do next?" [level=4]
- paragraph: Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.
- heading "Use Coupon Code " [level=5]
- heading "Estimate Shipping & Taxes " [level=5]
- heading "Use Gift Certificate " [level=5]
- table:
  - rowgroup:
    - 'row "Sub-Total: $140.00"':
      - cell "Sub-Total:"
      - cell "$140.00":
        - strong: $140.00
    - 'row "Eco Tax (-2.00): $2.00"':
      - cell "Eco Tax (-2.00):"
      - cell "$2.00":
        - strong: $2.00
    - 'row "VAT (20%): $28.00"':
      - cell "VAT (20%):"
      - cell "$28.00":
        - strong: $28.00
    - 'row "Total: $170.00"':
      - cell "Total:"
      - cell "$170.00":
        - strong: $170.00
- link "Continue Shopping":
  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
- link "Checkout":
  - /url: https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout
- contentinfo:
  - paragraph: © LambdaTest - Powered by OpenCart
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
  21 |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart');
  22 | 
  23 |     // 5. Verify both products appear in the cart
> 24 |     await expect(page.getByRole('link', { name: 'HTC Touch HD' }).first()).toBeVisible();
     |                                                                            ^ Error: expect(locator).toBeVisible() failed
  25 |     await expect(page.getByRole('link', { name: 'iMac' }).first()).toBeVisible();
  26 |   });
  27 | });
  28 | 
```
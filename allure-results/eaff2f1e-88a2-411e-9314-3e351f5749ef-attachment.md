# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: open-product-details.spec.ts >> Products >> Open Product Details
- Location: tests/open-product-details.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'iMac' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'iMac' })

```

```yaml
- heading "Top categories close" [level=5]:
  - text: Top categories
  - link "close":
    - /url: "#mz-component-1626147655"
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
- navigation:
  - list:
    - listitem:
      - link "Special Hot":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
    - listitem:
      - link "Wishlist":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
    - listitem:
      - link "Compare":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
    - listitem:
      - link "My account":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/account
    - listitem:
      - link "Blog":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
    - listitem:
      - link "Tracking":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/tracking
    - listitem:
      - link "Contact us":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=information/contact
- separator
- paragraph: Place here any module, widget, design or HTML. for example menu, categories
- heading "Cart close" [level=5]:
  - text: Cart
  - link "close":
    - /url: "#cart-total-drawer"
- paragraph: Your shopping cart is empty!
- table:
  - rowgroup:
    - 'row "Sub-Total: $0.00"':
      - cell "Sub-Total:"
      - cell "$0.00":
        - strong: $0.00
    - 'row "Total: $0.00"':
      - cell "Total:"
      - cell "$0.00":
        - strong: $0.00
- button "Edit cart"
- button "Checkout"
- banner:
  - button
  - figure:
    - link "Poco Electro":
      - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
      - img "Poco Electro"
  - button "All Categories"
  - textbox "Search For Products": iMac
  - button "Search"
  - link "Compare":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/compare
    - img
  - link "Wishlist":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=account/wishlist
    - img
  - button "0":
    - img
    - text: "0"
  - button "Shop by Category":
    - img
    - text: Shop by Category
  - navigation:
    - list:
      - listitem:
        - link "Home":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
      - listitem:
        - link "Special Hot":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/special
      - listitem:
        - link "Blog":
          - /url: https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/home
      - listitem:
        - button "Mega Menu"
      - listitem:
        - button "AddOns Featured"
      - listitem:
        - button "My account"
  - paragraph:
    - strong: This is a dummy website for Web Automation Testing
- figure:
  - link "Apple Cinema 30\"":
    - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=42
    - img "Apple Cinema 30\""
- navigation "breadcrumb":
  - list:
    - listitem:
      - link "Home":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=common/home
    - listitem:
      - text: /
      - link "Software":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=17
    - listitem:
      - text: /
      - link "Search":
        - /url: https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search=iMac
    - listitem: / iMac
- button "Add to Wish List"
- link "iMac":
  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/10-500x500.webp
  - img "iMac"
- link:
  - /url: https://www.youtube.com/embed/wGixQPuG1GY
- link "iMac":
  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/13-500x500.webp
  - img "iMac"
- link "iMac":
  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/15-500x500.webp
  - img "iMac"
- link "iMac":
  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
  - img "iMac"
- link "iMac":
  - /url: https://ecommerce-playground.lambdatest.io/image/cache/catalog/maza/demo/mz_poco/megastore-2/product/7-500x500.webp
  - img "iMac"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Products', () => {
  4  |   test('Open Product Details', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
  6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
  7  | 
  8  |     // 2. Search for "iMac" using the search box
  9  |     await page.getByPlaceholder('Search For Products').first().fill('iMac');
  10 |     await page.getByPlaceholder('Search For Products').first().press('Enter');
  11 | 
  12 |     // 3. Click the first "iMac" product link in the results
  13 |     await page.getByRole('link', { name: 'iMac' }).first().click();
  14 | 
  15 |     // 4. Verify the product name is visible
> 16 |     await expect(page.getByRole('heading', { name: 'iMac' })).toBeVisible();
     |                                                               ^ Error: expect(locator).toBeVisible() failed
  17 | 
  18 |     // 5. Verify the product price is visible
  19 |     await expect(page.locator('h3[data-update="price"]')).toHaveText('$170.00');
  20 | 
  21 |     // 6. Verify the "Add to Cart" button is visible
  22 |     await expect(page.locator('button.button-cart:visible')).toBeVisible();
  23 |   });
  24 | });
  25 | 
```
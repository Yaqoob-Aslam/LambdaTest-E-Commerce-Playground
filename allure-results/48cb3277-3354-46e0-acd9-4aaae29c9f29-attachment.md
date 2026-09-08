# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation >> Category Page Shows Breadcrumbs
- Location: tests/navigation.spec.ts:7:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE = 'https://ecommerce-playground.lambdatest.io';
  4  | const route = (r: string) => `${BASE}/index.php?route=${r}`;
  5  | 
  6  | test.describe('Navigation', () => {
  7  |   test('Category Page Shows Breadcrumbs', async ({ page }) => {
  8  |     // 1. Navigate to a category page
> 9  |     await page.goto(route('product/category&path=18'));
     |                ^ Error: page.goto: WebKit encountered an internal error
  10 | 
  11 |     // 2. Verify the breadcrumb reflects the category path
  12 |     const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
  13 |     await expect(breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible();
  14 |     await expect(breadcrumb.getByText('Laptops')).toBeVisible();
  15 |   });
  16 | 
  17 |   test('Manufacturer Page Lists Brand Products', async ({ page }) => {
  18 |     // 1. Navigate to the Apple manufacturer page
  19 |     await page.goto(route('product/manufacturer/info&manufacturer_id=8'));
  20 | 
  21 |     // 2. Verify the brand heading is displayed
  22 |     await expect(page.getByRole('heading', { name: 'Apple', exact: true })).toBeVisible();
  23 |   });
  24 | 
  25 |   test('Static Information Page Renders', async ({ page }) => {
  26 |     // 1. Navigate to the About Us information page
  27 |     await page.goto(route('information/information&information_id=4'));
  28 | 
  29 |     // 2. Verify the page title and heading are displayed
  30 |     await expect(page).toHaveTitle(/About Us/);
  31 |     await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();
  32 |   });
  33 | 
  34 |   test('Blog Home Page Renders', async ({ page }) => {
  35 |     // 1. Navigate to the blog home page
  36 |     await page.goto(route('extension/maza/blog/home'));
  37 | 
  38 |     // 2. Verify the blog page title is displayed
  39 |     await expect(page).toHaveTitle(/Blog/);
  40 |   });
  41 | 
  42 |   test('Unknown Route Shows Page Not Found', async ({ page }) => {
  43 |     // 1. Navigate to a non-existent route
  44 |     await page.goto(route('information/tracking&order_id=999999&email=x@y.com'));
  45 | 
  46 |     // 2. Verify the not-found page is displayed
  47 |     await expect(page.getByRole('heading', { name: 'The page you requested cannot be found!' })).toBeVisible();
  48 |   });
  49 | });
  50 | 
```
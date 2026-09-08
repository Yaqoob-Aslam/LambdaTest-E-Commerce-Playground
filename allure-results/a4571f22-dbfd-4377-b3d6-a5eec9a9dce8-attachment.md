# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: header-my-account-opens-login-when-logged-out.spec.ts >> Authentication >> Header My Account Opens Login When Logged Out
- Location: tests/header-my-account-opens-login-when-logged-out.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('Header My Account Opens Login When Logged Out', async ({ page }) => {
  5  |     // 1. Navigate to the application base URL
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Click the "My account" button in the header
  9  |     await page.getByRole('button', { name: 'My account' }).click();
  10 | 
  11 |     // 3. Verify the login page is displayed
  12 |     await expect(page).toHaveURL(/route=account\/login/);
  13 |     await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  14 |   });
  15 | });
  16 | 
```
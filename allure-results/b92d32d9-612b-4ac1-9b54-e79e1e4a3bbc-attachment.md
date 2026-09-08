# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account-page-redirects-to-login-when-logged-out.spec.ts >> Authentication >> Account Page Redirects To Login When Logged Out
- Location: tests/account-page-redirects-to-login-when-logged-out.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=account/account", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('Account Page Redirects To Login When Logged Out', async ({ page }) => {
  5  |     // 1. Navigate directly to the account dashboard while logged out
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Verify the user is redirected to the login page
  9  |     await expect(page).toHaveURL(/route=account\/login/);
  10 | 
  11 |     // 3. Verify the login form heading "Returning Customer" is visible
  12 |     await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  13 |   });
  14 | });
  15 | 
```
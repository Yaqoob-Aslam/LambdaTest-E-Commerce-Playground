# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-with-empty-credentials.spec.ts >> Authentication >> Login With Empty Credentials
- Location: tests/login-with-empty-credentials.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('Login With Empty Credentials', async ({ page }) => {
  5  |     // 1. Navigate to the login page at /index.php?route=account/login
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Click the Login button without entering email or password
  9  |     await page.getByRole('button', { name: 'Login' }).click();
  10 | 
  11 |     // 3. Verify a warning alert is displayed
  12 |     await expect(page.locator('.alert-danger')).toContainText('Warning:');
  13 |   });
  14 | });
  15 | 
```
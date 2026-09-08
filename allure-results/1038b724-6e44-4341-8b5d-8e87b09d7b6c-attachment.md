# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-with-unregistered-email-shows-warning.spec.ts >> Authentication >> Login With Unregistered Email Shows Warning
- Location: tests/login-with-unregistered-email-shows-warning.spec.ts:4:7

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
  4  |   test('Login With Unregistered Email Shows Warning', async ({ page }) => {
  5  |     // 1. Navigate to the login page
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Fill an unregistered email and a password
  9  |     await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('nonexistent.user@example.com');
  10 |     await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123');
  11 | 
  12 |     // 3. Click the Login button
  13 |     await page.getByRole('button', { name: 'Login' }).click();
  14 | 
  15 |     // 4. Verify a warning alert is displayed
  16 |     await expect(page.locator('.alert-danger')).toContainText('Warning:');
  17 |   });
  18 | });
  19 | 
```
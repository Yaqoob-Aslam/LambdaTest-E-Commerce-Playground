# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration.spec.ts >> Registration >> Register With Mismatched Passwords Shows Error
- Location: tests/registration.spec.ts:25:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=account/register", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const REGISTER_URL = 'https://ecommerce-playground.lambdatest.io/index.php?route=account/register';
  4  | 
  5  | const agreeCheckbox = (page: import('@playwright/test').Page) =>
  6  |   page.locator('#input-agree');
  7  | 
  8  | test.describe('Registration', () => {
  9  |   test('Register With Empty Fields Shows Validation Errors', async ({ page }) => {
  10 |     // 1. Navigate to the register page
  11 |     await page.goto(REGISTER_URL);
  12 | 
  13 |     // 2. Submit the empty form
  14 |     await page.getByRole('button', { name: 'Continue' }).click();
  15 | 
  16 |     // 3. Verify field-level validation errors are displayed
  17 |     await expect(page.getByText('Warning: You must agree to the Privacy Policy!')).toBeVisible();
  18 |     await expect(page.getByText('First Name must be between 1 and 32 characters!')).toBeVisible();
  19 |     await expect(page.getByText('Last Name must be between 1 and 32 characters!')).toBeVisible();
  20 |     await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
  21 |     await expect(page.getByText('Telephone must be between 3 and 32 characters!')).toBeVisible();
  22 |     await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible();
  23 |   });
  24 | 
  25 |   test('Register With Mismatched Passwords Shows Error', async ({ page }) => {
  26 |     // 1. Navigate to the register page
> 27 |     await page.goto(REGISTER_URL);
     |                ^ Error: page.goto: WebKit encountered an internal error
  28 | 
  29 |     // 2. Fill valid details with a mismatched password confirmation
  30 |     await page.getByRole('textbox', { name: 'First Name*' }).fill('John');
  31 |     await page.getByRole('textbox', { name: 'Last Name*' }).fill('Doe');
  32 |     await page.getByRole('textbox', { name: 'E-Mail*' }).fill(`qa_${Date.now()}@example.com`);
  33 |     await page.getByRole('textbox', { name: 'Telephone*' }).fill('1234567890');
  34 |     await page.getByRole('textbox', { name: 'Password*' }).fill('Password123');
  35 |     await page.getByRole('textbox', { name: 'Password Confirm*' }).fill('Different123');
  36 |     await agreeCheckbox(page).check({ force: true });
  37 | 
  38 |     // 3. Submit the form
  39 |     await page.getByRole('button', { name: 'Continue' }).click();
  40 | 
  41 |     // 4. Verify the password confirmation error is displayed
  42 |     await expect(page.getByText('Password confirmation does not match password!')).toBeVisible();
  43 |   });
  44 | 
  45 |   test('Register Valid Account Creates Account', async ({ page }) => {
  46 |     test.skip(!process.env.ALLOW_REGISTRATION, 'Skipped: set ALLOW_REGISTRATION=1 to create real accounts');
  47 | 
  48 |     // 1. Navigate to the register page
  49 |     await page.goto(REGISTER_URL);
  50 | 
  51 |     // 2. Fill all required fields with unique data
  52 |     const email = `qa_${Date.now()}@example.com`;
  53 |     await page.getByRole('textbox', { name: 'First Name*' }).fill('QA');
  54 |     await page.getByRole('textbox', { name: 'Last Name*' }).fill('Tester');
  55 |     await page.getByRole('textbox', { name: 'E-Mail*' }).fill(email);
  56 |     await page.getByRole('textbox', { name: 'Telephone*' }).fill('1234567890');
  57 |     await page.getByRole('textbox', { name: 'Password*' }).fill('Password123');
  58 |     await page.getByRole('textbox', { name: 'Password Confirm*' }).fill('Password123');
  59 |     await agreeCheckbox(page).check({ force: true });
  60 | 
  61 |     // 3. Submit the registration form
  62 |     await page.getByRole('button', { name: 'Continue' }).click();
  63 | 
  64 |     // 4. Verify the account was created
  65 |     await expect(page).toHaveURL(/account\/(success|account)/);
  66 |     await expect(page.getByText('Your Account Has Been Created')).toBeVisible();
  67 |   });
  68 | });
  69 | 
```
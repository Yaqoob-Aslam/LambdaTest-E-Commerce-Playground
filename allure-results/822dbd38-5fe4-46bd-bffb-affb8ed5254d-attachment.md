# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-us-missing-fields.spec.ts >> Contact >> Contact Us Shows Validation Errors For Missing Fields
- Location: tests/contact-us-missing-fields.spec.ts:4:7

# Error details

```
Error: page.goto: WebKit encountered an internal error
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=information/contact", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Contact', () => {
  4  |   test('Contact Us Shows Validation Errors For Missing Fields', async ({ page }) => {
  5  |     // 1. Navigate to the Contact Us page
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=information/contact');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Click Submit without filling any fields
  9  |     await page.getByRole('button', { name: 'Submit' }).click();
  10 | 
  11 |     // 3. Verify validation error messages are displayed
  12 |     await expect(page.getByText('Name must be between 3 and 32 characters!')).toBeVisible();
  13 |     await expect(page.getByText('E-Mail Address does not appear to be valid!')).toBeVisible();
  14 |     await expect(page.getByText('Enquiry must be between 10 and 3000 characters!')).toBeVisible();
  15 |   });
  16 | });
  17 | 
```
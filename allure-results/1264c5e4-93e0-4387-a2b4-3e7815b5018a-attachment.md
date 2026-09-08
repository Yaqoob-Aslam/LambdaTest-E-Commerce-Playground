# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-us-rejects-invalid-email.spec.ts >> Contact >> Contact Us Rejects Invalid Email
- Location: tests/contact-us-rejects-invalid-email.spec.ts:4:7

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
  4  |   test('Contact Us Rejects Invalid Email', async ({ page }) => {
  5  |     // 1. Navigate to the Contact Us page
> 6  |     await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=information/contact');
     |                ^ Error: page.goto: WebKit encountered an internal error
  7  | 
  8  |     // 2. Fill a name, an invalid email, and an enquiry message
  9  |     await page.getByRole('textbox', { name: 'Your Name*' }).fill('QA Tester');
  10 |     await page.getByRole('textbox', { name: 'E-Mail Address*' }).fill('not-an-email');
  11 |     await page.getByRole('textbox', { name: 'Enquiry*' }).fill('This is a test enquiry message.');
  12 | 
  13 |     // 3. Click the Submit button
  14 |     await page.getByRole('button', { name: 'Submit' }).click();
  15 | 
  16 |     // 4. Verify the email validation error is displayed
  17 |     await expect(page.getByText('E-Mail Address does not')).toBeVisible();
  18 |   });
  19 | });
  20 | 
```
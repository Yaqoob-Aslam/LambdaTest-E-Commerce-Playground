import { expect, test as setup } from '@playwright/test';
import { testConfig, hasCredentials } from '../config/testConfig';
import { LoginPage } from '../pages';

/**
 * Optional authentication setup that persists a logged-in session to
 * `playwright/.auth/user.json` for reuse by authenticated projects.
 *
 * Skipped automatically when no credentials are configured. It is excluded
 * from the default run by `testIgnore` in `playwright.config.ts` — enable the
 * `setup` project there (or run `npx playwright test auth.setup.ts`) to use it.
 */
const authFile = 'playwright/.auth/user.json';

setup('authenticate registered user', async ({ page }) => {
  setup.skip(!hasCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to generate auth state');

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(testConfig.credentials.email, testConfig.credentials.password);
  await expect(page).toHaveURL(/route=account\/account/);
  await page.context().storageState({ path: authFile });
});

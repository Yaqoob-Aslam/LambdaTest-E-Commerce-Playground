import type { Page } from '@playwright/test';
import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { DataUtils } from '../../utils/DataUtils';
import type { LoginCredentials } from '../../types';
import { expect, test } from '../../fixtures/testFixtures';

/** Log in with the configured registered account. */
async function loginAsRegisteredUser(
  page: Page,
  loginPage: { open(): Promise<void>; login(e: string, p: string): Promise<void> },
  credentials: LoginCredentials,
): Promise<void> {
  await loginPage.open();
  await loginPage.login(credentials.email, credentials.password);
  await expect(page).toHaveURL(URL_PATTERNS.account);
}

/**
 * Products — wishlist and comparison.
 * Traces to TEST-PLAN.md §7.2.1 (PRD-P-027 … PRD-P-034).
 */
test.describe('Products — Wishlist & Compare', () => {
  test(
    'TC_PRODUCT_027_Add_Product_To_Wishlist',
    { tag: [TAGS.product, TAGS.wishlist, TAGS.functional] },
    async ({ loginPage, productDetailsPage, wishlistPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const product = data.product('iMac');

      // 1. Log in and add a product to the wishlist (Plan PRD-P-027)
      await loginAsRegisteredUser(page, loginPage, data.registeredCredentials());
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToWishlist();

      // 2. Verify the product is present in the wishlist
      await wishlistPage.open();
      await expect(wishlistPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_028_View_Wishlist',
    { tag: [TAGS.product, TAGS.wishlist, TAGS.functional] },
    async ({ loginPage, wishlistPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');

      // 1. Log in and open the wishlist (Plan PRD-P-028)
      await loginAsRegisteredUser(page, loginPage, data.registeredCredentials());
      await wishlistPage.open();

      // 2. Verify the wishlist page renders (populated or empty)
      await expect(page).toHaveURL(URL_PATTERNS.wishlist);
      await expect(wishlistPage.heading).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_029_Move_Wishlist_Item_To_Cart',
    { tag: [TAGS.product, TAGS.wishlist, TAGS.cart] },
    async ({ loginPage, productDetailsPage, wishlistPage, cartPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const product = data.product('iMac');

      // 1. Log in and seed the wishlist (Plan PRD-P-029)
      await loginAsRegisteredUser(page, loginPage, data.registeredCredentials());
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToWishlist();

      // 2. Add the wishlist item to the cart
      await wishlistPage.open();
      await wishlistPage.addToCartButtons.first().click();

      // 3. Verify it now appears in the cart
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_030_Remove_Product_From_Wishlist',
    { tag: [TAGS.product, TAGS.wishlist, TAGS.functional] },
    async ({ loginPage, productDetailsPage, wishlistPage, page, data }) => {
      test.skip(!DataUtils.hasRegisteredCredentials(), 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD');
      const product = data.product('iMac');

      // 1. Log in and seed the wishlist (Plan PRD-P-030)
      await loginAsRegisteredUser(page, loginPage, data.registeredCredentials());
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToWishlist();

      // 2. Remove the wishlist entry
      await wishlistPage.open();
      await wishlistPage.removeButtons.first().click();

      // 3. Verify the entry is gone
      await expect(wishlistPage.product(product.name)).toHaveCount(0);
    },
  );

  test(
    'TC_PRODUCT_031_Add_Product_To_Compare',
    { tag: [TAGS.product, TAGS.compare, TAGS.functional] },
    async ({ productDetailsPage, comparePage, page, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add a product to the comparison list (Plan PRD-P-031)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCompare();

      // 2. Verify it is listed on the compare page
      await comparePage.open();
      await expect(page.getByText(product.name, { exact: false }).first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_032_Add_Multiple_Products_To_Compare',
    { tag: [TAGS.product, TAGS.compare, TAGS.functional] },
    async ({ productDetailsPage, comparePage, page, data }) => {
      const first = data.product('htcTouchHd');
      const second = data.product('iMac');

      // 1. Add two different products to the comparison list (Plan PRD-P-032)
      await productDetailsPage.open(first.id);
      await productDetailsPage.addToCompare();
      await productDetailsPage.open(second.id);
      await productDetailsPage.addToCompare();

      // 2. Verify both appear in the comparison
      await comparePage.open();
      await expect(page.getByText(first.name, { exact: false }).first()).toBeVisible();
      await expect(page.getByText(second.name, { exact: false }).first()).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_033_Compare_Page_Shows_Attributes_Side_By_Side',
    { tag: [TAGS.product, TAGS.compare, TAGS.functional] },
    async ({ productDetailsPage, comparePage, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add a product and open the comparison page (Plan PRD-P-033)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCompare();
      await comparePage.open();

      // 2. Verify the comparison table renders
      await expect(comparePage.heading).toBeVisible();
      await expect(comparePage.table).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_034_Remove_Product_From_Compare',
    { tag: [TAGS.product, TAGS.compare, TAGS.functional] },
    async ({ productDetailsPage, comparePage, page, data }) => {
      const product = data.product('htcTouchHd');

      // 1. Add a product then remove it from the comparison (Plan PRD-P-034)
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCompare();
      await comparePage.open();
      await comparePage.removeFirst();

      // 2. Verify the product is removed from the table
      await expect(page.getByText(product.name, { exact: false })).toHaveCount(0);
    },
  );
});

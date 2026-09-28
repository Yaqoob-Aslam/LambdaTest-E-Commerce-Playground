import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * End-to-end journey: discover → add to cart → cart → checkout.
 * Stops before order placement by design (that is the opt-in guest checkout
 * test), keeping the journey deterministic and side-effect free.
 */
test.describe('End-to-End', () => {
  test(
    'TC_E2E_001_Search_To_Checkout_Journey',
    { tag: [TAGS.e2e, TAGS.regression, TAGS.search, TAGS.cart, TAGS.checkout] },
    async ({ homePage, searchPage, productDetailsPage, cartPage, checkoutPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Search for the product from the home page
      await homePage.open();
      await homePage.searchFor(product.name);
      await expect(searchPage.resultsHeading(product.name)).toBeVisible();

      // 2. Open the product from the results
      await searchPage.openProduct(product.name);
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);

      // 3. Add it to the cart
      await productDetailsPage.addToCart();

      // 4. Verify it is in the cart
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();

      // 5. Continue to checkout
      await cartPage.proceedToCheckout();
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
      await expect(checkoutPage.firstNameInput).toBeVisible();
    },
  );
});

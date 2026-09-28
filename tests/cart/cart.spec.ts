import { MESSAGES } from '../../constants/Messages';
import { URL_PATTERNS } from '../../constants/URLs';
import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Cart', () => {
  test(
    // Plan: CC-P-001, CC-P-005
    'TC_CART_001_Add_Product_To_Cart',
    { tag: [TAGS.cart, TAGS.functional, TAGS.smoke, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add the product to the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify it appears in the cart
      await cartPage.open();
      await expect(cartPage.product(product.name)).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-002
    'TC_CART_002_Add_Multiple_Products_To_Cart',
    { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const first = data.product('iMac');
      const second = data.product('htcTouchHd');

      // 1. Add two different products
      await productDetailsPage.open(first.id);
      await productDetailsPage.addToCart();
      await productDetailsPage.open(second.id);
      await productDetailsPage.addToCart();

      // 2. Verify both products are in the cart
      await cartPage.open();
      await expect(cartPage.product(first.name)).toBeVisible();
      await expect(cartPage.product(second.name)).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-006, CC-P-010
    'TC_CART_003_Update_Product_Quantity',
    { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add the product and open the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();

      // 2. Increase the quantity to 2
      await cartPage.updateQuantity(2);

      // 3. Verify the quantity and the recalculated line total
      await expect(cartPage.alertSuccess).toContainText(MESSAGES.cart.modified);
      await expect(cartPage.quantityInput).toHaveValue('2');
      await expect(cartPage.cell('$340.00')).toBeVisible();
    },
  );

  test(
    // Plan: CC-P-007
    'TC_CART_004_Remove_Product_From_Cart',
    { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, cartPage, data }) => {
      const product = data.product('iMac');

      // 1. Add the product and open the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();

      // 2. Remove the product
      await cartPage.removeFirstProduct();

      // 3. Verify the cart is empty
      await expect(cartPage.emptyMessage).toBeVisible();
    },
  );

  test(
    'TC_CART_005_Empty_Cart_State',
    { tag: [TAGS.cart, TAGS.functional, TAGS.regression] },
    async ({ cartPage }) => {
      // 1. Open the cart without adding anything
      await cartPage.open();

      // 2. Verify the empty-cart message
      await expect(cartPage.emptyMessage).toContainText(MESSAGES.cart.empty);
    },
  );

  test(
    'TC_CART_006_Proceed_To_Checkout_From_Cart',
    { tag: [TAGS.cart, TAGS.checkout, TAGS.functional] },
    async ({ productDetailsPage, cartPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Seed the cart and open it
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();
      await cartPage.open();

      // 2. Proceed to checkout
      await cartPage.proceedToCheckout();

      // 3. Verify checkout is displayed
      await expect(page).toHaveURL(URL_PATTERNS.checkout);
    },
  );
});

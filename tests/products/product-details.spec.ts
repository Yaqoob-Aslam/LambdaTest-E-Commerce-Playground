import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Products — Detail Page', () => {
  test(
    // Plan: PRD-P-005, PRD-P-006, PRD-P-007
    'TC_PRODUCT_001_Open_Product_Details',
    { tag: [TAGS.product, TAGS.functional, TAGS.smoke, TAGS.regression] },
    async ({ productDetailsPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Open the product detail page
      await productDetailsPage.open(product.id);

      // 2. Verify the product name and price
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
      await expect(page.getByText(product.price).first()).toBeVisible();
    },
  );

  test(
    // Plan: PRD-P-008
    'TC_PRODUCT_002_Product_Details_Show_Description_Tab',
    { tag: [TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, page, data }) => {
      const product = data.product('iMac');

      // 1. Open the product detail page
      await productDetailsPage.open(product.id);

      // 2. Verify the name and the selected Description tab
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
      await expect(productDetailsPage.descriptionTab).toBeVisible();

      // 3. Verify the description content is rendered
      await expect(
        page.getByText('Just when you thought iMac had everything').first(),
      ).toBeVisible();
    },
  );

  test(
    'TC_PRODUCT_003_Add_To_Cart_Updates_The_Mini_Cart',
    { tag: [TAGS.product, TAGS.cart, TAGS.functional, TAGS.regression] },
    async ({ productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open the product and add it to the cart
      await productDetailsPage.open(product.id);
      await productDetailsPage.addToCart();

      // 2. Verify the mini-cart badge and the checkout action
      await expect(productDetailsPage.miniCart.itemCount).toHaveText('1');
      await expect(productDetailsPage.miniCart.checkoutButton).toBeVisible();
    },
  );
});

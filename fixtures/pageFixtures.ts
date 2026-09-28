import { test as base, expect } from '@playwright/test';
import {
  AccountPage,
  AddressPage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  ComparePage,
  ContactPage,
  ForgottenPasswordPage,
  HomePage,
  InformationPage,
  LoginPage,
  OrderHistoryPage,
  OrderSuccessPage,
  ProductDetailsPage,
  RegisterPage,
  SearchPage,
  WishlistPage,
} from '../pages';

/**
 * Page-object fixtures. Every page object is constructed lazily and only when
 * a test asks for it, so tests consume `{ loginPage }` instead of `new`.
 */
export interface PageFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgottenPasswordPage: ForgottenPasswordPage;
  accountPage: AccountPage;
  addressPage: AddressPage;
  orderHistoryPage: OrderHistoryPage;
  searchPage: SearchPage;
  categoryPage: CategoryPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  wishlistPage: WishlistPage;
  comparePage: ComparePage;
  checkoutPage: CheckoutPage;
  orderSuccessPage: OrderSuccessPage;
  contactPage: ContactPage;
  informationPage: InformationPage;
}

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  forgottenPasswordPage: async ({ page }, use) => {
    await use(new ForgottenPasswordPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  addressPage: async ({ page }, use) => {
    await use(new AddressPage(page));
  },
  orderHistoryPage: async ({ page }, use) => {
    await use(new OrderHistoryPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },
  comparePage: async ({ page }, use) => {
    await use(new ComparePage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderSuccessPage: async ({ page }, use) => {
    await use(new OrderSuccessPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  informationPage: async ({ page }, use) => {
    await use(new InformationPage(page));
  },
});

export { expect };

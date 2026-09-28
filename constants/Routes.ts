/**
 * OpenCart route identifiers. Every UI route is reached via
 * `index.php?route=<controller/action>`.
 */
export const ROUTES = {
  home: 'common/home',
  login: 'account/login',
  register: 'account/register',
  registerCustomField: 'account/register/customfield',
  forgotten: 'account/forgotten',
  logout: 'account/logout',
  account: 'account/account',
  editAccount: 'account/edit',
  password: 'account/password',
  address: 'account/address',
  orderHistory: 'account/order',
  orderInfo: 'account/order/info',
  newsletter: 'account/newsletter',
  downloads: 'account/download',
  reward: 'account/reward',
  returns: 'account/return',
  wishlist: 'account/wishlist',
  cart: 'checkout/cart',
  checkout: 'checkout/checkout',
  success: 'checkout/success',
  contact: 'information/contact',
  tracking: 'information/tracking',
  special: 'product/special',
  compare: 'product/compare',
  search: 'product/search',
  category: 'product/category',
  product: 'product/product',
  manufacturer: 'product/manufacturer/info',
  information: 'information/information',
  blogHome: 'extension/maza/blog/home',
} as const;

/**
 * AJAX/action routes consumed by the theme's JavaScript. Most return JSON
 * fragments rather than full pages.
 */
export const AJAX_ROUTES = {
  cartAdd: 'checkout/cart/add',
  cartEdit: 'checkout/cart/edit',
  cartRemove: 'checkout/cart/remove',
  cartInfo: 'common/cart/info',
  compareAdd: 'product/compare/add',
  compareRemove: 'extension/maza/product/compare/remove',
  wishlistAdd: 'account/wishlist/add',
  wishlistRemove: 'extension/maza/account/wishlist/remove',
  newsletterSubscribe: 'extension/maza/newsletter/subscribe',
  newsletterUnsubscribe: 'extension/maza/newsletter/unsubscribe',
  contactFormSubmit: 'extension/mz_widget/contact_form/submit',
  countryLookup: 'checkout/checkout/country',
  checkoutLoginSave: 'checkout/login/save',
  addressUpdate: 'extension/maza/checkout/address/update',
  shippingMethodUpdate: 'extension/maza/checkout/shipping_method/update',
  paymentMethodUpdate: 'extension/maza/checkout/payment_method/update',
  checkoutSave: 'extension/maza/checkout/save',
  totalUpdate: 'extension/maza/checkout/total/update',
  coupon: 'extension/total/coupon/coupon',
  voucher: 'extension/total/voucher/voucher',
  currency: 'common/currency/currency',
} as const;

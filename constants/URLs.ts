import { ROUTES } from './Routes';

/**
 * Relative application URLs.
 *
 * All URLs are relative (no host), so Playwright's `baseURL` resolves them.
 * This keeps tests completely independent of the deployment target.
 */
const buildUrl = (route: string): string => `/index.php?route=${route}`;

export const URLS = {
  home: '/',
  login: buildUrl(ROUTES.login),
  register: buildUrl(ROUTES.register),
  forgottenPassword: buildUrl(ROUTES.forgotten),
  logout: buildUrl(ROUTES.logout),
  account: buildUrl(ROUTES.account),
  editAccount: buildUrl(ROUTES.editAccount),
  password: buildUrl(ROUTES.password),
  addressBook: buildUrl(ROUTES.address),
  orderHistory: buildUrl(ROUTES.orderHistory),
  newsletter: buildUrl(ROUTES.newsletter),
  downloads: buildUrl(ROUTES.downloads),
  reward: buildUrl(ROUTES.reward),
  returns: buildUrl(ROUTES.returns),
  wishlist: buildUrl(ROUTES.wishlist),
  cart: buildUrl(ROUTES.cart),
  checkout: buildUrl(ROUTES.checkout),
  orderSuccess: buildUrl(ROUTES.success),
  contact: buildUrl(ROUTES.contact),
  tracking: buildUrl(ROUTES.tracking),
  special: buildUrl(ROUTES.special),
  compare: buildUrl(ROUTES.compare),
  blog: buildUrl(ROUTES.blogHome),

  category: (path: string, page = 1): string =>
    `${buildUrl(ROUTES.category)}&path=${path}&page=${page}`,

  search: (term: string): string =>
    `${buildUrl(ROUTES.search)}&search=${encodeURIComponent(term)}`,

  searchAdvanced: (term: string, params: Record<string, string | number> = {}): string => {
    const query = new URLSearchParams({ search: term, ...toStringParams(params) });
    return `${buildUrl(ROUTES.search)}&${query.toString()}`;
  },

  product: (productId: string): string =>
    `${buildUrl(ROUTES.product)}&product_id=${productId}`,

  manufacturer: (manufacturerId: string): string =>
    `${buildUrl(ROUTES.manufacturer)}&manufacturer_id=${manufacturerId}`,

  information: (informationId: string): string =>
    `${buildUrl(ROUTES.information)}&information_id=${informationId}`,
} as const;

/** Convert mixed param values to the string map `URLSearchParams` expects. */
function toStringParams(params: Record<string, string | number>): Record<string, string> {
  return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
}

/** Route fragments used by URL assertions (e.g. `await expect(page).toHaveURL(...)`). */
export const URL_PATTERNS = {
  home: /route=common\/home|\/$/,
  login: /route=account\/login/,
  register: /route=account\/register/,
  forgotten: /route=account\/forgotten/,
  account: /route=account\/account/,
  editAccount: /route=account\/edit/,
  password: /route=account\/password/,
  addressBook: /route=account\/address/,
  orderHistory: /route=account\/order/,
  newsletter: /route=account\/newsletter/,
  downloads: /route=account\/download/,
  reward: /route=account\/reward/,
  wishlist: /route=account\/wishlist/,
  cart: /route=checkout\/cart/,
  checkout: /route=checkout\/checkout/,
  success: /route=checkout\/success/,
  contact: /route=information\/contact/,
  special: /route=product\/special/,
  compare: /route=product\/compare/,
  search: /route=product\/search/,
  category: /route=product\/category/,
  product: /route=product\/product/,
  manufacturer: /route=product\/manufacturer\/info/,
  information: /route=information\/information/,
  blog: /route=extension\/maza\/blog/,
} as const;

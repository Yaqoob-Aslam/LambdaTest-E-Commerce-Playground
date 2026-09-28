/**
 * Playwright tags. Apply with `test('...', { tag: [TAGS.smoke, TAGS.cart] }, ...)`
 * and run selectively with `npx playwright test --grep @smoke`.
 */
export const TAGS = {
  smoke: '@smoke',
  regression: '@regression',
  functional: '@functional',
  negative: '@negative',
  edge: '@edge',
  boundary: '@boundary',
  e2e: '@e2e',
  authentication: '@authentication',
  search: '@search',
  product: '@product',
  cart: '@cart',
  checkout: '@checkout',
  payment: '@payment',
  order: '@order',
  wishlist: '@wishlist',
  compare: '@compare',
  category: '@category',
  listing: '@listing',
  account: '@account',
  address: '@address',
  session: '@session',
  security: '@security',
  navigation: '@navigation',
  home: '@home',
  contact: '@contact',
  information: '@information',
  error: '@error',
  ui: '@ui',
  accessibility: '@accessibility',
  responsive: '@responsive',
  data: '@data',
  api: '@api',
} as const;

export type Tag = (typeof TAGS)[keyof typeof TAGS];

# API Regression Suite

**App:** ecommerce-playground.lambdatest.io
**Purpose:** Compact, prioritized regression coverage of the most critical API endpoints. No invented endpoints — all below are from the verified inventory (`API-ENDPOINT-INVENTORY.md`).

---

## 1. Smoke Suite (critical availability + basic function)

| # | Endpoint | Method | Assert |
|---|---|---|---|
| S-01 | `common/home` | GET | 200 HTML |
| S-02 | `product/product` | GET | 200 for `product_id=28`, price `$146.00` |
| S-03 | `checkout/cart/add` | POST | JSON success + total |
| S-04 | `common/cart/info` | GET | Drawer fragment reflects cart |
| S-05 | `account/login` | GET | 200 with login form |
| S-06 | `checkout/checkout/country` | GET | JSON for `country_id=222` |
| S-07 | `extension/total/coupon/coupon` | POST | HTTP 200 + `{"error":…}` (contract) |
| S-08 | `product/search` | GET | 200 + results for `search=HTC` |
| S-09 | `checkout/cart` | GET | 200 |
| S-10 | `account/account` (guest) | GET | 302 → login (auth model) |

## 2. Critical Regression (business-critical workflows)

| # | Endpoint | Method | Scenario |
|---|---|---|---|
| C-01 | `account/register` | POST | Valid registration |
| C-02 | `account/login` | POST | Valid login → session |
| C-03 | `checkout/cart/add` | POST | Add + total math |
| C-04 | `checkout/cart/edit` | POST | Quantity update totals |
| C-05 | `checkout/cart/remove` | POST | Remove + total |
| C-06 | `extension/maza/checkout/total/update` | POST | Totals recalc |
| C-07 | `extension/maza/checkout/shipping_method/update` | POST | Shipping select |
| C-08 | `extension/maza/checkout/payment_method/update` | POST | Payment select |
| C-09 | `extension/maza/checkout/save` | POST | Place order |
| C-10 | `account/order/info` | GET | Order persists after save |
| C-11 | `extension/total/coupon/coupon` | POST | Valid coupon discount |
| C-12 | `extension/total/voucher/voucher` | POST | Voucher discount |
| C-13 | `checkout/login/save` | POST | Checkout login |
| C-14 | `account/logout` | GET | Session invalidation |

## 3. Full Regression (all 67 endpoints — happy path + key negatives)

Grouped by module (refer to `specs/*.md` for the full case IDs):

- **Common:** `common/home`, `common/currency/currency`, `common/language/language`, `tool/upload`.
- **Auth:** login, register, forgotten, logout, password, edit, checkout login, register customfield.
- **Account:** account, address (+delete), wishlist, order (+info), return, newsletter, download, reward, transaction, recurring.
- **Product:** category, product, search, special, manufacturer, compare (+add/remove), quick_view, priceWithOptions, recurring desc, review (+write).
- **Cart:** cart add/edit/remove/info + cart page.
- **Checkout/Order:** checkout, country, customfield, address/cart/payment/shipping/total updates, save, coupon, voucher, order, order/info, tracking.
- **Wishlist/Compare:** wishlist add/remove, compare add/remove.
- **Newsletter/Contact:** subscribe/unsubscribe, contact_form/submit, information/contact.
- **Information/Content:** information, information/agree, tracking, maza page, blog home/article/author.

## 4. Extended Regression (edge/boundary/security/integration)

- Boundary values for all numeric/string/array inputs (`api-negative-edge.md` §6).
- Query-parameter abuse and pagination (`api-negative-edge.md` §5, §12).
- HTTP method validation (405 checks) (`api-negative-edge.md` §4).
- Security-oriented functional payloads (`api-negative-edge.md` §8).
- IDOR cross-account checks (`api-authentication.md` §6).
- Idempotency & concurrency (`api-negative-edge.md` §10) — **controlled environment only**.
- Schema strictness (`api-negative-edge.md` §11).

## 5. CI/Environment Guidance

- Run smoke on every change; critical regression nightly; full/extended on release cadence.
- Externalize `BASE_URL`, credentials via CI secrets; no real credentials in code.
- Use Playwright `APIRequestContext`; report HTML/trace on failure (`trace: on-first-retry`).

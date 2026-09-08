# API Test Plan — E-Commerce Playground (LambdaTest)

**Application:** [https://ecommerce-playground.lambdatest.io/](https://ecommerce-playground.lambdatest.io/)
**Date:** 2026-09-05
**Scope:** Complete, evidence-based, risk-driven API test plan for the application's actual API surface.

> **Companion documents:** `API-ENDPOINT-INVENTORY.md` (full endpoint inventory) · `specs/api-authentication.md` · `specs/api-products.md` · `specs/api-cart.md` · `specs/api-checkout-orders.md` · `specs/api-negative-edge.md` · `specs/api-regression.md`.

---

## 1. Executive Summary

The application is an **OpenCart** store served by **nginx**. It exposes **no conventional REST/JSON API, no Swagger/OpenAPI, and no GraphQL**. Its "API" is a set of **~67 HTTP endpoints** reachable as OpenCart routes (`index.php?route=controller/action`) of two kinds:

1. **HTML page routes** (server-rendered) — GET pages and POST form handlers.
2. **JSON AJAX endpoints** — the theme's JavaScript calls these (mostly POST) and receives `Content-Type: application/json` fragments.

Authentication is **session-cookie based** (`OCSESSID`); protected routes redirect (302) to `account/login` for guests. A notable contract characteristic: **AJAX endpoints return HTTP 200 even on business failures** — errors are signalled in the JSON body (e.g. `{"error":"Warning: Coupon is either invalid, expired or reached its usage limit!"}`).

This plan derives 100% of its coverage from **discovered endpoints**, with no assumed/invented endpoints.

---

## 2. Discovery Summary

| Category | Count |
|---|---|
| Total endpoints discovered | 67 |
| JSON AJAX endpoints | 31 |
| HTML page routes | 36 |
| GET endpoints | ~40 |
| POST endpoints | ~27 |
| PUT/PATCH/DELETE endpoints | **0** (not supported — OpenCart uses POST for all mutations) |

> OpenCart does **not** expose REST-style PUT/PATCH/DELETE. All state changes are POST. This is a verified architectural fact, not an omission.

---

## 3. HTTP Method Model

| Method | Usage |
|---|---|
| GET | Read pages, read JSON lookups (`checkout/checkout/country`, `common/cart/info`, quick-view, etc.). |
| POST | All mutations and form submissions (cart, checkout, login, register, contact, coupon, voucher, newsletter, compare, wishlist, review, upload). |
| PUT/PATCH/DELETE | **Not supported** — expected 405 (to be verified; OpenCart route dispatcher does not map these). |

**Method-testing scenarios (global):**
- Every GET endpoint: issue POST → expect 405/redirect (verify actual).
- Every POST endpoint: issue GET → expect 405 or HTML page render (verify actual).
- `OPTIONS` preflight → observe behavior (likely 200 with `Allow` or 405).

---

## 4. Positive / Negative / Boundary Test Design

Every endpoint follows the matrix below (instantiated per-endpoint in the `specs/*.md` files).

| Dimension | Coverage |
|---|---|
| **Positive** | Valid request → expected 200/302 + correct HTML or JSON shape. |
| **Required-field validation** | Omit each required field → observe error/success (see §7 error-handling contract). |
| **Optional-field validation** | Include valid optional fields; omit them. |
| **Invalid data** | Wrong type, malformed JSON, wrong enum, negative/zero IDs. |
| **Missing / null / empty** | Missing, `null`, `""`, whitespace-only, `0`. |
| **Data types** | String↔integer↔boolean↔array↔object confusion. |
| **Boundary** | Numeric min/max/±1; string 0/1/max/max+1; arrays 0/1/max/max+1/dupes. |
| **AuthN/AuthZ** | Guest vs logged-in; cross-account resource access (IDOR checks). |
| **Headers** | Correct/incorrect/missing `Content-Type`; cookie/session presence. |
| **Schema** | Verify JSON field names/types/nullability; no debug/stack-trace leakage. |
| **Status** | Verify actual status codes (200/302/405/…), no assumed codes. |
| **Business rules** | Pricing, totals, coupon/voucher validity, stock, order totals. |
| **Data integrity** | Create → read → update → delete lifecycle consistency. |

---

## 5. Authentication & Authorization Testing

See `specs/api-authentication.md` for full cases. Summary:

- **Login** (`account/login`, `checkout/login/save`): valid/invalid creds, empty fields, wrong format, repeated failures, account state.
- **Registration** (`account/register`): valid, duplicate email, invalid email, missing fields, password mismatch, weak/boundary password, invalid chars.
- **Logout** (`account/logout`): valid logout, repeated logout, access protected endpoint after logout (session invalidation).
- **Forgotten password** (`account/forgotten`): valid/invalid/unknown/empty email, token behavior.
- **Authorization**: guest vs authenticated; IDOR — attempt to read/modify another user's order/address/wishlist (via order_id/address_id tampering).

---

## 6. Response & Schema Validation

- Confirm `Content-Type` is `application/json` for AJX endpoints and `text/html` for pages.
- JSON endpoints: assert exact fields (`success`, `total`, `toast`, `error`, `country_id`, `zone[]`, …) and reject **unexpected fields**.
- Reject leakage of: PHP warnings, stack traces, DB errors, internal paths.
- Document the **HTTP-200-on-error** contract and validate error-body schema (`{"error":"…"}`).
- Security headers: assert `X-Frame-Options: SAMEORIGIN`.

---

## 7. Error Handling Contract (verified)

| Condition | Expected |
|---|---|
| Invalid coupon / voucher | HTTP **200** + `{"error":"Warning: …"}` |
| Cart add with no payload | HTTP **200** + `[]` |
| Guest → protected route | HTTP **302** → `account/login` |
| Invalid product/country ID | To verify (empty HTML / JSON null / redirect) |

> Validation tests must **not** assert 4xx codes blindly; they must match the discovered 200+JSON-error contract and record any deviation as a contract mismatch.

---

## 8. Data Integrity & UI-to-API Consistency

- Product `product_id` → `product/product` page price/name must equal cart JSON `total` math and checkout totals.
- Cart add → `common/cart/info` drawer count/subtotal must match.
- Coupon application must change `extension/maza/checkout/total/update` totals.
- Order placement (`extension/maza/checkout/save`) → `account/order/info` must show the order.
- Compare/wishlist add → page views reflect the same items.

---

## 9. Idempotency & Concurrency

- Repeated POST `checkout/cart/add` (same product) → quantity increments (non-idempotent) — verify.
- Repeated `extension/maza/checkout/save` → prevent duplicate order (verify single order created).
- Concurrent cart update/remove → verify no race/lost-update in controlled environment only.
- Repeated GETs are idempotent (verify).

---

## 10. Rate Limiting & Abuse

- No evidence of rate limiting discovered (no `429`, no `Retry-After` header observed). Plan **non-destructive** checks for login/forgotten/search/coupon abuse in a **controlled environment only**; do **not** load-test the shared production demo.

---

## 11. Security-Oriented Functional Checks (authorized, non-destructive)

- Authentication/authorization bypass on protected account routes (guest access).
- IDOR: tamper `order_id`/`address_id`/`product_id` to access others' data.
- Sensitive-data exposure in JSON responses (passwords, tokens, PII).
- Input injection payloads (safe): `'`, `"`, `<script>`, `../../`, `${test}` in search/coupon/contact/register fields.
- Header hygiene: no debug/verbose headers; `X-Frame-Options` present.
- File upload (`tool/upload`) content-type/extension validation.

---

## 12. Test Data & Environment Strategy

- Externalize `BASE_URL` (`https://ecommerce-playground.lambdatest.io`), `USERNAME`, `PASSWORD` via `.env` / CI secrets.
- Use dynamic/factory-generated data (unique email `qa+<timestamp>@example.com`, random phone) to avoid duplicates.
- Maintain known fixtures: valid product IDs (e.g. `product_id=28` HTC Touch HD, `$146.00`), valid category `path` values, UK `country_id=222`.
- Never commit real credentials.

---

## 13. Automation Recommendations (Playwright)

Use **Playwright `APIRequestContext`** (`request.get/post`) for JSON endpoints, and **`request.post`/`page.goto`** for HTML routes. Recommend this structure (aligned to discovered endpoints):

```
api/
├── common.api.ts          # home, currency, language, upload
├── auth.api.ts            # login, register, forgotten, logout, checkout login
├── products.api.ts        # category, product, search, special, manufacturer, compare, quick_view, review
├── cart.api.ts            # cart/add, cart/edit, cart/remove, cart/info
├── wishlist.api.ts        # wishlist/add, wishlist/remove
├── checkout.api.ts        # checkout country/customfield, address/cart/payment/shipping/total updates, save
├── coupons.api.ts         # coupon, voucher
├── account.api.ts         # account, edit, password, address, order, return, newsletter, download, reward, transaction, recurring
└── factories/
    ├── user.factory.ts
    └── data.factory.ts
```

Use `request.post('/index.php', { form: { route: 'checkout/cart/add', product_id, quantity } })` style calls (OpenCart routes go through `index.php?route=…`).

---

## 14. Top 15 Highest-Risk APIs

| # | API | Risk | Impact | Likelihood | Priority |
|---|---|---|---|---|---|
| 1 | `extension/maza/checkout/save` | Critical | Critical | Medium | Critical |
| 2 | `checkout/cart/add` | Critical | Critical | Medium | Critical |
| 3 | `extension/maza/checkout/total/update` | Critical | Critical | Medium | Critical |
| 4 | `account/login` + `checkout/login/save` | Critical | Critical | Medium | Critical |
| 5 | `extension/total/coupon/coupon` | High | High | Medium | High |
| 6 | `extension/total/voucher/voucher` | High | High | Medium | High |
| 7 | `account/register` | High | High | Medium | High |
| 8 | `checkout/cart/edit` | High | High | Medium | High |
| 9 | `checkout/cart/remove` | High | High | Medium | High |
| 10 | `product/search` | High | High | Medium | High |
| 11 | `account/order/info` | High | High | Low | High |
| 12 | `account/address` | High | High | Low | High |
| 13 | `extension/maza/checkout/payment_method/update` | High | High | Medium | High |
| 14 | `extension/maza/checkout/shipping_method/update` | High | High | Medium | High |
| 15 | `account/forgotten` | High | High | Low | High |

---

## 15. Regression Suite (classification)

| Class | Content |
|---|---|
| **Smoke** | home, login, product view, cart/add, cart/info, checkout/country, coupon error contract. |
| **Critical regression** | cart add/edit/remove totals, checkout total/payment/shipping/save, login/register, coupon/voucher. |
| **Full regression** | all 67 endpoints happy paths + key negatives. |
| **Extended** | boundary, IDOR, injection payloads, idempotency, concurrency (controlled), schema strictness. |

See `specs/api-regression.md` for the concrete list.

---

## 16. Traceability Matrix (condensed)

| Module | Positive | Negative | Boundary | Auth | Schema | Data integrity | Security |
|---|---|---|---|---|---|---|---|
| Auth | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Account | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Product/Catalog | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| Cart | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Checkout/Order | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Wishlist/Compare | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Newsletter/Contact | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ |
| Common/Tool | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ |

Full per-endpoint matrix is in `API-ENDPOINT-INVENTORY.md` (ID columns) and the `specs/*.md` files.

---

## 17. Final Quality Gate Checklist

- [x] All 67 endpoints discovered from live evidence (no invented endpoints).
- [x] No REST/PUT/PATCH/DELETE assumed (documented as unsupported).
- [x] HTTP-200-on-error contract documented.
- [x] 302 auth-redirect model verified.
- [x] Positive/negative/edge/boundary/auth/schema/data-integrity coverage mapped.
- [x] Top 15 high-risk APIs + smoke + regression identified.
- [x] Playwright automation structure recommended.
- [x] Test data + environment strategy defined.

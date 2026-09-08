# API Endpoint Inventory — E-Commerce Playground (LambdaTest)

**Application:** [https://ecommerce-playground.lambdatest.io/](https://ecommerce-playground.lambdatest.io/)
**Discovery date:** 2026-09-05
**Methodology:** Direct inspection of live application — homepage/HTML route references, form `action` attributes, combined JavaScript bundle, and live `curl` requests observing real HTTP status codes, headers, and response bodies.

---

## 0. Architectural Facts (verified)

| Fact | Evidence |
|---|---|
| **Framework** | OpenCart (PHP) — page footer states "Powered by OpenCart". |
| **Web server** | `nginx` (response `Server: nginx`). |
| **Routing scheme** | All endpoints are OpenCart routes reached via `index.php?route=<controller/action>`. |
| **REST API** | ❌ None. No Swagger/OpenAPI spec, no JSON-REST API layer, no GraphQL. |
| **Response types** | Two: **HTML** (server-rendered pages / HTML fragments) and **JSON** (AJAX endpoints, `Content-Type: application/json`). |
| **Session mechanism** | `OCSESSID` session cookie (HttpOnly, `path=/`), plus `language=en-gb` and `currency=USD` cookies (`domain=ecommerce-playground.lambdatest.io`). |
| **Auth model** | Cookie/session based. Unauthenticated access to protected routes returns **302 → `account/login`** (verified for 11 routes). |
| **Security headers** | `X-Frame-Options: SAMEORIGIN` (observed on JSON + HTML responses). |
| **Theme** | `mz_poco` ("Megastore" Maza theme) — adds custom AJAX routes under `extension/maza/*` and `extension/mz_widget/*`. |

> **Important:** There is **no conventional REST/JSON API**. The "API" consists of (a) server-rendered **route endpoints** returning HTML, and (b) **AJAX endpoints** (mostly POST) returning JSON fragments consumed by the SPA-like cart/checkout/wishlist/compare flows. Both are part of the application contract and are covered below.

---

## 1. JSON AJAX Endpoints

These return `Content-Type: application/json` and are called by the theme's JavaScript (fetch/AJAX). Verifications noted where performed live.

| ID | Method | Endpoint (`index.php?route=…`) | Module | Purpose | Auth | Key request body / params | Success response | Risk | Priority |
|---|---|---|---|---|---|---|---|---|---|
| AJX-001 | POST | `checkout/cart/add` | Cart | Add product to cart | None (session) | `product_id`, `quantity`, `option[]`, `recurring_id` | `{"success":"…","total":"…","toast":"…"}` | Critical | Critical |
| AJX-002 | POST | `checkout/cart/edit` | Cart | Update cart line quantity | None (session) | `key`, `quantity` | `{"total":"…"}` | Critical | Critical |
| AJX-003 | POST | `checkout/cart/remove` | Cart | Remove cart line | None (session) | `key` | `{"total":"…"}` | Critical | Critical |
| AJX-004 | GET | `common/cart/info` | Cart | Cart drawer HTML fragment | None (session) | — | HTML fragment (not JSON) | High | High |
| AJX-005 | POST | `account/wishlist/add` | Wishlist | Add product to wishlist | **Required** (login) | `product_id` | JSON / redirect | Medium | Medium |
| AJX-006 | POST | `extension/maza/account/wishlist/remove` | Wishlist | Remove wishlist item | **Required** | `product_id` | JSON | Medium | Medium |
| AJX-007 | POST | `product/compare/add` | Compare | Add product to compare list | None (session) | `product_id` | JSON | Low | Medium |
| AJX-008 | POST | `extension/maza/product/compare/remove` | Compare | Remove from compare list | None (session) | `product_id` | JSON | Low | Low |
| AJX-009 | GET | `extension/maza/product/quick_view` | Product | Quick-view modal content | None | `product_id` | HTML fragment | Medium | Medium |
| AJX-010 | GET | `extension/maza/product/product/priceWithOptions` | Product | Price recalculation for options | None | `product_id` (+ option params) | JSON price | Medium | Medium |
| AJX-011 | POST | `product/product/getRecurringDescription` | Product | Recurring-profile description | None | `product_id`, `recurring_id`, `quantity` | JSON | Low | Low |
| AJX-012 | GET | `product/product/review` | Product | Review tab content | None | `product_id` | HTML | Low | Low |
| AJX-013 | POST | `product/product/write` | Product | Submit product review | None | `product_id`, `name`, `text`, `rating` | HTML redirect | Medium | Medium |
| AJX-014 | POST | `extension/maza/newsletter/subscribe` | Newsletter | Subscribe email | None | `email` | JSON | Low | Low |
| AJX-015 | POST | `extension/maza/newsletter/unsubscribe` | Newsletter | Unsubscribe email | None | `email` | JSON | Low | Low |
| AJX-016 | POST | `extension/mz_widget/contact_form/submit` | Contact | AJAX contact form submit | None | name/email/message fields | JSON | Medium | Medium |
| AJX-017 | GET | `account/register/customfield` | Account | Load custom fields per customer group | None | `customer_group_id` | JSON/HTML | Low | Low |
| AJX-018 | GET | `information/information/agree` | Information | Privacy-policy agreement modal | None | `information_id` | HTML | Low | Low |
| AJX-019 | POST | `tool/upload` | Tool | File upload (returns JSON) | None | `file` (multipart) | JSON `{"error":…,"url":…}` | High | Medium |
| AJX-020 | GET | `checkout/checkout/country` | Checkout | Country + zones lookup | None (session) | `country_id` | JSON `{"country_id","name","zone":[…]}` ✅ | Medium | Medium |
| AJX-021 | GET | `checkout/checkout/customfield` | Checkout | Checkout custom fields | None (session) | `customer_group_id` | JSON/HTML | Low | Low |
| AJX-022 | POST | `checkout/login/save` | Checkout | Login during checkout | None (guest) | `email`, `password` | JSON | Critical | Critical |
| AJX-023 | POST | `extension/maza/checkout/address/update` | Checkout | Update billing/shipping address | None (session) | address fields | JSON | High | High |
| AJX-024 | POST | `extension/maza/checkout/cart/update` | Checkout | Update cart from checkout | None (session) | cart line data | JSON | High | High |
| AJX-025 | POST | `extension/maza/checkout/payment_method/update` | Checkout | Select payment method | None (session) | `payment_method` | JSON | Critical | Critical |
| AJX-026 | POST | `extension/maza/checkout/shipping_method/update` | Checkout | Select shipping method | None (session) | `shipping_method` | JSON | High | High |
| AJX-027 | POST | `extension/maza/checkout/save` | Checkout | Confirm / place order | None (session) | checkout fields, `agree`, `comment` | JSON redirect | Critical | Critical |
| AJX-028 | POST | `extension/maza/checkout/total/update` | Checkout | Recalculate order totals | None (session) | — | JSON totals | Critical | Critical |
| AJX-029 | POST | `extension/total/coupon/coupon` | Checkout | Apply coupon code | None (session) | `coupon` | JSON `{"error":"…"}` / `{"success":…}` ✅ | High | High |
| AJX-030 | POST | `extension/total/voucher/voucher` | Checkout | Apply gift voucher | None (session) | `voucher` | JSON | High | High |
| AJX-031 | GET | `extension/maza/notification/…` | Extension | Theme notification polling | None | — | JSON | Low | Low |

✅ = live-verified response observed during discovery.

---

## 2. HTML Page Routes (server-rendered)

| ID | Method(s) | Endpoint (`index.php?route=…`) | Module | Purpose | Auth | Query/body params | Success | Risk | Priority |
|---|---|---|---|---|---|---|---|---|---|
| RTE-001 | GET | `common/home` | Common | Home page | None | — | 200 HTML | Low | High |
| RTE-002 | POST | `common/currency/currency` | Common | Switch currency | None | `code`, `redirect` | 302 redirect | Medium | Medium |
| RTE-003 | POST | `common/language/language` | Common | Switch language | None | `code`, `redirect` | 302 redirect | Medium | Medium |
| RTE-004 | GET | `product/category` | Product | Category listing | None | `path` | 200 HTML | Medium | High |
| RTE-005 | GET | `product/product` | Product | Product detail | None | `product_id` | 200 HTML | Medium | Critical |
| RTE-006 | GET | `product/search` | Product | Search results | None | `search`, `category_id`, `description`, `sub_category`, `sort`, `order`, `limit`, `page` | 200 HTML | High | Critical |
| RTE-007 | GET | `product/special` | Product | Special offers | None | `sort`, `order`, `limit`, `page` | 200 HTML | Low | Medium |
| RTE-008 | GET | `product/manufacturer/info` | Product | Brand/manufacturer products | None | `manufacturer_id` | 200 HTML | Low | Medium |
| RTE-009 | GET | `product/compare` | Product | Compare list page | None | — | 200 HTML | Low | Low |
| RTE-010 | GET | `information/information` | Information | Static info pages | None | `information_id` | 200 HTML | Low | Low |
| RTE-011 | GET/POST | `information/contact` | Information | Contact form | None | `name`, `email`, `enquiry` | 200 HTML | Medium | Medium |
| RTE-012 | GET/POST | `information/tracking` | Information | Order tracking | None | `order_id`, `email` | 200 HTML | Medium | Medium |
| RTE-013 | GET/POST | `account/login` | Account | Login | None (guest) | `email`, `password` | 200/302 HTML | Critical | Critical |
| RTE-014 | GET/POST | `account/register` | Account | Register | None (guest) | firstname, lastname, email, telephone, password, confirm, agree, customer_group_id | 200/302 HTML | Critical | Critical |
| RTE-015 | GET/POST | `account/forgotten` | Account | Password reset request | None | `email` | 200 HTML | High | High |
| RTE-016 | GET | `account/logout` | Account | Logout | None | — | 200 HTML | Medium | Medium |
| RTE-017 | GET | `account/account` | Account | Dashboard | **Required** | — | 200 HTML (302→login if guest) | High | High |
| RTE-018 | GET/POST | `account/edit` | Account | Edit profile | **Required** | firstname, lastname, email, telephone | 200 HTML | High | High |
| RTE-019 | GET/POST | `account/password` | Account | Change password | **Required** | `password`, `confirm` | 200 HTML | High | High |
| RTE-020 | GET/POST | `account/address` | Account | Address book | **Required** | address fields | 200 HTML | High | High |
| RTE-021 | GET | `account/address/delete` | Account | Delete address | **Required** | `address_id` | 302 | Medium | Medium |
| RTE-022 | GET | `account/wishlist` | Account | Wishlist page | **Required** | — | 200 HTML | Medium | Medium |
| RTE-023 | GET | `account/order` | Account | Order history | **Required** | `page` | 200 HTML | High | High |
| RTE-024 | GET | `account/order/info` | Account | Order details | **Required** | `order_id` | 200 HTML | High | High |
| RTE-025 | GET/POST | `account/return` | Account | Returns | **Required** | return fields | 200 HTML | Medium | Medium |
| RTE-026 | GET/POST | `account/newsletter` | Account | Newsletter preference | **Required** | — | 200 HTML | Low | Low |
| RTE-027 | GET | `account/download` | Account | Downloads | **Required** | — | 200 HTML | Medium | Medium |
| RTE-028 | GET | `account/reward` | Account | Reward points | **Required** | — | 200 HTML | Low | Low |
| RTE-029 | GET | `account/transaction` | Account | Transactions | **Required** | — | 200 HTML | Low | Low |
| RTE-030 | GET | `account/recurring` | Account | Recurring payments | **Required** | — | 200 HTML | Low | Low |
| RTE-031 | GET | `checkout/cart` | Checkout | Cart page | None (session) | — | 200 HTML | Critical | Critical |
| RTE-032 | GET | `checkout/checkout` | Checkout | Checkout page | None (session) | — | 200 HTML | Critical | Critical |
| RTE-033 | GET | `extension/maza/blog/home` | Blog | Blog home | None | — | 200 HTML | Low | Low |
| RTE-034 | GET | `extension/maza/blog/article` | Blog | Blog article | None | `blog_id` | 200 HTML | Low | Low |
| RTE-035 | GET | `extension/maza/blog/author` | Blog | Blog author | None | `author_id` | 200 HTML | Low | Low |
| RTE-036 | GET | `extension/maza/page` | Content | Static Maza page | None | `page_id` | 200 HTML | Low | Low |

---

## 3. Authentication / Authorization Model (verified)

| Condition | Behavior (verified) |
|---|---|
| Guest → protected account route | **302 redirect → `account/login`** (verified for `account/edit`, `account/password`, `account/address`, `account/order`, `account/return`, `account/newsletter`, `account/download`, `account/reward`, `account/transaction`, `account/recurring`, `account/wishlist`). |
| `account/logout` | Returns 200 (destroys session); no redirect. |
| Session identity | `OCSESSID` cookie; no JWT/OAuth/token scheme. |
| CSRF | OpenCart form submissions are session-bound; no visible `csrf_token` field observed in forms (session-cookie based). |

> No API keys, no `Authorization` header, no OAuth. Authorization is entirely session-cookie based. "Authentication headers" tests therefore map to cookie/session-presence tests rather than bearer-token tests.

---

## 4. HTTP Status Codes Observed

| Code | Observed context |
|---|---|
| 200 | All JSON AJAX endpoints (even on business errors, e.g. invalid coupon returns HTTP 200 with `{"error":…}`). HTML page routes. |
| 302 | Protected-route redirects to `account/login`; currency/language switch; form success redirects. |
| 404 | (Not directly observed during discovery — to be verified against invalid `product_id`, invalid route.) |
| 405 | (Expected only if unsupported method invoked — to be verified.) |

> **Key finding:** JSON AJAX endpoints return **HTTP 200** even for business-level failures (e.g. `extension/total/coupon/coupon` with an invalid code returns `200` + `{"error":"Warning: Coupon is either invalid, expired or reached its usage limit!"}`). Errors are signalled **in the response body**, not via 4xx/5xx status codes. This is a contract point to validate.

---

## 5. Module → Endpoint Map (summary)

- **Authentication**: `account/login`, `account/register`, `account/forgotten`, `account/logout`, `checkout/login/save`, `account/password`.
- **Account/Profile**: `account/account`, `account/edit`, `account/address` (+`delete`), `account/newsletter`, `account/wishlist`, `account/order`(+`info`), `account/return`, `account/download`, `account/reward`, `account/transaction`, `account/recurring`, `account/register/customfield`.
- **Product/Catalog**: `product/category`, `product/product`, `product/search`, `product/special`, `product/manufacturer/info`, `product/compare`, `product/compare/add`, `extension/maza/product/compare/remove`, `extension/maza/product/quick_view`, `extension/maza/product/product/priceWithOptions`, `product/product/getRecurringDescription`, `product/product/review`, `product/product/write`.
- **Cart**: `checkout/cart/add`, `checkout/cart/edit`, `checkout/cart/remove`, `common/cart/info`, `checkout/cart`.
- **Checkout/Order**: `checkout/checkout`, `checkout/checkout/country`, `checkout/checkout/customfield`, `extension/maza/checkout/{address/cart/payment_method/shipping_method/save/total}/update`, `extension/total/coupon/coupon`, `extension/total/voucher/voucher`.
- **Wishlist**: `account/wishlist/add`, `extension/maza/account/wishlist/remove`.
- **Newsletter/Contact**: `extension/maza/newsletter/{subscribe,unsubscribe}`, `extension/mz_widget/contact_form/submit`, `information/contact`.
- **Common**: `common/home`, `common/currency/currency`, `common/language/language`, `tool/upload`.
- **Information/Content**: `information/information`, `information/tracking`, `information/information/agree`, `extension/maza/page`, `extension/maza/blog/{home,article,author}`.

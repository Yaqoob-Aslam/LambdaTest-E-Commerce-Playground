# Exploratory Testing — Bug Report

**Application:** LambdaTest E-Commerce Playground
**URL:** https://ecommerce-playground.lambdatest.io/
**Testing type:** Unscripted, risk-based exploratory testing
**Date of testing:** 2026-09-29
**Tester role:** Senior QA / exploratory testing agent

---

## Environment (as actually used)

| Item | Value |
| --- | --- |
| Browser | Chromium 148.0.7778.280 (Electron 42.10.0 / VS Code 1.138.0 integrated browser) |
| Operating system | Linux x86_64 |
| Viewport | 1037 × 388 (visible browser pane), devicePixelRatio 1 |
| Time zone | Asia/Karachi |
| Application URL | https://ecommerce-playground.lambdatest.io/ |
| Session type | Live public demo; requests issued from the same browser session (same-origin), so session cookies were preserved |
| Server-reported date | 29/09/2026 |

**Test data created during testing:** one real customer account was registered on the shared demo so that
authenticated flows (checkout, order creation) could be exercised:

- E-mail: `qa.explore.1790674790204@example.com`
- Password: 21-character password (`Aa1!` + 17 × `x`)
- One order was placed (Order ID **#42383**) using Cash On Delivery. No payment instrument was used.

---

## Areas explored

Home page, mega menu / header navigation, product categories and listings, category sort & page-size
controls, pagination, product search (incl. advanced search), product details (quantity, availability,
wishlist, compare, add to cart), shopping cart (add / update / remove quantity, totals), coupon UI,
checkout (billing address, shipping method, payment method, terms), order placement, order history and
order detail, registration, login/logout, forgotten password, account dashboard, wishlist/compare access
control, session behaviour, HTTP status / network inspection, error handling for missing and malformed
URL parameters, and output encoding of user-supplied input.

**Not fully covered (stated honestly):** responsive behaviour at mobile/tablet viewports (the available
browser viewport was a fixed desktop-size pane), and coupon/Promotion validation, because no valid coupon
code exists in this environment (see Observations).

---

## Confirmed bugs

**Total: 7**

---

### Bug 1: Checkout and order totals overcharge the customer — Eco Tax is calculated for one extra unit

**Severity:** High
**Layer:** Both
**Environment:** Chromium 148.0.7778.280, Linux x86_64, viewport 1037 × 388 — https://ecommerce-playground.lambdatest.io/

**URL:**
- Cart total: https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart
- Checkout total: https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout
- Confirmed order: https://ecommerce-playground.lambdatest.io/index.php?route=account/order/info&order_id=42383

**Preconditions:**
A logged-in customer (account `qa.explore.1790674790204@example.com`) with the same product in the cart.
Product used: *iPhone* (`product_id=40`), unit price $123.20 (VAT-inclusive).
The same discrepancy was also observed in an anonymous (guest) checkout session with an identical cart,
so it is not specific to a logged-in customer.

**Steps to Reproduce:**

1. Add *iPhone* to the cart and set the cart quantity to **1**.
2. Open `index.php?route=checkout/cart` and record the totals: Sub-Total **$101.00**, Eco Tax (-2.00)
   **$2.00**, VAT (20%) $20.20, **Total $123.20**.
3. Open `index.php?route=checkout/checkout` (same cart, unchanged).
4. Record the totals: Sub-Total **$101.00**, Flat Shipping Rate $5.00, Eco Tax (-2.00) **$4.00**,
   VAT (20%) $21.20, **Total $131.20**.
5. Repeat step 1 with quantity **2** and **3** and compare the Eco Tax line between the two pages
   (cart: $4.00 / $6.00 — checkout: **$6.00 / $8.00**).
6. Optionally complete the order and open *My Account → Order History → Order Information*.

**Expected Result:**
The same cart must produce the same Eco Tax amount on every page and in the placed order. Eco Tax is a
fixed per-unit amount of $2.00, so it should be `quantity × $2.00` (as the cart page correctly computes:
$2.00 / $4.00 / $6.00 for 1 / 2 / 3 units). The checkout total should equal cart total + the selected
shipping rate.

**Actual Result:**
The checkout page (and the order that is finally created) charges Eco Tax for **one unit more than the
cart contains**:

| Quantity | Cart Eco Tax | Cart Total | Checkout Eco Tax | Checkout Total |
| --- | --- | --- | --- | --- |
| 1 | $2.00 | $123.20 | **$4.00** | $131.20 |
| 2 | $4.00 | $246.40 | **$6.00** | $254.40 |
| 3 | $6.00 | $369.60 | **$8.00** | $377.60 |

With quantity 2, the correct checkout total is 202.00 + 5.00 (shipping) + 4.00 (Eco Tax) + 41.40 (VAT)
= **$252.40**, but the app charges **$254.40** — a **$2.00 overcharge** on every order.

The overcharge is persisted in the order: Order **#42383** stores
`Sub-Total $202.00 | Flat Shipping Rate $5.00 | Eco Tax (-2.00) $6.00 | VAT (20%) $41.40 | Total $254.40`.

**Evidence:**

- URL: `index.php?route=checkout/cart` (qty 2) → `Sub-Total: $202.00`, `Eco Tax (-2.00): $4.00`, `Total: $246.40`
- URL: `index.php?route=checkout/checkout` (qty 2, same cart) → `Sub-Total: $202.00`, `Flat Shipping Rate: $5.00`, `Eco Tax (-2.00): $6.00`, `VAT (20%): $41.40`, `Total: $254.40`
- URL: `index.php?route=account/order/info&order_id=42383` → `Eco Tax (-2.00) $6.00`, `Total $254.40` (order status: Pending, 29/09/2026)
- Both pages are server-rendered: the cart response HTML contains the per-unit Eco Tax while the checkout
  response HTML contains the inflated Eco Tax for the identical server-side cart — i.e. the totals are
  produced by different server-side code paths.
- Guest (logged-out) session, qty 2: `index.php?route=checkout/checkout` → `Sub-Total: $202.00`,
  `Flat Shipping Rate: $5.00`, `Total: $254.40` — the same inflated figure as the authenticated session.
- API/network evidence: the checkout totals are returned by the theme's checkout endpoints
  (`index.php?route=extension/maza/checkout/save`, `index.php?route=extension/maza/checkout/confirm`,
  HTTP 200 in both cases).

**Why This Matters:**
Every customer is charged a higher amount than the cart page shows and higher than the correct total — a
direct monetary overcharge on every order.

**Reproducibility:** Reproduced 3/3 (quantities 1, 2 and 3), in both guest and authenticated sessions, and
independently confirmed in a real placed order (#42383).

---

### Bug 2: Missing or non-numeric required ID parameter returns HTTP 500 with a blank page

**Severity:** Medium
**Layer:** API
**Environment:** Chromium 148.0.7778.280, Linux x86_64 — https://ecommerce-playground.lambdatest.io/

**URL:**
- https://ecommerce-playground.lambdatest.io/index.php?route=product/product (no `product_id`)
- https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=abc
- https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=%20
- https://ecommerce-playground.lambdatest.io/index.php?route=extension/maza/blog/article&article_id=abc

**Preconditions:** None. Browser session can be anonymous.

**Steps to Reproduce:**

1. Request `index.php?route=product/product` with **no** `product_id` parameter, or with a
   **non-numeric** value such as `abc` or a single space.
2. Observe the HTTP response status and body.
3. Repeat with `index.php?route=extension/maza/blog/article&article_id=abc`.
4. For comparison, request `index.php?route=product/product&product_id=99999999` (non-existent but
   numeric) and `product_id=-1`.

**Expected Result:**
Missing or malformed parameters should be handled gracefully, exactly as the application already does for
other invalid identifiers: `product_id=99999999`, `product_id=-1`, `product_id=0` and `product_id=1abc`
all return **HTTP 404** with the friendly page *“Product not found!”*. A missing/non-numeric identifier
should follow the same path.

**Actual Result:**
The request returns **HTTP 500 (Internal Server Error) with a 0-byte body**, so the customer sees a
completely blank page instead of the “Product not found!” page.

| Request | Result |
| --- | --- |
| `route=product/product` | **500**, 0 bytes |
| `route=product/product&product_id=abc` | **500**, 0 bytes |
| `route=product/product&product_id=%20` | **500**, 0 bytes |
| `route=extension/maza/blog/article&article_id=abc` | **500**, 0 bytes |
| `route=product/product&product_id=99999999` | 404 “Product not found!” (correct) |
| `route=product/product&product_id=-1` | 404 “Product not found!” (correct) |
| `route=product/product&product_id=0` | 404 “Product not found!” (correct) |

**Evidence:**

- HTTP status codes captured in the live browser session: `{"route=product/product": [500, 500]}`,
  `{"route=product/product&product_id=abc": [500, 500]}`, `{"route=extension/maza/blog/article&article_id=abc": [500, 500]}`
- Response body length: **0 bytes** (empty document).
- Browser console logged: `Failed to load resource: the server responded with a status of 500 (Internal Server Error)`.
- Control group returning 404 + “Product not found!” page (68 826 bytes) proves graceful handling is the designed behaviour.

**Why This Matters:**
Any malformed or hand-edited product/blog link (or a crawler/link-checker hitting a stale URL) yields a
server error and a blank page instead of a usable “not found” page, and it pollutes monitoring with 5xx errors.

**Reproducibility:** Reproduced 2/2 in a dedicated repeat run (4/4 observations overall, identical status codes).

---

### Bug 3: Missing `manufacturer_id` returns HTTP 500 and discloses an internal server file path on the page

**Severity:** Medium
**Layer:** Both
**Environment:** Chromium 148.0.7778.280, Linux x86_64 — https://ecommerce-playground.lambdatest.io/

**URL:** https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info
(also reproducible with a non-numeric value: `…/info&manufacturer_id=abc`)

**Preconditions:** None. Reproducible anonymously.

**Steps to Reproduce:**

1. Navigate to `index.php?route=product/manufacturer/info` **without** the `manufacturer_id` parameter
   (or with a non-numeric value, e.g. `manufacturer_id=abc`).
2. Observe the HTTP status and the visible page content.

**Expected Result:**
The app should either resolve a default/listing page or show its standard, friendly error page
(e.g. “Brand not found!”, which it correctly returns for `manufacturer_id=9999` with HTTP 404). PHP
notices, warnings and internal filesystem paths must never be exposed to end users.

**Actual Result:**
The server responds with **HTTP 500** and the response body / rendered page contains a raw PHP notice
including an internal absolute path and the source file and line number:

```
Notice: Undefined index: manufacturer_id in /var/www/html/oc/catalog/controller/extension/maza/hooks/data.php on line 24
```

For `manufacturer_id=9999` the app correctly returns HTTP 404 with the page “Brand not found!”, so the
crash is specific to the missing/non-numeric parameter.

**Evidence:**

- HTTP 500, response body (141 bytes): `<b>Notice</b>: Undefined index: manufacturer_id in <b>/var/www/html/oc/catalog/controller/extension/maza/hooks/data.php</b> on line <b>24</b>`
- Rendered in the browser (screenshot captured during the session): the page displays only the notice text
  `Notice: Undefined index: manufacturer_id in /var/www/html/oc/catalog/controller/extension/maza/hooks/data.php on line 24`
- URL that triggers it: `index.php?route=product/manufacturer/info`
- Correct control: `index.php?route=product/manufacturer/info&manufacturer_id=9999` → HTTP 404, “Brand not found!”

**Why This Matters:**
Users see a raw server error instead of a usable page, and the application exposes internal server
filesystem paths and source-code line numbers that help an attacker map the backend.

**Reproducibility:** Reproduced 3/3.

---

### Bug 4: Cart accepts a non-numeric quantity and silently deletes the product

**Severity:** Medium
**Layer:** UI
**Environment:** Chromium 148.0.7778.280, Linux x86_64, viewport 1037 × 388 — https://ecommerce-playground.lambdatest.io/

**URL:** https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart

**Preconditions:** A shopping cart containing at least one product (e.g. *iPhone*, `product_id=40`).

**Steps to Reproduce:**

1. Add any product to the cart and open `index.php?route=checkout/cart`.
2. In the product’s **Qty** field, type a non-numeric value such as `abc` (the field is a plain text
   input and accepts letters).
3. Click the **Update** button (the blue icon button in the same row).
4. Observe the cart.

**Expected Result:**
The cart should reject invalid quantity input and tell the user why (e.g. “Quantity must be a number
greater than 0”), leaving the cart contents unchanged. Note the product page’s quantity field is a
`type="number"` input with `min="1"`, so numeric input is the intended contract.

**Actual Result:**
The non-numeric value is accepted, treated as zero, and the product is **silently removed from the cart**
with no validation message and no confirmation. The cart simply becomes empty (“Your shopping cart is
empty!”, Total $0.00). A user who mistypes a quantity loses the cart line without any explanation.

**Evidence:**

- Cart quantity field markup: `<input type="text" name="quantity[249946]" value="1">` (free text, no
  `min`/`max`/`pattern`), while the product page uses `<input type="number" name="quantity" min="1" step="1">`.
- Update request: `POST index.php?route=checkout/cart` → HTTP 302, after which the page shows
  “Your shopping cart is empty!” and 0 quantity inputs.
- No warning/error element is rendered (`anyWarning: false`).

**Why This Matters:**
A single typo in the quantity field destroys the customer’s cart line without warning, which is a silent
data-loss / usability defect in a critical commerce workflow.

**Reproducibility:** Reproduced 3/3 (each attempt: 1 item before update → 0 items after, no message).

---

### Bug 5: Array-style `search[]` parameter leaks PHP notices and inserts raw markup into the search field

**Severity:** Low
**Layer:** Both
**Environment:** Chromium 148.0.7778.280, Linux x86_64 — https://ecommerce-playground.lambdatest.io/

**URL:** https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search[]=phone

**Preconditions:** None. Reproducible anonymously.

**Steps to Reproduce:**

1. Navigate to `index.php?route=product/search&search[]=phone` (array-style parameter instead of
   `search=phone`).
2. Observe the page heading, the body text and the contents of the search input fields.

**Expected Result:**
A malformed `search` parameter should be normalised or rejected (e.g. treated as an empty search or
ignored), and no PHP diagnostics or internal paths should appear on the page. The search box should
contain plain text only.

**Actual Result:**
The page renders multiple raw PHP diagnostics, including absolute internal paths, and the literal string
`Array` is used as the search term. The page heading becomes **“Search - Array”** and the search input’s
`value` attribute contains raw HTML markup:

```
Notice: Array to string conversion in /var/www/html/storage/modification/catalog/controller/product/search.php on line 69
Warning: html_entity_decode() expects parameter 1 to be string, array given in /var/www/html/storage/modification/catalog/controller/product/search.php on line 102
Notice: Array to string conversion in /var/www/html/storage/cache/template/95/951c1e78a8d64e5dbdc0f558dd8df9c9ba155e05460f7aa3a1a4947fd8d80547.php on line 85
```

Input field value observed:
`<b>Notice</b>: Array to string conversion in <b>/var/www/html/storage/cache/template/95/951c…php</b> on line <b>85</b>Array`

**Evidence:**

- `document.title` and `<h1>` = `Search - Array`
- Rendered body text begins: `Notice: Array to string conversion in /var/www/html/storage/modification/catalog/controller/product/search.php on line 69Warning: html_entity_decode() expects parameter 1 to be string, array given …`
- Search inputs contain the markup shown above.
- Scope check performed: the leak does **not** persist into other pages — normal requests
  (`route=product/search&search=phone`, `route=common/home`, `route=product/category&path=20`)
  afterwards contained no notices, so the templates are not permanently corrupted.
- Output-encoding check (non-destructive): `search=a"b<c>d'e` is correctly escaped in the response
  (`value="a&quot;b&lt;c&gt;d'e"`), i.e. **no XSS was demonstrated** — reported as markup/notice leakage only.

**Why This Matters:**
The page exposes internal filesystem paths and PHP diagnostics to users, and displays an
engine-internal string (“Array”) instead of the customer’s search term.

**Reproducibility:** Reproduced 2/2 (direct request and full browser navigation).

---

### Bug 6: Registration accepts a password longer than the stated 20-character maximum

**Severity:** Low
**Layer:** UI
**Environment:** Chromium 148.0.7778.280, Linux x86_64 — https://ecommerce-playground.lambdatest.io/

**URL:** https://ecommerce-playground.lambdatest.io/index.php?route=account/register

**Preconditions:** None. The e-mail address used must not already be registered.

**Steps to Reproduce:**

1. Open `index.php?route=account/register`.
2. Fill in valid data and, in **Password** and **Password Confirm**, enter a **21-character** password
   (e.g. `Aa1!xxxxxxxxxxxxxxxxx`).
3. Tick the Privacy Policy checkbox and submit.
4. Log out, then log in again with the same 21-character password.

**Expected Result:**
The application states its own rule when submitting an empty form: *“Password must be between 4 and 20
characters!”*. A 21-character password should therefore be rejected with that message and no account
should be created.

**Actual Result:**
The form is submitted successfully (HTTP 302 → `index.php?route=account/success`,
*“Your Account Has Been Created!”*) with a 21-character password. The password is stored in full, not
truncated: logging in with the full 21-character password succeeds, while the same password truncated to
20 characters fails with *“Warning: No match for E-Mail Address and/or Password.”* The password field also
has no `maxlength` attribute.

**Evidence:**

- Submitting the empty form shows the app’s own rule: `Password must be between 4 and 20 characters!`
- 21-character password submission → HTTP 302 → `index.php?route=account/success`, page text
  `Your Account Has Been Created!`, no errors.
- Login with the 21-character password → `index.php?route=account/account` (“My Account”, logout link present).
- Login with the same password truncated to 20 characters → `Warning: No match for E-Mail Address and/or Password.`
- Field markup: `<input type="password" name="password" id="input-password">` — no `maxlength`.

**Why This Matters:**
The documented/displayed validation rule is not the rule that is enforced, so password-policy
requirements (e.g. a maximum length for hashing/DoS protection) cannot be relied upon. (No security
impact was demonstrated beyond the rule mismatch — only the inconsistency is reported.)

**Reproducibility:** Reproduced 1/1 registration + 1/1 subsequent login (2/2 observations).

---

### Bug 7: “Forgot Your Password?” reveals whether an e-mail address is registered

**Severity:** Low
**Layer:** UI
**Environment:** Chromium 148.0.7778.280, Linux x86_64 — https://ecommerce-playground.lambdatest.io/

**URL:** https://ecommerce-playground.lambdatest.io/index.php?route=account/forgotten

**Preconditions:** Anonymous session. One registered e-mail address is available for comparison
(`qa.explore.1790674790204@example.com`).

**Steps to Reproduce:**

1. Log out and open `index.php?route=account/forgotten`.
2. Enter a **registered** e-mail address and submit → note the message.
3. Enter a **non-registered** e-mail address (e.g. `definitely.not.registered.9911@example.com`) and submit.
4. Compare the two messages.

**Expected Result:**
For a password-reset request the app should respond with a neutral, identical message for both cases
(e.g. “If an account exists for that address, a reset link has been sent”), so that the response cannot be
used to discover which e-mail addresses have accounts.

**Actual Result:**
The responses differ and unambiguously disclose whether the address exists:

- Registered address → *“An email with a confirmation link has been sent your email address.”*
  (then redirected to `index.php?route=account/login`)
- Non-registered address → *“Warning: The E-Mail Address was not found in our records, please try again!”*
  (stays on `index.php?route=account/forgotten`)

**Evidence:**

- A/B comparison, run twice, identical results:
  - existing → `An email with a confirmation link has been sent your email address.`
  - missing → `Warning: The E-Mail Address was not found in our records, please try again!`
- The missing-address case also stays on the forgotten-password URL while the existing-address case
  redirects to the login page, giving a second, independently observable signal.

**Why This Matters:**
An attacker can validate a list of e-mail addresses against the store (account enumeration), which is a
prerequisite for targeted credential-stuffing and phishing.

**Reproducibility:** Reproduced 2/2.

---

## Important observations (verified, not classified as defects)

1. **Why the existing automated checkout tests time out — no application defect.** The checkout
   “Continue” button does not perform a normal form navigation. It issues an AJAX `POST` to
   `index.php?route=extension/maza/checkout/save` (HTTP 200) and renders validation errors inline, and
   then advances to `index.php?route=extension/maza/checkout/confirm` (which exposes the
   `#button-confirm` “Confirm Order” button). Automation that waits for a browser navigation (e.g.
   `waitForURL`) on the first click will time out even though the app behaves correctly. Validation
   itself works: submitting the address with empty required fields produced visible inline errors
   (“First Name must be between 1 and 32 characters!”, “Last Name must be between 1 and 32 characters!”,
   “Address 1 must be between 3 and 128 characters!”, “City must be between 2 and 128 characters!”,
   “Postcode must be between 2 and 10 characters!”) plus “Warning: You must agree to the Terms & Conditions!”.
2. **Empty `required` attributes.** Registration and checkout inputs do not carry the HTML `required`
   attribute; validation is applied server-side (and produces the correct messages). This is an
   accessibility/robustness gap (screen-reader users are not told which fields are mandatory) but it did
   **not** allow submitting invalid data, so it is not reported as a functional defect.
3. **Message typo.** The password-reset confirmation reads “An email with a confirmation link has been
   sent your email address.” (missing the word “to”). Cosmetic — listed only as an observation.
4. **Out-of-stock handling is correct.** *MacBook Air* (`product_id=44`) shows “Out Of Stock” and its
   Add to Cart button is not rendered, so no add-to-cart is possible. Verified, no defect.
5. **Output encoding is correct.** `search=a"b<c>d'e` is escaped in the response; no XSS was demonstrated.
   No security vulnerability is reported beyond the information-disclosure findings above.
6. **Access control behaves correctly.** Anonymous requests to `route=account/account`,
   `route=account/edit`, `route=account/wishlist`, `route=account/order`,
   `route=account/order/info&order_id=42383` all redirect to `index.php?route=account/login`.
   Customers of a logged-in session are also redirected away from `route=account/forgotten`.
7. **Unbounded `limit` parameter (observation only).** `route=product/category&path=20&limit=100000`
   returns HTTP 200 with a 687 KB listing, bypassing the page-size options offered in the UI
   (10–100). No measurable performance harm was demonstrated in this environment, so it is reported as
   an observation rather than a defect.
8. **Miscellaneous non-defects verified.** `page=-1`, `page=abc`, `limit=abc`, `sort=abc` all return
   HTTP 200 with the default listing (acceptable normalisation); `information/information&information_id=abc`
   returns HTTP 404 with the friendly “Information Page Not Found!” page; `information/tracking` returns
   HTTP 404 (no such page exists in this store); `product_id=-1/0/1abc/99999999` return HTTP 404 with
   “Product not found!”.
9. **Coupon/Promotion testing inconclusive.** The coupon input exists in the DOM
   (`input[name="coupon"]`, `#button-coupon`) inside the collapsed “Use Coupon Code” section, but it could
   not be brought into a usable state during this session and no valid coupon code exists in this
   environment. No coupon defect is claimed either way.

---

## Exploratory Testing Summary

**Application:** LambdaTest E-Commerce Playground
**URL:** https://ecommerce-playground-lambdatest.io/

### Areas Explored

Authentication (registration, login, logout, forgotten password), Account Management, Session/State,
Product Catalog, Product Details, Search, Categories, Sorting / Page-size, Shopping Cart, Wishlist,
Product Comparison, Checkout, Shipping, Payment (Cash On Delivery), Order Creation, Order History,
Pricing & Calculations, Navigation, Error handling for malformed URLs, API/Network behaviour, Output
encoding. *(Responsive/mobile viewports and Coupon validation were not fully covered — see Areas explored
and Observation 9.)*

### Confirmed Bugs

**Total:** 7

### Severity

- Critical: 0
- High: 1
- Medium: 3
- Low: 3

### Layer

- UI: 3
- API: 1
- Both: 3

### Defect list at a glance

| # | Title | Severity | Layer | Repro |
| --- | --- | --- | --- | --- |
| 1 | Checkout/order overcharges: Eco Tax computed for one extra unit | High | Both | 3/3 + order #42383 |
| 2 | Missing/non-numeric required ID → HTTP 500, blank page | Medium | API | 2/2 (4/4 obs.) |
| 3 | Missing `manufacturer_id` → HTTP 500 + internal path disclosed | Medium | Both | 3/3 |
| 4 | Cart accepts non-numeric quantity and silently deletes the item | Medium | UI | 3/3 |
| 5 | `search[]` array parameter → PHP notices + raw markup in field | Low | Both | 2/2 |
| 6 | Registration accepts a password longer than the stated maximum | Low | UI | 2/2 obs. |
| 7 | Forgot Password reveals whether an e-mail is registered | Low | UI | 2/2 |

### Important Observations

- The numeric totals bug (Bug 1) is the highest business impact: it affects **every** order and every
  quantity, and the incorrect amount is stored on the order record.
- All three HTTP 500 findings (Bugs 2 and 3) share one class of root cause — an unvalidated required
  parameter reaching the ORM/controller — but they were kept separate because the manifestations differ
  (blank body vs. leaked PHP notice with internal path) and they originate in different controllers.
- Bugs 2, 3 and 5 all disclose internal server paths (`/var/www/html/oc/...`, `/var/www/html/storage/...`),
  which indicates the store is running with PHP notices/warnings displayed.
- The existing automated checkout failures are explained by the AJAX checkout flow, not by an application
  defect (Observation 1) — the checkout validation and order creation both work correctly.
- All findings were reproduced against the live site; no hypothetical issue, no unverified security claim
  and no fabricated evidence is included. Anything that could not be confirmed (coupon behaviour,
  responsive layout) is explicitly marked as not covered.

# Cart API Test Plan

**Module:** Cart · **App:** ecommerce-playground.lambdatest.io
**Endpoints covered:** `checkout/cart/add`, `checkout/cart/edit`, `checkout/cart/remove`, `common/cart/info`, `checkout/cart` (page).

> Verified contract: `checkout/cart/add` returns `Content-Type: application/json`. Empty payload → `[]`. Valid → `{"success":"…","total":"…","toast":"…"}`.

---

## 1. Add to Cart (`checkout/cart/add`) — POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CART-P-001 | Add valid product | `product_id=28&quantity=1` | `{"success":…,"total":"1 item(s) - $146.00"}` | Positive | Critical |
| CART-P-002 | Add with quantity | `quantity=5` | total = 5× price | Positive | Critical |
| CART-P-003 | Add multiple products | two different ids | total sums correctly | Positive | High |
| CART-N-001 | No payload | — | `[]` (200) | Negative | High |
| CART-N-002 | Missing product_id | `quantity=1` | JSON error/empty | Negative | Critical |
| CART-N-003 | Nonexistent product_id | `product_id=999999` | JSON error/ignored | Negative | High |
| CART-N-004 | Negative/zero qty | `quantity=-1`, `0` | Rejected or clamped to 1 | Negative | High |
| CART-N-005 | String/boolean qty | `quantity=abc`, `true` | Rejected/clamped | Negative | Medium |
| CART-N-006 | Decimal qty | `quantity=1.5` | Rejected/clamped | Negative | Medium |
| CART-B-001 | Qty boundary | `1`, `max`, `max+1`, huge | Clamped/rejected at limit | Boundary | Medium |
| CART-N-007 | Malformed JSON | raw invalid body | Handled (no 500) | Negative | Low |
| CART-N-008 | Wrong Content-Type | `text/plain` | Still parses or errors | Negative | Low |
| CART-SEC-001 | Injection in product_id | `1 OR 1=1` | No bypass | Security | Medium |

## 2. Edit Cart (`checkout/cart/edit`) — POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CART-P-004 | Increase quantity | valid `key` + `quantity` | Updated `total` | Positive | Critical |
| CART-P-005 | Decrease quantity | qty lower | Updated total | Positive | High |
| CART-N-009 | Missing `key` | `quantity=2` | JSON error | Negative | High |
| CART-N-010 | Invalid `key` | tampered key | JSON error | Negative | Medium |
| CART-N-011 | Qty to 0 | `quantity=0` | Removed or rejected (verify) | Negative | High |
| CART-B-002 | Qty boundaries | max/max+1 | Rejected/clamped | Boundary | Medium |

## 3. Remove Cart (`checkout/cart/remove`) — POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CART-P-006 | Remove item | valid `key` | `{"total":…}` reduced | Positive | Critical |
| CART-N-012 | Missing/invalid `key` | `""`/tampered | JSON error | Negative | High |
| CART-N-013 | Remove nonexistent | random key | No crash / error | Negative | Low |

## 4. Cart Info (`common/cart/info`) — GET (HTML fragment)

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CART-P-007 | Empty cart | HTML "Your shopping cart is empty!" + `$0.00` | Positive | Medium |
| CART-P-008 | Non-empty cart | Drawer shows count + subtotal matching add/edit | Positive | High |

## 5. Cart Page (`checkout/cart`) — GET

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CART-P-009 | Non-empty cart page | Product list, quantity, totals | Positive | High |
| CART-P-010 | Empty cart page | "Your shopping cart is empty!" + Continue | Positive | Medium |

## 6. Idempotency & Concurrency

| ID | Scenario | Expected | Type |
|---|---|---|---|
| CART-I-001 | Repeated add (same product) | Quantity increments (non-idempotent) — verify | Idempotency |
| CART-I-002 | Repeated edit (same qty) | Stable total (idempotent) — verify | Idempotency |
| CART-C-001 | Concurrent add/edit/remove | No lost update (controlled env only) | Concurrency |

## 7. Data Integrity & UI Consistency

| ID | Scenario | Expected |
|---|---|---|
| CART-D-001 | add → `common/cart/info` count/subtotal matches | Drawer total == JSON `total` |
| CART-D-002 | add → cart page totals match | Price × qty == subtotal/total |
| CART-D-003 | Price consistency | Listing price == cart line price (no drift) |

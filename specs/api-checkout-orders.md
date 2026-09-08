# Checkout & Order API Test Plan

**Module:** Checkout/Order · **App:** ecommerce-playground.lambdatest.io
**Endpoints covered:** `checkout/checkout`, `checkout/checkout/country`, `checkout/checkout/customfield`, `checkout/login/save`, `extension/maza/checkout/address/update`, `extension/maza/checkout/cart/update`, `extension/maza/checkout/payment_method/update`, `extension/maza/checkout/shipping_method/update`, `extension/maza/checkout/save`, `extension/maza/checkout/total/update`, `extension/total/coupon/coupon`, `extension/total/voucher/voucher`, `account/order`, `account/order/info`, `information/tracking`.

> Verified: `checkout/checkout/country?country_id=222` → JSON `{"country_id":"222","name":"United Kingdom","iso_code_2":"GB","iso_code_3":"GBR","postcode_required":"1","zone":[…]}`. `extension/total/coupon/coupon` (POST `coupon=TEST`) → HTTP 200 `{"error":"Warning: Coupon is either invalid, expired or reached its usage limit!"}`.

---

## 1. Checkout Page (`checkout/checkout`) — GET

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-P-001 | With items in cart | 200, account options + billing/delivery/payment sections | Positive | Critical |
| CO-N-001 | Empty cart | Redirect to cart page ("Your shopping cart is empty") | Negative | Critical |

## 2. Country/Zone Lookup (`checkout/checkout/country`) — GET (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CO-P-002 | Valid country | `country_id=222` | JSON with `name`, `zone[]` | Positive | Medium |
| CO-N-002 | Missing country_id | — | Empty/error JSON | Negative | Medium |
| CO-N-003 | Nonexistent/negative id | `999999`, `-1` | Empty/error (no 500) | Negative | Low |

## 3. Custom Fields (`checkout/checkout/customfield`) — GET

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-P-003 | Load per customer group | Fields JSON/HTML | Positive | Low |

## 4. Address Update (`extension/maza/checkout/address/update`) — POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CO-P-004 | Valid billing/shipping | full address | JSON success; totals refresh | Positive | High |
| CO-N-004 | Missing required fields | no firstname/city/country | JSON error | Negative | High |
| CO-N-005 | Invalid postcode format | `abc` vs numeric | Error/validation | Negative | Medium |
| CO-N-006 | Invalid country/zone combo | wrong zone for country | Error | Negative | Medium |

## 5. Shipping / Payment Method (`…/shipping_method/update`, `…/payment_method/update`) — POST

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-P-005 | Select valid shipping method | JSON success; totals update | Positive | High |
| CO-P-006 | Select valid payment method | JSON success | Positive | Critical |
| CO-N-007 | Invalid/empty method value | JSON error | Negative | High |
| CO-N-008 | No shipping method available | Error/blocking message | Negative | Medium |

## 6. Coupon / Voucher (`extension/total/coupon/coupon`, `extension/total/voucher/voucher`) — POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CO-P-007 | Valid coupon | known valid code | `{"success":…}`; totals reduced | Positive | High |
| CO-N-009 | Invalid coupon | `TEST` | 200 + `{"error":"Warning: Coupon is either invalid, expired or reached its usage limit!"}` | Negative | High |
| CO-N-010 | Empty coupon | `coupon=` | JSON error | Negative | Medium |
| CO-N-011 | Expired/limit-reached coupon | — | JSON error | Negative | Medium |
| CO-P-008 | Valid voucher | known valid voucher | success; totals reduced | Positive | Medium |
| CO-N-012 | Invalid/empty voucher | `""`/`bad` | JSON error | Negative | Medium |

## 7. Totals Update (`extension/maza/checkout/total/update`) — POST

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-P-009 | Recalc after coupon/shipping | Correct subtotal/shipping/total JSON | Positive | Critical |
| CO-N-013 | Update without cart | Error/empty | Negative | Medium |

## 8. Place Order (`extension/maza/checkout/save`) — POST (JSON)

| ID | Scenario | Precondition | Expected | Type | Priority |
|---|---|---|---|---|---|
| CO-P-010 | Guest checkout valid | cart + address + shipping + payment + agree=1 | JSON success/redirect; order created | Positive | Critical |
| CO-P-011 | Logged-in checkout | session | Order linked to account | Positive | Critical |
| CO-N-014 | Missing required field | omit address/agree | JSON error; order not created | Negative | Critical |
| CO-N-015 | No payment method | — | Error/blocking | Negative | Critical |
| CO-N-016 | `agree=0` (terms) | — | Error "You must agree to terms" | Negative | Critical |
| CO-N-017 | Invalid payment data | bad card/fields | Error; no order | Negative | High |
| CO-I-001 | Double submit (repeat save) | same cart | Only one order created (verify idempotency) | Idempotency | Critical |

## 9. Order History / Details (`account/order`, `account/order/info`) — GET (auth required)

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-P-012 | Order history | 200; lists orders | Positive | High |
| CO-P-013 | Order details | `order_id` valid → 200 with items/totals/status | Positive | High |
| CO-N-018 | Guest → order history | 302 → login | Negative | Critical |
| CO-SEC-001 | Cross-account order info | User A → User B `order_id` → denied | Security | Critical |
| CO-N-019 | Nonexistent order_id | `999999` | Error/empty | Negative | Medium |

## 10. Order Tracking (`information/tracking`) — GET/POST

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| CO-P-014 | Valid tracking | `order_id` + matching email | Order status shown | Positive | Medium |
| CO-N-020 | Invalid order_id / email | mismatch | Error "no match" | Negative | Medium |
| CO-N-021 | Empty fields | — | Validation error | Negative | Low |

## 11. End-to-End Workflow

```
add to cart → cart/info → checkout/country → address/update
→ shipping_method/update → payment_method/update → coupon (optional)
→ total/update → checkout/save → order history → order/info → tracking
```

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| CO-WF-001 | Full guest checkout journey | Order created; totals consistent end-to-end | Workflow | Critical |
| CO-WF-002 | Full logged-in journey | Order linked to account; history shows it | Workflow | Critical |
| CO-WF-003 | Coupon journey | Coupon discount reflected in totals and order | Workflow | High |

## 12. Data Integrity

| ID | Scenario | Expected |
|---|---|---|
| CO-D-001 | Total consistency | subtotal + shipping − discount == total across total/update and save |
| CO-D-002 | Order persistence | After save, `account/order/info` returns same items/quantities/totals |
| CO-D-003 | UI-API consistency | Checkout page totals == JSON totals == order confirmation |

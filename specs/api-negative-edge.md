# API Negative & Edge Test Plan

**Scope:** Cross-cutting negative, boundary, edge, and security-oriented scenarios applicable to **all discovered endpoints**. Module-specific negatives are in `specs/api-{authentication,products,cart,checkout-orders}.md`.

---

## 1. Missing / Null / Empty Parameter Matrix (applied to every POST endpoint)

| ID | Scenario | Test Data | Expected |
|---|---|---|---|
| NEG-001 | Missing required field | omit one required field | Field-specific error (JSON `{"error":…}` or form validation) |
| NEG-002 | Multiple missing fields | omit all | Error; no partial state change |
| NEG-003 | Empty string | `field=""` | Rejected/validation error |
| NEG-004 | Null value | `field=null` | Treated as missing; error |
| NEG-005 | Whitespace only | `field="   "` | Rejected or trimmed |
| NEG-006 | Zero value | `id=0`, `quantity=0` | Rejected/clamped |

## 2. Invalid Values

| ID | Scenario | Test Data | Expected |
|---|---|---|---|
| NEG-007 | Nonexistent ID | `product_id/order_id/category_id=999999` | Error/empty, no 500 |
| NEG-008 | Negative ID | `-1` | Rejected/empty |
| NEG-009 | Decimal ID | `1.5` | Rejected/empty |
| NEG-010 | String instead of int | `abc` | Type handling, no 500 |
| NEG-011 | Boolean instead of string | `true` | Handled |
| NEG-012 | Array instead of object / object instead of array | `[]`, `{}` | Handled |

## 3. Request Body & Format

| ID | Scenario | Expected |
|---|---|---|
| NEG-013 | Malformed JSON | Parsed gracefully; no 500 |
| NEG-014 | Invalid JSON (truncated) | No 500 |
| NEG-015 | Extra unknown fields | Ignored or rejected (verify) |
| NEG-016 | Incorrect field names | Ignored; required field still validated |
| NEG-017 | Wrong Content-Type | `text/plain`, `multipart/form-data` vs `application/x-www-form-urlencoded` |

## 4. HTTP Method Validation

| ID | Scenario | Expected |
|---|---|---|
| NEG-018 | GET on POST endpoint | 405 or HTML render (verify actual) |
| NEG-019 | POST on GET endpoint | 405/redirect (verify) |
| NEG-020 | DELETE/PUT/PATCH | **405** (OpenCart has no REST mutators) |
| NEG-021 | OPTIONS | Observe `Allow` header / status |

## 5. Query Parameter Abuse (`product/search`, `product/category`)

| ID | Scenario | Expected |
|---|---|---|
| EDGE-001 | Duplicate parameter | `search=a&search=b` → last/first wins (verify) |
| EDGE-002 | Special characters | `<`, `>`, `&`, `%`, `+` URL-encoded | Encoded correctly, no injection |
| EDGE-003 | Case sensitivity | `sort=Name` vs `name` | Defined behavior |
| EDGE-004 | Parameter order | reordered params → same result | Consistent |
| EDGE-005 | Very large values | `limit=999999999`, huge page | Clamped/empty |

## 6. Boundary Values (per field type)

| Type | Values |
|---|---|
| Numeric | `-1`, `0`, `1`, `min`, `max`, `max+1`, very large, decimal |
| String | empty, `1 char`, min length, max length, `max+1`, very long (1000+ chars) |
| Array/options | empty, 1 item, max, `max+1`, duplicates |

## 7. Header / Session Validation

| ID | Scenario | Expected |
|---|---|---|
| EDGE-006 | Missing session cookie | Guest behavior (redirect/error) |
| EDGE-007 | Tampered `OCSESSID` | Session rejected; treated as guest |
| EDGE-008 | Duplicate headers | Handled |
| EDGE-009 | `Accept` variations | `application/json` vs `text/html` — response consistent |

## 8. Security-Oriented Functional Payloads (non-destructive)

| ID | Payload | Target | Expected |
|---|---|---|---|
| SEC-001 | `'` | search/coupon/register/login | No SQL error leakage |
| SEC-002 | `"` | all string fields | Handled |
| SEC-003 | `<script>alert(1)</script>` | search/review/contact/register | Escaped, not executed |
| SEC-004 | `../../` | file paths / ids | No traversal |
| SEC-005 | `${test}` | template-ish fields | No template injection |
| SEC-006 | Long overflow string | all | No crash; bounded |

## 9. Error Handling Verification

| ID | Condition | Assert |
|---|---|---|
| ERR-001 | Business error (bad coupon) | HTTP 200 + `{"error":…}` (documented contract) |
| ERR-002 | Validation error | Predictable message; no stack trace |
| ERR-003 | Auth failure (guest) | 302 → login, not 401 JSON |
| ERR-004 | Resource not found | Empty/error; no DB details |
| ERR-005 | No sensitive data | No password/token/PII/debug in responses |

## 10. Idempotency & Concurrency (controlled env only)

| ID | Scenario | Expected |
|---|---|---|
| IDEM-001 | Repeated GET | Idempotent |
| IDEM-002 | Repeated `cart/add` | Quantity increments (non-idempotent) |
| IDEM-003 | Repeated `checkout/save` | Single order |
| CONC-001 | Concurrent cart updates | No lost update |
| CONC-002 | Concurrent order placement | No duplicate order |

## 11. Schema Strictness

| ID | Scenario | Expected |
|---|---|---|
| SCH-001 | JSON response field set exact | No unexpected fields |
| SCH-002 | Field types correct | `success` string, `total` string, `zone` array |
| SCH-003 | Nullability correct | No unexpected nulls |
| SCH-004 | No debug/stack/DB info | Clean error bodies |

## 12. Pagination (search/category/special/order history)

| ID | Scenario | Expected |
|---|---|---|
| PAG-001 | First/last page | Correct records |
| PAG-002 | page=0 / negative / huge | Clamped/first/empty |
| PAG-003 | limit=0/1/max/max+1 | Validated/clamped |
| PAG-004 | No duplicate/missing records across pages | Consistent dataset |

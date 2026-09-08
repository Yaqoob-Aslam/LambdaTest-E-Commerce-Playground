# Authentication API Test Plan

**Module:** Authentication · **App:** ecommerce-playground.lambdatest.io
**Endpoints covered:** `account/login`, `account/register`, `account/forgotten`, `account/logout`, `checkout/login/save`, `account/password`, `account/edit`.

> Auth model: session-cookie (`OCSESSID`). Protected routes redirect (302) to `account/login` for guests. No bearer tokens.

---

## 1. Login (`account/login`) — GET page / POST submit

| ID | Method | Scenario | Precondition | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|---|---|
| AUTH-P-001 | POST | Valid credentials | Registered user | valid email+password | 302 → `account/account`; session set | Positive | Critical |
| AUTH-P-002 | GET | Login page renders | None | — | 200 HTML, `#input-email`, `#input-password` present | Positive | High |
| AUTH-N-001 | POST | Empty email | — | `""` + valid pw | Error "Warning: No match for E-Mail Address and/or Password" | Negative | Critical |
| AUTH-N-002 | POST | Empty password | — | valid email + `""` | Error | Negative | Critical |
| AUTH-N-003 | POST | Both empty | — | `""`/`""` | Error | Negative | Critical |
| AUTH-N-004 | POST | Invalid email format | — | `not-an-email` | Error | Negative | High |
| AUTH-N-005 | POST | Wrong password | valid email | wrong pw | Error | Negative | Critical |
| AUTH-N-006 | POST | Unknown email | — | `nobody@example.com` | Error | Negative | High |
| AUTH-N-007 | POST | Repeated failed logins | 5 attempts | bad pw | Observe behavior (no lockout evidence) | Negative | Medium |
| AUTH-B-001 | POST | Email length boundary | — | 1-char / max-length email | Error/validation | Boundary | Low |
| AUTH-SEC-001 | POST | SQL/script injection in email | — | `' OR 1=1 --`, `<script>` | No auth bypass; error | Security | High |

## 2. Checkout Login (`checkout/login/save`) — AJAX POST (JSON)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| AUTH-P-003 | Valid login during checkout | valid creds | JSON success, checkout proceeds | Positive | Critical |
| AUTH-N-008 | Invalid creds (AJAX) | bad pw | JSON `{"error":…}` | Negative | High |
| AUTH-N-009 | Missing fields (AJAX) | no email/pw | JSON error | Negative | High |

## 3. Registration (`account/register`) — GET page / POST submit

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| AUTH-P-004 | Valid registration | unique email, all fields, agree=1 | 302 → success/dashboard | Positive | Critical |
| AUTH-N-010 | Duplicate email | existing email | Error "E-Mail Address is already registered" | Negative | Critical |
| AUTH-N-011 | Invalid email | `foo@` | Error | Negative | High |
| AUTH-N-012 | Missing firstname/lastname/email/password | omit each | Field error | Negative | High |
| AUTH-N-013 | Password mismatch | pw != confirm | Error "Password confirmation does not match" | Negative | Critical |
| AUTH-N-014 | Weak/short password | `1`, `12` | Error (min length) | Negative | High |
| AUTH-B-002 | Password length boundary | 4/5 (min), 20/21, 255/256 | Accept at min, reject over max | Boundary | Medium |
| AUTH-N-015 | Privacy not agreed | `agree=0`/missing | Error "You must agree to the Privacy Policy" | Negative | Critical |
| AUTH-N-016 | Invalid telephone | `abc`, too long | Error/validation | Negative | Medium |
| AUTH-SEC-002 | Injection in fields | `'`, `<script>`, `${}` | Stored/reflected safely; no execution | Security | Medium |
| AUTH-P-005 | Custom fields load | `account/register/customfield` GET | returns fields JSON/HTML per `customer_group_id` | Positive | Low |

## 4. Forgotten Password (`account/forgotten`) — GET/POST

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| AUTH-P-006 | Valid reset request | known email | Success message "An email with a confirmation link…" | Positive | High |
| AUTH-N-017 | Invalid email | `bad` | Validation error | Negative | Medium |
| AUTH-N-018 | Unknown email | `nobody@x.com` | Error/confirmation (verify actual) | Negative | Medium |
| AUTH-N-019 | Empty email | `""` | Error | Negative | Medium |
| AUTH-N-020 | Reused/invalid token | tampered reset link | Rejected | Negative | Medium |

## 5. Logout (`account/logout`) — GET

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| AUTH-P-007 | Valid logout | Session cleared; subsequent protected access → 302 login | Positive | High |
| AUTH-N-021 | Repeated logout | No error; still logged out | Negative | Low |
| AUTH-N-022 | Protected endpoint after logout | `account/account` → 302 login | Negative | Critical |

## 6. Authorization / IDOR (cross-account)

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| AUTH-SEC-003 | Guest → `account/order`/`account/address`/`account/wishlist` | 302 → login | Security | Critical |
| AUTH-SEC-004 | User A → User B's `account/order/info?order_id=X` | No cross-account access (redirect/denied) | Security | Critical |
| AUTH-SEC-005 | User A → User B's `account/address/delete?address_id=X` | Denied / not deleted | Security | Critical |
| AUTH-SEC-006 | User A → User B's wishlist add/remove | Denied | Security | High |

## 7. Password Change (`account/password`)

| ID | Scenario | Expected | Type | Priority |
|---|---|---|---|---|
| AUTH-P-008 | Valid change | 302 success; old pw fails, new works | Positive | High |
| AUTH-N-023 | Wrong current password | Error | Negative | High |
| AUTH-N-024 | Mismatch confirm | Error | Negative | High |
| AUTH-N-025 | Weak new password | Error | Negative | Medium |

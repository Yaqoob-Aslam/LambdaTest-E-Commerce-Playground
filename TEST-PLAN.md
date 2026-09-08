# E-Commerce Playground — Master Test Plan (Single File)

**Application under test:** [https://ecommerce-playground.lambdatest.io/](https://ecommerce-playground.lambdatest.io/)
**Platform:** OpenCart-based demo store ("Powered by OpenCart")
**Currency:** USD ($)
**Scope:** Functional, negative, edge/boundary, data-validation, navigation, session/state, responsive, accessibility, and functional-security test planning. Derived from direct exploration of the live application.

> This single file contains the complete application-level test plan **and** all detailed test cases for every module (Authentication, Products, Cart & Checkout). Test Case IDs use the format `<MODULE>-<TYPE>-<NNN>` where TYPE ∈ {P (positive), N (negative), E (edge/boundary), D (data), S (session/state), SEC (security)}.

---

## 1. Application Overview & Discovered Functionality

| Area | Discovered functionality |
|---|---|
| **Header** | Logo, "All Categories" dropdown, search bar with category filter, cart drawer (item count + subtotal), currency USD ($). |
| **Top navigation** | Home, Special/Hot, Blog, Mega Menu (brands + subcategories), AddOns, Featured, My account. |
| **Shop by Category (sidebar)** | 17 top categories (10 with live product paths, several placeholder categories). |
| **Quick Links** | Special, Hot, Wishlist, Compare, My account, Blog, Tracking, Contact us. |
| **Product discovery** | Category listing, brand/manufacturer pages, featured/homepage carousels, "Special" page, search. |
| **Product listing** | Product grid, sort (12 options), show-per-page limit (15/25/50/75/100), pagination (5 pages, next/last). |
| **Product details** | Image gallery, name, price, quantity stepper, Add to Cart, Buy Now, Compare, Wishlist, Write Review, tabs (Description / Specification / Reviews / Custom). |
| **Cart** | Cart drawer, cart page (edit/update quantity, remove, totals), Checkout. |
| **Checkout** | Guest / register / login options, billing address, delivery method, payment method, confirm order. |
| **Account** | Registration, Login, Logout, Forgotten Password, dashboard, edit profile, password change, address book, order history, downloads, wishlist. |
| **Information** | Contact us, Tracking, information pages (About/Delivery/Privacy/Terms). |
| **Blog** | Blog home, article, author pages. |
| **Static content** | Promotional banners, "Top trending categories", "Top products", "From the blog". |

**Not discovered / not present:** explicit language/currency selector (only USD "$"). Placeholder categories (Fashion and Accessories, Beauty and Saloon, Autoparts, Washing machine, Gaming consoles, Air conditioner) link to home and contain no products.

---

## 2. User Roles & Account States

| State | Notes |
|---|---|
| **Guest** | Browse, search, filter, sort, add to cart, guest checkout. Wishlist/compare require login. |
| **Registered user** | Full account features (dashboard, addresses, orders, downloads, wishlist). |
| **Logged-in user** | "My account" full menu; cart persists. |
| **Logged-out user** | "My account" routes to login; protected pages redirect. |
| **New user** | Registers; lands on dashboard or login. |
| **Existing user with orders** | Order history populated; reorder available. |

---

## 3. Page / Element Structure (verified)

- **Login** (`account/login`): New Customer (`Register` + `Continue` guest checkout); Returning Customer (`#input-email` "E-Mail Address", `#input-password` "Password" masked, `Forgotten Password` link, Login submit).
- **Register** (`account/register`): `#input-firstname`, `#input-lastname`, `#input-email` (email), `#input-telephone` (tel), `#input-password`, `#input-confirm`, Newsletter radio (Yes/No, default No), Privacy Policy checkbox `#input-agree`, `customer_group_id` radio.
- **Category listing** (`product/category`): Sort (`#input-sort`) — Default, Best sellers, Popular, Newest, Name A-Z, Name Z-A, Price Low>High, Price High>Low, Rating Highest, Rating Lowest, Model A-Z, Model Z-A; Show limit (`#input-limit`) — 15/25/50/75/100; Pagination 5 pages + `>` + `>|`.
- **Product detail** (`product/product`): image gallery, `h1` name, price, quantity (`min=1`), **Add to Cart**, **Buy Now**, **Compare This Product**, Wishlist, **Write Review**; tabs Description/Specification/Reviews/Custom.
- **Cart & Checkout**: cart drawer (count + subtotal, "Edit cart"/"Checkout"); cart page (`checkout/cart`) product list + quantity/update/remove + totals; empty cart → "Your shopping cart is empty!" + Continue; checkout with empty cart redirects to cart page; with items → account options → Billing → Delivery method → Payment method → Confirm order.
- **Live categories**: Components (25), Cameras (33), Phone/Tablets & Ipod (57), Software (17), MP3 Players (34), Laptops & Notebooks (18), Desktops and Monitors (28), Printers & Scanners (30), Mice and Trackballs (29), Web Cameras (32).

---

## 4. Risk-Based Testing — Top 15 Highest-Risk Areas

| # | Risk | Impact | Likelihood | Priority | Reason / Coverage |
|---|---|---|---|---|---|
| 1 | Checkout order placement & payment | Critical | Medium | Critical | Wrong totals/failed payment. Guest + logged-in, all fields. |
| 2 | Cart quantity/total calculation | Critical | Medium | Critical | Revenue loss. Boundary quantities. |
| 3 | Authentication & session security | Critical | Medium | Critical | Unauthorized access, session after logout. |
| 4 | Registration data integrity | High | Medium | High | Duplicate email, invalid inputs, privacy. |
| 5 | Product search relevance | High | Medium | High | Partial/no-result, special chars. |
| 6 | Pricing consistency across pages | Critical | Medium | Critical | Listing ≠ detail ≠ cart drift. |
| 7 | Product detail → add to cart (options/qty) | High | Medium | High | Missing options, invalid qty. |
| 8 | Address management | High | Medium | High | Invalid postcode/country/region. |
| 9 | Filter/sort correctness | High | Medium | High | Products not actually sorted/filtered. |
| 10 | Pagination navigation | Medium | Medium | Medium | Lost state after filter/sort. |
| 11 | Order history accuracy | High | Low | High | Orders missing/wrong. |
| 12 | Password recovery | High | Low | High | Reset link, invalid email. |
| 13 | Wishlist/compare persistence | Medium | Medium | Medium | Guest vs logged-in state. |
| 14 | Session persistence (cart) | Medium | Medium | Medium | Cart lost on refresh/multi-tab. |
| 15 | Newsletter/contact forms | Medium | Low | Medium | Validation, success confirmation. |

---

## 5. Smoke Test Suite

1. Application loads and home page renders.
2. User can register.
3. User can log in.
4. User can search for a product.
5. User can open a product detail page.
6. User can add a product to cart (count increments).
7. User can open the cart.
8. User can proceed through checkout.
9. User can place an order and see confirmation.
10. User can log out.

---

## 6. Regression Suite Classification

| Class | Content |
|---|---|
| **Smoke** | Section 5 scenarios. |
| **Critical Regression** | Login/logout, registration, search, add-to-cart, cart totals, checkout+payment, order confirmation, dashboard. |
| **Full Regression** | All positive scenarios across all modules. |
| **Extended/Exploratory** | Edge/boundary, negative, accessibility, responsive, cross-browser, functional-security. |

---

# 7. DETAILED TEST CASES

## 7.1 Module — Authentication

### 7.1.1 Positive

#### Registration
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| AUTH-P-001 | Successful registration | Fill required fields valid + tick agree | Account created; success message |
| AUTH-P-002 | Register newsletter "Yes" | Valid data + newsletter Yes | Account created, subscribed |
| AUTH-P-003 | Register newsletter "No" (default) | Valid data, default | Account created, not subscribed |

#### Login
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| AUTH-P-004 | Successful login | Valid email + password | Redirect to account dashboard |
| AUTH-P-005 | Login via header "My account" | Click when logged out | Login page shown |
| AUTH-P-006 | Login preserves redirect | Open protected page → login | Returned to requested page |

#### Logout
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| AUTH-P-007 | Successful logout | Click Logout | Session ended; header shows Login/Register |
| AUTH-P-008 | Logout then Back button | Logout, press Back | Protected page not accessible |

#### Password recovery
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| AUTH-P-009 | Forgot password valid email | Enter registered email | "Reset link sent" message |
| AUTH-P-010 | Change password (logged in) | Current + new + confirm | Updated; old password invalid |

#### Account management
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| AUTH-P-011 | View account dashboard | Login → My account | Dashboard links shown |
| AUTH-P-012 | Edit profile | Update fields | Saved |
| AUTH-P-013 | Create address | Address Book → New | Address saved |
| AUTH-P-014 | Update address | Edit address | Changes persisted |
| AUTH-P-015 | Delete address | Remove address | Removed |

### 7.1.2 Negative

#### Login negatives
| ID | Scenario | Expected |
|---|---|---|
| AUTH-N-001 | Empty email | "E-Mail Address required" |
| AUTH-N-002 | Empty password | "Password required" |
| AUTH-N-003 | Invalid email format | Email format error |
| AUTH-N-004 | Unregistered email | "No match for E-Mail Address and/or Password" |
| AUTH-N-005 | Incorrect password | "No match for E-Mail Address and/or Password" |
| AUTH-N-006 | Email case variation | Case-insensitive handling |
| AUTH-N-007 | Leading/trailing spaces | Trimmed/rejected consistently |
| AUTH-N-008 | SQL/script-like input | Not executed; plain text |
| AUTH-N-009 | Protected page logged out | Redirect to login |

#### Registration negatives
| ID | Scenario | Expected |
|---|---|---|
| AUTH-N-010 | All required fields empty | Field-level validation errors |
| AUTH-N-011 | Invalid email format | Email format error |
| AUTH-N-012 | Duplicate email | "already registered" error |
| AUTH-N-013 | Invalid telephone | Telephone format error |
| AUTH-N-014 | Short password | Password length error |
| AUTH-N-015 | Password mismatch | "Password confirmation does not match" |
| AUTH-N-016 | Missing privacy agreement | Must agree error |
| AUTH-N-017 | Special chars in name/telephone | Rejected/sanitized |
| AUTH-N-018 | Very long values | Bounded/graceful |

#### Password recovery negatives
| ID | Scenario | Expected |
|---|---|---|
| AUTH-N-019 | Forgot password empty email | Validation error |
| AUTH-N-020 | Unregistered email | Generic message (no disclosure) |
| AUTH-N-021 | Invalid email format | Validation error |

### 7.1.3 Edge & Boundary

| ID | Scenario | Expected |
|---|---|---|
| AUTH-E-001 | Email minimum length | Defined validation |
| AUTH-E-002 | Email exactly max length | Accepted |
| AUTH-E-003 | Email over max length | Rejected |
| AUTH-E-004 | Password exactly minimum | Accepted |
| AUTH-E-005 | Password below minimum | Rejected |
| AUTH-E-006 | Password over maximum | Rejected |
| AUTH-E-007 | Whitespace-only values | Rejected as empty |
| AUTH-E-008 | Unicode names | Accepted/stored |
| AUTH-E-009 | HTML/script in name/telephone | Escaped safely |
| AUTH-E-010 | Multiple consecutive spaces | Trimmed/rejected |

### 7.1.4 Session & State

| ID | Scenario | Expected |
|---|---|---|
| AUTH-S-001 | Session across navigation | Remains logged in |
| AUTH-S-002 | Session after refresh | Remains logged in |
| AUTH-S-003 | Session across tabs | Consistent |
| AUTH-S-004 | Reopen browser (cookies) | Persists if cookies retained |
| AUTH-S-005 | Protected page after logout | Blocked, redirect |
| AUTH-S-006 | Back button after logout | No cached protected page |

### 7.1.5 Functional Security

| ID | Scenario | Expected |
|---|---|---|
| AUTH-SEC-001 | Password masked | `type=password` |
| AUTH-SEC-002 | No password in URL | Not in query string |
| AUTH-SEC-003 | Forgot-password no enumeration | Generic message |
| AUTH-SEC-004 | Direct URL to account pages logged out | Redirect to login |
| AUTH-SEC-005 | Input injection in login/register | Not executed |

---

## 7.2 Module — Products

### 7.2.1 Positive

#### Listing / discovery
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| PRD-P-001 | Browse a category | Click "Laptops & Notebooks" | Listing shows category products |
| PRD-P-002 | Sidebar "Shop by Category" | Expand category nav | Correct listing |
| PRD-P-003 | Browse brand/manufacturer | Mega Menu → brand | Manufacturer page |
| PRD-P-004 | Open "Special" page | Quick Links → Special | Specials listing |

#### Product details
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-005 | Open product details | Name, image, description, price, tabs visible |
| PRD-P-006 | Verify product name | Matches listing |
| PRD-P-007 | Verify price | Correct `$` amount |
| PRD-P-008 | Description tab | Shown |
| PRD-P-009 | Specification tab | Shown |
| PRD-P-010 | Reviews tab | Reviews + Write Review |
| PRD-P-011 | Image gallery nav | Prev/next works |
| PRD-P-012 | Navigate between products | Related links open others |

#### Search
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-013 | Exact product name | Product appears |
| PRD-P-014 | Partial name | Matches appear |
| PRD-P-015 | Search within category | Scoped results |

#### Sort
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-016 | Name A–Z | Alphabetical |
| PRD-P-017 | Name Z–A | Reverse alphabetical |
| PRD-P-018 | Price Low → High | Ascending price |
| PRD-P-019 | Price High → Low | Descending price |
| PRD-P-020 | Rating Highest | Highest-rated first |
| PRD-P-021 | Model A–Z | Model order |
| PRD-P-022 | Newest | Newest first |

#### Pagination
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-023 | Next page | Page 2 shown |
| PRD-P-024 | Last page | Last page shown |
| PRD-P-025 | Page numbers | Correct page |
| PRD-P-026 | Show limit 25/50/75/100 | Correct count/page |

#### Wishlist
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-027 | Add to wishlist (logged in) | Added; count updates |
| PRD-P-028 | View wishlist | Products listed |
| PRD-P-029 | Move to cart | Added to cart |
| PRD-P-030 | Remove from wishlist | Removed |

#### Comparison
| ID | Scenario | Expected |
|---|---|---|
| PRD-P-031 | Add to compare | Added; count updates |
| PRD-P-032 | Add multiple | Multiple in comparison |
| PRD-P-033 | Open compare page | Attributes side-by-side |
| PRD-P-034 | Remove from compare | Removed |

### 7.2.2 Negative

#### Search
| ID | Scenario | Expected |
|---|---|---|
| PRD-N-001 | Search empty | No crash; prompt/results |
| PRD-N-002 | Nonexistent product | "no results" state |
| PRD-N-003 | Special characters | Handled; no crash |
| PRD-N-004 | Numeric search | Handled |
| PRD-N-005 | Very long term | Handled; no break |
| PRD-N-006 | Leading/trailing spaces | Trimmed |
| PRD-N-007 | Case variation | Case-insensitive |

#### Product
| ID | Scenario | Expected |
|---|---|---|
| PRD-N-008 | Quantity 0 | Prevented (min=1)/validation |
| PRD-N-009 | Quantity negative | Prevented/validation |
| PRD-N-010 | Quantity extremely large | Stock limit/validation |
| PRD-N-011 | Quantity decimal | Rejected (integer) |
| PRD-N-012 | Missing required option | Validation prompts |

#### Filters / Sort
| ID | Scenario | Expected |
|---|---|---|
| PRD-N-013 | Filter no matches | Empty state |
| PRD-N-014 | Remove/reset filters | Full list restored |
| PRD-N-015 | Filter + sort combined | Both applied |

### 7.2.3 Edge & Boundary

| ID | Scenario | Expected |
|---|---|---|
| PRD-E-001 | Search 1 character | Handled |
| PRD-E-002 | Search mixed case | Case-insensitive |
| PRD-E-003 | Search multiple spaces | Normalized |
| PRD-E-004 | Sort then paginate | Sort preserved |
| PRD-E-005 | Filter then paginate | Filter preserved |
| PRD-E-006 | First/last page controls | Correct boundaries |
| PRD-E-007 | Show limit 100 large category | Renders within limit |
| PRD-E-008 | Duplicate wishlist add | Single entry/ignored |
| PRD-E-009 | Duplicate compare add | Single entry |
| PRD-E-010 | Wishlist/compare as guest | Redirect to login |

### 7.2.4 Data Validation

| ID | Scenario | Expected |
|---|---|---|
| PRD-D-001 | Listing price = detail price | Consistent |
| PRD-D-002 | Detail price = cart price | Consistent |
| PRD-D-003 | Product name consistent | Consistent |
| PRD-D-004 | Special price vs regular | Special reflected correctly |
| PRD-D-005 | Sort order matches selection | Verify actual order |

---

## 7.3 Module — Cart & Checkout

### 7.3.1 Positive

#### Add to cart
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| CC-P-001 | Add one product | Add to Cart | Count + subtotal update |
| CC-P-002 | Add multiple products | Add 2+ | All appear |
| CC-P-003 | Add same product twice | Repeat | Quantity aggregates |
| CC-P-004 | Buy Now | Product → Buy Now | To cart/checkout |

#### Cart management
| ID | Scenario | Expected |
|---|---|---|
| CC-P-005 | Open cart | Correct name/price/qty |
| CC-P-006 | Update quantity | Totals recalculated |
| CC-P-007 | Remove product | Totals update |
| CC-P-008 | Clear cart | Empty state |
| CC-P-009 | Continue shopping | Returns to store |
| CC-P-010 | Verify totals | Subtotal = Σ(price×qty) |

#### Checkout (happy path)
| ID | Scenario | Steps | Expected |
|---|---|---|---|
| CC-P-011 | Guest checkout | Cart → Checkout → Guest | Billing form shown |
| CC-P-012 | Valid billing details | All required valid | Proceeds to delivery |
| CC-P-013 | Select delivery method | Flat rate | Proceeds to payment |
| CC-P-014 | Select payment method | COD/available | Proceeds to review |
| CC-P-015 | Review order | Verify items + totals | Correct |
| CC-P-016 | Confirm order | Confirm | Success + order number |
| CC-P-017 | Verify order in account | Account → Order History | Listed with correct details |

#### Order management (logged in)
| ID | Scenario | Expected |
|---|---|---|
| CC-P-018 | View order history | Completed orders listed |
| CC-P-019 | View order details | Items/totals/status correct |
| CC-P-020 | Reorder (if available) | Populates cart |

### 7.3.2 Negative

#### Cart negatives
| ID | Scenario | Expected |
|---|---|---|
| CC-N-001 | Checkout empty cart | Redirects to cart |
| CC-N-002 | Quantity 0 | Removed/validation |
| CC-N-003 | Quantity negative | Rejected |
| CC-N-004 | Quantity very large | Stock limit/validation |
| CC-N-005 | Quantity decimal | Rejected |
| CC-N-006 | Remove all products | Empty state |
| CC-N-007 | Non-numeric quantity | Rejected |

#### Checkout negatives
| ID | Scenario | Expected |
|---|---|---|
| CC-N-008 | Missing first name | Validation error |
| CC-N-009 | Missing last name | Validation error |
| CC-N-010 | Missing address | Validation error |
| CC-N-011 | Missing city | Validation error |
| CC-N-012 | Missing postcode | Validation error |
| CC-N-013 | Missing country | Validation error |
| CC-N-014 | Missing region/state | Validation error |
| CC-N-015 | Invalid email | Validation error |
| CC-N-016 | Invalid telephone | Validation error |
| CC-N-017 | Invalid postcode | Validation error |
| CC-N-018 | Submit without required info | Blocked with field errors |
| CC-N-019 | Continue without required terms | Blocked |

### 7.3.3 Edge & Boundary

| ID | Scenario | Expected |
|---|---|---|
| CC-E-001 | Quantity 1 | Accepted |
| CC-E-002 | Quantity maximum | Accepted |
| CC-E-003 | Quantity max+1 | Rejected/stock-limited |
| CC-E-004 | One product in cart | Correct totals |
| CC-E-005 | Many products | All listed; totals correct |
| CC-E-006 | Duplicate products | Aggregated/separate |
| CC-E-007 | Remove last product | Empty state |
| CC-E-008 | Refresh during checkout | State preserved |
| CC-E-009 | Back during checkout | Cart preserved; no duplicate |
| CC-E-010 | Refresh after confirm | No duplicate order |

### 7.3.4 Data Validation & Calculations

| ID | Scenario | Expected |
|---|---|---|
| CC-D-001 | Cart product = checkout product | Consistent |
| CC-D-002 | Quantity = cart quantity | Consistent |
| CC-D-003 | Subtotal correct | Σ(price×qty) |
| CC-D-004 | Shipping charge correct | Flat rate |
| CC-D-005 | Tax correct | Correct |
| CC-D-006 | Final total correct | Subtotal + shipping + tax |
| CC-D-007 | Order details match review | Consistent |
| CC-D-008 | Order history contains order | Consistent |
| CC-D-009 | Price consistent across pages | Consistent |

### 7.3.5 Session & State

| ID | Scenario | Expected |
|---|---|---|
| CC-S-001 | Cart persists across navigation | Intact |
| CC-S-002 | Cart persists after refresh | Intact |
| CC-S-003 | Cart persists browser restart | Intact (if cookies) |
| CC-S-004 | Checkout interruption then resume | Cart intact |
| CC-S-005 | Guest cart then login | Preserved/merged |

---

## 7.4 Module — Home Page

| ID | Scenario | Steps | Expected |
|---|---|---|---|
| HOME-P-001 | Home page renders | Load home URL | Header, nav, banner, categories, featured products, footer visible |
| HOME-P-002 | Featured/Top products | View sections | Products shown with names + prices |
| HOME-P-003 | Promotional banner CTA | Click "SHOP NOW" | Navigates to relevant listing |
| HOME-P-004 | Trending categories links | Click a trending category | Correct category page |
| HOME-P-005 | Blog section links | Click a blog post | Article page |
| HOME-P-006 | Top categories sidebar | Click a top category | Correct category page |

---

## 7.5 Module — Navigation

| ID | Scenario | Steps | Expected |
|---|---|---|---|
| NAV-P-001 | Header nav links | Click Home/Special/Blog/Featured | Correct page |
| NAV-P-002 | Mega menu brands | Click a brand (Apple/HTC) | Manufacturer page |
| NAV-P-003 | Mega menu subcategories | Click subcategory | Correct category |
| NAV-P-004 | Footer links | Click Quick Links | Correct target |
| NAV-P-005 | Breadcrumbs | Navigate to category/product | Breadcrumb reflects path |
| NAV-P-006 | Back button | Go back | Previous page |
| NAV-P-007 | Forward button | Go forward | Next page |
| NAV-P-008 | Browser refresh | Refresh | Correct state preserved |
| NAV-P-009 | Direct URL | Open product URL | Correct page |
| NAV-N-001 | Invalid URL | Open bad route | Graceful error/redirect |
| NAV-N-002 | Internal link integrity | Click internal links | No broken link / 404 |

---

## 7.6 Module — Categories

| ID | Scenario | Steps | Expected |
|---|---|---|---|
| CAT-P-001 | Browse category | Click "Laptops & Notebooks" | Listing shows category products |
| CAT-P-002 | Sidebar Shop by Category | Expand nav | Correct listing |
| CAT-P-003 | Brand/manufacturer page | Mega Menu → Apple | Matching products |
| CAT-P-004 | Special page | Quick Links → Special | Specials listing |
| CAT-P-005 | Subcategory navigation | Navigate into subcategory | Correct subcategory products |
| CAT-N-001 | Placeholder category | Click Fashion/Accessories | Links to home (no products) — observed |

---

## 7.7 Module — Product Listing

| ID | Scenario | Steps | Expected |
|---|---|---|---|
| LIS-P-001 | Product grid renders | Open category | Product cards with name + price |
| LIS-P-002 | Open product from listing | Click product | Detail page |
| LIS-P-003 | Product image on card | View card | Image loads with alt text |
| LIS-P-004 | Price displayed on card | View card | Correct `$` price |
| LIS-P-005 | Pagination on listing | Navigate pages | Correct products per page |

---

## 7.8 Module — Payment

| ID | Scenario | Expected |
|---|---|---|
| PAY-P-001 | Cash on Delivery | Order placed successfully |
| PAY-P-002 | Flat rate payment option | Order placed successfully |
| PAY-P-003 | Payment method pre-selection | Correct default/available methods shown |
| PAY-N-001 | No payment method selected | Blocked/validation |
| PAY-N-002 | Invalid payment details (where applicable) | Validation error |

---

## 7.9 Module — Order Management

| ID | Scenario | Expected |
|---|---|---|
| ORD-P-001 | View order history | Completed orders listed |
| ORD-P-002 | View order details | Items/totals/status correct |
| ORD-P-003 | Reorder (if available) | Populates cart |
| ORD-P-004 | Verify order in account after purchase | Listed with correct details |
| ORD-P-005 | Order number generated | Unique order number shown |
| ORD-N-001 | Order history without orders | Empty state |
| ORD-N-002 | Cancel order (if available) | Cancellation handled |
| ORD-N-003 | Return order (if available) | Return handled |

---

## 7.10 Module — Account Management

| ID | Scenario | Expected |
|---|---|---|
| ACC-P-001 | Dashboard | Edit/address/orders/downloads links |
| ACC-P-002 | Edit profile | Saved |
| ACC-P-003 | Change password | Updated |
| ACC-P-004 | Manage addresses (CRUD) | Create/update/delete persist |
| ACC-P-005 | View orders | Listed |
| ACC-P-006 | Logout | Session ended |
| ACC-E-001 | Address boundary values (postcode lengths) | Validated consistently |
| ACC-E-002 | Very long profile fields | Bounded/graceful |

---

## 7.11 Module — Session Management

| ID | Scenario | Expected |
|---|---|---|
| SES-P-001 | Login state persisted | Remains logged in |
| SES-P-002 | Logout clears session | Protected pages blocked |
| SES-P-003 | Cart persists across navigation | Intact |
| SES-P-004 | Cart persists after refresh | Intact |
| SES-P-005 | Cart persists browser restart (cookies) | Intact |
| SES-P-006 | Checkout interruption | Cart intact |
| SES-P-007 | Guest cart then login | Preserved/merged |
| SES-P-008 | Multiple tabs | Consistent |
| SES-N-001 | Protected page after logout | Blocked, redirect |
| SES-N-002 | Session expiration (where applicable) | Graceful re-login |

---

## 7.12 Module — UI & Functional Validation

| ID | Scenario | Expected |
|---|---|---|
| UI-P-001 | Page titles | Correct per page |
| UI-P-002 | URLs | Correct route |
| UI-P-003 | Headings/labels/buttons | Present + visible |
| UI-P-004 | Cart count | Accurate |
| UI-P-005 | Wishlist count | Accurate |
| UI-P-006 | Error/success/confirmation messages | Displayed |
| UI-P-007 | Breadcrumbs | Correct |
| UI-P-008 | Menus/dropdowns/checkboxes/radios | Functional |
| UI-P-009 | Modals/tooltips | Correct |
| UI-P-010 | Controls enabled/disabled correctly | Correct state |
| UI-P-011 | Pagination controls | Visible + functional |

---

## 7.13 Module — Accessibility

| ID | Scenario | Expected |
|---|---|---|
| A11Y-001 | Keyboard navigation | Works |
| A11Y-002 | Tab order | Logical |
| A11Y-003 | Focus visibility | Visible |
| A11Y-004 | Form labels | Associated |
| A11Y-005 | Button/link accessibility | Accessible names |
| A11Y-006 | Image alt text | Present |
| A11Y-007 | Error messages accessible | Announced |
| A11Y-008 | Heading hierarchy | Logical |
| A11Y-009 | Keyboard menus/forms | Operable |
| A11Y-010 | Color contrast | Observable |

---

## 7.14 Module — Responsive & Cross-Browser

| ID | Scenario | Expected |
|---|---|---|
| RSP-001 | Desktop layout | Correct |
| RSP-002 | Tablet layout | Correct |
| RSP-003 | Mobile layout | Correct |
| RSP-004 | Navigation/menus responsive | Usable |
| RSP-005 | Product cards/forms/cart responsive | Usable |
| XB-001 | Chromium smoke | Pass |
| XB-002 | Firefox smoke | Pass |
| XB-003 | WebKit smoke | Pass |
| XB-004 | Cross-browser checkout regression | Pass |

---

## 7.15 Module — Functional Security

| ID | Scenario | Expected |
|---|---|---|
| SEC-001 | Protected page without auth | Redirect to login |
| SEC-002 | Account page after logout | Blocked |
| SEC-003 | Password masking | Masked |
| SEC-004 | Password reset behavior | Generic messaging |
| SEC-005 | Session handling | Correct |
| SEC-006 | Sensitive info exposure | None in UI |
| SEC-007 | Unauthorized navigation | Blocked |
| SEC-008 | Input validation | Enforced |
| SEC-009 | Injection-style input | Not executed |

---

## 7.16 Module — Error Handling

| ID | Scenario | Expected |
|---|---|---|
| ERR-001 | Validation errors | Message displayed |
| ERR-002 | Empty states | Understandable |
| ERR-003 | No-result states | Understandable |
| ERR-004 | Invalid URL | Graceful |
| ERR-005 | Failed operations | Recoverable |
| ERR-006 | Interrupted workflows | Data not lost |
| ERR-007 | Inconsistent states | App consistent |

---

## 7.17 Module — Information Pages (Contact / Tracking / Newsletter)

| ID | Scenario | Expected |
|---|---|---|
| INF-P-001 | Contact us — valid submit | Success/confirmation |
| INF-P-002 | Order tracking — valid order info | Status shown |
| INF-P-003 | Newsletter subscribe | Success/confirmation |
| INF-P-004 | Static information pages | Content renders |
| INF-N-001 | Contact us — missing required fields | Validation error |
| INF-N-002 | Contact us — invalid email | Validation error |
| INF-N-003 | Order tracking — invalid info | Error/no results |

---

## 8. Playwright Automation Recommendations

### Automation candidates
- High value: login/logout, registration, search, sort/filter, add-to-cart, cart totals, checkout (guest + logged-in), order confirmation, dashboard.
- Manual-only: visual/color-contrast accessibility, some responsive pixel checks.
- API-level: no public API in this demo; UI-level for now.

### Locator strategy (priority order)
1. `getByRole('button'/'link', { name })`
2. `getByLabel(...)`
3. `getByPlaceholder('E-Mail Address')`, `getByPlaceholder('Search For Products')`
4. Stable `#input-*` ids (`#input-email`, `#input-firstname`, `#input-password`, `#input-telephone`)
5. `getByText(...)` for names/prices
6. Avoid XPath and dynamic class selectors.

### Key assertions
URL, page title, visibility, text, input value/attributes, cart count text, price text, order confirmation text.

### Page Object Model

```
pages/
├── BasePage.ts
├── HomePage.ts
├── LoginPage.ts
├── RegisterPage.ts
├── ForgotPasswordPage.ts
├── ProductListingPage.ts
├── ProductDetailsPage.ts
├── SearchResultsPage.ts
├── CartPage.ts
├── CheckoutPage.ts
├── ConfirmOrderPage.ts
├── AccountPage.ts
├── WishlistPage.ts
├── ComparePage.ts
└── components/
    ├── Header.ts
    ├── Footer.ts
    ├── ProductCard.ts
    └── CheckoutForm.ts
```

### Reusable components
Header (search + cart drawer + nav), Footer, ProductCard, CheckoutForm, AddressForm.

### Test data strategy
- Parameterize: search terms, boundary inputs, invalid emails/passwords.
- Fixtures/JSON: valid user, invalid users, addresses, product names/prices.
- Dynamic: unique email per run (`test-${Date.now()}@example.com`).
- Reuse across tests via fixtures.

---

## 9. Defects & Observations

| Type | Observation |
|---|---|
| Observation | Placeholder categories (Fashion, Beauty, Autoparts, Washing machine, Gaming consoles, Air conditioner) link to home with no products. |
| Observation | No language/currency selector in header (only USD "$"). |
| Observation | "Laptops & Notebooks" (`path=18`) lists cross-category products (aggregated listing). |

No confirmed functional defects reproduced.

---

## 10. Functionality Not Tested / Limitations

- Payment against a real gateway (simulated only).
- Order cancellation/return workflows (not exposed).
- Downloads/reward points/recurring payments (not exercised).
- Currency/language switching (not present in this theme).

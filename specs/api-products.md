# Product API Test Plan

**Module:** Product/Catalog · **App:** ecommerce-playground.lambdatest.io
**Endpoints covered:** `product/category`, `product/product`, `product/search`, `product/special`, `product/manufacturer/info`, `product/compare`, `product/compare/add`, `extension/maza/product/compare/remove`, `extension/maza/product/quick_view`, `extension/maza/product/product/priceWithOptions`, `product/product/getRecurringDescription`, `product/product/review`, `product/product/write`.

> Fixture: `product_id=28` (HTC Touch HD, $146.00). Valid category paths discovered: 17, 18, 20, 24, 25, 27, 28, 29, 30, 32, 33, 34, 57.

---

## 1. Category Listing (`product/category`) — GET

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-001 | Valid category | `path=17` | 200 HTML, product grid | Positive | High |
| PRD-N-001 | Missing path | — | Empty/default listing (verify) | Negative | Medium |
| PRD-N-002 | Nonexistent path | `path=999999` | No products / empty | Negative | Medium |
| PRD-N-003 | Negative/zero path | `path=-1`, `0` | Empty/error | Negative | Low |
| PRD-B-001 | Sort options | all 12 `sort` values | Correct ordering (name/price/rating/model) | Boundary | High |
| PRD-B-002 | Limit options | `limit=15/25/50/75/100` | Respects count | Boundary | Medium |
| PRD-B-003 | Pagination | `page=1..last`, `page=0`, `-1`, huge | Correct pages; 0/negative/huge → first/empty | Boundary | Medium |

## 2. Product Detail (`product/product`) — GET

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-002 | Valid product | `product_id=28` | 200, name/price `$146.00`, Add-to-Cart | Positive | Critical |
| PRD-N-004 | Missing product_id | — | Error/empty | Negative | Medium |
| PRD-N-005 | Nonexistent id | `999999` | "Product not found" / empty | Negative | Medium |
| PRD-N-006 | Negative/zero/string id | `-1`,`0`,`abc` | Handled (no 500) | Negative | Medium |
| PRD-SEC-001 | Injection in id | `1 OR 1=1`, `../../` | No bypass/error | Security | Medium |

## 3. Search (`product/search`) — GET (form)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-003 | Exact match | `search=HTC Touch HD` | Results | Positive | Critical |
| PRD-P-004 | Partial match | `search=HTC` | Results | Positive | High |
| PRD-N-007 | No results | `search=zzzzz` | "no match" empty | Negative | Medium |
| PRD-B-004 | Case variation | `htc` vs `HTC` | Consistent (case-insensitive) | Boundary | Medium |
| PRD-B-005 | Special chars | `search=<script>`, `'`, `"`, `$` | No execution; handled | Boundary/Security | High |
| PRD-B-006 | Leading/trailing spaces | ` HTC ` | Trimmed or same | Boundary | Low |
| PRD-B-007 | Very long string | 1000 chars | No crash | Boundary | Low |
| PRD-P-005 | Filter combos | `search + category_id + sort + order + limit + page` | Correct combined results | Positive | High |
| PRD-P-006 | Sort options | `sort=p.price` + `order=ASC/DESC` | Correct order | Positive | High |

## 4. Special / Manufacturer

| ID | Endpoint | Scenario | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-007 | `product/special` | Valid | 200, offers list | Positive | Medium |
| PRD-P-008 | `product/manufacturer/info` | `manufacturer_id=5/8/9/11` | 200, brand products | Positive | Medium |
| PRD-N-008 | `product/manufacturer/info` | missing/`999999` | Empty | Negative | Low |

## 5. Compare (`product/compare/add`, `extension/maza/product/compare/remove`, `product/compare`)

| ID | Scenario | Test Data | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-009 | Add to compare (AJAX) | `product_id=28` | JSON success; count updates | Positive | Medium |
| PRD-P-010 | Compare page | `product/compare` | 200, lists items | Positive | Low |
| PRD-N-009 | Add invalid id | `product_id=0`/`abc` | JSON error/ignored | Negative | Medium |
| PRD-P-011 | Remove compare (AJAX) | `product_id=28` | JSON success; removed | Positive | Low |
| PRD-N-010 | Duplicate add | same product twice | Prevent duplicate (verify) | Negative | Low |

## 6. Quick View / Price / Recurring / Review

| ID | Endpoint | Scenario | Expected | Type | Priority |
|---|---|---|---|---|---|
| PRD-P-012 | `extension/maza/product/quick_view` | `product_id=28` | Modal HTML fragment | Positive | Medium |
| PRD-N-011 | quick_view | missing/invalid id | Empty/error | Negative | Low |
| PRD-P-013 | `…/priceWithOptions` | `product_id=28` | JSON price | Positive | Medium |
| PRD-P-014 | `product/product/getRecurringDescription` | valid | JSON desc | Positive | Low |
| PRD-P-015 | `product/product/review` | `product_id=28` | Review tab HTML | Positive | Low |
| PRD-P-016 | `product/product/write` | name+text+rating valid | 302 success; review appears | Positive | Medium |
| PRD-N-012 | write review | missing rating/name, injection | Error; no XSS | Negative | Medium |

## 7. Data Integrity

| ID | Scenario | Expected |
|---|---|---|
| PRD-D-001 | Product page price == cart JSON `total` math | `$146.00` consistent across listing → detail → cart |
| PRD-D-002 | Category `path` → product `product_id` linkage | Products resolve to valid detail pages |

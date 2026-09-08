# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products/category-listing.spec.ts >> Products — Category Listing >> TC_CATEGORY_004_Sort_By_Name_Z_To_A
- Location: tests/products/category-listing.spec.ts:54:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18&page=1", waiting until "load"

```

```
Tearing down "context" exceeded the test timeout of 30000ms.
```
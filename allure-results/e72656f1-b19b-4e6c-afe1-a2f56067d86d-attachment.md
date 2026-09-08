# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search/search.spec.ts >> Search >> TC_SEARCH_005_Open_Product_From_Search_Results
- Location: tests/search/search.spec.ts:67:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search=iMac", waiting until "load"

```

```
Tearing down "context" exceeded the test timeout of 30000ms.
```
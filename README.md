# LambdaTest E-Commerce Playground — Playwright + TypeScript

Production-grade UI/API automation framework for
[LambdaTest E-Commerce Playground](https://ecommerce-playground.lambdatest.io/) (an OpenCart storefront).

Built with **Playwright Test**, **TypeScript** (strict), the **Page Object Model**, fixtures,
typed test data and reusable components.

## Application under test

| | |
|---|---|
| URL | https://ecommerce-playground.lambdatest.io/ |
| Platform | OpenCart (PHP), session-cookie auth |
| Currency | USD ($) |

## Technology

Playwright Test · TypeScript (strict) · Page Object Model · Fixtures (dependency injection) ·
`APIRequestContext` · Allure + HTML reporting · GitHub Actions.

## Project structure

```
tests/            module specs (account, api, authentication, cart, checkout, contact,
                  e2e, home, navigation, products, search, smoke, wishlist)
pages/            Page Objects (one per page, extending BasePage)
components/       reusable UI components (Header, Footer, NavigationMenu, MiniCart,
                  SearchComponent, AlertComponent, ProductCard)
fixtures/         page-object + app fixtures (testFixtures.ts)
utils/            Logger, DataUtils, RandomDataUtils
data/             JSON test data (typed via types/)
constants/        Routes, URLs, Messages, Tags, TestConstants
config/           environment + runtime configuration
api/              typed ApiClient over OpenCart routes
specs/            test plans and API test-plan documentation
TEST-PLAN.md      master application test plan
```

## Installation

```bash
npm ci
npx playwright install --with-deps
```

## Environment configuration

Copy the example file and adjust as needed (never commit secrets):

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `BASE_URL` | Application base URL (overrides the named environment). |
| `TEST_ENV` | Named environment: `local` \| `dev` \| `staging` \| `prod`. |
| `TEST_USER_EMAIL` / `TEST_USER_PASSWORD` | Registered account; authenticated specs auto-skip when unset. |
| `ALLOW_REGISTRATION=1` | Enables specs that create real accounts. |
| `ALLOW_ORDER_PLACEMENT=1` | Enables specs that place real orders. |
| `PROJECTS` | Comma-separated project filter, e.g. `chromium,api`. |
| `RETRIES`, `WORKERS`, `TIMEOUT`, `EXPECT_TIMEOUT`, `NAVIGATION_TIMEOUT` | Execution tuning. |

## Running tests

```bash
npm test                 # full matrix (chromium, firefox, webkit, mobile, api)
npm run test:chromium    # single browser
npm run test:mobile      # mobile projects
npm run test:api         # API project only
npm run test:smoke       # --grep @smoke
npm run test:regression  # --grep @regression
npm run test:headed      # headed
npm run test:debug       # Playwright inspector
```

Any project subset can be selected with `PROJECTS`, e.g. `PROJECTS=chromium,api npx playwright test`.

### Tags

`@smoke` `@regression` `@functional` `@negative` `@e2e` `@authentication` `@search`
`@product` `@cart` `@checkout` `@wishlist` `@account` `@navigation` `@contact` `@api`.

Run a slice with `npx playwright test --grep @checkout`.

## Reports, traces and artifacts

- HTML report: `npm run report` (generated in `playwright-report/`).
- Allure: `npm run allure:generate` then `npm run allure:open`.
- Traces/screenshots/video are captured automatically on failure
  (`trace: on-first-retry`, `screenshot: only-on-failure`, `video: retain-on-failure`).

## Plan-to-code traceability

Every test case in `TEST-PLAN.md` and `specs/api-*.md` is mapped to the spec file(s) that
implement it, so no planned case can silently go missing.

| Artifact | Purpose |
| --- | --- |
| `specs/TEST-PLAN-COVERAGE.md` | UI report: 296 case IDs → spec file |
| `specs/API-TEST-PLAN-COVERAGE.md` | API report: 208 case IDs → spec file |
| `scripts/check-plan-coverage.sh` | Re-runnable verifier (non-zero exit if a case is unmapped) |
| `tests/plan-coverage/plan-coverage.spec.ts` | Closes cross-cutting UI gaps (regression/edge/negative/UI/cross-browser) |
| `tests/api/api-plan-coverage.spec.ts` | Closes cross-cutting API gaps (NEG/EDGE/SEC/ERR/IDEM/SCH/PAG + checkout/order) |

```bash
npm run coverage:plan     # exit 0 == every planned case is mapped to code
```

Existing specs carry a `// Plan: <ID>` comment above each test so a case can be located by ID.
Cases that cannot be automated on the shared public demo are listed under
"Documented exceptions" in `specs/TEST-PLAN-COVERAGE.md` (e.g. `AUTH-P-006`, `CC-D-005`,
`PRD-P-009`) or are credential/flag-gated (`test.skip(...)`) inside the specs.

## Quality checks

```bash
npm run typecheck        # tsc --noEmit (strict)
npm run coverage:plan    # plan-to-code traceability gate
```

## CI

`.github/workflows/playwright.yml` installs dependencies and browsers, runs the suite and
uploads the HTML report as an artifact.

## Conventions

- Locators and page actions live in Page Objects; business assertions live in tests.
- Tests consume fixtures (`{ homePage, cartPage, ... }`) — never `new` a Page Object.
- No hard-coded URLs or credentials; no `page.waitForTimeout()`.
- Tag every test and name it `TC_<MODULE>_<NNN>_<Description>`.
- New scenarios are traced back to `TEST-PLAN.md` / `specs/`.

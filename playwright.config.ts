import 'dotenv/config';
import { defineConfig, devices, type ReporterDescription } from '@playwright/test';
import { testConfig } from './config/testConfig';

/**
 * Enterprise Playwright configuration.
 *
 * Environment values are resolved once in `config/testConfig.ts`, so nothing is
 * hard-coded inside tests. Projects can be trimmed per-run with the PROJECTS
 * env var, e.g. `PROJECTS=chromium,api npx playwright test`.
 */

const reporter: ReporterDescription[] = process.env.CI
  ? [
      ['list'],
      ['github'],
      ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
    ]
  : [
      ['list'],
      ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
    ];

const allProjects = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: ['**/api/**'] },
  // { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: ['**/api/**'] },
  // { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: ['**/api/**'] },
  // { name: 'mobile-chrome', use: { ...devices['Pixel 5'] }, testIgnore: ['**/api/**'] },
  // { name: 'mobile-safari', use: { ...devices['iPhone 13'] }, testIgnore: ['**/api/**'] },
  {
    name: 'api',
    testDir: './tests/api',
    use: { baseURL: testConfig.baseUrl },
  },
];

const selectedNames = process.env.PROJECTS
  ? process.env.PROJECTS.split(',').map((name) => name.trim())
  : undefined;

const projects = selectedNames
  ? allProjects.filter((project) => selectedNames.includes(project.name))
  : allProjects;

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/auth.setup.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: testConfig.retries,
  workers: testConfig.workers,
  timeout: testConfig.defaultTimeout,
  expect: {
    timeout: testConfig.expectTimeout,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  reporter,
  use: {
    baseURL: testConfig.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: testConfig.defaultTimeout,
    navigationTimeout: testConfig.navigationTimeout,
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-testid',
  },
  outputDir: 'test-results',
  projects,
});

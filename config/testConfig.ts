import { env } from './environments';

const toInt = (value: string | undefined, fallback: number): number => {
  if (value === undefined || value.trim() === '') {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export interface Credentials {
  readonly email: string;
  readonly password: string;
}

export interface FeatureFlags {
  /** Allows specs that create real accounts to run. */
  readonly allowRegistration: boolean;
  /** Allows specs that place real orders to run. */
  readonly allowOrderPlacement: boolean;
}

export interface TestConfig {
  readonly environment: string;
  readonly baseUrl: string;
  readonly defaultTimeout: number;
  readonly expectTimeout: number;
  readonly navigationTimeout: number;
  readonly retries: number;
  readonly workers: number | undefined;
  readonly credentials: Credentials;
  readonly flags: FeatureFlags;
}

export const testConfig: TestConfig = {
  environment: env.name,
  baseUrl: env.baseUrl,
  defaultTimeout: toInt(process.env.TIMEOUT, 30_000),
  expectTimeout: toInt(process.env.EXPECT_TIMEOUT, 10_000),
  navigationTimeout: toInt(process.env.NAVIGATION_TIMEOUT, 30_000),
  retries: toInt(process.env.RETRIES, process.env.CI ? 2 : 0),
  workers: process.env.WORKERS ? toInt(process.env.WORKERS, 1) : undefined,
  credentials: {
    email: process.env.TEST_USER_EMAIL ?? '',
    password: process.env.TEST_USER_PASSWORD ?? '',
  },
  flags: {
    allowRegistration: process.env.ALLOW_REGISTRATION === '1',
    allowOrderPlacement: process.env.ALLOW_ORDER_PLACEMENT === '1',
  },
};

/** True when a registered account has been supplied via the environment. */
export const hasCredentials = (): boolean =>
  testConfig.credentials.email.trim() !== '' && testConfig.credentials.password.trim() !== '';

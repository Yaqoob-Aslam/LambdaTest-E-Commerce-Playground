/**
 * Named environment definitions.
 *
 * The application is a single public demo instance, so all named environments
 * default to the same base URL. They exist so the framework is genuinely
 * environment-independent: point `BASE_URL` (or add a per-env override) at any
 * deployment without touching a single test.
 */

export type EnvironmentName = 'local' | 'dev' | 'staging' | 'prod';

export interface EnvironmentConfig {
  /** Logical environment name. */
  readonly name: EnvironmentName;
  /** Application base URL (no trailing slash). */
  readonly baseUrl: string;
}

const DEFAULT_BASE_URL = 'https://ecommerce-playground.lambdatest.io';

export const environments: Record<EnvironmentName, EnvironmentConfig> = {
  local: { name: 'local', baseUrl: DEFAULT_BASE_URL },
  dev: { name: 'dev', baseUrl: DEFAULT_BASE_URL },
  staging: { name: 'staging', baseUrl: DEFAULT_BASE_URL },
  prod: { name: 'prod', baseUrl: DEFAULT_BASE_URL },
};

const isEnvironmentName = (value: string): value is EnvironmentName =>
  Object.prototype.hasOwnProperty.call(environments, value);

/**
 * Resolve the active environment. `BASE_URL` always wins, so CI can target any
 * deployment without a matching named entry.
 */
export const getEnvironment = (): EnvironmentConfig => {
  const requested = process.env.TEST_ENV ?? 'local';
  const name: EnvironmentName = isEnvironmentName(requested) ? requested : 'local';
  const base = environments[name];
  const baseUrl = (process.env.BASE_URL ?? base.baseUrl).replace(/\/$/, '');
  return { name, baseUrl };
};

export const env: EnvironmentConfig = getEnvironment();

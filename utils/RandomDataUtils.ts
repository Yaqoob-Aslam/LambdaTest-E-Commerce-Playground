import type { User } from '../types';

/** Inclusive random integer in `[min, max]`. */
export const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Random alphanumeric string of the requested length. */
export const randomString = (length = 8): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let value = '';
  for (let index = 0; index < length; index += 1) {
    value += alphabet.charAt(randomInt(0, alphabet.length - 1));
  }
  return value;
};

/**
 * Collision-resistant email for registration/checkout flows.
 * Format: `qa_<timestamp>_<rand>@example.com`.
 */
export const generateUniqueEmail = (prefix = 'qa'): string =>
  `${prefix}_${Date.now()}_${randomString(5)}@example.com`;

/** A valid password satisfying the OpenCart 4–20 character rule. */
export const generatePassword = (): string => `Pass${randomString(6)}1`;

export const generatePhoneNumber = (): string => `07${randomInt(100_000_000, 999_999_999)}`;

/** Build a unique, valid user; any field can be overridden per test. */
export const generateUser = (overrides: Partial<User> = {}): User => ({
  firstName: overrides.firstName ?? 'QA',
  lastName: overrides.lastName ?? `Tester${randomInt(100, 999)}`,
  email: overrides.email ?? generateUniqueEmail(),
  telephone: overrides.telephone ?? generatePhoneNumber(),
  password: overrides.password ?? generatePassword(),
  confirmPassword: overrides.confirmPassword,
  newsletter: overrides.newsletter ?? false,
});

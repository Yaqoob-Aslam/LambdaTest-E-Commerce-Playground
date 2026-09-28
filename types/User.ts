/** A customer account payload used for registration and login flows. */
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
  /** Only used by registration. Defaults to `password` when omitted. */
  confirmPassword?: string;
  /** Newsletter opt-in radio. Defaults to `false`. */
  newsletter?: boolean;
}

/** Credentials for the login form. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Shape of `data/users.json`. */
export interface UsersData {
  invalid: {
    unregistered: LoginCredentials;
    wrongPassword: LoginCredentials;
    malformedEmail: LoginCredentials;
  };
}

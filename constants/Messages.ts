/**
 * User-facing messages asserted in tests. Sourced verbatim from the live
 * application so assertions validate real business behaviour.
 */
export const MESSAGES = {
  login: {
    /** Common prefix of every OpenCart warning alert. */
    genericWarning: 'Warning:',
  },
  register: {
    privacyAgreement: 'Warning: You must agree to the Privacy Policy!',
    firstName: 'First Name must be between 1 and 32 characters!',
    lastName: 'Last Name must be between 1 and 32 characters!',
    email: 'E-Mail Address does not appear to be valid!',
    telephone: 'Telephone must be between 3 and 32 characters!',
    password: 'Password must be between 4 and 20 characters!',
    passwordConfirm: 'Password confirmation does not match password!',
    success: 'Your Account Has Been Created',
    emailExists: 'Warning: E-Mail Address is already registered!',
  },
  contact: {
    name: 'Name must be between 3 and 32 characters!',
    email: 'E-Mail Address does not appear to be valid!',
    enquiry: 'Enquiry must be between 10 and 3000 characters!',
    success: 'Your enquiry has been successfully sent to the store owner!',
  },
  search: {
    noResults: 'There is no product that',
  },
  cart: {
    empty: 'Your shopping cart is empty!',
    modified: 'Success: You have modified',
    added: 'Success: You have added',
    removed: 'Success: You have modified your shopping cart!',
  },
  checkout: {
    orderPlaced: 'Your order has been placed!',
    noPaymentMethod: 'Warning:',
    mustAgree: 'Warning: You must agree',
    mustAgreeTerms: 'Warning: You must agree to the Terms & Conditions!',
    firstName: 'First Name must be between 1 and 32 characters!',
    lastName: 'Last Name must be between 1 and 32 characters!',
    email: 'E-Mail address does not appear to be valid!',
    telephone: 'Telephone must be between 3 and 32 characters!',
    password: 'Password must be between 4 and 20 characters!',
    address1: 'Address 1 must be between 3 and 128 characters!',
    city: 'City must be between 2 and 128 characters!',
    postcode: 'Postcode must be between 2 and 10 characters!',
  },
  account: {
    edited: 'Success: Your account has been successfully updated.',
    passwordChanged: 'Success: Your password has been successfully updated.',
    addressAdded: 'Success: Your new address has been successfully added.',
    addressDeleted: 'Success: Your address has been successfully deleted.',
    addressUpdated: 'Success: Your address has been successfully updated.',
  },
  wishlist: {
    added: 'Success: You have added',
    modified: 'Success: You have modified your wish list!',
  },
  compare: {
    added: 'Success: You have added',
  },
  newsletter: {
    subscribed: 'Success:',
  },
  common: {
    warning: 'Warning',
    success: 'Success',
    pageNotFound: 'The page you requested cannot be found!',
  },
} as const;

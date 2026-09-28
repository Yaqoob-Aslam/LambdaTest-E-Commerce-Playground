/** Contact-form dataset. */
export interface ContactData {
  valid: {
    name: string;
    email: string;
    enquiry: string;
  };
  invalidEmail: string;
}

/** Shape of `data/testData.json`. */
export interface TestDataSets {
  contact: ContactData;
}

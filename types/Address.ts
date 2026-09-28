/** A postal address used by checkout and address-book flows. */
export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postCode: string;
  country: string;
  /** Region/state label. Optional — only some countries expose zones. */
  zone?: string;
}

/** Shape of `data/addresses.json`. */
export interface AddressesData {
  unitedKingdom: Address;
}

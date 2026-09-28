import { testConfig } from '../config/testConfig';
import { addressesData, productsData, testDataSets, usersData } from '../data';
import type {
  Address,
  CategoryFixture,
  ContactData,
  LoginCredentials,
  ManufacturerFixture,
  Product,
  SearchTerms,
} from '../types';

/**
 * Typed accessors over the centralised data files plus environment overlays.
 * Keeping lookups here means tests never reach into JSON shapes directly.
 */
export class DataUtils {
  /** Registered account credentials from the environment (never committed). */
  static registeredCredentials(): LoginCredentials {
    return {
      email: testConfig.credentials.email,
      password: testConfig.credentials.password,
    };
  }

  /** Whether a registered account has been configured. */
  static hasRegisteredCredentials(): boolean {
    return DataUtils.registeredCredentials().email.trim() !== '' &&
      DataUtils.registeredCredentials().password.trim() !== '';
  }

  static invalidCredentials(): typeof usersData.invalid {
    return usersData.invalid;
  }

  static product(key: string): Product {
    const product = productsData.products[key as keyof typeof productsData.products];
    if (!product) {
      throw new Error(`Unknown product fixture: "${key}"`);
    }
    return product;
  }

  static category(key: string): CategoryFixture {
    const category = productsData.categories[key as keyof typeof productsData.categories];
    if (!category) {
      throw new Error(`Unknown category fixture: "${key}"`);
    }
    return category;
  }

  static manufacturer(key: string): ManufacturerFixture {
    const manufacturer =
      productsData.manufacturers[key as keyof typeof productsData.manufacturers];
    if (!manufacturer) {
      throw new Error(`Unknown manufacturer fixture: "${key}"`);
    }
    return manufacturer;
  }

  static searchTerms(): SearchTerms {
    return productsData.searchTerms;
  }

  static address(key: string): Address {
    const address = addressesData[key as keyof typeof addressesData];
    if (!address) {
      throw new Error(`Unknown address fixture: "${key}"`);
    }
    return address;
  }

  static contact(): ContactData {
    return testDataSets.contact;
  }
}

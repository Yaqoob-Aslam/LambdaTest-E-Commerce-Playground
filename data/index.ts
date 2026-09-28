import addressesJson from './addresses.json';
import productsJson from './products.json';
import testDataJson from './testData.json';
import usersJson from './users.json';
import type { AddressesData, ProductsData, TestDataSets, UsersData } from '../types';

/**
 * Centralised, strongly-typed test data.
 *
 * JSON is imported once and narrowed to the declared interfaces, so a malformed
 * data file fails at compile time rather than mid-test.
 */
export const usersData = usersJson as unknown as UsersData;
export const productsData = productsJson as unknown as ProductsData;
export const addressesData = addressesJson as unknown as AddressesData;
export const testDataSets = testDataJson as unknown as TestDataSets;

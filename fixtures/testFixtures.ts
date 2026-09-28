import { ApiClient } from '../api';
import { DataUtils } from '../utils';
import { expect, test as pageTest } from './pageFixtures';
import type { PageFixtures } from './pageFixtures';

/**
 * Framework-wide fixtures layered on top of the page objects:
 * an `apiClient` for setup/contract checks and `data` for typed datasets.
 */
export interface AppFixtures {
  apiClient: ApiClient;
  data: typeof DataUtils;
}

export const test = pageTest.extend<PageFixtures & AppFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
  data: async ({}, use) => {
    await use(DataUtils);
  },
});

export type { PageFixtures };
export { expect };

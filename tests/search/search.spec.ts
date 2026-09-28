import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Search', () => {
  test(
    // Plan: PRD-P-013
    'TC_SEARCH_001_Search_Product_By_Name',
    { tag: [TAGS.search, TAGS.functional, TAGS.smoke, TAGS.regression] },
    async ({ homePage, searchPage, data }) => {
      const { exact } = data.searchTerms();

      // 1. Search for a product by its full name
      await homePage.open();
      await homePage.searchFor(exact);

      // 2. Verify the results heading and the product link
      await expect(searchPage.resultsHeading(exact)).toBeVisible();
      await expect(searchPage.productLink(exact)).toBeVisible();
    },
  );

  test(
    // Plan: PRD-P-014
    'TC_SEARCH_002_Search_Products_By_Partial_Name',
    { tag: [TAGS.search, TAGS.functional, TAGS.regression] },
    async ({ homePage, searchPage, data }) => {
      const { partial } = data.searchTerms();

      // 1. Search with a partial term
      await homePage.open();
      await homePage.searchFor(partial);

      // 2. Verify the results page renders at least one product
      await expect(searchPage.resultsHeading(partial)).toBeVisible();
      await expect(searchPage.productCards.first()).toBeVisible();
    },
  );

  test(
    // Plan: PRD-N-002
    'TC_SEARCH_003_Non_Existent_Product_Shows_No_Results',
    { tag: [TAGS.search, TAGS.negative, TAGS.regression] },
    async ({ homePage, searchPage, data }) => {
      const { nonExistent } = data.searchTerms();

      // 1. Search for a term with no matching products
      await homePage.open();
      await homePage.searchFor(nonExistent);

      // 2. Verify the no-results state
      await expect(searchPage.noResultsMessage).toBeVisible();
    },
  );

  test(
    // Plan: PRD-N-003
    'TC_SEARCH_004_Special_Characters_Show_No_Results',
    { tag: [TAGS.search, TAGS.negative] },
    async ({ homePage, searchPage, data }) => {
      const { specialCharacters } = data.searchTerms();

      // 1. Search using special characters
      await homePage.open();
      await homePage.searchFor(specialCharacters);

      // 2. Verify the no-results state rather than an error
      await expect(searchPage.noResultsMessage).toBeVisible();
    },
  );

  test(
    'TC_SEARCH_005_Open_Product_From_Search_Results',
    { tag: [TAGS.search, TAGS.product, TAGS.functional, TAGS.regression] },
    async ({ searchPage, productDetailsPage, data }) => {
      const product = data.product('iMac');

      // 1. Open the search results for a product
      await searchPage.open(product.name);

      // 2. Open the product from the results
      await searchPage.openProduct(product.name);

      // 3. Verify the product detail page is displayed
      await expect(productDetailsPage.nameHeading).toHaveText(product.name);
    },
  );
});

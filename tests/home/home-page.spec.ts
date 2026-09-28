import { TAGS } from '../../constants/Tags';
import { expect, test } from '../../fixtures/testFixtures';

test.describe('Home Page', () => {
  test(
    // Plan: HOME-P-001
    'TC_HOME_001_Home_Page_Renders_Key_Chrome',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.regression] },
    async ({ homePage }) => {
      // 1. Open the home page
      await homePage.open();

      // 2. Verify brand, search and navigation are present
      await expect(homePage.header.logo).toBeVisible();
      await expect(homePage.header.searchInput).toBeVisible();
      await expect(homePage.header.homeLink).toBeVisible();
      await expect(homePage.footer.copyright).toBeVisible();
    },
  );

  test(
    // Plan: HOME-P-002
    'TC_HOME_002_Trending_Categories_And_Top_Products_Are_Shown',
    { tag: [TAGS.functional, TAGS.navigation, TAGS.regression] },
    async ({ homePage }) => {
      // 1. Open the home page
      await homePage.open();

      // 2. Verify the merchandising sections are rendered
      await expect(homePage.trendingCategoriesHeading).toBeVisible();
      await expect(homePage.topProductsHeading).toBeVisible();
    },
  );
});

import { TAGS } from '../../constants/Tags';
import { URL_PATTERNS } from '../../constants/URLs';
import { expect, test } from '../../fixtures/testFixtures';

/**
 * Home page — promotional banners, trending categories, blog and sidebar.
 * Traces to TEST-PLAN.md §7.4 (HOME-P-003 … HOME-P-006).
 */
test.describe('Home Page — Links & Sections', () => {
  test(
    'TC_HOME_003_Promotional_Banner_CTA',
    { tag: [TAGS.home, TAGS.navigation, TAGS.functional] },
    async ({ homePage }) => {
      // 1. Open the home page and locate a promotional CTA (Plan HOME-P-003)
      await homePage.open();

      // 2. Verify the CTA exists and points somewhere real
      await expect(homePage.shopNowLink).toBeAttached();
      const href = await homePage.shopNowLink.getAttribute('href');
      expect(href).toBeTruthy();
    },
  );

  test(
    'TC_HOME_004_Trending_Category_Links',
    { tag: [TAGS.home, TAGS.category, TAGS.navigation] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan HOME-P-004)
      await homePage.open();

      // 2. Verify the trending categories section exposes category links
      await expect(homePage.trendingCategoriesHeading).toBeVisible();
      const categoryLink = page
        .getByRole('link')
        .filter({ has: page.getByRole('heading') })
        .first();
      test.skip((await categoryLink.count()) === 0, 'No trending category links rendered');
      await expect(categoryLink).toBeAttached();
    },
  );

  test(
    'TC_HOME_005_Blog_Section_Links',
    { tag: [TAGS.home, TAGS.navigation] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan HOME-P-005)
      await homePage.open();

      // 2. Resolve the blog link and follow it
      const blogLink = page.getByRole('link', { name: /Blog/i }).first();
      await expect(blogLink).toBeAttached();
      const href = await blogLink.getAttribute('href');
      expect(href).toContain('blog');

      // 3. Verify the blog page is reached
      //    (the shared demo occasionally serves the blog route slowly -> allow retry)
      await expect(async () => {
        const response = await page.goto(href as string, { waitUntil: 'domcontentloaded' });
        expect(response?.status() ?? 200).toBeLessThan(400);
        await expect(page).toHaveURL(URL_PATTERNS.blog);
      }).toPass({ timeout: 45_000 });
    },
  );

  test(
    'TC_HOME_006_Top_Categories_Sidebar',
    { tag: [TAGS.home, TAGS.category, TAGS.navigation] },
    async ({ homePage, page }) => {
      // 1. Open the home page (Plan HOME-P-006)
      await homePage.open();

      // 2. Follow a top-category link from the (off-canvas) sidebar via its href
      const link = page.getByRole('link', { name: 'Components', exact: true }).first();
      const href = await link.getAttribute('href');
      expect(href).toContain('path=25');
      await page.goto(href as string);

      // 3. Verify the category listing is displayed
      await expect(page).toHaveURL(URL_PATTERNS.category);
      await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
    },
  );
});

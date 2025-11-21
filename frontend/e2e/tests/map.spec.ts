import { test, expect } from '@playwright/test';
import { LOCALES } from '../config/locales';


/**
 * Test suite for the embedded map
 */
test.describe('Embedded Map', () => {
  LOCALES.forEach((locale) => {
    test(`should load the map in ${locale}`, async ({ page }) => {
      // 1. Navigation with extended timeout
      await page.goto(`http://localhost:3000/${locale}/parks`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // 2. Verify that the iframe exists and is visible
      const iframe = page.frameLocator('iframe').first();
      await expect(page.locator('iframe')).toBeVisible({ timeout: 20000 });

      // 3. Verify the URL of the iframe (without entering its content)
      const iframeSrc = await page.locator('iframe').getAttribute('src');
      expect(iframeSrc).toContain(`parqueCanino_${locale}.html`);

      // 4. Optional: Verify iframe dimensions
      const iframeBox = await page.locator('iframe').boundingBox();
      expect(iframeBox?.width).toBeGreaterThan(100);
      expect(iframeBox?.height).toBeGreaterThan(100);
    });
  });
});
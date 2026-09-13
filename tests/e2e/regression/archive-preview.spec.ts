/* 歸檔層級與歷史導航需依序驗證。 */
/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  for (const width of [1440, 390]) {
    test(`@regression 歸檔時間線預覽與導航 (${theme}, ${width})`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (value) => localStorage.setItem("shokax-color-scheme", value),
        theme,
      );
      for (const route of ["/archives/", "/archives/2026/", "/archives/2026/08/"]) {
        await page.goto(route);
        const entries = page.locator(".archive-entry");
        await expect(entries.first()).toBeVisible();
        await expect(entries.first().locator(".archive-excerpt")).not.toBeEmpty();
        await expect(entries.first().getByRole("link", { name: "閱讀更多" })).toBeVisible();
        const dates = await entries
          .locator("time")
          .evaluateAll((items) => items.map((item) => item.getAttribute("datetime") ?? ""));
        expect(dates).toEqual([...dates].toSorted().toReversed());
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        const image = page.locator(".archive-cover img").first();
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
          .toBeGreaterThan(0);
      }
      await page.evaluate(() => Reflect.set(window, "archiveNavigationMarker", true));
      const link = page.locator(".archive-copy h3 a").first();
      const href = await link.getAttribute("href");
      await link.click();
      await expect(page).toHaveURL(href!);
      await page.goBack();
      await expect(page).toHaveURL("/archives/2026/08/");
      expect(await page.evaluate(() => Reflect.get(window, "archiveNavigationMarker"))).toBe(true);
    });
  }
}

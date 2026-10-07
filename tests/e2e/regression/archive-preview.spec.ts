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
      for (const route of [
        "/archives/",
        "/archives/2026/",
        "/categories/%E5%BF%83%E5%BE%97/",
        "/tags/cpe/",
        "/archives/2026/08/",
      ]) {
        await page.goto(route);
        const entries = page.locator(".archive-entry");
        await expect(entries.first()).toBeVisible();
        await expect(entries.first().locator(".archive-excerpt")).not.toBeEmpty();
        await expect(entries.first().getByRole("link", { name: "閱讀更多" })).toHaveCount(0);
        const firstCard = entries.first().locator(".archive-card");
        const titleLink = firstCard.locator("h3 a");
        const postHref = await titleLink.getAttribute("href");
        // 點卡片右上角留白，確認不是只有標題能導覽。
        const cardBounds = await firstCard.boundingBox();
        await firstCard.click({ position: { x: cardBounds!.width - 8, y: 8 } });
        await expect(page).toHaveURL(postHref!);
        await page.goBack();
        await expect(page).toHaveURL(route);
        const dates = await entries
          .locator("time")
          .evaluateAll((items) => items.map((item) => item.getAttribute("datetime") ?? ""));
        expect(dates).toEqual([...dates].toSorted().toReversed());
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        const images = page.locator(".archive-cover img");
        if ((await images.count()) === 0) continue;
        const image = images.first();
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

test("@regression 歸檔卡片保留分類導覽與鍵盤文章導覽", async ({ page }) => {
  await page.goto("/archives/");
  const card = page.locator(".archive-card").first();
  const category = card.locator(".archive-category");
  const categoryHref = await category.getAttribute("href");
  await category.click();
  await expect(page).toHaveURL(categoryHref!);
  await page.goBack();
  const titleLink = card.locator("h3 a");
  const postHref = await titleLink.getAttribute("href");
  await card.locator(".archive-category").focus();
  await page.keyboard.press("Tab");
  await expect(titleLink).toBeFocused();
  await expect(card).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(postHref!);
});

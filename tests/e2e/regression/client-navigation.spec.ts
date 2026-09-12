/* 连续导航必须按顺序执行，才能验证同一页面会话。 */
/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/test";
import { openSearchDialog } from "../support/search";

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`@regression 站内切换与前进后退不重载页面 (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    await expect(page.locator("#loading")).toHaveClass(/hidden/);
    const initialTitle = await page.title();
    const initialFont = await page.locator("body").evaluate((el) => el.style.fontFamily);
    expect(initialFont).not.toBe("");
    await page.evaluate(() => Reflect.set(window, "navigationMarker", "same-document"));
    await page.evaluate(() => localStorage.setItem("shokax-color-scheme", "dark"));

    await page.locator('#nav a[href="/friends/"]').click();
    await expect(page).toHaveURL(/\/friends\/$/);
    await expect(page).not.toHaveTitle(initialTitle);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("#loading")).toHaveClass(/hidden/);
    await expect
      .poll(() => page.locator("body").evaluate((el) => el.style.fontFamily))
      .toBe(initialFont);

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveTitle(initialTitle);
    await expect(page.locator("#segment-container article").first()).toHaveClass(/show/);
    await page.goForward();
    await expect(page).toHaveURL(/\/friends\/$/);
    await expect
      .poll(() => page.evaluate(() => Reflect.get(window, "navigationMarker")))
      .toBe("same-document");

    const searchDialog = await openSearchDialog(page);
    await page.keyboard.press("Escape");
    await expect(searchDialog).not.toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("#nav").getByRole("button", { name: "切換側欄" }).click();
    await expect(page.locator("#sidebar")).toHaveClass(/\bon\b/);
  });
}

test("@regression 连续使用随机文章仍保持客户端导航", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#loading")).toHaveClass(/hidden/);
  await page.evaluate(() => Reflect.set(window, "navigationMarker", "same-document"));
  for (let i = 0; i < 2; i++) {
    // 当前导航配置未展示随机入口，使用普通站内链接验证该路由。
    await page.evaluate(() => {
      const link = document.createElement("a");
      link.href = "/random/";
      link.id = "random-navigation-test";
      link.style.cssText = "position:fixed;top:100px;left:10px;z-index:99999";
      link.textContent = "随机文章";
      document.body.prepend(link);
    });
    await page.locator("#random-navigation-test").click();
    await expect(page).toHaveURL(/\/posts\/.+\/$/);
    await expect(page.locator("#loading")).toHaveClass(/hidden/);
    await expect
      .poll(() => page.evaluate(() => Reflect.get(window, "navigationMarker")))
      .toBe("same-document");
  }
});

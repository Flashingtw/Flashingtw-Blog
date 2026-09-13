import { expect, test } from "@playwright/test";

test("@regression 切換主題立即生成新粒子，舊粒子持續飄完", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => localStorage.setItem("shokax-color-scheme", "light"));
  await page.goto("/");
  const layer = page.locator("#seasonal-weather");
  await expect(layer.locator('[data-kind="sakura"]').first()).toBeAttached();
  await expect(layer).toHaveCSS("pointer-events", "none");
  const petal = await layer.locator(".seasonal-particle").first().elementHandle();
  const before = await petal!.evaluate((el) => getComputedStyle(el).transform);
  await page.getByRole("button", { name: "切換主題" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.waitForTimeout(800);
  expect(await petal!.evaluate((el) => el.isConnected)).toBe(true);
  expect(await petal!.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
  await expect(layer.locator('[data-kind="snow"]').first()).toBeAttached({ timeout: 1500 });
  // 只結束舊花瓣；新雪花應保持在畫面上。
  await layer.evaluate((el) =>
    el
      .querySelectorAll('[data-kind="sakura"]')
      .forEach((particle) => particle.getAnimations().forEach((animation) => animation.finish())),
  );
  await expect(layer.locator('[data-kind="sakura"]')).toHaveCount(0);
  await expect(layer.locator('[data-kind="snow"]').first()).toBeAttached();
});

test("@regression 換頁保留粒子，減少動態偏好會停止效果", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const layer = page.locator("#seasonal-weather");
  await expect(layer.locator(".seasonal-particle").first()).toBeAttached();
  await layer.evaluate((el) => Reflect.set(window, "weatherLayer", el));
  await page.locator('#nav a[href="/friends/"]').click();
  await expect(page).toHaveURL("/friends/");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await layer.evaluate((el) => Reflect.get(window, "weatherLayer") === el)).toBe(true);
  await expect(layer).toHaveCount(1);
  expect(await layer.locator(".seasonal-particle").count()).toBeLessThanOrEqual(14);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(layer.locator(".seasonal-particle")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(layer.locator(".seasonal-particle").first()).toBeAttached();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("@regression 初次開啟減少動態模式不生成粒子", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#seasonal-weather")).toHaveCSS("display", "none");
  await page.waitForTimeout(800);
  await expect(page.locator(".seasonal-particle")).toHaveCount(0);
});

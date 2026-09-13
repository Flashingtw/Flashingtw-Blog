/* 捲动門檻前後的測量必須依序進行。 */
/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/test";
import sharp from "sharp";

test("@regression 側欄固定前後位置連續", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tags/");
  await expect(page.locator("#loading")).toHaveCSS("opacity", "0");
  const inner = page.locator("#sidebar > .inner");
  const initial = await inner.evaluate((el) => ({
    top: el.getBoundingClientRect().top + scrollY,
    margin: Number.parseFloat(getComputedStyle(el).marginTop),
    left: el.getBoundingClientRect().left,
  }));
  const threshold = initial.top - initial.margin;
  for (const offset of [-58, -54, -2, 2, -2, -54, -58]) {
    await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), threshold + offset);
    await page.waitForTimeout(100);
    const position = await inner.evaluate((el) => ({
      top: el.getBoundingClientRect().top,
      left: el.getBoundingClientRect().left,
      scroll: scrollY,
    }));
    expect(
      Math.abs(position.top - Math.max(initial.top - position.scroll, initial.margin)),
    ).toBeLessThan(2);
    expect(Math.abs(position.left - initial.left)).toBeLessThan(2);
  }
});

for (const width of [1280, 1440]) {
  test(`@regression 短頁面捲動時隨機文章位置與頁面高度穩定 (${width})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/tags/");
    await expect(page.locator(".layout-main-widgets .rpost")).toBeVisible();
    await expect(page.locator("#loading")).toHaveCSS("opacity", "0");
    const threshold = await page
      .locator("#sidebar")
      .evaluate((el) => el.getBoundingClientRect().top + scrollY);
    const positions: number[] = [];
    const heights: number[] = [];
    for (const top of [threshold - 2, threshold + 2, threshold - 2, threshold + 2]) {
      await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top);
      await page.waitForTimeout(350);
      if (top > threshold) await expect(page.locator("#sidebar")).toHaveClass(/affix/);
      else await expect(page.locator("#sidebar")).not.toHaveClass(/affix/);
      positions.push(
        await page
          .locator(".layout-main-widgets")
          .evaluate((el) => el.getBoundingClientRect().top + scrollY),
      );
      heights.push(await page.evaluate(() => document.documentElement.scrollHeight));
    }
    expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(2);
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(2);
  });
}

test("@regression 深色短頁面的頁尾間距沒有背景色帶", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.addInitScript(() => localStorage.setItem("shokax-color-scheme", "dark"));
  await page.goto("/tags/");
  await expect(page.locator(".layout-main-widgets .rpost")).toBeVisible();
  await expect(page.locator("#loading")).toHaveCSS("opacity", "0");
  await page.evaluate(() =>
    scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }),
  );
  await page.waitForTimeout(500);
  const top = await page
    .locator("#footer")
    .evaluate((el) => Math.round(el.getBoundingClientRect().top));
  const { data, info } = await sharp(await page.screenshot())
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixel = (y: number) => [
    ...data.subarray(
      (y * info.width + 2) * info.channels,
      (y * info.width + 2) * info.channels + 3,
    ),
  ];
  const before = pixel(top - 8);
  const after = pixel(top + 2);
  expect(
    Math.max(...before.map((value, index) => Math.abs(value - after[index]))),
  ).toBeLessThanOrEqual(1);
});

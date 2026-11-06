import { expect, test } from "@playwright/test";
import translations from "../../../src/i18n/locales/zh-TW.json" with { type: "json" };

test("@critical @regression 手機程式碼保留整行並可左右捲動", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/posts/apcs/26111-h/", { waitUntil: "domcontentloaded" });
  const block = page.locator("code-block").first();
  const expand = block.getByRole("button", { name: translations.codeBlock.expand });
  await expect(expand).toBeVisible();
  await expect(block.locator(".content-container")).toHaveClass(/collapsed/);
  const pre = block.locator("pre");
  const line = pre.locator(".line").filter({ hasText: "dp[u][1] += min(dp[v][0],dp[v][1]);" });
  await expect(line).toHaveCount(1);
  const size = await line.evaluate((el) => ({
    height: el.getBoundingClientRect().height,
    lineHeight: Number.parseFloat(getComputedStyle(el).lineHeight),
  }));
  expect(size.height).toBeLessThanOrEqual(size.lineHeight + 1);

  const before = await pre.evaluate((el) => ({
    width: el.clientWidth,
    scrollWidth: el.scrollWidth,
  }));
  expect(before.scrollWidth).toBeGreaterThan(before.width);
  const start = await line.evaluate((el) => el.getBoundingClientRect().left);
  await pre.evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  await expect.poll(() => pre.evaluate((el) => el.scrollLeft)).toBeGreaterThan(20);
  expect(await line.evaluate((el) => el.getBoundingClientRect().left)).toBeLessThan(start - 20);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  await expand.focus();
  await page.keyboard.press("Enter");
  await expect(block.locator(".content-container")).not.toHaveClass(/collapsed/);
  await expect.poll(() => pre.evaluate((el) => el.scrollLeft)).toBeGreaterThan(20);
  await block.getByRole("button", { name: translations.codeBlock.enterFullscreen }).click();
  await expect(block.locator(".codeblock")).toHaveClass(/fullscreen/);
  expect(await pre.evaluate((el) => el.scrollWidth)).toBeGreaterThan(
    await pre.evaluate((el) => el.clientWidth),
  );
});

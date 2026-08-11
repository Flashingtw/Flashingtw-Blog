import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";

test("@regression 關於我使用專屬個人概覽而非文章資訊", async ({ page }) => {
  await page.goto(ROUTES.about);

  const article = page.locator("article.about-page");
  await expect(article.getByRole("heading", { name: /我是 Flashingtw/ })).toBeVisible();
  await expect(article.getByText("大安電研社社長", { exact: true })).toBeVisible();
  await expect(article.getByText("最後更新")).toBeVisible();
  await expect(article.locator(":scope > header")).toHaveCount(0);
  await expect(article.getByText("閱讀時間", { exact: true })).toHaveCount(0);

  const featuredContent = article.getByRole("region", { name: "有把它做出來的東西" });
  await expect(featuredContent.getByRole("link")).toHaveCount(4);
  await expect(featuredContent.getByRole("link", { name: /DungeonGenerator/ })).toBeVisible();
  await expect(featuredContent.getByRole("link", { name: /CityGenerator/ })).toBeVisible();
});

test("@regression 關於我時間線具備完整語意與文章連結", async ({ page }) => {
  await page.goto(ROUTES.about);

  const timeline = page.locator("[data-about-timeline]");
  await expect(timeline).toBeVisible();
  await expect(timeline.getByRole("heading", { name: "2026" })).toBeVisible();
  await expect(timeline.getByRole("heading", { name: "2025" })).toBeVisible();
  await expect(timeline.locator("[data-timeline-event]")).toHaveCount(12);

  const ytpLink = timeline.getByRole("link", { name: "看相關紀錄" }).filter({
    has: page.locator('i[class*="arrow-right"]'),
  });
  await expect(ytpLink).toHaveCount(4);

  const dates = timeline.locator("time");
  await expect(dates).toHaveCount(12);
  await expect(dates.first()).toHaveAttribute("datetime", "2026-08-14");
});

test("@regression 關於我時間線在手機尺寸不會產生水平捲動", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ROUTES.about);

  const firstEvent = page.locator("[data-timeline-event]").first();
  await expect(firstEvent).toBeVisible();
  await expect(
    firstEvent.getByRole("heading", {
      name: "第 12 屆成大高中生程式設計邀請賽決賽",
    }),
  ).toBeVisible();

  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
});

test("@regression 關於我 Discord 按鈕可提供複製結果", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(ROUTES.about);

  const discordButton = page.getByRole("button", { name: "複製 Discord 帳號 flash.zcx" });
  await discordButton.click();
  await expect(discordButton.getByRole("status")).toHaveText("已複製 flash.zcx :D");
});

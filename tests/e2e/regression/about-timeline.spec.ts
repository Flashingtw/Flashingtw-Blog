import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";

test("@regression 關於我使用專屬個人概覽而非文章資訊", async ({ page }) => {
  await page.goto(ROUTES.about);

  const article = page.locator("article.about-page");
  await expect(article.getByRole("heading", { name: /歡迎來到我的網站/ })).toBeVisible();
  await expect(article.getByText("大安高工電子科 · 準高二")).toBeVisible();
  await expect(article.getByText("大安電研社社長", { exact: true })).toBeVisible();
  await expect(article.getByText("最後更新")).toBeVisible();
  await expect(article.locator(":scope > header")).toHaveCount(0);
  await expect(article.getByText("閱讀時間", { exact: true })).toHaveCount(0);

  const featuredContent = article.getByRole("region", { name: "三個精選小專案" });
  await expect(featuredContent.getByRole("link")).toHaveCount(3);
  await expect(featuredContent.getByRole("link", { name: /DungeonGenerator/ })).toBeVisible();
  await expect(featuredContent.getByRole("link", { name: /CityGenerator/ })).toBeVisible();
  await expect(featuredContent.getByRole("link", { name: /CP-Practice/ })).toHaveAttribute(
    "href",
    "https://github.com/Flashingtw/CP-Practice",
  );
  await expect(featuredContent.locator('img[src="/assets/projects/minecraft.svg"]')).toHaveCount(2);
  await expect(featuredContent.locator('img[src="/assets/projects/terminal.svg"]')).toHaveCount(1);
});

test("@regression 關於我時間線具備完整語意與文章連結", async ({ page }) => {
  await page.goto(ROUTES.about);

  const timeline = page.locator("[data-about-timeline]");
  await expect(timeline).toBeVisible();
  await expect(timeline.getByText("2026", { exact: true })).toBeVisible();
  await expect(timeline.getByText("2025", { exact: true })).toBeAttached();
  await expect(timeline.locator("[data-timeline-event]")).toHaveCount(13);

  const relatedLinks = timeline.getByRole("link", { name: "看相關紀錄" }).filter({
    has: page.locator('i[class*="arrow-right"]'),
  });
  await expect(relatedLinks).toHaveCount(6);

  const dates = timeline.locator("time");
  await expect(dates).toHaveCount(13);
  await expect(dates.first()).toHaveAttribute("datetime", "2026-10-06");
  const cpe = timeline.locator("[data-timeline-event]").first();
  await expect(cpe.getByText("4/7 題｜總排名 31・高中職第 2")).toBeVisible();
  await expect(cpe.getByText("重點", { exact: true })).toBeVisible();
  await expect(cpe.getByRole("link", { name: "看相關紀錄" })).toHaveAttribute(
    "href",
    "/posts/experience/cpe/",
  );
});

test("@regression 關於我時間線在手機尺寸不會產生水平捲動", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ROUTES.about);

  const firstEvent = page.locator("[data-timeline-event]").first();
  await expect(firstEvent).toBeVisible();
  await expect(
    firstEvent.getByRole("heading", {
      name: "CPE 大學程式能力檢定・臺大考場",
    }),
  ).toBeVisible();

  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
});

test("@regression 首頁最新文章提供摘要與可用的文章入口", async ({ page }) => {
  await page.goto("/");
  const recentPosts = page.getByRole("region", { name: "最近寫的文章" });
  await expect(recentPosts.locator("article")).toHaveCount(3);
  await expect(recentPosts.locator("article").first().getByRole("heading")).toHaveText(
    "CPE 2026/10/06 心得",
  );
  await expect(recentPosts.getByRole("link", { name: "所有文章" })).toHaveAttribute(
    "href",
    "/archives/",
  );
  const readLink = recentPosts
    .locator("article")
    .first()
    .getByRole("link", { name: /^閱讀：/ });
  await expect(readLink).toHaveAttribute("href", "/posts/experience/cpe/");
  await readLink.click();
  await expect(page).toHaveURL(/\/posts\/experience\/cpe\/$/);
  await expect(
    page.locator("#main").getByRole("heading", { name: "CPE 2026/10/06 心得", exact: true }),
  ).toBeVisible();
});

test("@regression 關於我 Discord 按鈕可提供複製結果", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(ROUTES.about);

  const discordButton = page.getByRole("button", { name: "複製 Discord 帳號 flash.zcx" });
  await discordButton.click();
  await expect(discordButton.getByRole("status")).toHaveText("已複製 flash.zcx :D");
});

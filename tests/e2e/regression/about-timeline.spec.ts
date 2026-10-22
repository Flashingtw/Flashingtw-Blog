import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";
import { aboutIntro, aboutProjects } from "../../../src/data/about";
import timelineEvents from "../../../src/data/about-timeline.json" with { type: "json" };

const latestEvent = timelineEvents.toSorted((a, b) => b.datetime.localeCompare(a.datetime))[0];

test("@regression 關於我使用專屬個人概覽而非文章資訊", async ({ page }) => {
  await page.goto(ROUTES.about);

  const article = page.locator("article.about-page");
  await expect(
    article.getByRole("heading", { name: aboutIntro.greeting, exact: true }),
  ).toBeVisible();
  await expect(article.getByText(`${aboutIntro.school} · ${aboutIntro.grade}`)).toBeVisible();
  await expect(article.getByText("大安電研社社長", { exact: true })).toBeVisible();
  await expect(article.getByText("最後更新")).toBeVisible();
  await expect(article.locator(":scope > header")).toHaveCount(0);
  await expect(article.getByText("閱讀時間", { exact: true })).toHaveCount(0);

  const featuredContent = article.getByRole("region", { name: "三個精選小專案" });
  await expect(featuredContent.getByRole("link")).toHaveCount(aboutProjects.length);
  await Promise.all(
    aboutProjects.map(async (project) => {
      const link = featuredContent.getByRole("link").filter({ hasText: project.name });
      await expect(link).toHaveAttribute("href", project.href);
      await expect(link.locator("img")).toHaveAttribute("src", project.image);
    }),
  );
});

test("@regression 關於我時間線具備完整語意與文章連結", async ({ page }) => {
  await page.goto(ROUTES.about);

  const timeline = page.locator("[data-about-timeline]");
  await expect(timeline).toBeVisible();
  await expect(timeline.getByText("2026", { exact: true })).toBeVisible();
  await expect(timeline.getByText("2025", { exact: true })).toBeAttached();
  await expect(timeline.locator("[data-timeline-event]")).toHaveCount(timelineEvents.length);

  const relatedLinks = timeline.getByRole("link", { name: /^閱讀：/ });
  await expect(relatedLinks).toHaveCount(timelineEvents.filter((event) => event.href).length);

  const dates = timeline.locator("time");
  await expect(dates).toHaveCount(timelineEvents.length);
  await expect(dates.first()).toHaveAttribute("datetime", latestEvent.datetime);
  const cpe = timeline.locator("[data-timeline-event]").first();
  await expect(cpe.getByText(latestEvent.result)).toBeVisible();
  await expect(cpe.getByText("重點", { exact: true })).toBeVisible();
  await expect(cpe.getByRole("link", { name: `閱讀：${latestEvent.title}` })).toHaveAttribute(
    "href",
    latestEvent.href!,
  );
});

test("@regression 關於我時間線在手機尺寸不會產生水平捲動", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ROUTES.about);

  const firstEvent = page.locator("[data-timeline-event]").first();
  await expect(firstEvent).toBeVisible();
  await expect(
    firstEvent.getByRole("heading", {
      name: latestEvent.title,
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
  const title = await recentPosts.locator("article").first().getByRole("heading").innerText();
  await expect(recentPosts.getByRole("link", { name: "所有文章" })).toHaveAttribute(
    "href",
    "/archives/",
  );
  const readLink = recentPosts
    .locator("article")
    .first()
    .getByRole("link", { name: /^閱讀：/ });
  const href = await readLink.getAttribute("href");
  expect(href).toMatch(/^\/posts\/.+\/$/);
  await expect(recentPosts.getByText("繼續看", { exact: true })).toHaveCount(0);
  await readLink.click({ position: { x: 8, y: 8 } });
  await expect(page).toHaveURL(href!);
  await expect(
    page.locator("#main").getByRole("heading", { name: title, exact: true }),
  ).toBeVisible();
  await page.goto(ROUTES.archives);
  await expect(page.locator(".archive-copy h3 a").first()).toHaveAttribute("href", href!);
});

test("@regression 關於我 Discord 按鈕可提供複製結果", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(ROUTES.about);

  const discordButton = page.getByRole("button", { name: "複製 Discord 帳號 flash.zcx" });
  await discordButton.click();
  await expect(discordButton.getByRole("status")).toHaveText("已複製 flash.zcx :D");
});

test("@regression 首頁時間線卡片提供滑過提示與整張導覽", async ({ page }) => {
  await page.goto("/");
  const timeline = page.locator("[data-about-timeline]");
  const card = timeline.locator(".timeline-card--linked").first();
  const hint = card.locator(".timeline-card__hint");
  await expect(hint).toHaveCSS("opacity", "0");
  await card.hover();
  await expect(hint).toHaveCSS("opacity", "1");
  await card.click({ position: { x: 8, y: 8 } });
  await expect(page).toHaveURL(latestEvent.href!);
  await page.goBack();
  await card.locator("a").focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(hint).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(latestEvent.href!);
  await page.goBack();
  await expect(timeline.locator(".timeline-card:not(.timeline-card--linked) a")).toHaveCount(0);
});

test("@regression 首頁時間線文章入口與舊 CPE 網址都有效", async ({ page, request }) => {
  const responses = await Promise.all(
    timelineEvents.filter((event) => event.href).map((event) => request.get(event.href!)),
  );
  for (const response of responses) {
    expect(response.ok(), response.url()).toBe(true);
  }
  await page.goto("/posts/experience/cpe/");
  await expect(page).toHaveURL("/posts/experience/cpe-261002/");
});

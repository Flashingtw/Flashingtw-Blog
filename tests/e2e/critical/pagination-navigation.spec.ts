import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";

test("@critical 首頁只呈現個人介紹，文章入口仍可用", async ({ page }) => {
  await page.goto(ROUTES.home);
  await expect(page.locator("article.about-page")).toBeVisible();
  await expect(page.locator("#segment-container, nav.pagination, .breadcrumb")).toHaveCount(0);
  await expect(page.locator('#nav a[href="/about/"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://flashing.tw/",
  );
  await expect(page.locator('[itemtype="https://schema.org/ProfilePage"]')).toHaveCount(1);
  await page.locator("#nav").getByRole("button", { name: "文章", exact: true }).hover();
  await page.locator('#nav a[href="/archives/"]').click();
  await expect(page).toHaveURL(ROUTES.archives);
  await expect(page.locator('.timeline article a[href^="/posts/"]').first()).toBeVisible();
});

test("@critical 舊關於我與首頁分頁轉到新入口", async ({ page, request }) => {
  await page.goto(ROUTES.legacyAbout);
  await expect(page).toHaveURL(ROUTES.home);
  await expect(page.locator("article.about-page")).toBeVisible();
  await page.goto(ROUTES.page2);
  await expect(page).toHaveURL(ROUTES.archives);
  const sitemap = await request.get("/sitemap-0.xml");
  const xml = await sitemap.text();
  expect(xml).toContain("<loc>https://flashing.tw/</loc>");
  expect(xml).not.toContain("https://flashing.tw/about/");
  expect(xml).not.toContain("https://flashing.tw/page/2/");
});

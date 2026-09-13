/* 舊網址與同一頁滾動須依序驗證。 */
/* eslint-disable no-await-in-loop */
import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`@regression 動態可在同頁讀完全部內容 (${width})`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/moments/");
    const cards = page.locator(".moments-timeline .moment-card");
    await expect(cards).toHaveCount(14);
    await expect(page.locator("nav.pagination, link[rel=next], link[rel=prev]")).toHaveCount(0);
    const dates = await cards
      .locator("time")
      .evaluateAll((items) => items.map((item) => item.getAttribute("datetime") ?? ""));
    expect(dates).toEqual([...dates].toSorted((a, b) => b.localeCompare(a)));
    await page.evaluate(() => Reflect.set(window, "momentsMarker", true));
    await cards.last().scrollIntoViewIfNeeded();
    await expect(cards.last()).toBeInViewport();
    expect(await page.evaluate(() => Reflect.get(window, "momentsMarker"))).toBe(true);
    await expect(page).toHaveURL("/moments/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      await cards
        .locator("img")
        .evaluateAll((images) => images.every((image) => image.getAttribute("loading") === "lazy")),
    ).toBe(true);
  });
}

test("@regression 舊動態分頁轉到完整列表，sitemap 只保留主頁", async ({ page, request }) => {
  for (const route of ["/moments/2/", "/moments/3/", "/moments/page/2/", "/moments/page/3/"]) {
    await page.goto(route);
    await expect(page).toHaveURL("/moments/");
    await expect(page.locator(".moment-card")).toHaveCount(14);
  }
  const xml = await (await request.get("/sitemap-0.xml")).text();
  expect(xml).toContain("<loc>https://flashing.tw/moments/</loc>");
  expect(xml).not.toMatch(/<loc>https:\/\/flashing\.tw\/moments\/(?:page\/)?\d+\//);
});

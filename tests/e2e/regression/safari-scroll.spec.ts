/* 回彈座標與捲動門檻必須依序送出，才能重現 Safari 的方向判斷。 */
/* eslint-disable no-await-in-loop */
import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page, baseURL }) => {
  await page.bringToFront();
  // 只驗證站內版面與互動，避免外部統計、留言和圖片拖延載入。
  const siteOrigin = new URL(baseURL!).origin;
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === siteOrigin ? route.continue() : route.abort(),
  );
});

async function replayScrollOffsets(page: Page, offsets: number[]) {
  // Windows WebKit 沒有原生回彈，模擬 Safari 會暴露給 scroll listener 的座標。
  await page.evaluate(async (values) => {
    const descriptor = Object.getOwnPropertyDescriptor(window, "scrollY");
    try {
      for (const value of values) {
        Object.defineProperty(window, "scrollY", { configurable: true, value });
        window.dispatchEvent(new Event("scroll"));
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
      }
    } finally {
      if (descriptor) Object.defineProperty(window, "scrollY", descriptor);
      else Reflect.deleteProperty(window, "scrollY");
    }
  }, offsets);
}

async function settleNavigation(page: Page) {
  await page.locator("#nav").evaluate(async (nav) => {
    await Promise.allSettled(nav.getAnimations().map((animation) => animation.finished));
  });
}

test("@regression Safari 頂端回彈後仍能點擊導覽列", async ({ page, hasTouch }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#loading")).toHaveClass(/hidden/);
  await page.waitForFunction(
    () => !document.querySelector("#nav")?.closest("astro-island")?.hasAttribute("ssr"),
    undefined,
    { polling: 50 },
  );

  const themeButton = page.locator("#nav button[aria-label='切換主題']");
  const before = await page.locator("html").getAttribute("data-theme");
  await themeButton.click();
  const current = before === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", current);
  const box = await themeButton.boundingBox();
  expect(box).not.toBeNull();

  await replayScrollOffsets(page, [0, -60, -30, -8, 0]);
  await settleNavigation(page);
  // 固定畫面座標點擊，避免 locator 自動捲動將藏起來的導覽列帶回來。
  const point = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
  if (hasTouch) await page.touchscreen.tap(point.x, point.y);
  else await page.mouse.click(point.x, point.y);
  await expect(page.locator("html")).toHaveAttribute("data-theme", before!, { timeout: 3000 });
});

test("@regression Safari 底端回彈不誤判方向，往上捲仍會顯示導覽列", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#loading")).toHaveClass(/hidden/);
  await page.waitForFunction(
    () => !document.querySelector("#nav")?.closest("astro-island")?.hasAttribute("ssr"),
    undefined,
    { polling: 50 },
  );
  const maximum = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), maximum);
  const navBottom = () => page.locator("#nav").evaluate((el) => el.getBoundingClientRect().bottom);
  await expect.poll(navBottom).toBeLessThanOrEqual(0);

  await replayScrollOffsets(page, [maximum, maximum + 60, maximum + 30, maximum]);
  await settleNavigation(page);
  await expect.poll(navBottom).toBeLessThanOrEqual(0);
  await page.evaluate((y) => scrollTo({ top: y - 100, behavior: "instant" }), maximum);
  await expect.poll(navBottom).toBeGreaterThan(49);
});

test("@regression Safari 側邊欄固定前後不蓋住正文", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tags/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#loading")).toHaveClass(/hidden/);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
  const threshold = await page
    .locator("#sidebar")
    .evaluate((el) => el.getBoundingClientRect().top + scrollY);

  for (const top of [0, threshold + 100]) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top);
    if (top > threshold) await expect(page.locator("#sidebar")).toHaveClass(/affix/);
    const boxes = await page.evaluate(() => {
      const sidebar = document.querySelector("#sidebar > .inner")!.getBoundingClientRect();
      const main = document.querySelector("#main")!.getBoundingClientRect();
      return { sidebarRight: sidebar.right, mainLeft: main.left };
    });
    expect(boxes.sidebarRight).toBeLessThanOrEqual(boxes.mainLeft);
  }
});

test("@regression Safari 平板側欄開合後正文仍能點擊", async ({ page, hasTouch }) => {
  test.skip(!hasTouch, "此案例驗證觸控平板抽屜。");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#loading")).toHaveClass(/hidden/);
  const sidebar = page.locator("#sidebar");
  await page.locator("#nav button[aria-label='切換側欄']").tap();
  await expect(sidebar).toHaveClass(/\bon\b/);
  const link = sidebar.getByRole("link", { name: "文章", exact: true });
  await expect(link).toBeInViewport();
  await link.tap();
  await expect(page).toHaveURL(/\/archives\/$/);
  await page.locator(".dimmer.active").tap({ position: { x: 10, y: 100 } });
  await expect(sidebar).not.toHaveClass(/\bon\b/);
  const themeButton = page.locator("#nav button[aria-label='切換主題']");
  const theme = await page.locator("html").getAttribute("data-theme");
  await themeButton.tap();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    theme === "dark" ? "light" : "dark",
  );
});

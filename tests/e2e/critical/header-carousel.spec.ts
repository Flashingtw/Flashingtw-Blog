import { expect, test } from "@playwright/test";
import { ROUTES } from "../support/routes";

test("@critical 頂部封面輪播始終只有一張活動圖片", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(ROUTES.home);

  const carousel = page.locator("[data-cover-carousel]");
  const items = carousel.locator(".cover-item");
  const activeItems = carousel.locator(".cover-item.is-active");

  await expect(carousel).toBeVisible();
  expect(await items.count()).toBeGreaterThan(1);
  await expect(activeItems).toHaveCount(1);

  const initialImage = await carousel.locator(".cover-item.is-active img").getAttribute("src");
  expect(initialImage).toBeTruthy();

  const animation = await carousel.locator(".cover-item.is-active img").evaluate((image) => {
    const style = getComputedStyle(image);
    return {
      duration: style.animationDuration,
      name: style.animationName,
    };
  });
  expect(animation).toEqual({
    duration: "6s",
    name: "cover-image-zoom",
  });

  await expect
    .poll(() => carousel.locator(".cover-item.is-active img").getAttribute("src"), {
      timeout: 8_000,
    })
    .not.toBe(initialImage);

  await expect(activeItems).toHaveCount(1);
});

test("@critical 換頁與歷史導航保留封面及輪播進度", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(ROUTES.home);
  const carousel = page.locator("[data-cover-carousel]");
  await expect(carousel).toHaveAttribute("data-carousel-initialized", "true");
  await carousel.evaluate((el) => Reflect.set(window, "originalCarousel", el));
  const initialImage = await carousel.locator(".is-active img").getAttribute("src");
  await page.waitForTimeout(3000);
  const animation = await carousel
    .locator(".is-active img")
    .evaluateHandle((el) => el.getAnimations()[0]);
  const progress = await animation.evaluate((value) => Number(value.currentTime));

  await page.locator('#nav a[href="/friends/"]').click();
  await expect(page).toHaveURL("/friends/");
  expect(await carousel.evaluate((el) => Reflect.get(window, "originalCarousel") === el)).toBe(
    true,
  );
  const continuedAnimation = await carousel
    .locator(".is-active img")
    .evaluateHandle((el) => el.getAnimations()[0]);
  expect(await continuedAnimation.evaluate((value) => Number(value.currentTime))).toBeGreaterThan(
    progress,
  );
  expect(await continuedAnimation.evaluate((value) => value.playState)).toBe("running");
  // 原本已經播放三秒，換頁後應在剩餘時間內切到下一張。
  await expect
    .poll(() => carousel.locator(".is-active img").getAttribute("src"), { timeout: 4000 })
    .not.toBe(initialImage);
  await page.goBack();
  await expect(page).toHaveURL(ROUTES.home);
  expect(await carousel.evaluate((el) => Reflect.get(window, "originalCarousel") === el)).toBe(
    true,
  );
  await page.goForward();
  await expect(page).toHaveURL("/friends/");
  expect(await carousel.evaluate((el) => Reflect.get(window, "originalCarousel") === el)).toBe(
    true,
  );
  // 使用站內導航進入專屬封面的文章，不能繼續沿用全站輪播。
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.href = "/posts/apcs/apcs-mid/";
    link.textContent = "文章封面測試";
    document.body.append(link);
    link.click();
  });
  await expect(page).toHaveURL("/posts/apcs/apcs-mid/");
  await expect(page.locator("#imgs .single-image")).toHaveAttribute("src", /APCS-mid/);
  await expect(carousel).toHaveCount(0);
});

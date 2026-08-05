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

import { expect, test } from "@playwright/test";
import { POSTS } from "../support/routes";

function extractUrlFromBackgroundImage(style: string | null): string | null {
  if (!style) {
    return null;
  }

  const matched = /url\((?:"|')?(.*?)(?:"|')?\)/.exec(style);
  return matched?.[1] ?? null;
}

test("@critical 文章内页头图应优先使用当前文章 cover", async ({ page }) => {
  const response = await page.goto(POSTS.helloWorld);
  expect(response?.ok()).toBeTruthy();

  const headerCover = page.locator("#imgs .single-image");
  await expect(headerCover).toBeVisible();

  const headerCoverSrc = await headerCover.evaluate((element) => {
    if (element instanceof HTMLImageElement) {
      return element.currentSrc || element.src;
    }

    const style = window.getComputedStyle(element);
    return style.backgroundImage;
  });

  const headerCoverUrl = headerCoverSrc.startsWith("url(")
    ? extractUrlFromBackgroundImage(headerCoverSrc)
    : headerCoverSrc;

  expect(headerCoverUrl).not.toBeNull();
  expect(headerCoverUrl).toContain("APCS-mid");
});

test("@critical 文章内页下一页封面遵循渐层设定", async ({ page }) => {
  const response = await page.goto(POSTS.beforeCoveredPost);
  expect(response?.ok()).toBeTruthy();

  const nextLink = page.locator(`.post-nav a[rel="next"][href="${POSTS.gettingStarted}"]`);
  await expect(nextLink).toBeVisible();

  const nextBackgroundImage = await nextLink.evaluate((element) => {
    return window.getComputedStyle(element).backgroundImage;
  });

  expect(nextBackgroundImage).toContain("linear-gradient");
});

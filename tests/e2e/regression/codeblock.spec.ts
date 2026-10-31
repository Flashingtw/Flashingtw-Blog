import { expect, test } from "@playwright/test";
import { POSTS } from "../support/routes";
import translations from "../../../src/i18n/locales/zh-TW.json" with { type: "json" };

test("@regression 程式碼內文使用網站等寬字型並保留跨平台備用字型", async ({ page }) => {
  await page.goto(POSTS.codeBlockPost);
  const token = page.locator("code-block pre .line span").first();
  await expect(token).toBeVisible();
  const fontFamily = await token.evaluate((element) => getComputedStyle(element).fontFamily);
  expect(fontFamily).toContain("Maple Mono CN");
  expect(fontFamily).toContain("monospace");
  await token.evaluate(() => document.fonts.load('16px "Maple Mono CN"', "int main()"));
  expect(
    await token.evaluate(() => document.fonts.check('16px "Maple Mono CN"', "int main()")),
  ).toBe(true);
  const inlineCode = page.locator(".md :not(pre) > code").first();
  await expect(inlineCode).toHaveCSS("font-family", fontFamily);
});

test("@regression CodeBlock 支持折叠与展开", async ({ page }) => {
  const response = await page.goto(POSTS.codeBlockPost);
  expect(response?.ok()).toBeTruthy();

  const codeBlock = page.locator("code-block").first();
  await expect(codeBlock).toBeVisible();

  const collapseButton = codeBlock.getByRole("button", { name: translations.codeBlock.expand });
  await expect(collapseButton).toBeVisible();
  await expect(codeBlock.locator(".content-container")).toHaveClass(/collapsed/);

  // 按鈕有持續動效，改用真實鍵盤操作驗證展開行為。
  await collapseButton.focus();
  await page.keyboard.press("Enter");
  await expect(
    codeBlock.getByRole("button", { name: translations.codeBlock.collapse }),
  ).toBeVisible();
  await expect(codeBlock.locator(".content-container")).not.toHaveClass(/collapsed/);
});

test("@regression CodeBlock 支持进入全屏并可通过 Escape 退出", async ({ page }) => {
  await page.goto(POSTS.codeBlockPost);

  const codeBlock = page.locator("code-block").first();
  await expect(codeBlock).toBeVisible();

  const fullscreenButton = codeBlock.getByRole("button", {
    name: translations.codeBlock.enterFullscreen,
  });
  await fullscreenButton.click();

  await expect(
    codeBlock.getByRole("button", { name: translations.codeBlock.exitFullscreen }),
  ).toBeVisible();
  await expect
    .poll(async () => {
      return page.evaluate(() => {
        return document.body.style.overflow;
      });
    })
    .toBe("hidden");

  await page.keyboard.press("Escape");
  await expect(
    codeBlock.getByRole("button", { name: translations.codeBlock.enterFullscreen }),
  ).toBeVisible();
});

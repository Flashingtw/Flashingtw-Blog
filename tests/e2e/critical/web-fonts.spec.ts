import { expect, test } from "@playwright/test";
import { POSTS } from "../support/routes";

test("@critical 慢速下載後正文和程式碼會套用網站字型", async ({ page, context, baseURL }) => {
  const siteOrigin = new URL(baseURL!).origin;
  await page.route("**/*", async (route) => {
    const request = route.request();
    if (new URL(request.url()).origin !== siteOrigin) return route.abort();
    if (request.resourceType() === "font") {
      // 模擬首次造訪的慢速字型下載，讓系統字型先出現。
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return route.continue();
  });

  await page.goto(POSTS.helloWorld, { waitUntil: "domcontentloaded" });
  await expect(page.locator("body")).toHaveCSS("font-family", /LXGW WenKai/);
  const cdp = await context.newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument");
  const [{ nodeId: paragraph }, { nodeId: inlineCode }] = await Promise.all([
    cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "#main .body p" }),
    cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "#main .body p code" }),
  ]);
  expect(paragraph).not.toBe(0);
  expect(inlineCode).not.toBe(0);

  // 字型下載成功不代表已套用，直接檢查瀏覽器繪製文字用的字型。
  const renderedFonts = async (nodeId: number) => {
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    return fonts.filter((font) => font.isCustomFont).map((font) => font.familyName);
  };
  await expect.poll(() => renderedFonts(paragraph)).toContain("LXGW WenKai");
  await expect.poll(() => renderedFonts(inlineCode)).toContain("Maple Mono CN");
});

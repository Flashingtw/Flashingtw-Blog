import { describe, expect, it } from "bun:test";
import { archiveExcerpt } from "./archiveExcerpt";

describe("archiveExcerpt", () => {
  it("加密文章不洩漏摘要或內文", () => {
    expect(
      archiveExcerpt(
        { data: { encrypted: true, description: "secret" }, body: "secret" },
        "加密文章",
      ),
    ).toBe("加密文章");
  });
  it("優先使用摘要，清除內文的 Markdown、圖片、註解與程式碼", () => {
    expect(archiveExcerpt({ data: { description: "**摘要**" }, body: "內文" }, "")).toBe("摘要");
    expect(
      archiveExcerpt(
        {
          data: {},
          body: "# 標題\n<!-- 未公開筆記 -->\n```js\nsecretCode()\n```\n![圖](image.png)\n這是 **內容** 和 [連結](/posts/test/)",
        },
        "",
      ),
    ).toBe("標題 這是 內容 和 連結");
  });
  it("限制長度且不截斷 Unicode 字元，允許空文章", () => {
    expect(archiveExcerpt({ data: {}, body: "😀".repeat(151) }, "")).toBe("😀".repeat(150) + "…");
    expect(archiveExcerpt({ data: {} }, "")).toBe("");
  });
});

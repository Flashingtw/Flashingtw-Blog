import { describe, expect, test } from "bun:test";
import i18next from "i18next";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import zhCN from "./locales/zh-CN.json";
import zhTW from "./locales/zh-TW.json";

const locales = { en, ja, "zh-CN": zhCN, "zh-TW": zhTW } as const;

function flattenKeys(tree: unknown, prefix = ""): string[] {
  if (!tree || typeof tree !== "object" || Array.isArray(tree)) {
    return [];
  }

  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenKeys(value, path);
    }

    return [path];
  });
}

describe("i18n locales", () => {
  test("四份語言檔具有相同的翻譯鍵", () => {
    const expectedKeys = flattenKeys(zhTW).toSorted();

    for (const translations of Object.values(locales)) {
      expect(flattenKeys(translations).toSorted()).toEqual(expectedKeys);
    }
  });

  test("頁碼、年份與月份插值不會殘留模板文字", async () => {
    await Promise.all(
      Object.entries(locales).map(async ([locale, translations]) => {
        const instance = i18next.createInstance();
        await instance.init({
          lng: locale,
          resources: { [locale]: { translation: translations } },
        });

        const results = [
          instance.t("pagination.pageTitle", { page: 2 }),
          instance.t("archive.yearTitle", { year: 2026 }),
          instance.t("archive.monthTitle", { year: 2026, month: 8 }),
        ];

        for (const result of results) {
          expect(result).not.toContain("{{");
          expect(result).not.toContain("}}");
        }
      }),
    );
  });
});

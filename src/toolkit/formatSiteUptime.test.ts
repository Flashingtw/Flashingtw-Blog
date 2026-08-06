import { describe, expect, test } from "bun:test";
import { formatSiteUptime, type SiteUptimeUnits } from "./formatSiteUptime";

const traditionalChineseUnits: SiteUptimeUnits = {
  year: "年",
  month: "個月",
  day: "天",
  hour: "小時",
  minute: "分鐘",
  second: "秒",
};

describe("formatSiteUptime", () => {
  test("使用傳入的繁體中文時間單位", () => {
    const createdAt = new Date("2026-01-01T00:00:00Z");
    const now = new Date("2026-02-02T03:04:05Z");

    expect(formatSiteUptime(createdAt, now, traditionalChineseUnits)).toBe("1個月2天3小時4分鐘5秒");
  });

  test("建立時間在未來時顯示零秒", () => {
    const createdAt = new Date("2027-01-01T00:00:00Z");
    const now = new Date("2026-01-01T00:00:00Z");

    expect(formatSiteUptime(createdAt, now, traditionalChineseUnits)).toBe("0秒");
  });

  test("支援需要空格分隔的語言", () => {
    const units: SiteUptimeUnits = {
      year: "y",
      month: "mo",
      day: "d",
      hour: "h",
      minute: "min",
      second: "s",
      separator: " ",
    };

    expect(
      formatSiteUptime(new Date("2026-01-01T00:00:00Z"), new Date("2026-01-01T01:02:03Z"), units),
    ).toBe("1h 2min 3s");
  });
});

import { describe, expect, it } from "bun:test";
import { buildAboutTimeline, type AboutTimelineEvent } from "./buildAboutTimeline";

function createEvent(
  datetime: string,
  overrides: Partial<AboutTimelineEvent> = {},
): AboutTimelineEvent {
  return {
    datetime,
    title: `Event ${datetime}`,
    category: "測試",
    description: "測試事件",
    ...overrides,
  };
}

describe("buildAboutTimeline", () => {
  it("sorts events from newest to oldest and groups them by year", () => {
    const events = [createEvent("2025-08"), createEvent("2026-01"), createEvent("2026-07-05")];

    const result = buildAboutTimeline(events);

    expect(result.map((group) => group.year)).toEqual(["2026", "2025"]);
    expect(result[0].events.map((event) => event.datetime)).toEqual(["2026-07-05", "2026-01"]);
  });

  it("creates display dates and preserves an explicit date label", () => {
    const result = buildAboutTimeline([
      createEvent("2026-07-05"),
      createEvent("2026-01"),
      createEvent("2025-08-15", { dateLabel: "決賽日" }),
    ]);

    expect(result[0].events.map((event) => event.displayDate)).toEqual(["07.05", "01 月"]);
    expect(result[1].events[0].displayDate).toBe("決賽日");
  });

  it("does not mutate the source order", () => {
    const events = [createEvent("2025-08"), createEvent("2026-01")];

    buildAboutTimeline(events);

    expect(events.map((event) => event.datetime)).toEqual(["2025-08", "2026-01"]);
  });

  it("rejects unsupported date formats", () => {
    expect(() => buildAboutTimeline([createEvent("2026/07/05")])).toThrow(
      "Invalid timeline datetime: 2026/07/05",
    );
  });
});

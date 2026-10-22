import { describe, expect, it } from "bun:test";
import { selectPublishedPosts } from "./selectPublishedPosts";

describe("selectPublishedPosts", () => {
  it("排除草稿，保留一般與加密的已發佈文章，並按日期降冪排列", () => {
    const posts = [
      { id: "older", data: { date: new Date("2026-01-01"), draft: false } },
      { id: "draft", data: { date: new Date("2026-10-08"), draft: true } },
      { id: "newer", data: { date: new Date("2026-10-06"), encrypted: true } },
    ];

    expect(selectPublishedPosts(posts).map((post) => post.id)).toEqual(["newer", "older"]);
  });

  it("接受唯讀陣列，不修改原陣列或文章，日期相同時保留原順序", () => {
    const older = Object.freeze({ id: "older", data: { date: new Date("2026-01-01") } });
    const first = Object.freeze({ id: "first", data: { date: new Date("2026-10-06") } });
    const second = Object.freeze({ id: "second", data: { date: new Date("2026-10-06") } });
    const posts = Object.freeze([older, first, second]);

    const published = selectPublishedPosts(posts);

    expect(published).toEqual([first, second, older]);
    expect(published[0]).toBe(first);
    expect(published).not.toBe(posts);
    expect(posts).toEqual([older, first, second]);
  });

  it("分類與統計彙整可篩選草稿並保留來源順序", () => {
    const posts = [
      { id: "older", data: { date: new Date("2026-01-01") } },
      { id: "draft", data: { date: new Date("2026-10-08"), draft: true } },
      { id: "newer", data: { date: new Date("2026-10-06") } },
    ];

    expect(selectPublishedPosts(posts, { sortByDate: false }).map((post) => post.id)).toEqual([
      "older",
      "newer",
    ]);
  });

  it("空陣列及全草稿不產生文章", () => {
    expect(selectPublishedPosts([])).toEqual([]);
    expect(selectPublishedPosts([{ data: { date: new Date("2026-10-08"), draft: true } }])).toEqual(
      [],
    );
  });
});

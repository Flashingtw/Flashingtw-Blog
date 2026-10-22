interface PublishablePost {
  data: {
    draft?: boolean;
    date: Date;
  };
}

interface SelectPublishedPostsOptions {
  /** 統計與分類彙整可保留原順序，避免改變同數量項目的顯示順序。 */
  sortByDate?: boolean;
}

/** 篩選已發佈文章，預設依日期由新到舊排列；不修改傳入陣列。 */
export function selectPublishedPosts<T extends PublishablePost>(
  posts: readonly T[],
  { sortByDate = true }: SelectPublishedPostsOptions = {},
): T[] {
  const publishedPosts = posts.filter((post) => !post.data.draft);

  return sortByDate
    ? publishedPosts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
    : publishedPosts;
}

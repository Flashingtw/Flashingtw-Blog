export const ROUTES = {
  home: "/",
  about: "/about/",
  page2: "/page/2/",
  moments: "/moments/",
  tags: "/tags/",
  categories: "/categories/",
} as const;

export const POSTS = {
  helloWorld: "/posts/apcs/apcs-mid/",
  gettingStarted: "/posts/experience/2026-toi-pre/",
  beforeCoveredPost: "/posts/experience/hspc-12th-pre/",
  encryptedTest: "/posts/encrypted-test/",
  imageZoomTest: "/posts/image-zoom-test/",
  noteMdxDemo: "/posts/note-mdx-demo/",
  postMigrationTest: "/posts/experience/2026-toi-pre/",
} as const;

export const FIXTURES = {
  encryptedPost: existsSync(join(process.cwd(), "dist", "posts", "encrypted-test", "index.html")),
} as const;

export const SEARCH_TERMS = {
  publicPostTitle: "APCS 中級入門- Flashingtw",
  encryptedPostTitle: "加密文章测试",
  encryptedOnlyText: "AES-GCM",
} as const;
import { existsSync } from "node:fs";
import { join } from "node:path";

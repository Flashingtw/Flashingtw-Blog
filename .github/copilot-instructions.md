# 專案導覽

工作規範以根目錄 `AGENTS.md` 為準；執行指令與套件版本以 `package.json` 為準。

## 找到修改位置

- `src/pages/` 組裝路由；`src/layouts/` 組裝全站骨架。
- 首頁元件在 `src/components/home/`，頁首在 `header/`，動態在 `moments/`。
- 歸檔、分類、標籤共用 `src/components/post/ArchivePreview.astro`。
- 文章篩選與排序共用 `src/toolkit/posts/selectPublishedPosts.ts`；保留個別呼叫端原本的排序需求。
- Markdown 轉換和互動在 `src/toolkit/markdown/`，解析擴充在 `src/satteri-plugins/`，內文元件在 `src/components/mdx/`。
- 圖片目錄在 `src/data/images.ts`；可處理的圖片與字體放 `src/assets/`，固定網址資源放 `public/`。
- 內容集合結構由 `src/content.config.ts` 定義；元件搬移時保留 `src/posts/`、`src/moments/` 的內容檔名。

## 路由與互動的注意事項

- 首頁 `/` 是個人介紹與近期文章，文章列表在 `/archives/`，動態集中於 `/moments/`。舊網址的轉址由 `astro.config.mjs` 管理。
- 文章連結使用 `src/toolkit/posts/url.ts`，保留尾斜線與路徑編碼。
- CodeBlock 和 ImageZoom 使用自訂元素；全站載入在 `Layout.astro`，渲染後的標記轉換在 `src/toolkit/markdown/`。調整一端時核對另一端。
- MDX 元件也會由 `astro.config.mjs` 的自動匯入名單載入，判定是否未使用時一併核對。
- UnoCSS 圖示使用 `i-ri-*`；`uno.config.ts` 使用相對路徑載入主題設定。
- Pagefind UI 在 `src/components/search/SearchPage.svelte`；保留 `data-pagefind-body` 並用完整 `build` 腳本產生搜尋索引。

完整目錄用途見 `README_zh-cn.md` 的「项目结构」。

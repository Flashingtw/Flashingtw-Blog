# AGENTS.md — astro-blog-shokax

本文件定义你在此仓库工作的最小安全边界与执行流程。

## 运行环境与总原则

- 运行时与包管理器：**Bun**（`packageManager: bun@1.3.6`）
- 默认沟通语言：**中文**（输出与代码注释优先中文）
- 語氣偏好：以作者平常寫文章的口語、輕鬆語氣溝通；可以自然使用 `ww`、`uwu`、`>:D`、自嘲或刪除線，但技術內容仍要講清楚。除非使用者要求正式文件，避免寫成補習班講義或過度官腔。
- 优先使用仓库脚本，不要自创命令
- 路由要求：`trailingSlash: "always"`（内部链接保留尾 `/`）
- 不要随意偏离现有架构（Astro + Svelte 5 + UnoCSS + Pagefind）
- Svelte 5 交互代码遵循现有 runes 风格（`$state/$props/$effect`）
- 有代码改动后至少执行：
  1. `bun run format`
  2. `bun run lint`
  3. `bun run check`

## 注释

- 默认中文输出与中文注释
- 不要新增“工作总结 Markdown 报告”文件

## 代码标准

- 可复用独立 helper 优先放置到`/src/toolkit/`中，并编写独立单元测试
- 较为复杂的 UI 组件或页面需编写对应 E2E 测试
- 如果需要添加测试用或展示效果的 Markdown/MDX 页面，优先复用现有文件

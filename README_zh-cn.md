[English](./README.md) | [中文](./README_zh-cn.md)

# Astro Blog ShokaX

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/theme-shoka-x/astro-blog-shokax)
[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https://github.com/theme-shoka-x/astro-blog-shokax)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/theme-shoka-x/astro-blog-shokax)

这是 [Hexo Theme ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX) 在 Astro 上的重构版本，使用 Astro + Svelte 5 + UnoCSS 技术栈

[<img width="1920" height="911" alt="三栏式预览" src="https://github.com/user-attachments/assets/b8ad5bbe-43a3-4c49-a32f-45ba5ba3dcd1" />](https://preview.astro.kaitaku.xyz/)

双栏式布局：
<img width="1920" height="911" alt="双栏式预览" src="https://github.com/user-attachments/assets/df01c009-68cf-4bb3-9148-ff61afc0d159" />

🌐 在线预览（三栏式）：[https://preview.astro.kaitaku.xyz/](https://preview.astro.kaitaku.xyz/)

## ✨ 功能特性

- 延续 ShokaX 原版设计语言的优雅界面
- 内置日间 / 暗夜主题模式
- 双栏和三栏双布局支持
- 通过 Hyc 交互式安装、配置和使用博客
- 基于 Hyacine Plugins 的可扩展插件体系
- 丰富的 Markdown / MDX 增强特性
- 支持标签云、时间线视图与分类树结构
- 基于 Pagefind 的无后端高性能全文搜索
- 独立的友链、文章统计和关于页面支持
- 开箱即用的说说 / 动态支持
- 自动生成智能目录（ToC）
- HyC 赋能的 AI 摘要和 AI 文章推荐
- 基于 AES-256-GCM 和 PBKDF2 的构建时文章加密
- 以性能优先为核心的设计与开发理念
- 更多扩展能力，详见文档说明

## 📦 安装

本项目建议使用 [Bun](https://bun.sh/) 运行，不保证与 Nodejs 的兼容性

你可以直接将本仓库 Clone 到本地（并为我们点一个 Star 😜），来开始使用。也可使用[由 Hyc 提供的交互式安装支持](https://docs.astro.kaitaku.xyz/start/guides/)

快速开始：

```bash
git clone https://github.com/theme-shoka-x/astro-blog-shokax

cd astro-blog-shokax

bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build
```

现在，你的站点已经可用了。如果你想自定义你的站点，查看完整文档来进行下一步：[ShokaX Astro 文档](https://docs.astro.kaitaku.xyz/start/guides/)

## 📂 项目结构

本站使用 Astro 7、Svelte 5 與 Bun，檔案依用途集中放置：

```text
scripts/                    # 本機發布工具：動態編輯器、Windows 更新腳本
src/
├── assets/                 # 需要經過建置處理的圖片、字體
├── components/
│   ├── home/               # 首頁自我介紹、專案、最新文章與時間線
│   ├── header/             # 站名、封面輪播、波浪
│   ├── moments/            # 動態卡片與連續時間線
│   ├── post/               # 歸檔共用卡片、文章資訊與導覽
│   ├── mdx/                # Markdown / MDX 內可用的元件
│   └── …                   # navbar、sidebar、footer、search 等功能
├── content/                # 獨立內容：about.mdx、friends-rules.md、announcement.md
├── data/                   # 首頁資料、時間線、圖片目錄
├── i18n/                   # 翻譯與語言處理
├── layouts/                # 頁面骨架、雙欄與三欄布局
├── moments/                # 動態內容集合
├── pages/                  # 對外路由
├── posts/                  # 文章內容集合，資料夾也參與分類處理
├── satteri-plugins/        # Markdown 解析擴充
├── stores/                 # 共用互動狀態
├── styles/                 # 全域樣式；元件樣式保留在元件旁
└── toolkit/
    ├── markdown/           # 內容渲染轉換與 Markdown 互動
    ├── posts/              # 已發布文章篩選、網址、摘要、統計
    ├── ui/                 # 瀏覽器互動
    └── …                   # 設定、加密、語言等工具
tests/e2e/                  # critical、regression、smoke 瀏覽器測試
public/                     # 保留原始網址、直接提供的靜態資源
```

可重用邏輯放在 `src/toolkit/`，對應的 `.test.ts` 與實作放在一起。`src/pages/` 負責路由與頁面組裝，畫面細節放進對應功能的元件目錄。文章的草稿篩選與排序共用 `selectPublishedPosts`；歸檔、分類、標籤的文章卡片共用 `ArchivePreview.astro`。

首頁是 `/`，文章歸檔在 `/archives/`，動態在 `/moments/`。`src/posts/` 的檔名會形成公開文章網址，整理元件時保留文章檔名。Astro、套件管理器和託管平台需要的設定留在根目錄，例如 `astro.config.mjs`、`package.json`、`hyacine.yml`。

動態編輯器用 `python scripts/add-moments.py` 啟動；Windows 的 `scripts/update.bat` 提供既有的互動式提交、推送流程。`dist/`、`.astro/`、測試報告及 `debug.log` 都是產物，不納入版本控制。

## ⚙️ HyC 能力

ShokaX 内置 @hyacine/cli 和 @hyacine/core 提供如下能力：

- AI 推荐和总结
- 交互式安装和配置
- 本地轻 CMS
- 博客扩展插件

```shell
# 建议全局安装，或者后续也可使用 bun hyc 而非 hyc
bun add @hyacine/cli -g

hyc sync # 同步数据库和内容集合

# 创建新文章
hyc new "标题"

# 发布文章
hyc publish "标题/slug/文件名"

# 按分类整理文章
hyc sort category

# 启动本地 CMS 和交互式配置
hyc serve
# 访问官方控制台 https://hyc.kaitaku.xyz/ 以开始使用

# HyC 插件当前处于 Alpha 阶段，相关文档仍在准备
# 目前本主题默认启用了 Site-Uptime（建站时间）和 Mouse-firework（点击特效）插件
# 可参见 hyacine.plugin.ts
```

## 🚀 性能

我们使用 [LHCI](https://github.com/GoogleChrome/lighthouse-ci) 测试页面性能，每次提交下都有测试结果。我们对页面性能的最低要求为 Lighthouse 桌面 Performance 92+，实际表现在 98-100 之间：

<img width="1702" height="952" alt="lighthouse" src="https://github.com/user-attachments/assets/05b8768f-5f04-4204-8f4f-7f2f6f30e102" />

## 📦 版本控制

ShokaX Astro 遵循 SemVer 进行版本控制，每次版本发布后会设置对应的 Github Releases 和 Git tag（遵循vX.Y.Z格式），你可以通过 checkout 到特定 tag 来更新或回退版本

本部分中 API 指代对外暴露的项目脚本（`build`、`dev`等）、配置及配置项和对外 TS API 等内容

具体而言：我们的版本号使用`x.y.z`格式，并遵循如下发布策略：

### x：主要版本

该版本包括的更改有：

1. 已弃用 API 的删除
2. 底层架构或核心程序的破坏性修改
3. 次要版本或补丁版本允许存在的更改

主要版本升级时，现有项目若未经修改可能会无法运行，且若你自行修改了 ShokaX Astro 的源代码则可能导致大规模 Git 冲突，需自行解决

### y：次要版本

该版本包括的更改有：

1. 宣布特定 API 进入弃用状态（被弃用 API 仅会在下一个主要版本中删除）
2. 加入新功能
3. 对内部实现进行不影响公共 API 的较大规模重构
4. 补丁版本允许存在的更改

次要版本升级时，不会影响对现有项目的兼容性，现有项目无需修改即可升级。

### z：补丁版本

该版本包括的更改有：

1. 对现有错误进行修复
2. 对安全漏洞进行修复
3. 进行性能优化
4. 其他非破坏性小规模改动

补丁版本升级时，不会影响对现有项目的兼容性，现有项目无需修改即可升级。

### 预发布版本

对于主要版本发布前，我们可能会发布预发布版本以收集有关新更改的反馈和进行测试，预发布版本遵循：

1. `alpha`版本的发布策略与主要版本一致，允许引入破坏性修改
2. `beta`版本的发布策略与次要版本一致，但若极为必要仍会引入破坏性修改
3. `rc`版本的发布策略与次要版本一致

预发布版本的格式形如`x.y.z-alpha.1`，且遵循`rc` > `beta` > `alpha`的排序。不建议将预发布版本用于生产环境

## 🖌️ 三栏式布局

我们在 ShokaX Astro 中引入了三栏式布局：

<img width="1920" height="911" alt="三栏式预览" src="https://github.com/user-attachments/assets/b8ad5bbe-43a3-4c49-a32f-45ba5ba3dcd1" />

右侧边栏中可以配置显示卡片和它们的顺序，目前已经支持的有：

- 公告
- 全站搜索
- 日历
- 最近动态
- 随机文章
- 标签云

可通过修改配置文件启用：

```ts
layout: {
  mode: "three-column",
  rightSidebar: {
    order: ["announcement", "search", "calendar", "recentMoments", "randomPosts", "tagCloud"],
    announcement: true,
    search: true,
    calendar: true,
    recentMoments: true,
    randomPosts: true,
    tagCloud: true,
  },
},
```

右侧边栏中仅在宽屏（桌面端）显示，手机端为原双栏布局

## 🤝 贡献

欢迎提交 PR，本项目会使用以下工作流检查代码：

- Lighthouse CI，标准为：
  - Performance >= 0.92
  - Accessibility >= 0.9
  - Best Practices 和 SEO >= 0.95
- CodeQL Scan & Code Quality
- E2E 测试
- [Lychee](https://lychee.cli.rs/)

如果出现未通过 CI 的情况也可提交 PR，我们会协助修改

本项目采用 AGPL v3 许可证

## 📄 备注

### 有关资源与许可证说明

- 本项目的主要样式与设计理念来自 [Shoka](https://github.com/amehime/hexo-theme-shoka)，但本项目为独立实现，仅在设计理念与风格上受到启发，出于致敬目的，在`license`目录下放置 Shoka 的原始 MIT 许可证(LICENSE-shoka)
- 本项目是 [Hexo ShokaX](https://github.com/theme-shoka-x/hexo-theme-shokaX) 的独立自研重写版本，未直接使用其代码与资源，为独立实现，且本仓库由 ShokaX 项目团队直接维护，与 Hexo ShokaX 作者相同，所以本项目使用 ShokaX 作为项目名称
- 本项目中默认的 avatar 图片为 [QuAn\_](https://www.pixiv.net/users/6657532) 的作品，本项目中该图片仅用于展示，版权归原作者所有，用户需自行确认使用合规性，请在正式部署前使用版权可控的图片替换本图片
- 本项目使用了 [Maple Mono](https://font.subf.dev/zh-cn/) 和[霞鹜文楷](https://github.com/lxgw/LxgwWenKai) 作为项目的默认字体，两款字体均为 OFL 1.1 许可证，其分发许可证分别为`licenses/LICENSE-maple-mono.txt`和`licenses/OFL.txt`
  本项目在构建过程中会在遵从 OFL 1.1 许可证的前提下对字体进行子集化、格式转换与压缩
- 本项目默认使用的 cover 来自 [Unsplash](https://unsplash.com/)，遵循 [Unsplash License](https://unsplash.com/license) 使用与分发
- 本项目本身（即根目录下的`LICENSE`）只适用于本项目中的代码资源，对于不包含于上述内容中的其他未标明或未知的非代码资产，本项目本身的 LICENSE 不适用，应视为原作者保留所有权

### 🙏 致谢

ShokaX 开发组向所有 ShokaX 在过去、现在和未来的使用过与可能使用的开源项目与所有 ShokaX 的用户、贡献者和开发者致谢，如果没有他们的支持，我们不可能构建出 ShokaX

其中，这些项目为我们的开发做出了极大的支持，特此再次致谢（随机排列，不分先后）：

- [Astro](https://astro.build/)：本项目的基石
- [UnoCSS](https://unocss.dev/)：现代化的原子 CSS 引擎，彻底解决了在前作中困扰开发组很长时间的图标问题
- [Svelte](https://svelte.dev/)：本项目的前端 UI 框架，个人博客项目的理想之选
- [Mizuki](https://github.com/matsuzaka-yuki/Mizuki)：直接启发了开发组进行 Astro 迁移，为我们的迁移提供了极好的榜样
- [Bun](https://bun.sh/)：本项目使用的运行时，高性能而易用
- [Shoka](https://github.com/amehime/hexo-theme-shoka)：ShokaX 的起源，没有 Shoka 便不可能有 ShokaX

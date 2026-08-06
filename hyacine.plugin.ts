import { defineConfig } from "@hyacine/core/config";

import MouseFirework from "@hyacine/mouse-firework";

export default defineConfig({
  injectPoints: {
    // 页面 head 部分，用于注入元标签、CSS 等
    head: 'slot[name="head"]',
    // 主布局容器
    layout: "#container",
    // 导航栏（navbar）
    "right-nav": "#nav",
    // 侧边栏
    sidebar: "#sidebar",
    // 页脚
    footer: "#footer",
    "footer-status": ".status",
    // 页脚小部件区域
    widgets: ".widgets",
    // 文章页脚（版权、打赏等）
    "post-footer": ".post footer",
  },

  plugins: [
    MouseFirework({
      colors: [
        "rgba(255,182,185,.9)",
        "rgba(250,227,217,.9)",
        "rgba(187,222,214,.9)",
        "rgba(138,198,209,.9)",
      ],
      count: 10,
      radius: 8,
    }),
  ],
});
